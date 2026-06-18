import React, { useState, useEffect } from "react";
import uciLogo from "../assets/projects/uci.png";
import medusaLogo from "../assets/projects/medusa.png";
import { formatBigNumber } from "../utils/format";
import useGitHubLatestRelease from "../hooks/useGitHubLatestRelease";

const MANIFEST_URL = "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/_collect-meta.json";

// Stage palette — visually distinguishes Beta (closer to launch, warm amber)
// from In Development (earlier, calm teal). Hidden if a stage's list is empty.
const STAGES = {
  beta: {
    title: "Beta",
    subtitle: "Live testing — accepting testers and feedback",
    accent: "#f59e0b",
    accentLight: "#fbbf24",
    badgeLabel: "Public Beta",
  },
  dev: {
    title: "In Development",
    subtitle: "Active build, public soon",
    accent: "#0d9488",
    accentLight: "#14b8a6",
    badgeLabel: "WIP · In Development",
  },
};

const projects = [
  {
    stage: "beta",
    slug: "medusa",
    title: "Medusa",
    fullName: "Medusa-MCP",
    repo: { owner: "Jason-Vaughan", repo: "Medusa" },
    image: medusaLogo,
    tagline:
      "Autonomous AI-to-AI coordination — turning isolated agents into a collective swarm.",
    blurb:
      "Modern AI agents (Cursor, Claude Desktop, Windsurf) live in isolated workspaces, forcing humans to manually route context between them. Medusa is a decentralized coordination layer on top of the Model Context Protocol that lets agents communicate, negotiate tasks, and reconcile results across a mesh — turning the AI silo problem into a collective swarm.",
    features: [
      "Distributed gossip consensus — peer voting on redundant tasks",
      "Collective strategy sharing — nodes defer to better-suited peers",
      "Bidirectional terminal interface for AI ↔ human handoffs",
      "ZombieDust autonomous monitoring — workspaces as wake-on-prompt endpoints",
      "Cross-IDE: Cursor, Windsurf, Claude Desktop, Terminal",
      "Peer discovery via TangleClaw PortHub — slots into the same self-hosted AI-ops stack",
    ],
    tags: ["MCP", "Python A2A Swarm", "Node.js Hub", "Autonomous Agents"],
    link: "https://github.com/Jason-Vaughan/Medusa",
    linkLabel: "View on GitHub",
    imgBackground: "#000000",
  },
  {
    stage: "dev",
    slug: "uci",
    title: "UCI",
    fullName: "Unified Comms Intelligence",
    repo: { owner: "Jason-Vaughan", repo: "UCI" },
    image: uciLogo,
    tagline:
      "An AI comms assistant that learns to run a business's inbox — human corrections become RLHF training data until the model earns autonomy, channel by channel.",
    blurb:
      "UCI is a machine-learning communications control plane. It unifies every inbound channel a business has — WhatsApp, Gmail, Airbnb, VRBO, iMessage, Discord — into one AI-assisted review queue, where a language model drafts every reply with a confidence score. Each human approve / edit / reject-with-reason is captured as labeled, RLHF-style training data, and that feedback loop continuously improves the model. A per-channel readiness signal then gates when the assistant may send on its own — so autonomy is measured and earned, one communication type at a time, never silent. Self-hosted on Chatwoot + Label Studio behind a custom control plane: per-type toggles, a readiness thermometer, a circuit breaker, and a full audit ledger.",
    features: [
      "LLM-drafted replies with per-message confidence scoring",
      "Every human approval, edit, and rejection captured as labeled training data",
      "Continuous RLHF-style learning loop — the model improves from real corrections",
      "Per-channel readiness model gates autonomy — measured, never silent",
      "Multi-channel intake — every inbox unified in one queue",
      "Full audit ledger for every decision, override, and automation flip",
    ],
    tags: ["Machine Learning", "RLHF", "LLM", "Human-in-the-Loop", "Multi-channel"],
  },
];

