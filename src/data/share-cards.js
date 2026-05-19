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
    id: "tangleclaw",
    title: "TangleClaw — Multi-Project AI Operations Layer",
    description:
      "Operations layer that coordinates AI coding agents across many projects on one machine. Open source.",
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
