/**
 * Format a positive integer with K/M/B suffix for display in stat tiles.
 * Negative inputs are not expected in this codebase (stats are counts) so they
 * fall through to toLocaleString without special handling.
 *
 * Boundaries:
 *   - >= 1B → "X.YB+"  (one decimal)
 *   - >= 1M → "X.YM+"  (one decimal)
 *   - >= 1K → "NK+"    (no decimal — floor)
 *   - <  1K → "N"      (raw toLocaleString)
 *
 * @param {number} n
 * @returns {string}
 */
export function formatBigNumber(n) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B+`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${Math.floor(n / 1000)}K+`;
  return n.toLocaleString();
}
