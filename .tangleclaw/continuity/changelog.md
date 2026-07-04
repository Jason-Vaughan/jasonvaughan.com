# Continuity Changelog

- 2026-06-22 (session:552) Wire OpenAI Codex CLI usage into the stats collector as an additive, auth-mode-gated `openai` token source (~14.5M previously uncounted), harden tokens.mjs from 0 to 70 tests, and fix the AI Tokens daily lag with a self-deploying launchd wrapper that runs 4×/day instead of 1×. Shipped as project-assets PRs #28/#29/#30 (issues #26/#27 closed); portfolio CHANGELOG and TODO updated. Codex is ChatGPT-auth so it's invisible to the OpenAI admin API — additive with no double-count, enforced as a contract per machine.
  files: package.json

- 2026-06-29 (session:569) Ship the ClawHub "for the OpenClaw ecosystem" descriptor and cut the 0.2.0 release (#86), then add "/ 7d" delta badges to the AI Tokens and Projects Shipped BuilderStats tiles via a paired collector change (project-assets#31 + #87) and make Projects Shipped always render its badge (#88). The independent reviewer caught a stale-base phantom-duplicate on #86 that a rebase resolved; all four PRs merged with tests green.
  files: package.json
