# Session Memory

This file persists context across AI sessions. Update it with key decisions, progress, and open questions.

## Last Session (2026-04-27 — into 2026-04-28 UTC)

**What happened:** A long, deep session — touched both repos heavily. Three big arcs:

1. **Centralized stats collector** built in `Jason-Vaughan/project-assets` to replace the 8 per-repo `stats.yml` workflows. Closes portfolio issue #1. Auto-discovers every Jason-Vaughan repo, computes LOC/tests/commits/contributors/languages, writes `_collect-meta.json` manifest. Daily cron 06:00 UTC + manual dispatch. All 8 source repos cleaned (workflows + PATs + committed stats.json removed).

2. **AI token aggregation** layered onto the same collector: pulls from Anthropic admin API (404s for personal accounts — falls back to local agent), OpenAI admin API (works), local agent JSON files for ccusage + Gemini telemetry, static `manual.<provider>` entries, and date-prorated formulas. Live total now ~9.3B tokens. New 5th headline stat in BuilderStats: "AI Tokens".

3. **Portfolio polish** — Cierre Sensei promoted to a 3rd hero card, Pipeline section added below Projects with two stages (Public Beta = Medusa, In Development = UCI), per-card live stats + auto language tags, status badges (Open Source / SaaS / Commercial / Archived), Notse marked closed-source, smooth-scroll for in-page anchor links.

**Major deliverables (artifacts you can find):**
- `Jason-Vaughan/project-assets/.github/workflows/collect-stats.yml` (workflow), `projects.yml` (config), `scripts/collect-stats.mjs`, `scripts/lib/{git-stats,tokens}.mjs`, `scripts/counters/{tangleclaw,tilt}.mjs`
- `Jason-Vaughan/project-assets/local-agent/{refresh.sh,plist,gemini-telemetry-snippet.json,README.md}` — disaster-recovery copies of the local agent
- `~/.claude-stats/refresh.sh` (deployed) + `~/Library/LaunchAgents/com.jasonvaughan.claude-stats.plist` (deployed) on Cursatory
- `~/.gemini/settings.json` updated with telemetry config
- Portfolio: new `Pipeline.jsx`, `FeaturedCierreSensei.jsx`, `utils/languageTags.js`; existing `BuilderStats`, `Projects`, `FeaturedProject`, `FeaturedTangleClaw` all extended

**Key decisions:**
- Self-discovery beats curated list: collector reads `/user/repos`, exclude list in `projects.yml` instead of include list
- Token aggregation is **additive** across source types per provider (api + agent + manual + prorated). Convention: never put the same usage in two source types
- Local agent on Cursatory pushes daily at 05:30 PT (before GitHub cron at 06:00 UTC); SSHs to habitat for habitat's ccusage data
- Cursor and TypingMind prepaid usage are static manual entries; ccusage and Gemini telemetry are auto-refreshed via local agent
- Pipeline section auto-hides empty stages (so "Public Beta" disappears the moment Medusa graduates to a hero card)

**Infrastructure secrets (current):**
- `STATS_COLLECTOR_TOKEN` on `Jason-Vaughan/project-assets` (fine-grained PAT, all-repos, contents+metadata read)
- `OPENAI_ADMIN_KEY` on `Jason-Vaughan/project-assets` (admin API, usage:read)
- `ANTHROPIC_ADMIN_KEY` — NOT SET (admin API not available for personal Anthropic accounts; ccusage local agent fills the gap)
- All 8 source repos had their `PROJECT_ASSETS_TOKEN` deleted as part of the cleanup

**Critic review (passed):** One BLOCKER (gemini-usage.json wasn't being `git add`-ed in the daily refresh) and several IMPORTANT findings (silent regression on partial habitat outage, console log clarity, React key collision risk, BuilderStats silent fetch failures, stale JSDoc, CHANGELOG hygiene). All fixed in commits `71ddb96` (project-assets) and `928bafa` (portfolio).

## Open items / next session

- **Cursor entry is static** (7B from one-time CSV export). User said they don't use Cursor anymore so won't grow. Re-export and bump if usage resumes.
- **Stale `ci/stats-*` branches and `stash@{0}`** on TangleClaw / OnDeck-V9 / Notse — left intact per user request. Phase 5 cleanup deferred indefinitely.
- **OnDeck-V9 `ci/stats-workflow` -> main** — when user merges, remove the `branch: ci/stats-workflow` override line in `project-assets/projects.yml`.
- **rentalclaw-project** is currently auto-discovered (98 commits as of session end). User hasn't said whether to exclude it. If unrelated, add to `projects.yml#exclude`.
- **UCI repo** has 2 commits and the user is building it. Pipeline card has no link yet — once user wants public visibility, add `link: "https://github.com/Jason-Vaughan/UCI"` (verify exact slug) and `linkLabel: "View on GitHub"`.
- **Self-hosted LLM router (Kimi 2.5 / DeepSeek)** is on user's roadmap. Token tracking for it will use the `remoteStats` URL pattern when ready (~15 min wiring).
- **PAT rotation reminder**: `STATS_COLLECTOR_TOKEN` and `OPENAI_ADMIN_KEY` need manual rotation before they expire.
- **Color contrast**: critic flagged tag pill text (`#a1a1aa` on near-black) is below WCAG AA 4.5:1 for small text. Consistent across the site so leaving for a dedicated accessibility pass.

## Lessons learned this session

- **Critic review surfaces silent failures the builder misses** — the BLOCKER finding (gemini-usage.json never committed) was invisible from the builder's perspective because the file existed locally and the Anthropic flow worked. A run agent that tested both providers end-to-end would have caught it; a code review caught it instantly.
- **MultiSelect AskUserQuestion options must be independent items, not cumulative supersets** — already saved as a feedback memory.
- **Pasted secrets (PATs) are compromised the moment they hit the chat** — rotate immediately, even after they're added as repo secrets.
- **GitHub Pages deploy lag** is real — about 1-2 minutes from push to live. Cache-bust by appending `?$(date +%s)` when verifying changes via curl on raw.githubusercontent.com (and even that doesn't always work — GitHub caches by file hash).
- **macOS launchd at 05:30 PT vs GitHub cron at 06:00 UTC** means agent updates are at most ~24h behind GitHub stats, but they land within the same daily window. Acceptable for vanity stats.

## Earlier sessions (preserved for context)

### 2026-04-13 — Initial portfolio launch

Massive shipping session — portfolio went from dev-only to live at jasonvaughan.com. TangleClaw hero card, Contact form (Web3Forms), ScrapeGoat + ClawBridge cards, TiLT stats corrected, Builder Stats bar, GitHub Pages deployment, custom domain (GoDaddy DNS → GitHub IPs, Let's Encrypt SSL). Stats system was per-repo `stats.yml` workflows in 8 repos with `PROJECT_ASSETS_TOKEN` for the 4 private ones. (All replaced this session.)

### 2026-04-14 — Commits + "Building since" badge

Added live commit count and month-of-first-commit badge to TiLT and TangleClaw hero cards. Refuctor stats handled gracefully via Promise.allSettled.

### Email status

Cancelled Google Workspace migration in April — addresses were "in use" but GW wouldn't say where. Signed up for Outlook via GoDaddy for 6-12 months. Goal: eventually resolve the conflict and migrate to GW.
