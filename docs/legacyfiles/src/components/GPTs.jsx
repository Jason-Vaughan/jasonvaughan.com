import barcoach from "../assets/gpts/barcoach.png";

export default function GPTs() {
  const section = { background: "transparent", color: "#fafafa", padding: "32px 0" };
  const wrap = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
  // grid now left-justified
  const grid = { marginTop: 16, display: "grid", gap: 24, justifyContent: "start" };

  const card = {
    width: 380, borderRadius: 16, overflow: "hidden",
    border: "1px solid #3f3f46", background: "#18181b",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)"
  };

  const imgViewport = {
    height: 260, padding: 12,
    background: "rgba(24,24,27,.6)",
    borderBottom: "1px solid rgba(63,63,70,.6)",
    display: "flex", alignItems: "center", justifyContent: "center"
  };

  const imgStyle = {
    maxWidth: "100%", maxHeight: "100%",
    objectFit: "contain",
    borderRadius: 10, outline: "1px solid rgba(63,63,70,.7)"
  };

  const cap = { padding: 20, color: "#e4e4e7" };
  const h2 = { fontSize: 32, fontWeight: 800, letterSpacing: -0.5 };
  const h3 = { marginTop: 4, fontSize: 22, fontWeight: 700 };
  const p = { marginTop: 8, color: "#d4d4d8", lineHeight: 1.45 };
  const link = {
    display: "inline-flex", gap: 8, marginTop: 12,
    color: "#38bdf8", fontWeight: 600, fontSize: 14, textDecoration: "none"
  };

  return (
    <section id="gpts" style={section}>
      <div style={wrap}>
        <h2 style={h2}>Custom GPTs</h2>

        <div style={grid}>
          <a
            href="https://chatgpt.com/g/g-68d9df5e526c81918bfe45c149d71cb7-barcoach"
            target="_blank"
            rel="noreferrer"
            style={card}
          >
            <div style={imgViewport}>
              <img src={barcoach} alt="Event Master Coach (BarCoach)" style={imgStyle} loading="lazy" />
            </div>
            <div style={cap}>
              <h3 style={h3}>BarCoach</h3>
              <p style={p}>
                Purpose-built GPT expert for operators of the <strong>Barco Event Master System</strong>—
                covering processors and consoles such as the <strong>E2, E3, S3, and EX</strong>.
                Gen&nbsp;1 provides expert guidance for show prep and live troubleshooting, with
                optional packaged reference files that raise the support level and enable image support.
              </p>
              <span style={link}>Open GPT →</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
