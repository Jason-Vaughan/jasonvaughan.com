// Centralized Project Data Store
// Defines all project metadata, blurbs, tech stacks, links, and design accents.
// Sourced by Projects.jsx, FeaturedProject.jsx, FeaturedTangleClaw.jsx, etc.

import tiltLogo from "../assets/tilt_logo.png";
import tiltclawLogo from "../assets/projects/tiltclaw_logo.png";
import tangleclawLogo from "../assets/projects/tangleclaw.png";
import tanglebrainLogo from "../assets/projects/tanglebrain.png";
import cierreLogo from "../assets/projects/cierresensei.png";
import notseLogo from "../assets/projects/notse.png";
import scrapegoatLogo from "../assets/projects/scrapegoat.png";
import clawbridgeLogo from "../assets/projects/clawbridge.png";
import bakedStats from "./baked-stats.json";

const GH_ASSETS = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main";
const tcScreenshots = `${GH_ASSETS}/tangleclaw-screenshots`;

// Featured hero projects (TiLT, TangleClaw, TangleBrain, Cierre Sensei)
export const featuredProjects = {
  tilt: {
    slug: "tilt-showcase",
    title: "TiLT",
    logo: tiltLogo,
    tiltclawLogo: tiltclawLogo,
    type: "Live Product",
    pricing: "SaaS · Subscription",
    subtitle: "Union Time & Pay Tracking — Solved.",
    blurb: "A full-stack web application that automates union-compliant time tracking and pay calculations for IATSE members. Replaces manual spreadsheets with a configurable CBA rules engine that handles overtime, meal penalties, benefits eligibility, and complete audit trails — automatically.",
    longDescription: `Union payroll is a high-stakes, time-critical process that has historically relied on manual data entry and complex spreadsheet macros. A single missed meal penalty or miscalculated turnaround can trigger a costly audit.\n\nTiLT replaces this manual burden with a deterministically correct CBA rules engine. Designed specifically for IATSE members and productions, it tracks timecards, calculates daily and weekly overtime (1.5x, 2.0x, 3.0x tiers), flags meal penalties, and manages benefits eligibility — all automatically, based on the specific union contract in force.\n\n**Key Technical Decisions:**\n- **Deterministic Rules Engine:** The core of TiLT is an extensible rules engine that abstracts the complexity of union contracts. Each CBA tier is codified as a standalone rule module, ensuring that calculations are reproducible, auditable, and easily updated as contracts evolve.\n- **Full-Stack Architecture:** Built on Next.js 15 and React 19, the platform offers a snappy, SSR-optimized user experience. Prisma and PostgreSQL form the data layer, providing relational integrity for timecards, projects, and user roles.\n- **Audit Trails:** Every pay calculation is backed by an immutable audit log. When an employer questions a penalty, TiLT provides a direct traceback to the specific CBA clause that triggered it.\n\nBy automating the most error-prone aspects of union time tracking, TiLT gives members peace of mind and productions a reliable, transparent payroll process.`,
    statsUrl: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tilt-stats.json",
    repo: { owner: "Jason-Vaughan", repo: "TiLT-showcase" },
    techStack: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Vercel"],
    links: {
      tour: "https://tilt-v2.vercel.app/sign-up?tour=true",
      live: "https://tilt-v2.vercel.app",
      github: "https://github.com/Jason-Vaughan/TiLT-showcase"
    },
    accent: "#D4AF37",
    accentLight: "#fbbf24",
    statConfig: [
      { label: "Lines of Code", key: "loc", fallback: bakedStats.tilt?.loc || "114K+" },
      { label: "API Endpoints", key: "endpoints", fallback: bakedStats.tilt?.endpoints || "146" },
      { label: "Tests Passing", key: "tests", fallback: bakedStats.tilt?.tests || "842" },
      { label: "Commits", key: "commits", fallback: bakedStats.tilt?.commits || "1.5K+" },
      { label: "CBA Rule Types", key: "rules", fallback: "12", valueOverride: "12" }
    ]
  },
  tangleclaw: {
    slug: "tangleclaw",
    title: "TangleClaw",
    logo: tangleclawLogo,
    type: "Developer Tool",
    pricing: "Open Source · MIT",
    subtitle: "Open-source, local-first AI-native SDLC orchestration platform.",
    blurb: "An open-source, local-first AI-native SDLC orchestration platform. Runs as a local Node.js server with zero npm dependencies, orchestrating persistent tmux sessions for AI coding engines. Now features the Medusa Switchboard for LLM-agnostic agent cross-talk, specialized Agent Roles, automated PortHub lease management, and full GitHub integration.",
    longDescription: `AI coding engines like Claude Code, Aider, and Cursor are incredibly capable individually, but managing them across multiple projects often results in siloed context, port conflicts, and lost plans when a terminal is closed. TangleClaw was built to solve the orchestration problem for multi-engine AI development.\n\nIt operates as a fully open-source, local-first AI-native SDLC orchestration platform. It runs as a local Node.js server with zero npm dependencies, providing a centralized control plane for your entire machine's AI ecosystem.\n\n**Key Orchestration Features:**\n- **Medusa Switchboard:** Enables LLM-agnostic agent cross-talk. Agents can communicate directly with each other without stepping on each other's toes.\n- **Specialized Agent Roles:** Deploy tailored agents like Architects, Project Managers, and Builders to collaborate seamlessly on complex software architectures.\n- **PortHub Registry:** Automated DHCP-like port management eliminates "address already in use" collisions by centrally managing and leasing network ports to active projects.\n- **GitHub Integration:** Full integration for CI/PR/triage support, allowing agents to directly open PRs, monitor status checks, and respond to review feedback.\n- **Methodology Enforcement:** Injects shared architectural guidelines and session rules across all agents, guaranteeing consistency regardless of which underlying LLM is driving the session.\n\nTangleClaw transforms disparate AI tools from isolated scripts into a cohesive, coordinated fleet.`,
    statsUrl: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tangleclaw-stats.json",
    repo: { owner: "Jason-Vaughan", repo: "TangleClaw" },
    techStack: ["Node.js", "tmux", "ttyd", "REST API", "Zero npm Dependencies"],
    links: {
      website: "https://tangleclaw.com",
      github: "https://github.com/Jason-Vaughan/TangleClaw"
    },
    accent: "#8b5cf6",
    accentLight: "#a78bfa",
    statConfig: [
      { label: "Lines of Code", key: "loc", fallback: bakedStats.tangleclaw?.loc || "100K+" },
      { label: "Tests Passing", key: "tests", fallback: bakedStats.tangleclaw?.tests || "3,900+" },
      { label: "Commits", key: "commits", fallback: bakedStats.tangleclaw?.commits || "370+" },
      { label: "AI Engines", key: "engines", fallback: "4" },
      { label: "npm Dependencies", key: "npmDeps", fallback: "0", valueOverride: "0" }
    ],
    screenshots: [
      { src: `${tcScreenshots}/project-master.png`, alt: "Dashboard — Project Master" },
      { src: `${tcScreenshots}/session-view-switchboard.png`, alt: "Active Session & Engine Switchboard" },
      { src: `${tcScreenshots}/project-info-drawer.png`, alt: "Project Info Drawer" },
      { src: `${tcScreenshots}/porthub-registry.png`, alt: "PortHub Registry & Port Leases" },
      { src: `${tcScreenshots}/global-rules.png`, alt: "Global Rules Configuration" },
      { src: `${tcScreenshots}/session-rules.png`, alt: "Methodology Enforcement Rules" },
      { src: `${tcScreenshots}/openclaw-connections.png`, alt: "OpenClaw Integration" },
      { src: `${tcScreenshots}/project-groups.png`, alt: "Shared Documents & Groups" },
      { src: `${tcScreenshots}/session-history-search.png`, alt: "Session History Search" }
    ]
  },
  tanglebrain: {
    slug: "tanglebrain",
    title: "TangleBrain",
    logo: tanglebrainLogo,
    type: "Open Source",
    pricing: "CLI · LLM Router",
    subtitle: "Route across the AI backends you own.",
    blurb: "Most AI tooling sends every request to a paid cloud API by default — even when you already run capable models on hardware you own. TangleBrain keeps your whole roster of backends in one editable YAML file and favors the credentials you already hold: local models and OAuth-logged-in tools come first, while raw API keys stay a separate, explicitly-gated opt-in (it never injects a key into a CLI). An optional classifier routes by complexity — grunt work goes to your free local model — and every routed task is logged with an estimated cloud-equivalent cost, so you can see what you're spending versus avoiding. Runs standalone or drops in alongside TangleClaw and the wider Tangle family.",
    longDescription: `Most AI development tools default to sending every request to paid cloud providers like Anthropic or OpenAI. This creates unnecessary costs and privacy risks, especially when local hardware is more than capable of handling routine or sensitive tasks.\n\nTangleBrain serves as an intelligent routing layer for your AI backends. Instead of hardcoding API keys into your CLI or IDE, TangleBrain centralizes backend management in a single YAML configuration, dynamically routing requests based on task complexity.\n\n**How it Works:**\n- **Local-First Routing:** TangleBrain prioritizes self-hosted models (like Ollama running on a local GPU) for grunt work. It ensures your paid cloud tokens are reserved only for tasks that truly require frontier-level reasoning.\n- **Secure Credentials:** It leverages existing OAuth sessions for tools like Copilot, keeping raw API keys out of your environment variables whenever possible.\n- **Cost Analytics:** Every request is logged with an estimated cloud-equivalent cost. You can see exactly how much you're saving by utilizing your local hardware versus leaning on a cloud provider.\n- **Seamless Integration:** It functions as an OpenAI-compatible proxy, making it a drop-in replacement for any tool that expects a standard LLM endpoint. It pairs natively with TangleClaw to manage token consumption across a fleet of agents.\n\nBy intelligently routing requests, TangleBrain ensures you get the most out of the hardware you already own while keeping API costs strictly under control.`,
    statsUrl: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tanglebrain-stats.json",
    repo: { owner: "Jason-Vaughan", repo: "TangleBrain" },
    techStack: ["Python", "Ollama", "OpenAI-compatible", "LiteLLM", "MCP", "Self-hosted", "CLI"],
    links: {
      github: "https://github.com/Jason-Vaughan/TangleBrain",
      pypi: "https://pypi.org/project/tanglebrain/",
      releases: "https://github.com/Jason-Vaughan/TangleBrain/releases/latest"
    },
    accent: "#14b8a6",
    accentLight: "#2dd4bf",
    statConfig: [
      { label: "Lines of Code", key: "loc", fallback: bakedStats.tanglebrain?.loc || "9K+" },
      { label: "Tests Passing", key: "tests", fallback: bakedStats.tanglebrain?.tests || "400+" },
      { label: "Commits", key: "commits", fallback: bakedStats.tanglebrain?.commits || "60" },
      { label: "Backend Tiers", key: "backends", fallback: "3", valueOverride: "3" }
    ]
  },
  cierre_sensei: {
    slug: "cierre-sensei",
    title: "Cierre Sensei",
    logo: cierreLogo,
    type: "AI SaaS",
    pricing: "Commercial · Subscription",
    subtitle: "Conversational Closing Costs Engine.",
    blurb: "An AI-powered Mexican real estate closing cost engine integrated directly into realtor websites. Automates complex tax and notary fee calculations across all 32 Mexican states through a conversational interface, reducing a multi-day workflow to seconds. Completely localized, compliance-aligned, and wired to Stripe subscriptions.",
    longDescription: `Calculating closing costs in Mexican real estate is notoriously difficult. Each of the 32 states has its own distinct tax structures, notary fee schedules, and municipal regulations. Traditionally, realtors would wait days for a notary to return a manual calculation, stalling the sales process.\n\nCierre Sensei automates this entirely. It is a B2B SaaS platform that embeds directly into realtor websites, offering an AI-powered conversational interface that delivers accurate, state-specific closing cost estimates in seconds.\n\n**Technical Architecture:**\n- **Conversational Engine:** Built with Node.js and an LLM backend, the conversational interface guides users through the necessary inputs (property value, location, financing type) in natural language.\n- **State-by-State Ruleset:** A robust PostgreSQL database stores the complex, localized fee structures for all 32 Mexican states, ensuring deterministic accuracy.\n- **B2B Integration:** Realtors subscribe via Stripe to generate custom embed codes, allowing them to white-label the calculator on their own domains.\n\nBy reducing a multi-day bottleneck to a seamless, instant conversation, Cierre Sensei provides a massive competitive advantage for its subscribers.`,
    statsUrl: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/cierre-sensei-stats.json",
    repo: { owner: "Jason-Vaughan", repo: "cierre-sensei" },
    techStack: ["Replit", "Node.js", "Express", "Conversational AI", "PostgreSQL", "Stripe"],
    links: {
      live: "https://cierresensei.com"
    },
    accent: "#10b981",
    accentLight: "#34d399",
    statConfig: [
      { label: "Lines of Code", key: "loc", fallback: bakedStats.cierre_sensei?.loc || "13K+" },
      { label: "Mexican States", key: "states", fallback: "32", valueOverride: "32" },
      { label: "Commits", key: "commits", fallback: bakedStats.cierre_sensei?.commits || "94" },
      { label: "Subscription Plans", key: "plans", fallback: "2", valueOverride: "2" }
    ]
  }
};

