import React from "react";
import { careerData } from "../data/career";

import { useState } from "react";
export default function Career({ visitorType, expandableAfter = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const container = {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    color: "#e4e4e7"
  };

  const card = {
    borderRadius: 16,
    border: "1px solid #3f3f46",
    background: "rgba(24, 24, 27, 0.6)",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12
  };

  const headerRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 8,
    borderBottom: "1px solid rgba(63, 63, 70, 0.3)",
    paddingBottom: 12
  };

  const companyStyle = {
    fontSize: 18,
    fontWeight: 800,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap"
  };

  const roleStyle = {
    fontSize: 14.5,
    fontWeight: 600,
    color: "#fbbf24",
    marginTop: 4
  };

  const periodStyle = {
    fontSize: 13,
    fontWeight: 700,
    color: "#a1a1aa",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
  };

  const bulletList = {
    margin: 0,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    color: "#d4d4d8",
    fontSize: 13.5,
    lineHeight: 1.55
  };

  const badgeStyle = {
    fontSize: 9.5,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    padding: "2px 6px",
    borderRadius: 4,
    background: "rgba(251, 191, 36, 0.08)",
    border: "1px solid rgba(251, 191, 36, 0.25)",
    color: "#fbbf24"
  };

  return (
    <div style={container}>
      {(() => {
        let displayData = careerData;
        if (visitorType === "Inspyr") {
          // Sort for Inspyr mode: Google (0), Freelance (4), ACT (3), ASM (1), Independent Software (2), iPolis (5)
          const order = {
            "Google (Event Technology Team)": 1,
            "Freelance Live Event Specialist": 2,
            "ACT (American Conservatory Theater)": 3,
            "ASM Global (Moscone Center)": 4,
            "Independent Software & AI Builder": 5,
            "iPolis Webcasting": 6
          };
          displayData = [...careerData].sort((a, b) => order[a.company] - order[b.company]);
        }
        return displayData.map((job, idx) => {
          if (expandableAfter > 0 && !isExpanded && idx >= expandableAfter) return null;
        if (expandableAfter > 0 && !isExpanded && idx >= expandableAfter) return null;

        // Resolve bullets for active visitor type
        let bullets = job.bullets.Default;
        let isTailored = false;
        
        if (visitorType && job.bullets[visitorType]) {
          bullets = job.bullets[visitorType];
          isTailored = true;
        }

        // Generate tailored focus label
        let focusLabel = "";
        if (isTailored) {
          if (visitorType === "Recruiter") focusLabel = "Hiring Highlight";
          if (visitorType === "Engineer") focusLabel = "System & Code Highlight";
          if (visitorType === "EventPro") focusLabel = "Broadcast & Staging Focus";
          if (visitorType === "OpenClaw") focusLabel = "OSS & Tools Focus";
          if (visitorType === "Investor") focusLabel = "SaaS & Venture Metric";
        }

        return (
          <div key={idx} style={card}>
            <div style={headerRow}>
              <div>
                <div style={companyStyle}>
                  {job.company}
                  {focusLabel && (
                    <span style={badgeStyle} title={`This role highlights details relevant to your ${visitorType} interest.`}>
                      🎯 {focusLabel}
                    </span>
                  )}
                </div>
                <div style={roleStyle}>{job.role}</div>
              </div>
              <div style={periodStyle}>{job.period}</div>
            </div>

            <ul style={bulletList}>
              {bullets.map((bullet, bulletIdx) => (
                <li key={bulletIdx}>{bullet}</li>
              ))}
            </ul>
          </div>
        );
        });
      })()}
      {expandableAfter > 0 && careerData.length > expandableAfter && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px dashed rgba(255, 255, 255, 0.2)",
            color: "#a1a1aa",
            padding: "12px 24px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.color = "#fff"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; e.currentTarget.style.color = "#a1a1aa"; }}
        >
          {isExpanded ? "Collapse Additional Experience" : "View Additional Experience"}
        </button>
      )}
    </div>
  );
}
