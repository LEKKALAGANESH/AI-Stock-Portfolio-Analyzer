# AI Stock Portfolio Analyzer

A React-based web application that analyzes stock portfolios using AI-powered insights. Upload your portfolio CSV and get detailed analysis including health scores, diversification metrics, risk assessment, and AI-generated explanations.

## Features

- **Portfolio Upload** - Upload CSV files containing your stock holdings
- **Health Score Analysis** - Get a comprehensive portfolio health score (0-100)
- **Diversification Metrics** - View holdings count, largest position, and top 3 concentration
- **Signal Detection** - Identify overweight, underweight, and balanced positions
- **AI Explanations** - Get AI-powered insights using Google Gemini API
- **Backtesting** - Simulated 60-day backtest comparing active vs passive strategies
- **Confidence Controls** - Adjust signal sensitivity thresholds
- **Alert System** - Real-time alerts for signal changes

## Tech Stack

- **Frontend**: React 18, Vite, Styled Components
- **Backend**: Supabase (Database & Storage)
- **AI**: Google Gemini API
- **Charts**: Recharts
- **Routing**: React Router DOM
- **CSV Parsing**: PapaParse

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Google Gemini API key

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/LEKKALAGANESH/AI-Stock-Portfolio-Analyzer.git
   cd AI-Stock-Portfolio-Analyzer/app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the `app` directory
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to the home page
2. Upload a CSV file with your portfolio data
3. The CSV should contain columns: `symbol`, `quantity`, `avg_price`
4. View your portfolio analysis with health scores and AI insights

### Sample CSV Format

```csv
symbol,quantity,avg_price
RELIANCE,50,2450.75
TCS,30,3890.50
INFY,100,1456.25
HDFC,25,1678.90
```

## Project Structure

```
app/
├── api/
│   └── explain.js          # Gemini AI API endpoint
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── lib/                # Utility functions
│   ├── styles/             # Styled components
│   ├── context/            # React context
│   └── App.jsx             # Main app component
├── package.json
└── vite.config.js
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Disclaimer

This application is for **educational and informational purposes only**. It does not constitute investment advice. The signals and scores are analytical indicators, not buy/sell recommendations. Always consult a qualified financial advisor before making investment decisions.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Author

**Lekkala Ganesh**

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
