import Collapsible from "./Collapsible";
import { certifications } from "../data/certifications";

/**
 * Certifications section — a short, curated "experience-credentialed" proof
 * set in dark cards. Each card shows the cert name + issuer; a year chip and a
 * detail sub-line render only when set. Wrapped in a Collapsible (default-
 * closed) to keep the page short; opens + flashes on deep-link.
 *
 * @returns {JSX.Element} The rendered Certifications section.
 */
export default function Certifications({ highlighted = false }) {
  const subStyle = { marginTop: 0, color: "#a1a1aa", fontSize: 15, maxWidth: 640, lineHeight: 1.5 };
  const grid = {
    marginTop: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
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
    gap: 8,
  };
  const topRow = {
    display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
  };
  const nameStyle = { color: "#e4e4e7", fontSize: 17, fontWeight: 700, lineHeight: 1.3 };
  const issuerStyle = {
    fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
    color: "#71717a",
  };
  const detailStyle = { color: "#a1a1aa", fontSize: 13.5, lineHeight: 1.45 };
  const yearChip = {
    flexShrink: 0,
    fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
    padding: "3px 9px", borderRadius: 999,
    background: "rgba(56,189,248,.12)", color: "#38bdf8",
    border: "1px solid rgba(56,189,248,.25)",
  };

  return (
    <Collapsible id="certifications" title="Certifications" bodyInWrap icon="🏅" highlighted={highlighted}
      description="Field-earned credentials & training.">

      <p style={subStyle}>
        More than 25 years of field-verified credentials — and still leveling
        up.
      </p>

      <div style={grid}>
        {certifications.map((cert) => (
          <div key={`${cert.issuer}-${cert.name}`} style={card}>
            <div style={topRow}>
              <span style={nameStyle}>{cert.name}</span>
              {cert.year ? <span style={yearChip}>{cert.year}</span> : null}
            </div>
            <span style={issuerStyle}>{cert.issuer}</span>
            {cert.detail ? <span style={detailStyle}>{cert.detail}</span> : null}
          </div>
        ))}
      </div>
    </Collapsible>
  );
}
