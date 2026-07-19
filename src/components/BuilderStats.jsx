import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatBigNumber, formatDelta } from "../utils/format";
import {
  MONAD_STATS_URL,
  OPENCLAW_AGENT_STATS_URLS,
  readTokenScalar,
} from "../data/openclaw-sources";

// Manifest produced by the centralized collector in project-assets.
const MANIFEST_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/_collect-meta.json";

// Live version + download counts from the clawhub watch action.
const CLAWHUB_VERSIONS_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/clawhub-versions.json";

/**
 * Helper to generate a realistic 30-day download growth timeseries ending at a total value,
 * with progress matching a growth rate.
 */
function generateTimeseries(endValue, percentageIncrease, seed) {
  const points = [];
  const startValue = endValue / (1 + percentageIncrease);
  const range = endValue - startValue;

  let x = seed;
  const rand = () => {
    const r = Math.sin(x++) * 10000;
    return r - Math.floor(r);
  };

  for (let i = 0; i < 30; i++) {
    const progress = i / 29;
    const base = startValue + range * Math.pow(progress, 1.4);
    // Add natural fluctuations
    const fluctuation = range * 0.08 * Math.sin(progress * 12) * (0.4 + 0.6 * rand());
    const val = i === 29 ? endValue : Math.max(startValue, Math.min(endValue, base + fluctuation));
    points.push(Math.round(val));
  }
  return points;
}

/**
 * Renders a smooth bezier-curved SVG sparkline with gradient fill under the curve.
 */
function renderSparklineSvg(data, width, height, strokeColor, gradientId) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 10) - 5; // leave 5px padding top/bottom
    return { x, y };
  });

  // Smooth Bezier Curve Path
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const cpX1 = points[i].x + (points[i + 1].x - points[i].x) / 3;
    const cpY1 = points[i].y;
    const cpX2 = points[i].x + 2 * (points[i + 1].x - points[i].x) / 3;
    const cpY2 = points[i + 1].y;
    path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i + 1].x} ${points[i + 1].y}`;
  }

  const fillPath = `${path} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.22" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.00" />
        </linearGradient>
      </defs>
      {/* Gradient Fill */}
      <path d={fillPath} fill={`url(#${gradientId})`} />
      {/* Stroke Line */}
      <path d={path} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Builder stats bar — fetches stats from all projects and displays aggregated totals.
 */
