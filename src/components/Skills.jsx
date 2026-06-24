import Collapsible from "./Collapsible";
import { skillGroups } from "../data/skills";

/**
 * Skills section — creative / live-show / broadcast pro tools, grouped by
 * domain. One dark card per domain, each listing its tools. A proficiency pill
 * renders only when a skill has a non-empty `level`. Wrapped in a Collapsible
 * (default-closed) to keep the page short; opens + flashes on deep-link.
 *
 * @returns {JSX.Element} The rendered Skills section.
 */
export default function Skills() {
  const subStyle = { marginTop: 0, color: "#a1a1aa", fontSize: 15, maxWidth: 640, lineHeight: 1.5 };
  const grid = {
    marginTop: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  };
  const card = {
    borderRadius: 16,
    border: "1px solid #3f3f46",
    background: "#18181b",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
    padding: 20,
    display: "flex",
    flexDirection: "column",
  };
  const domainStyle = {
    fontSize: 13, fontWeight: 700, letterSpacing: 1.5,
    textTransform: "uppercase", color: "#71717a",
    paddingBottom: 12, marginBottom: 12,
    borderBottom: "1px solid rgba(63,63,70,.6)",
  };
  const row = {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "7px 0",
  };
  const nameStyle = { color: "#e4e4e7", fontSize: 15, fontWeight: 500 };
  const pill = {
    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
    textTransform: "uppercase",
    padding: "3px 9px", borderRadius: 999,
    background: "rgba(56,189,248,.12)", color: "#38bdf8",
    border: "1px solid rgba(56,189,248,.25)",
  };

  return (
    <Collapsible id="skills" title="Skills" bodyInWrap icon="🎛️"
      description="Live-show, broadcast & creative tool fluency.">

      <p style={subStyle}>
        Pro tools from 25+ years of live events, broadcast, and video
        production — the craft behind the code, and the real-world systems
        experience I bring to every AI tool I build.
      </p>

      <div style={grid}>
        {skillGroups.map((group) => (
          <div key={group.domain} style={card}>
            <div style={domainStyle}>{group.domain}</div>
            {group.skills.map((skill) => (
              <div key={skill.name} style={row}>
                <span style={nameStyle}>{skill.name}</span>
                {skill.level ? <span style={pill}>{skill.level}</span> : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Collapsible>
  );
}
