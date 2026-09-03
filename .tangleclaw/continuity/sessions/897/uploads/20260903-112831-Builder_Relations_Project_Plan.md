# Builder Relations
## TangleClaw Project Plan, Technical Architecture & Operating Charter

**Owner:** Jason Vaughan  
**Project type:** Dedicated TangleClaw system / persistent operating project  
**Primary purpose:** Build meaningful relationships with other AI builders, increase real-world adoption of Jason's open-source projects, and turn ongoing engineering work into useful public writing and conversations.  
**Public publishing home:** `jasonvaughan.com` → existing **Writing** section, with a dedicated `/articles` archive and permanent per-article URLs.  
**Primary projects in scope:** TangleClaw, Medusa, Notse, Monad/local-AI infrastructure, ClawBridge, TangleBrain, LensJester, TiLTClaw, and future AI/building projects.

---

# 1. Executive Summary

Builder Relations is not a marketing automation system.

It is a persistent, AI-assisted editorial and community-relations system whose job is to:

1. Observe meaningful activity across Jason's projects.
2. Identify potentially interesting engineering stories, lessons, failures, design decisions, milestones, and recurring questions.
3. Ask Jason concise, high-value questions when a real story may exist.
4. Maintain durable editorial memory so the system learns what Jason has already written about, what he finds interesting, and what creates meaningful engagement.
5. Help turn Jason's firsthand experience into useful articles, build notes, technical write-ups, GitHub discussions, and platform-native posts.
6. Publish canonical long-form material through `jasonvaughan.com`.
7. Distribute adapted versions to relevant external communities without becoming spammy or promotional.
8. Measure success primarily through relationships, users, contributors, useful conversations, and repeated engagement—not vanity metrics.
9. Continuously improve its recommendations from Jason's feedback and observed outcomes.

The system should automate **observation, collection, classification, memory, prompting, drafting assistance, distribution preparation, analytics collection, and follow-up suggestions**.

It should **not autonomously publish under Jason's name** unless Jason later explicitly changes that policy.

The human remains the source of lived experience, judgment, personal opinion, technical interpretation, and final approval.

---

# 2. Core Philosophy

## 2.1 Primary flywheel

> Build interesting things → notice what happened → extract the real lesson → write something useful → distribute it where relevant → start conversations → attract users/builders → receive feedback → build better things → repeat.

Builder Relations exists to make this flywheel reliable.

## 2.2 What the system is optimizing for

Optimize for:

- Real users trying Jason's software.
- Repeat users.
- Meaningful GitHub issues.
- Outside contributors.
- Useful discussions.
- Builder-to-builder relationships.
- People returning to Jason's projects.
- People referencing Jason's work elsewhere.
- Genuine technical reputation.
- High-signal writing based on firsthand experience.
- Opportunities to help other builders.

Do **not** optimize primarily for:

- Raw pageviews.
- Follower count.
- Posting frequency.
- Likes.
- Impressions.
- Number of social posts.
- Artificial "engagement."
- Clickbait.
- Generic AI thought leadership.

A post with 300 views that creates two users and one contributor is more valuable than a post with 20,000 views and no meaningful interaction.

---

# 3. Project Boundaries and Separation of Concerns

Builder Relations should be a **dedicated TangleClaw project**.

It should not replace the existing `jasonvaughan.com` development session, nor should it become the main engineering session for TangleClaw, Medusa, Notse, or other products.

## 3.1 Builder Relations owns

- Editorial strategy.
- Community strategy.
- Project observation.
- GitHub activity analysis.
- Release/change detection.
- Idea Radar.
- Editorial memory.
- Article candidate queue.
- Jason interview workflows.
- Draft briefs.
- Draft assistance.
- Research/fact-check requests.
- Distribution plans.
- Platform-specific adaptations.
- Community relationship memory.
- Engagement analysis.
- Reporting.
- Suggestions for GitHub Discussions and community outreach.
- Suggestions for README/onboarding improvements when adoption friction is detected.

## 3.2 `jasonvaughan.com` project/session owns

- Website code.
- Writing-section UI.
- `/articles` archive.
- Article page template.
- RSS/Atom if implemented.
- Sitemap.
- SEO metadata.
- Open Graph metadata.
- structured data / JSON-LD.
- site search/filtering.
- build/deploy.
- website analytics implementation.
- publishing approved article files/content.
- visual design and responsive behavior.

Builder Relations should produce a clean publishing package or implementation request for the website session.

## 3.3 Product-specific TangleClaw sessions own

Each project remains responsible for its own:

- Architecture.
- Code.
- Tests.
- releases.
- issues.
- roadmap.
- product documentation.
- security.
- implementation decisions.

Builder Relations can observe these projects but should not modify them without an explicit task handoff.

## 3.4 Recommended interaction model

Example:

1. TangleClaw releases `5.17.0`.
2. Builder Relations observes the release and closed issues.
3. It identifies two unusual architectural changes.
4. It asks Jason:
   - "Anything surprising happen while fixing #12345?"
   - "Did the v5/v6 boundary force a design compromise here?"
5. Jason answers conversationally.
6. Builder Relations records the answer in editorial memory.
7. Builder Relations proposes:
   - one article candidate,
   - one GitHub Discussion,
   - one LinkedIn post angle.
8. Jason approves an article.
9. Builder Relations creates a finished publishing package.
10. `jasonvaughan.com` session publishes it.
11. Builder Relations prepares adaptations for external platforms.
12. Engagement and resulting GitHub activity are tracked.

---

# 4. Public Content Architecture

The existing **Writing** section on `jasonvaughan.com` should remain the public entry point.

Recommended information architecture:

```text
jasonvaughan.com/
├── #writing
├── articles/
│   ├── index
│   ├── why-i-built-tangleclaw-instead-of-just-using-a-terminal
│   ├── 96gb-local-ai
│   ├── persistent-ai-coding-sessions
│   └── ...
```

Homepage behavior:

- Show the most recent or featured 3–5 pieces.
- Include a "View all writing" link.
- Mix content types if useful:
  - ARTICLE
  - BUILD NOTE
  - ENGINEERING NOTE
  - WHITE PAPER
  - FIELD NOTE
  - POSTMORTEM
  - EXPERIMENT

Each article should have:

- Permanent slug.
- Title.
- Dek/summary.
- Author.
- Original publication date.
- Last updated date where applicable.
- Content type.
- Reading time.
- Relevant projects.
- Topic tags.
- Canonical URL.
- Open Graph/Twitter metadata.
- Description/meta description.
- JSON-LD Article or TechArticle where appropriate.
- Internal links to related articles.
- GitHub links.
- Source references where applicable.
- "Discuss this" route if GitHub Discussions is enabled.
- Optional changelog/history for living technical pieces.

---

# 5. Content Strategy

