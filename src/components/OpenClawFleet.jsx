import React from "react";
import { motion } from "framer-motion";
import ShareLink from "./ShareLink";
import tiltclawBanner from "../assets/projects/tiltclaw_banner.png";
import voltaBanner from "../assets/projects/volta_banner.png";
import rentalclawLogo from "../assets/projects/rentalclaw_logo.png";

/**
 * OpenClaw Fleet — internal AI agents built on the OpenClaw multi-agent
 * framework. Card-per-agent. Each agent decides whether its operational
 * details are public (TiLTClaw — running TiLT support triage) or redacted
 * (Volta, RentalClaw — operational systems whose function isn't ready to
 * disclose). When an agent is ready to come off the redacted treatment,
 * flip `redacted: false` on its entry and add the public fields.
 *
 * Designed to scale — new fleet members just add an entry below.
 */
const FLEET = [
  {
    id: "tiltclaw",
    name: "TiLTClaw",
    role: "AI Support Triage Agent",
    accent: "#a78bfa",          // purple — matches Discord / TiLTClaw branding
    accentSoft: "rgba(139,92,246,0.12)",
    accentBorder: "rgba(139,92,246,0.35)",
    badgeText: "PUBLIC · In Production",
    redacted: false,
    banner: tiltclawBanner,
    bannerAlt: "TiLTClaw banner — orange fist with multi-colored claws over a purple galaxy",
    // Same treatment as Volta: contain + matching edge color + taller strip
    // so the full logo (claws + wordmark + claw circle) is visible without
    // the previous cover-crop chopping off the top/bottom.
    bannerFit: "contain",
    bannerBg: "#0a061b",      // sampled dark navy from the image's outer edges
    bannerHeight: 240,
    blurb:
      "Production AI agent built into TiLT's support workflow. Monitors every inbound ticket 24/7, summarizes activity, and escalates urgent payroll issues to admins in minutes. Accessed via a private Discord app by the TiLT operations team.",
    bullets: [
      "24/7 monitoring of every TiLT support ticket",
      "Auto-summarizes and routes by issue type",
      "Escalates urgent payroll issues to admins in minutes",
      "Private Discord app · internal to TiLT ops",
    ],
    tags: ["Discord App", "Production", "OpenClaw"],
    paired: { label: "Powers", target: "TiLT", href: "#tilt" },
  },
  {
    id: "volta",
    name: "Volta",
    role: "High-Voltage AI Orchestration",
    accent: "#3b82f6",          // electric blue — matches the Volta brand sheet
    accentSoft: "rgba(59,130,246,0.10)",
    accentBorder: "rgba(59,130,246,0.4)",
    badgeText: "REDACTED · Stealth",
    redacted: true,
    banner: voltaBanner,
    bannerAlt: "Volta — High Voltage AI Orchestration — silver wordmark on dark electric-blue lightning",
    // Volta's painted logo background is pure black with transparent padding
    // around it. Setting bannerBg to #000 makes the transparent areas blend
    // into the painted bg seamlessly (no rectangle artifact against the card
    // surface). `contain` keeps the full logo visible — no edge crop.
    bannerFit: "contain",
    bannerBg: "#000000",
    bannerHeight: 240,
    blurb:
      "Experimental orchestration platform running on Monad-1. Hosts a stack of agents collaborating on stealth-mode experimental projects. Self-publishes operational telemetry; the work itself stays under wraps until the first project surfaces.",
    bullets: [
      "OpenClaw agent · self-publishing telemetry",
      "Hosted on Monad-1 (shares the GPU rig)",
      "Active project portfolio · ████████████",
      "Target user · █████████████",
    ],
    tags: ["OpenClaw", "Experimental", "Monad-1"],
  },
  {
    id: "rentalclaw",
    name: "RentalClaw",
    role: "Autonomous Vacation-Rental Management",
    accent: "#2563eb",          // bright blue — pulls from the "Rental" wordmark
    accentSoft: "rgba(37,99,235,0.10)",
    accentBorder: "rgba(37,99,235,0.4)",
    badgeText: "REDACTED · Private Beta",
    redacted: true,
    banner: null,               // no banner; use square logo treatment
    logo: rentalclawLogo,
    logoAlt: "RentalClaw — red crab claws framing a yellow beach house with a palm tree",
    blurb:
      "Fully autonomous rental-management agent for vacation properties. Scalable, expandable, multi-agent architecture. Currently in private beta with select operators.",
    bullets: [
      "Multi-agent · autonomous end-to-end rental ops",
      "Target vertical · ███████████████ properties",
      "Integrations · ██████ · ██████ · ██████",
      "Operational status · private beta · select operators",
    ],
    tags: ["OpenClaw", "Multi-Agent", "Vacation Rentals", "Private Beta"],
  },
  {
    id: "kobold",
    name: "Kobold",
    role: "Tailnet-Orchestrated Linux Node",
    accent: "#10b981",          // emerald green — matches Tailscale / active node green
    accentSoft: "rgba(16,185,129,0.12)",
    accentBorder: "rgba(16,185,129,0.35)",
    badgeText: "PUBLIC · Active Node",
    redacted: false,
    banner: null,
    blurb:
      "Remote Ubuntu 26.04 LTS sister node to Volta, provisioned on a Lenovo ThinkCentre M70q mini-PC. Orchestrated remotely over Tailscale via SSH. Hosts a production-ready OpenClaw gateway inside Docker, utilizing model providers with GitHub Copilot via Claude Haiku.",
    bullets: [
      "Lenovo ThinkCentre M70q · Intel i5-10600T · 14 GiB RAM",
      "Ubuntu 26.04 LTS · Remote Tailscale Node (100.90.14.14)",
      "Runs OpenClaw Gateway in Docker via PortHub (port 18789)",
      "Model Provider: GitHub Copilot (Claude Haiku 4.5)",
    ],
    tags: ["Tailscale", "Docker", "Ubuntu", "Lenovo"],
  },
];

