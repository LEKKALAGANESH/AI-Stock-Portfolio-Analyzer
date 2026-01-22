# Technical Architecture Report

## AI Stock Portfolio Analyzer

**Version:** 1.0
**Date:** January 2026
**Document Type:** Technical Architecture

---

## 1. System Overview

The AI Stock Portfolio Analyzer is a web-based application that analyzes investment portfolios for diversification, concentration risk, and structural health. It provides educational insights without offering investment advice.

### 1.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  UploadPage  │  │ FileDetails  │  │ AnalyzePage  │          │
│  │              │  │    Page      │  │              │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│  ┌──────┴─────────────────┴─────────────────┴───────┐          │
│  │              Shared Components                    │          │
│  │  (MetricCard, DataTable, SignalBadge, etc.)      │          │
│  └──────────────────────┬───────────────────────────┘          │
│                         │                                       │
│  ┌──────────────────────┴───────────────────────────┐          │
│  │              Business Logic Layer                 │          │
│  │  scoring.js │ backtesting.js │ alerts.js         │          │
│  └──────────────────────┬───────────────────────────┘          │
└─────────────────────────┼───────────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────────┐
│                    BACKEND SERVICES                              │
├─────────────────────────┼───────────────────────────────────────┤
│  ┌──────────────────────┴───────────────────────────┐          │
│  │                 Supabase                          │          │
│  │  ┌─────────────┐  ┌─────────────┐                │          │
│  │  │  Database   │  │   Storage   │                │          │
│  │  │ (PostgreSQL)│  │   (Files)   │                │          │
│  │  └─────────────┘  └─────────────┘                │          │
│  └──────────────────────────────────────────────────┘          │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │              Vercel Serverless                    │          │
│  │  ┌─────────────────────────────────┐             │          │
│  │  │  /api/explain (AI Endpoint)     │             │          │
│  │  └─────────────────────────────────┘             │          │
│  └──────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework |
| Vite | 5.x | Build tool & dev server |
| React Router | 6.x | Client-side routing |
| Styled Components | 6.x | CSS-in-JS styling |
| PapaParse | 5.x | CSV parsing |

### 2.2 Backend

| Technology | Purpose |
|------------|---------|
| Supabase | Database (PostgreSQL) + File Storage |
| Vercel Serverless | API endpoints |
| OpenAI API | AI-powered explanations |

### 2.3 Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Vite | Hot module replacement |
| VS Code | IDE with launch configs |

---

## 3. Data Flow

### 3.1 Portfolio Upload Flow

```
User uploads CSV
       │
       ▼
┌─────────────────┐
│  PapaParse      │ ─── Validates CSV structure
│  (Client-side)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Supabase       │ ─── Stores file in storage bucket
│  Storage        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Supabase       │ ─── Creates portfolio record
│  Database       │
└────────┬────────┘
         │
         ▼
   Redirect to AnalyzePage
```

### 3.2 Analysis Flow

```
AnalyzePage loads
       │
       ▼
┌─────────────────┐
│  Fetch CSV from │
│  Supabase       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Calculate      │
│  Portfolio      │ ─── scoring.js
│  Score          │
└────────┬────────┘
         │
         ├────────────────────────────┐
         │                            │
         ▼                            ▼
┌─────────────────┐          ┌─────────────────┐
│  Run Backtest   │          │  Fetch AI       │
│  (backtesting.js)          │  Explanation    │
└────────┬────────┘          └────────┬────────┘
         │                            │
         └────────────┬───────────────┘
                      │
                      ▼
              Render Dashboard
```

---

## 4. Component Architecture

### 4.1 Page Components

#### UploadPage
- **Responsibility:** File upload and validation
- **State:** file, uploading, error
- **Dependencies:** Supabase storage

#### FileDetailsPage
- **Responsibility:** Display uploaded file info
- **State:** portfolio, loading
- **Dependencies:** Supabase database

#### AnalyzePage
- **Responsibility:** Portfolio analysis dashboard
- **State:** rows, score, alerts, aiText, confidenceThreshold
- **Dependencies:** scoring.js, backtesting.js, alerts.js

### 4.2 Shared Components

