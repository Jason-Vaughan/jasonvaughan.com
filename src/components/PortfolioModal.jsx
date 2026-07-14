import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems, modalTypes } from "../data/portfolioItems";
import { openSection } from "../utils/sectionRegistry";

export default function PortfolioModal({ isOpen, onClose, modalType, onSetModalType, onDownloadResume, onAskChatbot }) {
  const [jdInput, setJdInput] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setJdInput("");
      setMatchResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentConfig = modalTypes[modalType] || modalTypes.recruiterPortfolio;

  // Filter items that match the current mode filter
  const filteredItems = portfolioItems.filter(item => 
    item.modes.includes(currentConfig.modeFilter)
  );

  const handleCardAction = (target) => {
    onClose();
    // Smooth scroll and highlight section
    if (target.startsWith("#")) {
      const secId = target.slice(1);
      openSection(secId);
      setTimeout(() => {
        const el = document.getElementById(secId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("card-highlight-pulse");
          setTimeout(() => el.classList.remove("card-highlight-pulse"), 2400);
        }
      }, 300);
    }
  };

  const handleJdAnalyze = (e) => {
    e.preventDefault();
    if (!jdInput.trim()) return;

    setIsMatching(true);
    // Simulate interactive analysis
    setTimeout(() => {
      const text = jdInput.toLowerCase();
      
      // Compute dynamic alignment matches
      const strong = [];
      const gaps = [];
      let score = 75; // Baseline match

      if (text.includes("program") || text.includes("tpm") || text.includes("manager") || text.includes("leadership")) {
        strong.push("Technical Program Management", "Cross-functional Leadership");
        score += 8;
      }
      if (text.includes("ai") || text.includes("model") || text.includes("llm") || text.includes("gpt")) {
        strong.push("AI Systems & Model Routing", "Local LLM Orchestration");
        score += 7;
      }
      if (text.includes("video") || text.includes("broadcast") || text.includes("fiber") || text.includes("event") || text.includes("staging")) {
        strong.push("Staging & Broadcast Networks", "Fiber Optic Topology");
        score += 6;
      }
      if (text.includes("saas") || text.includes("billing") || text.includes("stripe") || text.includes("full")) {
        strong.push("Full-Stack SaaS Product Delivery", "Stripe Billing & Subscriptions");
        score += 4;
      }

      // Check common tech stacks
      if (text.includes("rust")) {
        gaps.push("Rust (prefers Node.js/Python, but fast self-learner)");
        score -= 5;
      }
      if (text.includes("kubernetes") || text.includes("k8s")) {
        gaps.push("Kubernetes (expert in Docker local clustering, lighter on K8s)");
        score -= 4;
      }
      if (text.includes("go") || text.includes("golang")) {
        gaps.push("Golang (primarily uses Node.js/ESM and Python)");
        score -= 3;
      }

      score = Math.min(Math.max(score, 45), 98); // Clamp between 45% and 98%

      setMatchResult({
        score,
        strong: strong.length > 0 ? strong : ["Full-Stack Software Architecture", "Technical Execution under pressure"],
        gaps: gaps.length > 0 ? gaps : ["Advanced Cloud Containers (K8s)", "Low-level Systems Programming (Rust/C++)"],
        interviewPoints: [
          "Ask Jason about how he manages SOWs, capacity planning on large-scale programs ($15M to $250M), and contractor onboarding.",
          "Discuss his config-driven router TangleBrain and session manager TangleClaw built for private agent execution.",
          "Explore his years directing UHD video/fiber signal flow distribution for major stages (Dreamforce, Moscone)."
        ]
      });
      setIsMatching(false);

      // Auto trigger chatbot response in the background
      onAskChatbot(`Compare Jason to this job description:\n\n${jdInput}`);
    }, 1500);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(9, 9, 11, 0.9)",
      backdropFilter: "blur(16px)",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      boxSizing: "border-box",
      color: "#e4e4e7"
    }}>
      {/* Modal Top Navbar */}
      <div style={{
        padding: "16px 32px",
        borderBottom: "1px solid #27272a",
        background: "#18181b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>✨</span>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: 0 }}>
              AI Portfolio Concierge
            </h2>
            <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Curated Perspective Viewer
            </span>
          </div>
        </div>

        {/* Modal Toggles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Object.entries(modalTypes).map(([key, value]) => {
            const isActive = modalType === key;
            return (
              <button
                key={key}
                onClick={() => onSetModalType(key)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  background: isActive ? "rgba(251, 191, 36, 0.12)" : "rgba(255,255,255,0.02)",
                  border: isActive ? "1px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
                  color: isActive ? "#fbbf24" : "#a1a1aa",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}
              >
                {value.title.split(" ")[0]} View
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 6,
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          Close [x]
        </button>
      </div>

      {/* Main Split Grid */}
      <div style={{
        flexGrow: 1,
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        overflow: "hidden",
        boxSizing: "border-box"
      }}>
        
        {/* Left Side: Curated Portfolio Content */}
        <div style={{
          padding: "32px 40px",
          overflowY: "auto",
          boxSizing: "border-box"
        }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: 0 }}>
              {currentConfig.title}
            </h1>
            <p style={{ margin: "6px 0 0 0", color: "#a1a1aa", fontSize: 14, lineHeight: 1.5, maxWidth: 680 }}>
              {currentConfig.subheader}
            </p>
          </div>

          {modalType === "jobMatch" ? (
            /* Job Matcher Specific View */
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {!matchResult ? (
                <form onSubmit={handleJdAnalyze} style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  background: "rgba(24, 24, 27, 0.4)",
                  border: "1px solid #27272a",
                  borderRadius: 16,
                  padding: 24
                }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16, color: "#fff", fontWeight: 700 }}>Paste the Job Description</h3>
                    <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#71717a" }}>
                      Paste a technical summary or requirement outline to analyze Jason's experience match.
                    </p>
                  </div>
                  <textarea
                    placeholder="Paste job requirements here (e.g. Technical Program Manager, managing $10M budgets, Node.js, AI orchestration, fiber signaling...)"
                    value={jdInput}
                    onChange={(e) => setJdInput(e.target.value)}
                    style={{
                      width: "100%",
                      height: 180,
                      padding: 14,
                      borderRadius: 10,
                      border: "1px solid #3f3f46",
                      background: "#09090b",
                      color: "#fff",
                      fontFamily: "inherit",
                      fontSize: 13.5,
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isMatching || !jdInput.trim()}
                    style={{
                      alignSelf: "flex-start",
                      padding: "10px 24px",
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                      border: "none",
                      color: "#000",
                      fontSize: 13.5,
                      fontWeight: 700,
                      cursor: "pointer",
                      opacity: isMatching || !jdInput.trim() ? 0.5 : 1
                    }}
                  >
                    {isMatching ? "Analyzing Alignment..." : "Analyze Role Fit"}
                  </button>
                </form>
              ) : (
                /* Fit Dashboard */
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    background: "rgba(251, 191, 36, 0.04)",
                    border: "1px solid rgba(251,191,36,0.25)",
                    borderRadius: 16,
                    padding: 24
                  }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      border: "4px solid #fbbf24",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 900,
                      color: "#fbbf24"
                    }}>
                      {matchResult.score}%
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 18, color: "#fff", fontWeight: 800 }}>Role Match Evaluation</h3>
                      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#fbbf24", fontWeight: 700 }}>
                        High alignment with Jason's hybrid operations and software building capabilities.
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16
                  }}>
                    <div style={{
                      background: "rgba(24, 24, 27, 0.4)",
                      border: "1px solid #27272a",
                      borderRadius: 12,
                      padding: 20
                    }}>
                      <h4 style={{ margin: "0 0 10px", fontSize: 14, color: "#34d399", fontWeight: 700 }}>🎯 Strong Matches</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12.5, color: "#d4d4d8", display: "flex", flexDirection: "column", gap: 6 }}>
                        {matchResult.strong.map((val, i) => <li key={i}>{val}</li>)}
                      </ul>
                    </div>
                    <div style={{
                      background: "rgba(24, 24, 27, 0.4)",
                      border: "1px solid #27272a",
                      borderRadius: 12,
                      padding: 20
                    }}>
                      <h4 style={{ margin: "0 0 10px", fontSize: 14, color: "#f87171", fontWeight: 700 }}>⚡ Weaker / Growth Areas</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12.5, color: "#d4d4d8", display: "flex", flexDirection: "column", gap: 6 }}>
                        {matchResult.gaps.map((val, i) => <li key={i}>{val}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div style={{
                    background: "rgba(24, 24, 27, 0.4)",
                    border: "1px solid #27272a",
                    borderRadius: 12,
                    padding: 20
                  }}>
                    <h4 style={{ margin: "0 0 10px", fontSize: 14, color: "#fbbf24", fontWeight: 700 }}>🎙️ Suggested Rehearsal / Interview Talking Points</h4>
                    <ul style={{ margin: 0, paddingLeft: 20, fontSize: 12.5, color: "#d4d4d8", display: "flex", flexDirection: "column", gap: 6 }}>
                      {matchResult.interviewPoints.map((val, i) => <li key={i}>{val}</li>)}
                    </ul>
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={() => setMatchResult(null)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#a1a1aa",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Analyze Another JD
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        // Open Chat widget
                        window.dispatchEvent(new CustomEvent("open-portfolio-chat"));
                      }}
                      style={{
                        padding: "10px 20px",
                        borderRadius: 8,
                        background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                        border: "none",
                        color: "#000",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer"
                      }}
                    >
                      Open Chat Guide Summary
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Curated Cards Grid */
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 20
            }}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "rgba(24, 24, 27, 0.5)",
                    border: "1px solid #27272a",
                    borderRadius: 16,
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#fff" }}>
                        {item.title}
                      </h3>
                      <p style={{ margin: "4px 0 0", color: "#fbbf24", fontSize: 13, fontWeight: 700 }}>
                        {item.summary}
                      </p>
                    </div>

                    {/* Stats pills */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {item.stats.map((stat, i) => (
                        <span key={i} style={{
                          fontSize: 10,
                          fontWeight: 700,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 4,
                          padding: "2px 6px",
                          color: "#a1a1aa"
                        }}>
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    background: "rgba(251, 191, 36, 0.02)",
                    borderLeft: "3px solid #fbbf24",
                    padding: "8px 16px",
                    color: "#d4d4d8",
                    fontSize: 13,
                    lineHeight: 1.5
                  }}>
                    <strong>Why it matters:</strong> {item.whyItMatters}
                  </div>

                  {/* Skills tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {item.skills.map((skill, i) => (
                      <span key={i} style={{
                        fontSize: 11,
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 6,
                        padding: "3px 8px",
                        color: "#a1a1aa"
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div style={{
                    display: "flex",
                    gap: 12,
                    borderTop: "1px solid rgba(255,255,255,0.03)",
                    paddingTop: 14,
                    marginTop: 4
                  }}>
                    {item.links.map((link, i) => (
                      <button
                        key={i}
                        onClick={() => handleCardAction(link.target)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: 6,
                          background: "rgba(251, 191, 36, 0.08)",
                          border: "1px solid rgba(251, 191, 36, 0.25)",
                          color: "#fbbf24",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "background 0.15s"
                        }}
                      >
                        {link.label}
                      </button>
                    ))}
                    <button
                      onClick={() => onAskChatbot(`Tell me about the work related to: ${item.title}`)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 6,
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#a1a1aa",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Ask chatbot about this
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Global Metadata & Action Sidebar */}
        <div style={{
          borderLeft: "1px solid #27272a",
          background: "#121214",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          overflowY: "auto",
          boxSizing: "border-box"
        }}>
          <div>
            <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
              Concierge Quick Stats
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#71717a" }}>Experience:</span>
                <span style={{ fontWeight: 700, color: "#fff" }}>25+ Years</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#71717a" }}>Active SaaS Products:</span>
                <span style={{ fontWeight: 700, color: "#fff" }}>2 Products</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#71717a" }}>Google Event Support:</span>
                <span style={{ fontWeight: 700, color: "#fff" }}>18+ Years</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#71717a" }}>Vitest Assertions:</span>
                <span style={{ fontWeight: 700, color: "#fbbf24" }}>50+ Passing</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 14, color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
              Resume Access
            </h3>
            <p style={{ margin: 0, fontSize: 12, color: "#71717a", lineHeight: 1.4 }}>
              Lock in the PDF resume directly to evaluate his professional background offline.
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                onDownloadResume();
              }}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                border: "none",
                color: "#000",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download PDF Resume
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid #27272a", paddingTop: 24 }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 14, color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
              Get In Touch
            </h3>
            <p style={{ margin: 0, fontSize: 12, color: "#71717a", lineHeight: 1.4 }}>
              Ready to schedule an interview or discuss a project? Drop a direct message.
            </p>
            <button
              onClick={() => handleCardAction("#contact")}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              ✉️ Contact Form
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
