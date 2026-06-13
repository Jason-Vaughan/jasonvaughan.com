import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatBigNumber, formatDelta } from "../utils/format";
import {
  MONAD_STATS_URL,
  OPENCLAW_AGENT_STATS_URLS,
  readTokenScalar,
} from "../data/openclaw-sources";

// Manifest produced by the centralized collector in project-assets.
// Lists every collected repo + its stats; the aggregate bar sums across all of them
// so new repos auto-roll into the headline numbers without a code change here.
const MANIFEST_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/_collect-meta.json";

/**
 * Builder stats bar — fetches stats from all projects and displays aggregated totals.
 */
export default function BuilderStats() {
  const [totals, setTotals] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  // Local-inference token breakdown — Monad-1 publisher + every OpenClaw
  // agent that self-publishes. Used to add local tokens onto the AI Tokens
  // tile and to render a per-source breakdown in the tooltip.
  const [localTokens, setLocalTokens] = useState({ monad: 0, agents: [] });

  useEffect(() => {
    // Fetch monad-stats + every OpenClaw agent in parallel. allSettled so
    // a single source being down doesn't tank the rest of the aggregation.
    Promise.allSettled([
      fetch(MONAD_STATS_URL, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
      ...OPENCLAW_AGENT_STATS_URLS.map((s) =>
        fetch(s.url, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
      ),
    ]).then((results) => {
      const monadTotal = results[0].status === "fulfilled" && results[0].value
        ? readTokenScalar(results[0].value?.tokens?.total)
        : 0;
      const agents = OPENCLAW_AGENT_STATS_URLS.map((s, i) => {
        const r = results[i + 1]; // offset by 1 (Monad was first)
        const total = r.status === "fulfilled" && r.value
          ? readTokenScalar(r.value?.tokens?.total)
          : 0;
        return { name: s.name, total };
      });
      setLocalTokens({ monad: monadTotal, agents });
    });
  }, []);

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
        totals.fixes = manifest.aggregateFixes?.count || 0;
        totals.prs = manifest.aggregatePRs?.merged || 0;
        totals.refactored = manifest.aggregateRefactored?.count || 0;

        // Week-over-week deltas come pre-computed in the manifest (added by
        // the collector after PR-on-project-assets#TBD). Defaults to empty so
        // older manifests degrade gracefully (no badges render).
        totals.deltas = manifest.aggregateDeltas || null;

        setTotals(totals);
      })
      .catch((err) => {
        console.warn("[BuilderStats] manifest fetch failed:", err.message);
      });
  }, []);

  // Hide section if no stats loaded yet
  if (!totals) return null;

  // `exact` = raw integer for the hover tooltip (precise value)
  // `delta` = signed change vs the same metric 7 days ago, or null if the
  //          manifest doesn't yet have aggregateDeltas (graceful degrade).
  const d = totals.deltas;
  const stats = [
    {
      label: "Lines of Code",
      value: formatBigNumber(totals.loc),
      exact: totals.loc,
      delta: d ? d.loc : null,
      color: "#38bdf8",
      description: "Current snapshot of source files across all tracked repos — what lives in the codebase right now. Counts hand-written source, markup, styles, docs, and config (JS/TS, Python, HTML, CSS, Markdown, and more) across every repo; generated and vendored files (lockfiles, build output, node_modules) are excluded. Different from lifetime-added, since refactoring removes lines as it adds new ones.",
    },
    {
      label: "Commits",
      value: formatBigNumber(totals.commits),
      exact: totals.commits,
      delta: d ? d.commits : null,
      color: "#a78bfa",
      description: "Total commits across all tracked repos, summed from `git rev-list HEAD` per repo. Includes both direct-to-main and squash-merged PRs.",
    },
    {
      label: "Tests Passing",
      value: formatBigNumber(totals.tests),
      exact: totals.tests,
      delta: d ? d.tests : null,
      color: "#34d399",
      description: "Sum of `it()` / `test()` calls across every test file (`*.test.*` / `*.spec.*`) in every repo. Counts assertions that exist in the codebase — not test runs.",
    },
    {
      label: "Projects Shipped",
      value: String(totals.projects),
      exact: totals.projects,
      delta: null, // headcount change is rare; not surfaced as a delta badge
      color: "#fbbf24",
      description: "Public + private repos in the live stats registry. Auto-discovered from GitHub, then filtered by `projects.yml` exclusions (archived experiments, scratch repos, asset-only repos).",
    },
  ];

  // AI Tokens = cloud-provider tokens (from the centralized manifest) + every
  // local-inference source that self-publishes (Monad-1, Volta, …). Headline
  // signal is "total AI work done, anywhere I run it" — the tooltip breakdown
  // shows cloud vs. each local agent so visitors can see the mix.
  const cloudTokens = totals.tokens; // already from manifest.aggregateTokens.total
  const localAgentTotal = localTokens.agents.reduce((sum, a) => sum + a.total, 0);
  const localTotal = localTokens.monad + localAgentTotal;
  const allTokens = cloudTokens + localTotal;

  if (allTokens > 0) {
    // Build a multi-line breakdown for the tooltip. OpenClaw agents that
    // run on Monad-1 (currently all of them — Volta, future agents) get
    // rolled into the single "Monad-1 (local inference)" line since their
    // tokens are Monad-1's tokens from a hardware perspective. If a future
    // agent runs elsewhere, attribute it separately at that point.
    const breakdownLines = [];
    if (cloudTokens > 0) {
      breakdownLines.push(`Cloud providers: ${formatBigNumber(cloudTokens)}`);
    }
    if (localTotal > 0) {
      breakdownLines.push(`Monad-1 (local inference): ${formatBigNumber(localTotal)}`);
    }

    stats.push({
      label: "AI Tokens",
      value: formatBigNumber(allTokens),
      exact: allTokens,
      delta: null,
      color: "#f472b6",
      description:
        "Lifetime tokens consumed across cloud providers (Anthropic, OpenAI, Cursor, Gemini, Copilot) plus local inference on Monad-1 and the OpenClaw fleet. Cloud totals refresh daily; local totals refresh every 15 min via each agent's self-published stats.",
      breakdown: breakdownLines.length > 1 ? breakdownLines : null,
    });
  }

  // Only show Fixes Shipped once the manifest carries a non-zero aggregate
  if (totals.fixes > 0) {
    stats.push({
      label: "Fixes Shipped",
      value: formatBigNumber(totals.fixes),
      exact: totals.fixes,
      delta: d ? d.fixes : null,
      color: "#06b6d4",
      description: "Commits whose subject is prefixed `fix:` / `fix(scope):` / `bugfix:` / `hotfix:` / `Fix ` / `Fixed ` / `Fixes ` (case-insensitive). Subject-only — `feat:` commits with fix bullets in the body don't count.",
    });
  }

  // Only show PRs Merged once the manifest carries a non-zero aggregate
  if (totals.prs > 0) {
    stats.push({
      label: "PRs Merged",
      value: formatBigNumber(totals.prs),
      exact: totals.prs,
      delta: d ? d.prs : null,
      color: "#f97316",
      description: "Pull requests merged to default branch across all GitHub repos. Forward-looking metric — most history is direct-to-main from before the 2026-04 PR-workflow shift, so this number is small but growing.",
    });
  }

  // Lines Refactored — sums of git deletions across history (refactors,
  // dead-code removal, simplifications). Tooltip explains the framing since
  // "deleted lines = good" isn't obvious to non-devs.
  if (totals.refactored > 0) {
    stats.push({
      label: "Lines Refactored",
      value: formatBigNumber(totals.refactored),
      exact: totals.refactored,
      delta: d ? d.refactored : null,
      color: "#ec4899",
      description: "Lines removed across all repos — refactoring, cleanups, dead code removal, simplifications. A high number means the codebase is being revisited and improved, not just stacked on.",
    });
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
            // No `overflow: hidden` — would clip the tile hover tooltips.
            // Accent bar rounds its own top corners instead (below).
          }}
        >
          {/* Accent bar — rounds its own top corners since the parent
              no longer clips with overflow:hidden. */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #38bdf8, #a78bfa, #34d399, #fbbf24)", borderRadius: "16px 16px 0 0" }} />

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
              // 80px min + 10px gap keeps all 8 tiles on one row well below
              // the 960px container — wrap point drops from ~960px viewport
              // to ~810px viewport. Math: 8*80 + 7*10 = 710px tile area.
              gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
              gap: 10,
            }}>
              {stats.map((s) => {
                const isHovered = hoveredLabel === s.label;
                const hasTooltip = !!s.description;
                const hasDelta = typeof s.delta === "number" && s.delta !== 0;
                return (
                  <div
                    key={s.label}
                    onMouseEnter={() => hasTooltip && setHoveredLabel(s.label)}
                    onMouseLeave={() => hasTooltip && setHoveredLabel(null)}
                    style={{
                      textAlign: "center",
                      padding: "8px 4px",
                      position: "relative",
                      cursor: hasTooltip ? "help" : "default",
                    }}
                  >
                    <div style={{ fontSize: 24, fontWeight: 800, color: s.color, lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: hasTooltip ? "#a1a1aa" : "#71717a",
                      marginTop: 6,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      borderBottom: hasTooltip ? "1px dotted #52525b" : "none",
                      display: "inline-block",
                      paddingBottom: 1,
                    }}>
                      {s.label}
                    </div>
                    {hasDelta && (
                      <div style={{
                        marginTop: 3,
                        fontSize: 10,
                        fontWeight: 600,
                        color: s.delta > 0 ? "#22c55e" : "#f87171",
                        letterSpacing: 0.3,
                      }}>
                        {formatDelta(s.delta)}
                        <span style={{ color: "#52525b", fontWeight: 400 }}> / 7d</span>
                      </div>
                    )}
                    {hasTooltip && isHovered && (
                      <div
                        role="tooltip"
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 240,
                          padding: "10px 12px",
                          background: "#09090b",
                          border: "1px solid #3f3f46",
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: 1.5,
                          color: "#d4d4d8",
                          textAlign: "left",
                          textTransform: "none",
                          letterSpacing: 0,
                          boxShadow: "0 8px 24px rgba(0,0,0,.5)",
                          zIndex: 10,
                          pointerEvents: "none",
                        }}
                      >
                        {s.description}
                        {s.breakdown && s.breakdown.length > 0 && (
                          <div style={{
                            marginTop: 8,
                            paddingTop: 8,
                            borderTop: "1px solid #27272a",
                            fontSize: 11,
                            color: "#a1a1aa",
                          }}>
                            {s.breakdown.map((line, i) => (
                              <div key={i} style={{ marginTop: i === 0 ? 0 : 2 }}>{line}</div>
                            ))}
                          </div>
                        )}
                        {typeof s.exact === "number" && (
                          <div style={{
                            marginTop: 8,
                            paddingTop: 8,
                            borderTop: "1px solid #27272a",
                            fontSize: 11,
                            color: "#a1a1aa",
                          }}>
                            <span style={{ color: "#71717a" }}>Exact: </span>
                            <span style={{ color: s.color, fontWeight: 600 }}>
                              {s.exact.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
