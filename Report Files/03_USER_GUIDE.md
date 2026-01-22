# User Guide

## AI Stock Portfolio Analyzer

**Version:** 1.0
**Date:** January 2026
**Document Type:** User Documentation

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Uploading Your Portfolio](#2-uploading-your-portfolio)
3. [Understanding the Dashboard](#3-understanding-the-dashboard)
4. [Portfolio Overview Section](#4-portfolio-overview-section)
5. [Holdings Table](#5-holdings-table)
6. [Backtest Results](#6-backtest-results)
7. [AI Explanation](#7-ai-explanation)
8. [Signal Sensitivity Controls](#8-signal-sensitivity-controls)
9. [Interpreting Results](#9-interpreting-results)
10. [Frequently Asked Questions](#10-frequently-asked-questions)

---

## 1. Getting Started

### 1.1 What This Tool Does

The AI Stock Portfolio Analyzer helps you understand:
- How well-diversified your portfolio is
- Whether any positions are too large or too small
- Your portfolio's structural health score
- How a rebalancing strategy might perform

### 1.2 What This Tool Does NOT Do

- Provide investment advice
- Recommend specific stocks to buy or sell
- Predict future stock prices
- Replace professional financial advice

### 1.3 Important Disclaimer

> **This tool is for educational and informational purposes only.** All signals represent portfolio allocation metrics, not investment recommendations. Consult a qualified financial advisor before making investment decisions.

---

## 2. Uploading Your Portfolio

### 2.1 Preparing Your CSV File

Your portfolio file must be a CSV with these columns:

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| symbol | Yes | Stock ticker symbol | AAPL, RELIANCE.NS |
| quantity | Yes | Number of shares owned | 100 |
| avg_price | Yes | Average purchase price | 150.50 |

**Example CSV:**
```csv
symbol,quantity,avg_price
AAPL,50,175.00
GOOGL,25,140.00
MSFT,100,380.00
TSLA,30,250.00
NVDA,20,450.00
```

### 2.2 Uploading Process

1. Navigate to the **Upload** page
2. Click "Choose File" or drag your CSV file
3. Wait for validation (green checkmark = success)
4. Click "Analyze Portfolio"
5. You'll be redirected to the analysis dashboard

### 2.3 Common Upload Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Missing required columns" | CSV doesn't have symbol/quantity/avg_price | Add missing columns |
| "Invalid number format" | Non-numeric values in quantity/avg_price | Remove currency symbols, commas |
| "File too large" | File exceeds 5MB limit | Split into smaller portfolios |

---

## 3. Understanding the Dashboard

The analysis dashboard has five main sections:

```
┌─────────────────────────────────────────┐
│  1. DISCLAIMER BANNER                   │
├─────────────────────────────────────────┤
│  2. SIGNAL SENSITIVITY                  │
├─────────────────────────────────────────┤
│  3. PORTFOLIO OVERVIEW                  │
│     - Health Score                      │
│     - Holdings Count                    │
│     - Largest Position                  │
│     - Top 3 Concentration               │
├─────────────────────────────────────────┤
│  4. HOLDINGS TABLE                      │
│     - Individual stock signals          │
├─────────────────────────────────────────┤
│  5. BACKTEST RESULTS                    │
│     - Active vs Passive comparison      │
├─────────────────────────────────────────┤
│  6. AI EXPLANATION                      │
│     - Natural language summary          │
└─────────────────────────────────────────┘
```

---

## 4. Portfolio Overview Section

### 4.1 Health Score (0-100)

Your overall portfolio health based on four factors:

| Score Range | Rating | Meaning |
|-------------|--------|---------|
| 80-100 | Excellent | Well-diversified, low concentration risk |
| 60-79 | Good | Reasonable diversification, minor concerns |
| 40-59 | Fair | Moderate concentration, consider rebalancing |
| 0-39 | Poor | High concentration risk, needs attention |

### 4.2 Holdings Count

The number of unique stocks in your portfolio.

| Holdings | Diversification Level |
|----------|----------------------|
| 1-4 | Poor - high single-stock risk |
| 5-9 | Moderate - acceptable for small portfolios |
| 10-19 | Good - reasonable diversification |
| 20+ | Excellent - well-diversified |

### 4.3 Largest Position (%)

The percentage of your portfolio in your biggest holding.

| Percentage | Risk Level | Interpretation |
|------------|------------|----------------|
| <10% | Low | No single stock dominates |
| 10-20% | Moderate | One stock is significant |
| 20-30% | Elevated | Consider reducing position |
| >30% | High | Single-stock risk is high |

### 4.4 Top 3 Concentration (%)

Combined percentage of your three largest holdings.

| Percentage | Interpretation |
|------------|----------------|
| <30% | Excellent diversification |
| 30-50% | Good, but top stocks are significant |
| 50-70% | Concentrated in few stocks |
| >70% | Highly concentrated - high risk |

---

## 5. Holdings Table

### 5.1 Signal Types

Each stock shows an allocation signal:

| Signal | Color | Meaning |
|--------|-------|---------|
| **BALANCED** | Green | Position size is appropriate |
| **OVERWEIGHT** | Red | Position is larger than ideal |
| **UNDERWEIGHT** | Yellow | Position is smaller than ideal |
| **HOLD** | Gray | Signal confidence is below your threshold |

### 5.2 Reading the Confidence Percentage

Each signal shows a confidence level (e.g., "OVERWEIGHT 78%"):

- **Higher confidence (>70%):** Signal is clear, position is far from target
- **Medium confidence (50-70%):** Signal is moderate, position is borderline
- **Lower confidence (<50%):** Signal is weak, may not warrant action

### 5.3 Signal Explanations

Hover or click a signal to see why it was triggered:

> "Position is 32% of portfolio (threshold: 15%). Consider rebalancing."

---

## 6. Backtest Results

### 6.1 What is Backtesting?

Backtesting simulates how your portfolio would have performed using historical (simulated) price movements. It compares:

- **Active Strategy:** Rebalancing when positions drift
- **Passive Strategy:** Buy and hold, no changes

### 6.2 Active Strategy Metrics

| Metric | Description |
|--------|-------------|
| Total Return | Money gained/lost (in ₹) |
| Return % | Percentage gain/loss |
| Trades Executed | Number of rebalancing trades |
| Win Rate | % of profitable trades |
| Max Drawdown | Largest peak-to-trough decline |

### 6.3 Passive Benchmark Metrics

| Metric | Description |
|--------|-------------|
| Passive Return | Buy-and-hold performance |
| Alpha | Active return minus passive return |
| Passive Drawdown | Maximum decline without rebalancing |

### 6.4 Understanding Alpha

- **Positive Alpha:** Active strategy outperformed passive
- **Zero Alpha:** Same performance
- **Negative Alpha:** Passive strategy was better

### 6.5 Important Notes

> **Simulated Data:** Backtest uses mock prices with realistic market characteristics. Results are illustrative only and do not predict future performance.

---

## 7. AI Explanation

### 7.1 What You'll See

A natural language summary of your portfolio analysis:

> "Your portfolio has 27 holdings with strong diversification. The largest position (RELIANCE) represents only 5% of total value, indicating low concentration risk. The top 3 positions account for 15% combined, which is excellent. Consider maintaining this balanced allocation."

### 7.2 How It's Generated

- Based on your actual portfolio metrics
- Explains key findings in plain English
- Highlights strengths and areas for improvement
- Does NOT make predictions or recommendations

### 7.3 Disclaimer

> "Analytics only. Not investment advice."

---

## 8. Signal Sensitivity Controls

### 8.1 The Confidence Slider

Adjust the minimum confidence threshold (40% to 90%):

- **Lower threshold (40-50%):** Show more signals, including weak ones
- **Default (60%):** Balanced view of meaningful signals
- **Higher threshold (70-90%):** Only show strong, clear signals

### 8.2 How It Affects the Display

When a signal's confidence is below your threshold:
- Signal changes to "HOLD"
- Badge appears muted (grayed out)
- Original confidence still visible

### 8.3 Use Cases

| Setting | Best For |
|---------|----------|
| 40-50% | See all potential issues |
| 55-65% | General analysis (recommended) |
| 70-90% | Focus only on clear problems |

---

## 9. Interpreting Results

### 9.1 A Healthy Portfolio Looks Like:

- Health Score: 70+
- Holdings: 10+ stocks
- Largest Position: <15%
- Top 3 Concentration: <40%
- Most signals: BALANCED
- Low/moderate drawdown

### 9.2 Warning Signs:

- Health Score: <40
- Holdings: <5 stocks
- Largest Position: >25%
- Top 3 Concentration: >60%
- Many OVERWEIGHT signals
- High drawdown (>20%)

### 9.3 What to Do Next

| Finding | Possible Action |
|---------|-----------------|
| Overweight position | Consider reducing position size |
| Underweight positions | Consider adding to small positions |
| Low diversification | Consider adding more holdings |
| High concentration | Spread investments more evenly |

> **Remember:** This tool provides analysis, not advice. Consult a financial advisor before making changes.

---

## 10. Frequently Asked Questions

### Q: Is my data stored?

**A:** Your CSV file is stored securely in encrypted cloud storage. Portfolio data is not shared with third parties.

### Q: Can I analyze multiple portfolios?

**A:** Yes, upload each CSV separately. Each gets its own analysis page.

### Q: Why don't I see real stock prices?

**A:** The tool analyzes portfolio structure, not current market prices. Backtest uses simulated prices for educational illustration.

### Q: What does "HOLD" signal mean?

**A:** It means the signal confidence is below your threshold. The original signal is suppressed to reduce noise.

### Q: How often should I re-analyze?

**A:** After making significant changes to your holdings, or quarterly as a health check.

### Q: Can I export the analysis?

**A:** Currently, you can screenshot or print the page. Export features may be added in future updates.

### Q: Is this tool free?

**A:** The basic analysis is free. Check for premium features that may be added.

### Q: Who built this tool?

**A:** This is an educational project demonstrating portfolio analysis concepts using modern web technologies.

---

## Support

For technical issues or feedback:
- Check the documentation
- Review error messages carefully
- Ensure CSV format is correct

---

**Document End**
