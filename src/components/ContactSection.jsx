import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * Contact section with Web3Forms form and social links (GitHub, LinkedIn).
 */
export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const card = {
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid #3f3f46",
    background: "#18181b",
    boxShadow: "0 8px 24px rgba(0,0,0,.35)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid #3f3f46",
    background: "#09090b",
    color: "#fafafa",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: "#a1a1aa",
    marginBottom: 6,
    display: "block",
  };

  const btnSubmit = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 32px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #38bdf8, #818cf8)",
    color: "#0f1419",
    transition: "opacity 0.2s",
  };

  const socialBtn = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 12,
    border: "1px solid #3f3f46",
    background: "rgba(255,255,255,0.04)",
    color: "#a1a1aa",
    textDecoration: "none",
    transition: "border-color 0.2s, color 0.2s",
  };

  /**
   * Handle form submission via Web3Forms API.
   */
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch {
      // Silently fail — form stays visible for retry
    }
  }

  return (
    <section id="contact" style={{ padding: "48px 0" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={card}
        >
          {/* Accent bar */}
          <div style={{ height: 4, background: "linear-gradient(90deg, #38bdf8, #818cf8, transparent)" }} />

          <div style={{ padding: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: "#fafafa", margin: 0 }}>
              Get in Touch
            </h2>
            <p style={{ marginTop: 8, fontSize: 14, color: "#71717a", maxWidth: 480 }}>
              Have a project idea, want to collaborate, or just want to say hello?
              Drop me a message — I'd love to hear from you.
            </p>

            <div style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 32,
              alignItems: "start",
            }}>
              {/* Form */}
              {submitted ? (
                <div style={{
                  padding: "48px 24px",
                  textAlign: "center",
                  borderRadius: 12,
                  background: "rgba(56,189,248,0.06)",
                  border: "1px solid rgba(56,189,248,0.15)",
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>&#10003;</div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#fafafa" }}>Message sent!</p>
                  <p style={{ fontSize: 14, color: "#71717a", marginTop: 8 }}>Thanks for reaching out. I'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{ ...btnSubmit, marginTop: 16, background: "rgba(255,255,255,0.08)", color: "#a1a1aa" }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {/* Web3Forms access key — replace with your real key */}
                  <input type="hidden" name="access_key" value="406e34df-68bd-40b0-acc9-9fe783b57421" />
                  {/* Honeypot spam protection */}
                  <input type="checkbox" name="botcheck" style={{ display: "none" }} />

                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#38bdf8")}
                      onBlur={(e) => (e.target.style.borderColor = "#3f3f46")}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#38bdf8")}
                      onBlur={(e) => (e.target.style.borderColor = "#3f3f46")}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="What's on your mind?"
                      style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                      onFocus={(e) => (e.target.style.borderColor = "#38bdf8")}
                      onBlur={(e) => (e.target.style.borderColor = "#3f3f46")}
                    />
                  </div>

                  <div>
                    <button type="submit" style={btnSubmit}>
                      Send Message
                    </button>
                  </div>
                </form>
              )}

              {/* Social links — right column */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                paddingTop: 4,
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#52525b", textTransform: "uppercase", letterSpacing: 1.2 }}>
                  Find me on
                </span>
                <a
                  href="https://github.com/Jason-Vaughan"
                  target="_blank"
                  rel="noreferrer"
                  style={socialBtn}
                  title="GitHub"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fafafa"; e.currentTarget.style.color = "#fafafa"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3f3f46"; e.currentTarget.style.color = "#a1a1aa"; }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/jason-vaughan-b8993477/"
                  target="_blank"
                  rel="noreferrer"
                  style={socialBtn}
                  title="LinkedIn"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0a66c2"; e.currentTarget.style.color = "#0a66c2"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#3f3f46"; e.currentTarget.style.color = "#a1a1aa"; }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
