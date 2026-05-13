/**
 * Format a positive integer with K/M/B suffix for display in stat tiles.
 * Negative inputs are not expected in this codebase (stats are counts) so they
 * fall through to toLocaleString without special handling.
 *
 * Precision rules (chosen to make small changes visible):
 *   - <  1K       → "N"        (raw toLocaleString)
 *   - 1K-100K     → "N.NK+"    (one decimal — surfaces hundreds-level moves)
 *   - 100K-1M     → "NK+"      (whole K — value already has 3 sig figs)
 *   - 1M+         → "N.NM+"    (one decimal)
 *   - 1B+         → "N.NB+"    (one decimal)
 *
 * @param {number} n
 * @returns {string}
 */
export function formatBigNumber(n) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B+`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 100_000) return `${Math.floor(n / 1000)}K+`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1)}K+`;
  return n.toLocaleString();
}

/**
 * Format a delta (signed) for display next to a stat tile.
 * Always shows the sign so positive numbers read as "+12" not "12".
 *
 * @param {number} d
 * @returns {string}
 */
export function formatDelta(d) {
  if (d === 0) return "±0";
  const sign = d > 0 ? "+" : "−"; // unicode minus for visual symmetry with +
  const abs = Math.abs(d);
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}${(abs / 1000).toFixed(abs >= 100_000 ? 0 : 1)}K`;
  return `${sign}${abs.toLocaleString()}`;
}