/* ───────────────────────── Shared visual primitives ────────────────────────── */

const sectionStyle = { background: "transparent", color: "#fafafa", padding: "48px 0" };
const wrap = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
const h2Style = { fontSize: 32, fontWeight: 800, letterSpacing: -0.5 };
const subhead = { fontSize: 14, color: "#71717a" };

const cardBase = {
  borderRadius: 16,
  border: "1px solid #27272a",
  background: "#18181b",
  boxShadow: "0 8px 24px rgba(0,0,0,.35)",
  overflow: "hidden",
};

const tagStyle = {
  fontSize: 11,
  fontWeight: 600,
  padding: "3px 10px",
  borderRadius: 9999,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#a1a1aa",
};

/**
 * Renders a "█████████" run inside a bullet line — preserved as-is in the
 * source so the data block reads as a redacted document. No JS replacement
 * happens; the strings live in the FLEET config above.
 */
function FleetCard({ entry, idx }) {
  const isRedacted = entry.redacted;

  return (
    <motion.div
      id={entry.id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      style={{
        ...cardBase,
        marginTop: idx === 0 ? 24 : 20,
        scrollMarginTop: 24,
        position: "relative",
        borderColor: isRedacted ? "#3f3f46" : "#27272a",
      }}
    >
      {/* REDACTED stamp top-right (only on redacted entries) */}
      {isRedacted && (
        <div style={{
          position: "absolute",
          top: 16,
          right: 20,
          padding: "3px 10px",
          border: `2px solid ${entry.accent}`,
          color: entry.accent,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 3,
          transform: "rotate(8deg)",
          opacity: 0.9,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          zIndex: 2,
          pointerEvents: "none",
        }}>
          REDACTED
        </div>
      )}

      {/* Banner strip (TiLTClaw + Volta have one; RentalClaw uses a square logo inline).
          Per-entry `bannerFit` / `bannerBg` / `bannerHeight` overrides handle images
          with their own painted backgrounds (Volta: contain + black bg so the logo's
          painted pure-black background blends with the transparent padding around it). */}
      {entry.banner && (
        <img
          src={entry.banner}
          alt={entry.bannerAlt}
          style={{
            width: "100%",
            height: entry.bannerHeight || 130,
            objectFit: entry.bannerFit || "cover",
            objectPosition: "center",
            display: "block",
            background: entry.bannerBg || "transparent",
          }}
        />
      )}

      <div style={{ padding: 24 }}>
        {/* Header row: optional inline logo + eyebrow + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {entry.logo && (
            <img
              src={entry.logo}
              alt={entry.logoAlt}
              style={{ width: 56, height: 56, borderRadius: 12, objectFit: "contain", background: "transparent", flexShrink: 0 }}
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: entry.accent, textTransform: "uppercase", letterSpacing: 2 }}>
              OpenClaw Agent
            </div>
            <h3 style={{ margin: "4px 0 0", fontSize: 24, fontWeight: 800, color: "#fafafa", letterSpacing: -0.3 }}>
              {entry.name}
            </h3>
            <div style={{ marginTop: 4, fontSize: 13, color: "#a1a1aa" }}>{entry.role}</div>
          </div>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 9999,
            background: entry.accentSoft,
            border: `1px solid ${entry.accentBorder}`,
            color: entry.accent,
            textTransform: "uppercase",
            letterSpacing: 1,
            whiteSpace: "nowrap",
          }}>
            {entry.badgeText}
          </span>
        </div>

        <p style={{ marginTop: 14, marginBottom: 0, fontSize: 14, color: "#d4d4d8", lineHeight: 1.6 }}>
          {entry.blurb}
        </p>

        {/* Operational bullets — partially redacted on stealth agents */}
        <ul style={{
          marginTop: 14,
          marginBottom: 0,
          paddingLeft: 20,
          color: "#a1a1aa",
          fontSize: 13,
          lineHeight: 1.7,
        }}>
          {entry.bullets.map((b, i) => (
            <li key={i} style={{
              fontFamily: b.includes("█") ? "ui-monospace, SFMono-Regular, Menlo, monospace" : "inherit",
            }}>
              {b}
            </li>
          ))}
        </ul>

        {/* Tag row */}
        {entry.tags && entry.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {entry.tags.map((t) => (
              <span key={t} style={tagStyle}>{t}</span>
            ))}
          </div>
        )}

        {/* Footer row: optional "powers X" link + share button */}
        <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          {entry.paired ? (
            <a
              href={entry.paired.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(entry.paired.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{ fontSize: 12, color: entry.accent, textDecoration: "none", fontWeight: 600 }}
            >
              {entry.paired.label} {entry.paired.target} →
            </a>
          ) : (
            <span style={{ fontSize: 12, color: "#52525b" }}>Internal · contact under NDA for details</span>
          )}
          <ShareLink id={entry.id} />
        </div>
      </div>
    </motion.div>
  );
}

export default function OpenClawFleet() {
  return (
    <section id="openclaw-fleet" style={sectionStyle}>
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h2 style={h2Style}>OpenClaw Fleet</h2>
          <span style={subhead}>Internal AI agents in production and development</span>
        </div>

        {FLEET.map((entry, idx) => (
          <FleetCard key={entry.id} entry={entry} idx={idx} />
        ))}
      </div>
    </section>
  );
}