## 5.1 Content should come from real work

The system should strongly prefer:

- Unexpected technical problems.
- Architecture decisions.
- Tradeoffs.
- Failure modes.
- Debugging stories.
- "We thought X; reality was Y."
- Lessons learned.
- Tool comparisons based on actual use.
- Local-vs-cloud model experience.
- Practical AI-agent workflow lessons.
- Production engineering crossovers.
- How Jason uses tools rather than generic tutorials.
- Questions that multiple people ask.
- Milestones that reveal something interesting.
- Experiences where AI-assisted development behaved unexpectedly.
- Real deployment or field-use stories.

The system should de-prioritize:

- Routine version bumps.
- Changelog restatements.
- Thin opinion pieces.
- Generic AI trend commentary.
- Posts written only because a posting deadline arrived.
- Product hype.
- Search-engine filler.
- Articles with no firsthand value.

---

# 6. Initial Article and Build-Note Backlog

The following ideas should be seeded into the initial Idea Radar.

## TangleClaw / agent orchestration

### Why I Built TangleClaw Instead of Just Using a Terminal
Potential angles:
- What became painful with raw terminal + TTYD + TMUX workflows.
- Persistent sessions.
- Multi-engine abstraction.
- Why orchestration matters after using AI coding agents heavily.
- What changed once agents became part of daily development.

### Persistent AI Coding Sessions: Why I Wanted My Agents to Survive Everything
Potential angles:
- Session persistence.
- machine switching.
- reconnecting remotely.
- terminal failure modes.
- state continuity.
- what "persistent agent workspace" means in practice.

### Claude + Codex + Local Models: What I Learned Making Them Work Together
Potential angles:
- strengths of different engines.
- routing.
- planner/builder/critic models.
- failure cases.
- how model disagreement becomes useful.
- what should remain human-controlled.

### Can Local Models Actually Replace Claude Code for Parts of Development?
Potential angles:
- where local models are useful.
- where they still fail.
- latency.
- privacy.
- cost.
- context size.
- critic/reviewer roles.
- offline workflows.

### What Happens When Multiple AI Coding Agents Share the Same Project?
Potential angles:
- collisions.
- branch/worktree strategy.
- task isolation.
- shared context.
- communication.
- supervision.
- bad emergent behavior.
- useful emergent behavior.

### The v6 Dividing Line: When Should Architecture Debt Wait?
Potential angles:
- how to decide whether a bug belongs in a current release or should be deferred into a future architecture.
- examples from notification ACKs, bridge failure reporting, workspace scoping, unprofiled-engine broadcasts.
- avoiding both premature architecture and accumulated debt.

### TangleClaw Crossed Thousands of Tests — Why?
Potential angles:
- AI-generated code and testing discipline.
- regression prevention.
- confidence when agents modify code quickly.
- what kinds of tests matter.
- where AI-created tests can become misleading.

---

## Local AI / Monad / infrastructure

### What Can You Actually Do With a 96GB Local AI GPU?
Potential angles:
- actual workloads rather than benchmark theater.
- model sizes.
- quantization.
- responsiveness.
- concurrency.
- coding.
- inference.
- memory headroom.
- power.
- operating reality.

### What 96GB of VRAM Actually Gets You for Local AI
Shorter practical variant.

### I Served Hundreds of Millions of Local Tokens — What Changed My Mind?
Potential angles:
- economics.
- latency.
- availability.
- privacy.
- reliability.
- what still belongs in the cloud.
- hidden maintenance costs.

### A 512GB Mac vs. a 96GB NVIDIA GPU for Local Models
Potential angle:
- memory capacity versus compute throughput.
- choosing bigger/slower versus smaller/faster.
- real user-perceived latency.
- workload fit.

### Building a Local AI Node That I Actually Want to Use Every Day
Potential angles:
- infrastructure.
- Tailscale.
- Linux.
- remote management.
- routing.
- monitoring.
- practical reliability.

---

## Medusa / multi-agent systems

### What I Learned Building a Multi-Agent Swarm That Wasn't Just a Demo
Potential angles:
- coordination.
- task allocation.
- supervision.
- failure.
- state.
- communication overhead.
- emergent complexity.

### When More Agents Make the Work Worse
Potential angles:
- duplicated work.
- consensus theater.
- conflicting patches.
- wasted tokens.
- where single-agent flows outperform swarms.

### From Experiment to Public Beta: What Had to Change in Medusa?
Potential angles:
- stabilization.
- observability.
- UX.
- recovery.
- determinism.
- trust.

---

## Notse / live production + AI/software

### Building a Teleprompter Because PowerPoint Presenter Notes Are Terrible
Potential angles:
- real production pain.
- why traditional workflows fail late in show prep.
- PowerPoint notes synchronization.
- WebSocket architecture.
- independent prompter control.
- field-use story.

### What Live Production Taught Me About Building Reliable AI Tools
Potential angles:
- redundancy.
- observability.
- failure domains.
- operator UX.
- recovery.
- calm design.
- why "works most of the time" is unacceptable backstage.

### Last-Minute Show Problems Are Great Product Requirements
Potential angles:
- Notse's origin.
- real users under pressure.
- product-market fit from production emergencies.

---

## Jason's broader AI-builder story

### Building Software With AI When You're Not a Traditional Software Engineer
Potential angles:
- domain expertise.
- AI as force multiplier.
- what Jason can build now.
- where deep software knowledge is still necessary.
- learning by building.

### What I've Learned Using AI Agents Every Day Instead of Occasionally
Potential angles:
- workflow changes.
- delegation.
- review.
- trust.
- context management.
- failure.
- project design.

### The Difference Between "Using AI" and Building an AI Workflow
Potential angles:
- ad hoc prompts versus durable systems.
- repeatability.
- memory.
- tooling.
- observability.
- automation.

### I Don't Want an AI That Writes Everything for Me
Potential angles:
- AI should identify stories and interview Jason.
- why human experience and opinion remain central.
- avoiding generic AI-authored content.

### My AI Tools Started as Solutions to Annoying Real Problems
Potential projects:
- TangleClaw.
- Notse.
- Medusa.
- ClawBridge.
- production tooling.

---

# 7. Builder Relations System Architecture

Recommended logical components:

```text
                ┌───────────────────────┐
                │ GitHub / Projects     │
                │ Releases / Issues /   │
                │ PRs / Commits / Docs  │
                └──────────┬────────────┘
                           │
                           v
                ┌───────────────────────┐
                │ Observation Ingestor  │
                └──────────┬────────────┘
                           │ normalized events
                           v
                ┌───────────────────────┐
                │ Signal Classifier     │
                └──────────┬────────────┘
                           │
            ┌──────────────┼──────────────┐
            v              v              v
    Editorial Memory   Idea Radar   Relationship Memory
            │              │              │
            └──────────────┼──────────────┘
                           v
                  Candidate Scoring
                           │
                           v
                  "Interview Jason"
                           │
                           v
                 Editorial Brief/Draft
                           │
                  Research / Fact Check
                           │
                           v
                   Human Approval Gate
                           │
             ┌─────────────┴─────────────┐
             v                           v
     Canonical Website              Distribution
     jasonvaughan.com          LinkedIn / Reddit /
                               GitHub / HN / etc.
             │                           │
             └─────────────┬─────────────┘
                           v
                    Analytics / Outcomes
                           │
                           v
                     Learning Loop
```