| Component | Props | Purpose |
|-----------|-------|---------|
| MetricCard | label, value, subtext, tone | Display single metric |
| SignalBadge | signal, confidence, muted | Show signal indicator |
| DataTable | columns, rows, renderCell | Tabular data display |
| AlertPanel | alerts | Signal change notifications |
| Skeleton | height, width | Loading placeholder |

---

## 5. Business Logic Modules

### 5.1 scoring.js

**Purpose:** Calculate portfolio health score (0-100)

**Algorithm:**
```
Total Score = Diversification (0-30)
            + Concentration (0-20)
            + Volatility (0-25)
            + Drawdown Risk (0-25)
```

**Key Metrics:**
- `numHoldings` - Number of unique stocks
- `largestPosition` - Weight of biggest holding (%)
- `top3Concentration` - Combined weight of top 3 (%)
- `hhi` - Herfindahl-Hirschman Index

### 5.2 backtesting.js

**Purpose:** Simulate portfolio performance over 60 days

**Features:**
- Active rebalancing strategy
- Passive buy-and-hold benchmark
- Alpha calculation (active vs passive)
- Drawdown tracking

**Signal Logic:**
- Overweight: position > 20% of portfolio
- Underweight: position < 3% of portfolio
- Balanced: within target range

### 5.3 mockPrices.js

**Purpose:** Generate deterministic price simulations

**Parameters:**
- Market drift: +0.02%/day (~5% annual)
- Daily volatility: 1.5% standard deviation
- Market correlation: 40% shared movement
- Seeded random for reproducibility

### 5.4 alerts.js

**Purpose:** Detect signal changes between analyses

**Detection:**
- Compares previous signal to current
- Generates human-readable alert messages
- Tracks portfolio-level and stock-level changes

---

## 6. State Management

### 6.1 Local Component State

Each page manages its own state using React `useState`:

```javascript
// AnalyzePage state
const [rows, setRows] = useState([]);           // Portfolio holdings
const [score, setScore] = useState(null);       // Calculated metrics
const [loading, setLoading] = useState(true);   // Loading state
const [confidenceThreshold, setConfidenceThreshold] = useState(0.6);
const [alerts, setAlerts] = useState([]);       // Signal changes
```

### 6.2 Theme Context

Global theme state managed via React Context:

```javascript
// ThemeContext provides:
- theme: 'light' | 'dark'
- toggleTheme: () => void
```

---

## 7. Security Considerations

### 7.1 Data Protection

| Layer | Protection |
|-------|------------|
| File Upload | Client-side validation, size limits |
| Storage | Supabase RLS (Row Level Security) |
| API Keys | Environment variables, server-side only |
| Database | Prepared statements via Supabase SDK |

### 7.2 Input Validation

- CSV structure validated before processing
- Numeric fields parsed with fallback to 0
- No SQL injection (ORM handles queries)
- No XSS (React escapes output by default)

---

## 8. Performance Optimizations

### 8.1 Frontend

- **Code Splitting:** Vite automatic chunking
- **Lazy Loading:** React Router lazy routes (potential)
- **Memoization:** Expensive calculations cached
- **Skeleton Loading:** Perceived performance improvement

### 8.2 Backend

- **Signed URLs:** Temporary access to stored files
- **Serverless:** Auto-scaling API endpoints
- **CDN:** Static assets served via Vercel Edge

---

## 9. Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Vercel                                   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐          ┌─────────────────┐              │
│  │  Static Assets  │          │  Serverless     │              │
│  │  (React Build)  │          │  Functions      │              │
│  │                 │          │  (/api/*)       │              │
│  └────────┬────────┘          └────────┬────────┘              │
│           │                            │                        │
│           └──────────┬─────────────────┘                        │
│                      │                                          │
└──────────────────────┼──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Supabase                                   │
│  ┌─────────────────┐          ┌─────────────────┐              │
│  │    PostgreSQL   │          │  Object Storage │              │
│  │    Database     │          │  (CSV Files)    │              │
│  └─────────────────┘          └─────────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. File Structure Summary

```
AI Stock Portfolio Analyzer/
├── app/
│   ├── api/
│   │   └── explain.js          # AI endpoint
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React Context providers
│   │   ├── lib/                # Business logic
│   │   ├── pages/              # Route components
│   │   ├── styles/             # Styled components
│   │   ├── App.jsx             # Root component
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   └── vite.config.js
├── docs/                        # Documentation
└── sample_portfolio.csv         # Example data
```

---

**Document End**
