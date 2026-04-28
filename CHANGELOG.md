# Changelog

All notable changes to JasonVaughanComPortfolio are documented in this file.

## [Unreleased]

## [2026-04-28] — Stats Pipeline Maturity + Tests + Brainstorm

### Added
- **Commits stat on hero cards** — TiLT and TangleClaw hero cards now display live commit count (pulled from stats.json)
- **"Building since" badge** — both hero cards show month/year of first commit next to the status tag
- **Cierre Sensei hero card** — Cierre Sensei promoted from regular Projects grid to a 3rd hero card (after TiLT and TangleClaw). Emerald accent, "Live Product · SaaS · Subscription" pills, conversational-AI-driven closing-cost engine description, stats grid (LOC, 32 Mexican states, commits, plans), Replit + Stripe + PostgreSQL tech stack, "Visit Live Site" + "Inquire about Subscription" CTAs. Stats fetched live from cierresensei.com/api/stats.json via the centralized collector's new remote-URL fetch path.
- **Auto-detected language tags on every card** — collector now records languages >5% per repo (via GitHub languages API). Portfolio merges these with curated tags using a noise-filter + dedup util (`src/utils/languageTags.js`). Notse now shows "Python", PortHub shows "TypeScript". Other cards unchanged because their curated tags already cover the detected languages. (refs portfolio#1)
- **AI Tokens stat in BuilderStats** — 5th headline stat (pink, "AI Tokens") summed across Anthropic + OpenAI lifetime usage (admin APIs) plus manual estimates in `project-assets/projects.yml#tokens.manual` for closed-source tools (Copilot, Cursor, Gemini). Hidden until non-zero so the stat doesn't render with no data. Manifest exposes a full breakdown at `_collect-meta.json#aggregateTokens`.
- **Pipeline section** — new `Pipeline.jsx` rendering two grouped sections ("Public Beta" with amber accent, "In Development" with teal). Each stage auto-hides if its list is empty. Cards have a logo viewport (per-project `imgBackground` lets dark-on-black logos like Medusa override the default white viewport), stage badge, title + subtitle, tagline, body, feature bullets, tech tags, and an optional external link. Initial entries: **Medusa-MCP v0.7.7-beta** (Public Beta, GitHub link) and **UCI — Unified Comms Intelligence** (In Development, no public repo yet). Logos backed up at `project-assets/uci-logo.png` and `project-assets/medusa-logo.png`.
- **Fixes Shipped stat in BuilderStats** — 6th headline stat (cyan, "Fixes Shipped") summing every conventional-commit `fix:` / `fix(scope):` / `fix!:` / `bugfix:` / `hotfix:` across all collected repos. Hidden until non-zero. Reads `manifest.aggregateFixes.count` from the centralized collector.
- **PRs Merged stat on project + hero cards** — Projects.jsx adds a `{n} PRs` chip next to LOC / Tests / Commits when the underlying repo has merged PRs. FeaturedProject (TiLT), FeaturedTangleClaw, and FeaturedCierreSensei conditionally append a "PRs Merged" tile to their stats grid. Reads `stats.prs.merged` from the per-repo collector output. Forward-looking metric — most history is direct-to-main, but the user is shifting to PR workflow as of 2026-04.
- **PRs Merged aggregate in BuilderStats** — 7th headline tile (orange `#f97316`, "PRs Merged") summing `aggregatePRs.merged` from the manifest. Hidden until non-zero, same pattern as AI Tokens / Fixes Shipped.
- **Test infrastructure** — Vitest in portfolio (15 tests covering `formatBigNumber` + `autoLanguageTags`), `node:test` (zero deps) in project-assets (20 tests covering `countFixCommits` + `fetchMergedPRCount`). CI workflows in both repos run tests on every PR. Total: 35 tests passing. Convention going forward: every new helper gets a test.
- **TODO.md** — top-level backlog file for ideas in flight. Categories: Content/Bio · Stats System · UX/Polish · Infrastructure · Pipeline.
- **WISHLIST.md** — long-running brainstorm of cool features (AI chat, contribution heatmap, touring credits wall, certs, skills, etc.). Explicitly NOT a commitment. Effort tags 🟢/🟡/🔴. Cross-linked from TODO.

### Changed
- **BuilderStats fits all 7 tiles on one row at 960px+ container** — grid bumped from `minmax(130px, 1fr)` gap 16 to `minmax(110px, 1fr)` gap 12. Still wraps cleanly on tablet/mobile via `auto-fit`.
- **Dark background extends edge-to-edge at any viewport width** — `body` in `index.css` had `display: flex; place-items: center` which centered the App as a flex item, exposing white on the sides at wider viewports. Removed flex centering, set `background: #09090b` directly on body.
- **Fix-detection regex broadened (collector change, portfolio impact)** — `countFixCommits` now matches `^(fix|bugfix|hotfix|fixed|fixes)([^a-zA-Z]|$)` (case-insensitive, subject-only). Catches both Conventional `fix:` and legacy `Fix `/`Fixed `/`Fixes ` styles. Production aggregateFixes jumped from 142 → 284 (~11% of 2575 commits) — healthy ratio. Convention going forward: prefix fix-PR titles with `fix:` or `Fix ` so the squash subject lands in the count.
- **Stats workflow now refreshes 5x daily** (was 1x) — cron `0 3,9,13,17,22 * * *` UTC, anchored to PT. Portfolio LOC / commits / fixes / PRs / tests now update ~5x/day. AI Tokens still lags up to 24h since the local ccusage agent runs separately.
- **BuilderStats now manifest-driven** — fetches `_collect-meta.json` from project-assets and sums totals across every collected repo. Replaces the hardcoded 8-URL list. New repos auto-roll into the headline numbers as the centralized stats collector picks them up. (refs portfolio#1) Now also logs to console when the manifest fetch returns a 404 / empty / error so silent regressions are debuggable.
- **Project cards show live stats** — Projects.jsx fetches the same manifest and renders LOC / tests / commits inline on each card (Cierre Sensei, ScrapeGoat, Notse, PortHub, Refuctor, ClawBridge).
- **Notse marked as commercial** — added "Commercial · License" badge, updated blurb, and changed CTA to "Contact for licensing" (anchored to the contact section). Notse is closed-source and available under commercial license only.
- **TiLT marked as SaaS** — added "SaaS · Subscription" pill on the TiLT hero card next to "Live Product" so the subscription business model is visible at a glance.
- **Same-page anchor links scroll smoothly** — Projects.jsx detects `#` href prefixes and uses smooth scrollIntoView instead of `target="_blank"` (fixes Notse's "Contact for licensing" link refreshing the page in a new tab).
- **Status badges on every card** — generic `badge: { label, tone }` system with four tones (commercial / openSource / archived / saas). Applied: ScrapeGoat / PortHub / ClawBridge "Open Source · MIT", Refuctor "Source Available · Archived", Notse "Commercial · License" (existing). TangleClaw hero card adds "Open Source · MIT" pill. Refuctor blurb no longer references NPM since it was never widely distributed there.

### Infrastructure
- **Centralized stats collector + token aggregator** in `Jason-Vaughan/project-assets`. Daily GitHub workflow runs the collector across every Jason-Vaughan repo (auto-discovered via `/user/repos`) and aggregates AI token usage from up to four source types per provider (api / agent / manual / prorated). A local launchd agent on Cursatory (`com.jasonvaughan.claude-stats`) runs daily at 05:30 PT, executes ccusage on Cursatory + via SSH on habitat, parses Gemini CLI telemetry, and pushes `anthropic-usage.json` + `gemini-usage.json` into project-assets. Disaster-recovery copies of the agent script + plist live at `project-assets/local-agent/` with a redeployment README. Total tracked: ~9.3B tokens (Anthropic + OpenAI + Cursor + Gemini + Copilot prorated).

## [2026-04-13] — Builder Stats Bar, Commits Tracking

### Added
- **BuilderStats.jsx** — new header bar component that fetches stats from all 8 projects and displays aggregate totals (LOC, Commits, Tests, Projects Shipped)
- **Commits + contributors tracking** — all 8 stats workflows now also capture commit count, contributor count, and first commit date
- **Live domain** — jasonvaughan.com DNS configured with A records to GitHub Pages, CNAME for www, SSL cert auto-provisioned by Let's Encrypt

### Changed
- **App.jsx layout** — BuilderStats bar inserted between header and TiLT hero
- **Stats workflows** — all include `fetch-depth: 0` for full git history access

## [2026-04-12b] — Live Stats, ClawBridge Card, Stats Workflow Rollout

### Added
- **Live stats fetching** — TiLT and TangleClaw hero cards now fetch `stats.json` from GitHub at page load, with hardcoded fallbacks
- **ClawBridge project card** — HTTP bridge for Claude Code automation added to Projects grid (purple #a855f7 accent)
- **Stats workflows deployed** — `stats.yml` GitHub Actions added to: TangleClaw, tilt-v2, ClawBridge, Medusa, PortHub, ScrapeGoat (Refuctor and CLiTS skipped — archived repos)
- **TangleClaw global rule** — "Project Stats Workflow" rule added to default-global-rules.md for all future projects
- **PAT secrets** — `PROJECT_ASSETS_TOKEN` added to tilt-v2, Notse, OnDeck-V9 for cross-repo stats publishing

### Changed
- **TangleClaw stats corrected** — was pulling from v1 directory (49 tests), now uses v3 numbers (1,520 tests, 39K+ LOC)

## [2026-04-12] — TangleClaw Hero, Contact Section, ScrapeGoat Card

### Added
- **FeaturedTangleClaw.jsx** — full hero card for TangleClaw (purple accent) with stats grid (3.5K+ LOC, 49 tests, 4 AI engines, 0 npm deps), tech stack tags, GitHub CTA, and screenshot gallery
- **ContactSection.jsx** — "Get in Touch" section with Web3Forms contact form (name, email, message), honeypot spam protection, success state, and GitHub/LinkedIn social icon links
- **ScrapeGoat project card** — PDF calendar extractor PWA added to Projects grid (blue #3b82f6 accent)
- **ScrapeGoat logo** — `src/assets/projects/scrapegoat.png`

### Changed
- **TiLT stats updated** — Lines of Code 130K+ → 114K+, Tests Passing 334 → 842 (real counts from codebase)
- **TangleClaw promoted** — moved from project cards grid to featured hero section (removed from Projects.jsx)
- **App.jsx layout** — new render order: TiLT hero → TangleClaw hero → Projects → GPTs → Contact → Footer
- **Vite base path** — changed from `/jasonvaughan.com/` to `/` for custom domain deployment

### Infrastructure
- **GitHub Pages deploy** — GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys on push to main
- **CNAME file** — `public/CNAME` for custom domain jasonvaughan.com

## [2026-03-31] — Screenshot Gallery, Asset Repo Rename, Final De-Puberty-Labs

### Added
- **ScreenshotModal.jsx** — lightbox component with left/right nav, keyboard support, captions
- **TangleClaw screenshots** — 8 screenshots loaded from GitHub (project-assets repo), "Screenshots" pill on card

### Changed
- **Asset URLs** — all image refs now point to `Jason-Vaughan/project-assets` (renamed from `puberty-labs-assets`)
- Screenshots sourced from GitHub raw URLs (SSOT) instead of local copies

### External (non-portfolio repo changes)
- **project-assets** — renamed from `puberty-labs-assets`, updated README and description
- **PortHub** — replaced NPM install commands with git clone (NPM nuked), updated asset URLs
- **ClawBridge, SPiT** — updated asset URLs
- **Refuctor** — updated asset URLs, re-archived
- **GitHub profile** — updated name, bio, and avatar (manual, by user)
- All `puberty-labs-assets` references updated across 8 repos

## [2026-03-30] — Dark Theme Redesign & Project Showcase

### Added
- **TiLT featured panel card** — hero section with fist logo, gold accents, stats (130K+ LOC, 146 API endpoints, 334 tests, 12 CBA rule types), tour signup and live site CTAs
- **FeaturedProject.jsx** — new component for TiLT hero card
- **Project cards with logos** — Cierre Sensei, TangleClaw, Notse, Refuctor, each with logo viewport matching GPT card style
- **4 Custom GPT cards** — BarCoach Gen 1 (with GEN 1 badge), BarCoach Gen 2 (gold GEN 2 badge), Cierre Sensei, En-Genius4Dummies ENH1350
- **TiLT-showcase repo** — public GitHub repo (Jason-Vaughan/TiLT-showcase) with README, stats, and tour links
- Project logo assets: `src/assets/projects/` (cierresensei, tangleclaw, notse, refuctor)
- GPT logo assets: `src/assets/gpts/` (cierresensei, engenius)
- TiLT fist logo: `src/assets/tilt_logo.png`

### Changed
- **Full dark theme** — site background #09090b, header gradient from #1a1a2e, all cards use #18181b with #3f3f46 borders
- **Updated bio** — "Full-stack builder with 25 years across live events, SaaS, and AI-assisted development"
- **GPTs section** — converted from single hardcoded card to data-driven grid of 4 cards
- **Projects section** — replaced placeholder cards (Resourcing Tracker, Budget Workbooks, AI-Assisted Workflow Toolkit) with real projects
- Renamed GitHub repo `tilt-v2` → `TiLT`

### Removed
- Placeholder project cards (Resourcing Tracker, Budget Workbooks, AI-Assisted Workflow Toolkit)
- Skills grid section (Operations & Systems, Tools & Tech, AI & Innovation)
- Light theme / bg-gray-50 background
- Broken npm link (npmjs.com/~jason)

### External (non-portfolio repo changes)
- **Refuctor** — stripped Puberty Labs branding (12 files), pushed, public archived
- **CLiTS** — stripped Puberty Labs branding (3 files), pushed, re-archived
- **TiLT-showcase** — created public showcase repo with stats and tour links
