# Changelog

All notable changes to JasonVaughanComPortfolio are documented in this file.

## [Unreleased]

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
