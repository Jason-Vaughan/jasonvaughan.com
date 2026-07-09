import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BuilderStats from "./components/BuilderStats";
import FeaturedProject from "./components/FeaturedProject";
import FeaturedTangleClaw from "./components/FeaturedTangleClaw";
import FeaturedTangleBrain from "./components/FeaturedTangleBrain";
import FeaturedCierreSensei from "./components/FeaturedCierreSensei";
import Projects from "./components/Projects";
import Pipeline from "./components/Pipeline";
import Infrastructure from "./components/Infrastructure";
import OpenClawFleet from "./components/OpenClawFleet";
import ClawHub from "./components/ClawHub";
import Writing from "./components/Writing";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import GPTs from "./components/GPTs";
import TipJar from "./components/TipJar";
import ContactSection from "./components/ContactSection";
import Collapsible from "./components/Collapsible";
import { openSection, closeAllSections } from "./utils/sectionRegistry";
import ChatWidget from "./components/ChatWidget";
import About from "./components/About";
import Career from "./components/Career";
import { PERSONAS, inferPersona, PersonaDropdown } from "./components/PersonaSelector";

export default function App() {
  const [clawhubDownloads, setClawhubDownloads] = useState(null);
  const [projectStats, setProjectStats] = useState(null);

  // Gated Preview mode activation state
  const [isPreviewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "true") {
      localStorage.setItem("previewMode", "true");
      return true;
    }
    if (params.get("preview") === "false") {
      localStorage.removeItem("previewMode");
      return false;
    }
    return localStorage.getItem("previewMode") === "true";
  });

  // Selected visitor type (Recruiter, Engineer, etc.), with automatic referrer inference
  const [visitorType, setVisitorType] = useState(() => {
    const saved = localStorage.getItem("visitorType");
    if (saved !== null) return saved; // could be "" for reset to default
    
    // Attempt to infer persona on first landing
    const inferred = inferPersona();
    if (inferred) {
      localStorage.setItem("visitorType", inferred);
      return inferred;
    }
    return "";
  });

  const handleSelectPersona = (personaKey) => {
    setVisitorType(personaKey);
    localStorage.setItem("visitorType", personaKey);
    
    closeAllSections();
    const info = PERSONAS[personaKey];
    if (info && info.sections) {
      info.sections.forEach(secId => {
        setTimeout(() => {
          openSection(secId);
        }, 100);
      });
    }
  };

  // Helper to check if a section is recommended for the active persona
  const isSectionHighlighted = (secId) => {
    if (!isPreviewMode || !visitorType) return false;
    const info = PERSONAS[visitorType];
    return info?.sections?.includes(secId) || false;
  };

  // Auto-expand default sections on mode change or mount
  useEffect(() => {
    if (isPreviewMode && visitorType) {
      const info = PERSONAS[visitorType];
      if (info && info.sections) {
        info.sections.forEach(secId => {
          setTimeout(() => {
            openSection(secId);
          }, 450); // Delay slightly so layout/registry registers Collapsibles
        });
      }
    }
  }, [isPreviewMode, visitorType]);

  useEffect(() => {
    Promise.allSettled([
      fetch("https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/clawhub-versions.json", { cache: "no-store" }).then(r => r.ok ? r.json() : null),
      fetch("https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/_collect-meta.json", { cache: "no-store" }).then(r => r.ok ? r.json() : null)
    ]).then(([clawhubRes, manifestRes]) => {
      if (clawhubRes.status === "fulfilled" && clawhubRes.value?.items) {
        const total = clawhubRes.value.items.reduce((sum, item) => sum + (item.downloads || 0), 0);
        setClawhubDownloads(total);
      }
      if (manifestRes.status === "fulfilled" && manifestRes.value?.projects) {
        const stats = {};
        for (const [slug, p] of Object.entries(manifestRes.value.projects)) {
          if (p.ok && p.stats) stats[slug] = p.stats;
        }
        setProjectStats(stats);
      }
    });
  }, []);

  // Deep-link handler
  useEffect(() => {
    const applyHighlight = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const el = document.getElementById(hash);
      const enclosing = el?.closest("[data-collapsible]");
      const sectionId = enclosing?.getAttribute("data-collapsible");
      const opened = sectionId ? openSection(sectionId) : openSection(hash);
      const settle = opened ? 340 : 0;
      window.setTimeout(() => {
        const target = document.getElementById(hash);
        if (!target) return;
        const isSectionLevel = sectionId === hash;
        const flashEl =
          (isSectionLevel && enclosing.querySelector("[data-collapsible-header]")) || target;
        flashEl.scrollIntoView({ behavior: "smooth", block: "center" });
        flashEl.classList.add("card-highlight-pulse");
        window.setTimeout(() => flashEl.classList.remove("card-highlight-pulse"), 2400);
      }, settle);
    };

    const initialTimeout = window.setTimeout(applyHighlight, 350);
    window.addEventListener("hashchange", applyHighlight);
    return () => {
      window.clearTimeout(initialTimeout);
      window.removeEventListener("hashchange", applyHighlight);
    };
  }, []);

  return (
    <div className="min-h-screen text-gray-900" style={{ background: "#09090b" }}>
      <style>{`
        @keyframes card-highlight {
          0%, 100% { box-shadow: 0 8px 24px rgba(0,0,0,.35); }
          50% { box-shadow: 0 8px 24px rgba(0,0,0,.35), 0 0 0 4px rgba(245,158,11,0.55); }
        }
        .card-highlight-pulse { animation: card-highlight 1.2s ease-in-out 2; }
      `}</style>
      
      {/* Dynamic Top Banner for Gated Preview Mode */}
      {isPreviewMode && (
        <div style={{
          background: visitorType ? "linear-gradient(90deg, #fbbf24 0%, #d97706 100%)" : "rgba(24, 24, 27, 0.8)",
          color: visitorType ? "#000" : "#a1a1aa",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          textAlign: "center",
          padding: "8px 24px",
          fontSize: 13,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 12,
          position: "sticky",
          top: 0,
          zIndex: 1001,
          backdropFilter: visitorType ? "none" : "blur(8px)",
        }}>
          {visitorType ? (
            <span style={{ fontSize: 13, lineHeight: 1.4 }}>
              {PERSONAS[visitorType]?.bannerText || `Viewing site customized for ${PERSONAS[visitorType]?.label}.`}
            </span>
          ) : (
            <span>Welcome! Personalize this portfolio for your background:</span>
          )}
          <PersonaDropdown current={visitorType} onSelect={handleSelectPersona} />
        </div>
      )}

      <header className="py-16 px-6 text-center" style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #09090b 100%)" }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 16 }}
        >
          <a
            href="https://buy.stripe.com/7sY5kD6X8bUA7iNfEEaMU01"
            target="_blank"
            rel="noreferrer"
            title="Drop a tip — coffee, dinner, or a new car. Entirely up to you."
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px 6px 10px",
              borderRadius: 999,
              background: "rgba(251, 191, 36, 0.1)",
              border: "1px solid rgba(251, 191, 36, 0.4)",
              color: "#fbbf24",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.15s, border-color 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(251, 191, 36, 0.18)";
              e.currentTarget.style.borderColor = "rgba(251, 191, 36, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(251, 191, 36, 0.1)";
              e.currentTarget.style.borderColor = "rgba(251, 191, 36, 0.4)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="5" y="3" width="14" height="3" rx="0.8" fill="#a16207" />
              <path d="M 6 6 L 18 6 L 17.5 20 Q 17.5 21 16.5 21 L 7.5 21 Q 6.5 21 6.5 20 Z"
                fill="rgba(251, 191, 36, 0.15)" stroke="#fbbf24" strokeWidth="1.4" strokeLinejoin="round" />
              <circle cx="9" cy="17" r="1.4" fill="#fbbf24" />
              <circle cx="12" cy="18" r="1.2" fill="#fbbf24" />
              <circle cx="15" cy="17" r="1.4" fill="#fbbf24" />
              <path d="M 10.5 5.5 L 13.5 1 L 15 1.6 L 12 5.5 Z" fill="#34d399" stroke="#047857" strokeWidth="0.8" strokeLinejoin="round" />
              <text x="12.7" y="3.6" fontSize="2" fontWeight="bold" fill="#065f46" transform="rotate(-30 12.7 3.6)">$</text>
            </svg>
            Tip Jar
          </a>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          Jason Vaughan
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-400"
        >
          Full-stack builder with 25 years across live events, SaaS, and
          AI-assisted development. I ship products that solve real problems —
          from union pay tracking to broadcast tools to developer infrastructure.
        </motion.p>
      </header>

      {/* Builder Stats is the only always-exposed section; everything else is
          a closed dropdown by default. */}
      <BuilderStats />

      {/* New narrative-driven About section, visible in preview mode */}
      {isPreviewMode && (
        <Collapsible id="about" title="About" icon="👤" bodyInWrap provideId
          highlighted={isSectionHighlighted("about")}
          description="Who I am — narrative, pillars, milestones, and AI interview.">
          <About visitorType={visitorType} />
        </Collapsible>
      )}

      {/* New Career History section, visible in preview mode */}
      {isPreviewMode && (
        <Collapsible id="career" title="Career History" icon="💼" bodyInWrap provideId
          highlighted={isSectionHighlighted("career")}
          description="Professional highlights — dynamically weighted to your background.">
          <Career visitorType={visitorType} />
        </Collapsible>
      )}

      <Collapsible id="tilt" title="TiLT" icon="⏱️"
        highlighted={isSectionHighlighted("tilt")}
        statPill={projectStats?.tilt?.tests ? `${projectStats.tilt.tests.toLocaleString()} tests passing` : null}
        description="Union timecard & pay tracking for live-events crews.">
        <FeaturedProject />
      </Collapsible>
      
      <Collapsible id="tangleclaw" title="TangleClaw" icon="🧶"
        highlighted={isSectionHighlighted("tangleclaw")}
        statPill={projectStats?.tangleclaw?.tests ? `${projectStats.tangleclaw.tests.toLocaleString()} tests passing` : null}
        description="Multi-project AI session orchestration & governance.">
        <FeaturedTangleClaw />
      </Collapsible>
      
      <Collapsible id="tanglebrain" title="TangleBrain" icon="🧠"
        highlighted={isSectionHighlighted("tanglebrain")}
        statPill={projectStats?.tanglebrain?.tests ? `${projectStats.tanglebrain.tests.toLocaleString()} tests passing` : null}
        description="Local-first LLM router across AI backends.">
        <FeaturedTangleBrain />
      </Collapsible>
      
      <Collapsible id="cierre-sensei" title="Cierre Sensei" icon="🏠"
        highlighted={isSectionHighlighted("cierre-sensei")}
        description="Mexican real-estate closing-cost engine.">
        <FeaturedCierreSensei />
      </Collapsible>
      
      <Collapsible id="projects" title="Projects" icon="🛠️"
        highlighted={isSectionHighlighted("projects")}
        statPill={projectStats ? `${Object.keys(projectStats).length} projects shipped` : null}
        description="Shipped apps, tools & open-source projects.">
        <Projects />
      </Collapsible>
      
      <Collapsible id="pipeline" title="Pipeline" icon="🚧" provideId
        highlighted={isSectionHighlighted("pipeline")}
        description="What's in active development next.">
        <Pipeline />
      </Collapsible>
      
      <Collapsible id="research" title="Research & Infrastructure" icon="🔬"
        highlighted={isSectionHighlighted("research")}
        description="Active investigations and the systems that power them.">
        <Infrastructure />
      </Collapsible>
      
      <Collapsible id="openclaw-fleet" title="OpenClaw Fleet" icon="🤖"
        highlighted={isSectionHighlighted("openclaw-fleet")}
        description="Internal AI agents in production & development.">
        <OpenClawFleet />
      </Collapsible>
      
      <Collapsible id="clawhub" title="ClawHub Skills and Tools" icon="📦"
        highlighted={isSectionHighlighted("clawhub")}
        statPill={clawhubDownloads !== null ? `${clawhubDownloads.toLocaleString()} downloads` : null}
        description="Published skills & plugins with live download stats — for the OpenClaw ecosystem.">
        <ClawHub />
      </Collapsible>
      
      <Collapsible id="writing" title="Writing" icon="✍️"
        highlighted={isSectionHighlighted("writing")}
        statPill="3 papers"
        description="Essays & technical write-ups.">
        <Writing />
      </Collapsible>
      
      <Skills highlighted={isSectionHighlighted("skills")} />
      
      <Certifications highlighted={isSectionHighlighted("certifications")} />
      
      <Collapsible id="gpts" title="Custom GPTs" icon="💬"
        highlighted={isSectionHighlighted("gpts")}
        statPill="5 custom GPTs"
        description="Purpose-built GPT assistants.">
        <GPTs />
      </Collapsible>
      
      <Collapsible id="tip-jar" title="Tip Jar" icon="💰"
        highlighted={isSectionHighlighted("tip-jar")}
        description="Support the work.">
        <TipJar />
      </Collapsible>
      
      <Collapsible id="contact" title="Contact" icon="✉️"
        highlighted={isSectionHighlighted("contact")}
        description="Get in touch.">
        <ContactSection />
      </Collapsible>

      <footer className="py-8 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} Jason Vaughan
      </footer>

      <ChatWidget visitorType={visitorType} />
    </div>
  );
}
