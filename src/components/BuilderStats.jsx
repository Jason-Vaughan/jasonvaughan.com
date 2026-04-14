import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// All stats URLs — private/protected repos push to project-assets, public repos commit to themselves
const STATS_URLS = [
  "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tilt-stats.json",
  "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tangleclaw-stats.json",
  "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/notse-stats.json",
  "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/ondeck-stats.json",
  "https://raw.githubusercontent.com/Jason-Vaughan/ClawBridge/main/stats.json",
  "https://raw.githubusercontent.com/Jason-Vaughan/Medusa/main/stats.json",
  "https://raw.githubusercontent.com/Jason-Vaughan/PortHub/main/stats.json",
  "https://raw.githubusercontent.com/Jason-Vaughan/ScrapeGoat/main/stats.json",
];

/**
 * Format a number with K/M suffix.
 */
function formatBigNumber(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${Math.floor(n / 1000)}K+`;
  return n.toLocaleString();
}

/**
 * Builder stats bar — fetches stats from all projects and displays aggregated totals.
 */
export default function BuilderStats() {
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    Promise.allSettled(
      STATS_URLS.map((url) =>
        fetch(url, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null))
      )
    ).then((results) => {
      const stats = results
        .filter((r) => r.status === "fulfilled" && r.value)
        .map((r) => r.value);

      if (stats.length === 0) return;

      const totals = stats.reduce(
        (acc, s) => ({
          loc: acc.loc + (s.loc || 0),
          tests: acc.tests + (s.tests || 0),
          commits: acc.commits + (s.commits || 0),
          projects: acc.projects + 1,
        }),
        { loc: 0, tests: 0, commits: 0, projects: 0 }
      );

      setTotals(totals);
    });
  }, []);

  // Hide section if no stats loaded yet
  if (!totals) return null;

  const stats = [
    { label: "Lines of Code", value: formatBigNumber(totals.loc), color: "#38bdf8" },
    { label: "Commits", value: formatBigNumber(totals.commits), color: "#a78bfa" },
    { label: "Tests Passing", value: formatBigNumber(totals.tests), color: "#34d399" },
    { label: "Projects Shipped", value: String(totals.projects), color: "#fbbf24" },
  ];

  return (
    <section id="builder-stats" style={{ padding: "24px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            borderRadius: 16,
            border: "1px solid #3f3f46",
            background: "linear-gradient(135deg, rgba(24,24,27,0.95), rgba(39,39,42,0.95))",
            boxShadow: "0 8px 24px rgba(0,0,0,.35)",
            overflow: "hidden",
          }}
        >
          {/* Accent bar */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #38bdf8, #a78bfa, #34d399, #fbbf24)" }} />

          <div style={{ padding: "20px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#71717a" }}>
                  Builder Stats
                </span>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#a1a1aa" }}>
                  Live totals across all projects — updated on every commit
                </p>
              </div>
            </div>

            <div style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: 16,
            }}>
              {stats.map((s) => (
                <div key={s.label} style={{ textAlign: "center", padding: "8px 4px" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: "#71717a", marginTop: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
