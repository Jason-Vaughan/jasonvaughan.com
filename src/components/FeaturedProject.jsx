import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tiltLogo from "../assets/tilt_logo.png";
import tiltclawLogo from "../assets/projects/tiltclaw_logo.png";
import tiltclawBanner from "../assets/projects/tiltclaw_banner.png";
import { autoLanguageTags } from "../utils/languageTags";
import ShareLink from "./ShareLink";

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
  const [tiltclawExpanded, setTiltclawExpanded] = useState(false);

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

  // Conditionally append PRs Merged tile when collector reports a non-zero count
  if (liveStats?.prs?.merged > 0) {
    stats.push({ label: "PRs Merged", value: String(liveStats.prs.merged) });
  }

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
              <img src={tiltLogo} alt="TiLT logo" style={{ height: 48, width: 48, objectFit: "contain" }} />
              <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fafafa", margin: 0 }}>TiLT</h3>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: "#D4AF37", color: "#0f1419",
              }}>
                Live Product
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.5, padding: "4px 12px", borderRadius: 9999,
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.35)",
                color: "#D4AF37",
              }}>
                SaaS · Subscription
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

            {/* TiLTClaw mention — compact teaser by default, click to expand
                into a full brag panel (banner, what-it-does bullets, why-it-
                matters framing). Gold left-accent matches TiLT's branding;
                the expand affordance is a small rotating chevron so the
                whole thing still reads as a TiLT operational detail at rest. */}
            <div
              id="tiltclaw"
              style={{
                marginTop: 18,
                paddingLeft: 14,
                borderLeft: "2px solid rgba(212,175,55,0.4)",
                scrollMarginTop: 24,
              }}
            >
              <button
                type="button"
                onClick={() => setTiltclawExpanded((v) => !v)}
                aria-expanded={tiltclawExpanded}
                aria-controls="tiltclaw-details"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  color: "inherit",
                }}
              >
                <img
                  src={tiltclawLogo}
                  alt=""
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    objectFit: "cover",
                    flexShrink: 0,
                    background: "#fff",
                  }}
                />
                <div style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.5, flex: 1 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "#D4AF37", textTransform: "uppercase", letterSpacing: 2, marginRight: 8 }}>
                    Built-in support
                  </span>
                  <strong style={{ color: "#fafafa", fontWeight: 700 }}>TiLTClaw</strong>
                  {" — OpenClaw AI agent triaging every support ticket via Discord. In production."}
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#71717a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    transform: tiltclawExpanded ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {tiltclawExpanded && (
                  <motion.div
                    key="tiltclaw-details"
                    id="tiltclaw-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ paddingTop: 14, paddingBottom: 4 }}>
                      <img
                        src={tiltclawBanner}
                        alt="TiLTClaw banner — orange fist with multi-colored claws over a purple galaxy"
                        style={{
                          width: "100%",
                          maxWidth: 480,
                          height: 100,
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: 8,
                          display: "block",
                          marginBottom: 14,
                        }}
                      />

                      <div style={{ fontSize: 11, fontWeight: 700, color: "#D4AF37", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
                        What it does
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 20, color: "#a1a1aa", fontSize: 13, lineHeight: 1.7 }}>
                        <li>Monitors every inbound TiLT support ticket 24/7</li>
                        <li>Summarizes activity and routes to the right place</li>
                        <li>Escalates urgent payroll issues to admins in minutes</li>
                        <li>Accessed via a private Discord app by the TiLT ops team</li>
                      </ul>

                      <div style={{ fontSize: 11, fontWeight: 700, color: "#D4AF37", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 16, marginBottom: 8 }}>
                        Why it matters
                      </div>
                      <p style={{ margin: 0, fontSize: 13, color: "#a1a1aa", lineHeight: 1.6, maxWidth: 580 }}>
                        Production deployment of the OpenClaw multi-agent framework — not a
                        demo or a side experiment. Real-world proof that AI agents can carry
                        operational load that used to need a full-time human on the ticket queue.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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

            {/* Tech stack — curated + auto-detected languages from stats */}
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[...techStack, ...autoLanguageTags(liveStats?.languages, techStack)].map((t) => (
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
              <ShareLink id="tilt" style={{ marginLeft: "auto", alignSelf: "center" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
