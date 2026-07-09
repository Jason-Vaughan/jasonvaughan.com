import React from "react";
import { careerData } from "../data/career";

export default function Career({ visitorType }) {
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
      {careerData.map((job, idx) => {
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
      })}
    </div>
  );
}
