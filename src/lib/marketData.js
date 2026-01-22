export async function fetchPrices(symbols) {
  // Placeholder — replace with real API later
  return symbols.reduce((acc, s) => {
    acc[s] = {
      price: Math.random() * 1000,
      changePct: (Math.random() - 0.5) * 5,
    };
    return acc;
  }, {});
}