---

# 8. Repository / Directory Structure

A possible dedicated repository or project workspace:

```text
builder-relations/
├── README.md
├── CHARTER.md
├── AGENTS.md
├── config/
│   ├── projects.yaml
│   ├── scoring.yaml
│   ├── schedules.yaml
│   ├── platforms.yaml
│   └── topics.yaml
├── data/
│   ├── editorial-memory/
│   ├── relationships/
│   ├── observations/
│   ├── analytics/
│   └── snapshots/
├── content/
│   ├── candidates/
│   ├── interviews/
│   ├── briefs/
│   ├── drafts/
│   ├── approved/
│   ├── published/
│   └── distribution/
├── prompts/
│   ├── signal-classifier.md
│   ├── idea-radar.md
│   ├── interview.md
│   ├── editorial-brief.md
│   ├── draft.md
│   ├── fact-check.md
│   ├── linkedin-adapter.md
│   ├── reddit-adapter.md
│   ├── github-discussion-adapter.md
│   └── hn-evaluator.md
├── scripts/
│   ├── ingest-github.*
│   ├── normalize-events.*
│   ├── score-candidates.*
│   ├── generate-digest.*
│   ├── analytics-import.*
│   └── publish-package.*
├── schemas/
│   ├── observation.schema.json
│   ├── candidate.schema.json
│   ├── article.schema.json
│   ├── relationship.schema.json
│   └── outcome.schema.json
├── reports/
│   ├── weekly/
│   └── monthly/
└── logs/
```

The implementation language should follow existing TangleClaw conventions. Do not introduce a new stack solely for Builder Relations unless there is a clear reason.

---

# 9. Project Registry

Create a central project registry.

Example:

```yaml
projects:
  - id: tangleclaw
    name: TangleClaw
    repo: Jason-Vaughan/TangleClaw
    type: open_source
    priority: high
    signals:
      releases: true
      issues: true
      pull_requests: true
      commits: selective
      discussions: true
      readme_changes: true

  - id: medusa
    name: Medusa
    repo: Jason-Vaughan/Medusa
    type: open_source
    priority: high

  - id: notse
    name: Notse
    repo: Jason-Vaughan/Notse
    type: open_source
    priority: medium

  - id: monad
    name: Monad
    type: local_infrastructure
    priority: medium
```

Support private or non-GitHub sources later, but GitHub should be the first implementation.

---

# 10. Observation Ingestor

## 10.1 Initial source: GitHub

Observe:

- New releases.
- release notes.
- tags.
- merged PRs.
- PR descriptions.
- PR review discussions.
- newly opened issues.
- closed issues.
- issue labels.
- comments.
- GitHub Discussions.
- README/documentation changes.
- milestone completion.
- external contributors.
- first-time contributors.
- fork activity where available.
- star milestones, but only as secondary context.
- meaningful commit clusters.

Avoid treating every commit as an editorial event.

## 10.2 Event normalization

Convert source events into a normalized schema.

Example:

```json
{
  "event_id": "github:tangleclaw:issue:12345:closed",
  "source": "github",
  "project_id": "tangleclaw",
  "event_type": "issue_closed",
  "timestamp": "2026-09-03T12:34:56Z",
  "actor": "Jason-Vaughan",
  "title": "Unprofiled-engine broadcasts accumulate",
  "url": "...",
  "labels": ["bug", "v5"],
  "summary": "...",
  "files_touched": [],
  "linked_prs": [12346],
  "release": "5.17.0",
  "external_participant": false,
  "raw_ref": "..."
}
```

Store enough provenance to re-fetch context when needed.

## 10.3 Deduplication

The same engineering change may appear as:

- issue closure,
- PR merge,
- release note,
- commit cluster.

Group related events into one **change cluster**.

Example cluster:

```json
{
  "cluster_id": "tc-workspace-broadcast-leak",
  "project_id": "tangleclaw",
  "event_ids": ["...", "...", "..."],
  "canonical_subject": "Unprofiled engine broadcast accumulation",
  "release": "5.17.0"
}
```

---

# 11. Signal Classifier

Every event/change cluster should be classified for editorial value.

Suggested labels:

- `architecture_decision`
- `unexpected_failure`
- `production_failure`
- `debugging_story`
- `performance`
- `local_ai`
- `multi_agent`
- `workflow`
- `reliability`
- `testing`
- `security`
- `human_factors`
- `ux`
- `release_milestone`
- `community_contribution`
- `repeated_question`
- `tool_comparison`
- `experiment`
- `field_use`
- `not_interesting`

The classifier should answer:

1. What happened?
2. Why might another builder care?
3. Is there probably a story here?
4. Is Jason's firsthand perspective necessary?
5. Has this topic already been covered?
6. Is it timely?
7. What questions would reveal whether it is actually interesting?

---

# 12. Idea Radar

Idea Radar is the primary proactive component.

It should continuously maintain article/post candidates without nagging Jason.

## 12.1 Candidate schema

```json
{
  "candidate_id": "idea-2026-0092",
  "created_at": "2026-09-03T12:00:00Z",
  "project_ids": ["tangleclaw"],
  "source_event_ids": ["..."],
  "working_title": "When Should Architecture Debt Wait?",
  "content_type": "engineering_note",
  "angle": "How a current-release bug intersects with a future architecture boundary",
  "why_interesting": "...",
  "questions_for_jason": [
    "...",
    "..."
  ],
  "scores": {
    "interesting": 8,
    "useful": 9,
    "novel": 8,
    "timely": 7,
    "firsthand": 10,
    "relationship_potential": 7,
    "promotion_risk": 2
  },
  "status": "candidate",
  "confidence": 0.84
}
```

## 12.2 Scoring model

Suggested 0–10 factors:

- **Interesting** — Is there tension, surprise, novelty, failure, or a non-obvious lesson?
- **Useful** — Can another builder apply the lesson?
- **Novel** — Is this different from Jason's existing writing?
- **Timely** — Is this worth discussing now?
- **Firsthand** — Does Jason have direct experience others may not?
- **Technical depth** — Is there enough substance?
- **Conversation potential** — Will it invite useful discussion?
- **Relationship potential** — Could it connect Jason with relevant builders?
- **Evidence quality** — Are there concrete examples/data?
- **Promotion risk** — Does it read like a product ad?

