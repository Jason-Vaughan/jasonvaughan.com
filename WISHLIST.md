# Wishlist

Long-running brainstorm of cool things the portfolio could become. **Not a commitment to ship any of them** — this is the "what if" file. When something graduates from "what if" to "yes, let's", move it to `TODO.md` and break it down.

Effort tags: 🟢 quick (<1 hr) · 🟡 medium (1-4 hr) · 🔴 big (multi-session)

---

## Plays to your unique strengths

### AI features (you're an AI builder — show it off)
- 🟢 **"Ask my portfolio" Claude chat** — RAG over project blurbs / resume / case studies. Visitors ask "what's TiLT do?" or "have you done broadcast work?" and get conversational answers grounded in your content. Cheap with prompt caching.
- 🟡 **AI-generated daily build log** — Claude reads your recent commits across all repos, writes a 3-sentence "what Jason worked on yesterday" blurb. Refreshes daily via the same workflow.
- 🟢 **"Explain this project"** — hover any project card, get a Claude-generated layman explanation tuned to the visitor's stated background (developer / recruiter / founder / etc).

### Live data extensions (your stats pipeline is overkill — exploit it)
- 🟢 **GitHub-style contribution heatmap across ALL your repos**, not just one. The collector already has commit dates per repo.
- 🟢 **"Latest activity" ticker** at the top — most recent commit subject + timestamp across the portfolio. Auto-refreshes every 5h with the workflow.
- 🟡 **Project velocity sparklines** — tiny chart next to each LOC count showing growth over time.
- 🟡 **Time-of-day heatmap** — when do you ship? Could be a fun "I code at 2 AM" reveal.
- 🔴 **"Building in public" feed** — auto-generated commit-by-commit story (with optional manual override notes per commit).

### Live-events / IATSE background (nobody else has this combo)
- 🟢 **Touring credits wall** — logo grid of companies/bands you've worked with. Builds credibility fast.
- 🟡 **Concert/broadcast photo gallery** — your past gigs. Strong differentiator for a "developer" site.
- 🟢 **IATSE Local 33 badge** + years-as-tech callout. 25-year credibility marker.

---

## Quick wins (each <1 hr)

- 🟢 **Theme toggle** (dark / terminal-green / cream) — playful, low effort
- 🟢 **`/uses` page** — your hardware/software/dotfiles. Beloved by dev visitors. Standard format ([uses.tech](https://uses.tech) lists ~1000 of these).
- 🟢 **`/now` page** — what you're focused on this month. One-paragraph update, easy to maintain.
- 🟢 **Reading-time / scroll-progress bar** at the top. Polish.
- 🟢 **Easter eggs** — Konami code, terminal-style command palette (`Cmd+K` opens "what would you like to find?"), hidden games (Snake in the 404 page).
- 🟢 **404 page with personality** — broken Tilt logo + a fix joke.
- 🟢 **OG image generator** — dynamic share preview cards (project name + accent color + your face). Done with Vercel OG or simple SVG.
- 🟢 **`/colophon`** — meta: how the site is built. Devs love this.

---

## Trust & funnel (helps people actually hire you)

- 🟡 **Engagement-type chooser** in contact: "Full-time / Contract / Advisory / Pair / Speaking" → routes to different intake forms or copy.
- 🟢 **Availability indicator** — colored dot + "Available for X starting June" / "Booked through Q3". Live-edits via a small JSON file you update.
- 🟢 **Rate card** OR a transparent "starting at" — saves both sides time.
- 🟡 **Testimonials section** — a few quotes from people who'd vouch for you.
- 🟢 **Time-zone badge** — "I'm in PT, async-first, sync windows X". Sets expectations.
- 🟡 **Languages spoken** (English + Spanish, given Cierre Sensei) — opens doors.

---

## Visual polish (cool factor)

- 🟡 **3D card tilt on hover** for project cards (lightweight CSS transform).
- 🟡 **Animated logo drift** in the hero — your project logos floating in slow parallax.
- 🟢 **Skeleton loaders** for the manifest fetch (instead of pop-in once data lands).
- 🟡 **Scroll-triggered counter animations** — stat tiles count up from 0 when they enter viewport.
- 🔴 **Particle/canvas background** that reacts to mouse — flashy but watch performance.
- 🟢 **Sticky side-nav** with active-section highlighting on scroll.

---

## Big swings (bigger lifts but really cool)

- 🔴 **Interactive career timeline** — scroll through 25 years: live events → SaaS → AI tools. Each milestone has a story, photo, links.
- 🔴 **Live demos embedded** — actually run ScrapeGoat in an iframe so visitors can try it without leaving the site.
- 🔴 **Open-source dashboard** — pull GitHub stars/forks/issues across all repos and show as a single "OSS impact" page.
- 🔴 **Multi-language site** (EN/ES) — meaningful given the Cierre Sensei market.
- 🔴 **PWA / offline mode** — install to homescreen, works offline. Nerd points.

---

## Curator's picks

If we had to pick **3 to ship next**, the recommendation:

1. **"Ask my portfolio" Claude chat** — your domain, low cost, instant wow factor. Plays to your AI-builder identity.
2. **`/uses` + `/now` pages** — devs find them, easy to maintain, builds rapport. Stable evergreen content.
3. **Touring credits wall + IATSE badge** — your unique angle, almost nobody else has this. The "I came from live events" story is a differentiator no other developer-portfolio has.

Add others as their value clarifies in your head.
