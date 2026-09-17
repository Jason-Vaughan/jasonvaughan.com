**Open / next session:** 
- **User content generation:** Manually write the long-form case studies by populating the `longDescription` fields (or similar content structure) for each project in `src/data/projects.js`.
- **Cursor 7B keep/retire decision:** User previously stated they no longer use Cursor. Need to decide whether to retire the static 7B metric from `projects.yml` or keep it as a frozen legacy stat.
- **Backlog:** Bake hero-card fallback stats at build time; fill in `project-preferences.md`.
- **PAT rotation reminder:** `STATS_COLLECTOR_TOKEN` and `OPENAI_ADMIN_KEY` need manual rotation before they expire.

## Last Session (2026-09-17 — Fix CI Bounds & Close Dangling Issues)

**What shipped:**
- Fixed a broken CI suite on the `main` branch by bumping the bounds-check in `certifications.test.js` from 15 to 16, accommodating a newly added Google Cloud cert (#165).
- Closed issue #89 (TangleClaw 4.0 screenshots) which was already implemented in PR #145 but left dangling due to a missing `Fixes #89` keyword.
- Debugged a "missing feature" visual bug report for the "✨ AI Models Evaluated" UI, proving that the local dev server rendering logic works but the live GitHub Pages deployment was stuck on an older version due to the aforementioned CI failure. Provided Anthropic-specific tailnet links for the recruiter.

**What was learned:**
- Hardcoded array bounds on curated lists are a fast track to broken CI when content is updated.
- Visual bugs reported on production can simply be deployment pipeline failures. Always verify the deployed bundle hash.