Example weighted score:

```text
score =
  interesting          * 0.15 +
  useful               * 0.18 +
  novel                * 0.10 +
  timely               * 0.07 +
  firsthand            * 0.18 +
  technical_depth      * 0.10 +
  conversation         * 0.08 +
  relationship         * 0.08 +
  evidence             * 0.06 -
  promotion_risk       * 0.10
```

Do not treat this as mathematically sacred. It is a prioritization aid.

## 12.3 Recommendation thresholds

Suggested:

- `< 4.5`: archive quietly.
- `4.5–6.0`: retain in idea bank.
- `6.0–7.5`: include in periodic digest.
- `> 7.5`: proactively ask Jason one concise question.
- `> 8.5`: flag as strong article candidate.

Avoid asking Jason about more than a few candidates at once.

---

# 13. Editorial Memory

Editorial Memory is the core "self-learning" mechanism.

This should be explicit data, not vague model memory.

Track:

- Published articles.
- Drafts rejected.
- Ideas Jason said were boring.
- Topics Jason likes.
- Topics Jason dislikes.
- Jason's explanation of technical decisions.
- Recurring phrases and preferred framing.
- Previous article angles.
- Claims already made publicly.
- Relevant project history.
- Audience response.
- Resulting GitHub activity.
- People who engaged substantively.
- Corrections.
- Follow-up opportunities.

## 13.1 Article memory record

```json
{
  "article_id": "article-0017",
  "title": "Why I Built TangleClaw Instead of Just Using a Terminal",
  "slug": "why-i-built-tangleclaw-instead-of-just-using-a-terminal",
  "published_at": "...",
  "projects": ["tangleclaw"],
  "themes": [
    "persistent-sessions",
    "agent-orchestration",
    "terminal-ux"
  ],
  "central_claims": [
    "..."
  ],
  "source_interviews": ["interview-0041"],
  "distribution": {
    "linkedin": "...",
    "reddit": "...",
    "github": "..."
  },
  "outcomes": {
    "pageviews": 0,
    "github_referrals": 0,
    "new_issues": 0,
    "meaningful_conversations": 0,
    "new_users_known": 0,
    "contributors": 0
  },
  "lessons": []
}
```

## 13.2 Preference memory

When Jason says:

- "Nah, nothing interesting happened there."
- "I care more about the architectural decision."
- "That sounds too marketing-ish."
- "I love that angle."
- "I don't want generic AI posts."

Record the signal.

Suggested:

```json
{
  "preference_id": "...",
  "dimension": "editorial_angle",
  "signal": "positive",
  "topic": "architecture_tradeoffs",
  "strength": 0.8,
  "source": "explicit_jason_feedback"
}
```

Explicit feedback should carry substantially more weight than inferred engagement.

---

# 14. The "Interview Jason" Workflow

This is critical.

The system should **not jump directly from GitHub event → AI-generated article**.

Generic AI prose is precisely what Builder Relations should avoid.

## 14.1 Trigger

When a candidate crosses the interview threshold, generate a small set of tailored questions.

Do not use a generic questionnaire every time.

Example:

> TangleClaw 5.17.0 closed an issue where the immediate v5 fix collided with the v6 workspace-scoping design.
>
> Two things seem potentially interesting:
>
> 1. Did you initially expect this to be a simple leak fix?
> 2. What made you decide to fix it now instead of deferring it to v6?
> 3. Is there a broader rule you use for deciding when future architecture should influence a current bug fix?

Jason can answer casually.

## 14.2 Interview question bank

Possible dimensions:

- What were you trying to accomplish?
- What did you originally expect?
- What went wrong?
- What surprised you?
- How did you notice it?
- Why wasn't the obvious fix good enough?
- What alternatives did you consider?
- What tradeoff mattered most?
- What did the AI agents get wrong?
- What did they get right?
- Did the solution change your architecture?
- Would you make the same decision again?
- What should another builder know?
- Is this something most developers would encounter?
- Is there a live-production analogy?
- Was there a measurable before/after result?
- Is there a funny or memorable part of the story?
- What do you still not know?

## 14.3 Interview storage

Store Jason's answers verbatim or near-verbatim as source material.

The final article should derive its personality and unique observations from these answers.

---

# 15. Editorial Pipeline

Recommended states:

```text
observed
→ candidate
→ interview_requested
→ interviewed
→ brief
→ drafting
→ fact_check
→ review
→ approved
→ publishing_package
→ published
→ distributed
→ measuring
→ retrospective
```

Any item may go to:

```text
parked
rejected
superseded
```

Never delete rejected ideas automatically; they are valuable training signals.

---

# 16. Editorial Brief

Before drafting a full article, Builder Relations should create a short brief.

Template:

```markdown
# Editorial Brief

## Working title

## One-sentence premise

## Why this matters to another builder

## Jason's firsthand experience

## Core story arc
1.
2.
3.

## Technical evidence
- issues
- PRs
- commits
- logs
- measurements

## Claims requiring verification

## What NOT to claim

## Related previous writing

## Likely audience
- AI coding tool builders
- local AI users
- OSS maintainers
- production engineers

## Suggested format
ARTICLE / BUILD NOTE / ENGINEERING NOTE / FIELD NOTE

## Expected length

## Distribution opportunities

## Open questions
```

Jason can approve or redirect the angle before a full draft is produced.

---

# 17. Drafting Rules

Default writing should:

- Sound like Jason explaining something he actually learned.
- Prefer specific details over abstractions.
- Explain the "why."
- Include failures and tradeoffs.
- Avoid inflated claims.
- Avoid generic introductions about how "AI is changing everything."
- Avoid breathless adjectives.
- Avoid pretending Jason personally wrote code he delegated if that distinction matters.
- Be transparent about AI-assisted development where relevant.
- Avoid over-formality.
- Avoid fake certainty.
- Invite informed disagreement when appropriate.

The system should preserve Jason's point of view rather than sanding it into generic corporate prose.

---

# 18. Research and Fact-Checking

For technical articles, the system should distinguish:

## Firsthand claims
Can use:
- repository history.
- Jason's interview.
- logs.
- benchmarks.
- source code.
- local measurements.

## External factual claims
Should be checked against:
- primary documentation.
- standards.
- official release notes.
- authoritative technical sources.
- papers when relevant.

## Opinion
Should be framed as opinion or experience.

Example:

Bad:

> Local AI is cheaper than cloud AI.

Better:

> For my workload, after the hardware was already purchased, local inference reduced the marginal cost of several high-volume tasks—but it introduced its own power, maintenance, and throughput tradeoffs.

Maintain a fact-check note with each article.

---

# 19. Publishing Package for `jasonvaughan.com`

Builder Relations should hand the website project a machine-readable and human-readable package.

