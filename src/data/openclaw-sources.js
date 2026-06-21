// Shared registry of self-publishing AI inference sources, used by:
//   - Infrastructure.jsx  → Monad-1 card "tokens served" tile
//   - BuilderStats.jsx    → top-bar AI Tokens tile (local inference is added to the
//                           cloud-provider manifest totals)
//
// OPENCLAW_AGENT_STATS_URLS is intentionally EMPTY — do not "fix" it by re-adding
// an agent. OpenClaw agents (Volta, etc.) are CLIENTS that route their inference to
// a backing rig/provider; they are NOT independent token sources. The Monad-1
// publisher confirmed (2026-06) that its `tokens.total` ALREADY counts everything
// agents route to it: LiteLLM proxy (:4000) + a direct-Ollama tee (:11435).
// Cross-checked empirically — the tee's 61.4M ≈ Volta's self-reported 61.5M, i.e.
// Volta's tokens were already inside Monad's number. Summing an agent here on top
// of Monad (or on top of a cloud provider's account-level API) DOUBLE-COUNTS.
//
// Only add a source whose tokens are counted NOWHERE else — a genuinely standalone
// rig with its own meter that no provider API or backing publisher already sees.
// A routed agent is covered by its backing source's number; leave it out.

export const MONAD_STATS_URL =
  "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/monad-stats.json";

// Empty by design (see note above). Was [Volta]; removed 2026-06 as a proven
// double-count of Monad-1's tokens.total.
export const OPENCLAW_AGENT_STATS_URLS = [];

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