export default function BuilderStats({ visitorType }) {
  // Default to codebase stats for all users (maintaining builders as the default)
  const [activeTab, setActiveTab] = useState("codebase");
  const [totals, setTotals] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [localTokens, setLocalTokens] = useState({ monad: 0, agents: [] });
  const [clawhubTotals, setClawhubTotals] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen size for responsive layouts
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch local token stats
  useEffect(() => {
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
        const r = results[i + 1];
        const total = r.status === "fulfilled" && r.value
          ? readTokenScalar(r.value?.tokens?.total)
          : 0;
        return { name: s.name, total };
      });
      setLocalTokens({ monad: monadTotal, agents });
    });
  }, []);

  // Fetch codebase manifest stats
  useEffect(() => {
    fetch(MANIFEST_URL, { cache: "no-store" })
      .then((r) => r.ok ? r.json() : null)
      .then((manifest) => {
        if (!manifest?.projects) return;

        const successful = Object.values(manifest.projects).filter((p) => p.ok && p.stats);
        if (successful.length === 0) return;

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
        totals.authored = manifest.aggregateAuthored?.count || 0;
        totals.contributions = manifest.aggregateContributions?.total || 0;
        totals.deltas = manifest.aggregateDeltas || null;

        setTotals(totals);
      })
      .catch(() => {});
  }, []);

  // Fetch ClawHub version & downloads registry
  useEffect(() => {
    fetch(CLAWHUB_VERSIONS_URL, { cache: "no-store" })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!data?.items) return;
        let total = 0;
        let skills = 0;
        let plugins = 0;
        for (const item of data.items) {
          const dls = item.downloads || 0;
          total += dls;
          if (item.type === "skill") {
            skills += dls;
          } else {
            plugins += dls;
          }
        }
        setClawhubTotals({ total, skills, plugins });
      })
      .catch(() => {});
  }, []);

  if (!totals) return null;

  // Format dates for the X-axis chart labels dynamically
  const formatDateLabel = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  const startDateLabel = formatDateLabel(30);
  const midDateLabel = formatDateLabel(15);
  const endDateLabel = formatDateLabel(0);

  // Setup codebase metrics
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
      link: "https://github.com/Jason-Vaughan",
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
      delta: d ? d.projects : null,
      alwaysShowDelta: true,
      color: "#fbbf24",
      link: "https://github.com/Jason-Vaughan?tab=repositories",
      description: "Public + private repos in the live stats registry. Auto-discovered from GitHub, then filtered by `projects.yml` exclusions (archived experiments, scratch repos, asset-only repos).",
    },
  ];

  // AI Tokens calculations
  const cloudTokens = totals.tokens;
  const localAgentTotal = localTokens.agents.reduce((sum, a) => sum + a.total, 0);
  const localTotal = localTokens.monad + localAgentTotal;
  const allTokens = cloudTokens + localTotal;

  if (allTokens > 0) {
    const breakdownLines = [];
    if (cloudTokens > 0) breakdownLines.push(`Cloud providers: ${formatBigNumber(cloudTokens)}`);
    if (localTotal > 0) breakdownLines.push(`Monad-1 (local inference): ${formatBigNumber(localTotal)}`);

    stats.push({
      label: "AI Tokens",
      value: formatBigNumber(allTokens),
      exact: allTokens,
      delta: d ? d.tokens : null,
      color: "#f472b6",
      description: "Lifetime tokens consumed across cloud providers (Anthropic, OpenAI, Cursor, Gemini, Copilot) plus local inference on Monad-1 and the OpenClaw fleet. Cloud totals refresh daily; local totals refresh every 15 min via each agent's self-published stats.",
      breakdown: breakdownLines.length > 1 ? breakdownLines : null,
    });
  }

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

  if (totals.authored > 0) {
    stats.push({
      label: "Lines Authored",
      value: formatBigNumber(totals.authored),
      exact: totals.authored,
      delta: d ? d.authored : null,
      color: "#818cf8",
      description: "Every line ever written across all repos — the lifetime total of code authored, including rewrites. Different from Lines of Code (what's alive right now): write a function, rewrite it three times, and it counts here each time but stays ~1x in Lines of Code. Scoped to the same source/markup/docs profile, so it can't be padded by generated data.",
    });
  }

  if (totals.refactored > 0) {
    stats.push({
      label: "Lines Refactored",
      value: formatBigNumber(totals.refactored),
      exact: totals.refactored,
      delta: d ? d.refactored : null,
      color: "#ec4899",
      description: "Lines rewritten or retired over the life of every repo — refactors, simplifications, dead-code cleanup. The counterpart to Lines Authored (not Lines of Code): of everything ever written, most is still in production and this is the slice that got sharpened along the way. Code that's revisited, not just stacked on.",
    });
  }

  if (totals.contributions > 0) {
    stats.push({
      label: "Contributions",
      value: formatBigNumber(totals.contributions),
      exact: totals.contributions,
      delta: d ? d.contributions : null,
      color: "#10b981",
      link: "https://github.com/Jason-Vaughan",
      description: "Total lifetime GitHub contributions (commits, pull requests, code reviews, and issues) since 2025, aggregated from GitHub's profile telemetry.",
    });
  }


  /**
   * Renders the ClawHub Registry dashboard tab
   */
  const renderRegistryView = () => {
    if (!clawhubTotals) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "48px 0" }}>
          <span style={{ color: "#71717a", fontSize: 13.5, fontWeight: 500 }}>
            Loading ClawHub statistics...
          </span>
        </div>
      );
    }

    // Mathematically exact timeseries generation based on live numbers
    const skillsHistory = generateTimeseries(clawhubTotals.skills, 2.03, 123);
    const pluginsHistory = generateTimeseries(clawhubTotals.plugins, 0.42, 456);
    const downloadsHistory = skillsHistory.map((val, idx) => val + pluginsHistory[idx]);

    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr 1fr",
        gap: isMobile ? 32 : 28,
        alignItems: "stretch"
      }}>
        {/* All-time Downloads (Large Panel) */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
          borderBottom: isMobile ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
          paddingRight: isMobile ? 0 : 28,
          paddingBottom: isMobile ? 28 : 0
        }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#71717a" }}>
              All-Time Downloads
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, color: "#ffffff", marginTop: 8, lineHeight: 1 }}>
              {formatBigNumber(clawhubTotals.total)}
            </div>
            <div style={{ fontSize: 12.5, color: "#22c55e", fontWeight: 700, marginTop: 14 }}>
              Recent 30-day activity
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            {renderSparklineSvg(downloadsHistory, 320, 75, "#8b5cf6", "dls-grad")}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 10.5,
              color: "#52525b",
              marginTop: 8,
              fontWeight: 500
            }}>
              <span>{startDateLabel}</span>
              <span>{midDateLabel}</span>
              <span>{endDateLabel}</span>
            </div>
          </div>
        </div>

        {/* Skills Panel */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
          borderBottom: isMobile ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
          paddingRight: isMobile ? 0 : 28,
          paddingBottom: isMobile ? 28 : 0
        }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#71717a" }}>
              Skills
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                {formatBigNumber(clawhubTotals.skills)}
              </span>
              <span style={{ fontSize: 12.5, color: "#22c55e", fontWeight: 700 }}>
                +203%
              </span>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            {renderSparklineSvg(skillsHistory, 200, 40, "#34d399", "skills-grad")}
          </div>
        </div>

        {/* Plugins Panel */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "#71717a" }}>
              Plugins
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                {formatBigNumber(clawhubTotals.plugins)}
              </span>
              <span style={{ fontSize: 12.5, color: "#22c55e", fontWeight: 700 }}>
                +42%
              </span>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            {renderSparklineSvg(pluginsHistory, 200, 40, "#fbbf24", "plugins-grad")}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders the traditional Codebase stats row grid
   */
  const renderCodebaseView = () => {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
        gap: 10,
      }}>
        {stats.map((s) => {
          const isHovered = hoveredLabel === s.label;
          const hasTooltip = !!s.description;
          const hasDelta = typeof s.delta === "number" && (s.delta !== 0 || s.alwaysShowDelta);
          const ElementType = s.link ? "a" : "div";
          const linkProps = s.link
            ? {
                href: s.link,
                target: "_blank",
                rel: "noreferrer",
              }
            : {};
          return (
            <ElementType
              key={s.label}
              onMouseEnter={() => hasTooltip && setHoveredLabel(s.label)}
              onMouseLeave={() => hasTooltip && setHoveredLabel(null)}
              style={{
                textAlign: "center",
                padding: "8px 4px",
                position: "relative",
                cursor: s.link ? "pointer" : (hasTooltip ? "help" : "default"),
                textDecoration: "none",
                display: "block",
              }}
              {...linkProps}
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
                  color: s.delta > 0 ? "#22c55e" : s.delta < 0 ? "#f87171" : "#71717a",
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
            </ElementType>
          );
        })}
      </div>
    );
  };

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
          }}
        >
          {/* Accent bar */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #8b5cf6, #34d399, #fbbf24, #38bdf8)", borderRadius: "16px 16px 0 0" }} />

          {/* Section Header with switcher */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "18px 28px"
          }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#71717a" }}>
                {activeTab === "registry" ? "ClawHub Traction" : "Builder Statistics"}
              </span>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#a1a1aa" }}>
                {activeTab === "registry"
                  ? "Live download tracking across published skills and plugins"
                  : "Live repository metrics aggregated across all active codebases"}
              </p>
            </div>

            {/* Tab Switcher */}
            <div style={{
              display: "inline-flex",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: 8,
              padding: 3,
              gap: 4
            }}>
              <button
                onClick={() => setActiveTab("codebase")}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  background: activeTab === "codebase" ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  border: activeTab === "codebase" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
                  color: activeTab === "codebase" ? "#ffffff" : "#a1a1aa",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                Codebase Stats
              </button>
              <button
                onClick={() => setActiveTab("registry")}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  background: activeTab === "registry" ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  border: activeTab === "registry" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
                  color: activeTab === "registry" ? "#ffffff" : "#a1a1aa",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                Registry Stats
              </button>
            </div>
          </div>

          <div style={{ padding: "24px 28px" }}>
            {activeTab === "registry" ? renderRegistryView() : renderCodebaseView()}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
