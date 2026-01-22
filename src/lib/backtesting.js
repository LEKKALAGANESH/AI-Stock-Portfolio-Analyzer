/**
 * Backtesting engine (v3)
 * -----------------------
 * - Deterministic
 * - No async
 * - No React
 * - No external APIs
 *
 * Assumptions (explicit):
 * - Prices are daily closing prices
 * - Signals are evaluated daily based on CURRENT prices
 * - UNDERWEIGHT = position is too small relative to target
 * - OVERWEIGHT = position is too large relative to target
 * - BALANCED = properly allocated
 *
 * Compares active rebalancing strategy vs passive buy-and-hold
 */

/**
 * Calculate signal based on current portfolio state
 * Uses current prices, not original CSV prices
 */
function calculateCurrentSignal(symbol, quantity, currentPrice, totalPortfolioValue) {
  const positionValue = quantity * currentPrice;
  const weight = positionValue / totalPortfolioValue;

  if (weight > 0.20) {
    return {
      signal: "overweight",
      confidence: 0.65 + (weight - 0.20) * 0.5, // Higher confidence for more extreme positions
      weight,
    };
  }

  if (weight < 0.03) {
    return {
      signal: "underweight",
      confidence: 0.55,
      weight,
    };
  }

  return {
    signal: "balanced",
    confidence: 0.6,
    weight,
  };
}

export function runBacktest({ rows, priceHistory, signalFn }) {
  // Calculate initial portfolio value
  const initialHoldings = {};
  let initialValue = 0;

  rows.forEach((row) => {
    const qty = Number(row.quantity);
    const price = Number(row.avg_price);
    initialHoldings[row.symbol] = { quantity: qty, avgPrice: price };
    initialValue += qty * price;
  });

  // --- PASSIVE STRATEGY (Buy and Hold) ---
  let passiveEquityCurve = [initialValue];

  // --- ACTIVE STRATEGY (Rebalancing) ---
  let activeHoldings = {};
  rows.forEach((row) => {
    activeHoldings[row.symbol] = {
      quantity: Number(row.quantity),
      avgPrice: Number(row.avg_price),
    };
  });

  let activeCash = 0;
  let activeEquityCurve = [initialValue];
  let trades = [];

  // Target weight per position (equal weight rebalancing)
  const numPositions = rows.length;
  const targetWeight = 1 / numPositions;

  priceHistory.forEach((day, dayIndex) => {
    // Calculate passive portfolio value
    let passiveValue = 0;
    rows.forEach((row) => {
      const price = day.prices[row.symbol];
      if (price) {
        passiveValue += initialHoldings[row.symbol].quantity * price;
      }
    });
    passiveEquityCurve.push(passiveValue);

    // Calculate active portfolio value
    let activeValue = activeCash;
    Object.entries(activeHoldings).forEach(([symbol, holding]) => {
      const price = day.prices[symbol];
      if (price && holding.quantity > 0) {
        activeValue += holding.quantity * price;
      }
    });

    // Check signals and rebalance (only after day 5 to let prices stabilize)
    if (dayIndex > 5 && dayIndex % 5 === 0) {
      // Check every 5 days
      Object.entries(activeHoldings).forEach(([symbol, holding]) => {
        const price = day.prices[symbol];
        if (!price || holding.quantity <= 0) return;

        const signal = calculateCurrentSignal(
          symbol,
          holding.quantity,
          price,
          activeValue
        );

        // Rebalance overweight positions
        if (signal.signal === "overweight" && signal.weight > 0.25) {
          const currentValue = holding.quantity * price;
          const targetValue = activeValue * targetWeight;
          const excessValue = currentValue - targetValue;

          if (excessValue > 0) {
            const sharesToSell = Math.floor(excessValue / price);
            if (sharesToSell > 0) {
              const proceeds = sharesToSell * price;
              holding.quantity -= sharesToSell;
              activeCash += proceeds;

              trades.push({
                day: dayIndex,
                symbol,
                action: "SELL",
                shares: sharesToSell,
                price,
                value: proceeds,
              });
            }
          }
        }
      });

      // Redistribute cash to underweight positions
      if (activeCash > 100) {
        const underweightPositions = Object.entries(activeHoldings)
          .map(([symbol, holding]) => {
            const price = day.prices[symbol];
            if (!price) return null;
            const signal = calculateCurrentSignal(
              symbol,
              holding.quantity,
              price,
              activeValue
            );
            return { symbol, holding, price, signal };
          })
          .filter((p) => p && p.signal.signal === "underweight")
          .sort((a, b) => a.signal.weight - b.signal.weight); // Most underweight first

        underweightPositions.forEach((pos) => {
          if (activeCash < 100) return;

          const targetValue = activeValue * targetWeight;
          const currentValue = pos.holding.quantity * pos.price;
          const deficit = targetValue - currentValue;
          const buyAmount = Math.min(deficit, activeCash * 0.5);
          const sharesToBuy = Math.floor(buyAmount / pos.price);

          if (sharesToBuy > 0) {
            const cost = sharesToBuy * pos.price;
            pos.holding.quantity += sharesToBuy;
            activeCash -= cost;

            trades.push({
              day: dayIndex,
              symbol: pos.symbol,
              action: "BUY",
              shares: sharesToBuy,
              price: pos.price,
              value: cost,
            });
          }
        });
      }
    }

    // Recalculate active value after trades
    activeValue = activeCash;
    Object.entries(activeHoldings).forEach(([symbol, holding]) => {
      const price = day.prices[symbol];
      if (price && holding.quantity > 0) {
        activeValue += holding.quantity * price;
      }
    });
    activeEquityCurve.push(activeValue);
  });

  // Calculate metrics
  const passiveFinal = passiveEquityCurve[passiveEquityCurve.length - 1];
  const activeFinal = activeEquityCurve[activeEquityCurve.length - 1];

  const passiveReturn = passiveFinal - initialValue;
  const passiveReturnPct = (passiveReturn / initialValue) * 100;

  const activeReturn = activeFinal - initialValue;
  const activeReturnPct = (activeReturn / initialValue) * 100;

  const wins = trades.filter(
    (t) => t.action === "SELL" && t.value > t.shares * initialHoldings[t.symbol]?.avgPrice
  ).length;

  return {
    // Active strategy results
    totalReturn: activeReturn,
    returnPercentage: activeReturnPct,
    finalValue: activeFinal,
    initialValue: initialValue,
    trades: trades.length,
    winRate: trades.length ? wins / trades.filter((t) => t.action === "SELL").length || 0 : 0,
    maxDrawdown: calculateDrawdown(activeEquityCurve),

    // Passive benchmark for comparison
    passive: {
      totalReturn: passiveReturn,
      returnPercentage: passiveReturnPct,
      finalValue: passiveFinal,
      maxDrawdown: calculateDrawdown(passiveEquityCurve),
    },

    // Alpha: active outperformance vs passive
    alpha: activeReturnPct - passiveReturnPct,
  };
}

/* ---------- Helpers ---------- */

function calculateDrawdown(curve) {
  let peak = curve[0] || 0;
  let maxDD = 0;

  curve.forEach((value) => {
    peak = Math.max(peak, value);
    const dd = peak ? (peak - value) / peak : 0;
    maxDD = Math.max(maxDD, dd);
  });

  return maxDD;
}
