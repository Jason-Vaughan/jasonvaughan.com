import React from "react";
import Career from "../components/Career";
import Skills from "../components/Skills";
import { aboutData } from "../data/about";
import VisualPortfolio from "../components/VisualPortfolio";
import FeaturedCierreSensei from "../components/FeaturedCierreSensei";

export default function DesignerPreview() {
  const visitorType = "Inspyr";
  const d = aboutData;

  const activePhilosophy = d.philosophy.Inspyr || d.philosophy.Default;
  const activeStory = d.story.Inspyr || d.story.Default;

  const card = {
    borderRadius: 16,
    border: "1px solid #27272a",
    background: "rgba(24, 24, 27, 0.4)",
    padding: 32,
    display: "flex",
    flexDirection: "column"
  };

  return (
    <div className="min-h-screen" style={{ background: "#09090b", color: "#f4f4f5", padding: "40px 20px" }}>
      <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: 64 }}>
        
        {/* 1. Hero */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Jason Vaughan</h1>
          <p style={{ marginTop: 12, fontSize: 18, color: "#a1a1aa", maxWidth: 600, margin: "12px auto 0" }}>
            Visual storytelling and technical presentation specialist with 25+ years of experience translating ideas into graphics, animation, motion content, and live visual experiences.
          </p>
        </div>

        {/* 2. Thesis */}
        <div style={{ textAlign: "center", padding: "64px 0", borderTop: "1px solid #27272a", borderBottom: "1px solid #27272a" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#fbbf24" }}>I turn ideas into experiences.</h2>
        </div>

        {/* 3. Selected work / visual portfolio */}
        <div style={{ ...card, padding: 32, border: "1px solid #27272a" }}>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 24, textAlign: "center" }}>Selected Work</h3>
          <VisualPortfolio />
        </div>

        {/* 4. What I do */}
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Capabilities</h3>
          <p style={{ color: "#d4d4d8", fontSize: 16, lineHeight: 2 }}>
            Concept Development <span style={{ color: "#fbbf24", margin: "0 8px" }}>·</span> 
            Presentation Design <span style={{ color: "#fbbf24", margin: "0 8px" }}>·</span> 
            Graphics <span style={{ color: "#fbbf24", margin: "0 8px" }}>·</span> 
            Animation <span style={{ color: "#fbbf24", margin: "0 8px" }}>·</span> 
            Motion Graphics <span style={{ color: "#fbbf24", margin: "0 8px" }}>·</span> 
            Creative Direction <span style={{ color: "#fbbf24", margin: "0 8px" }}>·</span> 
            Programming / Operation <span style={{ color: "#fbbf24", margin: "0 8px" }}>·</span> 
            Live Delivery
          </p>
        </div>

        {/* 5. Experience */}
        <div>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 32 }}>Experience</h3>
          <div style={{ ...card, padding: 0, background: "transparent", border: "none" }}>
            <Career visitorType={visitorType} expandableAfter={4} />
          </div>
        </div>

        {/* 6. How I Work / Design Philosophy */}
        <div style={card}>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 24 }}>Design Philosophy</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {activePhilosophy.map((item, idx) => (
              <div key={idx}>
                <div style={{ fontWeight: 700, color: "#fbbf24", fontSize: 15 }}>{item.question}</div>
                <div style={{ color: "#d4d4d8", fontSize: 15, marginTop: 8, lineHeight: 1.6 }}>{item.answer}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. My Story */}
        <div style={card}>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 24 }}>My Story</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {activeStory.map((p, idx) => (
              <p key={idx} style={{ color: "#d4d4d8", fontSize: 15, lineHeight: 1.7 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
        
        {/* 10. Professional theater */}
        <div style={card}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Professional Theater Roots</h3>
          <p style={{ color: "#d4d4d8", fontSize: 15, lineHeight: 1.7 }}>
            My foundation was built in professional theater, managing complex technical systems for massive live audiences. Designing for the stage requires absolute reliability, rapid on-the-fly troubleshooting, and the ability to seamlessly blend technical precision with artistic intent under the pressure of a live show.
          </p>
        </div>
        
        {/* 9. Tools & Technical Fluency */}
        <div>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 32 }}>Tools & Technical Fluency</h3>
          <Skills />
        </div>
        

        
        {/* 8. AI-NATIVE */}
        <div style={{ ...card, background: "rgba(139, 92, 246, 0.08)", border: "1px solid rgba(139, 92, 246, 0.25)", textAlign: "center" }}>
          <span style={{ background: "linear-gradient(90deg, #a78bfa, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800, fontSize: 13, letterSpacing: 0.5, marginBottom: 12 }}>
            AI-NATIVE
          </span>
          <p style={{ color: "#d4d4d8", fontSize: 14 }}>
            Hands-on with generative AI since 2020, using it as a core part of creative, technical, and production workflows.
          </p>
        </div>

        {/* 11. Résumé / Interactive AI Interview / Contact */}
        <div style={{ ...card, textAlign: "center", border: "1px solid rgba(251, 191, 36, 0.25)", background: "rgba(251, 191, 36, 0.05)" }}>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Want to go deeper? Ask my résumé.</h3>
          <p style={{ color: "#a1a1aa", marginBottom: 32 }}>
            I built a custom local-first AI system that knows my entire work history. Ask it anything about my experience.
          </p>
          <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "left" }}>
            <div style={{ padding: 24, border: "1px dashed #fbbf24", borderRadius: 8, background: "rgba(251, 191, 36, 0.1)", color: "#fbbf24" }}>
              [ Interactive AI Chat Interface Placeholder ]
            </div>
          </div>
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 16 }}>
             <a href="/Jason_Vaughan_Resume_2026.pdf" download style={{ padding: "12px 24px", background: "#fbbf24", color: "#000", fontWeight: 700, borderRadius: 8, textDecoration: "none" }}>Download PDF Résumé</a>
             <a href="mailto:jason@jasonvaughan.com" style={{ padding: "12px 24px", background: "transparent", border: "1px solid #fbbf24", color: "#fbbf24", fontWeight: 700, borderRadius: 8, textDecoration: "none" }}>Contact Me</a>
          </div>
        </div>

      </div>
    </div>
  );
}
