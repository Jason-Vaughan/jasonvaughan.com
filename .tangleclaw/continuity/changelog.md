# Continuity Changelog

- 2026-06-22 (session:552) Wire OpenAI Codex CLI usage into the stats collector as an additive, auth-mode-gated `openai` token source (~14.5M previously uncounted), harden tokens.mjs from 0 to 70 tests, and fix the AI Tokens daily lag with a self-deploying launchd wrapper that runs 4×/day instead of 1×. Shipped as project-assets PRs #28/#29/#30 (issues #26/#27 closed); portfolio CHANGELOG and TODO updated. Codex is ChatGPT-auth so it's invisible to the OpenAI admin API — additive with no double-count, enforced as a contract per machine.
  files: package.json

- 2026-06-29 (session:569) Ship the ClawHub "for the OpenClaw ecosystem" descriptor and cut the 0.2.0 release (#86), then add "/ 7d" delta badges to the AI Tokens and Projects Shipped BuilderStats tiles via a paired collector change (project-assets#31 + #87) and make Projects Shipped always render its badge (#88). The independent reviewer caught a stale-base phantom-duplicate on #86 that a rebase resolved; all four PRs merged with tests green.
  files: package.json

- 2026-07-04 (session:591) Refresh the Tangle hero cards for two upstream releases: TangleClaw 4.0 copy rewrite + TangleBrain "On PyPI" chip and `pip install tanglebrain` CTA (PR #90, with new featured-cards invariant tests), then sharpen the TangleClaw claim to "zero npm dependencies" after verifying the repo has no package.json at all (PR #91, trivial fast-path). Also tags the overdue v0.2.0 at its cut commit and publishes the GitHub Release, enables repo auto-merge, and files #89 for 4.0 screenshots. Both PRs merged, deployed (one Pages flake rerun), and verified live by bundle grep.
  files: CLAUDE.md, PROJECT-MAP.md, package.json
