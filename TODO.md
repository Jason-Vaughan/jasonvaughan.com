# TODO / Backlog

A living list of feature requests, polish items, and known issues for the portfolio site.

Issues fixed in PRs are removed from this list — git history is the record. Use this for ideas in flight.

> Looking for the long-running "what if" brainstorm? See [`WISHLIST.md`](./WISHLIST.md) — bigger ideas that haven't graduated to "yes, let's ship" yet.

## Active

### Content / Bio
- [ ] **Portfolio interview** — structured intake before writing portfolio content (resumes don't capture everything). Goal: get the "why" behind each project.
- [ ] **Cierre Sensei screenshots** — add to the Cierre Sensei hero card.
- [ ] **Notse screenshots** — add to the Notse project card (currently logo only).
- [ ] **Refuctor screenshots** — same.
- [ ] **Resume access** — either a password-protected resume PDF link or a "Request Resume" CTA that emails the user. Decision needed: gated download (Web3Forms or similar to capture requester) vs. a one-line form, vs. a direct PDF behind a shared password.
- [ ] **Creative work links** — add a section (or footer links) for artwork, photography, and music. Decide: separate sub-pages on the site, or external links (Instagram / Bandcamp / personal galleries)?
- [ ] **Expanded social links** — currently only LinkedIn is in the contact section. Add GitHub (https://github.com/Jason-Vaughan), npm (https://www.npmjs.com/~jason-vaughan or whichever handle), plus any other socials user actively maintains.
- [ ] **Appointment booking** — let visitors request a meeting. Options: Calendly / Cal.com embed, simple "Request a meeting" form (Web3Forms again, with date/time fields), or just a mailto link. Calendly is the lowest-friction for the visitor.

### Stats System
- [ ] **AI Tokens daily lag** — currently the local `~/.claude-stats/refresh.sh` agent runs once daily at 05:30 PT. The new 5x/day GitHub workflow doesn't refresh AI Tokens. Either (a) accept the lag, (b) bump the local agent to multiple times per day, or (c) skip token aggregation on workflow runs that don't have fresh agent data.
- [ ] **Self-hosted LLM router** (Kimi 2.5 / DeepSeek) — when set up, expose `/api/tokens.json` and add `tokens.remote.<provider>` to `projects.yml` (~15 min wiring).
- [ ] **PR-merged-by-author breakdown** — currently we count all merged PRs. If contributors ever land work, may want to split.
- [ ] **CHANGELOG-derived version display per project** — surface the latest released version on each card, not just LOC.

### UX / Polish
- [ ] **Color contrast pass** — tag pill text (`#a1a1aa` on near-black) is below WCAG AA 4.5:1 for small text. Consistent across the site so do a dedicated accessibility sweep rather than one-off.
- [ ] **Mobile responsiveness pass** — verify all sections at 375px. BuilderStats wrap is OK; check hero cards and project grid at narrow widths.
- [ ] **Sticky / smaller nav** — currently no nav. Adding one would help long-scroll usability.
- [ ] **Project filters** — let visitors filter the Projects grid by tag (Open Source / Commercial / SaaS / etc).
- [ ] **Dark/light mode toggle** — currently dark only.

### Infrastructure
- [ ] **OnDeck-V9 `ci/stats-workflow` -> main** — when merged, remove the `branch: ci/stats-workflow` override line in `project-assets/projects.yml`.
- [ ] **rentalclaw-project visibility decision** — currently auto-discovered (98 commits). User hasn't decided whether it's portfolio-worthy. If unrelated, add to `projects.yml#exclude`.
- [ ] **PAT rotation reminders** — `STATS_COLLECTOR_TOKEN`, `OPENAI_ADMIN_KEY` need manual rotation when they expire.
- [ ] **Email migration to Google Workspace** — add MX records in GoDaddy. Currently on Outlook via GoDaddy (6-12 month bridge).
- [ ] **CHANGELOG roll-forward** — `[Unreleased]` has accumulated multiple sessions of work. Consider cutting a `[2026-04-28]` release block.

### Pipeline (future cards / promotions)
- [ ] **UCI repo external link** — once UCI is ready for public visibility, add `link: "https://github.com/Jason-Vaughan/UCI"` + `linkLabel: "View on GitHub"` to the Pipeline card.
- [ ] **Medusa promotion** — Medusa is currently in Pipeline > Public Beta. Promote to a hero card when it graduates.

## Done (recent — keep until they roll into a CHANGELOG release)
- [x] **Fixes Shipped + PRs Merged stats** — shipped 2026-04-28, both aggregate (BuilderStats tiles) and per-card.
- [x] **Stats workflow 5x daily** — bumped from 1x to 5x daily, anchored to Pacific.
- [x] **Single-line BuilderStats + full-width dark bg** — shipped 2026-04-28.
