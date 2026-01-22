import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { detectSignalChange } from "../lib/alerts";
import { calculatePortfolioScore } from "../lib/scoring";
import { supabase } from "../lib/supabase";

import AlertPanel from "../components/AlertPanel";
import DataTable from "../components/DataTable";
import MetricCard from "../components/MetricCard";
import SignalBadge from "../components/SignalBadge";
import Skeleton from "../components/Skeleton";
import ConfidenceControls from "../ConfidenceControls/ConfidenceControls";

import { runBacktest } from "../lib/backtesting";
import { generateMockPriceHistory } from "../lib/mockPrices";

import {
  AIBox,
  AIText,
  Disclaimer,
  DisclaimerBanner,
  DisclaimerContent,
  DisclaimerIcon,
  DisclaimerText,
  DisclaimerTitle,
  MetaText,
  MetricGrid,
  PageContainer,
  PageTitle,
  Section,
  SectionTitle,
  StateText,
} from "../styles/AnalyzePage.styles";

/* ---------- Helper functions ---------- */

function diversificationTone(numHoldings) {
  if (numHoldings >= 10) return "low";
  if (numHoldings >= 5) return "medium";
  return "high";
}

function concentrationTone(percentage) {
  if (percentage <= 15) return "low";
  if (percentage <= 30) return "medium";
  return "high";
}

function riskTone(value) {
  if (value <= 30) return "low";
  if (value <= 60) return "medium";
  return "high";
}

function portfolioSignal(scoreData) {
  const { score, numHoldings, largestPosition, top3Concentration } = scoreData;

  // Calculate confidence dynamically based on how clear the signal is
  // More holdings + lower concentration = higher confidence in "balanced"
  // Fewer holdings + higher concentration = higher confidence in "overweight"

  if (score >= 70) {
    // Strong portfolio - confidence based on diversification quality
    const holdingsBonus = Math.min(numHoldings / 20, 0.15); // Up to +15% for 20+ holdings
    const concentrationBonus = Math.max(0, (30 - largestPosition) / 100); // Lower = better
    const baseConfidence = 0.55;
    const confidence = Math.min(
      0.95,
      baseConfidence + holdingsBonus + concentrationBonus,
    );

    return {
      signal: "balanced",
      confidence: Math.round(confidence * 100) / 100,
      explanation: `Portfolio is well-diversified with ${numHoldings} holdings. Largest position is ${largestPosition}%.`,
    };
  }

  if (score >= 40) {
    // Moderate portfolio - confidence based on how close to thresholds
    const distanceFromGood = (70 - score) / 30; // How far from "good" (0-1)
    const distanceFromBad = (score - 40) / 30; // How far from "bad" (0-1)
    const clarity = Math.abs(distanceFromGood - distanceFromBad);
    const confidence = 0.45 + clarity * 0.25;

    return {
      signal: "balanced",
      confidence: Math.round(confidence * 100) / 100,
      explanation: `Portfolio has moderate diversification. Top 3 holdings represent ${top3Concentration}%.`,
    };
  }

  // Poor portfolio - confidence based on severity
  const severityBonus = Math.min((40 - score) / 40, 0.3); // More severe = higher confidence
  const concentrationBonus = Math.min(largestPosition / 100, 0.2); // Higher concentration = more certain
  const confidence = 0.5 + severityBonus + concentrationBonus;

  return {
    signal: "overweight",
    confidence: Math.min(0.95, Math.round(confidence * 100) / 100),
    explanation: `Portfolio shows high concentration risk. Largest position is ${largestPosition}% - consider rebalancing.`,
  };
}

