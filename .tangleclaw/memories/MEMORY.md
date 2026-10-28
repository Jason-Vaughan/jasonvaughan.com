**Open / next session:**
- **Feature backlog:** Evaluate or implement Issue #23 (`[feature] Add crypto tipping option (Coinbase Commerce)`), the sole remaining open issue on `Jason-Vaughan/jasonvaughan.com`.
- **Stale remote branch cleanup:** Confirm with operator whether remote branch `wrap/20260704013649-jasonvaughancomportfolio` (which has no open PR) should be retired.
- **PAT rotation reminder:** `STATS_COLLECTOR_TOKEN` and `OPENAI_ADMIN_KEY` need manual rotation before they expire.

## Last Session (2026-10-27 — Tech Debt Cleanup, WCAG Contrast, Monad-1 Grouped Models & Productivity Data Export)

**What shipped:**
- Cleaned up repository tech debt (PR #173 `@d4ab0a0`): tracked `public/share/kobold/index.html` and added a `SHARE_CARDS` filesystem parity test in `src/utils/shareLinks.test.js`, removed 20 tracked root scratch/debug scripts, archived `.tangleclaw/plans/openai-page-audit.md` to `.tangleclaw/plans/archive/`, fixed ESLint from 852 errors to 0 errors, and pruned merged remote `wrap/*` branches.
- Refreshed `src/data/baked-stats.json` with current TangleClaw telemetry (PR #174 `@bd40f81`).
- Merged WCAG AA tag-pill badge contrast fix (`#a1a1aa` to `#e4e4e7`) across 9 card components (PR #155 `@4e31a6c`).
- Implemented Issue #45 (PR #175 `@cc5acfe`): added `partitionMonadModels` in `src/utils/monadModels.js` (with unit tests in `src/utils/monadModels.test.js`) and updated `src/components/Infrastructure.jsx` to render Monad-1 `availableModels[]` in grouped `Resident now (N)` and `Also installed (N)` sections with empty-state helper text and legacy `currentModels` fallback.
- Produced both the full 10-file read-only historical productivity export (`tangleclaw_productivity_analysis_2025_2026.zip`) and the 4-file compact analysis package (`tangleclaw_compact_productivity_package_2025_2026.zip`, 13.6 KB) covering `2025-10-01` through `2026-10-16` across all 45 `Jason-Vaughan` repositories and TangleClaw telemetry.

**What was learned:**
- Adding a card to `SHARE_CARDS` in `scripts/gen-share-pages.mjs` requires committing the generated `public/share/<slug>/index.html` stub so `vercel.json` rewrites and git status stay in sync (`src/utils/shareLinks.test.js` now guards this).
- In `tangleclaw.db`, `medusa_exchanges` records both an `origin = 'send'` row and a mirror `origin = 'arrival'` row (`terminal_code = 'adopted-by-send'`) sharing the same `hub_id`; analytics must deduplicate by `hub_id` to avoid a 2x overcount.
- In Claude Code and Antigravity telemetry, `input_tokens` and `cached_input_tokens` are disjoint, whereas OpenAI Codex raw `input_tokens` includes `cached_input_tokens` (and `output_tokens` includes `reasoning_output_tokens`).