Example:

```text
publishing-package/
├── article.md
├── metadata.json
├── social-card-brief.md
├── assets/
└── references.md
```

Metadata example:

```json
{
  "title": "...",
  "slug": "...",
  "description": "...",
  "publishedAt": "...",
  "updatedAt": null,
  "type": "engineering-note",
  "projects": ["tangleclaw"],
  "tags": ["ai-agents", "architecture", "open-source"],
  "canonical": "https://jasonvaughan.com/articles/...",
  "featured": false,
  "readingTime": 8
}
```

The website session should be able to consume this without having to reinterpret editorial intent.

---

# 20. SEO / Discoverability Requirements

The website implementation should support:

- crawlable permanent URLs.
- server-rendered or statically generated article content where feasible.
- sitemap inclusion.
- canonical tags.
- unique page titles.
- unique meta descriptions.
- Open Graph.
- social preview image.
- JSON-LD.
- internal linking.
- topic pages if the archive grows enough.
- breadcrumb navigation.
- readable semantic HTML.
- fast page performance.
- no content hidden exclusively behind client-side state.
- RSS/Atom feed if practical.

Builder Relations should suggest internal links between related pieces.

Example:

> "This article discusses local model routing. Link the previous 96GB VRAM article in the section about model constraints."

---

# 21. Distribution Strategy

The canonical article lives on Jason's domain.

External platforms are **distribution adapters**, not duplicate publishing targets.

## 21.1 LinkedIn

Goal:
- Professional discovery.
- Existing network.
- Recruiters.
- technical production peers.
- AI builders.

Typical adaptation:

- 250–700 words.
- Strong observation/story.
- Enough substance to stand alone.
- Link to full article naturally.
- No "I'm thrilled to announce."
- Avoid corporate announcement voice.

## 21.2 Reddit

Goal:
- Discussion with specialized communities.

Rules:

- Pick only truly relevant subreddit/community.
- Start with the problem, discovery, or technical question.
- Provide enough content that the post is useful without clicking.
- Mention Jason's project only when directly relevant.
- Do not cross-post identical promotional text broadly.
- Prefer asking informed builders how they solved similar problems.
- Follow each community's self-promotion rules.

Example frame:

> I've been experimenting with persistent multi-agent coding sessions and hit a problem I hadn't anticipated...
>
> [technical description]
>
> I ended up solving it with X, but I'm curious whether anyone else running long-lived agent sessions has seen Y.

## 21.3 GitHub Discussions

This is an important community channel.

Possible categories:

- Announcements
- Show & Tell
- Design / Architecture
- Help
- Ideas
- AI Builder Workflows
- What Are You Building?

Use Discussions for:
- architecture questions.
- release context.
- roadmap conversations.
- lessons.
- user showcases.
- requests for feedback.

## 21.4 Hacker News

Do not post everything.

Candidate article should have:

- genuine technical substance.
- non-obvious lesson.
- preferably an interesting implementation or experiment.
- little marketing language.
- accessible page without signup.

Builder Relations should label:
`hn_candidate: true/false`

Do not automate submission initially.

## 21.5 Other communities

Possible future channels:

- Discords for AI coding / OSS / local models.
- Bluesky.
- Mastodon.
- relevant Slack communities.
- specialized forums.
- newsletters.
- project-specific communities.

Add only when Jason actually wants to participate there.

---

# 22. Relationship Memory

This system is about people, not just publishing.

Track substantive public interactions with builders.

Do not create creepy dossiers.

Store only useful professional/community context such as:

```json
{
  "relationship_id": "...",
  "name": "Example Builder",
  "public_handle": "...",
  "platforms": ["github"],
  "projects": ["..."],
  "interests": ["local-ai", "agent-orchestration"],
  "interactions": [
    {
      "date": "...",
      "type": "github_issue",
      "summary": "Reported reproducible reconnect bug and suggested test case."
    }
  ],
  "relationship_stage": "repeat_participant",
  "follow_up": "Thank them in next release note."
}
```

Suggested stages:

```text
discovered
→ interacted
→ substantive_interaction
→ repeat_participant
→ user
→ collaborator
→ contributor
→ trusted_peer
```

Do not gamify humans or treat these stages as sales leads. They are organizational memory.

---

# 23. Community Participation Workflow

Builder Relations should proactively identify opportunities for Jason to help others.

Examples:

- Interesting OSS repo related to agent orchestration.
- Someone asking a question Jason has firsthand experience with.
- An issue where TangleClaw's architecture provides a useful comparison.
- A builder publishing something relevant to local inference.
- A new tool worth trying.

Suggested workflow:

1. System finds high-fit item.
2. Summarize why it matters.
3. Suggest one useful action:
   - try repo,
   - answer question,
   - open issue,
   - comment,
   - thank contributor,
   - invite feedback.
4. Jason chooses.
5. Store meaningful interaction.

Important: Builder Relations should not generate drive-by promotional comments.

---

# 24. Success Metrics

## 24.1 North-star outcomes

Track quarterly:

- Number of known external users.
- Repeat external users.
- External issues opened.
- External PRs.
- Outside contributors.
- Meaningful GitHub Discussion participants.
- Repeat community participants.
- Builder relationships formed.
- People who independently mention/recommend a project.
- Inbound collaboration requests.

## 24.2 Content outcomes

Track:

- Articles published.
- Build notes published.
- Article completion rate.
- Meaningful comments.
- GitHub referrals.
- GitHub visits following publication.
- install/use signals if measurable.
- Issues attributable to article traffic.
- contributors attributable to article/community activity.
- newsletter/RSS subscribers if implemented later.

## 24.3 Vanity metrics

Track but down-weight:

- pageviews.
- impressions.
- likes.
- stars.
- followers.

Stars are useful directional evidence but should not be the objective.

---

# 25. Initial 90-Day Objective

Target:

> Develop a small, active network of 10–20 AI builders who know Jason's work, with at least 10 external users actively trying one or more projects, at least 5 recurring community participants, substantive outside GitHub issues/discussions, and the first or increased outside code/documentation contributions.

Suggested 90-day metrics:

- 6–8 strong articles/build notes.
- `/articles` archive live.
- 10+ known external users.
- 5+ repeat community participants.
- 5+ substantive external issues/discussions.
- 1–3 external contributions.
- 10–20 meaningful builder relationships.
- 2+ articles that demonstrably drive useful GitHub activity.
- GitHub Discussions enabled and seeded where appropriate.
- Idea Radar functioning reliably.
- Weekly observation digest functioning.
- Editorial Memory populated.
- Jason interview workflow tested and refined.

---

# 26. Scheduled Jobs

Suggested initial cadence.

## GitHub observation
Every 6–12 hours.

Purpose:
- collect events.
- no user notification unless high-value event appears.

