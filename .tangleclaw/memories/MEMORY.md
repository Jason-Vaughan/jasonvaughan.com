**Open / next session:** 
- **Migration:** Extract the missing virtual interview knowledge context from the `portfolio-chat` Cloudflare UI and perform the migration to a GitHub-backed Vercel route with Gemini embeddings (Issue #167).
- **Backlog:** Fill in `project-preferences.md`.
- **PAT rotation reminder:** `STATS_COLLECTOR_TOKEN` and `OPENAI_ADMIN_KEY` need manual rotation before they expire.

## Last Session (2026-10-04 — Vercel cache busting, Anthropic/OpenAI dossiers, Visual Portfolio)

**What shipped:**
- Created targeted static recruiter page for OpenAI (`/openai`) using Vercel rewrites to bypass React for strict crawler accessibility.
- Implemented cache-busting and rollback routing updates.
- Promoted a permanent `/designer-portfolio` route featuring dynamic CSS grids, true randomization, Ken Burns zoom effects, and non-destructive copyright watermarking.
- Shipped dedicated `anthropic` and `inspyr` passcodes and persona layouts to highlight visual storytelling and AI-native builds.
- Refactored component layout and CSS grid structures to fix display flexbox overlap bugs.

**What was learned:**
- Vercel rewrites (`vercel.json`) run strictly before filesystem checks. Explicit rewrites mapping directories to `index.html` will override React routers, but they suffer from 30-45s propagation delay post-push.
- Pure static HTML fallback files are required when delivering dossiers to JS-disabled recruitment crawlers.

