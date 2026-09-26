import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function GraphicsLanding() {
  useEffect(() => {
    document.title = "Jason Vaughan - Apple Keynote Design";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gray-800 selection:text-white">
      {/* Minimal Header */}
      <nav className="w-full px-8 py-6 flex justify-between items-center border-b border-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold tracking-tight hover:text-gray-300 transition-colors">
          JV.
        </Link>
        <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
          Back to Main Portfolio
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Personalized Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Hi Kelsi & the Apple Team.
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl">
            I'm a systems engineer and presentation designer with 25+ years of experience transforming complex, engineer-authored content into visually compelling narratives for high-stakes technical keynotes.
          </p>
        </motion.div>

        {/* Core Competencies Matrix matching the JD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Expert Keynote Architecture
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Designing polished, high-impact decks from scratch under tight deadlines. I don't just layout slides; I build robust, editable presentation systems.
            </p>
          </div>
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Technical Storytelling
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Decades of experience working directly with engineering stakeholders to translate system-level concepts and raw data into clear visual narratives.
            </p>
          </div>
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Live Show Stakes
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Signal flow lead and Technical Director for 100+ global corporate keynotes (Google Next, AWS re:Invent, Salesforce). I understand the pressure of the main stage.
            </p>
          </div>
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Independent Execution
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              I manage content independently, take and give feedback efficiently, and operate as a trusted partner to principal engineers and executives.
            </p>
          </div>
        </motion.div>

        {/* Action Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-3xl border border-gray-800 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Graphics Resume & Portfolio</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            (We will link the updated graphics resume and portfolio PDF here once you have them ready!)
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/graphics-resume" className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors inline-block text-center">
              View Graphics Resume
            </Link>
            <button className="px-8 py-3 bg-transparent border border-gray-600 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors">
              Download Design Portfolio
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
