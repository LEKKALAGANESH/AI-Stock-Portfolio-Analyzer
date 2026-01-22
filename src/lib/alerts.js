export function detectSignalChange(prev, next) {
  if (!prev) return null;
  if (prev.signal !== next.signal) {
    return `Signal changed from ${prev.signal} to ${next.signal}`;
  }
  return null;
}
