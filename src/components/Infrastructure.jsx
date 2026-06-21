import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatBigNumber } from "../utils/format";
import ShareLink from "./ShareLink";

// Monad-1 stats are published directly to project-assets by a small agent
// running on the Monad-1 box (writes monad-stats.json, commits, pushes).
// Separate from the centralized collector manifest because:
//   - Monad-1 is the source of truth (token counts, GPU state, uptime —
//     things only the box itself knows)
//   - Lets Monad-1 update independently of the hourly collector cron
//   - The collector still picks up Monad-1's repo for first-commit / commit
//     count if useful elsewhere
// Monad-1 stats URL + the list of OpenClaw agents that self-publish their
// own token telemetry are kept in src/data/openclaw-sources.js so the same
// list drives both the Monad-1 card aggregation here AND the top-bar
// BuilderStats AI Tokens tile. Add new agents in one place, both update.
import { MONAD_STATS_URL, OPENCLAW_AGENT_STATS_URLS, readTokenScalar } from "../data/openclaw-sources";

/**
 * Format a USD amount as "$1,234" or "$1.2K" or "$1.2M" depending on scale.
 */
function formatUSD(n) {
  if (typeof n !== "number" || !isFinite(n)) return "—";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

/**
 * Infrastructure section — systems and hardware that power the work.
 * Hand-curated cards (not manifest-driven the way Projects.jsx is) because
 * the value lives in hardware specs + live operational data, not LOC counts.
 * First card: Monad-1 (local AI inference rig). More to come over time.
 */
export default function Infrastructure() {
  const [monadStats, setMonadStats] = useState(null);
  // Legacy OpenClaw-agent token aggregation. Now a no-op: OPENCLAW_AGENT_STATS_URLS
  // is empty by design because routed agents (Volta, etc.) are already inside
  // Monad's published tokens.total (LiteLLM + Ollama tee) — summing them here
  // double-counted the rig. Kept wired so a future *standalone* source could slot
  // in, but the Monad card now shows Monad's own number only. See openclaw-sources.js.
  const [openclawTokenSum, setOpenclawTokenSum] = useState(null);

  useEffect(() => {
    fetch(MONAD_STATS_URL, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setMonadStats(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled(
      OPENCLAW_AGENT_STATS_URLS.map((s) =>
        fetch(s.url, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)),
      ),
    ).then((results) => {
      if (cancelled) return;
      const acc = { total: 0, last24h: 0, last7d: 0, sourcesCounted: 0 };
      for (const r of results) {
        if (r.status !== "fulfilled" || !r.value) continue;
        const t = r.value.tokens;
        if (!t) continue;
        acc.total   += readTokenScalar(t.total);
        acc.last24h += readTokenScalar(t.last24h);
        acc.last7d  += readTokenScalar(t.last7d);
        acc.sourcesCounted += 1;
      }
      if (acc.sourcesCounted > 0) {
        setOpenclawTokenSum(acc);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const accent = "#10b981";       // emerald — fresh, "operational" feel
  const accentLight = "#34d399";
  const dark = "#18181b";
  const border = "#27272a";

  const section = { background: "transparent", color: "#fafafa", padding: "48px 0" };
  const wrap = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
  const h2Style = { fontSize: 32, fontWeight: 800, letterSpacing: -0.5 };
  const subhead = { fontSize: 14, color: "#71717a" };

  const card = {
    borderRadius: 16,
    border: `1px solid ${border}`,
    background: dark,
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
    overflow: "hidden",
  };

  const heroPhrase = {
    fontSize: 11,
    fontWeight: 700,
    color: accentLight,
    textTransform: "uppercase",
    letterSpacing: 2,
  };

  const liveDot = {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: accent,
    marginRight: 6,
    boxShadow: `0 0 8px ${accent}`,
    verticalAlign: "middle",
    animation: "monad-pulse 2s ease-in-out infinite",
  };

  const statRow = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 14,
  };

  const statCell = (color = accentLight) => ({
    padding: "10px 12px",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${border}`,
    borderRadius: 10,
  });
  const statValue = (color = accentLight) => ({
    fontSize: 18,
    fontWeight: 800,
    color,
    lineHeight: 1.1,
  });
  const statLabel = {
    fontSize: 10,
    fontWeight: 600,
    color: "#71717a",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 4,
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

  // Safe getters with fallbacks for when monad-stats.json hasn't been
  // published yet (graceful degrade — show specs, hide live numbers).
  // Token totals = the Monad publisher's tokens.total, which already counts all
  // routed agent traffic (LiteLLM + Ollama tee). The openclawTokenSum add-on is
  // 0 now (OPENCLAW_AGENT_STATS_URLS is empty by design — it double-counted), but
  // the term is left in so a future standalone source could contribute.
  const monadTokensTotal = monadStats?.tokens?.total;
  const monadTokensToday = monadStats?.tokens?.last24h;
  const tokensLifetime =
    typeof monadTokensTotal === "number" || openclawTokenSum
      ? (monadTokensTotal || 0) + (openclawTokenSum?.total || 0)
      : undefined;
  const tokensToday =
    typeof monadTokensToday === "number" || openclawTokenSum
      ? (monadTokensToday || 0) + (openclawTokenSum?.last24h || 0)
      : undefined;
  const costSavedLifetime = monadStats?.costSaved?.estimated;
  const sustainedTokPerS = monadStats?.throughput?.tokensPerSec;
  const requestsLifetime = monadStats?.requests?.lifetime;
  // Model list — three contract layers, all read with graceful fallback:
  //   - availableModels (newest): every model installed on the box, each with
  //     a `resident: true|false` flag for whether it's currently loaded in VRAM
  //   - currentModels (mid-era): array of currently-loaded models only
  //   - currentModel (oldest, singular): the active chat model only
  // We prefer availableModels when present (it's a strict superset); the
  // resident flag on each entry tells us which are "loaded" vs "cold".
  const availableModels = Array.isArray(monadStats?.availableModels)
    ? monadStats.availableModels
    : null;
  const currentModels = Array.isArray(monadStats?.currentModels)
    ? monadStats.currentModels
    : (monadStats?.currentModel ? [monadStats.currentModel] : []);
  // Render source: availableModels (with synthesized resident flags from
  // currentModels membership if availableModels is missing the field for any
  // entry) takes precedence. Falls back to currentModels treated as all-resident.
  const modelList = availableModels && availableModels.length > 0
    ? availableModels.map((m) => ({
        ...m,
        resident: typeof m.resident === "boolean"
          ? m.resident
          : currentModels.some((c) => c.name === m.name),
      }))
    : currentModels.map((m) => ({ ...m, resident: true }));
  const residentCount = modelList.filter((m) => m.resident).length;
  const gpuTempC = monadStats?.gpu?.temp;
  const gpuUtilization = monadStats?.gpu?.utilization;
  const gpuPowerDraw = monadStats?.gpu?.powerDraw;
  const techStack = monadStats?.stack || [
    "Bare-Metal Ollama",
    "Ubuntu 24.04",
    "Tailscale Tailnet",
    "NVIDIA Blackwell",
  ];
  const modelsHistory = monadStats?.modelsHistory || [];

  // Tracking-window length — deliberately NOT kernel uptime. A real
  // poweroff (planned maintenance, hardware swap) resets uptime.daysOnline
  // to 0 and made the tile look like a regression to casual viewers. The
  // "Planned availability" tile already carries the operational truth;
  // "tracked" answers the simpler question "how long have we been watching
  // this box?" without overlapping with that claim. uptime.daysOnline and
  // uptime.lastReboot remain in the JSON for future use.

  // Planned-outage tracking — additive contract fields from the publisher.
  // All three are co-dependent: if any are missing the tile + footer hide
  // gracefully (same behavior as if the JSON predates the May-19 contract).
  const trackedSince = monadStats?.uptime?.trackedSince;
  const plannedOutages = monadStats?.uptime?.plannedOutages;
  const plannedDowntimeSeconds = monadStats?.uptime?.plannedDowntimeSeconds;

  // Tracking-window length, formatted for the tile + header. Falls back to
  // hours during the first 24h after a fresh publisher install so day-0
  // doesn't render as "0 days".
  let trackedText = null;
  if (trackedSince) {
    const trackedMs = Date.now() - new Date(trackedSince).getTime();
    const trackedDays = Math.floor(trackedMs / 86400000);
    if (trackedDays >= 1) {
      trackedText = trackedDays === 1 ? "1 day" : `${trackedDays} days`;
    } else {
      const trackedHours = Math.max(0, Math.floor(trackedMs / 3600000));
      trackedText = trackedHours === 1 ? "1 hour" : `${trackedHours} hours`;
    }
  }

  let availabilityText = null;
  let availabilityTitle = null;
  if (
    trackedSince &&
    typeof plannedDowntimeSeconds === "number" &&
    Array.isArray(plannedOutages)
  ) {
    const trackedMs = Date.now() - new Date(trackedSince).getTime();
    const trackedSec = Math.max(1, trackedMs / 1000);
    const ratio = Math.max(0, (trackedSec - plannedDowntimeSeconds) / trackedSec);
    availabilityText = `${(ratio * 100).toFixed(1)}%`;
    const sinceLabel = new Date(trackedSince).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const n = plannedOutages.length;
    availabilityTitle = `Since ${sinceLabel} · ${n} planned outage${n === 1 ? "" : "s"} logged`;
  }

  let lastOutageText = null;
  if (Array.isArray(plannedOutages) && plannedOutages.length > 0) {
    const last = plannedOutages[plannedOutages.length - 1];
    const durMin = Math.round(last.durationSeconds / 60);
    let durStr;
    if (durMin >= 60) {
      const h = Math.floor(durMin / 60);
      const m = durMin % 60;
      durStr = m > 0 ? `${h}h ${m}m` : `${h}h`;
    } else {
      durStr = `${durMin} min`;
    }
    const dateLabel = new Date(last.start).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    const countSuffix = plannedOutages.length > 1
      ? ` (${plannedOutages.length} logged)`
      : "";
    lastOutageText = `Last planned outage: ${durStr} on ${dateLabel} (${last.reason})${countSuffix}`;
  }

  // Relative timestamp for "Stats updated" footer — "just now" / "X min ago" /
  // "X hr ago" / fall back to absolute date for anything > 24h old. Reads
  // fresher than a raw locale string, and a stale value becomes immediately
  // visible if the publisher cron breaks.
  let updatedRelative = null;
  if (monadStats?.updatedAt) {
    const updatedMs = new Date(monadStats.updatedAt).getTime();
    const diffSec = Math.max(0, Math.floor((Date.now() - updatedMs) / 1000));
    if (diffSec < 60) updatedRelative = "just now";
    else if (diffSec < 3600) {
      const m = Math.floor(diffSec / 60);
      updatedRelative = `${m} minute${m === 1 ? "" : "s"} ago`;
    } else if (diffSec < 86400) {
      const h = Math.floor(diffSec / 3600);
      updatedRelative = `${h} hour${h === 1 ? "" : "s"} ago`;
    } else {
      updatedRelative = new Date(monadStats.updatedAt).toLocaleDateString();
    }
  }

  return (
    <section id="research" style={section}>
      <style>{`@keyframes monad-pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }`}</style>
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h2 style={h2Style}>Current Research</h2>
          <span style={subhead}>Active investigations and the systems that power them</span>
        </div>

        {/* Monad-1 card */}
        <motion.div
          id="monad-1"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{ ...card, marginTop: 24, scrollMarginTop: 24 }}
        >
          {/* Accent gradient bar */}
          <div style={{ height: 4, background: `linear-gradient(90deg, ${accent}, ${accentLight}, transparent)` }} />

          <div style={{ padding: 28 }}>
            <div style={heroPhrase}>Local-First AI Inference</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 30, fontWeight: 800, color: "#fafafa", margin: 0, letterSpacing: -0.5 }}>
                Monad-1
              </h3>
              <span style={{ fontSize: 13, color: accentLight, fontWeight: 600 }}>
                <span style={liveDot} />Active
                {trackedText && <span style={{ color: "#71717a", fontWeight: 400 }}> · {trackedText} tracked</span>}
              </span>
            </div>
            <p style={{ marginTop: 8, marginBottom: 0, fontSize: 14, color: "#a1a1aa", lineHeight: 1.6 }}>
              Self-hosted GPU inference for the OpenClaw fleet — bare-metal Ollama serving large
              language models over Tailscale. No cloud round-trip, no per-token bill, no rate limit.
            </p>

            {/* Live stats — render only the fields that are populated.
                Token-tracking stats land once LiteLLM is in place; until then
                the banner below explains the gap. */}
            <div style={{ marginTop: 20, ...statRow }}>
              {requestsLifetime != null && (
                <div style={statCell()}>
                  <div style={statValue()}>{formatBigNumber(requestsLifetime)}</div>
                  <div style={statLabel}>Inference requests served</div>
                </div>
              )}
              {trackedText && (
                <div style={statCell()}>
                  <div style={{ ...statValue(), fontSize: 15 }}>{trackedText}</div>
                  <div style={statLabel}>Tracked</div>
                </div>
              )}
              {availabilityText && (
                <div style={statCell()} title={availabilityTitle}>
                  <div style={statValue()}>{availabilityText}</div>
                  <div style={statLabel}>Planned availability</div>
                </div>
              )}
              {gpuTempC != null && (
                <div style={statCell()}>
                  <div style={statValue()}>{gpuTempC}°C</div>
                  <div style={statLabel}>GPU temp (live)</div>
                </div>
              )}
              {gpuUtilization != null && (
                <div style={statCell()}>
                  <div style={statValue()}>{gpuUtilization}%</div>
                  <div style={statLabel}>GPU utilization</div>
                </div>
              )}
              {gpuPowerDraw != null && (
                <div style={statCell()}>
                  <div style={statValue()}>{Math.round(gpuPowerDraw)}W</div>
                  <div style={statLabel}>GPU power draw</div>
                </div>
              )}
              {tokensLifetime != null && (
                <div style={statCell()}>
                  <div style={statValue()}>{formatBigNumber(tokensLifetime)}</div>
                  <div style={statLabel}>Tokens served (lifetime)</div>
                </div>
              )}
              {/* Hide the cost-avoided tile when it rounds to $0 — early-life
                  LiteLLM with a few hundred tokens served shows "$0" which
                  reads weaker than not showing the tile at all. Re-appears
                  automatically once enough inference accumulates to clear $1. */}
              {typeof costSavedLifetime === "number" && costSavedLifetime >= 1 && (
                <div style={statCell()}>
                  <div style={statValue("#fbbf24")}>{formatUSD(costSavedLifetime)}</div>
                  <div style={statLabel}>Est. cloud cost avoided</div>
                </div>
              )}
              {sustainedTokPerS != null && (
                <div style={statCell()}>
                  <div style={statValue()}>{sustainedTokPerS.toFixed(1)} tok/s</div>
                  <div style={statLabel}>Sustained eval throughput</div>
                </div>
              )}
              {tokensToday != null && (
                <div style={statCell()}>
                  <div style={statValue()}>{formatBigNumber(tokensToday)}</div>
                  <div style={statLabel}>Tokens today</div>
                </div>
              )}
            </div>

            {/* "Coming soon" banner for the LiteLLM-dependent stats.
                Shows whenever ANY of {tokensLifetime, costSavedLifetime,
                sustainedTokPerS} is null. Once LiteLLM is integrated on
                Monad-1 and those fields populate, this banner disappears
                automatically — no portfolio change required. */}
            {(tokensLifetime == null || costSavedLifetime == null || sustainedTokPerS == null) && (
              <div style={{
                marginTop: 14,
                padding: "10px 14px",
                background: "rgba(251,191,36,0.06)",
                border: "1px dashed rgba(251,191,36,0.3)",
                borderRadius: 8,
                fontSize: 12,
                color: "#a1a1aa",
                lineHeight: 1.5,
              }}>
                <span style={{ color: "#fbbf24", fontWeight: 700, marginRight: 6 }}>Coming soon:</span>
                Token accounting, cloud-cost-avoided, and sustained throughput land once the LiteLLM proxy is in place (planned alongside multi-GPU router work).
              </div>
            )}

            {/* Model library — every model installed on the box (via
                availableModels), with a "loaded" pill on the ones currently
                resident in VRAM. Falls back to currentModels treated as all-
                resident when availableModels isn't published. The cold/loaded
                visual distinction is forward-looking: as more models are
                installed, the inventory tells the bigger story. */}
            {modelList.length > 0 && (
              <div style={{
                marginTop: 18,
                padding: "12px 14px",
                background: "rgba(16,185,129,0.06)",
                border: `1px solid rgba(16,185,129,0.2)`,
                borderRadius: 10,
                fontSize: 13,
                color: "#d4d4d8",
              }}>
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: accent,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexWrap: "wrap",
                }}>
                  <span>Installed models</span>
                  <span style={{ color: "#71717a", fontWeight: 600, letterSpacing: 0.5 }}>
                    · {residentCount} loaded / {modelList.length} installed
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {modelList.map((m, idx) => (
                    <div
                      key={m.name + idx}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                        flexWrap: "wrap",
                        opacity: m.resident ? 1 : 0.7,
                      }}
                    >
                      {m.resident ? (
                        <span style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: accentLight,
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          padding: "2px 7px",
                          borderRadius: 9999,
                          background: "rgba(16,185,129,0.12)",
                          border: "1px solid rgba(16,185,129,0.3)",
                        }}>
                          ● Loaded{m.role ? ` · ${m.role}` : ""}
                        </span>
                      ) : (
                        <span style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: "#71717a",
                          textTransform: "uppercase",
                          letterSpacing: 1,
                          padding: "2px 7px",
                          borderRadius: 9999,
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}>
                          ○ Cold{m.role ? ` · ${m.role}` : ""}
                        </span>
                      )}
                      <span style={{ fontWeight: 700, color: m.resident ? "#fafafa" : "#d4d4d8" }}>
                        {m.name}
                      </span>
                      {m.precision && (
                        <span style={{ color: "#71717a" }}>· {m.precision}</span>
                      )}
                      {m.size && (
                        <span style={{ color: "#71717a" }}>· {m.size}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hardware specs */}
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
                Hardware
              </div>
              <div style={statRow}>
                <div style={statCell()}>
                  <div style={{ ...statValue(), fontSize: 15 }}>RTX PRO 6000</div>
                  <div style={statLabel}>96 GiB VRAM · Blackwell</div>
                </div>
                <div style={statCell()}>
                  <div style={{ ...statValue(), fontSize: 15 }}>Threadripper 9970X</div>
                  <div style={statLabel}>32C / 64T · AMD</div>
                </div>
                <div style={statCell()}>
                  <div style={{ ...statValue(), fontSize: 15 }}>251 GiB RAM</div>
                  <div style={statLabel}>ECC · DDR5</div>
                </div>
              </div>
            </div>

            {/* Models tested / history */}
            {modelsHistory.length > 0 && (
              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
                  Models tested
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {modelsHistory.map((m) => (
                    <span key={m} style={tagStyle}>{m}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Tech stack */}
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>
                Tech stack
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {techStack.map((t) => (
                  <span key={t} style={tagStyle}>{t}</span>
                ))}
              </div>
            </div>

            {/* Footer note */}
            <div style={{ marginTop: 18, fontSize: 12, color: "#52525b", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
              <div>
                {lastOutageText && (
                  <div style={{ marginBottom: 6 }}>{lastOutageText}</div>
                )}
                Private repo — internal infrastructure. {updatedRelative && (
                  <span title={new Date(monadStats.updatedAt).toLocaleString()}>
                    Stats updated {updatedRelative}.
                  </span>
                )}
              </div>
              <ShareLink id="monad-1" />
            </div>
          </div>
        </motion.div>

        {/* Confidential Research — redacted-document teaser */}
        <motion.div
          id="confidential-research"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            ...card,
            marginTop: 20,
            scrollMarginTop: 24,
            // Lighter inside (zinc-700 → zinc-800) so the pure-black redaction
            // bars actually pop. Original was darker than the surrounding cards
            // which made black-on-near-black redactions invisible.
            background: "linear-gradient(135deg, #3f3f46 0%, #27272a 100%)",
            borderColor: "#52525b",
            position: "relative",
          }}
        >
          {/* Top "CLASSIFIED" stamp */}
          <div style={{
            position: "absolute",
            top: 16,
            right: 20,
            padding: "3px 10px",
            border: "2px solid #dc2626",
            color: "#dc2626",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 3,
            transform: "rotate(8deg)",
            opacity: 0.85,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}>
            CLASSIFIED
          </div>

          <div style={{ padding: "28px 32px" }}>
            <div style={{ ...heroPhrase, color: "#a1a1aa" }}>Confidential Research</div>
            <h3 style={{ marginTop: 8, fontSize: 24, fontWeight: 800, color: "#fafafa", letterSpacing: -0.3 }}>
              Undisclosed AI projects
            </h3>

            {/* Redacted lines */}
            <div style={{ marginTop: 14, lineHeight: 2, fontSize: 14, color: "#a1a1aa" }}>
              <div>
                Active engagement with{" "}
                <span style={{
                  display: "inline-block",
                  background: "#000",
                  color: "transparent",
                  borderRadius: 2,
                  padding: "0 6px",
                  userSelect: "none",
                }}>
                  ████████████████
                </span>{" "}
                on{" "}
                <span style={{
                  display: "inline-block",
                  background: "#000",
                  color: "transparent",
                  borderRadius: 2,
                  padding: "0 6px",
                  userSelect: "none",
                }}>
                  █████████████████████
                </span>
                .
              </div>
              <div>
                Recent work:{" "}
                <span style={{
                  display: "inline-block",
                  background: "#000",
                  color: "transparent",
                  borderRadius: 2,
                  padding: "0 6px",
                  userSelect: "none",
                }}>
                  ██████████████████████████
                </span>{" "}
                ·{" "}
                <span style={{
                  display: "inline-block",
                  background: "#000",
                  color: "transparent",
                  borderRadius: 2,
                  padding: "0 6px",
                  userSelect: "none",
                }}>
                  ████████████████
                </span>
                .
              </div>
            </div>

            <div style={{
              marginTop: 18,
              padding: "14px 16px",
              background: "rgba(220, 38, 38, 0.06)",
              border: "1px solid rgba(220, 38, 38, 0.2)",
              borderRadius: 10,
            }}>
              <p style={{ margin: 0, fontSize: 13, color: "#d4d4d8", lineHeight: 1.6 }}>
                <strong style={{ color: "#fafafa" }}>Available for vetted introductions.</strong>{" "}
                Direct consultation on AI research, infrastructure design, or applied LLM work — under NDA only.
              </p>
              <p style={{ margin: "12px 0 0" }}>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  style={{
                    display: "inline-block",
                    padding: "8px 18px",
                    borderRadius: 8,
                    background: "transparent",
                    border: "1px solid #dc2626",
                    color: "#fca5a5",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Contact under NDA →
                </a>
              </p>
            </div>

            <div style={{ marginTop: 14, textAlign: "right" }}>
              <ShareLink id="confidential-research" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
