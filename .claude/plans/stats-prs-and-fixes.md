# Build Plan: PRs Merged + Fixes Shipped Stats

**Plan path (absolute):** `/Users/jasonvaughan/Documents/Projects/JasonVaughanComPortfolio/.claude/plans/stats-prs-and-fixes.md`
**Methodology:** Prawduct (one chunk = one session, Critic before wrap)
**Mode:** Bypass mode session (`--dangerously-skip-permissions`) — user pre-authorizes edits, commits, and pushes to both `Jason-Vaughan/project-assets` and `Jason-Vaughan/JasonVaughanComPortfolio`.

---

## Goal

Add two new stats to the portfolio:

1. **Fixes Shipped** — a 6th aggregate headline stat in `BuilderStats.jsx` summing all `fix:` / `bugfix:` / `hotfix:` commits across every collected repo.
2. **PRs Merged** — a per-project stat (merged PR count, lifetime) shown inline on project cards and in the hero-card stats grids.

Story: the user only recently started using PRs, so historical numbers are sparse and will grow over time. `fix:` commits are the truer maintenance metric since the user has consistently used conventional prefixes.

---

## Forward-looking intent (user-stated, 2026-04-28)

- The user is shifting toward PR-based workflow but acknowledges historical commits are mostly direct-to-main. **Both stats coexist on purpose:** `fix:` commits cover historical + current maintenance work, `prs.merged` will grow in value over time as PR discipline improves.
- "Going forward" counting is automatic — the daily collector cron picks up new commits + merged PRs without any additional wiring. No backfill / one-time-script needed.
- Don't drop PR scanning even if early numbers are low. The metric is forward-looking by design.

---

## Scope

