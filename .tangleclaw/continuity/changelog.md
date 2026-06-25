# Continuity Changelog

- 2026-06-22 (session:552) Wire OpenAI Codex CLI usage into the stats collector as an additive, auth-mode-gated `openai` token source (~14.5M previously uncounted), harden tokens.mjs from 0 to 70 tests, and fix the AI Tokens daily lag with a self-deploying launchd wrapper that runs 4×/day instead of 1×. Shipped as project-assets PRs #28/#29/#30 (issues #26/#27 closed); portfolio CHANGELOG and TODO updated. Codex is ChatGPT-auth so it's invisible to the OpenAI admin API — additive with no double-count, enforced as a contract per machine.
  files: package.json
