import barcoach from "../assets/gpts/barcoach.png";
import cierresensei from "../assets/gpts/cierresensei.png";
import engenius from "../assets/gpts/engenius.png";
import lensjester from "../assets/gpts/lensjester.png";

const gpts = [
  {
    title: "BarCoach",
    href: "https://chatgpt.com/g/g-68d9df5e526c81918bfe45c149d71cb7-barcoach",
    image: barcoach,
    alt: "Event Master Coach (BarCoach)",
    badge: "GEN 1",
    description:
      'Purpose-built GPT expert for operators of the <strong>Barco Event Master System</strong>— covering processors and consoles such as the <strong>E2, E3, S3, and EX</strong>. Gen\u00a01 provides expert guidance for show prep and live troubleshooting, with optional packaged reference files that raise the support level and enable image support.',
  },
  {
    title: "BarCoach Gen\u00a02",
    href: "https://chatgpt.com/g/g-68daed11f3a4819197d550e561d77bab-barcoach-gen2-beta",
    image: barcoach,
    alt: "BarCoach Gen 2 (Beta)",
    badge: "GEN 2",
    description:
      'Second generation <strong>Barco Event Master</strong> expert with fully external reference data hosted on GitHub. Hooks directly into manuals, images, and documentation — no file uploads needed. Currently in beta.',
  },
  {
    title: "Cierre Sensei",
    href: "https://chatgpt.com/g/g-692d29fb16948191a5e007eb245e93d0-cierre-sensei",
    image: cierresensei,
    alt: "Cierre Sensei — Mexican Real Estate Closing Cost Calculator",
    description:
      "Your expert guide for <strong>Mexican real estate closing costs</strong>. Breaks down notary fees, taxes, acquisition costs, and hidden charges for buyers and sellers. The GPT that powered the original Cierre Sensei before it became a full web app.",
  },
  {
    title: "En-Genius4Dummies",
    href: "https://chatgpt.com/g/g-68f3ca3eb9108191acb99bbb16f2615a-en-genius4dummies-enh1350",
    image: engenius,
    alt: "En-Genius4Dummies ENH1350",
    description:
      "A no-nonsense guide for the <strong>EnGenius ENH1350</strong> access point. Covers setup, configuration, troubleshooting, and deployment — written for people who just want the thing to work without reading a 200-page manual.",
  },
  {
    title: "LensJester",
    href: "https://chatgpt.com/g/g-69cd9ef8f8408191a1588bad87215f83-lensjester",
    image: lensjester,
    alt: "LensJester — Projector Lens Calculator",
    description:
      "Snarky projectionist tool that interviews you about your <strong>screen size, projector model, and resolution</strong>, then generates a report with the optimal lens recommendation and a couple of alternates. Equal parts useful and sarcastic.",
  },
];

/**
 * Custom GPTs section — 3 cards in a responsive grid, matching dark card style.
 */
export default function GPTs() {
  const section = { background: "transparent", color: "#fafafa", padding: "32px 0" };
  const wrap = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
  const grid = {
    marginTop: 16,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
  };

  const card = {
    borderRadius: 16, overflow: "hidden",
    border: "1px solid #3f3f46", background: "#18181b",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
    textDecoration: "none", color: "inherit",
    display: "flex", flexDirection: "column",
  };

  const imgViewport = {
    height: 220, padding: 12,
    background: "rgba(24,24,27,.6)",
    borderBottom: "1px solid rgba(63,63,70,.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
  };

  const imgStyle = {
    maxWidth: "100%", maxHeight: "100%",
    objectFit: "contain",
    borderRadius: 10, outline: "1px solid rgba(63,63,70,.7)",
  };

  const cap = { padding: 20, color: "#e4e4e7", flex: 1, display: "flex", flexDirection: "column" };
  const h2Style = { fontSize: 32, fontWeight: 800, letterSpacing: -0.5 };
  const h3Style = { marginTop: 4, fontSize: 22, fontWeight: 700 };
  const pStyle = { marginTop: 8, color: "#d4d4d8", lineHeight: 1.45, fontSize: 14, flex: 1 };
  const linkStyle = {
    display: "inline-flex", gap: 8, marginTop: 12,
    color: "#38bdf8", fontWeight: 600, fontSize: 14, textDecoration: "none",
  };

  return (
    <section id="gpts" style={section}>
      <div style={wrap}>
        <h2 style={h2Style}>Custom GPTs</h2>

        <div style={grid}>
          {gpts.map((g) => (
            <a key={g.title} href={g.href} target="_blank" rel="noreferrer" style={card}>
              <div style={{ ...imgViewport, position: "relative" }}>
                <img src={g.image} alt={g.alt} style={imgStyle} loading="lazy" />
                {g.badge && (
                  <span style={{
                    position: "absolute", top: 12, right: 12,
                    fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                    textTransform: "uppercase",
                    padding: "4px 10px", borderRadius: 8,
                    background: g.badge === "GEN 2" ? "#D4AF37" : "rgba(255,255,255,0.12)",
                    color: g.badge === "GEN 2" ? "#0f1419" : "#a1a1aa",
                    border: g.badge === "GEN 2" ? "none" : "1px solid rgba(255,255,255,0.15)",
                  }}>
                    {g.badge}
                  </span>
                )}
              </div>
              <div style={cap}>
                <h3 style={h3Style}>{g.title}</h3>
                <p style={pStyle} dangerouslySetInnerHTML={{ __html: g.description }} />
                <span style={linkStyle}>Open GPT →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
