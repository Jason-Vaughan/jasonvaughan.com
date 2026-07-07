# Continuity Index — JasonVaughanComPortfolio

## Current state
Refresh the Tangle hero cards for two upstream releases: TangleClaw 4.0 copy rewrite + TangleBrain "On PyPI" chip and `pip install tanglebrain` CTA (PR #90, with new featured-cards invariant tests), then sharpen the TangleClaw claim to "zero npm dependencies" after verifying the repo has no package.json at all (PR #91, trivial fast-path). Also tags the overdue v0.2.0 at its cut commit and publishes the GitHub Release, enables repo auto-merge, and files #89 for 4.0 screenshots. Both PRs merged, deployed (one Pages flake rerun), and verified live by bundle grep.

## Next action
- #89 — swap TangleClaw hero screenshots for 4.0 captures once they land in project-assets (blocked on captures existing)
- #82 — cert issuer logos + per-card OG-preview stubs
- #81 — collapsible show/hide refinement; plus the duplicate-`<h2>` trim on wrapped sections
- Accessibility/contrast pass (WCAG AA fail on tag-pill text) + stale Cursor 7B keep/retire decision
- Next release cut is 0.3.0 (minor) — [Unreleased] holds 2× Added, 3× Changed, plus Internal
- Backlog: bake hero-card fallback stats at build time from collector manifests; fill in .prawduct/artifacts/project-preferences.md

## Map
- **TBD** — `package.json` <!-- describe -->
- **TBD** — `CLAUDE.md` <!-- describe -->
- **TBD** — `PROJECT-MAP.md` <!-- describe -->

## Freshness
- written-at: 2026-07-04
- sha: f0fd7c3
- branch: wrap/20260704013649-jasonvaughancomportfolio
- tier: no-plugin
