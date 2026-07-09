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
import PortfolioModal from "./components/PortfolioModal";
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

  // Dynamic sub-role filter within Recruiter mode
  const [targetRole, setTargetRole] = useState("");

  // Password-gated resume states
  const [isResumeUnlocked, setIsResumeUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("resumeUnlocked") === "true";
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const triggerResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Jason_Vaughan_Resume_secure_2026.pdf";
    link.download = "Jason_Vaughan_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResumeClick = (e) => {
    if (e) e.preventDefault();
    if (isResumeUnlocked) {
      triggerResumeDownload();
    } else {
      setIsPasswordModalOpen(true);
      setPasswordError(false);
      setPasswordInput("");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const normalized = passwordInput.trim().toLowerCase();
    if (normalized === "jason2026" || normalized === "tpm2026" || normalized === "moscone") {
      setIsResumeUnlocked(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("resumeUnlocked", "true");
      }
      setIsPasswordModalOpen(false);
      triggerResumeDownload();
    } else {
      setPasswordError(true);
    }
  };

  // Concierge Portfolio Modal states
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioModalType, setPortfolioModalType] = useState("recruiterPortfolio");

  const handleTriggerModal = (modalType) => {
    if (modalType === "downloadResume") {
      handleResumeClick();
    } else {
      setPortfolioModalType(modalType);
      setIsPortfolioModalOpen(true);
    }
  };

  const handleAskChatbot = (text) => {
    window.dispatchEvent(new CustomEvent("send-portfolio-chat", { detail: { text } }));
  };

  const handleSelectPersona = (personaKey) => {
    setVisitorType(personaKey);
    localStorage.setItem("visitorType", personaKey);
    setTargetRole(""); // Reset role filter on primary persona change
    
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

  const handleSelectRole = (roleKey, sections) => {
    if (targetRole === roleKey) {
      // Toggle off
      setTargetRole("");
      return;
    }
    setTargetRole(roleKey);
    closeAllSections();
    
    // Auto-open baseline sections + specific role target sections
    const targetSecs = ["about", "career", ...sections];
    targetSecs.forEach(secId => {
      setTimeout(() => {
        openSection(secId);
      }, 100);
    });
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
              <strong>Recruiter View:</strong> {PERSONAS[visitorType]?.bannerText || `Viewing site customized for ${PERSONAS[visitorType]?.label}.`}
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
          {isPreviewMode && visitorType === "Recruiter"
            ? "Technical Program Manager | AI Builder | Production Technology Leader"
            : "Full-stack builder with 25 years across live events, SaaS, and AI-assisted development. I ship products that solve real problems — from union pay tracking to broadcast tools to developer infrastructure."
          }
        </motion.p>

        {/* Aggressive Recruiter CTA Buttons right in the Hero */}
        {isPreviewMode && visitorType === "Recruiter" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              marginTop: 28,
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap"
            }}
          >
            <a
              href="#"
              onClick={handleResumeClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                border: "none",
                color: "#000",
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(217, 119, 6, 0.2)"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Resume
            </a>
            <a
              href="https://www.linkedin.com/in/jason-vaughan-b8993477/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
                transition: "border-color 0.15s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fbbf24"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: "none",
                transition: "border-color 0.15s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fbbf24"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Get in Touch
            </a>
          </motion.div>
        )}
      </header>

      {/* Recruiter Summary Card & Trusted Clients Grayscale logos */}
      {isPreviewMode && visitorType === "Recruiter" && (
        <div style={{ maxWidth: 960, margin: "0 auto 24px auto", padding: "0 24px" }}>
          <div style={{
            borderRadius: 16,
            border: "1px solid rgba(251, 191, 36, 0.35)",
            background: "linear-gradient(135deg, rgba(24, 24, 27, 0.9) 0%, rgba(9, 9, 11, 0.95) 100%)",
            padding: 24,
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: 0 }}>Why companies hire Jason</h2>
              <p style={{ margin: "4px 0 0", color: "#fbbf24", fontSize: 13.5, fontWeight: 700 }}>
                25+ years leading high-risk technical productions | 18+ years supporting Google's flagship events
              </p>
            </div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: 16
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontWeight: 700, color: "#fafafa", fontSize: 14 }}>💼 Leadership & Operations</span>
                <span style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.4 }}>
                  Technical Program Manager and Production Technology Leader. Directing complex event-tech programs, capacity planning, and budgets.
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontWeight: 700, color: "#fafafa", fontSize: 14 }}>🛠️ Software & AI Architecture</span>
                <span style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.4 }}>
                  Full-stack software developer and AI systems engineer. Building custom CBA compliance calculators, remote execution terminals, and LLM routers.
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontWeight: 700, color: "#fafafa", fontSize: 14 }}>🎓 Mentorship & Credentials</span>
                <span style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.4 }}>
                  Experienced stagecraft union apprentice instructor. Google Project Management Certified. Available for full-time leadership opportunities.
                </span>
              </div>
            </div>

            {/* AI-Generated Executive Summary */}
            <div style={{
              background: "rgba(251, 191, 36, 0.03)",
              border: "1px dashed rgba(251, 191, 36, 0.25)",
              borderRadius: 12,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}>
              <span style={{ fontWeight: 700, color: "#fbbf24", fontSize: 11.5, textTransform: "uppercase", letterSpacing: 0.5 }}>
                ✨ AI-Generated Executive Summary
              </span>
              <p style={{ margin: 0, fontSize: 13, color: "#d4d4d8", lineHeight: 1.5 }}>
                Jason Vaughan is a Technical Program Manager and software builder with 25+ years of experience leading complex live production systems for organizations including Google, AWS, Adobe, and Salesforce. He combines large-scale operational leadership with modern AI software development, maintaining an active portfolio of 25 shipped products spanning developer tooling, SaaS, and autonomous AI systems.
              </p>
            </div>

            {/* Grayscale Client Logos */}
            <div style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#71717a" }}>
                Trusted by work performed for
              </span>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 20,
                fontSize: 14,
                fontWeight: 800,
                color: "#52525b"
              }}>
                <span style={{ letterSpacing: 1 }}>GOOGLE</span>
                <span style={{ letterSpacing: 1 }}>AWS</span>
                <span style={{ letterSpacing: 1 }}>ADOBE</span>
                <span style={{ letterSpacing: 1 }}>SALESFORCE</span>
                <span style={{ letterSpacing: 1 }}>ACT</span>
                <span style={{ letterSpacing: 1 }}>MOSCONE</span>
                <span style={{ letterSpacing: 1 }}>JACK MORTON</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inline AI Concierge CTA Block - Hero Adjacent */}
      {isPreviewMode && (
        <div style={{ maxWidth: 960, margin: "0 auto 24px auto", padding: "0 24px" }}>
          <div style={{
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            background: "linear-gradient(135deg, rgba(24, 24, 27, 0.5) 0%, rgba(9, 9, 11, 0.6) 100%)",
            padding: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "#fbbf24", display: "flex", alignItems: "center", gap: 6 }}>
                🤖 AI Portfolio Concierge
              </span>
              <p style={{ margin: "4px 0 0", color: "#a1a1aa", fontSize: 13.5, lineHeight: 1.4 }}>
                Get a fast, tailored summary of Jason’s experience, projects, technical leadership, and career fit.
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button
                onClick={() => handleTriggerModal("recruiterPortfolio")}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "rgba(251, 191, 36, 0.08)",
                  border: "1px solid rgba(251, 191, 36, 0.25)",
                  color: "#fbbf24",
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                Show strongest examples
              </button>

              <button
                onClick={() => handleTriggerModal("googleExperience")}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#d4d4d8",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.color = "#fbbf24"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#d4d4d8"; }}
              >
                Summarize Google experience
              </button>

              <button
                onClick={() => handleTriggerModal("jobMatch")}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#d4d4d8",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fbbf24"; e.currentTarget.style.color = "#fbbf24"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#d4d4d8"; }}
              >
                Match to job description
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Builder Stats - only shown here for non-Recruiter modes */}
      {visitorType !== "Recruiter" && (
        <BuilderStats visitorType={visitorType} />
      )}

      {/* New narrative-driven About section, visible in preview mode */}
      {isPreviewMode && (
        <Collapsible id="about" title="About" icon="👤" bodyInWrap provideId
          highlighted={isSectionHighlighted("about")}
          description="Who I am — narrative, pillars, milestones, and AI interview.">
          <About visitorType={visitorType} onDownloadResume={handleResumeClick} />
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

      {/* Dynamic Sub-role Filtering panel for Recruiters, sitting right after About/Career */}
      {isPreviewMode && visitorType === "Recruiter" && (
        <div style={{ maxWidth: 960, margin: "16px auto", padding: "0 24px" }}>
          <div style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(24, 24, 27, 0.4)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#a1a1aa" }}>
              Tailor this page for a specific opening:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { label: "Technical Program Manager", key: "TPM", sections: ["certifications", "tilt", "contact"] },
                { label: "Engineering Manager", key: "EM", sections: ["tangleclaw", "tanglebrain", "projects", "contact"] },
                { label: "AI Infrastructure", key: "AI", sections: ["tangleclaw", "tanglebrain", "research", "openclaw-fleet", "clawhub"] },
                { label: "Production Technology", key: "Production", sections: ["skills", "certifications", "writing", "contact"] },
                { label: "Principal Engineer", key: "Principal", sections: ["tangleclaw", "tanglebrain", "projects", "research"] }
              ].map((role) => {
                const isActive = targetRole === role.key;
                return (
                  <button
                    key={role.key}
                    onClick={() => handleSelectRole(role.key, role.sections)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      background: isActive ? "rgba(251, 191, 36, 0.12)" : "rgba(255,255,255,0.02)",
                      border: isActive ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
                      color: isActive ? "#fbbf24" : "#d4d4d8",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {role.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Builder Stats - shifted down for Recruiter mode */}
      {visitorType === "Recruiter" && (
        <BuilderStats visitorType={visitorType} />
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

      {/* Selected Work Footer Concierge CTA Panel */}
      {isPreviewMode && (
        <div style={{ maxWidth: 960, margin: "24px auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{
            borderRadius: 16,
            border: "1px solid rgba(255, 255, 255, 0.06)",
            background: "rgba(24, 24, 27, 0.3)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12
          }}>
            <h4 style={{ margin: 0, fontSize: 16, color: "#fff", fontWeight: 700 }}>
              Still curious?
            </h4>
            <p style={{ margin: 0, fontSize: 13, color: "#a1a1aa", maxWidth: 480, lineHeight: 1.45 }}>
              Open the AI Portfolio Guide for a curated view.
            </p>
            <button
              onClick={() => handleTriggerModal("recruiterPortfolio")}
              style={{
                padding: "8px 20px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                border: "none",
                color: "#000",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                marginTop: 4
              }}
            >
              Open AI Portfolio Guide
            </button>
          </div>
        </div>
      )}

      <footer className="py-8 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} Jason Vaughan
      </footer>

      {/* Password Gating Modal */}
      {isPasswordModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(9, 9, 11, 0.8)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1002,
          padding: 20
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              width: "100%",
              maxWidth: 400,
              background: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 16,
              padding: 28,
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              gap: 16
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🔒</span>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
                Resume Password Required
              </h3>
            </div>
            
            <p style={{ margin: 0, fontSize: 13, color: "#a1a1aa", lineHeight: 1.5 }}>
              Jason's detailed resume is password-protected. Please enter the access password. If you don't have one, feel free to request it via the contact form or chatbot!
            </p>

            <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="password"
                placeholder="Enter access password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: passwordError ? "1px solid #ef4444" : "1px solid #3f3f46",
                  background: "#09090b",
                  color: "#fff",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
              
              {passwordError && (
                <span style={{ fontSize: 12, color: "#ef4444", fontWeight: 600 }}>
                  ❌ Invalid password. Please try again.
                </span>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#a1a1aa",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                    border: "none",
                    color: "#000",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Unlock & Download
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <ChatWidget visitorType={visitorType} onTriggerModal={handleTriggerModal} />

      <PortfolioModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
        modalType={portfolioModalType}
        onSetModalType={setPortfolioModalType}
        onDownloadResume={handleResumeClick}
        onAskChatbot={handleAskChatbot}
      />
    </div>
  );
}
