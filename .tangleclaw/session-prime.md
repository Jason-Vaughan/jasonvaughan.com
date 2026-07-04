# Session Start — JasonVaughanComPortfolio
*TangleClaw'd into existence.*

## Session Ownership
This session owns one project: **JasonVaughanComPortfolio**.
- Owned project: `JasonVaughanComPortfolio`
- Host: `cursatory.tail123678.ts.net`
- Transport: `tmux`
Treat `JasonVaughanComPortfolio` as the project you are working in this session.

## Scope Guard
You own **JasonVaughanComPortfolio** this session (see Session Ownership above).
Other projects have a live session right now:
- `TangleClaw`
- `TangleBrain`
- `Volta`
- `TiLT Claw`
- `RentalClaw-Project`
- `Monad-1`
Before acting on a request that clearly belongs to a different project — editing or committing in another repo's territory — STOP and flag it in one line (e.g. "Heads up: this looks like another project's work, not JasonVaughanComPortfolio. Do it here anyway, or is it meant for that tab?"). Name the likely tab when you can, then wait for the operator's confirmation.
Surface the mismatch — never refuse outright; the operator can always say "do it here."

## Resume — emit this as your FIRST visible message
This prime is hidden context; the operator does not see it. Before doing anything else, your first reply MUST be a short, visible resume prompt, and you MUST NOT start the work until the operator confirms.

Last session recorded:
- Where we are: Ship the ClawHub "for the OpenClaw ecosystem" descriptor and cut the 0.2.0 release (#86), then add "/ 7d" delta badges to the AI Tokens and Projects Shipped BuilderStats tiles via a paired collector change (project-assets#31 + #87) and make Projects Shipped always render its badge (#88). The independent reviewer caught a stale-base phantom-duplicate on #86 that a rebase resolved; all four PRs merged with tests green.
- Next action: - Tag `v0.2.0` — the release was cut in CHANGELOG/package.json but never tagged (`git tag -a v0.2.0` + `gh release create --notes-from-tag`).
- #82 — add cert issuer logos + per-card OG-preview stubs (new card links use plain `/#`, no social image).
- #81 — collapsible-section show/hide refinement (partly addressed by the dropdown redesign).
- Trim the duplicate `<h2>` on wrapped sections (section renders its own heading plus the dropdown label).
- Accessibility/contrast pass (WCAG AA fail on tag-pill text) + the stale Cursor 7B keep/retire decision.
- Written at: branch wrap/20260629202635-jasonvaughancomportfolio @ad33169 2026-06-29
- Wrap tier: no-plugin (judgment may be thin — verify)

Your first turn:
1. Freshness check FIRST — verify the Next action is still live before offering it. Cheap checks: is any referenced issue still open (`gh issue view <N>`)? Has the branch merged? Does the named artifact still exist? Compare HEAD to the written-at sha above.
2. Emit one visible message, leading with the banner `*TangleClaw'd into existence.*`, then "We left off at <X>. Next: <Y>." If the freshness check shows the next action is stale (issue closed, branch merged, artifact gone), say so honestly: "…but I checked and <reason>, so this looks stale — re-orient, or continue anyway?"
3. Wait for the operator's go. Do not auto-execute the next action.

## Feature Index
# Feature Index

<!--
Maintained automatically: the wrap-step handler appends
stubs when PRs touch new files. Fill in descriptions before
next wrap.

Format: - **Name** — short description. file.js:line, file2.js:line.
-->

## UI / Web

## Server / API

## Methodologies / Engines

## CLI / Tooling

## Project Map
A structural "where things live" map is maintained at `PROJECT-MAP.md` (project root). Consult it FIRST when locating where code, features, or shared docs live — before grep or filesystem search.

## Wrapping this session
When the user signals they want to wrap up (e.g. types "wrap", "let's wrap up", "end the session"), confirm first if it is ambiguous, then emit the marker `TANGLECLAW_WRAP` on a line by itself. TangleClaw watches for that bare token and opens the wrap drawer — it does NOT auto-commit or kill the session, so nothing is lost; the operator still reviews and confirms the wrap.