function stockSignal(row, totalValue, numHoldings = 10) {
  const positionValue = row.quantity * row.avg_price;
  const weight = positionValue / totalValue;
  const weightPercent = Math.round(weight * 100);

  // Target weight for equal-weight portfolio
  const targetWeight = 1 / numHoldings;

  // Thresholds scale based on number of holdings
  const overweightThreshold = Math.max(0.15, targetWeight * 2.5);
  const underweightThreshold = Math.min(0.05, targetWeight * 0.4);

  if (weight > overweightThreshold) {
    // Confidence increases with how overweight the position is
    const excessRatio = weight / overweightThreshold;
    const confidence = Math.min(0.95, 0.5 + excessRatio * 0.15);

    return {
      signal: "overweight",
      confidence: Math.round(confidence * 100) / 100,
      weight: weightPercent,
      explanation: `Position is ${weightPercent}% of portfolio (threshold: ${Math.round(overweightThreshold * 100)}%).`,
    };
  }

  if (weight < underweightThreshold) {
    // Confidence based on how underweight
    const deficitRatio = underweightThreshold / Math.max(weight, 0.001);
    const confidence = Math.min(0.9, 0.45 + deficitRatio * 0.1);

    return {
      signal: "underweight",
      confidence: Math.round(confidence * 100) / 100,
      weight: weightPercent,
      explanation: `Position is only ${weightPercent}% of portfolio (threshold: ${Math.round(underweightThreshold * 100)}%).`,
    };
  }

  // Balanced - confidence based on how centered the position is
  const midpoint = (overweightThreshold + underweightThreshold) / 2;
  const distanceFromMid = Math.abs(weight - midpoint);
  const range = (overweightThreshold - underweightThreshold) / 2;
  const centeredness = 1 - distanceFromMid / range;
  const confidence = 0.45 + centeredness * 0.35;

  return {
    signal: "balanced",
    confidence: Math.round(confidence * 100) / 100,
    weight: weightPercent,
    explanation: `Position is ${weightPercent}% - well-balanced allocation.`,
  };
}

/* ---------- Component ---------- */

