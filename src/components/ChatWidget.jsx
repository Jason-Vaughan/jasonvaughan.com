import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORKER_URL = import.meta.env.DEV
  ? "http://localhost:8787"
  : "https://portfolio-chat.jasonvaughan.workers.dev";

export default function ChatWidget({ visitorType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Jason's AI assistant. Ask me anything about his projects, technical experience, or self-learning philosophy!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) setInput("");
    setIsLoading(true);

    const updatedMessages = [...messages, { role: "user", content: text }];
    setMessages(updatedMessages);

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an issue connecting to the chat helper. Please try again in a bit!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle widget and clear notification
  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasNewMessage(false);
  };

  // Pulse notification badge if unopened initially
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 1) {
        setHasNewMessage(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Dynamic intent-aware greeting update
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === "assistant") {
      let content = "Hi! I'm Jason's AI assistant. Ask me anything about his projects, technical experience, or self-learning philosophy!";
      if (visitorType === "Recruiter") {
        content = "Hi! I'm Jason's AI portfolio guide. I can answer detailed questions about his background, projects, leadership, and technical experience.";
      } else if (visitorType === "Engineer") {
        content = "Interested in the code? I'm Jason's AI assistant. Ask me about the architecture of TangleClaw, local AI routing in TangleBrain, the Medusa agent, or his testing strategy.";
      } else if (visitorType === "EventPro") {
        content = "Hello show pro! Ask me about Jason's broadcast and live event history, from managing Barco E2 screens to Disguise media servers and SMPTE-2110 IP video networks.";
      } else if (visitorType === "OpenClaw") {
        content = "Welcome to the OpenClaw workspace! Ask me about the OpenClaw agent ecosystem, published Node/Python modules, CLI configurations, and developer tools.";
      } else if (visitorType === "Investor") {
        content = "Hello! I can answer questions about the business viability, active user metrics, and feature roadmap for SaaS products like TiLT and Cierre Sensei.";
      }
      setMessages([{ role: "assistant", content }]);
    }
  }, [visitorType]);

  // Listen for open event from external components (e.g. About AI Interview CTA)
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setHasNewMessage(false);
    };
    window.addEventListener("open-portfolio-chat", handleOpenChat);
    return () => window.removeEventListener("open-portfolio-chat", handleOpenChat);
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, fontFamily: "inherit" }}>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 9999,
          background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
          border: "1px solid rgba(251, 191, 36, 0.4)",
          boxShadow: "0 8px 32px rgba(217, 119, 6, 0.25)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000",
          position: "relative",
        }}
        aria-label="Toggle portfolio chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}

        {/* Pulse badge */}
        <AnimatePresence>
          {hasNewMessage && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#ef4444",
                border: "2px solid #09090b",
              }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Expanded Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: 72,
              right: 0,
              width: "calc(100vw - 48px)",
              maxWidth: 380,
              height: 500,
              maxHeight: "calc(100vh - 120px)",
              borderRadius: 16,
              border: "1px solid #27272a",
              background: "rgba(24, 24, 27, 0.92)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #27272a",
              background: "linear-gradient(90deg, #18181b 0%, #09090b 100%)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px #10b981",
              }} />
              <div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#fff" }}>Ask my Portfolio</h3>
                <p style={{ margin: 0, fontSize: 11, color: "#a1a1aa" }}>Powered by Gemini</p>
              </div>
            </div>

            {/* Conversation Window */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    background: m.role === "user" 
                      ? "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)" 
                      : "rgba(39, 39, 42, 0.6)",
                    border: m.role === "user" 
                      ? "none" 
                      : "1px solid rgba(63, 63, 70, 0.4)",
                    color: m.role === "user" ? "#000" : "#fafafa",
                    padding: "10px 14px",
                    borderRadius: m.role === "user" 
                      ? "14px 14px 2px 14px" 
                      : "14px 14px 14px 2px",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {m.content}
                </div>
              ))}

              {/* Typewriter Loading State */}
              {isLoading && (
                <div style={{
                  alignSelf: "flex-start",
                  background: "rgba(39, 39, 42, 0.4)",
                  border: "1px solid rgba(63, 63, 70, 0.4)",
                  padding: "12px 16px",
                  borderRadius: "14px 14px 14px 2px",
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: i * 0.15,
                      }}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#a1a1aa",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && !isLoading && (
              <div style={{
                padding: "0 16px 12px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}>
                <p style={{ margin: "0 0 2px 0", fontSize: 11, color: "#71717a", fontWeight: 600 }}>SUGGESTIONS:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(() => {
                    switch (visitorType) {
                      case "Recruiter":
                        return [
                          "Why should I hire Jason?",
                          "Summarize his Google experience.",
                          "What leadership experience does he have?",
                          "Show AI projects.",
                          "Download resume.",
                          "Compare Jason to this job description.",
                        ];
                      case "Engineer":
                        return [
                          "How does local AI routing work in TangleBrain?",
                          "Tell me about TangleClaw's architecture.",
                          "What is Medusa's agent strategy?",
                          "What is Jason's testing philosophy?",
                        ];
                      case "EventPro":
                        return [
                          "What live event tech does Jason specialize in?",
                          "Tell me about Jason's experience with Barco E2.",
                          "Has Jason worked with fiber and SMPTE-2110?",
                          "What roles did he perform at major corporate events?",
                        ];
                      case "OpenClaw":
                        return [
                          "What is OpenClaw?",
                          "Tell me about the tools published on ClawHub.",
                          "What is ClawBridge?",
                          "How can I get started with OpenClaw?",
                        ];
                      case "Investor":
                        return [
                          "Tell me about the monetization of TiLT.",
                          "What is Cierre Sensei's market fit?",
                          "What is next on the roadmap for these products?",
                          "Does Jason do consulting?",
                        ];
                      default:
                        return [
                          "Why did you build TangleClaw?",
                          "What is your background in live events?",
                          "Tell me about TiLT and its stats.",
                          "What is your philosophy on self-learning?",
                        ];
                    }
                  })().map((text, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(text)}
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(63, 63, 70, 0.6)",
                        borderRadius: 9999,
                        padding: "6px 12px",
                        fontSize: 11,
                        color: "#fbbf24",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.15s, border-color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(251, 191, 36, 0.08)";
                        e.currentTarget.style.borderColor = "#fbbf24";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.borderColor = "rgba(63, 63, 70, 0.6)";
                      }}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Text Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                padding: 16,
                borderTop: "1px solid #27272a",
                background: "#18181b",
                display: "flex",
                gap: 10,
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                disabled={isLoading}
                style={{
                  flex: 1,
                  background: "#09090b",
                  border: "1px solid #27272a",
                  borderRadius: 10,
                  padding: "10px 14px",
                  color: "#fff",
                  fontSize: 13,
                  outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#fbbf24"}
                onBlur={(e) => e.target.style.borderColor = "#27272a"}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                  opacity: isLoading || !input.trim() ? 0.5 : 1,
                  transition: "opacity 0.15s",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
