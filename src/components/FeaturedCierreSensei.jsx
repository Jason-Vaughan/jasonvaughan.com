import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShareLink from "./ShareLink";
import { featuredProjects } from "../data/projects";

const p = featuredProjects.cierre_sensei;

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
 * Hero card for Cierre Sensei — AI-powered Mexican real estate closing cost
 * SaaS for realtor websites. Stats fetched live from project-assets, which
 * the centralized collector pulls from the Replit project's /api/stats.json.
 */
export default function FeaturedCierreSensei() {
  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    fetch(p.statsUrl, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
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

  // Conditionally append PRs Merged tile when collector reports a non-zero count.
  if (liveStats?.prs?.merged > 0) {
    stats.push({ label: "PRs Merged", value: String(liveStats.prs.merged) });
  }

  const since = liveStats ? formatSince(liveStats.firstCommit) : "Sep 2024";

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
    background: "rgba(16,185,129,0.08)",
    border: "1px solid rgba(16,185,129,0.18)",
  };

  const btnPrimary = {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    background: `linear-gradient(135deg, ${p.accent}, ${p.accentLight})`,
    color: "#052e1f",
  };

  const btnOutline = {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    border: "1px solid rgba(16,185,129,0.35)",
    color: p.accentLight,
  };

  return (
    <section id="cierre-sensei" style={{ padding: "48px 0 0", scrollMarginTop: 24 }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={card}
        >
          {/* Emerald accent bar */}
          <div style={{ height: 4, background: `linear-gradient(90deg, ${p.accent}, ${p.accentLight}, transparent)` }} />

          <div style={{ padding: 32 }}>
            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <img src={p.logo} alt={`${p.title} logo`} style={{ height: 48, width: 48, objectFit: "contain" }} />
              <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fafafa", margin: 0 }}>{p.title}</h3>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: p.accent, color: "#052e1f",
              }}>
                {p.type}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.35)",
                color: p.accentLight,
              }}>
                {p.pricing}
              </span>
              {since && (
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  padding: "4px 10px", borderRadius: 9999,
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  color: p.accentLight,
                }}>
                  Building since {since}
                </span>
              )}
            </div>

            <p style={{ marginTop: 4, fontSize: 13, color: "#71717a" }}>AI-powered closing cost engine</p>

            <p style={{ marginTop: 12, fontSize: 18, fontWeight: 600, color: p.accentLight }}>
              {p.subtitle}
            </p>

            <p style={{ marginTop: 14, color: "#d4d4d8", lineHeight: 1.6, fontSize: 14, maxWidth: 640 }}>
              {p.blurb}
            </p>

            {/* Stats grid */}
            <div style={{
              marginTop: 24, display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12,
            }}>
              {stats.map((s) => (
                <div key={s.label} style={statBox}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: p.accentLight }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#71717a", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.techStack.map((t) => (
                <span key={t} style={tagStyle}>{t}</span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 12 }}>
              {p.links.live && (
                <a href={p.links.live} target="_blank" rel="noreferrer" style={btnPrimary}>
                  Visit Cierre Sensei
                </a>
              )}
              <ShareLink id="cierresensei" style={{ marginLeft: "auto", alignSelf: "center" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