## Signal classification
After ingestion.

## Idea Radar
Daily.

Do not message Jason daily by default.

## Editorial digest
Weekly.

Example:

```markdown
# Builder Relations Weekly Radar

## Strong candidates
1. ...
2. ...

## Worth remembering
...

## Interesting people/interactions
...

## Projects that changed substantially
...

## Possible follow-ups
...
```

## Article planning
Biweekly.

Goal:
Select approximately one strong piece every two weeks.

This is not a hard publication quota.

## Analytics import
Daily or weekly depending on source.

## Monthly retrospective
Monthly.

Questions:
- What produced meaningful interaction?
- What content attracted actual users?
- What topics were ignored?
- What surprised us?
- Who became a repeat participant?
- What should we do less?
- What should we try next?

---

# 27. Notification Policy

Avoid alert fatigue.

Only interrupt Jason proactively when:

- Candidate score is very high.
- A known builder asks a substantive question.
- External PR arrives.
- Important issue comes from a real user.
- An article unexpectedly generates meaningful attention.
- A high-value collaboration opportunity emerges.
- A public claim needs correction.
- A security-sensitive issue arises.

Everything else belongs in digest/reporting.

---

# 28. Automation Guardrails

Builder Relations may autonomously:

- Read public repo activity.
- Normalize events.
- classify signals.
- maintain memory.
- score article candidates.
- create draft questions.
- create editorial briefs.
- prepare drafts.
- prepare platform adaptations.
- collect analytics.
- produce reports.
- suggest outreach.

Builder Relations may **not** autonomously, unless policy is explicitly changed:

- Publish an article.
- Post to LinkedIn.
- Post to Reddit.
- Submit to Hacker News.
- Comment on GitHub under Jason's identity.
- Open public issues solely for promotion.
- DM people.
- Email people.
- merge code.
- modify production website.
- represent Jason's personal opinion without approval.

Human approval is required for public speech.

---

# 29. Security and Credentials

Use least privilege.

Potential credentials:

- GitHub read token.
- GitHub write token only if/when explicitly needed.
- website analytics credentials.
- deployment/web repository access through existing site session.
- future social platform APIs.

Rules:

- Never store tokens in repo.
- Use environment variables / secret manager.
- Separate read-only observation credentials from write credentials.
- Log which agent/action used a credentialed operation.
- Public observation should preferably use read-only access.
- Do not ingest private repositories unless explicitly added to the project registry.
- Do not expose private issue/commit content in public article drafts.

Recommended environment naming:

```text
GITHUB_TOKEN_READ
GITHUB_TOKEN_WRITE
ANALYTICS_*
BUILDER_RELATIONS_ENV
```

---

# 30. Logging and Observability

Log:

- ingestion runs.
- API failures.
- event counts.
- deduplication.
- classifier outputs.
- candidate scores.
- prompt/model used.
- article state transitions.
- public actions.
- approval identity/timestamp.
- analytics imports.
- errors.

Avoid logging secrets or unnecessary personal data.

Suggested structured event:

```json
{
  "timestamp": "...",
  "component": "idea-radar",
  "action": "candidate_created",
  "candidate_id": "...",
  "source_events": ["..."],
  "score": 8.4,
  "model": "...",
  "status": "success"
}
```

---

# 31. Failure Handling

## GitHub API unavailable
- Retry with exponential backoff.
- Do not create duplicate events.
- Record cursor/checkpoint.
- Resume from last successful checkpoint.

## LLM/classifier failure
- Keep normalized source event.
- Mark classification pending.
- retry later.
- Never discard raw observation.

## Duplicate candidate
- Merge source evidence.
- Increment candidate relevance.
- do not create new Jason notification.

## Bad recommendation
Jason rejection should:
- archive candidate.
- store reason if given.
- update preference signal.
- not be treated as system failure.

## Website publishing failure
- publishing package remains approved.
- website session reports error.
- Builder Relations must not silently mark it published.

## Distribution failure
- canonical article remains valid.
- record platform failure separately.
- do not duplicate posts on retry without checking state.

---

# 32. Data Retention

Keep long-term:

- articles.
- interviews.
- preferences.
- relationships.
- outcomes.
- published claims.
- candidate history.

Raw low-value GitHub event data may be compacted after a defined interval if canonical URLs and cluster summaries remain.

Do not discard information necessary to explain why an article was created or what source evidence supported it.

---

# 33. Suggested Prompt: Signal Classifier

```markdown
You are the Signal Classifier for Builder Relations.

Your job is not to promote Jason's projects.

Your job is to inspect a real engineering/project event and decide whether it contains a lesson, surprise, tradeoff, failure, decision, workflow discovery, or human story that another serious builder might find useful.

Consider:
- Is this routine maintenance?
- Did something unexpected happen?
- Was there a difficult tradeoff?
- Does Jason have firsthand knowledge that would make this different from generic documentation?
- Has this subject already been covered?
- Could this start a useful builder-to-builder conversation?
- Would writing about it feel like promotion?

Return:
1. concise event summary
2. labels
3. why another builder might care
4. whether Jason should be asked about it
5. 1–3 highly specific questions
6. candidate scores
7. promotion-risk score

Do not invent a story when the evidence is weak.
```

---

# 34. Suggested Prompt: Idea Radar

```markdown
You are the Idea Radar for Builder Relations.

Your job is to discover high-quality writing and conversation opportunities from Jason Vaughan's actual work.

Prefer:
- architecture tradeoffs
- surprising failures
- difficult debugging
- practical local-AI experience
- multi-agent behavior
- reliability lessons
- real production use
- things Jason changed his mind about
- lessons another builder can apply

Avoid:
- routine release announcements
- generic AI commentary
- shallow promotional content
- rehashing topics Jason has already covered
- manufactured controversy

Use Editorial Memory.

If an idea is strong, formulate a working angle and ask the minimum number of questions necessary to determine whether a real story exists.

Do not draft the article yet.
```

---

# 35. Suggested Prompt: Interviewer

```markdown
You are interviewing Jason to extract firsthand experience for a technical article.

Do not ask generic questions.

Use the exact issue/release/project context provided.

Your goal is to discover:
- what Jason expected
- what actually happened
- what surprised him
- what decision he made
- why he made it
- what alternatives existed
- what another builder can learn
- what remains unresolved

Ask no more than 3–5 questions at a time.

Jason may answer conversationally and incompletely. Follow the most interesting thread.

Do not turn the interview into marketing.
```

---

# 36. Suggested Prompt: Draft Writer

```markdown
Write from Jason's firsthand experience and approved editorial brief.

The article should feel like an experienced builder explaining what actually happened.

Requirements:
- concrete before abstract
- include technical details where useful
- explain tradeoffs
- acknowledge uncertainty
- distinguish firsthand observations from general claims
- avoid generic AI hype
- avoid corporate launch language
- avoid pretending every project decision was brilliant
- preserve failures and ambiguity
- prioritize useful lessons over promotion

The project can be mentioned naturally, but the article must still be useful to someone who never uses Jason's software.
```

