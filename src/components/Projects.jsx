import React, { useEffect, useState } from "react";
import ScreenshotModal from "./ScreenshotModal";
import ShareLink from "./ShareLink";
import { autoLanguageTags } from "../utils/languageTags";
import { gridProjects as projects } from "../data/projects";

const MANIFEST_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/_collect-meta.json";

const badgeStyles = {
  commercial: {
    background: "rgba(245, 158, 11, 0.12)",
    border: "1px solid rgba(245, 158, 11, 0.35)",
    color: "#fbbf24",
  },
  openSource: {
    background: "rgba(52, 211, 153, 0.12)",
    border: "1px solid rgba(52, 211, 153, 0.35)",
    color: "#34d399",
  },
  archived: {
    background: "rgba(161, 161, 170, 0.12)",
    border: "1px solid rgba(161, 161, 170, 0.35)",
    color: "#a1a1aa",
  },
  saas: {
    background: "rgba(212, 175, 55, 0.12)",
    border: "1px solid rgba(212, 175, 55, 0.35)",
    color: "#D4AF37",
  },
};

function formatCount(n) {
  if (n >= 1000) return `${Math.floor(n / 1000)}K`;
  return n.toLocaleString();
}

/**
 * Dark-themed project cards with logo viewports and optional screenshot galleries.
 */
