import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function GraphicsResume() {
  useEffect(() => {
    document.title = "Jason Vaughan - Graphics & Keynote Resume";
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-gray-800 selection:text-white pb-24">
      {/* Navigation */}
      <nav className="w-full px-8 py-6 flex justify-between items-center border-b border-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <Link to="/graphics" className="text-xl font-bold tracking-tight text-white hover:text-gray-300 transition-colors">
          JV.
        </Link>
        <Link to="/graphics" className="text-sm text-gray-400 hover:text-white transition-colors">
          Back to Graphics Landing
        </Link>
      </nav>

      {/* Resume Container */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-6 mt-16"
      >
        <div className="border-b border-gray-800 pb-12 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Jason Vaughan</h1>
          <p className="text-xl text-gray-400 mb-6">Technical Keynote Designer & Production Engineer</p>
          <div className="flex gap-4 text-sm font-mono text-gray-500">
            <span>San Francisco, CA</span>
            <span>•</span>
            <a href="https://jasonvaughan.com" className="hover:text-white transition-colors">jasonvaughan.com</a>
          </div>
          <p className="mt-8 text-gray-300 leading-relaxed max-w-3xl">
            Specialized in transforming complex, engineer-authored content into visually compelling, high-impact Keynote presentations for the world’s leading technology companies. Over two decades of experience operating at the intersection of executive storytelling, motion graphics, and zero-fail live broadcast environments.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Core Competencies</h2>
          <ul className="space-y-4 text-gray-300">
            <li><strong className="text-white">Expert Keynote & Presentation Architecture:</strong> Designing polished, robust, and highly editable Keynote and PowerPoint decks from scratch under tight deadlines.</li>
            <li><strong className="text-white">Technical Storytelling:</strong> Translating dense, system-level engineering concepts into clear, accessible visual narratives for massive global audiences.</li>
            <li><strong className="text-white">Executive & Engineering Collaboration:</strong> Proven track record of working independently with C-suite executives, principal engineers, and technical stakeholders to manage and refine content.</li>
            <li><strong className="text-white">Live Event Execution:</strong> Intimate understanding of main-stage pressure, having engineered and operated graphics for 100+ global corporate keynotes.</li>
            <li><strong className="text-white">Motion & Video Production:</strong> Adobe After Effects, Photoshop, Illustrator, Premiere Pro, and media server programming (Watchout, Disguise, Millumin).</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Professional Experience</h2>
          
          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-1">Freelance Keynote Designer & Technical Director</h3>
            <p className="text-sm text-gray-400 mb-4 font-mono">June 1998 – Present</p>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Contracted continuously by the world’s largest production agencies to design, edit, and operate high-stakes Keynote presentations and motion graphics for C-suite executives and celebrities at global flagship events.
            </p>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-6 text-sm text-gray-300">
              <div>
                <strong className="text-white block mb-1">Jack Morton Worldwide</strong>
                Lead Keynote Graphics Designer. Led the North America Design team for Google Next Day 1 Keynote (C-Suite).
              </div>
              <div>
                <strong className="text-white block mb-1">George P. Johnson (GPJ)</strong>
                Keynote Graphic Designer & Operator for C-Suite executives across multiple flagship contracts.
              </div>
              <div>
                <strong className="text-white block mb-1">Sparks (12 Years)</strong>
                Designer, Editor, and Operator for massive Amazon AWS events.
              </div>
              <div>
                <strong className="text-white block mb-1">TenCue Productions (8 Years)</strong>
                Designer & Operator for C-Suite execs at the world's largest corporate events.
              </div>
              <div>
                <strong className="text-white block mb-1">Riverview Systems Group (10 Years)</strong>
                "Permalancer" Keynote & PowerPoint designer/editor with worldwide travel.
              </div>
              <div>
                <strong className="text-white block mb-1">J. Burton & Associates (7+ Years)</strong>
                Speaker Ready Room Lead, interfacing directly with CEOs and celebrity presenters.
              </div>
              <div>
                <strong className="text-white block mb-1">Creative Technology (7 Years) & Level 2 (5+ Years)</strong>
                Motion graphics design, programming, and operation at highest-tier events.
              </div>
              <div>
                <strong className="text-white block mb-1">Invision & Many More</strong>
                Decades of trusted contracting as a dedicated graphics and technical lead.
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-8">
              <strong className="text-white block mb-2 text-sm uppercase tracking-wider">End Clients Include:</strong>
              <p className="text-gray-300 leading-relaxed text-sm">
                Apple, Google, Microsoft, Amazon (AWS), HP, Yahoo, PayPal, Applied Materials, Michael Milken Foundation, Intuit, Samsung, Cisco, Oracle, and IBM.
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-3 text-gray-300">
              <li><strong className="text-white">Presentation Design & Executive Support:</strong> Interface directly with CEOs, CFOs, EVPs, and engineering leads to create, revise, and optimize Keynote and PowerPoint presentations. Known for acting decisively and producing polished decks in high-pressure backstage environments.</li>
              <li><strong className="text-white">Technical Storytelling:</strong> Transform raw technical specifications and engineer-authored data into visually compelling, easy-to-digest on-screen graphics for flagship software and hardware launches.</li>
              <li><strong className="text-white">Event Operations & Speaker Coaching:</strong> Pioneered the modern "Speaker Ready Room" concept at global conferences (e.g., RSA Paris), working directly with presenters to QC aspect ratios, rehearse content, and ensure technical seamlessness before walking on stage.</li>
              <li><strong className="text-white">Motion Graphics & Media Integration:</strong> Design and engineer custom motion graphics, video bumpers, and dynamic animated backdrops using After Effects, perfectly formatting them for ultra-wide LED walls and complex multi-screen layouts.</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-white mb-1">Technical Program Manager & Device Demo Lead</h3>
            <p className="text-sm text-gray-400 mb-4 font-mono">Google (Event Technology Team) / 2025 – Present</p>
            <ul className="list-disc pl-5 space-y-3 text-gray-300">
              <li>Embedded as Technical Program Manager across major Google programs (Made by Google, Google I/O, Google Cloud Next).</li>
              <li>Managed the remote Brooklyn live device-demo technical interface for the <em>Made by Google 2026</em> flagship broadcast, viewed by 30M+ users and live in Times Square.</li>
              <li>Bridged the gap between Google product/software teams and event production teams, ensuring complex technical demonstrations translated flawlessly to the screen.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-1">Signal Flow Lead & Fiber Optics Specialist</h3>
            <p className="text-sm text-gray-400 mb-4 font-mono">ASM Global (Moscone Center) / 2015 – Present</p>
            <ul className="list-disc pl-5 space-y-3 text-gray-300">
              <li>Technical lead directing fiber-optic communications and temporary broadcast signal flows across the Moscone Center for major enterprise tech shows (Google Next, Salesforce Dreamforce, Apple keynotes).</li>
              <li>Deeply fluent in the physical networking and hardware (Barco E2, Analog Way) required to push high-resolution presentation graphics to the main stage without failure.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12 border-t border-gray-800 pt-12">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Technical Education & Certifications</h2>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
            <li>• Barco Screen Pro, Encore and FSN Certifications</li>
            <li>• Level A Video Engineering Certificate (Barco)</li>
            <li>• Pro Tools 10 & 11 Professional Recording Expert</li>
            <li>• Microsoft Windows Media Service Provider Certified</li>
            <li>• IATSE Local 16, 50, and 134 (Video Engineer)</li>
          </ul>
        </section>

        <div className="mt-16 p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
          <p className="text-sm text-gray-400 italic">
            * Note for Apple / INSPYR: I operate an established business with appropriate licensing and insurance, accustomed to integrating seamlessly with internal enterprise teams.
          </p>
        </div>
      </motion.main>
    </div>
  );
}
