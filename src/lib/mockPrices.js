/**
 * Generates mock daily prices for backtesting
 * Uses seeded random for reproducibility and realistic market scenarios
 */

// Simple seeded random number generator for reproducibility
function createSeededRandom(seed = 42) {
  let state = seed;
  return function () {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

export function generateMockPriceHistory(rows, days = 60) {
  const history = [];
  const random = createSeededRandom(12345); // Fixed seed for reproducibility

  // Initialize current prices from CSV
  let currentPrices = {};
  rows.forEach((row) => {
    currentPrices[row.symbol] = Number(row.avg_price);
  });

  // Market trend: slight upward bias (0.02% daily = ~5% annually)
  const marketDrift = 0.0002;

  // Daily volatility: 1.5% standard deviation (realistic for stocks)
  const dailyVolatility = 0.015;

  // Simulate market correlation: all stocks share some common movement
  const marketCorrelation = 0.4;

  for (let d = 0; d < days; d++) {
    // Market-wide factor for this day
    const marketMove = (random() - 0.5) * 2 * dailyVolatility;

    const prices = {};

    Object.entries(currentPrices).forEach(([symbol, price]) => {
      // Individual stock movement
      const stockMove = (random() - 0.5) * 2 * dailyVolatility;

      // Combined movement: market correlation + individual movement + drift
      const totalMove =
        marketDrift +
        marketCorrelation * marketMove +
        (1 - marketCorrelation) * stockMove;

      // Apply change
      const newPrice = price * (1 + totalMove);
      currentPrices[symbol] = newPrice;
      prices[symbol] = newPrice;
    });

    history.push({
      day: d + 1,
      prices,
      totalValue: Object.values(prices).reduce((a, p) => a + p, 0),
    });
  }

  return history;
}
