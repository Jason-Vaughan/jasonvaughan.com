import React from "react";
import { motion } from "framer-motion";
import BuilderStats from "./components/BuilderStats";
import FeaturedProject from "./components/FeaturedProject";
import FeaturedTangleClaw from "./components/FeaturedTangleClaw";
import FeaturedCierreSensei from "./components/FeaturedCierreSensei";
import Projects from "./components/Projects";
import GPTs from "./components/GPTs";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <div className="min-h-screen text-gray-900" style={{ background: "#09090b" }}>
      <header className="py-16 px-6 text-center" style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #09090b 100%)" }}>
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
      <GPTs />
      <ContactSection />

      <footer className="py-8 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} Jason Vaughan
      </footer>
    </div>
  );
}
