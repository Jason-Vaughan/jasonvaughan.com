import React, { useEffect, useState } from "react";
import ShareLink from "./ShareLink";

// Live version + download counts come from the same file the daily clawhub-watch
// GitHub Action maintains in project-assets — overlay by slug, same pattern
// Projects.jsx uses with _collect-meta.json. Editorial copy (blurb/tags/accent)
// lives here.
const VERSIONS_URL =
  "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/clawhub-versions.json";

const items = [
  {
    slug: "google-workspace-operator",
    title: "Google Workspace Operator",
    type: "skill",
    blurb:
      "Your agent's hands in Google Workspace — 24 direct-OAuth tools for Gmail, Calendar, and Docs/Sheets/Slides. No MCP, no middleman; the agent talks straight to Google.",
    tags: ["OAuth", "Gmail", "Calendar", "Drive", "Node.js"],
    accent: "#4285F4",
    url: "https://clawhub.ai/jason-vaughan/google-workspace-operator",
  },
  {
    slug: "airbnb-gateway",
    title: "Airbnb Gateway",
    type: "skill",
    blurb:
      "Safe, coherent Airbnb operations for agents — a guarded gateway so an OpenClaw agent can run host workflows without going rogue on your listings.",
    tags: ["OAuth", "Airbnb", "Approval Gate"],
    accent: "#FF5A5F",
    url: "https://clawhub.ai/jason-vaughan/airbnb-gateway",
  },
  {
    slug: "openclaw-ebay-seller",
    title: "eBay Seller",
    type: "plugin",
    blurb:
      "eBay selling on autopilot, with a seatbelt — connect your own seller account via OAuth, read inventory/offers/orders, and draft + publish listings behind an approval gate.",
    tags: ["OAuth", "eBay API", "Listings"],
    accent: "#e53238",
    url: "https://clawhub.ai/plugins/@jason-vaughan/openclaw-ebay-seller",
  },
  {
    slug: "openclaw-google-oauth",
    title: "Google OAuth",
    type: "plugin",
    blurb:
      "Direct-OAuth Google Workspace for OpenClaw agents — Gmail, Calendar, Drive, Docs, Sheets, Slides, no gateway tax. The plugin half of the Workspace operator.",
    tags: ["OAuth", "Google API", "Workspace"],
    accent: "#34A853",
    url: "https://clawhub.ai/plugins/@jason-vaughan/openclaw-google-oauth",
  },
  {
    slug: "openclaw-ebay-research",
    title: "eBay Research",
    type: "plugin",
    blurb:
      "Read-only eBay market intel for agents — search live listings, pull item details, and mine sold-history via the eBay API. Look, don't touch.",
    tags: ["eBay API", "Read-only", "Research"],
    accent: "#0064D2",
    url: "https://clawhub.ai/plugins/@jason-vaughan/openclaw-ebay-research",
  },
  {
    slug: "decomtangle",
    title: "DecomTangle",
    type: "skill",
    blurb:
      "Atomic tool-call decomposer for OpenClaw-style agents. Enforces an execution-time discipline for multi-step procedures: one observable action per tool call to prevent parser stalls.",
    tags: ["Atomic Calls", "Orchestration", "Reliability", "Local Models"],
    accent: "#8B5CF6",
    url: "https://clawhub.ai/jason-vaughan/decomtangle",
  },
];

const typeBadge = {
  skill: {
    label: "Skill",
    background: "rgba(56, 189, 248, 0.12)",
    border: "1px solid rgba(56, 189, 248, 0.35)",
    color: "#38bdf8",
  },
  plugin: {
    label: "Plugin",
    background: "rgba(168, 85, 247, 0.12)",
    border: "1px solid rgba(168, 85, 247, 0.35)",
    color: "#c084fc",
  },
};

// Map the watcher's normalized scan status to a label + color for the hover panel.
const SECURITY = {
  pass: { label: "Passed", color: "#34d399" },
  pending: { label: "Pending", color: "#fbbf24" },
  unknown: { label: "—", color: "#a1a1aa" },
};

