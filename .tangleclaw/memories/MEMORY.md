# Session Memory

This file persists context across AI sessions. Update it with key decisions, progress, and open questions.

## Last Session (2026-04-13)

**What happened:** Massive shipping session — portfolio went from dev-only to live at jasonvaughan.com.

**Major deliverables:**
- **TangleClaw hero card** (purple, full-featured like TiLT)
- **Contact form** with Web3Forms + GitHub/LinkedIn social icons
- **ScrapeGoat + ClawBridge project cards** added
- **TiLT stats corrected** (real numbers: 114K+ LOC, 842 tests)
- **Builder Stats header bar** — aggregates live totals from all 8 projects
- **Live stats system** — GitHub Actions in 8 repos auto-generate stats.json on every push
- **GitHub Pages deployment** with auto-deploy workflow
- **Custom domain** jasonvaughan.com wired up (GoDaddy DNS → GitHub IPs, SSL via Let's Encrypt)
- **TangleClaw global rule** added requiring stats workflow on all new projects
- **Repo made public** (required for free GitHub Pages)

**Key decisions:**
- Public repos commit stats.json to themselves; private/protected repos push to project-assets via PAT
- Web3Forms chosen for contact form (free, no ads, no signup)
- Stats race condition on project-assets solved with `git pull --rebase` before push

**Infrastructure secrets:**
- `PROJECT_ASSETS_TOKEN` PAT added as secret to: TangleClaw, tilt-v2, Notse, OnDeck-V9
- PAT scoped to project-assets repo only, Contents r/w + Metadata r

**Next session:** Open items
- Screenshots for Cierre Sensei, Notse, Refuctor cards
- Mobile responsiveness polish
- Structured bio/portfolio interview
- Email migration to Google Workspace (MX records)
- Display `commits` on TiLT/TangleClaw hero cards (data captured, not yet shown)
- "Building since..." project age badge (firstCommit data available)
- HTTPS enforcement checkbox (API lag — self-resolves, cert works externally)

**Not urgent:**
- Refuctor card — repo is archived so stats.json won't generate. Add graceful fallback or hardcode.
- TangleClaw v3 local branch reconciliation
