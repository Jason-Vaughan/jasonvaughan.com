// Structured career history dataset.
// Maps specific job bullet points to different visitor persona focuses.

export const careerData = [
  {
    company: "Google (Event Technology Team)",
    role: "Technical Program Manager & Systems Operator",
    period: "2025 - Present",
    bullets: {
      Recruiter: [
        "Manage capacity planning and contractor lifecycles (JDs, SOWs, and extensions) to staff Google's global event technology programs.",
        "Track budget forecasts vs. actuals for $15M+ programs, surfacing spend risks early and coordinating corrective actions.",
        "Onboard external contractors and team members, documenting standardized SOPs to reduce ramp-up time from weeks to days."
      ],
      Engineer: [
        "Designed and maintained Apps Script automation dashboards to allocate staff across 100+ concurrent projects and surface resourcing conflicts.",
        "Integrated local generative AI tools into internal operations to accelerate copywriting, data organization, and template prep.",
        "Standardized IT tools, access protocols, and workspace logistics for creative and technical production workflows."
      ],
      EventPro: [
        "Ensure demo devices, broadcast switchers, and signal paths run flawlessly under high-pressure live conditions during global product launches.",
        "Coordinate technical signal routing, multi-screen LED configurations, and real-time encoding for main-stage keynote sessions.",
        "Bridge the gap between marketing designers and onsite staging crews to guarantee visual quality and layout fidelity."
      ],
      Default: [
        "Support global Google product launches, ensuring demo systems and workflows run with zero downtime under live broadcast conditions.",
        "Manage contractor operations and program budget forecasting to align creative, technical, and executive stakeholders.",
        "Built resourcing trackers using Google Apps Script to coordinate team assignments across hundreds of concurrent project tracks."
      ]
    }
  },
  {
    company: "Independent Software & AI Builder",
    role: "Lead Systems Architect & Product Developer",
    period: "2024 - Present",
    bullets: {
      Recruiter: [
        "Shipped TiLT, a production time-tracking PWA that automates complex Collective Bargaining Agreement (CBA) pay rate calculations for live event crews.",
        "Built Cierre Sensei, a commercial Mexican real-estate closing cost SaaS supporting tax calculations across all 32 Mexican states.",
        "Successfully integrated secure Stripe subscription billing models and user authentication flows for active SaaS operations."
      ],
      Engineer: [
        "Designed and published TangleClaw, a zero-dependency remote TTYD and AI orchestration plane for persistent session management.",
        "Built TangleBrain, a config-driven local-first LLM router supporting multiple local backends (Ollama, llama.cpp).",
        "Publish open-source packages and Node.js zero-npm-dependency servers on GitHub and npm to foster community developer utilities."
      ],
      Investor: [
        "Developed and launched two active SaaS products (TiLT and Cierre Sensei) from prototype to recurring subscription models.",
        "Engineered automated compliance calculations for complex union labor rules, reducing timecard processing overhead by 90%.",
        "Establish scalable cloud infrastructures and data architectures to support multi-tenant real-estate calculation engines."
      ],
      Default: [
        "Build and launch custom SaaS applications, including TiLT (labor time-tracking PWA) and Cierre Sensei (closing cost calculator).",
        "Develop open-source developer tools including TangleClaw (remote TTYD AI session plane) and TangleBrain (local LLM router).",
        "Deploy robust, zero-npm-dependency Node.js backends and serverless architectures on secure edge networks."
      ]
    }
  },
  {
    company: "ACT Video Head & Freelance Technical Director",
    role: "Technical Director & Crew Operations Lead",
    period: "2007 - 2025",
    bullets: {
      Recruiter: [
        "Led onsite technical production and signal routing for 100+ large-scale corporate keynotes (Salesforce Dreamforce, AWS re:Invent).",
        "Managed large, cross-functional stage crews of 40+ technicians under tight, high-stress load-in and broadcast schedules.",
        "Mentored and trained current-generation union apprentices, masterfully teaching stagecraft, signal distribution, and safety."
      ],
      Engineer: [
        "Configured high-capacity local area networks, fiber signal paths, and terminal switch systems for live broadcast stages.",
        "Programmed advanced video processors, including Barco E2 and Disguise media servers, ensuring stable output configurations."
      ],
      EventPro: [
        "Served as ACT Video Head, designing fiber-optic infrastructure and digital signal paths for multi-screen stage environments.",
        "Managed onsite video switchers, backup power loops, and media servers to ensure broadcast reliability with zero single points of failure.",
        "Collaborated with creative marketing directors to configure live digital backdrops, screen ratios, and real-time feeds."
      ],
      Default: [
        "Served as ACT Video Head, managing staging, crew scheduling, and safety protocols for high-visibility event programs.",
        "Coordinated massive fiber optic infrastructure, signal switches, and backup paths for global corporate conferences.",
        "Taught stagecraft, video engineering, and live signal flow courses as a mentor for industry apprentices."
      ]
    }
  },
  {
    company: "iPolis Webcasting",
    role: "Co-Founder & Technology Director",
    period: "2000 - 2007",
    bullets: {
      Recruiter: [
        "Co-founded a pioneering webcasting company, securing municipal city contracts and building it to a successful $2M acquisition.",
        "Translated technical streaming capabilities into business propositions for government, education, and corporate clients.",
        "Created resourcing, pricing, and execution models that scaled operations while maintaining profitability."
      ],
      Engineer: [
        "Architected one of the earliest SaaS video streaming platforms, custom building RTMP ingest transcoding engines.",
        "Deployed and maintained dedicated Linux streaming server arrays, optimizing bandwidth usage and packet delivery."
      ],
      Investor: [
        "Navigated the early SaaS landscape, securing contracts with the City of San Francisco and bootstrapping to cash-flow positive.",
        "Facilitated and executed a successful $2M acquisition, managing technical due diligence and IP transitions."
      ],
      Default: [
        "Co-founded iPolis, an early SaaS webcasting service that pioneered video streaming for municipal governments.",
        "Designed real-time network streaming pipelines, transcoders, and video distribution systems.",
        "Led company through product-market fit, client growth, and a successful $2M acquisition."
      ]
    }
  }
];
