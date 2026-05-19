import React from "react";
import { motion } from "framer-motion";
import ShareLink from "./ShareLink";

/**
 * Writing & Research section — long-form papers and policy proposals
 * hosted at /writing/<slug>/. Each paper card is a JSX entry below;
 * the actual paper renders on its own static page (see public/writing/).
 * Designed to scale to multiple papers over time (Genesis docs incoming).
 */
const papers = [
  {
    slug: "recall-ledger",
    title: "The Recall Ledger",
    tagline:
      "An open, neutral coordination network for U.S. food safety recalls.",
    excerpt:
      "Food recalls remain a structural failure of the U.S. food supply chain — $1.92B in direct annual costs, 422 events in 2024, and a notification system that hasn't meaningfully evolved since the 1970s. The proposed Recall Ledger is a federated, tamper-evident coordination network built around a 501(c)(6) industry consortium, positioned as the implementation layer for FSMA 204 compliance ahead of the July 2028 deadline.",
    status: "Working draft · v2",
    statusColor: "#10b981",
    date: "May 17, 2026",
    tags: ["Food safety", "FSMA 204", "Coordination networks", "Public-ledger notarization", "501(c)(6)"],
    href: "/writing/recall-ledger/",
  },
];

export default function Writing() {
  const accent = "#f59e0b";
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
    padding: 28,
  };

  const tag = {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 9999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#a1a1aa",
  };

  return (
    <section id="writing" style={section}>
      <div style={wrap}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h2 style={h2Style}>Writing &amp; Research</h2>
          <span style={subhead}>Long-form research and policy proposals</span>
        </div>

        <div style={{ display: "grid", gap: 20, marginTop: 24 }}>
          {papers.map((p, idx) => (
            <motion.a
              key={p.slug}
              id={p.slug}
              href={p.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              style={{
                ...card,
                display: "block",
                textDecoration: "none",
                color: "inherit",
                scrollMarginTop: 24,
                transition: "transform 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = border;
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: 2 }}>
                    White paper
                  </div>
                  <h3 style={{ margin: "6px 0 0", fontSize: 26, fontWeight: 800, color: "#fafafa", letterSpacing: -0.4 }}>
                    {p.title}
                  </h3>
                </div>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: 9999,
                  background: "rgba(16,185,129,0.08)",
                  border: `1px solid ${p.statusColor}55`,
                  color: p.statusColor,
                  whiteSpace: "nowrap",
                }}>
                  {p.status}
                </div>
              </div>

              <p style={{ marginTop: 10, marginBottom: 14, fontSize: 15, color: "#d4d4d8", lineHeight: 1.5, fontWeight: 500 }}>
                {p.tagline}
              </p>
              <p style={{ margin: 0, fontSize: 14, color: "#a1a1aa", lineHeight: 1.65 }}>
                {p.excerpt}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {p.tags.map((t) => (
                  <span key={t} style={tag}>{t}</span>
                ))}
              </div>

              <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <span style={{ fontSize: 12, color: "#71717a" }}>Last revised: {p.date}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ShareLink id={p.slug} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: accent }}>
                    Read the full paper →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