---

# 37. Suggested Prompt: Reddit Adapter

```markdown
Adapt the approved source article into a community-native Reddit discussion.

Do NOT produce an advertisement.

Lead with:
- the problem,
- a surprising observation,
- an experiment,
- or a technical question.

Include enough substantive detail that the post is useful even if nobody clicks the link.

Mention Jason's project only when directly relevant.

Invite others to compare approaches.

Do not use engagement bait.
Do not cross-post identical copy.
```

---

# 38. Suggested Prompt: LinkedIn Adapter

```markdown
Adapt the approved article for LinkedIn.

Audience:
- AI builders
- technical production peers
- engineering leaders
- collaborators
- recruiters who care about actual work

Tone:
- direct
- experienced
- curious
- technically credible

Do not use:
- "I'm thrilled to announce"
- motivational filler
- excessive hashtags
- generic AI-future language

Give the reader one useful idea even if they do not click through.
```

---

# 39. Suggested Prompt: Monthly Learning Review

```markdown
Review the past month of Builder Relations activity.

Do not optimize for impressions.

Evaluate:
- Which articles produced actual users?
- Which produced substantive GitHub activity?
- Which generated repeat conversations?
- Which people became repeat participants?
- Which ideas Jason enjoyed discussing?
- Which suggestions Jason rejected?
- What topics are becoming repetitive?
- What project activity is producing the best stories?
- What distribution channels produce high-signal interaction?
- What should we stop doing?
- What experiment should we try next month?

Update explicit preference and outcome memory.
```

---

# 40. GitHub Community Setup

For major public projects, evaluate:

- GitHub Discussions.
- CONTRIBUTING.md.
- CODE_OF_CONDUCT.md as appropriate.
- issue templates.
- bug template.
- feature-request template.
- good-first-issue labels.
- help-wanted labels.
- clear README quickstart.
- screenshots/GIFs.
- architecture overview.
- roadmap.
- release notes written for humans.
- social-preview image.
- repository topics.
- link back to relevant Writing articles.

Potential shared organization-level Discussions should be considered if Jason's repositories are grouped into an organization.

Recommended discussion categories:

```text
Announcements
Help
Ideas
Architecture
Show What You're Building
AI Builder Workflows
Local AI
TangleClaw
Medusa
```

The exact category count should remain manageable.

---

# 41. Adoption Feedback Loop

Builder Relations should watch where users struggle.

Signals:

- repeated install questions.
- repeated setup failures.
- README ambiguity.
- confusing terminology.
- issue clusters.
- first-run problems.
- requests for examples.
- missing screenshots.
- confusing CLI behavior.

When repeated friction occurs, Builder Relations should create a recommendation for the product project:

```markdown
Adoption Finding:
Three independent users asked how profiles map to engines.

Recommendation:
Add one diagram and a 60-second quickstart example to README.

Evidence:
#...
#...
Discussion ...
```

Builder Relations does not implement the fix unless explicitly assigned.

---

# 42. Analytics Architecture

Preferred metrics sources may include:

- website analytics.
- GitHub traffic.
- GitHub referrers.
- stars.
- forks.
- clones if available.
- Discussions.
- issue authors.
- PR authors.
- referral parameters.
- social platform analytics.

Where possible, use UTM-style campaign parameters for distributed links.

Example:

```text
?utm_source=linkedin
&utm_medium=social
&utm_campaign=article-persistent-agents
```

Do not let analytics parameters contaminate canonical URLs.

Try to attribute:

```text
article
→ repository visit
→ issue/discussion
→ repeat participation
```

Perfect attribution is not required. Directional evidence is enough.

---

# 43. Self-Learning Model

"Self-learning" should mean:

1. The system accumulates explicit structured history.
2. It compares new signals against previous outcomes.
3. It incorporates Jason's direct feedback.
4. It adjusts candidate rankings.
5. It becomes better at recognizing Jason-specific story types.
6. It identifies which channels generate useful outcomes.
7. It avoids repeating failed strategies.

It should **not** mean:

- uncontrolled model fine-tuning.
- opaque autonomous behavior.
- publishing without approval.
- optimizing purely for engagement.

## Learning priority

Use this precedence:

```text
Jason explicit feedback
> observed real-world user/contributor outcomes
> substantive community interaction
> traffic/engagement metrics
> model inference
```

This keeps the system aligned.

---

# 44. Example Learning

Event:
TangleClaw release.

System asks:
"Anything interesting happen?"

Jason:
"No, routine cleanup."

Result:
`routine_release` receives negative editorial weight.

Later event:
A bug required designing a v5 fix around a v6 service boundary.

Jason:
"Yes, that's actually a really interesting architecture question."

Result:
Increase weight for:
- future/current architecture boundary.
- engineering tradeoffs.
- release-boundary decisions.

After several months the system should preferentially identify these patterns.

---

# 45. Implementation Phases

## Phase 0 — Charter and project bootstrap

Deliverables:

- Builder Relations repo/project.
- CHARTER.md.
- AGENTS.md.
- project registry.
- initial article backlog.
- explicit guardrails.
- editorial state machine.

Acceptance:

- An agent opening the project can explain its purpose and boundaries.
- Website and product responsibilities are clearly separated.

---

## Phase 1 — GitHub observation + manual editorial workflow

Build:

- GitHub ingest.
- normalized events.
- event storage.
- clustering.
- weekly digest.
- manual candidate creation.

Do not over-automate yet.

Acceptance:

- System can summarize meaningful activity across selected repos.
- No duplicate release/issue/PR stories.
- Jason can inspect source provenance.

---

## Phase 2 — Idea Radar + Editorial Memory

Build:

- classifier.
- scoring.
- candidate queue.
- editorial memory.
- preference storage.
- interview records.
- rejection learning.

Acceptance:

- System correctly ignores routine activity most of the time.
- System can propose useful story angles from real project work.
- System knows what has already been published.

---

## Phase 3 — Jason interview + editorial brief

Build:

- proactive high-value questions.
- interview workflow.
- editorial brief generation.
- candidate state transitions.

Acceptance:

- A GitHub issue can move from event → interview → approved brief.
- Article premise is based on Jason's actual answer.

---

## Phase 4 — `jasonvaughan.com` article system

Owned by website session.

Implement:

- `/articles`.
- individual article template.
- Writing homepage integration.
- metadata.
- sitemap.
- canonical.
- OG.
- JSON-LD.
- RSS if desired.
- related writing.

Acceptance:

- New approved article can be added predictably.
- Google can crawl unique article URLs.
- homepage Writing section stays cohesive with portfolio.

