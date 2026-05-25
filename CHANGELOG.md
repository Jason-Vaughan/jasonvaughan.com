# Changelog

All notable changes to JasonVaughanComPortfolio are documented in this file.

## [Unreleased]

### Fixed
- **`formatBigNumber` — bump billion-scale precision from 1 to 2 decimals** — at 1 decimal, `9.3B` and `9.31B` rendered identically, which meant the local-inference addition to the AI Tokens tile (14M Monad+Volta) was mathematically applied but visibly invisible against the 9.3B cloud-provider baseline. Two decimals lets M-scale additions to a B-scale number actually move the displayed digit. M-scale and K-scale precision unchanged.

### Changed
- **BuilderStats AI Tokens tile now includes local inference (Monad-1 + OpenClaw fleet)** — headline value sums cloud-provider tokens (Anthropic, OpenAI, Cursor, Gemini, Copilot) with every local-inference source that self-publishes a `tokens.total` (Monad-1 publisher, Volta, future agents). Reads as "total AI work done, anywhere I run it" instead of cloud-only. Hover tooltip surfaces the per-source breakdown — Cloud providers, Monad-1, Volta — so visitors can see the mix. URL list lives in `src/data/openclaw-sources.js` (single source of truth shared with the Monad-1 card aggregation); adding a new agent updates both surfaces in one place.

### Changed
- **RentalClaw status: "In Development" → "Private Beta"** — badge, blurb, operational-status bullet, tag, and share-card description all updated. Card still REDACTED.

### Fixed
- **Fleet banners — bump both TiLTClaw + Volta to 240px contain layout** — TiLTClaw was getting top/bottom crop from `object-fit: cover` (same root cause as Volta; logo art is centered in the file with dark edges, cover sliced the middle band and chopped the claws). Volta was using contain at 160px which left the wordmark too small to read. Both now: contain + matching edge color (TiLTClaw: `#0a061b` sampled dark navy · Volta: `#000`) + 240px tall. Logos are fully visible at readable size; no rectangle artifacts since the container bg matches each image's painted edge.
- **Volta banner — replace tight crop with padded version** — original 977×485 export had the logo running edge-to-edge, so the 130px banner strip on the OpenClaw Fleet card was cropping the wordmark and claw geometry. Replaced with a 1954×970 export that includes generous transparent padding; `object-fit: cover` now scales the logo down into the strip without clipping.
- **Volta banner — eliminate "rectangle artifact" from transparent padding** — the padded image's painted background turned out to be pure black (sampled the actual pixels), so the transparent padding around the logo showed the card surface (#18181b) creating a visible darker rectangle around the logo. Per-entry `bannerFit` / `bannerBg` / `bannerHeight` overrides on the FLEET registry now let Volta render with `object-fit: contain` + black background + slightly taller (160px) strip — the transparent padding blends seamlessly with the logo's painted black bg, no rectangle artifact, full logo visible without crop.

### Added
- **New "OpenClaw Fleet" section** between Current Research and Writing — card-per-agent home for every OpenClaw AI agent in production or active development. Designed to scale as new fleet members come online; each card has a stable anchor + `/share/<id>/` URL + auto-generated OG preview. First three cards:
  - **TiLTClaw** (public, in production) — full banner-strip + 4-bullet description of its TiLT support-triage role. Pairs with the TiLT card via a "Powers TiLT →" footer link.
  - **Volta** (redacted · stealth) — High-Voltage AI Orchestration brand artwork as banner strip. Electric-blue `REDACTED` stamp. Operational bullets partially blacked-out (`████`) for the parts that aren't ready to disclose.
  - **RentalClaw** (redacted · in development) — square logo + brand-blue `REDACTED` stamp. Framed as an autonomous vacation-rental management agent.