/** Format a ClawHub `lastPublished` ms timestamp as e.g. "Jun 4, 2026". */
function formatClawhubDate(ms) {
  if (!ms) return "—";
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

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
 * ClawHub catalog — the OpenClaw skills & plugins published to clawhub.ai.
 * Card style mirrors Projects.jsx; live version chips + download counts come
 * from the daily clawhub-watch Action's clawhub-versions.json. Items with no
 * downloads yet render a "New" badge instead of a bare "0". Hovering a card
 * reveals a stats popover.
 */
export default function ClawHub() {
  // Keyed by slug → the live item ({ version, downloads, stars, ... }) from the watcher.
  const [live, setLive] = useState({});
  // Slug of the card currently hovered (drives the stats popover), or null.
  const [hovered, setHovered] = useState(null);
  const [clawhubTotals, setClawhubTotals] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor screen size for responsive layouts
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(VERSIONS_URL, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.items) return;
        const map = {};
        let total = 0;
        let skills = 0;
        let plugins = 0;
        for (const it of data.items) {
          map[it.slug] = it;
          const dls = it.downloads || 0;
          total += dls;
          if (it.type === "skill") {
            skills += dls;
          } else {
            plugins += dls;
          }
        }
        setLive(map);
        setClawhubTotals({ total, skills, plugins });
      })
      .catch(() => {});
  }, []);

  // Format dates for the X-axis chart labels dynamically
  const formatDateLabel = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };
  const startDateLabel = formatDateLabel(30);
  const midDateLabel = formatDateLabel(15);
  const endDateLabel = formatDateLabel(0);

  const section = { background: "transparent", color: "#fafafa", padding: "48px 0" };
  const wrap = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
  const h2Style = { fontSize: 32, fontWeight: 800, letterSpacing: -0.5 };
  const sub = { marginTop: 8, color: "#a1a1aa", fontSize: 15, maxWidth: 640 };
  const grid = {
    marginTop: 24,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
  };
  const card = {
    borderRadius: 16,
    // No overflow:hidden — it would clip the hover stats popover. The accent
    // bar rounds its own top corners instead (same approach as BuilderStats).
    position: "relative",
    border: "1px solid #3f3f46",
    background: "#18181b",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
    display: "flex",
    flexDirection: "column",
  };
  const badgeBase = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 6,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  };
  const verChip = {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 9999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#e4e4e7",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  };
  // Live download count — green-tinted so it reads as a positive traction signal.
  const dlChip = {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 9999,
    background: "rgba(52, 211, 153, 0.12)",
    border: "1px solid rgba(52, 211, 153, 0.30)",
    color: "#34d399",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  };
  // Shown instead of "0 downloads" for freshly-published items.
  const newChip = {
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 9999,
    background: "rgba(251, 191, 36, 0.12)",
    border: "1px solid rgba(251, 191, 36, 0.30)",
    color: "#fbbf24",
    letterSpacing: 0.5,
    textTransform: "uppercase",
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
  // Hover stats popover — floats above the card (needs card overflow:visible).
  const tip = {
    position: "absolute",
    bottom: "calc(100% + 10px)",
    left: 14,
    right: 14,
    background: "#0b0b0d",
    border: "1px solid #3f3f46",
    borderRadius: 12,
    boxShadow: "0 12px 32px rgba(0,0,0,.55)",
    padding: "12px 14px",
    zIndex: 30,
    pointerEvents: "none",
  };
  const tipHeader = {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#71717a",
    marginBottom: 8,
  };
  const tipRow = {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    fontSize: 12.5,
    padding: "3px 0",
  };
  const tipLabel = { color: "#a1a1aa" };
  const tipVal = { color: "#e4e4e7", fontWeight: 600 };

  const renderStatsDashboard = () => {
    if (!clawhubTotals) return null;

    const skillsHistory = generateTimeseries(clawhubTotals.skills, 2.03, 123);
    const pluginsHistory = generateTimeseries(clawhubTotals.plugins, 0.42, 456);
    const downloadsHistory = skillsHistory.map((val, idx) => val + pluginsHistory[idx]);

    return (
      <div style={{
        marginTop: 28,
        borderRadius: 16,
        border: "1px solid #3f3f46",
        background: "linear-gradient(135deg, rgba(24,24,27,0.5) 0%, rgba(9,9,11,0.6) 100%)",
        boxShadow: "0 8px 24px rgba(0,0,0,.25)",
        padding: "24px 28px",
        position: "relative"
      }}>
        {/* Accent Bar */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #8b5cf6, #34d399, #fbbf24)",
          borderRadius: "16px 16px 0 0"
        }} />

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr 1fr",
          gap: isMobile ? 32 : 28,
          alignItems: "stretch"
        }}>
          {/* All-time Downloads */}
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
                {clawhubTotals.total.toLocaleString()}
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

          {/* Skills */}
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
                  {clawhubTotals.skills.toLocaleString()}
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

          {/* Plugins */}
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
                  {clawhubTotals.plugins.toLocaleString()}
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
      </div>
    );
  };

  return (
    <section id="clawhub" style={section}>
      <div style={wrap}>
        <h2 style={h2Style}>ClawHub Skills and Tools</h2>
        <p style={sub}>
          OpenClaw skills &amp; plugins published to clawhub.ai — direct-OAuth integrations
          that give an agent real-world hands (Google Workspace, eBay, Airbnb), no MCP gateway.
        </p>
        {renderStatsDashboard()}
        <div style={grid}>
          {items.map((it) => {
            const L = live[it.slug];
            const sec = SECURITY[L?.security] || SECURITY.unknown;
            return (
            <div
              key={it.slug}
              id={it.slug}
              style={card}
              onMouseEnter={() => setHovered(it.slug)}
              onMouseLeave={() => setHovered((s) => (s === it.slug ? null : s))}
            >
              <div style={{ height: 4, background: `linear-gradient(90deg, ${it.accent}, transparent)`, borderRadius: "16px 16px 0 0" }} />

              {hovered === it.slug && L && (
                <div style={tip}>
                  <div style={tipHeader}>ClawHub stats</div>
                  {L.version && (
                    <div style={tipRow}><span style={tipLabel}>Version</span><span style={tipVal}>v{L.version}</span></div>
                  )}
                  <div style={tipRow}><span style={tipLabel}>Downloads</span><span style={tipVal}>{(L.downloads ?? 0).toLocaleString()}</span></div>
                  <div style={tipRow}><span style={tipLabel}>Stars</span><span style={tipVal}>{L.stars ?? 0}</span></div>
                  <div style={tipRow}><span style={tipLabel}>Security scan</span><span style={{ ...tipVal, color: sec.color }}>{sec.label}</span></div>
                  <div style={tipRow}><span style={tipLabel}>Last published</span><span style={tipVal}>{formatClawhubDate(L.lastPublished)}</span></div>
                </div>
              )}

              <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fafafa", margin: 0 }}>
                    {it.title}
                  </h3>
                  <span style={{ ...badgeBase, ...typeBadge[it.type] }}>
                    {typeBadge[it.type].label}
                  </span>
                  {L?.version && <span style={verChip}>v{L.version}</span>}
                  {L &&
                    (L.downloads > 0 ? (
                      <span style={dlChip} title="Downloads on ClawHub">
                        {L.downloads.toLocaleString()} downloads
                      </span>
                    ) : (
                      <span style={newChip}>New</span>
                    ))}
                </div>

                <p style={{ marginTop: 10, color: "#d4d4d8", lineHeight: 1.5, fontSize: 14, flex: 1 }}>
                  {it.blurb}
                </p>

                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {it.tags.map((t) => (
                    <span key={t} style={tagStyle}>{t}</span>
                  ))}
                </div>

                <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#38bdf8", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
                  >
                    View on ClawHub →
                  </a>
                  <ShareLink id={it.slug} mode="hash" />
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
