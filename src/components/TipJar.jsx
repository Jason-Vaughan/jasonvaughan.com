import React from "react";
import { motion } from "framer-motion";

// Stripe Payment Link with "customer chooses price" enabled.
// Same URL as the small pill in the header — both point at one Stripe link.
// TODO: replace once the user creates the tip-jar Payment Link in Stripe.
const TIP_JAR_URL = "https://buy.stripe.com/REPLACE_ME_TIP_JAR";

/**
 * Tip jar callout — illustrated mason jar + "Drop a Tip" CTA.
 * Pairs with the small pill in the page header (App.jsx). Both link to the
 * same Stripe Payment Link.
 */
export default function TipJar() {
  return (
    <section id="tip-jar" style={{ padding: "32px 0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{
            borderRadius: 16,
            border: "1px solid #3f3f46",
            background: "linear-gradient(135deg, rgba(24,24,27,0.95), rgba(39,39,42,0.95))",
            boxShadow: "0 8px 24px rgba(0,0,0,.35)",
            overflow: "hidden",
          }}
        >
          {/* Accent bar */}
          <div style={{ height: 3, background: "linear-gradient(90deg, #fbbf24, #34d399, #fbbf24)", borderRadius: "16px 16px 0 0" }} />

          <div style={{
            padding: "28px 32px",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 28,
            alignItems: "center",
          }}>
            {/* Tip jar illustration */}
            <svg width="120" height="140" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Bills sticking out the back of the jar */}
              <g transform="translate(50 14) rotate(-18)">
                <rect width="56" height="32" rx="3" fill="#34d399" stroke="#047857" strokeWidth="1.5"/>
                <text x="28" y="22" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="bold">$</text>
              </g>
              <g transform="translate(95 8) rotate(12)">
                <rect width="56" height="32" rx="3" fill="#10b981" stroke="#047857" strokeWidth="1.5"/>
                <text x="28" y="22" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="bold">$</text>
              </g>

              {/* Jar lid (metallic band) */}
              <path d="M 30 60 L 170 60 L 165 82 L 35 82 Z" fill="#52525b" stroke="#71717a" strokeWidth="2" strokeLinejoin="round"/>
              {/* Lid highlight */}
              <line x1="38" y1="68" x2="160" y2="68" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round"/>

              {/* Jar neck (slight indent below lid) */}
              <rect x="42" y="82" width="116" height="8" fill="#27272a" stroke="#52525b" strokeWidth="1.5"/>

              {/* Glass jar body */}
              <path d="M 38 90 Q 28 95 28 108 L 28 195 Q 28 210 45 210 L 155 210 Q 172 210 172 195 L 172 108 Q 172 95 162 90 Z"
                    fill="rgba(56,189,248,0.04)" stroke="#71717a" strokeWidth="2.5" strokeLinejoin="round"/>

              {/* Glass shine */}
              <path d="M 50 110 Q 48 140 52 175" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round"/>

              {/* TIPS label */}
              <text x="100" y="148" textAnchor="middle" fontSize="26" fontWeight="800" fill="#a1a1aa" letterSpacing="3">TIPS</text>

              {/* Coins inside, at bottom */}
              <circle cx="50" cy="195" r="8" fill="#fbbf24" stroke="#a16207" strokeWidth="1.2"/>
              <circle cx="68" cy="198" r="7" fill="#fbbf24" stroke="#a16207" strokeWidth="1.2"/>
              <circle cx="85" cy="195" r="9" fill="#fbbf24" stroke="#a16207" strokeWidth="1.2"/>
              <circle cx="105" cy="198" r="7" fill="#fbbf24" stroke="#a16207" strokeWidth="1.2"/>
              <circle cx="122" cy="195" r="9" fill="#fbbf24" stroke="#a16207" strokeWidth="1.2"/>
              <circle cx="140" cy="197" r="7" fill="#fbbf24" stroke="#a16207" strokeWidth="1.2"/>
              <circle cx="155" cy="195" r="8" fill="#fbbf24" stroke="#a16207" strokeWidth="1.2"/>
            </svg>

            {/* Copy + CTA */}
            <div>
              <h2 style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: "-0.01em",
              }}>
                Tip Jar
              </h2>
              <p style={{
                margin: "8px 0 18px",
                fontSize: 14,
                color: "#a1a1aa",
                lineHeight: 1.6,
              }}>
                If something here saved you time, sparked an idea, or made you grin — drop a tip.
                Coffee, dinner, or a new car. Entirely up to you. No expectations, no refunds, all gratitude.
              </p>
              <a
                href={TIP_JAR_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  background: "#fbbf24",
                  color: "#18181b",
                  fontSize: 14,
                  fontWeight: 700,
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fcd34d")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fbbf24")}
              >
                Drop a Tip →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
