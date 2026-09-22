# Project Map

<!--
A "where things live" map: the structural table-of-contents the agent consults
FIRST before grepping or filesystem search. The top-level-directory skeleton is
auto-generated (seeded on toggle-on, refreshed by the project-map wrap-step);
fill in the descriptions. Distinct from FEATURES.md (#207), which maps features
to file paths — this maps the layout itself.
-->

## Structure

- `docs/` — non-app documents: resume/cover-letter files (`Resume/`), plus a legacy built `index.html` + `legacyfiles/` from the pre-GitHub-Actions docs/-folder Pages deploy.
- `public/` — static assets served verbatim by Vite/Pages: `CNAME`, the `/notse` landing page, OG-rich `/share/<id>/` stubs + `share-images/`, `writing/`, images.
- `scratch/` — agent scratchpad for temporary files and data.
- `scripts/` — build-time generators: `generate-share-pages.mjs` (per-card `/share/<id>/` OG stubs) and `generate-og-images.mjs` (their social-preview PNGs).
- `src/` — the React app (Vite): `components/` (hero cards, BuilderStats, Collapsible…), `data/` (card/skill/cert data + share-cards), `hooks/` (`useGitHubLatestRelease`), `utils/`, with vitest tests colocated next to what they cover.
- `tests/` — only a pytest-xdist `conftest.py` (directory-grouped parallelization); the real suite is the colocated vitest files under `src/`.
- `tools/` — `product-hook`, the Prawduct governance CLI (test-evidence/Critic/PR-gate checks used by the pr/critic skills and wrap hooks).

## Shared directories / doc groups

_This project belongs to 1 shared-doc group. Membership is machine-local state, not project structure, so it is not published here — see the TangleClaw UI for this install's groups._
