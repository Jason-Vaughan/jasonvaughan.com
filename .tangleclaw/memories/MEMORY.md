**Open / next session:** 
- **Migration:** Extract the missing virtual interview knowledge context from the `portfolio-chat` Cloudflare UI and perform the migration to a GitHub-backed Vercel route with Gemini embeddings (Issue #167).
- **Backlog:** Fill in `project-preferences.md`.
- **PAT rotation reminder:** `STATS_COLLECTOR_TOKEN` and `OPENAI_ADMIN_KEY` need manual rotation before they expire.

## Last Session (2026-09-22 — Admin PostHog Opt-Out)

**What shipped:**
- Implemented a secret `?ignore_me=true` URL parameter in `src/main.jsx` to natively bypass PostHog tracking using a `localStorage` flag, along with a visual `alert()` confirmation.
- Responded to a cross-agent Medusa request from the TangleClaw website agent regarding the opt-out mechanism implementation.

**What was learned:**
- PostHog initialization-dependent opt-outs fail locally without an API key and leak initial pageview events. A `localStorage` flag that entirely bypasses `posthog.init()` is much more robust.
