import React from "react";
import { motion } from "framer-motion";
import BuilderStats from "./components/BuilderStats";
import FeaturedProject from "./components/FeaturedProject";
import FeaturedTangleClaw from "./components/FeaturedTangleClaw";
import FeaturedCierreSensei from "./components/FeaturedCierreSensei";
import Projects from "./components/Projects";
import Pipeline from "./components/Pipeline";
import Infrastructure from "./components/Infrastructure";
import Writing from "./components/Writing";
import GPTs from "./components/GPTs";
import TipJar from "./components/TipJar";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <div className="min-h-screen text-gray-900" style={{ background: "#09090b" }}>
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
              {/* Lid */}
              <rect x="5" y="3" width="14" height="3" rx="0.8" fill="#a16207" />
              {/* Jar body */}
              <path d="M 6 6 L 18 6 L 17.5 20 Q 17.5 21 16.5 21 L 7.5 21 Q 6.5 21 6.5 20 Z"
                fill="rgba(251, 191, 36, 0.15)" stroke="#fbbf24" strokeWidth="1.4" strokeLinejoin="round" />
              {/* Coins inside */}
              <circle cx="9" cy="17" r="1.4" fill="#fbbf24" />
              <circle cx="12" cy="18" r="1.2" fill="#fbbf24" />
              <circle cx="15" cy="17" r="1.4" fill="#fbbf24" />
              {/* Bill peeking out the top */}
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

      <BuilderStats />
      <FeaturedProject />
      <FeaturedTangleClaw />
      <FeaturedCierreSensei />
      <Projects />
      <Pipeline />
      <Infrastructure />
      <Writing />
      <GPTs />
      <TipJar />
      <ContactSection />

      <footer className="py-8 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} Jason Vaughan
      </footer>
    </div>
  );
}
