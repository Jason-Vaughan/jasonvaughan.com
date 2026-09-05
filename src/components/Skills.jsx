import React, { useState } from "react";
import Collapsible from "./Collapsible";
import { skillGroups } from "../data/skills";

function SkillGroup({ group }) {
  const [open, setOpen] = useState(false);

  const card = {
    borderRadius: 12,
    border: "1px solid #3f3f46",
    background: "#18181b",
    overflow: "hidden",
  };
  const header = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    background: "rgba(255,255,255,0.02)",
    cursor: "pointer",
    borderBottom: open ? "1px solid rgba(63,63,70,.6)" : "1px solid transparent",
    transition: "border-color .2s ease, background .2s ease",
  };
  const domainStyle = {
    fontSize: 14, fontWeight: 700, letterSpacing: 1,
    textTransform: "uppercase", color: "#e4e4e7",
  };
  const chevron = {
    width: 20, height: 20, color: "#71717a",
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform .25s ease",
  };
  const body = {
    display: "grid",
    gridTemplateRows: open ? "1fr" : "0fr",
    transition: "grid-template-rows .25s ease",
  };
  const inner = {
    minHeight: 0,
    overflow: "hidden",
    opacity: open ? 1 : 0,
    transition: "opacity .25s ease",
  };
  const rowList = {
    padding: "8px 20px 16px",
    display: "flex",
    flexDirection: "column",
  };
  const row = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  };
  const nameStyle = { color: "#a1a1aa", fontSize: 15, fontWeight: 500 };
  const pill = {
    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
    textTransform: "uppercase",
    padding: "3px 9px", borderRadius: 999,
    background: "rgba(56,189,248,.12)", color: "#38bdf8",
    border: "1px solid rgba(56,189,248,.25)",
  };

  return (
    <div style={card}>
      <div style={header} onClick={() => setOpen(!open)} onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"} onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}>
        <span style={domainStyle}>{group.domain}</span>
        <svg style={chevron} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={body} aria-hidden={!open} inert={!open ? "" : undefined}>
        <div style={inner}>
          <div style={rowList}>
            {group.skills.map((skill, idx) => (
              <div key={skill.name} style={{ ...row, borderBottom: idx === group.skills.length - 1 ? "none" : row.borderBottom }}>
                <span style={nameStyle}>{skill.name}</span>
                {skill.level ? <span style={pill}>{skill.level}</span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skills section — creative / live-show / broadcast pro tools, grouped by
 * domain. Domain groups are collapsible to keep the section compact. A 
 * proficiency pill renders only when a skill has a non-empty `level`. Wrapped 
 * in a Collapsible (default-closed) to keep the page short; opens + flashes on 
 * deep-link.
 *
 * @returns {JSX.Element} The rendered Skills section.
 */
export default function Skills({ highlighted = false }) {
  const subStyle = { marginTop: 0, color: "#a1a1aa", fontSize: 15, maxWidth: 640, lineHeight: 1.5 };
  const list = {
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  };

  return (
    <Collapsible id="skills" title="Skills" bodyInWrap icon="🎛️" highlighted={highlighted}
      description="Live-show, broadcast & creative tool fluency.">

      <p style={subStyle}>
        Pro tools from 25+ years of live events, broadcast, and video
        production — the craft behind the code, and the real-world systems
        experience I bring to every AI tool I build.
      </p>

      <div style={list}>
        {skillGroups.map((group) => (
          <SkillGroup key={group.domain} group={group} />
        ))}
      </div>
    </Collapsible>
  );
}
