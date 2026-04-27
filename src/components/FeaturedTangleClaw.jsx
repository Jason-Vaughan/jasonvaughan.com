import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScreenshotModal from "./ScreenshotModal";
import tangleclawLogo from "../assets/projects/tangleclaw.png";
import { autoLanguageTags } from "../utils/languageTags";

const GH_ASSETS = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main";
const tcScreenshots = `${GH_ASSETS}/tangleclaw-screenshots`;
const STATS_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tangleclaw-stats.json";

const screenshots = [
  { src: `${tcScreenshots}/project%20splash%20screen%20with%20sampele%20cards.png`, alt: "Dashboard — Projects Directory" },
  { src: `${tcScreenshots}/project%20info%20panel%20expanded.png`, alt: "Project Info Panel" },
  { src: `${tcScreenshots}/porthub-registry%20list%20example.png`, alt: "PortHub Registry & Port Leases" },
  { src: `${tcScreenshots}/ai%20model%20select%20modal.png`, alt: "Engine & Methodology Selection" },
  { src: `${tcScreenshots}/global%20rules%20modal.png`, alt: "Global Rules Configuration" },
  { src: `${tcScreenshots}/openclaw%20modal.png`, alt: "OpenClaw Integration" },
  { src: `${tcScreenshots}/shared%20directories%20and%20files%20between%20groups%20modal.png`, alt: "Shared Documents & Groups" },
  { src: `${tcScreenshots}/port%20conflict%20example%20warning.png`, alt: "Port Conflict Warning" },
];

/**
 * Format a number with K+ suffix for thousands.
 */
function formatCount(n) {
  if (n >= 1000) return `${Math.floor(n / 1000)}K+`;
  return n.toLocaleString();
}

/**
 * Format an ISO date (YYYY-MM-DD) as "Mon YYYY" (e.g., "Mar 2026").
 */
function formatSince(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d)) return null;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Featured hero card for TangleClaw — purple-accented, same layout as TiLT hero.
 * Stats are fetched live from the TangleClaw repo's stats.json.
 */
export default function FeaturedTangleClaw() {
  const [modal, setModal] = useState(null);
  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    fetch(STATS_URL)
      .then((r) => r.json())
      .then(setLiveStats)
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Lines of Code", value: liveStats ? formatCount(liveStats.loc) : "39K+" },
    { label: "Tests Passing", value: liveStats ? liveStats.tests.toLocaleString() : "1,520" },
    { label: "Commits", value: liveStats ? formatCount(liveStats.commits) : "150+" },
    { label: "AI Engines", value: liveStats ? String(liveStats.engines) : "4" },
    { label: "npm Dependencies", value: liveStats ? String(liveStats.npmDeps) : "0" },
  ];

  const since = liveStats ? formatSince(liveStats.firstCommit) : null;

  const techStack = [
    "Node.js", "tmux", "ttyd", "REST API", "Zero Dependencies",
  ];

  const accent = "#8b5cf6";
  const accentLight = "#a78bfa";

  const card = {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid #3f3f46",
    background: "#18181b",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
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

  const statBox = {
    textAlign: "center",
    padding: "14px 8px",
    borderRadius: 10,
    background: "rgba(139,92,246,0.08)",
    border: "1px solid rgba(139,92,246,0.15)",
  };

  const btnPrimary = {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    background: `linear-gradient(135deg, ${accent}, ${accentLight})`,
    color: "#fff",
  };

  const btnOutline = (color) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    border: `1px solid ${color}`,
    color: color === "rgba(139,92,246,0.3)" ? accent : "#71717a",
    background: "none",
    cursor: "pointer",
  });

  return (
    <section id="tangleclaw" style={{ padding: "48px 0 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={card}
        >
          {/* Purple accent bar */}
          <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, ${accentLight}, transparent)` }} />

          <div style={{ padding: 32 }}>
            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <img src={tangleclawLogo} alt="TangleClaw logo" style={{ height: 48, width: 48, objectFit: "contain" }} />
              <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fafafa", margin: 0 }}>TangleClaw</h3>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: accent, color: "#fff",
              }}>
                Developer Tool
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: "rgba(52, 211, 153, 0.12)",
                border: "1px solid rgba(52, 211, 153, 0.35)",
                color: "#34d399",
              }}>
                Open Source · MIT
              </span>
              {since && (
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  padding: "4px 10px", borderRadius: 9999,
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  color: accent,
                }}>
                  Building since {since}
                </span>
              )}
            </div>

            <p style={{ marginTop: 4, fontSize: 13, color: "#71717a" }}>AI Coding Session Orchestrator</p>

            <p style={{ marginTop: 12, fontSize: 18, fontWeight: 600, color: accent }}>
              Multi-Engine AI Development — Orchestrated.
            </p>

            <p style={{ marginTop: 14, color: "#d4d4d8", lineHeight: 1.6, fontSize: 14, maxWidth: 640 }}>
              A zero-dependency Node.js server that manages persistent tmux sessions for
              AI coding engines — Claude Code, Aider, Codex, and Cursor. Provides a
              browser-based dashboard with mobile access via ttyd, methodology enforcement,
              shared document management, port conflict detection, and session memory across
              every project on your machine.
            </p>

            {/* Stats grid */}
            <div style={{
              marginTop: 24, display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12,
            }}>
              {stats.map((s) => (
                <div key={s.label} style={statBox}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: accent }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tech stack — curated + auto-detected languages from stats */}
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[...techStack, ...autoLanguageTags(liveStats?.languages, techStack)].map((t) => (
                <span key={t} style={tagStyle}>{t}</span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="https://github.com/Jason-Vaughan/TangleClaw" target="_blank" rel="noreferrer" style={btnPrimary}>
                View on GitHub
              </a>
              <button
                onClick={() => setModal({ images: screenshots })}
                style={btnOutline("rgba(139,92,246,0.3)")}
              >
                Screenshots
              </button>
            </div>
          </div>
        </motion.div>
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
