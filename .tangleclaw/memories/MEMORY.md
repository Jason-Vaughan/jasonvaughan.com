**Open / next session:** 
- **Migration:** Extract the missing virtual interview knowledge context from the `portfolio-chat` Cloudflare UI and perform the migration to a GitHub-backed Vercel route with Gemini embeddings (Issue #167).
- **Backlog:** Fill in `project-preferences.md`.
- **PAT rotation reminder:** `STATS_COLLECTOR_TOKEN` and `OPENAI_ADMIN_KEY` need manual rotation before they expire.

## Last Session (2026-09-20 — Cross-Agent Ops & UI Updates)

**What shipped:**
- Fulfilled Medusa Switchboard capability requests: integrated `react-markdown` into the virtual interview ChatWidget, and updated the TangleClaw portfolio project entry to `.com` and rewrote its description to highlight its "AI-native SDLC orchestration platform" pivot.
- Wrote extensive multi-paragraph Case Studies for the portfolio projects (`projects.js`), avoiding generic stub content.
- Replaced a static Cursor 7B token stat with dynamic fallback telemetry (`scripts/bake-stats.mjs`) fetched at build time.
- Investigated the missing "deep interview records" for the portfolio chatbot and confirmed they exist only within the Cloudflare Worker web UI context, isolated from local code or GitHub repositories. Opened tracking Issue #167 for eventual Cloudflare-to-Vercel migration.

**What was learned:**
- When a user believes data is "in the repository" for a Cloudflare Worker that isn't checked into git (`portfolio-chat`), the prompt is likely hardcoded directly via the Cloudflare web UI.
- GitHub Actions injected secrets (e.g., `VITE_POSTHOG_KEY`) won't be available in `.env` for local peer agents asking for them.
- Medusa Switchboard loops must be actively closed by explicitly calling `/read` and optionally replying to acknowledge resolution.
