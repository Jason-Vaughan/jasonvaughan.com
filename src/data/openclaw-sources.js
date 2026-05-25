// Shared registry of self-publishing AI inference sources. Used in two places:
//   - Infrastructure.jsx  → Monad-1 card aggregates Volta tokens into its display
//   - BuilderStats.jsx    → top-bar AI Tokens tile adds local inference to the
//                           cloud-provider totals so the headline counter
//                           reflects "all AI work, anywhere I run it"
//
// Adding a new OpenClaw agent that publishes its own stats.json:
//   1. Append { name, url } to OPENCLAW_AGENT_STATS_URLS below
//   2. Make sure its `tokens` field shape matches readTokenScalar() — either
//      scalar (`tokens.total: 1234`) OR nested (`tokens.total: { total: 1234 }`)
//      Both Monad's contract and Volta's nested contract are handled.

export const MONAD_STATS_URL =
  "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/monad-stats.json";

export const OPENCLAW_AGENT_STATS_URLS = [
  {
    name: "Volta",
    url: "https://raw.githubusercontent.com/Jason-Vaughan/volta-stats/main/stats.json",
  },
];

/**
 * Read a tokens.* field which may be a plain number (Monad-style: tokens.total = N)
 * OR a nested object with its own `total` key (Volta-style: tokens.total = { input,
 * output, total, requests }). Returns 0 for missing / malformed data.
 */
export function readTokenScalar(v) {
  if (typeof v === "number") return v;
  if (v && typeof v === "object" && typeof v.total === "number") return v.total;
  return 0;
}
