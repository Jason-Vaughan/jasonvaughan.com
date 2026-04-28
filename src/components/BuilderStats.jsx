import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Manifest produced by the centralized collector in project-assets.
// Lists every collected repo + its stats; the aggregate bar sums across all of them
// so new repos auto-roll into the headline numbers without a code change here.
const MANIFEST_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/_collect-meta.json";

/**
 * Format a number with K/M/B suffix.
 */
function formatBigNumber(n) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B+`;
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
    fetch(MANIFEST_URL, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) {
          console.warn(`[BuilderStats] manifest fetch returned ${r.status}; bar hidden`);
          return null;
        }
        return r.json();
      })
      .then((manifest) => {
        if (!manifest?.projects) {
          if (manifest) console.warn("[BuilderStats] manifest has no `projects` key; bar hidden");
          return;
        }

        const successful = Object.values(manifest.projects).filter((p) => p.ok && p.stats);
        if (successful.length === 0) {
          console.warn("[BuilderStats] manifest has zero successful projects; bar hidden");
          return;
        }

        const totals = successful.reduce(
          (acc, p) => ({
            loc: acc.loc + (p.stats.loc || 0),
            tests: acc.tests + (p.stats.tests || 0),
            commits: acc.commits + (p.stats.commits || 0),
            projects: acc.projects + 1,
          }),
          { loc: 0, tests: 0, commits: 0, projects: 0 }
        );

        totals.tokens = manifest.aggregateTokens?.total || 0;

        setTotals(totals);
      })
      .catch((err) => {
        console.warn("[BuilderStats] manifest fetch failed:", err.message);
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

  // Only show AI Tokens stat once it's a non-zero number
  if (totals.tokens > 0) {
    stats.push({ label: "AI Tokens", value: formatBigNumber(totals.tokens), color: "#f472b6" });
  }

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
