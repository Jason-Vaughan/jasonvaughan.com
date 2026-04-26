import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tiltLogo from "../assets/tilt_logo.png";

const STATS_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tilt-stats.json";

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

  useEffect(() => {
    fetch(STATS_URL)
      .then((r) => r.json())
      .then(setLiveStats)
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Lines of Code", value: liveStats ? formatCount(liveStats.loc) : "114K+" },
    { label: "API Endpoints", value: liveStats ? String(liveStats.endpoints) : "146" },
    { label: "Tests Passing", value: liveStats ? liveStats.tests.toLocaleString() : "842" },
    { label: "Commits", value: liveStats ? formatCount(liveStats.commits) : "1.5K+" },
    { label: "CBA Rule Types", value: "12" },
  ];

  const since = liveStats ? formatSince(liveStats.firstCommit) : null;

  const techStack = [
    "Next.js 15", "React 19", "TypeScript", "PostgreSQL",
    "Prisma", "Tailwind CSS", "Vercel",
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
    <section id="tilt" style={{ padding: "48px 0 0" }}>
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
              <img src={tiltLogo} alt="TiLT logo" style={{ height: 48, width: 48, objectFit: "contain" }} />
              <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fafafa", margin: 0 }}>TiLT</h3>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: "#D4AF37", color: "#0f1419",
              }}>
                Live Product
              </span>
              {since && (
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  padding: "4px 10px", borderRadius: 9999,
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: "#D4AF37",
                }}>
                  Building since {since}
                </span>
              )}
            </div>

            <p style={{ marginTop: 4, fontSize: 13, color: "#71717a" }}>Time I Logged Today</p>

            <p style={{ marginTop: 12, fontSize: 18, fontWeight: 600, color: "#D4AF37" }}>
              Union Time & Pay Tracking — Solved.
            </p>

            <p style={{ marginTop: 14, color: "#d4d4d8", lineHeight: 1.6, fontSize: 14, maxWidth: 640 }}>
              A full-stack web application that automates union-compliant time tracking
              and pay calculations for IATSE members. Replaces manual spreadsheets with a
              configurable CBA rules engine that handles overtime, meal penalties, benefits
              eligibility, and complete audit trails — automatically.
            </p>

            {/* Stats grid */}
            <div style={{
              marginTop: 24, display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12,
            }}>
              {stats.map((s) => (
                <div key={s.label} style={statBox}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#D4AF37" }}>{s.value}</div>
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
              <a href="https://tilt-v2.vercel.app/sign-up?tour=true" target="_blank" rel="noreferrer" style={btnPrimary}>
                Sign Up for the Tour
              </a>
              <a href="https://tilt-v2.vercel.app" target="_blank" rel="noreferrer" style={btnOutline("rgba(212,175,55,0.3)")}>
                View Live Site
              </a>
              <a href="https://github.com/Jason-Vaughan/TiLT-showcase" target="_blank" rel="noreferrer" style={btnOutline("rgba(255,255,255,0.1)")}>
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
