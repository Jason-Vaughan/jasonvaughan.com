import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ForksApiModal({ isOpen, onClose, gitStats }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const repoBreakdown = gitStats?.repoBreakdown || {
    TangleBrain: { forks: 5, stars: 0 },
    TangleClaw: { forks: 3, stars: 8 },
    "openclaw-google-oauth": { forks: 2, stars: 1 },
    Medusa: { forks: 1, stars: 0 },
    PortHub: { forks: 1, stars: 2 },
    "openclaw-ebay-seller": { forks: 1, stars: 0 },
    ClawBridge: { forks: 0, stars: 3 },
    CLiTS: { forks: 0, stars: 2 },
    refuctor: { forks: 0, stars: 2 }
  };

  const totalForks = gitStats?.totalForks ?? 13;
  const totalStars = gitStats?.totalStars ?? 19;

  const curlCommand = `curl -s "https://api.github.com/users/Jason-Vaughan/repos" | jq '.[] | select(.forks_count > 0 or .stargazers_count > 0) | {name, forks: .forks_count, stars: .stargazers_count}'`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div 
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(8px)"
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: 16,
            padding: 28,
            maxWidth: 580,
            width: "100%",
            boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            color: "#f4f4f5",
            maxHeight: "90vh",
            overflowY: "auto"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🍴</span>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#fff" }}>
                  GitHub Repos, Forks & REST API
                </h3>
                <span style={{ fontSize: 12, color: "#fbbf24", fontWeight: 600 }}>
                  {totalForks} Total Repo Forks · {totalStars} Total Stars
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                color: "#71717a",
                fontSize: 20,
                cursor: "pointer"
              }}
            >
              ✕
            </button>
          </div>

          <p style={{ fontSize: 13, color: "#a1a1aa", marginTop: 0, marginBottom: 18, lineHeight: 1.5 }}>
            Forks indicate active developer adoption, cloning, and downstream architecture integrations across Jason's open-source projects.
          </p>

          {/* Repos Table Breakdown */}
          <div style={{ background: "#09090b", border: "1px solid #27272a", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", padding: "10px 16px", background: "#18181b", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "#71717a" }}>
              <span>Repository</span>
              <span>Forks 🍴</span>
              <span>Stars ⭐</span>
            </div>

            {Object.entries(repoBreakdown)
              .filter(([_, stats]) => stats.forks > 0 || stats.stars > 0)
              .map(([repoName, stats]) => (
                <div 
                  key={repoName}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr 1fr",
                    padding: "10px 16px",
                    borderTop: "1px solid #18181b",
                    fontSize: 13,
                    alignItems: "center"
                  }}
                >
                  <a
                    href={`https://github.com/Jason-Vaughan/${repoName}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#fbbf24", fontWeight: 700, textDecoration: "none" }}
                  >
                    {repoName} ↗
                  </a>
                  <span style={{ fontWeight: 700, color: stats.forks > 0 ? "#34d399" : "#71717a" }}>
                    {stats.forks} forks
                  </span>
                  <span style={{ fontWeight: 700, color: stats.stars > 0 ? "#fbbf24" : "#71717a" }}>
                    {stats.stars} stars
                  </span>
                </div>
              ))}
          </div>

          {/* GitHub REST API Developer Section */}
          <div style={{ background: "rgba(251, 191, 36, 0.06)", border: "1px solid rgba(251, 191, 36, 0.25)", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#fbbf24" }}>
                💻 GitHub REST API (Custom Scripting)
              </span>
              <button
                onClick={handleCopy}
                style={{
                  background: "#09090b",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {copied ? "✓ Copied!" : "📋 Copy cURL"}
              </button>
            </div>
            
            <p style={{ fontSize: 12, color: "#d4d4d8", marginTop: 0, marginBottom: 8, lineHeight: 1.4 }}>
              Query raw repository data programmatically across all projects using the GitHub REST API:
            </p>

            <pre style={{
              background: "#09090b",
              border: "1px solid #27272a",
              borderRadius: 8,
              padding: 12,
              fontSize: 11.5,
              color: "#4ade80",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              margin: 0,
              fontFamily: "monospace"
            }}>
              {curlCommand}
            </pre>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
