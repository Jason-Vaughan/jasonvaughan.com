import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PERSONAS = {
  Recruiter: {
    label: "Recruiter / Hiring Manager",
    desc: "Focus on technical leadership, enterprise experience, and certifications.",
    sections: ["about", "certifications", "contact"],
  },
  Engineer: {
    label: "Software Engineer",
    desc: "Inspect open-source codebases, CLI architectures, and stack benchmarks.",
    sections: ["tangleclaw", "tanglebrain", "clawhub", "projects"],
  },
  EventPro: {
    label: "Event Professional",
    desc: "Explore signal flow, fiber systems, LED switchers, and broadcast experience.",
    sections: ["skills", "certifications", "writing"],
  },
  OpenClaw: {
    label: "OpenClaw Community",
    desc: "Track published agent tools, framework releases, and downloads.",
    sections: ["openclaw-fleet", "clawhub", "projects"],
  },
  Investor: {
    label: "Founder / Investor",
    desc: "Review subscription traction, SaaS products, and the pipeline roadmap.",
    sections: ["tilt", "cierre-sensei", "pipeline"],
  },
};

/**
 * Full-screen modal overlay that prompts the visitor to select a persona.
 */
export function PersonaOverlay({ onSelect }) {
  const backdrop = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(9, 9, 11, 0.92)",
    backdropFilter: "blur(16px)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  };

  const modal = {
    maxWidth: 500,
    width: "100%",
    background: "#18181b",
    border: "1px solid #27272a",
    borderRadius: 24,
    padding: 32,
    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  };

  const optionBtn = {
    width: "100%",
    padding: "16px 20px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 12,
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    color: "#fff",
    transition: "border-color 0.2s, background 0.2s",
  };

  return (
    <div style={backdrop}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={modal}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>What brings you here?</h2>
          <p style={{ color: "#71717a", fontSize: 14, marginTop: 8, marginBottom: 0 }}>
            Choose a mode to customize my portfolio layout and highlight the work that matters to you.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(PERSONAS).map(([key, info]) => (
            <motion.button
              key={key}
              onClick={() => onSelect(key)}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(251,191,36,0.06)", borderColor: "rgba(251,191,36,0.35)" }}
              whileTap={{ scale: 0.98 }}
              style={optionBtn}
            >
              <span style={{ fontWeight: 700, color: "#fbbf24", fontSize: 15 }}>{info.label}</span>
              <span style={{ color: "#a1a1aa", fontSize: 12.5, lineHeight: 1.4 }}>{info.desc}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Dropdown selector for the Header to allow visitors to toggle persona modes.
 */
export function PersonaDropdown({ current, onSelect }) {
  const [open, setOpen] = useState(false);

  const container = {
    position: "relative",
    display: "inline-block",
  };

  const trigger = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 16px",
    borderRadius: 12,
    background: "rgba(251, 191, 36, 0.08)",
    border: "1px solid rgba(251, 191, 36, 0.35)",
    color: "#fbbf24",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  };

  const menu = {
    position: "absolute",
    top: 44,
    right: 0,
    width: 280,
    background: "#18181b",
    border: "1px solid #27272a",
    borderRadius: 12,
    padding: 8,
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  };

  const itemStyle = (isActive) => ({
    width: "100%",
    padding: "10px 12px",
    background: isActive ? "rgba(251,191,36,0.12)" : "transparent",
    border: "none",
    borderRadius: 8,
    color: isActive ? "#fbbf24" : "#e4e4e7",
    fontSize: 13,
    fontWeight: isActive ? 700 : 500,
    textAlign: "left",
    cursor: "pointer",
    transition: "background 0.15s",
  });

  return (
    <div style={container} onMouseLeave={() => setOpen(false)}>
      <button style={trigger} onClick={() => setOpen(!open)}>
        <span>View: {PERSONAS[current]?.label || "Default"}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            style={menu}
          >
            {Object.entries(PERSONAS).map(([key, info]) => (
              <button
                key={key}
                onClick={() => {
                  onSelect(key);
                  setOpen(false);
                }}
                style={itemStyle(current === key)}
              >
                {info.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
