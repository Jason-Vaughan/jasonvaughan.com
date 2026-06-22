# Cross-Session Learnings — JasonVaughanComPortfolio

Non-obvious behaviors, validated patterns, and failure modes worth remembering. Skip the obvious; capture only what would change how a future session approaches a similar task.

## 2026-06-22 — Adding a ccusage-backed token source (Codex): three non-obvious traps

Wiring OpenAI Codex into the stats collector surfaced three things that would have bitten a future "add another agent's tokens" task. See project-assets #28/#29/#30.

- **ccusage's multi-agent support is per-package, not per-subcommand on the installed binary.** The README lists ~15 agents (Codex, OpenClaw, Copilot CLI…), but the globally-installed `ccusage` (20.0.14) only has the Claude Code source — `ccusage codex` errors with "Command not found". Codex support lives in `ccusage@latest` (or the deprecated `@ccusage/codex`). **Don't trust the README's capability list against the installed version — probe the actual binary, and standardize on `npx -y ccusage@latest <agent>`.**

- **`auth_mode` is the double-count discriminator for any agent that can auth two ways.** Codex via ChatGPT login (`auth_mode=chatgpt`) is subscription-billed and *invisible* to the OpenAI admin-API usage report → safely additive. API-key auth *is* in that report → adding it would double-count. The fix that turns this from a fragile comment into a contract: gate collection on `auth_mode` per machine (only count when `chatgpt`), so a future auth switch can't silently double-count. Generalizes to any new token source — check its billing path before stacking it on an existing `api` source.

- **A "deployed copy with a manual sync step" *will* drift — verify the scheduled artifact is the one you edited.** The launchd agent ran a hand-copied `~/.claude-stats/refresh.sh` snapshot, not the repo script; editing `local-agent/refresh.sh` in the repo did nothing on schedule (the copy had frozen out the Codex source for 2 days). The durable fix is a **self-deploying wrapper** (`run-agent.sh`: `git pull` → `install` script to a stable path → `exec` the copy). It also dodges the mid-run-mutation hazard of pointing launchd directly at a repo file that the script itself `git pull`s. Before assuming a local fix is live, confirm what the scheduler actually executes.