---

## Phase 5 — Draft + publishing package

Build:

- article draft workflow.
- fact-check workflow.
- approval state.
- website publishing package.

Acceptance:

- Website session receives deterministic content + metadata.
- No public publishing without approval.

---

## Phase 6 — Distribution adapters

Build:

- LinkedIn.
- Reddit.
- GitHub Discussion.
- HN candidate evaluator.

Acceptance:

- Same article produces meaningfully different platform-native drafts.
- Reddit output does not read like advertising.
- LinkedIn output does not read like corporate launch copy.

---

## Phase 7 — Analytics + learning

Build:

- article outcomes.
- GitHub referral correlation.
- interaction memory.
- monthly review.
- scoring adjustments.

Acceptance:

- System can say:
  "This article produced fewer views but more GitHub activity than the previous three."
- Candidate ranking uses outcomes without overriding Jason's explicit preferences.

---

# 46. Initial Backlog

## P0

- [ ] Create dedicated Builder Relations TC project.
- [ ] Create CHARTER.md from this document.
- [ ] Define project boundaries.
- [ ] Create project registry.
- [ ] Register TangleClaw.
- [ ] Register Medusa.
- [ ] Register Notse.
- [ ] Register Monad/local AI work.
- [ ] Define normalized GitHub event schema.
- [ ] Implement GitHub read-only ingestion.
- [ ] Implement checkpoint/cursor.
- [ ] Implement event deduplication.
- [ ] Implement change clustering.
- [ ] Generate weekly activity digest.
- [ ] Seed initial article ideas from this plan.
- [ ] Create editorial candidate schema.
- [ ] Create Editorial Memory store.
- [ ] Create candidate state machine.
- [ ] Create explicit public-action approval policy.

## P1

- [ ] Implement signal classifier.
- [ ] Implement Idea Radar scoring.
- [ ] Implement candidate deduplication.
- [ ] Add "ask Jason" threshold.
- [ ] Build interview workflow.
- [ ] Store interview answers.
- [ ] Build editorial brief generator.
- [ ] Build article memory.
- [ ] Build rejected-idea memory.
- [ ] Add preference-learning model.
- [ ] Enable GitHub Discussions on appropriate repos.
- [ ] Audit READMEs for community onboarding.
- [ ] Define organization-level community strategy.

## P2

- [ ] Build website publishing package format.
- [ ] Create `/articles` requirements ticket for website project.
- [ ] Create article metadata schema.
- [ ] Add sitemap requirement.
- [ ] Add canonical requirement.
- [ ] Add JSON-LD.
- [ ] Add social image strategy.
- [ ] Add RSS.
- [ ] Add related-article support.
- [ ] Create LinkedIn adapter.
- [ ] Create Reddit adapter.
- [ ] Create GitHub Discussion adapter.
- [ ] Create HN evaluator.

## P3

- [ ] Website analytics ingestion.
- [ ] GitHub traffic ingestion.
- [ ] UTM conventions.
- [ ] Outcome correlation.
- [ ] Relationship Memory.
- [ ] Monthly learning review.
- [ ] Adoption-friction detector.
- [ ] contributor recognition workflow.
- [ ] community opportunity radar.

---

# 47. First Working Sprint

The first sprint should be deliberately narrow.

Goal:

> Builder Relations can observe TangleClaw GitHub activity and produce a weekly high-signal "food for thought" report without publishing anything.

Implement:

1. Project registry with TangleClaw.
2. GitHub event ingestion.
3. Release/issue/PR normalization.
4. Event clustering.
5. simple rule + LLM classifier.
6. candidate scoring.
7. weekly report.
8. local editorial memory.
9. Jason feedback recording.

Example output:

```markdown
# Builder Relations Radar — Week of ...

## Ask Jason

### 1. Issue #12345 — Unprofiled-engine broadcasts accumulate
Why this may be interesting:
The immediate leak fix appears to intersect with v6 workspace-scoped messaging.

Questions:
- Did the future v6 architecture materially change the v5 fix?
- Was there a point where the clean fix and the safe fix were different?

Score: 8.4

---

## Maybe Later

### TangleClaw 5.17.0 release
Mostly routine release activity. No distinct story detected beyond the issue above.

---

## Ignore

- dependency bumps
- typo fixes
- routine test maintenance
```

If this report consistently feels useful, expand from there.

---

# 48. Definition of Done for the System

Builder Relations is successful when it can:

1. Observe Jason's active projects.
2. Notice changes without requiring Jason to manually summarize them.
3. Distinguish routine maintenance from genuinely interesting stories.
4. Say:
   > "I saw TangleClaw 5.17.0. Issue #12345 looks unusual. What happened there?"
5. Remember Jason's answer.
6. Avoid asking about the same topic repeatedly.
7. Propose a useful article angle grounded in real evidence.
8. Interview Jason rather than fabricate his experience.
9. Produce a strong editorial brief.
10. Help draft a technically credible article.
11. Hand a clean publishing package to the `jasonvaughan.com` session.
12. Prepare platform-native distribution drafts.
13. Track resulting users, discussions, contributors, and relationships.
14. Learn that meaningful interactions matter more than impressions.
15. Improve its suggestions over time without taking away Jason's control of his public voice.

---

# 49. First 90-Day Editorial Sequence

A reasonable starting sequence:

### Article 1
**Why I Built TangleClaw Instead of Just Using a Terminal**

Purpose:
Introduce the problem space and Jason's builder perspective.

### Article 2
**What 96GB of VRAM Actually Gets You for Local AI**

Purpose:
Highly searchable practical local-AI piece.

### Article 3
**Building a Teleprompter Because PowerPoint Presenter Notes Are Terrible**

Purpose:
Connect Jason's long production career with software building.

### Article 4
**Claude + Codex + Local Models: What I Learned Making Them Work Together**

Purpose:
Show practical multi-model workflow experience.

### Article 5
**When More AI Agents Make the Work Worse**

Purpose:
Useful, non-promotional skepticism based on Medusa/TangleClaw experience.

### Article 6
**The v6 Dividing Line: When Should Architecture Debt Wait?**

Purpose:
Deep engineering decision-making article.

Do not force this exact order if live project events create stronger opportunities.

---

# 50. Final Operating Principle

Builder Relations should continually ask:

> "What happened in Jason's actual work that another serious builder would genuinely benefit from hearing about?"

Then:

> "What does Jason think about it?"

Only after those questions are answered should the system ask:

> "How should we publish and distribute this?"

That ordering is the core safeguard against generic marketing content.

The long-term outcome should not merely be a better blog.

The goal is a durable public body of technical work plus a growing network of builders who know Jason, use his projects, teach him things, challenge his assumptions, contribute ideas/code, and return because the interaction is useful.

That is the community Builder Relations is designed to cultivate.