- **TiLT card sub-mention trimmed to a one-liner pointer** — "Support runs on TiLTClaw — see OpenClaw Fleet ↓" replaces the previous click-to-expand sub-card. The TiLT card stays focused on the parent product; the full TiLTClaw story lives in the new fleet section.
- **Monad-1 token totals now aggregate from per-agent self-published stats** — Infrastructure.jsx fetches `volta-stats.json` (and any future `OPENCLAW_TOKEN_SOURCES` entries) in parallel with Monad's own JSON and sums the `tokens.{total,last24h,last7d}` into the displayed Monad-1 tile values. Reads as "total inference work done on this rig" rather than only what the Monad publisher's source happens to capture. Pattern scales: future OpenClaw agents that connect to Monad just add one URL to the `OPENCLAW_TOKEN_SOURCES` array.

### Changed
- **Paper metadata now fetches dynamically from `project-assets/content/papers/<slug>.meta.json`** — closes the sidecar loop with the WhitePapers session. Title / tagline / status / version / lastRevised / tags are all read at runtime from a `meta.json` sidecar that WhitePapers self-publishes alongside the markdown. Hardcoded constants in `Writing.jsx` and `/writing/recall-ledger/index.html` are gone — replaced with last-known-good fallback values that only render if the meta fetch fails. New reusable `src/hooks/usePaperMetadata.js` hook + `formatPaperDate` helper handle the React side; the static paper page does the equivalent with a parallel-Promise pattern via `Promise.allSettled`. Future paper version bumps (v5, v6, …) now require zero portfolio PRs — WhitePapers edits the meta.json, runs `./publish.sh`, the portfolio reflects the change on next hard-reload.

