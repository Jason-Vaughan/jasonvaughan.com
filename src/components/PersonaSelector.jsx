import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PERSONAS = {
  Recruiter: {
    label: "Recruiter Mode",
    bannerText: "Welcome! It looks like you're evaluating Jason professionally. We've highlighted his experience, certifications, and resume to help you quickly assess his background.",
    sections: ["about", "career", "certifications", "contact"],
  },
  Engineer: {
    label: "Engineer Mode",
    bannerText: "Looks like you're interested in AI development. I've expanded Jason's engineering projects and the OpenClaw ecosystem.",
    sections: ["tangleclaw", "tanglebrain", "clawhub", "career", "projects"],
  },
  EventPro: {
    label: "Event Pro Mode",
    bannerText: "It looks like you're a live event or broadcast professional. I've highlighted Jason's signal routing, fiber systems, and production history.",
    sections: ["skills", "certifications", "career", "writing"],
  },
  OpenClaw: {
    label: "OpenClaw Mode",
    bannerText: "Looks like you're interested in the OpenClaw community. I've highlighted published agent tools, framework specs, and downloads.",
    sections: ["openclaw-fleet", "clawhub", "career", "projects"],
  },
  Investor: {
    label: "Investor / Founder",
    bannerText: "It looks like you're evaluating Jason's SaaS projects. I've highlighted active subscription metrics, products, and the pipeline roadmap.",
    sections: ["tilt", "cierre-sensei", "career", "pipeline"],
  },
};

/**
 * Infer the visitor persona based on referrer and landing query parameters.
 */
export function inferPersona() {
  if (typeof window === "undefined") return "";

  const referrer = (document.referrer || "").toLowerCase();
  const search = window.location.search.toLowerCase();
  
  // 1. Explicit query parameters (takes priority)
  if (search.includes("resume") || search.includes("hiring")) return "Recruiter";
  if (search.includes("tanglebrain") || search.includes("tangleclaw") || search.includes("code") || search.includes("developer")) return "Engineer";
  if (search.includes("barco") || search.includes("e2") || search.includes("event") || search.includes("instructor")) return "EventPro";
  if (search.includes("openclaw") || search.includes("clawhub")) return "OpenClaw";
  if (search.includes("saas") || search.includes("invest") || search.includes("cierre")) return "Investor";
  
  // 2. Referrer headers
  if (referrer.includes("linkedin.com")) return "Recruiter";
  if (referrer.includes("github.com")) return "Engineer";
  if (referrer.includes("clawhub.ai")) return "OpenClaw";
  
  // 3. Search Engine query terms (safeguard check if query keywords are passed in referrer/landing URL)
  if (referrer.includes("google.") || referrer.includes("bing.com") || referrer.includes("yahoo.com")) {
    if (search.includes("resume") || search.includes("cv")) return "Recruiter";
    if (search.includes("tangle") || search.includes("git")) return "Engineer";
    if (search.includes("barco") || search.includes("instructor") || search.includes("event")) return "EventPro";
  }
  
  return "";
}

/**
 * Dropdown selector to allow visitors to toggle persona modes.
 */
export function PersonaDropdown({ current, onSelect }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e) => {
      // Close dropdown if click is outside the data-persona-dropdown wrapper
      if (!e.target.closest("[data-persona-dropdown]")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [open]);

  const container = {
    position: "relative",
    display: "inline-block",
  };

  const trigger = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 12px",
    borderRadius: 8,
    background: current ? "rgba(0, 0, 0, 0.2)" : "rgba(251, 191, 36, 0.15)",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    color: current ? "#000" : "#fbbf24",
    fontSize: 12.5,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  };

  const menu = {
    position: "absolute",
    top: 36,
    right: 0,
    width: 200,
    background: "#18181b",
    border: "1px solid #27272a",
    borderRadius: 8,
    padding: 6,
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  };

  const itemStyle = (isActive) => ({
    width: "100%",
    padding: "8px 10px",
    background: isActive ? "rgba(251,191,36,0.12)" : "transparent",
    border: "none",
    borderRadius: 6,
    color: isActive ? "#fbbf24" : "#e4e4e7",
    fontSize: 12.5,
    fontWeight: isActive ? 700 : 500,
    textAlign: "left",
    cursor: "pointer",
    transition: "background 0.15s",
  });

  return (
    <div data-persona-dropdown="" style={container}>
      <button style={trigger} onClick={() => setOpen(!open)}>
        <span>{PERSONAS[current]?.label || "Personalize View ▾"}</span>
        {!current && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.1 }}
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
            {current && (
              <button
                onClick={() => {
                  onSelect("");
                  setOpen(false);
                }}
                style={{ ...itemStyle(false), color: "#f87171", borderTop: "1px solid #27272a", marginTop: 4, paddingTop: 8 }}
              >
                Reset to Default
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
