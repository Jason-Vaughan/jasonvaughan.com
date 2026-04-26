import React, { useEffect, useState } from "react";
import ScreenshotModal from "./ScreenshotModal";
import cierresenseiLogo from "../assets/projects/cierresensei.png";
import notseLogo from "../assets/projects/notse.png";
import porthubLogo from "../assets/projects/porthub.png";
import refuctorLogo from "../assets/projects/refuctor.png";
import scrapegoatLogo from "../assets/projects/scrapegoat.png";
import clawbridgeLogo from "../assets/projects/clawbridge.png";

const MANIFEST_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/_collect-meta.json";

const projects = [
  {
    slug: "cierre-sensei",
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
    slug: "scrapegoat",
    title: "ScrapeGoat",
    image: scrapegoatLogo,
    blurb:
      "PDF calendar extractor PWA — drop a PDF schedule, AI wizard builds a parsing template, export as ICS, CSV, JSON, or Markdown. Runs entirely in-browser, privacy-first. Your files never leave your device.",
    link: "https://github.com/Jason-Vaughan/ScrapeGoat",
    linkLabel: "View on GitHub",
    tags: ["PWA", "Gemini AI", "PDF.js", "TypeScript"],
    accent: "#3b82f6",
    screenshots: null,
  },
  {
    slug: "notse",
    title: "Notse",
    image: notseLogo,
    blurb:
      "Live teleprompter system built for broadcast production. Electron desktop app with real-time WebSocket sync, designed for on-set workflows across macOS and Windows. Closed-source — available under commercial license.",
    tags: ["Electron", "TypeScript", "Broadcast", "WebSockets"],
    accent: "#f59e0b",
    commercial: true,
    link: "#contact",
    linkLabel: "Contact for licensing",
    screenshots: null,
  },
  {
    slug: "porthub",
    title: "PortHub",
    image: porthubLogo,
    blurb:
      "DHCP for developers — a port registry that prevents 'address already in use' errors across all your projects. Automatic lease management, real-time dashboard, conflict detection, and AI assistant integration.",
    link: "https://github.com/Jason-Vaughan/PortHub",
    linkLabel: "View on GitHub",
    tags: ["Node.js", "CLI", "DevTools", "Networking"],
    accent: "#06b6d4",
    screenshots: null,
  },
  {
    slug: "refuctor",
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
  {
    slug: "clawbridge",
    title: "ClawBridge",
    image: clawbridgeLogo,
    blurb:
      "Host-side HTTP bridge that exposes Claude Code as a supervised build tool for automation systems. JSON API for spawning, managing, and streaming AI coding sessions — with structured permission review and test result detection.",
    link: "https://github.com/Jason-Vaughan/ClawBridge",
    linkLabel: "View on GitHub",
    tags: ["Node.js", "Claude Code", "API", "DevOps"],
    accent: "#a855f7",
    screenshots: null,
  },
];

function formatCount(n) {
  if (n >= 1000) return `${Math.floor(n / 1000)}K`;
  return n.toLocaleString();
}

/**
 * Dark-themed project cards with logo viewports and optional screenshot galleries.
 */
export default function Projects() {
  const [modal, setModal] = useState(null);
  const [statsBySlug, setStatsBySlug] = useState({});

  useEffect(() => {
    fetch(MANIFEST_URL, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((manifest) => {
        if (!manifest?.projects) return;
        const map = {};
        for (const [slug, entry] of Object.entries(manifest.projects)) {
          if (entry.ok && entry.stats) map[slug] = entry.stats;
        }
        setStatsBySlug(map);
      })
      .catch(() => {});
  }, []);

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

  const statsRow = {
    marginTop: 12,
    fontSize: 12,
    color: "#71717a",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  };

  const commercialBadge = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 6,
    background: "rgba(245, 158, 11, 0.12)",
    border: "1px solid rgba(245, 158, 11, 0.35)",
    color: "#fbbf24",
    letterSpacing: 0.5,
    textTransform: "uppercase",
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
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fafafa", margin: 0 }}>
                    {p.title}
                  </h3>
                  {p.commercial && (
                    <span style={commercialBadge}>Commercial · License</span>
                  )}
                </div>

                <p style={{ marginTop: 10, color: "#d4d4d8", lineHeight: 1.5, fontSize: 14, flex: 1 }}>
                  {p.blurb}
                </p>

                {/* Tags */}
                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={tagStyle}>{t}</span>
                  ))}
                </div>

                {/* Live stats from collector */}
                {statsBySlug[p.slug] && (
                  <div style={statsRow}>
                    {statsBySlug[p.slug].loc > 0 && (
                      <span><strong style={{ color: "#d4d4d8" }}>{formatCount(statsBySlug[p.slug].loc)}</strong> LOC</span>
                    )}
                    {statsBySlug[p.slug].tests > 0 && (
                      <>
                        <span style={{ color: "#3f3f46" }}>·</span>
                        <span><strong style={{ color: "#d4d4d8" }}>{formatCount(statsBySlug[p.slug].tests)}</strong> tests</span>
                      </>
                    )}
                    {statsBySlug[p.slug].commits > 0 && (
                      <>
                        <span style={{ color: "#3f3f46" }}>·</span>
                        <span><strong style={{ color: "#d4d4d8" }}>{statsBySlug[p.slug].commits}</strong> commits</span>
                      </>
                    )}
                  </div>
                )}

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
