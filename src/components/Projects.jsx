import React from "react";

const projects = [
  {
    title: "Resourcing Tracker",
    blurb:
      "Google Sheets + Apps Script allocation model that visualizes load, surfaces conflicts early, and drives assignments across 100+ concurrent projects.",
    image: "images/projects/resourcing.svg",
    link: "https://github.com/Jason-Vaughan",
    tags: ["Sheets", "Apps Script", "Ops"],
  },
  {
    title: "Budget Workbooks",
    blurb:
      "Forecast vs. actuals with variance flags and exec-ready rollups. Monthly risk surfacing to prevent overages before they happen.",
    image: "images/projects/budgets.svg",
    link: "https://github.com/Jason-Vaughan",
    tags: ["Finance Ops", "Dashboards"],
  },
  {
    title: "AI-Assisted Workflow Toolkit",
    blurb:
      "Prompt libraries and helpers (ChatGPT, Claude, Midjourney, Runway) to accelerate copy/design iterations and automate reporting.",
    image: "images/projects/ai.svg",
    link: "https://www.npmjs.com/~jason",
    tags: ["AI", "Automation"],
  },
];

export default function Projects() {
  return (
    <section className="bg-gray-100 py-12 px-6" id="projects">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Selected Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <article key={p.title} className="p-6 rounded-2xl bg-white shadow flex flex-col">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-contain mb-4 opacity-90"
                loading="lazy"
              />
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2 flex-1">{p.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  className="mt-5 inline-block text-sm font-medium underline underline-offset-4 hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View details →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
