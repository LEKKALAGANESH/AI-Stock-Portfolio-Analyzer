/**
 * Portfolio Health Score Calculator
 *
 * Calculates a comprehensive health score (0-100) based on:
 * - Diversification: Number of holdings
 * - Concentration: Largest position size
 * - Structural Volatility Risk: Portfolio composition-based risk
 * - Structural Drawdown Risk: Portfolio resilience estimate
 *
 * Note: This scoring is based on portfolio structure analysis, not market data.
 * For real-time volatility, integrate with market data APIs.
 */

export function calculatePortfolioScore(rows) {
  if (!rows.length) return null;

  let totalValue = 0;
  let symbols = new Set();
  let values = [];
  let weights = [];

  // Calculate position values and weights
  rows.forEach((row) => {
    const qty = Number(row.quantity || 0);
    const price = Number(row.avg_price || 0);
    const value = qty * price;

    if (value > 0) {
      totalValue += value;
      symbols.add(row.symbol);
      values.push(value);
    }
  });

  // Calculate weights after we know total value
  values.forEach(value => {
    weights.push(value / totalValue);
  });

  // 1. DIVERSIFICATION SCORE (0-30 points)
  // More holdings = better diversification, but with diminishing returns
  const numHoldings = symbols.size;
  let diversification;

  if (numHoldings <= 3) {
    diversification = numHoldings * 5; // 5, 10, 15 points
  } else if (numHoldings <= 10) {
    diversification = 15 + (numHoldings - 3) * 1.5; // 16.5-25.5 points
  } else {
    diversification = 25.5 + Math.min((numHoldings - 10) * 0.5, 4.5); // up to 30
  }

  // 2. CONCENTRATION RISK SCORE (0-20 points)
  // Lower concentration = higher score
  // Penalize portfolios where largest position is >25% of total
  const largestWeight = Math.max(...weights);
  let concentration;

  if (largestWeight <= 0.10) {
    concentration = 20; // Perfect - no position >10%
  } else if (largestWeight <= 0.15) {
    concentration = 18;
  } else if (largestWeight <= 0.20) {
    concentration = 15;
  } else if (largestWeight <= 0.25) {
    concentration = 12;
  } else if (largestWeight <= 0.35) {
    concentration = 8;
  } else if (largestWeight <= 0.50) {
    concentration = 4;
  } else {
    concentration = 0; // Critical - single position >50%
  }

  // 3. STRUCTURAL VOLATILITY SCORE (0-25 points)
  // Estimate volatility risk from portfolio structure
  // Lower volatility risk = higher score

  // Calculate Herfindahl-Hirschman Index (HHI) for concentration
  // HHI ranges from 1/n (perfectly diversified) to 1 (single holding)
  const hhi = weights.reduce((sum, w) => sum + w * w, 0);

  // Calculate inverse volatility score
  // More concentrated = higher volatility risk = lower score
  let volatilityScore;

  if (numHoldings === 1) {
    volatilityScore = 0; // Single holding = maximum volatility risk
  } else if (numHoldings === 2) {
    volatilityScore = 5;
  } else if (numHoldings <= 5) {
    // Use HHI to determine score
    const adjustedHHI = Math.max(0, Math.min(1, (hhi - 0.2) / 0.8));
    volatilityScore = 15 * (1 - adjustedHHI);
  } else if (numHoldings <= 10) {
    const adjustedHHI = Math.max(0, Math.min(1, (hhi - 0.1) / 0.4));
    volatilityScore = 10 + 10 * (1 - adjustedHHI);
  } else {
    // Well-diversified portfolio
    const adjustedHHI = Math.max(0, Math.min(1, hhi / 0.2));
    volatilityScore = 20 + 5 * (1 - adjustedHHI);
  }

  // 4. STRUCTURAL DRAWDOWN RISK SCORE (0-25 points)
  // Estimate potential drawdown risk from portfolio structure
  // Better diversification = lower drawdown risk = higher score

  // Calculate top 3 holdings concentration
  const sortedWeights = [...weights].sort((a, b) => b - a);
  const top3Concentration = sortedWeights.slice(0, 3).reduce((sum, w) => sum + w, 0);

  let drawdownScore;

  if (top3Concentration <= 0.30) {
    drawdownScore = 25; // Excellent - top 3 are <30% combined
  } else if (top3Concentration <= 0.40) {
    drawdownScore = 22;
  } else if (top3Concentration <= 0.50) {
    drawdownScore = 18;
  } else if (top3Concentration <= 0.60) {
    drawdownScore = 14;
  } else if (top3Concentration <= 0.75) {
    drawdownScore = 10;
  } else if (top3Concentration <= 0.90) {
    drawdownScore = 5;
  } else {
    drawdownScore = 0; // Critical - top 3 holdings are >90%
  }

  // TOTAL SCORE (0-100)
  const score = diversification + concentration + volatilityScore + drawdownScore;

  return {
    score: Math.round(score),
    diversification: Math.round(diversification),
    concentration: Math.round(concentration),
    volatility: Math.round(volatilityScore),
    drawdown: Math.round(drawdownScore),
    totalValue,
    // Additional metrics for display
    numHoldings,
    largestPosition: Math.round(largestWeight * 100), // percentage
    top3Concentration: Math.round(top3Concentration * 100), // percentage
    hhi: Math.round(hhi * 10000) / 10000, // for debugging
  };
}

/**
 * Get risk level description based on score
 */
export function getRiskLevel(score) {
  if (score >= 80) return { level: 'Low', color: 'success', description: 'Well-diversified portfolio with manageable risk' };
  if (score >= 60) return { level: 'Moderate', color: 'warning', description: 'Acceptable diversification with some concentration' };
  if (score >= 40) return { level: 'Elevated', color: 'warning', description: 'Significant concentration risk present' };
  return { level: 'High', color: 'error', description: 'Poor diversification - high concentration risk' };
}

/**
 * Get recommendations based on portfolio metrics
 */
export function getRecommendations(metrics) {
  const recommendations = [];

  if (metrics.numHoldings < 5) {
    recommendations.push('Consider adding more holdings to improve diversification');
  }

  if (metrics.largestPosition > 25) {
    recommendations.push(`Largest position is ${metrics.largestPosition}% - consider rebalancing to reduce concentration`);
  }

  if (metrics.top3Concentration > 60) {
    recommendations.push('Top 3 holdings represent over 60% of portfolio - high concentration risk');
  }

  if (metrics.numHoldings > 20) {
    recommendations.push('Large number of holdings may be difficult to monitor effectively');
  }

  return recommendations;
}
