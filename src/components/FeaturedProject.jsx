import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { autoLanguageTags } from "../utils/languageTags";
import ShareLink from "./ShareLink";
import useGitHubLatestRelease from "../hooks/useGitHubLatestRelease";
import { featuredProjects } from "../data/projects";

const p = featuredProjects.tilt;

/**
 * Format a number with K+ suffix for thousands.
 */
function formatCount(n) {
  if (n >= 1000) return `${Math.floor(n / 1000)}K+`;
  return n.toLocaleString();
}

/**
 * Format an ISO date (YYYY-MM-DD) as "Mon YYYY" (e.g., "Oct 2025").
 */
function formatSince(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d)) return null;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Big panel card for TiLT — same dark card style as BarCoach/Projects.
 * Stats are fetched live from project-assets/tilt-stats.json.
 */
export default function FeaturedProject() {
  const [liveStats, setLiveStats] = useState(null);
  const liveVersion = useGitHubLatestRelease(p.repo.owner, p.repo.repo);

  useEffect(() => {
    fetch(p.statsUrl)
      .then((r) => r.json())
      .then(setLiveStats)
      .catch(() => {});
  }, []);

  const stats = p.statConfig.map((cfg) => {
    let value = cfg.fallback;
    if (liveStats) {
      if (cfg.valueOverride) {
        value = cfg.valueOverride;
      } else if (liveStats[cfg.key] !== undefined) {
        value = cfg.key === "tests" ? liveStats[cfg.key].toLocaleString() : formatCount(liveStats[cfg.key]);
      }
    }
    return { label: cfg.label, value };
  });

  // Conditionally append PRs Merged tile when collector reports a non-zero count
  if (liveStats?.prs?.merged > 0) {
    stats.push({ label: "PRs Merged", value: String(liveStats.prs.merged) });
  }

  const since = liveStats ? formatSince(liveStats.firstCommit) : null;

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
    background: "rgba(212,175,55,0.08)",
    border: "1px solid rgba(212,175,55,0.15)",
  };

  const btnPrimary = {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    background: "linear-gradient(135deg, #D4AF37, #F59E0B)",
    color: "#0f1419",
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
    color: color === "rgba(212,175,55,0.3)" ? "#D4AF37" : "#71717a",
  });

  return (
    <section id="tilt" style={{ padding: "48px 0 0", scrollMarginTop: 24 }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={card}
        >
          {/* Gold accent bar */}
          <div style={{ height: 4, background: "linear-gradient(90deg, #D4AF37, #F59E0B, transparent)" }} />

          <div style={{ padding: 32 }}>
            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <img src={p.logo} alt={`${p.title} logo`} style={{ height: 48, width: 48, objectFit: "contain" }} />
              <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fafafa", margin: 0 }}>{p.title}</h3>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: p.accent, color: "#0f1419",
              }}>
                {p.type}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.35)",
                color: p.accent,
              }}>
                {p.pricing}
              </span>
              {liveVersion && (
                <span style={{
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: 1, padding: "4px 12px", borderRadius: 9999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#e4e4e7",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                }}>
                  {liveVersion}
                </span>
              )}
              {since && (
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  padding: "4px 10px", borderRadius: 9999,
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: p.accent,
                }}>
                  Building since {since}
                </span>
              )}
            </div>

            <p style={{ marginTop: 4, fontSize: 13, color: "#71717a" }}>Time I Logged Today</p>

            <p style={{ marginTop: 12, fontSize: 18, fontWeight: 600, color: p.accent }}>
              {p.subtitle}
            </p>

            <p style={{ marginTop: 14, color: "#d4d4d8", lineHeight: 1.6, fontSize: 14, maxWidth: 640 }}>
              {p.blurb}
            </p>

            {/* TiLTClaw one-liner pointer */}
            {p.tiltclawLogo && (
              <div
                style={{
                  marginTop: 18,
                  paddingLeft: 14,
                  borderLeft: `2px solid rgba(212,175,55,0.4)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <img
                  src={p.tiltclawLogo}
                  alt=""
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    objectFit: "cover",
                    flexShrink: 0,
                    background: "#fff",
                  }}
                />
                <div style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.5 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: p.accent, textTransform: "uppercase", letterSpacing: 2, marginRight: 8 }}>
                    Built-in support
                  </span>
                  Support runs on{" "}
                  <a
                    href="#tiltclaw"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#tiltclaw")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    style={{ color: p.accent, fontWeight: 700, textDecoration: "none" }}
                  >
                    TiLTClaw
                  </a>
                  {" — see OpenClaw Fleet ↓"}
                </div>
              </div>
            )}

            {/* Stats grid */}
            <div style={{
              marginTop: 24, display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12,
            }}>
              {stats.map((s) => (
                <div key={s.label} style={statBox}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: p.accent }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tech stack — curated + auto-detected languages from stats */}
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[...p.techStack, ...autoLanguageTags(liveStats?.languages, p.techStack)].map((t) => (
                <span key={t} style={tagStyle}>{t}</span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href={`/projects/${p.slug}`} style={btnPrimary}>
                Read Case Study
              </a>
              {p.links.tour && (
                <a href={p.links.tour} target="_blank" rel="noreferrer" style={btnOutline("rgba(212,175,55,0.3)")}>
                  Sign Up for the Tour
                </a>
              )}
              {p.links.live && (
                <a href={p.links.live} target="_blank" rel="noreferrer" style={btnOutline("rgba(212,175,55,0.3)")}>
                  View Live Site
                </a>
              )}
              {p.links.github && (
                <a href={p.links.github} target="_blank" rel="noreferrer" style={{...btnOutline("rgba(255,255,255,0.1)"), gap: 8}}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
              <ShareLink id="tilt" style={{ marginLeft: "auto", alignSelf: "center" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
