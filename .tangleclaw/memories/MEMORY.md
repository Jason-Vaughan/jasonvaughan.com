**Open / next session:** 
- **Migration:** Extract the missing virtual interview knowledge context from the `portfolio-chat` Cloudflare UI and perform the migration to a GitHub-backed Vercel route with Gemini embeddings (Issue #167).
- **Backlog:** Fill in `project-preferences.md`.
- **PAT rotation reminder:** `STATS_COLLECTOR_TOKEN` and `OPENAI_ADMIN_KEY` need manual rotation before they expire.

## Last Session (2026-10-05 — Comprehensive Stats API, Telemetry Reconstruction, Medusa Switchboard)

**What shipped:**
- Created a new Vercel serverless function (`/api/stats`) that dynamically aggregates telemetry from local baked stats, `_collect-meta.json` (cloud tokens), `monad-stats.json` (local inference), `git-stats.json` (commits), and `clawhub-versions.json` (downloads), exposing a unified AI compute velocity and performance payload with CORS headers.
- Handed off telemetry structure and project case study blurbs to the `vw-llc-1-631b333f` session via the Medusa switchboard for the Visual Works site.
- Hid specific targeted company passcodes (Anthropic, a16z, Designer Mode) from the public persona dropdown selector while maintaining direct secret link functionality.
- Added the `coding-stats` (Builder Stats) section to the `Recruiter`, `SystemsBuilder`, and `Engineer` persona views.

**What was learned:**
- When exposing multi-source telemetry via a unified `/api/stats` endpoint, the Vercel serverless function must manually orchestrate these external network calls to construct the expected payload for external API consumers, replacing the React frontend's scattered fetches.
- The receiving agent over the Medusa switchboard natively handles deep JSON parsing; flat payloads are not strictly necessary as long as the receiving agent is informed of the nested structure.
