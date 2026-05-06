import React from "react";
import { motion } from "framer-motion";
import tipJarLogo from "../assets/tipjar.png";

// Stripe Payment Link with "customer chooses price" enabled.
// Same URL as the small pill in the header — both point at one Stripe link.
const TIP_JAR_URL = "https://buy.stripe.com/7sY5kD6X8bUA7iNfEEaMU01";

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
            {/* Tip jar logo */}
            <img
              src={tipJarLogo}
              alt="Tip jar — illustrated mason jar full of bills and coins"
              style={{ width: 140, height: 140, objectFit: "contain", flexShrink: 0 }}
            />


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
