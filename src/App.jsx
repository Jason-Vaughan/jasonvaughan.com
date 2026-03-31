import React from "react";
import { motion } from "framer-motion";
import Projects from "./components/Projects";
import GPTs from "./components/GPTs";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-gradient-to-b from-indigo-100 to-transparent py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Jason Vaughan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600"
        >
          Creative Operations & Marketing Ops leader. Systems, workflows, and
          culture that let creative teams do their best work. Google Sheets &
          Apps Script near-expert; Airtable practitioner; AI-accelerated
          builder.
        </motion.p>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white shadow">
          <h2 className="text-xl font-bold mb-2">Operations & Systems</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Resource & Capacity Planning</li>
            <li>Contractor Lifecycle • Vendor Management</li>
            <li>Budget Tracking • Workflow Design • SOPs</li>
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-white shadow">
          <h2 className="text-xl font-bold mb-2">Tools & Tech</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Google Sheets (advanced formulas, dashboards)</li>
            <li>Apps Script (internal tools, web apps)</li>
            <li>Airtable • Project Management Platforms</li>
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-white shadow">
          <h2 className="text-xl font-bold mb-2">AI & Innovation</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>ChatGPT • Claude • Midjourney • Runway • DALL·E</li>
            <li>Workflow Automation • Content Ops Acceleration</li>
            <li>Responsible AI Adoption</li>
          </ul>
        </div>
      </section>

      <Projects />
      <GPTs />

      <footer className="py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Jason Vaughan
      </footer>
    </div>
  );
}
