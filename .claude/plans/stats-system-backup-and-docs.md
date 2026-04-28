# Stats System: Backup Local Agent + Document Architecture

## Context

The portfolio's centralized stats system is now feature-complete and on auto-pilot for daily updates (GitHub project stats + OpenAI admin API + Anthropic ccusage agent + Gemini telemetry + Copilot prorated). Total live: ~9.29B tokens across all sources.

**The gap**: critical pieces of the wiring live only on Cursatory's local disk — the launchd plist, the agent shell script, and the Gemini telemetry config in `~/.gemini/settings.json`. If Cursatory dies or the user moves to a new Mac, they'd have to reverse-engineer the setup from this conversation. Equally, the architecture has grown enough that a future Claude session re-deriving "how does the token tracker work" would burn context.

This plan captures both into project-assets + project memory so the system is self-documenting and re-deployable.

## Files to create/update

### In `Jason-Vaughan/project-assets`

- `local-agent/refresh.sh` — copy of `~/.claude-stats/refresh.sh`. Identical content; this is the canonical version going forward. The local copy on Cursatory is the deployed instance.
- `local-agent/com.jasonvaughan.claude-stats.plist` — copy of the LaunchAgent. macOS-specific; uses absolute paths so re-deploy on a different user account requires editing.
- `local-agent/gemini-telemetry-snippet.json` — the JSON block to merge into `~/.gemini/settings.json` to enable telemetry.
- `local-agent/README.md` — re-deployment steps:
  - Install ccusage globally on the local Mac (`npm i -g ccusage`)
  - Ensure SSH alias `habitat` works (existing config)
  - Copy `refresh.sh` to `~/.claude-stats/`, `chmod +x`
  - Edit the plist's hardcoded `/Users/jasonvaughan` paths if the user differs, copy to `~/Library/LaunchAgents/`, then `launchctl load`
  - Merge Gemini telemetry snippet into `~/.gemini/settings.json`
  - Run `~/.claude-stats/refresh.sh` once to verify

### In project memory

- `~/.claude/projects/-Users-jasonvaughan-Documents-Projects-JasonVaughanComPortfolio/memory/project_stats_system.md` — already exists but describes only the GitHub-stats collector. Extend it with the token aggregation architecture (5 providers × 4 source types = api / agent / manual / prorated, schedule, where each piece lives, how to add a new provider).

## Files NOT to touch

- The deployed `~/.claude-stats/refresh.sh` and `~/Library/LaunchAgents/com.jasonvaughan.claude-stats.plist` stay where they are. Local copies remain the source of truth for what's actually running; project-assets is the disaster-recovery copy + canonical reference.
- `~/.gemini/settings.json` stays as-is (telemetry is enabled and working).

## Verification

- `local-agent/` contents in project-assets match the local files (diff returns clean)
- README.md is sufficient for someone unfamiliar with the system to redeploy on a fresh Mac
- `project_stats_system.md` memory describes every auto-pilot piece without referring to "this conversation"
- A future Claude session reading `MEMORY.md` + `project_stats_system.md` should be able to answer "how do I add a new AI provider to the token tracker?" without needing to read code

## Out of scope for this plan

- TangleClaw hook for per-project Gemini telemetry (separate future enhancement)
- Self-hosted Kimi/DeepSeek router integration (will be done when the router is online)
- Cursor delta refresh (no API, one-time export only)
