# API Documentation

## AI Stock Portfolio Analyzer

**Version:** 1.0
**Date:** January 2026
**Document Type:** API Reference

---

## Table of Contents

1. [Overview](#1-overview)
2. [Authentication](#2-authentication)
3. [API Endpoints](#3-api-endpoints)
4. [Data Models](#4-data-models)
5. [Business Logic APIs](#5-business-logic-apis)
6. [Error Handling](#6-error-handling)
7. [Rate Limiting](#7-rate-limiting)
8. [Examples](#8-examples)

---

## 1. Overview

### 1.1 Base URL

**Production:**

```
https://your-domain.vercel.app/api
```

**Development:**

```
http://localhost:5173/api
```

### 1.2 API Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        API Layer                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐                                            │
│  │  /api/explain   │ ─── AI-powered portfolio explanation       │
│  │  (Serverless)   │                                            │
│  └────────┬────────┘                                            │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  Google Gemini  │ ─── External AI service                    │
│  │  (OpenAI API)   │                                            │
│  └─────────────────┘                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 Content Type

All requests and responses use JSON:

```
Content-Type: application/json
```

---

## 2. Authentication

### 2.1 Public Endpoints

Currently, all endpoints are public (no authentication required).

### 2.2 Server-Side API Keys

External API keys (Gemini) are stored as environment variables and used server-side only:

```bash
# .env.local (never commit)
GEMINI_API_KEY=your_api_key_here
```

### 2.3 Future Authentication

Planned authentication methods for future versions:

- JWT tokens for user sessions
- API keys for programmatic access
- OAuth for third-party integrations

---

## 3. API Endpoints

### 3.1 POST /api/explain

Generate an AI-powered explanation of portfolio metrics.

#### Request

```http
POST /api/explain
Content-Type: application/json
```

**Body Parameters:**

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| score     | number | Yes      | Portfolio health score (0-100) |
| metrics   | object | Yes      | Portfolio metrics object       |

**Metrics Object:**

| Field             | Type   | Description                  |
| ----------------- | ------ | ---------------------------- |
| score             | number | Overall health score         |
| diversification   | number | Diversification score (0-30) |
| concentration     | number | Concentration score (0-20)   |
| volatility        | number | Volatility score (0-25)      |
| drawdown          | number | Drawdown risk score (0-25)   |
| totalValue        | number | Total portfolio value        |
| numHoldings       | number | Number of unique stocks      |
| largestPosition   | number | Largest position (%)         |
| top3Concentration | number | Top 3 combined (%)           |
| hhi               | number | Herfindahl-Hirschman Index   |

#### Response

**Success (200):**

```json
{
  "explanation": "SUMMARY:\nYour portfolio health score of 85 reflects...\n\nKEY DRIVERS:\n- Strong diversification with 27 holdings...\n..."
}
```

**Error (400):**

```json
{
  "error": "Invalid payload"
}
```

**Error (405):**

```json
{
  "error": "Method not allowed"
}
```

**Error (500):**

```json
{
  "error": "AI generation failed"
}
```

#### Example Request

```bash
curl -X POST https://your-domain.vercel.app/api/explain \
  -H "Content-Type: application/json" \
  -d '{
    "score": 85,
    "metrics": {
      "score": 85,
      "diversification": 25,
      "concentration": 18,
      "volatility": 22,
      "drawdown": 20,
      "totalValue": 1000000,
      "numHoldings": 27,
      "largestPosition": 5,
      "top3Concentration": 15,
      "hhi": 0.0421
    }
  }'
```

---

## 4. Data Models

### 4.1 Portfolio Row (CSV Input)

```typescript
interface PortfolioRow {
  symbol: string; // Stock ticker (e.g., "AAPL", "RELIANCE.NS")
  quantity: number; // Number of shares
  avg_price: number; // Average purchase price
  [key: string]: any; // Additional optional fields
}
```

### 4.2 Portfolio Score

```typescript
interface PortfolioScore {
  score: number; // 0-100 overall score
  diversification: number; // 0-30 points
  concentration: number; // 0-20 points
  volatility: number; // 0-25 points
  drawdown: number; // 0-25 points
  totalValue: number; // Sum of (quantity * avg_price)
  numHoldings: number; // Unique symbol count
  largestPosition: number; // Max weight as percentage
  top3Concentration: number; // Sum of top 3 weights
  hhi: number; // Herfindahl-Hirschman Index
}
```

### 4.3 Signal

```typescript
interface Signal {
  signal: "balanced" | "overweight" | "underweight";
  confidence: number; // 0.0 to 1.0
  explanation: string; // Human-readable reason
  weight?: number; // Position weight (for stock signals)
}
```

### 4.4 Backtest Result

```typescript
interface BacktestResult {
  // Active strategy
  totalReturn: number;
  returnPercentage: number;
  finalValue: number;
  initialValue: number;
  trades: number;
  winRate: number;
  maxDrawdown: number;

  // Passive benchmark
  passive: {
    totalReturn: number;
    returnPercentage: number;
    finalValue: number;
    maxDrawdown: number;
  };

  // Comparison
  alpha: number; // Active - Passive return %
}
```

---

## 5. Business Logic APIs

These are internal JavaScript modules, not HTTP endpoints. They can be imported and used directly.

### 5.1 calculatePortfolioScore(rows)

**Location:** `app/src/lib/scoring.js`

**Purpose:** Calculate portfolio health score from holdings data.

**Signature:**

```javascript
function calculatePortfolioScore(rows: PortfolioRow[]): PortfolioScore | null
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| rows | PortfolioRow[] | Array of portfolio holdings |

**Returns:** PortfolioScore object or null if empty

**Example:**

```javascript
import { calculatePortfolioScore } from "./lib/scoring";

const rows = [
  { symbol: "AAPL", quantity: 100, avg_price: 150 },
  { symbol: "GOOGL", quantity: 50, avg_price: 140 },
];

const score = calculatePortfolioScore(rows);
// { score: 45, diversification: 10, ... }
```

---

### 5.2 runBacktest({ rows, priceHistory, signalFn })

**Location:** `app/src/lib/backtesting.js`

**Purpose:** Simulate portfolio performance over time.

**Signature:**

```javascript
function runBacktest({
  rows: PortfolioRow[],
  priceHistory: PriceDay[],
  signalFn: Function
}): BacktestResult
```

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| rows | PortfolioRow[] | Initial holdings |
| priceHistory | PriceDay[] | Daily price data |
| signalFn | Function | Signal generation function |

**Returns:** BacktestResult object

**Example:**

```javascript
import { runBacktest } from "./lib/backtesting";
import { generateMockPriceHistory } from "./lib/mockPrices";

const result = runBacktest({
  rows: myPortfolio,
  priceHistory: generateMockPriceHistory(myPortfolio, 60),
  signalFn: stockSignal,
});
```

---

### 5.3 generateMockPriceHistory(rows, days)

**Location:** `app/src/lib/mockPrices.js`

**Purpose:** Generate deterministic simulated price data.

**Signature:**

```javascript
function generateMockPriceHistory(
  rows: PortfolioRow[],
  days?: number = 60
): PriceDay[]
```

**Parameters:**
| Name | Type | Default | Description |
|------|------|---------|-------------|
| rows | PortfolioRow[] | - | Holdings with initial prices |
| days | number | 60 | Number of days to simulate |

**Returns:** Array of PriceDay objects

**Price Generation Parameters:**
| Parameter | Value | Description |
|-----------|-------|-------------|
| Market Drift | +0.02%/day | Upward bias (~5% annual) |
| Daily Volatility | 1.5% | Standard deviation |
| Market Correlation | 40% | Shared movement factor |
| Random Seed | 12345 | For reproducibility |

---

### 5.4 detectSignalChange(previous, current)

**Location:** `app/src/lib/alerts.js`

**Purpose:** Detect when a signal has changed between analyses.

**Signature:**

```javascript
function detectSignalChange(
  previous: Signal | undefined,
  current: Signal
): string | null
```

**Returns:** Alert message string or null if no change

**Example:**

```javascript
import { detectSignalChange } from "./lib/alerts";

const prev = { signal: "balanced", confidence: 0.6 };
const curr = { signal: "overweight", confidence: 0.75 };

const alert = detectSignalChange(prev, curr);
// "Signal changed from balanced to overweight"
```

---

## 6. Error Handling

### 6.1 HTTP Error Codes

| Code | Meaning               | When                          |
| ---- | --------------------- | ----------------------------- |
| 200  | Success               | Request completed             |
| 400  | Bad Request           | Invalid or missing parameters |
| 405  | Method Not Allowed    | Wrong HTTP method             |
| 500  | Internal Server Error | Server-side failure           |

### 6.2 Error Response Format

```json
{
  "error": "Human-readable error message"
}
```

### 6.3 Client-Side Error Handling

```javascript
try {
  const res = await fetch("/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, metrics }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data.explanation;
} catch (err) {
  console.error("API Error:", err.message);
  // Handle error in UI
}
```

---

## 7. Rate Limiting

### 7.1 Current Limits

| Endpoint     | Limit        | Period              |
| ------------ | ------------ | ------------------- |
| /api/explain | 100 requests | per minute (Vercel) |

### 7.2 Handling Rate Limits

When rate limited, the server returns:

```http
HTTP/1.1 429 Too Many Requests
```

**Client Handling:**

```javascript
if (res.status === 429) {
  // Wait and retry
  await new Promise((r) => setTimeout(r, 5000));
  return retry();
}
```

---

## 8. Examples

### 8.1 Complete Integration Example

```javascript
// 1. Parse CSV
import Papa from "papaparse";

Papa.parse(csvFile, {
  header: true,
  complete: async (result) => {
    const rows = result.data;

    // 2. Calculate score
    const score = calculatePortfolioScore(rows);

    // 3. Generate signals
    const signals = rows.map((row) => ({
      symbol: row.symbol,
      signal: stockSignal(row, score.totalValue, score.numHoldings),
    }));

    // 4. Run backtest
    const backtest = runBacktest({
      rows,
      priceHistory: generateMockPriceHistory(rows),
      signalFn: stockSignal,
    });

    // 5. Get AI explanation
    const explanation = await fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: score.score, metrics: score }),
    }).then((r) => r.json());

    // 6. Render results
    console.log({ score, signals, backtest, explanation });
  },
});
```

### 8.2 Supabase Integration

```javascript
import { supabase } from "./lib/supabase";

// Upload file
const { data, error } = await supabase.storage
  .from("portfolio-files")
  .upload(`user123/${file.name}`, file);

// Create portfolio record
await supabase.from("portfolios").insert({
  user_id: "user123",
  upload_id: data.id,
  name: file.name,
});

// Fetch portfolio
const { data: portfolio } = await supabase
  .from("portfolios")
  .select("*")
  .eq("id", portfolioId)
  .single();
```

---

## 9. Changelog

| Version | Date     | Changes             |
| ------- | -------- | ------------------- |
| 1.0     | Jan 2026 | Initial API release |

---

## 10. Support

For API issues:

1. Check error messages
2. Verify request format
3. Check environment variables
4. Review server logs

---

**Document End**
