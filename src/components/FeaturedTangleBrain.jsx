import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tanglebrainLogo from "../assets/projects/tanglebrain.png";

const STATS_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tanglebrain-stats.json";
const RELEASE_URL = "https://api.github.com/repos/Jason-Vaughan/TangleBrain/releases/latest";

const accent = "#14b8a6";
const accentLight = "#2dd4bf";

function formatCount(n) {
  if (n >= 1000) return `${Math.floor(n / 1000)}K+`;
  return n.toLocaleString();
}

function formatSince(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d)) return null;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Hero card for TangleBrain — a local-first, config-driven LLM router across
 * OpenAI-compatible backends. Stats fetched live from the centralized collector
 * (project-assets); version chip fetched live from the GitHub Releases API.
 */
export default function FeaturedTangleBrain() {
  const [liveStats, setLiveStats] = useState(null);
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch(STATS_URL, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setLiveStats)
      .catch(() => {});
    fetch(RELEASE_URL, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.tag_name && setVersion(d.tag_name))
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Lines of Code", value: liveStats ? formatCount(liveStats.loc) : "7K+" },
    { label: "Tests Passing", value: liveStats ? String(liveStats.tests) : "318" },
    { label: "Commits", value: liveStats ? String(liveStats.commits) : "33" },
    { label: "Backend Tiers", value: "3" },
  ];

  if (liveStats?.prs?.merged > 0) {
    stats.push({ label: "PRs Merged", value: String(liveStats.prs.merged) });
  }

  const since = liveStats ? formatSince(liveStats.firstCommit) : "Jun 2026";

  const techStack = [
    "Python", "Ollama", "OpenAI-compatible", "LiteLLM", "MCP", "Self-hosted", "CLI",
  ];

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
    background: "rgba(20,184,166,0.08)",
    border: "1px solid rgba(20,184,166,0.18)",
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
    color: "#042f2a",
  };

  const btnOutline = {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    border: "1px solid rgba(20,184,166,0.35)",
    color: accentLight,
  };

  return (
    <section id="tanglebrain" style={{ padding: "48px 0 0", scrollMarginTop: 24 }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={card}
        >
          {/* Teal accent bar */}
          <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, ${accentLight}, transparent)` }} />

          <div style={{ padding: 32 }}>
            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <img src={tanglebrainLogo} alt="TangleBrain logo" style={{ height: 48, width: 48, objectFit: "contain" }} />
              <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fafafa", margin: 0 }}>TangleBrain</h3>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: accent, color: "#042f2a",
              }}>
                Open Source
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: "rgba(20,184,166,0.12)",
                border: "1px solid rgba(20,184,166,0.35)",
                color: accentLight,
              }}>
                CLI · LLM Router
              </span>
              {version && (
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  padding: "4px 10px", borderRadius: 9999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#e4e4e7",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}>
                  {version}
                </span>
              )}
              {since && (
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  padding: "4px 10px", borderRadius: 9999,
                  background: "rgba(20,184,166,0.08)",
                  border: "1px solid rgba(20,184,166,0.25)",
                  color: accentLight,
                }}>
                  Building since {since}
                </span>
              )}
            </div>

            <p style={{ marginTop: 4, fontSize: 13, color: "#71717a" }}>Local-first, config-driven LLM router</p>

            <p style={{ marginTop: 12, fontSize: 18, fontWeight: 600, color: accentLight }}>
              Route across the AI backends you own.
            </p>

            <p style={{ marginTop: 14, color: "#d4d4d8", lineHeight: 1.6, fontSize: 14, maxWidth: 640 }}>
              TangleBrain routes each request to a backend you've configured — a free local model
              server by default, with authenticated CLIs and bring-your-own-key APIs as opt-in
              overflow. The whole roster of backends lives in one editable YAML file, so adding or
              removing one is a config edit, not a code change. A cheap local classifier can
              fast-path trivial requests, an orchestrator can delegate bulk sub-tasks to the local
              backend over MCP, and every routed task is logged with an estimated cloud-equivalent
              cost — rolled up by <code>tanglebrain --stats</code>.
            </p>

            {/* Stats grid */}
            <div style={{
              marginTop: 24, display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12,
            }}>
              {stats.map((s) => (
                <div key={s.label} style={statBox}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: accentLight }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {techStack.map((t) => (
                <span key={t} style={tagStyle}>{t}</span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="https://github.com/Jason-Vaughan/TangleBrain" target="_blank" rel="noreferrer" style={btnPrimary}>
                View on GitHub
              </a>
              <a href="https://github.com/Jason-Vaughan/TangleBrain/releases/latest" target="_blank" rel="noreferrer" style={btnOutline}>
                Latest Release
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