function PipelineCard({ project, stats }) {
  // Live version chip — fetched from GitHub Releases when the project has a
  // `repo` field. Returns null when the repo has no releases / fetch fails;
  // we just don't render the version suffix in that case.
  const liveVersion = useGitHubLatestRelease(project.repo?.owner, project.repo?.repo);
  const stage = STAGES[project.stage];
  if (!stage) return null;

  const card = {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid #3f3f46",
    background: "#18181b",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
    display: "flex",
    flexDirection: "column",
  };

  const titleBlock = {
    padding: "28px 24px 20px",
    background: `linear-gradient(135deg, rgba(0,0,0,0.0), rgba(255,255,255,0.02))`,
    borderBottom: "1px solid rgba(63,63,70,.6)",
  };

  const stageBadge = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 6,
    background: `${stage.accent}22`,
    border: `1px solid ${stage.accent}66`,
    color: stage.accentLight,
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

  const featureItem = {
    fontSize: 13,
    color: "#d4d4d8",
    lineHeight: 1.6,
    paddingLeft: 18,
    position: "relative",
  };

  const statsRow = {
    marginTop: 16,
    fontSize: 12,
    color: "#71717a",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  };

  const imgViewport = {
    height: 200,
    padding: 16,
    // Default white viewport works for logos designed on white (UCI). Logos
    // that ship with their own dark background (Medusa) override via
    // project.imgBackground so the viewport doesn't frame them in white.
    background: project.imgBackground || "#fafafa",
    borderBottom: "1px solid rgba(63,63,70,.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  };

  return (
    <div style={card}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${stage.accent}, ${stage.accentLight}, transparent)` }} />

      {project.image && (
        <div style={imgViewport}>
          <img src={project.image} alt={`${project.title} logo`} style={imgStyle} loading="lazy" />
        </div>
      )}

      <div style={titleBlock}>
        <span style={stageBadge}>{stage.badgeLabel}</span>
        <h3 style={{ marginTop: 12, fontSize: 26, fontWeight: 800, color: "#fafafa", letterSpacing: -0.5 }}>
          {project.title}
          {project.fullName && (
            <span style={{ marginLeft: 10, fontSize: 14, fontWeight: 500, color: "#71717a", letterSpacing: 0 }}>
              {project.fullName}{liveVersion ? ` ${liveVersion}` : ""}
            </span>
          )}
        </h3>
        <p style={{ marginTop: 8, fontSize: 14, fontWeight: 600, color: stage.accentLight, lineHeight: 1.5 }}>
          {project.tagline}
        </p>
      </div>

      <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ margin: 0, color: "#d4d4d8", lineHeight: 1.6, fontSize: 14 }}>
          {project.blurb}
        </p>

        {project.features?.length > 0 && (
          <ul style={{ marginTop: 18, marginBottom: 0, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            {project.features.map((f) => (
              <li key={f} style={featureItem}>
                <span style={{ position: "absolute", left: 0, color: stage.accentLight }}>—</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {project.tags?.length > 0 && (
          <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tags.map((t) => (
              <span key={t} style={tagStyle}>{t}</span>
            ))}
          </div>
        )}

        {stats && (
          <div style={statsRow}>
            {stats.loc > 0 && (
              <span><strong style={{ color: "#d4d4d8" }}>{formatBigNumber(stats.loc)}</strong> LOC</span>
            )}
            {stats.tests > 0 && (
              <>
                <span style={{ color: "#3f3f46" }}>·</span>
                <span><strong style={{ color: "#d4d4d8" }}>{formatBigNumber(stats.tests)}</strong> tests</span>
              </>
            )}
            {stats.commits > 0 && (
              <>
                <span style={{ color: "#3f3f46" }}>·</span>
                <span><strong style={{ color: "#d4d4d8" }}>{stats.commits}</strong> commits</span>
              </>
            )}
            {stats.prs?.merged > 0 && (
              <>
                <span style={{ color: "#3f3f46" }}>·</span>
                <span><strong style={{ color: "#d4d4d8" }}>{stats.prs.merged}</strong> PRs</span>
              </>
            )}
          </div>
        )}

        {project.link && (
          <div style={{ marginTop: 18 }}>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              style={{ color: stage.accentLight, fontWeight: 600, fontSize: 14, textDecoration: "none" }}
            >
              {project.linkLabel || "Learn more"} →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function StageSection({ stageKey, items, statsBySlug }) {
  if (items.length === 0) return null;
  const stage = STAGES[stageKey];
  return (
    <section id={`pipeline-${stageKey}`} style={{ background: "transparent", color: "#fafafa", padding: "48px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>{stage.title}</h2>
          <span style={{ fontSize: 14, color: "#71717a" }}>{stage.subtitle}</span>
        </div>

        <div style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}>
          {items.map((p) => (
            <PipelineCard
              key={`${stageKey}-${p.title}`}
              project={p}
              stats={p.slug ? statsBySlug[p.slug] : null}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Pipeline section — work-in-progress projects grouped by stage.
 * Beta = limited-access live testing; In Development = pre-Beta build.
 * Each stage section auto-hides if its list is empty.
 */
export default function Pipeline() {
  const [statsBySlug, setStatsBySlug] = useState({});

  useEffect(() => {
    fetch(MANIFEST_URL, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((manifest) => {
        if (!manifest?.projects) return;
        const map = {};
        for (const [slug, entry] of Object.entries(manifest.projects)) {
          if (entry.ok && entry.stats) map[slug] = entry.stats;
        }
        setStatsBySlug(map);
      })
      .catch(() => {});
  }, []);

  const beta = projects.filter((p) => p.stage === "beta");
  const dev = projects.filter((p) => p.stage === "dev");

  return (
    <>
      <StageSection stageKey="beta" items={beta} statsBySlug={statsBySlug} />
      <StageSection stageKey="dev" items={dev} statsBySlug={statsBySlug} />
    </>
  );
}
