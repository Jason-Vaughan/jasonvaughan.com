import React from "react";
import { motion } from "framer-motion";
import { aboutData as d } from "../data/about";

export default function About({ visitorType, onDownloadResume }) {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    color: "#e4e4e7"
  };

  const grid2Col = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24
  };

  const card = {
    borderRadius: 16,
    border: "1px solid #3f3f46",
    background: "rgba(24, 24, 27, 0.6)",
    padding: 24,
    display: "flex",
    flexDirection: "column"
  };

  const titleStyle = {
    fontSize: 22,
    fontWeight: 700,
    color: "#fafafa",
    marginBottom: 16
  };

  const pill = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    padding: "3px 9px",
    borderRadius: 999,
    background: "rgba(245, 158, 11, 0.08)",
    color: "#fbbf24",
    border: "1px solid rgba(245, 158, 11, 0.25)"
  };

  const timelineRow = {
    display: "flex",
    gap: 16,
    padding: "12px 0",
    borderBottom: "1px solid rgba(63, 63, 70, 0.3)"
  };

  const timelineYear = {
    fontWeight: 800,
    color: "#fbbf24",
    fontSize: 15,
    minWidth: 50
  };

  const triggerChat = () => {
    window.dispatchEvent(new CustomEvent("open-portfolio-chat"));
  };

  return (
    <div style={containerStyle}>
      {/* 1. Hero Block */}
      <div style={{ ...card, background: "linear-gradient(135deg, rgba(24,24,27,0.85) 0%, rgba(9,9,11,0.95) 100%)", border: "1px solid rgba(251, 191, 36, 0.25)" }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
          {d.hero.title}
        </h3>
        <p style={{ marginTop: 12, color: "#a1a1aa", fontSize: 15, lineHeight: 1.6 }}>
          {d.hero.subtitle}
        </p>
        {visitorType === "Recruiter" && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onDownloadResume();
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 16,
              padding: "8px 18px",
              borderRadius: 8,
              background: "rgba(251, 191, 36, 0.1)",
              border: "1px solid rgba(251, 191, 36, 0.4)",
              color: "#fbbf24",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              alignSelf: "flex-start",
              transition: "background 0.15s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(251,191,36,0.18)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(251,191,36,0.1)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download PDF Resume
          </a>
        )}
      </div>

      {/* 2. My Story & AI Interview Callout */}
      <div style={grid2Col}>
        <div style={card}>
          <h4 style={titleStyle}>My Story</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {d.story.map((p, idx) => (
              <p key={idx} style={{ color: "#d4d4d8", fontSize: 14, lineHeight: 1.6 }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* AI Interview Widget */}
          <div style={{
            ...card,
            background: "linear-gradient(135deg, rgba(245,158,11,0.04) 0%, rgba(217,119,6,0.08) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.3)",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 32,
            gap: 16
          }}>
            <span style={{ fontSize: 32 }}>🤖</span>
            <div>
              <h5 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fbbf24" }}>Interview My AI Assistant</h5>
              <p style={{ margin: "8px 0 0", color: "#a1a1aa", fontSize: 13, lineHeight: 1.5 }}>
                Ask me about my TPM experience at Google, my live broadcast skills, or my project design choices. My AI has been fully grounded in my career history.
              </p>
            </div>
            <motion.button
              onClick={triggerChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                border: "none",
                color: "#000",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(217, 119, 6, 0.2)"
              }}
            >
              Start AI Interview
            </motion.button>
          </div>

          {/* Philosophy Section */}
          <div style={card}>
            <h4 style={titleStyle}>Philosophy</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {d.philosophy.map((item, idx) => (
                <div key={idx}>
                  <div style={{ fontWeight: 600, color: "#fbbf24", fontSize: 13.5 }}>{item.question}</div>
                  <div style={{ color: "#a1a1aa", fontSize: 13, marginTop: 4, lineHeight: 1.45 }}>{item.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Four Pillars */}
      <div>
        <h4 style={{ ...titleStyle, marginBottom: 20 }}>What I Do</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {d.pillars.map((pillar) => (
            <div key={pillar.title} style={{ ...card, padding: 20, gap: 12 }}>
              <h5 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#fafafa" }}>{pillar.title}</h5>
              <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13, lineHeight: 1.5, flexGrow: 1 }}>{pillar.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {pillar.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#a1a1aa"
                  }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Timeline & Personal */}
      <div style={grid2Col}>
        {/* Timeline */}
        <div style={card}>
          <h4 style={titleStyle}>Milestones</h4>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {d.timeline.map((item, idx) => (
              <div key={idx} style={timelineRow}>
                <span style={timelineYear}>{item.year}</span>
                <span style={{ color: "#d4d4d8", fontSize: 13.5, lineHeight: 1.45 }}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Personal */}
          <div style={card}>
            <h4 style={titleStyle}>Personal</h4>
            <ul style={{ margin: 0, paddingLeft: 20, color: "#d4d4d8", fontSize: 13.5, display: "flex", flexDirection: "column", gap: 8 }}>
              {d.personal.map((p, idx) => (
                <li key={idx} style={{ lineHeight: 1.5 }}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Next */}
          <div style={{ ...card, border: "1px solid rgba(16, 185, 129, 0.25)", background: "rgba(16, 185, 129, 0.03)" }}>
            <h4 style={{ ...titleStyle, color: "#10b981", fontSize: 18, marginBottom: 8 }}>What's Next</h4>
            <p style={{ margin: 0, color: "#a1a1aa", fontSize: 13.5, lineHeight: 1.5 }}>
              {d.next}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
