import React, { useState } from "react";
import ScreenshotModal from "./ScreenshotModal";
import cierresenseiLogo from "../assets/projects/cierresensei.png";
import tangleclawLogo from "../assets/projects/tangleclaw.png";
import notseLogo from "../assets/projects/notse.png";
import refuctorLogo from "../assets/projects/refuctor.png";

const GH_ASSETS = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main";
const tcScreenshots = `${GH_ASSETS}/tangleclaw-screenshots`;

const projects = [
  {
    title: "Cierre Sensei",
    image: cierresenseiLogo,
    blurb:
      "Mexican real estate closing cost calculator. Started as a custom GPT, rebuilt into a full web app. Helps buyers, sellers, and agents estimate fees for property transactions in Mexico.",
    link: "https://cierresensei.com",
    linkLabel: "Visit site",
    github: "https://github.com/Jason-Vaughan/cierre-sensei",
    tags: ["Real Estate", "Fintech", "Next.js"],
    accent: "#10b981",
    screenshots: null,
  },
  {
    title: "TangleClaw",
    image: tangleclawLogo,
    blurb:
      "AI coding session orchestrator — manages persistent tmux sessions, multi-engine support (Claude Code, Aider, Codex), and mobile access via browser. Zero npm dependencies, pure Node.js.",
    link: "https://github.com/Jason-Vaughan/TangleClaw",
    linkLabel: "View on GitHub",
    tags: ["Node.js", "tmux", "AI Tools", "DevOps"],
    accent: "#8b5cf6",
    screenshots: [
      { src: `${tcScreenshots}/project%20splash%20screen%20with%20sampele%20cards.png`, alt: "Dashboard — Projects Directory" },
      { src: `${tcScreenshots}/project%20info%20panel%20expanded.png`, alt: "Project Info Panel" },
      { src: `${tcScreenshots}/porthub-registry%20list%20example.png`, alt: "PortHub Registry & Port Leases" },
      { src: `${tcScreenshots}/ai%20model%20select%20modal.png`, alt: "Engine & Methodology Selection" },
      { src: `${tcScreenshots}/global%20rules%20modal.png`, alt: "Global Rules Configuration" },
      { src: `${tcScreenshots}/openclaw%20modal.png`, alt: "OpenClaw Integration" },
      { src: `${tcScreenshots}/shared%20directories%20and%20files%20between%20groups%20modal.png`, alt: "Shared Documents & Groups" },
      { src: `${tcScreenshots}/port%20conflict%20example%20warning.png`, alt: "Port Conflict Warning" },
    ],
  },
  {
    title: "Notse",
    image: notseLogo,
    blurb:
      "Live teleprompter system built for broadcast production. Electron desktop app with real-time WebSocket sync, designed for on-set workflows across macOS and Windows.",
    tags: ["Electron", "TypeScript", "Broadcast", "WebSockets"],
    accent: "#f59e0b",
    screenshots: null,
  },
  {
    title: "Refuctor",
    image: refuctorLogo,
    blurb:
      "Snark-fueled technical debt detection CLI. Scans codebases for markdown lint, spelling, code quality, and security issues — then roasts you about it. Shipped to NPM, now archived.",
    link: "https://github.com/Jason-Vaughan/refuctor",
    linkLabel: "View on GitHub",
    tags: ["CLI", "Node.js", "DevTools"],
    accent: "#ef4444",
    screenshots: null,
  },
];

/**
 * Dark-themed project cards with logo viewports and optional screenshot galleries.
 */
export default function Projects() {
  const [modal, setModal] = useState(null);

  const section = { background: "transparent", color: "#fafafa", padding: "48px 0" };
  const wrap = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
  const grid = {
    marginTop: 24,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
  };
  const h2Style = { fontSize: 32, fontWeight: 800, letterSpacing: -0.5 };

  const card = {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid #3f3f46",
    background: "#18181b",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
    display: "flex",
    flexDirection: "column",
  };

  const imgViewport = {
    height: 180, padding: 12,
    background: "rgba(24,24,27,.6)",
    borderBottom: "1px solid rgba(63,63,70,.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
  };

  const imgStyle = {
    maxWidth: "100%", maxHeight: "100%",
    objectFit: "contain",
    borderRadius: 10,
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

  const screenshotPill = {
    fontSize: 13,
    fontWeight: 600,
    color: "#38bdf8",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <section id="projects" style={section}>
      <div style={wrap}>
        <h2 style={h2Style}>Projects</h2>
        <div style={grid}>
          {projects.map((p) => (
            <div key={p.title} style={card}>
              {/* Accent bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

              {/* Logo viewport */}
              <div style={imgViewport}>
                <img src={p.image} alt={p.title} style={imgStyle} loading="lazy" />
              </div>

              <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fafafa", margin: 0 }}>
                  {p.title}
                </h3>

                <p style={{ marginTop: 10, color: "#d4d4d8", lineHeight: 1.5, fontSize: 14, flex: 1 }}>
                  {p.blurb}
                </p>

                {/* Tags */}
                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={tagStyle}>{t}</span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ marginTop: 16, display: "flex", gap: 16, alignItems: "center" }}>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#38bdf8", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
                    >
                      {p.linkLabel || "View details"} →
                    </a>
                  )}
                  {p.github && p.github !== p.link && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#71717a", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
                    >
                      GitHub →
                    </a>
                  )}
                  {p.screenshots && (
                    <button
                      style={screenshotPill}
                      onClick={() => setModal({ images: p.screenshots })}
                    >
                      Screenshots →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <ScreenshotModal
          images={modal.images}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}