export default function AnalyzePage() {
  const { portfolioId } = useParams();

  const [rows, setRows] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const [confidenceThreshold, setConfidenceThreshold] = useState(0.6);
  const [alerts, setAlerts] = useState([]);

  const previousSignalsRef = useRef({});

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!cancelled) {
        await loadPortfolio();
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  async function fetchAIExplanation(scoreData) {
    try {
      setAiLoading(true);
      setAiError("");

      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: scoreData.score,
          metrics: scoreData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "AI request failed");

      setAiText(data.explanation);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  }

  async function loadPortfolio() {
    try {
      const { data: portfolio } = await supabase
        .from("portfolios")
        .select("upload_id")
        .eq("id", portfolioId)
        .single();

      const { data: upload } = await supabase
        .from("uploads")
        .select("storage_path")
        .eq("id", portfolio.upload_id)
        .single();

      const { data: signedUrl } = await supabase.storage
        .from("portfolio-files")
        .createSignedUrl(upload.storage_path, 60);

      const res = await fetch(signedUrl.signedUrl);
      const csvText = await res.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setRows(result.data);

          const computed = calculatePortfolioScore(result.data);
          setScore(computed);
          fetchAIExplanation(computed);

          /* ---------- Alert detection ---------- */
          const nextSignals = {};
          const newAlerts = [];

          result.data.forEach((row) => {
            const base = stockSignal(
              row,
              computed.totalValue,
              computed.numHoldings,
            );
            nextSignals[row.symbol] = base;

            const prev = previousSignalsRef.current[row.symbol];
            const alert = detectSignalChange(prev, base);
            if (alert) {
              newAlerts.push(`${row.symbol}: ${alert}`);
            }
          });

          previousSignalsRef.current = nextSignals;
          setAlerts(newAlerts);
        },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <PageContainer as="main">
        <PageTitle>Portfolio Analysis</PageTitle>
        <StateText
          role="status"
          aria-live="polite"
          style={{ marginBottom: "1.5rem" }}
        >
          Analyzing portfolio data...
        </StateText>

        <Section>
          <SectionTitle as="h2">Portfolio Overview</SectionTitle>
          <Skeleton
            height="40px"
            style={{ marginBottom: "1rem", maxWidth: "200px" }}
          />
          <MetricGrid>
            <Skeleton height="120px" />
            <Skeleton height="120px" />
            <Skeleton height="120px" />
            <Skeleton height="120px" />
          </MetricGrid>
        </Section>

        <Section>
          <SectionTitle as="h2">Holdings</SectionTitle>
          <Skeleton height="400px" />
        </Section>
      </PageContainer>
    );

  if (error) return <StateText role="alert">{error}</StateText>;

  const baseOverview = portfolioSignal(score);
  const overviewSignal =
    baseOverview.confidence < confidenceThreshold
      ? { ...baseOverview, signal: "hold" }
      : baseOverview;

  const backtestResult =
    rows.length && score
      ? runBacktest({
          rows,
          priceHistory: generateMockPriceHistory(rows),
          signalFn: stockSignal,
        })
      : null;

  const tableColumns = rows.length ? [...Object.keys(rows[0]), "signal"] : [];

  return (
    <PageContainer as="main">
      <PageTitle>Portfolio Analysis</PageTitle>

      <DisclaimerBanner>
        <DisclaimerIcon>ℹ️</DisclaimerIcon>
        <DisclaimerContent>
          <DisclaimerTitle>Educational Analysis Tool</DisclaimerTitle>
          <DisclaimerText>
            This analysis is for informational purposes only and does not
            constitute investment advice. Signals represent portfolio allocation
            metrics, not buy/sell recommendations.
          </DisclaimerText>
        </DisclaimerContent>
      </DisclaimerBanner>

      <AlertPanel alerts={alerts} />

      <Section>
        <SectionTitle as="h2">Signal Sensitivity</SectionTitle>

        <ConfidenceControls
          threshold={confidenceThreshold}
          onChange={setConfidenceThreshold}
        />
      </Section>

      <Section>
        <SectionTitle as="h2">Portfolio Overview</SectionTitle>

        <SignalBadge
          {...overviewSignal}
          muted={baseOverview.confidence < confidenceThreshold}
        />

        <MetaText>
          Signals are probabilistic indicators derived from portfolio metrics.
        </MetaText>

        <MetricGrid>
          <MetricCard
            label="Health Score"
            value={`${score.score} / 100`}
            tone={riskTone(100 - score.score)}
          />
          <MetricCard
            label="Holdings"
            value={score.numHoldings}
            subtext="stocks"
            tone={diversificationTone(score.numHoldings)}
          />
          <MetricCard
            label="Largest Position"
            value={`${score.largestPosition}%`}
            tone={concentrationTone(score.largestPosition)}
          />
          <MetricCard
            label="Top 3 Concentration"
            value={`${score.top3Concentration}%`}
            tone={concentrationTone(score.top3Concentration)}
          />
        </MetricGrid>
      </Section>

      <Section>
        <SectionTitle as="h2">Holdings</SectionTitle>

        <DataTable
          columns={tableColumns}
          rows={rows}
          maxHeight="400px"
          renderCell={(col, row) => {
            if (col === "signal") {
              const base = stockSignal(
                row,
                score.totalValue,
                score.numHoldings,
              );

              const adjusted =
                base.confidence < confidenceThreshold
                  ? { ...base, signal: "hold" }
                  : base;

              return (
                <SignalBadge
                  {...adjusted}
                  muted={base.confidence < confidenceThreshold}
                />
              );
            }
            return row[col];
          }}
        />

        <MetaText>
          Stock-level signals are relative to portfolio allocation and do not
          reflect market recommendations.
        </MetaText>
      </Section>
      <Section>
        <SectionTitle as="h2">Backtest (Simulated)</SectionTitle>

        {backtestResult ? (
          <>
            <MetaText>
              60-day simulation comparing active rebalancing vs passive
              buy-and-hold. Uses deterministic mock prices with market
              correlation. Results are illustrative only.
            </MetaText>

            <SectionTitle
              as="h3"
              style={{ fontSize: "1rem", marginTop: "1.5rem" }}
            >
              Active Rebalancing Strategy
            </SectionTitle>
            <MetricGrid>
              <MetricCard
                label="Total Return"
                value={`₹${backtestResult.totalReturn.toFixed(2)}`}
                subtext={`${backtestResult.returnPercentage > 0 ? "+" : ""}${backtestResult.returnPercentage.toFixed(2)}%`}
                tone={
                  backtestResult.totalReturn > 0
                    ? "low"
                    : backtestResult.totalReturn < 0
                      ? "high"
                      : "neutral"
                }
              />
              <MetricCard
                label="Trades Executed"
                value={backtestResult.trades}
                subtext="Over 60 days"
              />
              <MetricCard
                label="Win Rate"
                value={`${Math.round(backtestResult.winRate * 100)}%`}
                tone={
                  backtestResult.winRate > 0.5
                    ? "low"
                    : backtestResult.winRate > 0.3
                      ? "medium"
                      : "high"
                }
              />
              <MetricCard
                label="Max Drawdown"
                value={`${Math.round(backtestResult.maxDrawdown * 100)}%`}
                tone={
                  backtestResult.maxDrawdown < 0.1
                    ? "low"
                    : backtestResult.maxDrawdown < 0.2
                      ? "medium"
                      : "high"
                }
              />
            </MetricGrid>

            <SectionTitle
              as="h3"
              style={{ fontSize: "1rem", marginTop: "1.5rem" }}
            >
              Passive Buy & Hold (Benchmark)
            </SectionTitle>
            <MetricGrid>
              <MetricCard
                label="Passive Return"
                value={`₹${backtestResult.passive.totalReturn.toFixed(2)}`}
                subtext={`${backtestResult.passive.returnPercentage > 0 ? "+" : ""}${backtestResult.passive.returnPercentage.toFixed(2)}%`}
                tone={
                  backtestResult.passive.totalReturn > 0
                    ? "low"
                    : backtestResult.passive.totalReturn < 0
                      ? "high"
                      : "neutral"
                }
              />
              <MetricCard
                label="Alpha"
                value={`${backtestResult.alpha > 0 ? "+" : ""}${backtestResult.alpha.toFixed(2)}%`}
                subtext="vs Buy & Hold"
                tone={
                  backtestResult.alpha > 0
                    ? "low"
                    : backtestResult.alpha < 0
                      ? "high"
                      : "neutral"
                }
              />
              <MetricCard
                label="Passive Drawdown"
                value={`${Math.round(backtestResult.passive.maxDrawdown * 100)}%`}
                tone={
                  backtestResult.passive.maxDrawdown < 0.1
                    ? "low"
                    : backtestResult.passive.maxDrawdown < 0.2
                      ? "medium"
                      : "high"
                }
              />
            </MetricGrid>

            <MetaText
              style={{ marginTop: "1rem", fontSize: "0.85rem", opacity: 0.7 }}
            >
              Initial: ₹{backtestResult.initialValue.toFixed(2)} → Active: ₹
              {backtestResult.finalValue.toFixed(2)} | Passive: ₹
              {backtestResult.passive.finalValue.toFixed(2)}
            </MetaText>
          </>
        ) : (
          <MetaText>
            No backtest data available. Ensure your portfolio has valid price
            data.
          </MetaText>
        )}
      </Section>

      <Section>
        <SectionTitle as="h2">AI Explanation</SectionTitle>

        <AIBox aria-describedby="ai-disclaimer">
          {aiLoading && <Skeleton height="80px" />}
          {aiError && <StateText $error>{aiError}</StateText>}

          {!aiLoading && !aiError && aiText && (
            <>
              <AIText>{aiText}</AIText>
              <Disclaimer id="ai-disclaimer">
                Analytics only. Not investment advice.
              </Disclaimer>
            </>
          )}
        </AIBox>
      </Section>
    </PageContainer>
  );
}