export default function Projects() {
  const [modal, setModal] = useState(null);
  const [statsBySlug, setStatsBySlug] = useState({});
  // Release-tag versions per project, keyed by slug. Sourced from the centralized
  // manifest's `versions` block (daily-synced server-side from releases/latest —
  // latest STABLE tag, no pre-releases), NOT a per-visitor GitHub fetch. The grid
  // cards and the static /notse page both read this one block, so they can't drift
  // from each other. (Featured*/Pipeline hero cards still version via the live
  // useGitHubLatestRelease hook — a separate path, not unified here.) Set in the
  // manifest effect below; missing/null keys render no chip (graceful no-op).
  const [versionsBySlug, setVersionsBySlug] = useState({});
  // Latest-release download assets per slug, from manifest.downloads (e.g. notse's
  // .dmg + .exe). Rendered as direct-download pills; absent for projects with no
  // release assets. Same single-source pattern as versionsBySlug.
  const [downloadsBySlug, setDownloadsBySlug] = useState({});

  useEffect(() => {
    fetch(MANIFEST_URL, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((manifest) => {
        if (!manifest) return;
        // Single source for version chips + download links — see state above.
        if (manifest.versions) setVersionsBySlug(manifest.versions);
        if (manifest.downloads) setDownloadsBySlug(manifest.downloads);
        if (!manifest.projects) return;
        const map = {};
        for (const [slug, entry] of Object.entries(manifest.projects)) {
          if (entry.ok && entry.stats) map[slug] = entry.stats;
        }
        setStatsBySlug(map);
      })
      .catch(() => {});
  }, []);

  const section = { background: "transparent", color: "#fafafa", padding: "48px 0" };
  const wrap = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
  const grid = {
    marginTop: 24,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
  };
  const h2Style = { fontSize: 32, fontWeight: 800, letterSpacing: -0.5 };

  const card = {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid #3f3f46",
    background: "#18181b",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
    display: "flex",
    flexDirection: "column",
  };

  const imgViewport = {
    height: 180, padding: 12,
    background: "rgba(24,24,27,.6)",
    borderBottom: "1px solid rgba(63,63,70,.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
  };

  const imgStyle = {
    maxWidth: "100%", maxHeight: "100%",
    objectFit: "contain",
    borderRadius: 10,
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

  const screenshotPill = {
    fontSize: 13,
    fontWeight: 600,
    color: "#38bdf8",
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    textDecoration: "none",
  };

  // Download pills — amber to read as an action, sized like the tag pills so they
  // match "the other things shown" on the card. Direct links to the latest
  // release assets from manifest.downloads (categorized by filename below).
  const downloadPill = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 9999,
    background: "rgba(245,158,11,0.12)",
    border: "1px solid rgba(245,158,11,0.35)",
    color: "#fbbf24",
    textDecoration: "none",
  };

  const statsRow = {
    marginTop: 12,
    fontSize: 12,
    color: "#71717a",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  };

  const badgeBase = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 6,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  };

  return (
    <section id="projects" style={section}>
      <div style={wrap}>
        <div style={grid}>
          {projects.map((p) => (
            <div key={p.title} id={p.slug} style={card}>
              {/* Accent bar */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

              {/* Logo viewport */}
              <div style={imgViewport}>
                <img src={p.image} alt={p.title} style={imgStyle} loading="lazy" />
              </div>

              <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fafafa", margin: 0 }}>
                    {p.title}
                  </h3>
                  {p.badge && (
                    <span style={{ ...badgeBase, ...(badgeStyles[p.badge.tone] || badgeStyles.openSource) }}>
                      {p.badge.label}
                    </span>
                  )}
                  {versionsBySlug[p.slug] && (
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 9999,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#e4e4e7",
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    }}>
                      {versionsBySlug[p.slug]}
                    </span>
                  )}
                </div>

                <p style={{ marginTop: 10, color: "#d4d4d8", lineHeight: 1.5, fontSize: 14, flex: 1 }}>
                  {p.blurb}
                </p>

                {/* Tags — curated + auto-detected languages from manifest */}
                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[...p.tags, ...autoLanguageTags(statsBySlug[p.slug]?.languages, p.tags)].map((t) => (
                    <span key={t} style={tagStyle}>{t}</span>
                  ))}
                </div>

                {/* Live stats from collector */}
                {statsBySlug[p.slug] && (
                  <div style={statsRow}>
                    {statsBySlug[p.slug].loc > 0 && (
                      <span><strong style={{ color: "#d4d4d8" }}>{formatCount(statsBySlug[p.slug].loc)}</strong> LOC</span>
                    )}
                    {statsBySlug[p.slug].tests > 0 && (
                      <>
                        <span style={{ color: "#3f3f46" }}>·</span>
                        <span><strong style={{ color: "#d4d4d8" }}>{formatCount(statsBySlug[p.slug].tests)}</strong> tests</span>
                      </>
                    )}
                    {statsBySlug[p.slug].commits > 0 && (
                      <>
                        <span style={{ color: "#3f3f46" }}>·</span>
                        <span><strong style={{ color: "#d4d4d8" }}>{statsBySlug[p.slug].commits}</strong> commits</span>
                      </>
                    )}
                    {statsBySlug[p.slug].prs?.merged > 0 && (
                      <>
                        <span style={{ color: "#3f3f46" }}>·</span>
                        <span><strong style={{ color: "#d4d4d8" }}>{statsBySlug[p.slug].prs.merged}</strong> PRs</span>
                      </>
                    )}
                  </div>
                )}

                {/* Links */}
                <div style={{ marginTop: 16, display: "flex", gap: 16, alignItems: "center" }}>
                  {p.link && (() => {
                    const isAnchor = p.link.startsWith("#");
                    const isInternal = p.link.startsWith("/");
                    return (
                      <a
                        href={p.link}
                        {...(isAnchor
                          ? {
                              onClick: (e) => {
                                e.preventDefault();
                                document
                                  .querySelector(p.link)
                                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
                              },
                            }
                          : isInternal
                          ? {}
                          : { target: "_blank", rel: "noreferrer" })}
                        style={{ color: "#38bdf8", fontWeight: 600, fontSize: 14, textDecoration: "none" }}
                      >
                        {p.linkLabel || "View details"} →
                      </a>
                    );
                  })()}
                  {p.github && p.github !== p.link && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        gap: 6,
                        color: "#ffffff", 
                        fontWeight: 600, 
                        fontSize: 12, 
                        textDecoration: "none",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "4px 12px",
                        borderRadius: 9999
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {p.screenshots && (
                    <button
                      style={screenshotPill}
                      onClick={() => setModal({ images: p.screenshots })}
                    >
                      Screenshots →
                    </button>
                  )}
                </div>

                {/* Download row — labeled so it reads as "you need BOTH apps"
                    (two-machine system), not either/or. Always the latest build
                    from manifest.downloads; .dmg → Mac, .exe → Windows. */}
                {(() => {
                  const assets = downloadsBySlug[p.slug];
                  if (!assets) return null;
                  const mac = assets.find((a) => /\.dmg$/i.test(a.name));
                  const win = assets.find((a) => /\.(exe|msi)$/i.test(a.name));
                  if (!mac && !win) return null;
                  return (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ fontSize: 12, color: "#a1a1aa", marginBottom: 7, lineHeight: 1.4 }}>
                        <strong style={{ color: "#e4e4e7" }}>Download both apps</strong> — the Prompter (Mac) and the Helper (Windows):
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {mac && (
                          <a href={mac.url} style={downloadPill} title={`Download ${mac.name}`}>↓ Mac</a>
                        )}
                        {win && (
                          <a href={win.url} style={downloadPill} title={`Download ${win.name}`}>↓ Windows</a>
                        )}
                      </div>
                    </div>
                  );
                })()}

                <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                  <ShareLink id={p.slug} mode="hash" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <ScreenshotModal
          images={modal.images}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}
