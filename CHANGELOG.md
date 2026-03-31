# Changelog

All notable changes to JasonVaughanComPortfolio are documented in this file.

## [Unreleased]

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
