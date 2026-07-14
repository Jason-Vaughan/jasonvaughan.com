// Central registry for curated portfolio items used in the interactive Concierge Modals.
// Mapped to specific visitor profiles and intent types.

export const portfolioItems = [
  {
    id: "google-ett",
    title: "Google Event Technology & TPM",
    modes: ["recruiter", "google", "production"],
    summary: "Led technical operations and TPM workflows for Google's global flagship product launches.",
    whyItMatters: "Demonstrates cross-functional technical leadership, capacity planning on $15M to $250M programs, contractor lifecycle operations, and staging reliability under high-stakes live conditions.",
    skills: ["Technical Program Management", "Staging Operations", "Capacity Planning", "Contractor Onboarding"],
    stats: ["18+ Years", "100+ Keynotes"],
    links: [
      { label: "View Career Details", target: "#career" }
    ],
    priority: 1
  },
  {
    id: "tangleclaw-ecosystem",
    title: "TangleBrain & TangleClaw AI Ecosystem",
    modes: ["recruiter", "developer", "ai"],
    summary: "A local-first AI orchestration and config-driven LLM routing architecture designed for secure agent workflows.",
    whyItMatters: "Shows systems engineering, developer platform building, local LLM routing architectures, and custom AI orchestration planes.",
    skills: ["AI Systems", "Local LLMs", "Config-driven Routing", "Node.js", "System Architecture"],
    stats: ["Open Source", "100% Test Coverage"],
    links: [
      { label: "View TangleClaw", target: "#tangleclaw" },
      { label: "View TangleBrain", target: "#tanglebrain" }
    ],
    priority: 2
  },
  {
    id: "moscone-production",
    title: "ACT & Moscone Staging Systems",
    modes: ["recruiter", "production"],
    summary: "Signal flow leadership and fiber-optic networking installations for global tech summits and theatrical productions.",
    whyItMatters: "Demonstrates long-term operational trust, fiber-optic distribution topology design, UHD signal grids management, and union safety compliance.",
    skills: ["Fiber-Optic Distribution", "Signal Flow", "Barco E2 Staging", "Disguise Media Servers", "Union Instruction"],
    stats: ["25 Years Staging", "Moscone Lead"],
    links: [
      { label: "View Skills", target: "#skills" },
      { label: "View Certifications", target: "#certifications" }
    ],
    priority: 3
  },
  {
    id: "tilt-saas",
    title: "TiLT SaaS Product",
    modes: ["recruiter", "developer", "investor"],
    summary: "Enterprise-grade timecard, CBA pay rate rules, and benefit tracking PWA built for organized labor stagehands.",
    whyItMatters: "Proves full-stack product execution, Stripe billing integration, multitenancy database configurations, and translation of complex compliance rules into software.",
    skills: ["Full-Stack SaaS", "SQLite", "Stripe Billing", "CBA Rules Engine", "Product Design"],
    stats: ["Active Users", "Union Compliance"],
    links: [
      { label: "View TiLT Details", target: "#tilt" }
    ],
    priority: 4
  },
  {
    id: "monad-infra",
    title: "Local AI Infrastructure (Monad)",
    modes: ["recruiter", "developer", "ai"],
    summary: "Dedicated multi-GPU physical computing cluster designed for cost-effective local LLM inference and testing.",
    whyItMatters: "Demonstrates hardware/software integration, network configuration, container orchestrations, and cloud-equivalent cost optimizations.",
    skills: ["Inference hardware", "Docker", "Model Quantization", "GPU Tuning", "Internal APIs"],
    stats: ["Monad Rig", "Local Compute"],
    links: [
      { label: "View Infrastructure", target: "#research" }
    ],
    priority: 5
  },
  {
    id: "scrapegoat",
    title: "ScrapeGoat PWA Calendar Parser",
    modes: ["developer", "investor"],
    summary: "PDF calendar schedule extractor driven by templates and local parsing.",
    whyItMatters: "Shows lightweight progressive web app design, offline operations, and document parser logic.",
    skills: ["PWA", "PDF Scraping", "Client-Side Processing", "Web UI"],
    stats: ["Open Source"],
    links: [
      { label: "View Projects Grid", target: "#projects" }
    ],
    priority: 6
  },
  {
    id: "cierre-sensei",
    title: "Cierre Sensei Closing Costs",
    modes: ["investor"],
    summary: "Commercial real-estate closing cost engine covering all 32 Mexican states.",
    whyItMatters: "Demonstrates international tax rules translation, SaaS metrics tracking, and product localization.",
    skills: ["Real-Estate Tax Calculation", "SaaS Metrics", "Multi-Region Logic"],
    stats: ["Commercial SaaS"],
    links: [
      { label: "View Cierre Sensei", target: "#cierre-sensei" }
    ],
    priority: 7
  }
];

export const modalTypes = {
  recruiterPortfolio: {
    title: "Curated Recruiter Portfolio",
    subheader: "A focused set of examples selected to show Jason's technical leadership, software building, and high-stakes production experience.",
    modeFilter: "recruiter"
  },
  developerProjects: {
    title: "Developer & AI Projects Portfolio",
    subheader: "Jason's technical proofs: model routers, orchestration planes, local GPU clusters, open-source packages, and test suites.",
    modeFilter: "developer"
  },
  productionTech: {
    title: "Production Technology Portfolio",
    subheader: "decades of high-stakes staging: fiber-optic campus loops, Barco E2 routing, UHD distributions, and union crew management.",
    modeFilter: "production"
  },
  googleExperience: {
    title: "Google Experience & Event Support",
    subheader: "Highlights from 18+ years supporting Google's flagship product launches (Next, I/O) as part of the Event Technology Team.",
    modeFilter: "google"
  },
  jobMatch: {
    title: "Job Alignment Fit Matcher",
    subheader: "Paste a job description below, and Jason's AI concierge will compare his qualifications and calculate match stats.",
    modeFilter: "match"
  }
};
