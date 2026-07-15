import React, { useState } from "react";
import { motion } from "framer-motion";
import ShareLink from "./ShareLink";
import tiltclawBanner from "../assets/projects/tiltclaw_banner.png";
import voltaBanner from "../assets/projects/volta_banner.png";
import rentalclawLogo from "../assets/projects/rentalclaw_logo.png";
import koboldAvatar from "../assets/projects/kobold_avatar.png";
import koboldBanner from "../assets/projects/kobold_banner.png";

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
    watermarkBackground: true,   // dim the logo and use it as a full-card background watermark
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
    role: "AI Assistant Video Engineer",
    accent: "#8bc34a",          // toxic green — matches the official Kobold branding kit hex
    accentSoft: "rgba(139,195,74,0.12)",
    accentBorder: "rgba(139,195,74,0.35)",
    badgeText: "REDACTED · Stealth",
    redacted: true,
    banner: null,               // no banner to keep card layout clean and avoid visual text duplication
    logo: koboldAvatar,
    logoAlt: "Kobold — circular reptilian eye avatar from the branding kit",
    watermarkBackground: true,   // dim the logo avatar and use it as a full-card background watermark
    thumbnail: koboldBanner,
    blurb:
      "Kobold is the pocket-sized, voice-operated AI Assistant Video Engineer that plugs into local show networks to scan, monitor, and configure video hardware. Powered by the OpenClaw Gateway and connected via Tailscale to Monad-1, Kobold delivers hands-free, offline, on-site intelligence with real bite.",
    bullets: [
      "Portable mini-PC edge form factor",
      "Voice-operated assistant supporting hands-free on-site control",
      "Plugs into local show networks to control ████████ & API endpoints",
      "Runs OpenClaw Gateway in Docker via ████████ network",
      "LLM Backend: Powered by Monad-1 GPU rig (████████████)",
    ],
    tags: ["Video Engineering", "Local LLM", "Voice Control", "Show Networks", "Edge Node"],
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
function FleetCard({ entry, idx, onSelectImage }) {
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

      {/* Watermark background logo */}
      {entry.watermarkBackground && entry.logo && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "120%",
            maxWidth: 1000,
            height: "120%",
            maxHeight: 1000,
            opacity: 0.1, // dialed-in watermark settings
            pointerEvents: "none",
            zIndex: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={entry.logo}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
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

      <div style={{ padding: 24, position: "relative", zIndex: 1 }}>
        {/* Header row: optional inline logo + eyebrow + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {entry.logo && !entry.watermarkBackground && (
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

        {entry.thumbnail ? (
          <div style={{ display: "flex", gap: 24, marginTop: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 350px", minWidth: 280 }}>
              {/* Operational bullets — partially redacted on stealth agents */}
              <ul style={{
                margin: 0,
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
            </div>

            {/* Thumbnail Column */}
            <div style={{ flex: "1 1 360px", display: "flex", justifyContent: "flex-end", minWidth: 280 }}>
              <button
                type="button"
                onClick={() => onSelectImage(entry.thumbnail)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "zoom-in",
                  textAlign: "left",
                  display: "block",
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                  border: `1px solid ${entry.accentBorder || "#27272a"}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  width: "100%",
                  maxWidth: 380,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.borderColor = entry.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = entry.accentBorder || "#27272a"; }}
              >
                <img
                  src={entry.thumbnail}
                  alt={`${entry.name} promo advertisement`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* Footer row: optional "powers X" link + share button */}
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
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
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="openclaw-fleet" style={sectionStyle}>
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h2 style={h2Style}>OpenClaw Fleet</h2>
          <span style={subhead}>Internal AI agents in production and development</span>
        </div>

        {FLEET.map((entry, idx) => (
          <FleetCard key={entry.id} entry={entry} idx={idx} onSelectImage={setSelectedImage} />
        ))}
      </div>

      {/* Advertisement Zoom Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(9, 9, 11, 0.9)",
            backdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            cursor: "zoom-out",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: 900,
              width: "100%",
              background: "#18181b",
              borderRadius: 16,
              border: "1px solid #27272a",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.7)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              cursor: "default",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(0,0,0,0.5)",
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                color: "#a1a1aa",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                zIndex: 10,
                transition: "color 0.15s, background-color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#a1a1aa"; e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)"; }}
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt="Promo advertisement full view"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "70vh",
                objectFit: "contain",
                display: "block",
                background: "#09090b",
              }}
            />

            {/* Bottom Panel */}
            <div style={{
              padding: "20px 24px",
              borderTop: "1px solid #27272a",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              background: "#121214",
            }}>
              <div>
                <h4 style={{ margin: 0, color: "#fff", fontSize: 15, fontWeight: 700 }}>
                  Kobold Guild Membership Invitation
                </h4>
                <p style={{ margin: "4px 0 0", color: "#a1a1aa", fontSize: 13, lineHeight: 1.4 }}>
                  Join the OpenClaw fleet network and access decentralized local show engineering tools.
                </p>
              </div>

              <a
                href="#contact"
                onClick={() => {
                  setSelectedImage(null);
                  window.location.hash = "#contact";
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #8BC34A 0%, #689F38 100%)", // toxic green brand gradients
                  color: "#000",
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(139, 195, 74, 0.3)",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(139, 195, 74, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 195, 74, 0.3)";
                }}
              >
                Apply for Guild Membership
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