// Projects list for the general directory grid (ScrapeGoat, Notse, ClawBridge)
export const gridProjects = [
  {
    slug: "scrapegoat",
    title: "ScrapeGoat",
    image: scrapegoatLogo,
    blurb: "PDF calendar extractor PWA — drop a PDF schedule, AI wizard builds a parsing template, export as ICS, CSV, JSON, or Markdown. Runs entirely in-browser, privacy-first. Your files never leave your device.",
    repo: { owner: "Jason-Vaughan", repo: "ScrapeGoat" },
    link: "/projects/scrapegoat",
    linkLabel: "Read Case Study",
    github: "https://github.com/Jason-Vaughan/ScrapeGoat",
    tags: ["PWA", "Gemini AI", "PDF.js", "TypeScript"],
    accent: "#3b82f6",
    badge: { label: "Open Source · MIT", tone: "openSource" },
    screenshots: null,
  },
  {
    slug: "notse",
    title: "Notse",
    image: notseLogo,
    blurb: "Networked teleprompter for broadcast and live event production. A Windows helper drives PowerPoint via Microsoft COM; the Mac app shows the prompter and writes notes back to slides on Cmd+E. Built from inside the workflow it serves. Closed-source — commercial license.",
    repo: { owner: "Jason-Vaughan", repo: "notse-releases" },
    link: "/notse",
    linkLabel: "View licensing",
    tags: ["Electron", "PowerPoint COM", "WebSockets", "Broadcast"],
    accent: "#f59e0b",
    badge: { label: "Commercial · License", tone: "commercial" },
    screenshots: null,
  },
  {
    slug: "clawbridge",
    title: "ClawBridge",
    image: clawbridgeLogo,
    blurb: "Host-side HTTP bridge that exposes Claude Code as a supervised build tool for automation systems. JSON API for spawning, managing, and streaming AI coding sessions — with structured permission review and test result detection.",
    repo: { owner: "Jason-Vaughan", repo: "ClawBridge" },
    link: "/projects/clawbridge",
    linkLabel: "Read Case Study",
    github: "https://github.com/Jason-Vaughan/ClawBridge",
    tags: ["Node.js", "Claude Code", "API", "DevOps"],
    accent: "#a855f7",
    badge: { label: "Open Source · MIT", tone: "openSource" },
    screenshots: null,
  }
];
