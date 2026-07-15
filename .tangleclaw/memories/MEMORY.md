# Session Memory

This file persists context across AI sessions. Update it with key decisions, progress, and open questions.

## Last Session (2026-07-14 — Kobold branding, right-aligned layout, watermark dial-in, and smoke-test tool)

**What happened:** Integrated the new Kobold edge node, aligned the card layout, built a custom interactive playground utility for watermark design proofing of both Kobold and RentalClaw, and updated the RentalClaw logo to the transparent version. All changes successfully tested and merged (PRs #114 through #123).

**Shipped:**
1. **Kobold Edge Node**: Added Kobold to the OpenClaw fleet card deck as a voice-operated, hands-free edge device. Styled with Toxic Green (#8BC34A) accent details, circular eyeball avatar, and redacted stealth formatting.
2. **Right-Aligned Layout**: Arranged the card lower half into a responsive split layout: bullets/tags on the left, un-cropped promo thumbnail button on the right (wrapping naturally on mobile screens).
3. **Interactive Zoom Modal**: Clicking the thumbnail triggers a blurred fullscreen modal displaying the full `kobold_banner.png` infographic. Includes an "Apply for Guild Membership" CTA linking directly to `#contact` (which auto-expands and highlights the contact form).
4. **Watermark Background eyeball**: Refactored the eyeball logo to render as a giant background watermark instead of a header icon. Dialed in and finalized properties: **10% opacity** (`opacity: 0.1`) and **1000px diameter** (`maxWidth/maxHeight: 1000px`). Sits beneath all text/button layers via `zIndex: 1` positioning.
5. **RentalClaw Watermark Proofing**: Enhanced `public/smoke-test.html` to toggle between Kobold and RentalClaw configurations. Placed the transparent RentalClaw logo asset in the `public/assets/projects/` static folder to enable live-previewing and proofing of the watermark. Reverted the RentalClaw card watermark on the main site until approved.
6. **Interactive Dial-In Tool (`smoke-test.html`)**: Added `public/smoke-test.html` featuring a live-card replica and sliders for opacity/size. Staged matching copy assets under `public/assets/projects/` to ensure it works offline, in dev server, and deployed live at `https://jasonvaughan.com/smoke-test.html`. Settle on `10% opacity, 1000px max-width/max-height`.
7. **Registered Kobold redirect & deep-link scroll fixes**: Registered `kobold` in `share-cards.js` to clear 404s. Refactored the anchor hash highlight scroll handler in `App.jsx` to poll the collapsible section registry resiliently up to 10 retries at 100ms intervals to eliminate asynchronous loading races.

**Key facts / gotchas:**
- GitHub Pages static hosting features CDN caching lag of ~2 minutes post-build; verify updates directly via live script bundle URLs if normal browser cache-bust refreshes are still displaying previous values.
- Keep the `public/smoke-test.html` utility in the project root as requested by the user.

**Open / next session:** None. All portfolio updates compiled successfully, and 54/54 tests pass.

## Prior Session (2026-07-03 — TangleClaw 4.0 + TangleBrain-on-PyPI card refresh, v0.2.0 tagged, auto-merge enabled)

Upstream news session: TangleClaw shipped **v4.0.0** (repo renamed `TangleClaw-v3` → `TangleClaw`) and TangleBrain hit **PyPI** (v0.17.0). Most of the page updated itself — both version chips (GitHub Releases hook) and the stats grids picked up the new numbers with zero code; the TC stats feed survived the disk rename (TC left a compat symlink). See learnings.md 2026-07-03.

**Shipped:**
1. **PR #90** — TangleClaw hero description rewritten for the 4.x surface (session continuity/wrap protocols, Project Master control plane, orchestration profiles, secured remote access); TangleBrain hero gained an **"On PyPI" chip + monospace `pip install tanglebrain` CTA** (→ pypi.org/project/tanglebrain/); stale pre-fetch fallback stats bumped on both cards. New `src/featured-cards.test.js` (3 tests, 42 total) guards the PyPI links + no-hardcoded-version invariant. Full gates: cumulative Critic + independent PR reviewer, both 0 blocking/0 warning. Playwright + live-bundle verified.
2. **PR #91** — claim polish after user challenged it: "zero-dependency" → **"zero npm dependencies"** (verified: the TangleClaw repo has NO `package.json` at all — Node built-ins only; tmux/ttyd/git/optional Caddy are system tools, disclosed in tags). Took the `check-pr-trivial` fast path (gates skipped legitimately).
3. **v0.2.0 tagged + GitHub Release published** — the #86 cut had never been tagged; annotated tag anchored at the **cut commit `0b1a668`** (not HEAD) with hand-curated notes from the CHANGELOG section.
4. **Repo auto-merge enabled** (`allow_auto_merge=true` via API) — `gh pr merge --auto` now works as the global rules intend.
5. **Filed #89** — swap TC hero screenshots for 4.0 captures once they exist in project-assets (none yet, per user).

**Key facts / gotchas (details in learnings.md):**
- The first Pages deploy of #91 flaked ("Deployment failed, try again later" after a green build) — `gh run rerun <id> --failed` fixed it. **Verify deploys by bundle-hash change + grepping the new bundle**, not HTTP 200.
- `product-hook check-operator-verification` crashes (`ModuleNotFoundError: lib`, blocked v1.5.2 framework sync). With no queue file + no flag, the gate is vacuously satisfied — don't stall on the traceback.
- Backlog (from Critic notes): bake fallback stats at build time from collector manifests; fill in `.prawduct/artifacts/project-preferences.md`.

**Open / next session:** **#89** (4.0 screenshots, blocked on captures), **#82** cert + per-card OG-preview logos, **#81** show/hide refinement, the **duplicate-`<h2>` trim** on wrapped sections, **accessibility/contrast pass** (WCAG AA fail on tag pills), **stale Cursor 7B** keep/retire decision. CHANGELOG `[Unreleased]` now holds 2× Added + 3× Changed + Internal → next cut is **0.3.0 (minor)**.

## Last Session (2026-06-17/18 — TangleBrain launch + hero card + Medusa positioning)

**What happened:** Continued portfolio work. All shipped & merged (portfolio PRs #68–#72). Tests green (project-assets 46, portfolio 20).

**Shipped:**
1. **TangleBrain** (new public repo, v0.10.0 — local-first config-driven LLM router) added to the portfolio. First as a Projects-grid card (#68), then **promoted to a featured HERO card** (`FeaturedTangleBrain.jsx`, #69) placed directly below FeaturedTangleClaw to group the "Tangle" siblings. Hero card uses live stats (`tanglebrain-stats.json`) + `useGitHubLatestRelease` hook + ShareLink (`/share/tanglebrain/`). Auto-rolled into BuilderStats totals (LoC now ~813k, authored ~1.33M).
2. **Logos** — project-assets is the **master asset store** (`<project>-logo.png` at repo root). Added `tanglebrain-logo.png` + refreshed `tangleclaw-logo.png` there (#25); portfolio keeps optimized 512px copies in `src/assets/projects/` (the masters are full-res 1254px). Hand-made logo art supplied by user.
3. **TangleBrain hero copy refactored** (#70) to match the upgraded README (problem-first; OAuth/local-first credentials — keys gated, never injected into a CLI; prompt-aware routing; "standalone or part of the Tangle family"). Drafted the README's "Problem/Solution" section and handed it to the TangleBrain repo session (cross-session boundary) — they shipped it.
4. **Medusa** — set GitHub repo description + 10 topics; portfolio card now cross-references TangleClaw PortHub (factual, README line 98) and reads as a **general coordination fabric** (parallel-sessions, fleet fan-out, cross-agent verification — each grounded in a real capability) (#71, #72). NOTE: Medusa↔UCI is provenance only (Medusa was spec'd from UCI originally) — NOT a runtime integration; do not claim one. Medusa's messy origin ("Bitch" project, near-abandonment) stays OFF the portfolio.
5. **Lines Refactored tooltip reframed** (#71) — anchored to Lines Authored (lifetime), not current LoC, so visitors don't misread refactored÷LoC (~66%) as "most code thrown away." Correct framing: refactored÷authored ≈ 40% lifetime churn = healthy iteration. (Not a red flag.)

**Open / next-session:** none pending on the portfolio. Monad-1 publisher still stale (project-assets#15, owned by the Monad session). If a real Medusa↔UCI integration ships, add it to the Medusa card.

## Prior Session (2026-06-13/14 — stats accuracy overhaul + Lines Authored + ClawHub downloads)

**What happened:** Long multi-arc session, all shipped & merged. Both `jasonvaughan.com` and `project-assets` touched. Tests green in both (46 + 46).

**Shipped:**
1. **Stats accuracy overhaul** — LOC now counts all source + HTML/CSS/Markdown (project-assets#11), dropped data/config exts after `.json` DB-dumps caused a false 11.8M reading (#12), removed TangleClaw's JS-only LOC override (now ~2x its LOC), portfolio tooltip parity (#59). LOC ~796k.
2. **New "Lines Authored" BuilderStats tile** (project-assets#14 + portfolio#60) — lifetime git insertions ~1.3M, 9th tile. Critic-reviewed (caught a launch-day delta-spike, fixed).
3. **Telemetry-repo exclusions** (project-assets#17) — dropped volta-stats/volta-bunker/notse-releases from stats; Commits de-inflated 4,885 → 3,108 (volta-stats was 1,735 `stats: <ts>` bot commits).
4. **ClawHub download counts + hover stats** — added live downloads via the clawhub.ai API (project-assets#23), enriched with stars/security/lastPublished (#24), rendered on cards w/ "New" badge for 0 (portfolio#66), clearer "245 downloads" pill + hover popover (portfolio#67).
5. **UCI card ML rewrite** (portfolio#65) — foregrounds the RLHF/earned-autonomy story; aimed at a Google ML role. (Authored by a parallel session; merged here.)
6. **Vite dev-server Tailscale access** (portfolio#61) — `allowedHosts: ['.ts.net']` so the dev server is reachable cross-machine (Cursatory↔elkcaholic).

**Found + handed off:**
- **Monad-1 publisher stopped pushing 2026-06-01** (11 days stale) — `monad-stats.json` frozen, new models not showing. Filed project-assets#15; owned by the Monad-1 box session, not this one.

**Important lesson (cross-session collision):** A parallel "Monad-1" session had already shipped the whole ClawHub feature (cards #64 + watcher #20). I nearly rebuilt it from scratch — caught it before opening a PR. **Before building in these shared repos, check merged/open PRs + existing files first.** User confirmed that 2nd session was accidental and stopped it. (Also fixed a self-inflicted premature merge: a chore PR branched off the unmerged Lines-Authored tile dragged it onto main; backed out via portfolio#62.)

**Open / next-session:**
- Monad publisher restart (project-assets#15) — Monad session.
- No portfolio items pending; everything merged. All ClawHub/stats numbers self-refresh on cron.

## Earlier Session (2026-05-05 — Notse sales pipeline + tip jar + SSL fix)

**What happened:** Long, multi-arc session. Three big shipped pieces, one critical fix, and one piece of forward infrastructure laid down.

**Shipped:**

1. **Notse `/notse` landing page** (PR #20) — static HTML at `public/notse/index.html` with hero, feature grid, pricing card, volume-licensing CTA. Notse Projects card switched from `#contact` to `/notse`. Internal `/`-prefixed links now stay in the same tab; anchors still smooth-scroll, external still opens new tab.
2. **Notse $50/year subscription wired** (PR #21) — Stripe Payment Link `https://buy.stripe.com/5kQdR9a9k7Ek5aFcssaMU00` (product `prod_USki7sq4gY0Fpu`) plugged into the page, copy switched from one-time perpetual placeholder to subscription wording. Customer-facing checkout reads "Notse License — $50.00/year".
3. **SSL cert fix on jasonvaughan.com** (no PR — Pages config) — Chrome was rejecting the site because the cert in the wild was GitHub's generic `*.github.io` (Let's Encrypt provisioning had silently failed for the custom domain). Fixed by clearing + re-adding the custom domain via the GitHub Pages API (`PUT /repos/.../pages` with `cname: null` then `cname: "jasonvaughan.com"`). Cert re-provisioned in seconds; SAN now covers `jasonvaughan.com` + `www.jasonvaughan.com`. `https_enforced: true`.
4. **Full automated licensing pipeline** (new `Jason-Vaughan/licensing-workers` private repo) — Cloudflare Worker bridges Stripe Payment Link checkouts → Keygen license creation → Resend email delivery. First Worker `notse-licensing` is live at `https://notse-licensing.jasonvaughan.workers.dev`. End-to-end smoke-tested: real Keygen license issued, key emailed to ntehosting@gmail.com. Resend sending domain `jasonvaughan.com` verified (SPF + DKIM + MX records in GoDaddy DNS — apex Outlook MX untouched). See `project_licensing_pipeline.md` auto-memory for full architecture + IDs.
5. **Tip Jar** (PR #22) — small amber pill above the H1 in the header (always-visible, low-pressure) + larger illustrated `TipJar.jsx` card between GPTs and ContactSection. Both link to one Stripe Payment Link with "customer chooses price" feature (`https://buy.stripe.com/7sY5kD6X8bUA7iNfEEaMU01`, product `prod_USrEuQMbhr1sFL`, `$5/$10/$25/$50/$100` preset suggestions, "Donate" call-to-action button). Inline SVG mason jar with bills + coins for the larger card.
6. **FR #23 filed** for crypto tipping option (Coinbase Commerce path). Not implemented — tracked for later.

**Workflow notes / patterns worth remembering:**
- The user has multiple Macs (Cursatory, elkaholic). Wrangler OAuth is per-machine and doesn't transfer. Workaround: use a Cloudflare API token (`Edit Cloudflare Workers` template) and export as `CLOUDFLARE_API_TOKEN` env var — works from any machine.
- The `workers.dev` subdomain registration is a one-time per-account step. If Cloudflare's UI sends you to a "Connect a domain" upsell page (paid plan picker), you're on the wrong page. Direct API path: `PUT /accounts/{id}/workers/subdomain` with `{"subdomain":"<name>"}`.
- DNS records in GoDaddy: enter just the subdomain part as `Name` (e.g., `send` not `send.jasonvaughan.com`). GoDaddy auto-appends the apex.
- Stripe Payment Link URLs are static — editing call-to-action ("Pay" → "Donate"), suggested amounts, etc. updates config on the same URL; URL never changes once created.
- Keygen distinguishes Account ID (UUID) from Stripe's account ID (`acct_...` prefix) — easy to confuse if you have both dashboards open.
- "DKIM key" ≠ "Resend API key" — DKIM is the public key in DNS, API key is for code → Resend authentication. Both come from Resend but are separate things.

**Pending cleanup (non-blocking):**
- Delete 3 test Keygen licenses from the smoke tests (search "Smoke Test" / "Jason (smoke test)" in Keygen Licenses).
- Rotate secrets that hit chat: Keygen Product Token, Resend API key, Stripe webhook signing secret, Cloudflare API token. After each rotation, `wrangler secret put NAME` from inside `licensing-workers/notse/` to update the Worker.
- File `[chore]` issues in the **Notse repo** (not portfolio) for code signing + notarization on macOS and Windows. User has Apple Developer account + Windows code signing cert set up but hasn't completed the Electron toolchain wiring. This is best done in a session anchored to the Notse repo (per cross-session boundary rule).

**Open enhancements for the licensing pipeline** (not blocking, but obvious next steps):
- Listen for `customer.subscription.deleted` → suspend Keygen license (cancellation handling)
- Listen for `invoice.payment_failed` → suspend on threshold (failed renewals)
- Both are ~10 lines of code added to `notse/src/index.js`.

## Last Session (2026-05-04 — Lines Refactored stat + tile tooltips)

**What happened:** User asked whether "lines deleted" was a stat we could collect — they wanted to surface that removing code is also work. Yes: `git log --numstat` gives it for free. Worked the question through, then shipped the full pipeline end-to-end across 5 portfolio PRs + 1 collector PR.

**Shipped:**
1. **`Jason-Vaughan/project-assets#6`** (collector) — `countLinesRefactored(dir, loc)` in `scripts/lib/git-stats.mjs`; sums deletions filtered by the same LOC profile each repo uses (apples-to-apples with `loc`). Per-repo `stats.linesRefactored.count` + manifest-level `aggregateRefactored.count`. 5 new node:test cases (rewrites, full-file deletes, node_modules exclusion, LOC include filter respect) — all 13 git-stats tests green.
2. **`Jason-Vaughan/jasonvaughan.com#14`** — 8th BuilderStats tile ("Lines Refactored", pink `#ec4899`, hidden until non-zero) reading `manifest.aggregateRefactored.count`. Tile system extended with optional `description` field — when present, the tile renders with a dotted-underline cue + `cursor: help` and a hover popup explains the metric.
3. **`#15`** (fix) — first attempt at the 8-tile row hit `minmax(110px)` × 8 + gap = 964px > 856px container, wrapping. Bumped to `minmax(96px)` so 8×96 + 7×12 = 852 ≤ 856.
4. **`#16`** (fix) — user wanted tighter wrap point. Condensed: `minmax` 96→80, gap 12→10, value font 28→24, label font 11→10, letter-spacing 1→0.5. Wrap point dropped from ~960px viewport to ~810px viewport.
5. **`#17`** — wired `description` text into the other 7 tiles (LOC, Commits, Tests, Projects, AI Tokens, Fixes, PRs). Each tooltip explains methodology (source, scope, non-obvious nuance), not just the label. The LOC tooltip notably clarifies "current snapshot vs lifetime-added" — addresses the recurring "why is the number lower than total commits added?" confusion.
6. **`#18`** (fix) — tooltips were clipped by the outer card's `overflow: hidden`. Removed it; the top accent bar now rounds its own corners with `borderRadius: "16px 16px 0 0"`.

**Live numbers after first cron run post-merge:** `aggregateRefactored.count = 90,582` across 14 git repos (~1:5 deletion-to-add ratio against ~477K lifetime adds). User noticed the LOC tile shows ~350K which seemed lower than expected — explained: 477K (lifetime added) − 93K (deleted) = 384K net, then ~34K gap mostly from my ad-hoc count including CSS that per-repo LOC profiles exclude. The new LOC tooltip captures this snapshot-vs-lifetime distinction.

**Workflow notes:**
- Cron is 5x/day at `0 3,9,13,17,22 * * *` UTC. After merging the collector PR, manually triggered the workflow via `gh workflow run collect-stats --repo Jason-Vaughan/project-assets` so the new `aggregateRefactored` field landed within ~1 min instead of waiting for the next scheduled run. Pattern worth reusing when shipping a new manifest field.
- All 5 portfolio PRs merged in order with `--squash --delete-branch`, no `--auto` since each was user-facing/feature work the user wanted to eyeball first.

**Design pattern adopted:** when adding a tooltip to a stat or metric, the tooltip text should explain *methodology* (what's measured, source, scope, non-obvious nuance), not restate the label. Decoration tooltips don't earn their existence; methodology tooltips do. The dotted-underline + `cursor: help` cue signals "there's more to read here."

## Last Session (2026-04-28 — release-cut + kill-recovery)

**What happened:** Short cleanup session. The previous 2026-04-28 working session had pushed a release-cut wrap commit (`d087bb2`) and opened PR #11 ("chore: cut [2026-04-28] release + clean working tree") but was killed before the merge + post-wrap janitor finished. This session merged PR #11 (which had already been auto/externally merged by the time the local sync ran), pulled main, removed the two completed plan files from `.claude/plans/` (`stats-prs-and-fixes.md`, `stats-system-backup-and-docs.md` — both shipped, kept in git history if ever needed), and wrote this memory note.

**Net effect on main:** CHANGELOG `[Unreleased]` rolled into `[2026-04-28] Stats Pipeline Maturity + Tests + Brainstorm` block. project-version.txt bumped to `2026-04-28`. CLAUDE.md got TangleClaw-injected updates (Build Plans & Chunks rule + PortHub HTTPS API note).

**Lesson recorded:** When a session is killed mid-wrap, the smoking-gun signature is (a) an OPEN wrap-PR with green CI, (b) MEMORY.md mtime older than the latest commit on the wrap branch, and (c) stale plan files for shipped work still in `.claude/plans/`. Took ~5 minutes to recover; no work was lost.

**Auto-merge pattern adopted:** This session used `gh pr merge --auto --squash --delete-branch` to ship PR #12 — GitHub holds the PR server-side and merges the instant CI clears, no agent watching needed. Drafted a corresponding `## PR Auto-Merge` rule for `~/.tangleclaw/global-rules.md`; another session is handling the actual file edit. Until that lands, future sessions on this project should still apply the pattern manually for routine PRs (docs, chore, version bumps, test-only).

**Session wrap PR:** #13 (`chore/session-wrap-2026-04-28-recovery`) — refreshes project-version.txt timestamp + this memory addendum. Auto-merged.

## Previous Session (2026-04-28 — PRs Merged + Fixes Shipped stats)

**What happened:** Executed the build plan at `/Users/jasonvaughan/Documents/Projects/JasonVaughanComPortfolio/.claude/plans/stats-prs-and-fixes.md` end-to-end. Two new metrics now live:

1. **`aggregateFixes.count`** + per-repo `fixes.count` — `git log --grep` counts conventional `^(fix|bugfix|hotfix)(\(.+\))?!?:` commits.
2. **`aggregatePRs.merged`** + per-repo `prs.merged` — paginated `/pulls?state=closed`, filter `merged_at != null`. Returns `null` (preserved through manifest) on 401/403/404/5xx/timeout.

Live numbers as of merge: **142 fixes**, **60 merged PRs** across 14 repos. TangleClaw leads PRs (47), TiLT leads fixes (65). Cierre Sensei correctly skipped (remoteStats project).

**First active use of PR-based workflow** — both `Jason-Vaughan/project-assets#2` and `Jason-Vaughan/jasonvaughan.com#2` opened, Critic-reviewed, then squash-merged. New normal going forward.

**Critic findings (all addressed):** Added 30s `AbortController` timeout on PR fetch, treated 5xx like 401/403/404 (return null instead of throwing — preserves other repo stats), added sentinel warns for `aggregateFixes=0` regressions and "all PRs returned null" PAT-scope hints, added comment near `git clone` warning against `--depth` (countFixCommits needs full history). NIT: `project-assets` repo has no CHANGELOG convention — skipped that plan step.

**PAT scope:** `STATS_COLLECTOR_TOKEN` already had `Pull requests: Read` — verified by 14/14 repos returning non-null PR counts. No PAT update needed.

**Follow-up PR #3** (same session, after the above shipped): broadened `countFixCommits` regex from strict Conventional Commits to also catch legacy `Fix `/`Fixed `/`Fixes ` (capital, no colon — used by TiLT/TangleClaw pre-Conventional, plus GitHub's default squash-merge titles). New regex `^(fix|bugfix|hotfix|fixed|fixes)([^a-zA-Z]|$)` is case-insensitive, subject-only (not body, which over-counts), zero false positives. **Production aggregateFixes: 142 → 284 (~11% of 2575 commits)** — healthy ratio for this body of work. Convention going forward documented in JSDoc + project_stats_system memory: prefix fix-PR titles with `fix:` or `Fix ` for the squash subject to count.

**More follow-ups (same session):**
- **PR #4 (project-assets):** stats workflow bumped from 1x daily to 5x/day, anchored to PT (`'0 3,9,13,17,22 * * *'` UTC). AI Tokens stat lags up to 24h since the local ccusage agent runs separately at 05:30 PT.
- **PR #3 (portfolio):** Added 7th aggregate tile in BuilderStats — PRs Merged (orange `#f97316`). Reads `manifest.aggregatePRs.merged` (currently 61). Hidden when zero.
- **PR #4 (portfolio):** Layout polish — `body` in index.css had `display: flex; place-items: center` causing dark bg to end at viewport edges. Removed flex centering, set `background: #09090b` on body. Also bumped BuilderStats grid to `minmax(110px, 1fr)` + gap 12 so all 7 tiles fit on one line at 960px container. Plus new `TODO.md` at repo root.
- **PR #5 (project-assets):** Test infra — Node's built-in `node --test` (zero deps), 20 tests covering countFixCommits + fetchMergedPRCount edge cases, CI workflow runs on every PR.
- **PR #5 (portfolio):** Test infra — Vitest, 15 tests covering formatBigNumber + autoLanguageTags. Extracted `formatBigNumber` from BuilderStats to `src/utils/format.js` so it's testable. CI on every PR. Total: **35 tests passing**.
- **PR #7 (portfolio):** New `WISHLIST.md` — long-running brainstorm of cool features (AI chat, contribution heatmap, touring credits wall, certs, skills, etc.). Cross-linked from TODO.md.
- **PRs #6/#8/#9 (portfolio):** Doc PRs adding TODO entries for: resume / creative work / socials / appointment booking; certifications; skills (creative pro tools — Photoshop, AE, Watchout, Millumin, etc., distinct from auto-detected dev tags).

## Strategic notes captured this session

- **User's 4-column differentiation story** (see `project_creative_skills_path.md`): dev skills (auto from GitHub) + pro creative tools (manual, live-events) + certifications (no degree → "experience-credentialed since X" reframe) + touring credits + IATSE Local 33 badge. This combo is the unique pitch.
- **Redesign considered, not committed** — user had "thoughts of a complete redesign" after the brainstorm. Prep step before any redesign: extract hardcoded project data from components to `src/data/projects.js`. See `feedback_data_extraction_for_redesign.md`.
- **Skills section is for CREATIVE/PRO TOOLS**, not dev skills. Don't conflate.

## Open items / next session

(Carried forward from previous sessions — none introduced today.)

## Previous Session (2026-04-27 — into 2026-04-28 UTC)

**What happened:** A long, deep session — touched both repos heavily. Three big arcs:

1. **Centralized stats collector** built in `Jason-Vaughan/project-assets` to replace the 8 per-repo `stats.yml` workflows. Closes portfolio issue #1. Auto-discovers every Jason-Vaughan repo, computes LOC/tests/commits/contributors/languages, writes `_collect-meta.json` manifest. Daily cron 06:00 UTC + manual dispatch. All 8 source repos cleaned (workflows + PATs + committed stats.json removed).

2. **AI token aggregation** layered onto the same collector: pulls from Anthropic admin API (404s for personal accounts — falls back to local agent), OpenAI admin API (works), local agent JSON files for ccusage + Gemini telemetry, static `manual.<provider>` entries, and date-prorated formulas. Live total now ~9.3B tokens. New 5th headline stat in BuilderStats: "AI Tokens".

3. **Portfolio polish** — Cierre Sensei promoted to a 3rd hero card, Pipeline section added below Projects with two stages (Public Beta = Medusa, In Development = UCI), per-card live stats + auto language tags, status badges (Open Source / SaaS / Commercial / Archived), Notse marked closed-source, smooth-scroll for in-page anchor links.

**Major deliverables (artifacts you can find):**
- `Jason-Vaughan/project-assets/.github/workflows/collect-stats.yml` (workflow), `projects.yml` (config), `scripts/collect-stats.mjs`, `scripts/lib/{git-stats,tokens}.mjs`, `scripts/counters/{tangleclaw,tilt}.mjs`
- `Jason-Vaughan/project-assets/local-agent/{refresh.sh,plist,gemini-telemetry-snippet.json,README.md}` — disaster-recovery copies of the local agent
- `~/.claude-stats/refresh.sh` (deployed) + `~/Library/LaunchAgents/com.jasonvaughan.claude-stats.plist` (deployed) on Cursatory
- `~/.gemini/settings.json` updated with telemetry config
- Portfolio: new `Pipeline.jsx`, `FeaturedCierreSensei.jsx`, `utils/languageTags.js`; existing `BuilderStats`, `Projects`, `FeaturedProject`, `FeaturedTangleClaw` all extended

**Key decisions:**
- Self-discovery beats curated list: collector reads `/user/repos`, exclude list in `projects.yml` instead of include list
- Token aggregation is **additive** across source types per provider (api + agent + manual + prorated). Convention: never put the same usage in two source types
- Local agent on Cursatory pushes daily at 05:30 PT (before GitHub cron at 06:00 UTC); SSHs to habitat for habitat's ccusage data
- Cursor and TypingMind prepaid usage are static manual entries; ccusage and Gemini telemetry are auto-refreshed via local agent
- Pipeline section auto-hides empty stages (so "Public Beta" disappears the moment Medusa graduates to a hero card)

**Infrastructure secrets (current):**
- `STATS_COLLECTOR_TOKEN` on `Jason-Vaughan/project-assets` (fine-grained PAT, all-repos, contents+metadata read)
- `OPENAI_ADMIN_KEY` on `Jason-Vaughan/project-assets` (admin API, usage:read)
- `ANTHROPIC_ADMIN_KEY` — NOT SET (admin API not available for personal Anthropic accounts; ccusage local agent fills the gap)
- All 8 source repos had their `PROJECT_ASSETS_TOKEN` deleted as part of the cleanup

**Critic review (passed):** One BLOCKER (gemini-usage.json wasn't being `git add`-ed in the daily refresh) and several IMPORTANT findings (silent regression on partial habitat outage, console log clarity, React key collision risk, BuilderStats silent fetch failures, stale JSDoc, CHANGELOG hygiene). All fixed in commits `71ddb96` (project-assets) and `928bafa` (portfolio).

## Open items / next session

- **Cursor entry is static** (7B from one-time CSV export). User said they don't use Cursor anymore so won't grow. Re-export and bump if usage resumes.
- **Stale `ci/stats-*` branches and `stash@{0}`** on TangleClaw / OnDeck-V9 / Notse — left intact per user request. Phase 5 cleanup deferred indefinitely.
- **OnDeck-V9 `ci/stats-workflow` -> main** — when user merges, remove the `branch: ci/stats-workflow` override line in `project-assets/projects.yml`.
- **rentalclaw-project** is currently auto-discovered (98 commits as of session end). User hasn't said whether to exclude it. If unrelated, add to `projects.yml#exclude`.
- **UCI repo** has 2 commits and the user is building it. Pipeline card has no link yet — once user wants public visibility, add `link: "https://github.com/Jason-Vaughan/UCI"` (verify exact slug) and `linkLabel: "View on GitHub"`.
- **Self-hosted LLM router (Kimi 2.5 / DeepSeek)** is on user's roadmap. Token tracking for it will use the `remoteStats` URL pattern when ready (~15 min wiring).
- **PAT rotation reminder**: `STATS_COLLECTOR_TOKEN` and `OPENAI_ADMIN_KEY` need manual rotation before they expire.
- **Color contrast**: critic flagged tag pill text (`#a1a1aa` on near-black) is below WCAG AA 4.5:1 for small text. Consistent across the site so leaving for a dedicated accessibility pass.

## Lessons learned this session

- **Critic review surfaces silent failures the builder misses** — the BLOCKER finding (gemini-usage.json never committed) was invisible from the builder's perspective because the file existed locally and the Anthropic flow worked. A run agent that tested both providers end-to-end would have caught it; a code review caught it instantly.
- **MultiSelect AskUserQuestion options must be independent items, not cumulative supersets** — already saved as a feedback memory.
- **Pasted secrets (PATs) are compromised the moment they hit the chat** — rotate immediately, even after they're added as repo secrets.
- **GitHub Pages deploy lag** is real — about 1-2 minutes from push to live. Cache-bust by appending `?$(date +%s)` when verifying changes via curl on raw.githubusercontent.com (and even that doesn't always work — GitHub caches by file hash).
- **macOS launchd at 05:30 PT vs GitHub cron at 06:00 UTC** means agent updates are at most ~24h behind GitHub stats, but they land within the same daily window. Acceptable for vanity stats.

## Earlier sessions (preserved for context)

### 2026-04-13 — Initial portfolio launch

Massive shipping session — portfolio went from dev-only to live at jasonvaughan.com. TangleClaw hero card, Contact form (Web3Forms), ScrapeGoat + ClawBridge cards, TiLT stats corrected, Builder Stats bar, GitHub Pages deployment, custom domain (GoDaddy DNS → GitHub IPs, Let's Encrypt SSL). Stats system was per-repo `stats.yml` workflows in 8 repos with `PROJECT_ASSETS_TOKEN` for the 4 private ones. (All replaced this session.)

### 2026-04-14 — Commits + "Building since" badge

Added live commit count and month-of-first-commit badge to TiLT and TangleClaw hero cards. Refuctor stats handled gracefully via Promise.allSettled.

### Email status

Cancelled Google Workspace migration in April — addresses were "in use" but GW wouldn't say where. Signed up for Outlook via GoDaddy for 6-12 months. Goal: eventually resolve the conflict and migrate to GW.
