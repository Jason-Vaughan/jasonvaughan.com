# Wrap Log — demoted session blocks

Older `Last Session` blocks demoted from `MEMORY.md` to keep it scannable. Most-recent first. The full canon for stats infrastructure lives in the auto-memory files (e.g. `project_stats_agent_tcc_fix`, `project_stats_system`).

## Last Session (2026-06-21/22 — stats-pipeline rescue + Antigravity + Notse downloads)

Marathon session. Started as a "what's next" comparison, turned into a major infra + portfolio run. All shipped & merged. Portfolio PRs **#73–#79**; project-assets several direct-to-main commits + the daily collector re-run repeatedly.

**Big wins:**
1. **Claude tokens were frozen 7 weeks** — the `~/.claude-stats/refresh.sh` launchd agent silently failed every run since 2026-04-28: macOS **TCC blocks launchd writing into `~/Documents`**. Fix: moved the project-assets clone to **`~/code/project-assets`** (compat symlink left at old path; `PROJECT_ASSETS` var repointed); made the Gemini telemetry parse **incremental** (byte-offset); reordered git (commit before `pull --rebase --autostash`). Headline **~9.3B → ~15.7B** (Claude 1.85B → ~8.2B). See auto-memory `project_stats_agent_tcc_fix`.
2. **Disk: ~88 GB freed.** Gemini `telemetry.log` was **72 GB** (re-logs its 39KB system prompt every event, no rotation) → trimmed to 10 GB + rolling cap (hysteresis 12/8 GB to avoid daily 10GB-rewrite thrash). Source of the gemini churn = a **forgotten Medusa A2A swarm** of long-lived `agy`/qwen agents (dormant since 6-12, now parked — Gemini OAuth dead anyway). Deleted **24 GB stale Apple Mail logs** + turned off `LogActivityToFile` (Mail shouldn't be on Cursatory). Freed space sits in Time Machine local snapshots (~24h to reclaim).
3. **Gemini CLI sunset → Antigravity.** Google killed Gemini CLI personal OAuth (migrate to Antigravity). Filed **TangleClaw#392**. Wired Antigravity (`agy`) token usage into the collector by reverse-engineering its SQLite `gen_metadata` protobuf → `meta.versions` + `meta.downloads`. New `fetchLatestReleaseInfo` + tests (project-assets 59/59).
4. **Collector hardened:** `js-yaml` ESM default-export break → named `import { load }`; **race-safe push** (rebase+retry — it shares main with the frequently-pushing agent).
5. **Volta double-count removed (#73).** Monad confirmed its `tokens.total` already counts all routed agent traffic (LiteLLM :4000 + Ollama tee :11435); **closed raw :11434 (their #61) → count airtight**. Emptied `OPENCLAW_AGENT_STATS_URLS`. Also fixed the original ~432k-tokens/$1 Monad-card mismatch. Principle saved: auto-memory `project_token_counting_principle` (count once at the router; Monad now, **TangleBrain when it meters**).
6. **Version sync (#74).** `/notse` hardcoded v0.5.12 while the card showed live v0.5.20. Now every surface reads `manifest.versions` (daily `fetchLatestRelease` → latest STABLE tag, configured in `projects.yml` `versions:`; independent of the stats exclude list so `notse-releases` works). `src/version-consistency.test.js` fails the build on any hardcoded `vX.Y.Z` in `public/**/*.html`.
7. **Notse downloads (#75–#79).** Collector captures release assets → `meta.downloads`. `/notse` hero has prominent **Download for Mac/Windows** buttons (centered, with a "two machines — download both" callout ABOVE them) + a **Quick start** section (sourced from notse-releases' GETTING-STARTED.md / release notes); project card has a **"Download both apps — the Prompter (Mac) and the Helper (Windows)"** labeled pill row. Both wired to `manifest.downloads.notse` → **always the latest build**, auto-updating on a new release.

**Key facts:**
- project-assets clone is now at **`~/code/project-assets`** (NOT ~/Documents — TCC). The launchd stats agent self-heals daily 05:30 PT.
- Version chips + download links are **single-sourced from the collector manifest** (`versions` / `downloads`). To add a version/download for a new card: add `slug: Owner/Repo` to `projects.yml` `versions:`. NEVER hardcode versions (test enforces).
- `OPENCLAW_AGENT_STATS_URLS` is **empty by design** — routed agents double-count Monad. Don't re-add.