**In:**
- Extend the centralized stats collector in `Jason-Vaughan/project-assets` to compute and emit `prs.merged` and `fixes.count` per repo, and aggregate totals in `_collect-meta.json`.
- Surface the new fields in the portfolio (`BuilderStats`, `Projects`, `FeaturedProject`, `FeaturedTangleClaw`, `FeaturedCierreSensei`).
- Hide both new stats conditionally when the underlying number is 0 (so solo-author repos with no PRs don't show "0 PRs").
- CHANGELOG entries in both repos.

**Out:**
- GitHub Issues / `bug`-labeled issue tracking. User confirmed he doesn't reliably file issues against himself, so the data would be junk.
- Open / unmerged / draft PR tracking — only count merged.
- Per-author breakdowns. Solo author dominates everything.
- Historical reconstruction beyond what `git log --grep` and the GitHub PR API already return.

---

## Decisions (resolved up-front, no need to re-ask the user)

| Decision | Choice | Why |
|---|---|---|
| Display: aggregate only / per-card only / both | **Both** — 1 new aggregate stat + 1 new per-card stat | Aggregate tells the maintenance story across the portfolio; per-card lets visitors see project-level activity. |
| Aggregate stat name | **"Fixes Shipped"** | Clearer than "Bug Fixes" since the user uses `fix:` for both bugs and small adjustments. Owns the user's conventional-commit habit. |
| Aggregate stat color | **Cyan** (next available accent after pink for AI Tokens) | Avoids reusing the 5 existing BuilderStats colors. |
| Fix detection regex | `^(fix\|bugfix\|hotfix)(\(.+\))?!?:` | Matches conventional-commits `fix:`, scoped `fix(scope):`, and breaking `fix!:`. Case-insensitive. |
| PR fetch state | `state=closed` + filter `merged_at != null` | Open PRs aren't shipped yet; closed-but-not-merged are abandoned. |
| PR display location on hero cards | New tile in the existing stats grid | Matches the LOC / tests / commits / plans pattern already there. |
| PR display on project cards | Inline next to existing LOC / Tests / Commits chips | Same row, conditionally rendered. |
| Hide-when-zero | **Yes** for both new stats | Same pattern as AI Tokens (which hides when 0). |
| Fix detection scope | **All commits on the default branch** (no PR-only filtering) | Most of the user's history is direct-to-main, so a PR-only filter would zero out everything pre-2026-04. |

---

## Pre-flight Checklist (run at session start)

1. **Verify `STATS_COLLECTOR_TOKEN` PAT scope** includes `Pull requests: Read` (in addition to existing Contents + Metadata read). If not, the user must update the fine-grained PAT at https://github.com/settings/personal-access-tokens before the collector run will work. Bypass session should:
   ```
   gh api -H "Accept: application/vnd.github+json" /repos/Jason-Vaughan/project-assets/pulls?state=closed\&per_page=1
   ```
   …actually wait — that uses `gh auth`, not the PAT. To verify the *workflow* PAT, trigger a test run: see step 5 below. If the workflow log shows 403/404 on `/pulls`, ask the user to add `Pull requests: Read` to `STATS_COLLECTOR_TOKEN` and re-run.
2. **Confirm dev server is on :3300** (memory says always start it; check if already running with `lsof -iTCP:3300 -sTCP:LISTEN`).
3. **Read** the collector entry points so the build context is fresh:
   - `Jason-Vaughan/project-assets/scripts/collect-stats.mjs`
   - `Jason-Vaughan/project-assets/scripts/lib/git-stats.mjs`
   - `Jason-Vaughan/project-assets/projects.yml` (just to know the repo list)

---

## Build Steps

### Phase A — Collector (project-assets repo)

Working directory: `~/Documents/Projects/project-assets` (or wherever the local clone is — check first; if missing, clone with `gh repo clone Jason-Vaughan/project-assets`).

1. **Branch** `feat/prs-and-fixes-stats`.
2. **Add `countFixCommits(repoDir)`** to `scripts/lib/git-stats.mjs`:
   - Use `git log --extended-regexp --grep='^(fix|bugfix|hotfix)(\(.+\))?!?:' --regexp-ignore-case --pretty=format:'%H'` and count lines.
   - JSDoc with the regex explained.
   - Handles empty repos / shallow clones (return 0 on error, log a warning to stderr).
3. **Add `scripts/lib/github-prs.mjs`** with a single export `fetchMergedPRCount(owner, repo, token)`:
   - Paginated GET `/repos/{owner}/{repo}/pulls?state=closed&per_page=100&page=N`.
   - Stop when a page returns `< 100` results.
   - Sum entries where `merged_at !== null`.
   - 403 → log warning + return `null` (so manifest carries `null`, not a misleading `0`).
   - 404 → return `null` (repo not accessible — happens for orgs etc.).
   - Other errors → throw, the collector's outer try/catch already isolates failures per-repo.
   - JSDoc.
4. **Wire both into `scripts/collect-stats.mjs`** at the per-repo loop:
   - After existing LOC/tests/commits collection, call `countFixCommits(repoCloneDir)` and `fetchMergedPRCount(owner, repo, token)`.
   - Emit into the per-repo stats record: `fixes: { count: N }` and `prs: { merged: N | null }`.
   - In the manifest aggregator (writes `_collect-meta.json`), add:
     - `aggregateFixes: { count: <sum> }`
     - `aggregatePRs: { merged: <sum, treating null as 0> }`
   - Match the same shape conventions as existing aggregates (`aggregateTokens`, etc.).
5. **Run the collector locally** once to verify shape:
   ```
   cd ~/Documents/Projects/project-assets
   STATS_COLLECTOR_TOKEN=$(gh auth token) node scripts/collect-stats.mjs --dry-run 2>&1 | tee /tmp/collect-dryrun.log
   ```
   (If `--dry-run` doesn't exist, fall back to running it for real and inspecting the diff before commit.) Sanity-check the numbers — `fix:` count should be non-zero on portfolio + project-assets + tilt-v2; PR-merged count should match what `gh pr list -R <repo> --state merged --limit 1000 | wc -l` shows.
6. **Update CHANGELOG.md** in project-assets under `[Unreleased]` → "Added".
7. **JSDoc parity check** — every new function has a `@param` / `@returns`.
8. **Commit** with a clear message:
   ```
   feat(collector): track merged PRs and fix-prefix commits per repo
   ```
9. **Push** to origin and trigger the workflow:
   ```
   gh workflow run collect-stats.yml -R Jason-Vaughan/project-assets
   gh run watch -R Jason-Vaughan/project-assets
   ```
10. **Verify** `_collect-meta.json` on the `main` branch of project-assets has `aggregateFixes` and `aggregatePRs` populated. Curl the raw URL with cache-bust:
    ```
    curl -s "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/_collect-meta.json?$(date +%s)" | jq '{aggregateFixes, aggregatePRs}'
    ```
    If 403 from the workflow log, see Pre-flight #1 — PAT needs `Pull requests: Read`.

### Phase B — Portfolio

Working directory: `/Users/jasonvaughan/Documents/Projects/JasonVaughanComPortfolio`.

11. **Branch** `feat/prs-and-fixes-stats`.
12. **`src/components/BuilderStats.jsx`** — add a 6th stat tile:
    - Reads `manifest.aggregateFixes.count` from the same fetch the existing 5 stats already use.
    - Label: "Fixes Shipped". Number with `toLocaleString()`. Cyan accent (e.g., `#06b6d4`).
    - Wrap in `{aggregateFixes?.count > 0 && (...)}` so it's hidden until non-zero.
    - Verify the bar's flex/grid layout still looks right at 6 tiles on desktop and ≤2-per-row on mobile (test in browser).
13. **`src/components/Projects.jsx`** — add `{prs} PRs` chip next to the existing LOC / Tests / Commits chips:
    - Read `projectStats.prs?.merged`.
    - Render only if `> 0`.
    - Style identical to the other inline chips.
14. **`src/components/FeaturedProject.jsx` (TiLT), `FeaturedTangleClaw.jsx`, `FeaturedCierreSensei.jsx`** — add a "PRs" tile to the stats grid:
    - Same conditional rendering: hide if 0 or null.
    - Use the project-specific accent color for the number (matches the existing tile styling in each component).
15. **CHANGELOG.md** under `[Unreleased]` → "Added": one bullet for the BuilderStats addition, one bullet for the per-card PR display, citing the manifest field names.
16. **Manual smoke test** in the browser at `http://localhost:3300`:
    - BuilderStats bar shows 6 tiles, "Fixes Shipped" populated.
    - Projects grid: visible PR count on cards where the underlying repo has merged PRs (probably tilt-v2, project-assets, portfolio); no chip on cards where it's 0.
    - Hero cards: TiLT + TangleClaw + Cierre Sensei show PR tile if applicable.
    - Mobile viewport (Chrome devtools, 375px): nothing overflows or wraps badly.
17. **Janitor pass**:
    - No leftover `console.log` / `debugger`.
    - No unused imports introduced.
    - JSDoc on any new helper functions.
    - CHANGELOG entries match what shipped.
18. **Commit** with a clear message:
    ```
    feat: surface PRs merged + fixes shipped stats on portfolio
    ```
19. **Push** to origin/main. Wait ~1-2 min for GitHub Pages deploy. Verify live at https://jasonvaughan.com.

### Phase C — Critic Review (mandatory per Prawduct extension rules)

20. **Spawn a Critic agent** (general-purpose subagent, fresh context):
    - Inputs: diff of both repos (project-assets + portfolio), this plan file, the CHANGELOG entries.
    - Tell it explicitly NOT to read prior session memory or builder reasoning.
    - Ask for: missed edge cases, test coverage gaps, scope creep, doc parity violations, possible silent failures (especially on the GitHub API path — what happens when token is missing? rate-limited? repo is archived?).
21. **Address every Critic finding** before wrap. If Critic flags a BLOCKER, fix it and commit again. If Critic flags IMPORTANT items that are out of scope, log them in the wrap memory under "open items".

### Phase D — Wrap

22. **Update `.tangleclaw/memories/MEMORY.md`** with:
    - What shipped (one paragraph).
    - Manifest fields added (`aggregateFixes.count`, `aggregatePRs.merged`, per-repo `fixes.count`, `prs.merged`).
    - PAT scope reminder if it had to be updated.
    - Any open items / Critic findings deferred.
23. **Re-record version** in `.tangleclaw/project-version.txt` (CHANGELOG `[Unreleased]` may have rolled to a dated entry — if so, update; if still Unreleased, just touch `recorded_at`).
24. **Final `git status` on both repos** to confirm clean.

---

## Risk / Caveats the bypass session should respect

- **Don't `--no-verify` any commits.** If pre-commit hooks fail, fix the underlying issue.
- **Two separate `git push` operations** — one to project-assets, one to portfolio. Both go to public main branches. This is pre-authorized but the session should still log a one-line summary before each push so the wrap can be audited.
- **GitHub API rate limit** — fine-grained PATs get 5,000 req/hour. Across ~15 repos × ~5 paginated PR pages each = ~75 calls. Well under, but the `github-prs.mjs` lib should still respect `X-RateLimit-Remaining` and warn if < 100.
- **Don't refactor the existing collector beyond what this plan requires.** Scope creep is the easiest way to blow a chunk.
- **Don't add tests in project-assets just for this** — the repo doesn't have a test runner set up. Verification is the live workflow run on step 9-10.
- **Portfolio has no test runner either** — verification is browser smoke testing on step 16.

---

## Done criteria

- [ ] `_collect-meta.json` on `Jason-Vaughan/project-assets` main has `aggregateFixes.count` and `aggregatePRs.merged` populated with sane numbers.
- [ ] BuilderStats bar on https://jasonvaughan.com shows 6 tiles, "Fixes Shipped" non-zero.
- [ ] At least one project card shows a PR-merged chip; cards with 0 PRs don't.
- [ ] CHANGELOG updated in both repos.
- [ ] Critic ran and all findings resolved or logged.
- [ ] Memory updated with the wrap.