### Changed
- **Recall Ledger paper metadata bumped to v4 (May 22, 2026)** — body content of the paper already fetches dynamically from `project-assets/content/papers/recall-ledger.md` (updates landed at runtime when WhitePapers PR #4 shipped v4), but the hardcoded version chip in the page header and the entry on the Writing card were still showing `v2 · May 17, 2026`. Bumped both: the share badge / "Last revised" label on `/writing/recall-ledger/` and the status / date on the Writing card now read v4 / May 22, 2026. Mechanical chip-bump only; no UX change.

### Changed
- **Monad-1 card: render the full model library, not just loaded models** — the publisher now ships an `availableModels` array with a `resident: true|false` flag per entry. The card now renders every installed model with a `● Loaded · {role}` pill (active models, bright accent, full opacity) or a `○ Cold · {role}` pill (installed but not in VRAM, dimmed). Section header changes from "Currently serving (multi-model)" to "Installed models · N loaded / M installed". Cold models render at 70% opacity so the eye still lands on active ones first. Falls back to wrapping `currentModels` (and ultimately the singular `currentModel`) when `availableModels` isn't published — backward-compat preserved.

### Added
- **TiLTClaw built-in-support mention inside the TiLT card (click-to-expand brag panel)** — compact one-line callout by default with a small rotating chevron affordance; clicking expands a detail panel with the TiLTClaw banner, a "What it does" bullet list (24/7 ticket monitoring, routing, urgent payroll escalation, Discord access), and a "Why it matters" paragraph framing the production OpenClaw deployment. Smooth height-fade animation via `AnimatePresence`. Keeps the TiLT card visually quiet at rest while letting curious visitors dig in. Anchor id (`#tiltclaw`) and share-cards registry entry preserved for deep-linking and the auto-generated OG preview (`/share/tiltclaw/`) — OG screenshot captures the collapsed state, matching what most visitors see first.

### Changed
- **Recall Ledger paper now fetches from `project-assets` (self-publish convention extended from stats to content)** — the `/writing/recall-ledger/` page now tries `raw.githubusercontent.com/Jason-Vaughan/project-assets/main/content/papers/recall-ledger.md` first and falls back to the local `paper.md` if the project-assets file is missing or unreachable. Establishes a new general convention for self-published content (mirrors the `monad-1` stats pattern): `project-assets/content/<type>/<slug>` is the universal lane for any project-side session that wants to publish to its piece of the portfolio without round-tripping through the portfolio session. WhitePapers session will own the public v2 of the paper and republish whenever it materially changes; portfolio reflects updates immediately, no portfolio rebuild required.

### Changed
- **Monad-1 card: render the multi-model list from the new `currentModels` contract** — the publisher now ships both `currentModel` (singular, backward-compat) and `currentModels` (array, with per-entry `role` field: chat / code / etc.). The card no longer under-represents the rig — it lists every model the box is hosting simultaneously, each with a small role pill (chat, code) followed by name · precision · size. Header switches to "Currently serving (multi-model)" when more than one model is loaded. Gracefully degrades to single-line rendering when only `currentModel` is present.

### Added
- **Rich link previews for shared cards (Open Graph + auto-generated thumbnails)** — sharing a portfolio card via iMessage / Slack / Discord / Twitter / etc. now produces a rich preview with title, description, and a 1200×630 screenshot of that specific card. Each card in the new `src/data/share-cards.js` registry generates a `public/share/<id>/index.html` stub with proper OG meta tags + a JS redirect to `/#<id>` (humans land on the card with the existing pulse animation; crawlers grab the meta tags before redirect). A Playwright-based screenshot generator boots the production-built site, captures each card by its anchor id, and produces consistently-framed 1200×630 PNGs. Both generators run as part of the GitHub Pages deploy workflow, so adding / removing / renaming cards in the registry keeps the previews in parity automatically — no commit churn for generated images. The `ShareLink` button on each card now copies `/share/<id>/` URLs instead of `/#<id>` so recipients get the rich preview.

### Added
- **Card-level deep links + "Copy link" buttons** — every major card now has a stable anchor (`#tilt`, `#tangleclaw`, `#cierre-sensei`, `#monad-1`, `#confidential-research`, `#recall-ledger`) and a small "Copy link" button that puts the deep URL on the clipboard. Visiting `jasonvaughan.com/#monad-1` (or any other anchor) scrolls the visitor straight to that card and pulses an amber accent ring around it for ~2.4s so the eye lands in the right place. New reusable `<ShareLink id="..." />` component drops in alongside any future card. Cleaner alternative to sharing screenshots in DMs / texts.

### Added
- **Writing & Research section** between Current Research and GPTs — long-form research artifacts surface publicly under `#writing`. Card-per-paper pattern designed to scale as more papers (e.g., upcoming Genesis docs) are added. First entry: **The Recall Ledger** white paper (v2, working draft, May 17 2026) with status badge, tagline, excerpt from executive summary, domain tags (Food safety, FSMA 204, Coordination networks, etc.), and CTA linking to the full-text page.
- **Full-text paper page at `/writing/recall-ledger/`** — static HTML with serif typography for body, sans-serif for headings/topbar/meta. Renders the paper markdown client-side via marked.js (CDN, SRI-pinned) reading from `paper.md` in the same directory. Topbar links back to the portfolio and to `#research` / `#contact`. Hero block surfaces the working-draft status, version, last-revised date, and author. Same dark-mode visual treatment as `/notse`. No password / no gate — the paper is meant to be cited, shared, and indexed.

### Changed
- **Monad-1 card: replace "Uptime" tile + header text with "Tracked"** — kernel uptime resets to 0 on a real poweroff (planned maintenance, hardware swap), which read as a regression to casual viewers and overlapped semantically with the adjacent "Planned availability" tile. Swapped both the tile and the header text to render tracking-window length from `uptime.trackedSince` (e.g., `4 days tracked`), answering "how long have we been watching this box" without overlapping the availability claim. Falls back to `{N} hours tracked` during the first 24h after a fresh publisher install so day-0 doesn't render as `0 days`. The publisher's `uptime.daysOnline` and `uptime.lastReboot` fields are retained in the JSON for any future use.

### Added
- **Planned-availability tile + last-outage footer on Monad-1 card** — renders the additive `uptime.{trackedSince, plannedOutages, plannedDowntimeSeconds}` fields shipped by the publisher in `Monad-1` PR #15. New `Planned availability` tile in the live-stats grid (e.g., `99.5%`) with a hover tooltip showing the tracking window + count of outages logged. New subtle footer line above "Private repo — internal infrastructure" reading e.g. `Last planned outage: 27 min on May 18 (relocation)` — appends `(N logged)` when more than one outage exists. Both gracefully hide when the additive fields are absent (treats a publisher predating the May-19 contract identically to the missing-file path).

### Changed
- **Hide the "Est. cloud cost avoided" tile when it rounds to $0** — early-life LiteLLM with a few hundred tokens served renders `$0`, which reads weaker than not showing the tile at all. Tile reappears automatically once the value clears $1.

### Added
- **GPU utilization + power-draw tiles on Monad-1 card** — surface two live fields the publisher already emits (`gpu.utilization`, `gpu.powerDraw`). Tiles render only when the field is present (graceful degrade preserved). Visually balances the live-stats grid alongside the existing GPU temp tile.

### Changed
- **Relative timestamp on Monad-1 "Stats updated" footer** — replaced the raw `toLocaleString()` output (e.g., `5/17/2026, 5:47:46 PM`) with relative formatting (`just now` / `7 minutes ago` / `3 hours ago` / falls back to absolute date past 24h). Absolute timestamp moved to a `title` tooltip on hover. Reads fresher and makes a stale publisher immediately visible.

### Fixed
- **Monad-1 card field-name mismatch with live publisher** — portfolio component was reading the pre-spec shape (`tokens.lifetime`, `currentlyServing.displayName`, `hardware.gpuTempC`, `throughput.evalTokensPerSecond`, `techStack`, `uptime.humanText`) while the Monad-1 publisher emits the v1-spec shape (`tokens.total`, `currentModel.name`, `gpu.temp`, `throughput.tokensPerSec`, `stack`, `uptime.daysOnline`). With the mismatch, only the hardcoded hardware specs rendered — GPU temp, tech stack, uptime, and the currently-serving banner stayed blank despite the JSON being live and fresh. Renamed all field reads to match the published shape and now compute the uptime text client-side from `daysOnline`. The "Currently serving" banner now surfaces name + precision + size from `currentModel.{name,precision,size}` instead of the old `currentlyServing.vramResidentGB`.

### Added
- **Current Research section** (new) between Pipeline and GPTs — for active investigations and the systems that power them. Frames Monad-1 and similar work as ongoing research, not just operational infrastructure. Section anchor: `#research`. Designed to scale to multiple research project cards over time.
- **Monad-1 card** — hero phrase "Local-First AI Inference", live stats grid (tokens served lifetime, estimated cloud cost avoided, sustained eval throughput, inference requests, GPU temp, tokens today), hardware specs (RTX PRO 6000 Blackwell 96 GiB VRAM · Threadripper 9970X · 251 GiB RAM), currently-serving model line, models-tested tags, tech stack tags, pulsing-green "Active" status indicator with uptime, last-updated timestamp. Reads live data from `monad-stats.json` (published directly by an agent on the Monad-1 box to project-assets). Graceful degrade: hardware specs always shown, live stats render `—` when the stats file isn't published yet.
- **Confidential Research teaser card** (in Infrastructure section) — styled like a redacted document with a "CLASSIFIED" stamp. Two lines of body text with `████` redaction blocks describing undisclosed engagement and recent work. CTA: "Contact under NDA →" linking to the contact section. Positions Jason as available for vetted direct AI consultation without exposing details. Visually distinct (darker background, red accent for the classified-doc aesthetic).

### Changed
- **BuilderStats tile precision + exact values + 7-day deltas** — three related improvements so small daily/weekly changes are visible without losing the clean tile aesthetic:
  - **More precision in `formatBigNumber`**: 1K-100K now shows one decimal (e.g., `5.8K+` instead of `5K+`); 100K-1M still shows whole K (already 3 sig figs). Lets you see "+53 tests this week" actually move the display from `5.8K+` to `5.9K+`.
  - **Exact value in hover tooltip**: every tile's tooltip now shows the precise count (e.g., `Exact: 5,869`) below the methodology description, separated by a thin divider. One hover away from the full number.
  - **7-day delta badge**: small green/red `+N / 7d` (or `−N / 7d`) below each tile label when the metric changed over the past week. Reads `manifest.aggregateDeltas.<key>` — populated by the collector's new 7-day diff (project-assets PR shipped separately). Gracefully hides when not present (so this PR is safe to ship before the collector updates).
- New `formatDelta(n)` helper in `src/utils/format.js` for the delta badge. Tests added.

### Changed
- **`/notse` page rewritten for honesty + technical depth (verified-only facts)** — replaced overclaimed/hallucinated copy ("sub-frame precision", "cross-platform Electron desktop app", "mirror display", "multi-script queue") with the actual product reality from the user's review. New page structure:
  - **Hero**: clarifies the two-machine networked architecture upfront
  - **How it works** (new): graphics machine (Windows + PowerPoint helper via COM) + operator machine (Mac running Notse.app), networked over LAN WebSocket on port 9816
  - **What it does today** (rewritten): 8 verified v0.5.12 features — live PowerPoint integration via COM, bidirectional note editing (Cmd+E writes back), build-aware rendering, slide control trio (Cmd+B / s / Cmd+O), pre-cached notes, dynamic prompter formatting, macOS code-signed/notarized, Keygen.sh-backed licensing
  - **Coming soon** (new): 6 roadmap items clearly labeled — Windows code signing (in progress), NDI output, Solo Mode, PowerPoint Mac helper, primary/backup auto-failover, audio auto-follow
  - **System requirements** (new): macOS 12+ for operator, Windows 10/11 for helper, same-LAN networking
  - **License**: bullets corrected (Keygen.sh-backed activation, Mac app + Windows helper)
  - **Built from inside the workflow** (new): credibility section noting Jason as a working TD/graphics operator, with link to the public `notse-releases` repo
- **Notse project card on portfolio rewritten** — blurb now describes the actual two-machine architecture (Windows helper drives PowerPoint via COM; Mac app shows prompter and writes notes back on Cmd+E). Tags updated: `TypeScript` → `PowerPoint COM` (more distinctive than a language tag, which auto-detects anyway).

### Changed
- **`/notse` page hero now displays the full Notse logo prominently** — was a tiny 40×40 topbar logo only; now also features a 240px centered logo in the hero with click-to-zoom (native `<dialog>` modal opens the full 1024×1536 source). Modal closes on ESC, on click outside the image, or on click of the image. Topbar gains a **"Releases ↗"** link pointing to `https://github.com/Jason-Vaughan/notse-releases` (the public release-artifacts repo) so buyers have a clear path to find DMGs and changelog.

### Added
- **Live stats on Pipeline cards (Medusa + UCI)** — Pipeline.jsx now fetches the centralized collector manifest and renders a per-card stats row (LOC · tests · commits · PRs) matching the visual pattern used on the Projects grid cards. Stats only render when present (via the `slug` field on each project entry mapping to the manifest). Both repos were already counted in BuilderStats aggregate — this adds per-card visibility. Live values: Medusa 19.7K LOC / 45 commits / 5 tests / 6 PRs · UCI 28.6K LOC / 23 commits / 545 tests.

## [2026-05-05] — Notse Sales Pipeline + Tip Jar + SSL Fix

### Added
- **Notse licensing landing page at `/notse`** — static HTML page (`public/notse/index.html`) with hero, feature grid, single-tier pricing card, volume/custom contact CTA, footer linking back to portfolio. Dark theme matches portfolio. Wired to the live Stripe Payment Link (`https://buy.stripe.com/5kQdR9a9k7Ek5aFcssaMU00`, product `prod_USki7sq4gY0Fpu`) for a **$50/year subscription** licensing model: "Per machine · all updates while active · cancel anytime". Works on GitHub Pages out of the box (no SPA routing complexity); page is genuinely separate by design since the audience is product buyers, not portfolio visitors.
- **Tip Jar (header pill + section card)** — two opt-in CTAs for client/visitor tips, both pointing at the same Stripe Payment Link (Stripe's "customer chooses price" feature — customer picks any amount, with `$5/$10/$25/$50/$100` preset suggestions, "Donate" call-to-action button). Small amber pill above the "Jason Vaughan" header (subtle, always-visible at the top, simple inline SVG icon since detailed art is illegible at 18px). Larger illustrated card placed between GPTs and Contact, featuring the user's hand-illustrated tip-jar artwork (`src/assets/tipjar.png`, 320×320 PNG, 111KB — resized from a 1024×1024 source). New `TipJar.jsx` component. Live Stripe Payment Link: `https://buy.stripe.com/7sY5kD6X8bUA7iNfEEaMU01`, product `prod_USrEuQMbhr1sFL`.

### Changed
- **Notse project card now links to `/notse`** — was `#contact` ("Contact for licensing"), now `/notse` ("View licensing"). Same-tab navigation for internal `/`-prefixed links (anchors still smooth-scroll, external still open in new tab).

### Fixed
- **SSL cert provisioning on `jasonvaughan.com`** — Chrome was rejecting the site because GitHub Pages was serving its generic `*.github.io` wildcard cert instead of a Let's Encrypt cert for the custom domain. Cert provisioning had silently failed earlier in the domain's history. Fixed by clearing + re-adding the custom domain via the GitHub Pages API (`PUT /repos/.../pages` with `cname: null` then `cname: "jasonvaughan.com"`), which re-triggered Let's Encrypt issuance. Cert SAN now includes both `jasonvaughan.com` and `www.jasonvaughan.com`. `https_enforced` flipped to `true` once the cert was in place.

### Infrastructure (lives in separate repos — noted here for portfolio context)
- **`Jason-Vaughan/licensing-workers`** (new private repo) — Cloudflare Workers that bridge Stripe Payment Link checkouts → Keygen license creation → Resend email delivery. First Worker `notse-licensing` is live at `https://notse-licensing.jasonvaughan.workers.dev`. Stripe webhook (`checkout.session.completed`) registered, end-to-end test passed (license created in Keygen, key emailed to buyer). Resend domain `jasonvaughan.com` verified (SPF + DKIM + MX TXT/MX records published in GoDaddy DNS — apex Outlook MX untouched). One-Worker-per-product layout so future products (TiLT, ScrapeGoat, etc.) can be added by copying the `notse/` folder.

## [2026-05-04] — Lines Refactored Stat + Tile Tooltips

### Added
- **Lines Refactored stat in BuilderStats** — 8th headline tile (pink `#ec4899`, "Lines Refactored") summing `aggregateRefactored.count` from the centralized collector manifest. Counts lines deleted across history (true deletions, full rewrites, simplifications), scoped to each repo's LOC profile so the number is apples-to-apples with the existing `loc` stat. Hidden until non-zero, matching the AI Tokens / Fixes Shipped / PRs Merged pattern. **Hover tooltip** on the tile (dotted underline cue + `cursor: help`) explains the framing for non-dev viewers: "Lines removed across all repos — refactoring, cleanups, dead code removal, simplifications. A high number means the codebase is being revisited and improved, not just stacked on." Pairs with project-assets#6 which adds `countLinesRefactored` to the collector. Live aggregate at release: **90,582 lines refactored across 14 repos** (~1:5 deletion-to-add ratio).
- **Hover tooltips on every BuilderStats tile** — all 8 tiles now have a dotted-underline + `cursor: help` cue and a hover popup explaining methodology (what's measured, source, scope, non-obvious nuance). Notably, the Lines of Code tooltip clarifies "current snapshot vs lifetime-added" — addresses the recurring "why is the number lower than total commits added?" question. Tooltip content is data-driven via the optional `description` field on stat objects.

### Changed
- **BuilderStats tiles condensed** — `minmax` 110px → 80px, gap 12 → 10, value font 28 → 24, label font 11 → 10, letter-spacing 1 → 0.5. Wrap-to-2-rows breakpoint drops from ~960px viewport to ~810px viewport. Tiles read tighter on desktop while staying legible on tablet/mobile.

### Fixed
- **Tile hover tooltips were clipped by the BuilderStats container** — removed `overflow: hidden` from the outer card so tooltips can float on top. Top accent bar now rounds its own corners (`borderRadius: "16px 16px 0 0"`) since the parent no longer clips it.
- **BuilderStats single-row layout for 8 tiles** — when the Lines Refactored tile pushed total count from 7 to 8, the 110px-min grid wrapped to 2 rows. Resolved via the condense above.

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
