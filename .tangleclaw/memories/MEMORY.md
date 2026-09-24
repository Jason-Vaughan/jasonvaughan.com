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

## Last Session (2026-09-23 — GitHub Profile & a16z Application)

**What shipped:**
- Created targeted application routing (`/?pass=a16z`) highlighting event/budget management, and generated tailored Cover Letter + Resume for the a16z Events Associate/PM roles.
- Created GitHub Developer routing (`/?pass=github`) mapping to a new `SystemsBuilder` persona to align with high-performance operational tooling.
- Wrote and pushed the `Jason-Vaughan` GitHub Profile README, featuring an automated 11.5k commit 3D architecture graph (nightly) and a James George activity feed (every 6 hours).
- Fixed the 3D graph workflow by instructing the user to apply `read:user` scope to their PAT.
- Disabled GitHub's native Markdown image lightbox on the profile README by embedding the SVG in an HTML `<img>` tag anchored to the page.
- Replaced the `ClawBridge` link with `Notse`, and added acronym context to `TiLT`.

**What was learned:**
- Querying private commit data via the GraphQL API for the `github-profile-3d-contrib` action strictly requires BOTH `repo` and `read:user` token scopes; without `read:user`, it silently falls back to public-only commits.
- GitHub's Camo image cache can be immediately busted by appending a query string (e.g. `?v=1`) to the URL.
- To prevent GitHub from rendering a clickable image lightbox or auto-linking relative paths, replace `![alt](url)` with `<a href="#section-id"><img src="url"></a>`.
