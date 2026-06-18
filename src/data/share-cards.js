// Share-card registry. Each entry produces:
//   - public/share/<id>/index.html  (OG-tagged redirect stub for crawlers)
//   - public/share-images/<id>.png  (1200x630 preview screenshot)
//
// To add a card: append an entry and ensure the matching `id` exists on the
// card's root element in the corresponding component. Removing an entry
// deletes the artifacts on the next CI run.
//
// `title` and `description` are what iMessage / Slack / Discord / Twitter
// render in the link unfurl. Keep title under ~70 chars and description
// under ~200 chars for best display across all platforms.
export const SHARE_CARDS = [
  {
    id: "monad-1",
    title: "Monad-1 — Local-First AI Inference",
    description:
      "Self-hosted GPU inference rig: RTX PRO 6000 Blackwell (96 GiB VRAM) + Threadripper 9970X. Live availability, GPU stats, and planned-outage history on jasonvaughan.com.",
  },
  {
    id: "recall-ledger",
    title: "The Recall Ledger — White Paper (Working Draft v2)",
    description:
      "An open, neutral coordination network for U.S. food safety recalls. Positioned as the FSMA 204 implementation layer ahead of the July 2028 deadline.",
  },
  {
    id: "tilt",
    title: "TiLT — Union Pay Tracking SaaS",
    description:
      "IATSE pay tracking for the live events industry. Live product, subscription-based, built by Jason Vaughan.",
  },
  {
    id: "tiltclaw",
    title: "TiLTClaw — OpenClaw AI Support Agent (In Production)",
    description:
      "Live OpenClaw automation agent running TiLT's support triage. Monitors tickets 24/7, escalates urgent payroll issues, accessed via Discord. Real-world deployment of the OpenClaw multi-agent framework.",
  },
  {
    id: "volta",
    title: "Volta — High-Voltage AI Orchestration (Stealth)",
    description:
      "Experimental OpenClaw orchestration platform running on Monad-1. Hosts a stack of agents collaborating on stealth-mode experimental projects. Self-publishes operational telemetry; the work itself stays redacted until first reveal.",
  },
  {
    id: "rentalclaw",
    title: "RentalClaw — Autonomous Vacation-Rental Management (Private Beta)",
    description:
      "Fully autonomous rental-management agent for vacation properties. Scalable, expandable, multi-agent architecture. Currently in private beta with select operators, redacted until launch.",
  },
  {
    id: "openclaw-fleet",
    title: "OpenClaw Fleet — Internal AI Agents in Production",
    description:
      "Card-per-agent view of every OpenClaw AI agent in production or active development. TiLTClaw (live), Volta (stealth), RentalClaw (in development), and more on the way.",
  },
  {
    id: "tangleclaw",
    title: "TangleClaw — Multi-Project AI Operations Layer",
    description:
      "Operations layer that coordinates AI coding agents across many projects on one machine. Open source.",
  },
  {
    id: "tanglebrain",
    title: "TangleBrain — Local-First LLM Router",
    description:
      "Config-driven router across the OpenAI-compatible AI backends you own. Local-first, opt-in overflow. Open source (MIT).",
  },
  {
    id: "cierre-sensei",
    title: "Cierre Sensei — Spanish Conversation Practice",
    description:
      "AI-driven Spanish conversation partner. Live SaaS at cierresensei.com.",
  },
  {
    id: "confidential-research",
    title: "Confidential AI Research — Vetted Introductions Only",
    description:
      "Direct consultation on AI research, infrastructure design, or applied LLM work — under NDA.",
  },
];
