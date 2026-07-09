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
      { label: "Lines of Code", key: "loc", fallback: "114K+" },
      { label: "API Endpoints", key: "endpoints", fallback: "146" },
      { label: "Tests Passing", key: "tests", fallback: "842" },
      { label: "Commits", key: "commits", fallback: "1.5K+" },
      { label: "CBA Rule Types", key: "rules", fallback: "12", valueOverride: "12" }
    ]
  },
  tangleclaw: {
    slug: "tangleclaw",
    title: "TangleClaw",
    logo: tangleclawLogo,
    type: "Developer Tool",
    pricing: "Open Source · MIT",
    subtitle: "Multi-Engine AI Development — Orchestrated.",
    blurb: "A Node.js server with zero npm dependencies that orchestrates persistent tmux sessions for AI coding engines — Claude Code, Aider, Codex, and Cursor. Now at 4.0: session continuity with wrap protocols, a Project Master control plane, orchestration profiles, and secured remote access join the browser dashboard, mobile access via ttyd, methodology enforcement, shared documents, port management, and session memory across every project on your machine.",
    statsUrl: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tangleclaw-stats.json",
    repo: { owner: "Jason-Vaughan", repo: "TangleClaw" },
    techStack: ["Node.js", "tmux", "ttyd", "REST API", "Zero npm Dependencies"],
    links: {
      github: "https://github.com/Jason-Vaughan/TangleClaw"
    },
    accent: "#8b5cf6",
    accentLight: "#a78bfa",
    statConfig: [
      { label: "Lines of Code", key: "loc", fallback: "100K+" },
      { label: "Tests Passing", key: "tests", fallback: "3,900+" },
      { label: "Commits", key: "commits", fallback: "370+" },
      { label: "AI Engines", key: "engines", fallback: "4" },
      { label: "npm Dependencies", key: "npmDeps", fallback: "0", valueOverride: "0" }
    ],
    screenshots: [
      { src: `${tcScreenshots}/project%20splash%20screen%20with%20sampele%20cards.png`, alt: "Dashboard — Projects Directory" },
      { src: `${tcScreenshots}/project%20info%20panel%20expanded.png`, alt: "Project Info Panel" },
      { src: `${tcScreenshots}/porthub-registry%20list%20example.png`, alt: "PortHub Registry & Port Leases" },
      { src: `${tcScreenshots}/ai%20model%20select%20modal.png`, alt: "Engine & Methodology Selection" },
      { src: `${tcScreenshots}/global%20rules%20modal.png`, alt: "Global Rules Configuration" },
      { src: `${tcScreenshots}/openclaw%20modal.png`, alt: "OpenClaw Integration" },
      { src: `${tcScreenshots}/shared%20directories%20and%20files%20between%20groups%20modal.png`, alt: "Shared Documents & Groups" },
      { src: `${tcScreenshots}/port%20conflict%20example%20warning.png`, alt: "Port Conflict Warning" }
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
      { label: "Lines of Code", key: "loc", fallback: "9K+" },
      { label: "Tests Passing", key: "tests", fallback: "400+" },
      { label: "Commits", key: "commits", fallback: "60" },
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
    statsUrl: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/cierre-sensei-stats.json",
    repo: { owner: "Jason-Vaughan", repo: "cierre-sensei" },
    techStack: ["Replit", "Node.js", "Express", "Conversational AI", "PostgreSQL", "Stripe"],
    links: {
      live: "https://cierresensei.com"
    },
    accent: "#10b981",
    accentLight: "#34d399",
    statConfig: [
      { label: "Lines of Code", key: "loc", fallback: "13K+" },
      { label: "Mexican States", key: "states", fallback: "32", valueOverride: "32" },
      { label: "Commits", key: "commits", fallback: "94" },
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
    link: "https://github.com/Jason-Vaughan/ScrapeGoat",
    linkLabel: "View on GitHub",
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
    link: "https://github.com/Jason-Vaughan/ClawBridge",
    linkLabel: "View on GitHub",
    tags: ["Node.js", "Claude Code", "API", "DevOps"],
    accent: "#a855f7",
    badge: { label: "Open Source · MIT", tone: "openSource" },
    screenshots: null,
  }
];
