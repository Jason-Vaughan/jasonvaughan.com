import React, { useEffect, useState } from "react";

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
 * ClawHub catalog — the OpenClaw skills & plugins published to clawhub.ai.
 * Card style mirrors Projects.jsx; live version chips + download counts come
 * from the daily clawhub-watch Action's clawhub-versions.json. Items with no
 * downloads yet render a "New" badge instead of a bare "0". Hovering a card
 * reveals a stats panel (downloads, stars, security scan, last published).
 */
export default function ClawHub() {
  // Keyed by slug → the live item ({ version, downloads, stars, ... }) from the watcher.
  const [live, setLive] = useState({});
  // Slug of the card currently hovered (drives the stats popover), or null.
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch(VERSIONS_URL, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.items) return;
        const map = {};
        for (const it of data.items) map[it.slug] = it;
        setLive(map);
      })
      .catch(() => {});
  }, []);

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

  return (
    <section id="clawhub" style={section}>
      <div style={wrap}>
        <h2 style={h2Style}>ClawHub</h2>
        <p style={sub}>
          OpenClaw skills &amp; plugins published to clawhub.ai — direct-OAuth integrations
          that give an agent real-world hands (Google Workspace, eBay, Airbnb), no MCP gateway.
        </p>
        <div style={grid}>
          {items.map((it) => {
            const L = live[it.slug];
            const sec = SECURITY[L?.security] || SECURITY.unknown;
            return (
            <div
              key={it.slug}
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

                <div style={{ marginTop: 16 }}>
                  <a
                    href={it.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#38bdf8", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
                  >
                    View on ClawHub →
                  </a>
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
