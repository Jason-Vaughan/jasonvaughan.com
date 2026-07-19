// Structured career history dataset.
// Maps specific job bullet points to different visitor persona focuses.

export const careerData = [
  {
    company: "Google (Event Technology Team)",
    role: "Technical Program Manager & Systems Operator",
    period: "2025 - 2026 (Freelance Partner since 2012)",
    bullets: {
      Recruiter: [
        "ETT Technical Program Manager for Google Spotlights at Google Cloud Next since 2023. Pre Production demo coordination with Production team and onsite demo support for Executives.",
        "Designed and maintained custom JS automation scripts to manage resource allocation and resolve scheduling conflicts across concurrent project schedules.",
        "Ongoing close coordination with ETT Management Team for various event support Tasks; Google IO, Google Cloud Next, Google Engage, etc.",
        "Ongoing 14-year relationship with Google Events & Projects in various roles."
      ],
      Engineer: [
        "ETT Technical Program Manager for Google Spotlights at Google Cloud Next since 2023. Pre Production demo coordination with Production team and onsite demo support for Executives.",
        "Designed and maintained custom JS automation scripts to manage resource allocation and resolve scheduling conflicts across concurrent project schedules.",
        "Ongoing close coordination with ETT Management Team for various event support Tasks; Google IO, Google Cloud Next, Google Engage, etc.",
        "Ongoing 14-year relationship with Google Events & Projects in various roles."
      ],
      EventPro: [
        "ETT Technical Program Manager for Google Spotlights at Google Cloud Next since 2023. Pre Production demo coordination with Production team and onsite demo support for Executives.",
        "Designed and maintained custom JS automation scripts to manage resource allocation and resolve scheduling conflicts across concurrent project schedules.",
        "Ongoing close coordination with ETT Management Team for various event support Tasks; Google IO, Google Cloud Next, Google Engage, etc.",
        "Ongoing 14-year relationship with Google Events & Projects in various roles."
      ],
      Default: [
        "ETT Technical Program Manager for Google Spotlights at Google Cloud Next since 2023. Pre Production demo coordination with Production team and onsite demo support for Executives.",
        "Designed and maintained custom JS automation scripts to manage resource allocation and resolve scheduling conflicts across concurrent project schedules.",
        "Ongoing close coordination with ETT Management Team for various event support Tasks; Google IO, Google Cloud Next, Google Engage, etc.",
        "Ongoing 14-year relationship with Google Events & Projects in various roles."
      ]
    }
  },
  {
    company: "ASM Global (Moscone Center)",
    role: "Signal Flow Lead & Fiber Optics Specialist",
    period: "2015 - Present",
    bullets: {
      Recruiter: [
        "Direct fiber-optic communications and broadcast signal flow operations across the entire Moscone Center campus, supporting major corporate keynotes.",
        "Coordinate directly with client engineering and technical program leads (Google, Apple, Salesforce) to scope, test, and commission temporary show networks.",
        "Lead specialized on-site patching teams, managing tight execution timelines and safety protocols under high-stakes conditions."
      ],
      Engineer: [
        "Design, build, and operate high-capacity network topologies and fiber-optic backbones for enterprise footprints under strict SLA constraints.",
        "Configure managed layer-2 and layer-3 switches, routing tables, and VLANs, troubleshooting complex networking bottlenecks.",
        "Program redundant hardware transceivers, multiplexers, and failover architectures to guarantee 99.999% network availability for live global keynotes."
      ],
      EventPro: [
        "Serve as Signal Flow Lead, designing and distributing fiber loops for primary keynote screens, broadcast production trucks, and overflow stages.",
        "Manage massive fiber patch panels and optical conversion grids to route UHD video feeds across multiple exhibition halls.",
        "Collaborate with staging and broadcast partners to set up stable signal feeds with zero single points of failure."
      ],
      Default: [
        "Serve as Signal Flow Lead and Fiber Optics Specialist at the Moscone Center under ASM Global management.",
        "Design temporary fiber-optic distribution loops and network backbones for global enterprise technology keynotes.",
        "Coordinate high-bandwidth broadcast signal routing between show stages and broadcast production trucks."
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
        "Designed and published TangleClaw, a zero-dependency remote terminal and process orchestration plane for persistent session persistence.",
        "Built TangleBrain, a Python-based local LLM router and gateway that manages concurrent local/cloud inference backends (LiteLLM, Ollama, llama.cpp).",
        "Created ClawBridge, an HTTP-to-IPC daemon that exposes local agent instances as supervised background build/execution services for automation tools.",
        "Author lightweight developer tools, prioritizing performance profiling, high-concurrency request handling, and zero-npm dependency footprints."
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
    company: "ACT (American Conservatory Theater)",
    role: "Video Head",
    period: "2016 - 2025",
    bullets: {
      Recruiter: [
        "Served as Video Head managing complex theatrical productions and live event operations.",
        "Coordinated multi-department stage logistics, equipment budgets, and safety compliance protocols.",
        "Mentored and trained union apprentices, teaching advanced stagecraft, electrical safety, and signal flow."
      ],
      Engineer: [
        "Configured stable local networks and digital signal distributions for complex multi-screen theatrical staging environments.",
        "Programmed local video playback server clusters and automated show control cues."
      ],
      EventPro: [
        "Served as ACT Video Head, managing video systems, projection mapping layouts, and optical signal flow setups.",
        "Designed backup power loops, switcher configurations, and media server systems to ensure zero show interruptions."
      ],
      Default: [
        "Served as ACT Video Head, directing staging setups, crew assignments, and safety protocols for major theatrical productions.",
        "Engineered multi-screen projection mapping, video playback setups, and fiber distribution lines.",
        "Taught advanced stagecraft and video signal distribution as a union apprentice mentor."
      ]
    }
  },
  {
    company: "Freelance Live Event Specialist",
    role: "Graphics Operator, Video Engineer & Technical Director",
    period: "2004 - Present",
    bullets: {
      Recruiter: [
        "Led onsite technical production and signal routing for 100+ high-stakes corporate keynotes (Salesforce Dreamforce, AWS re:Invent, Google Next).",
        "Managed cross-functional crews of up to 40+ technicians under compressed, high-stress load-in and broadcast schedules.",
        "Collaborated with production agencies (Jack Morton, etc.) to resource equipment packages and coordinate local labor crews."
      ],
      Engineer: [
        "Designed and deployed temporary network backbones, fiber distribution loops, and hardware switches for large-scale corporate arenas.",
        "Programmed high-end video processors, including Barco E2, Analog Way, and Disguise media servers."
      ],
      EventPro: [
        "Served as Video Lead and TD, directing multi-camera show feeds and live digital backdrop configurations.",
        "Managed massive fiber patch grids and optical conversion hardware to distribute UHD feeds to main and overflow screens.",
        "Troubleshot complex AV setups under tight timelines to maintain live broadcast integrity."
      ],
      Default: [
        "Freelance graphics operator, video engineer, and technical director for global tech summits and corporate shows.",
        "Coordinated signal distributions, backup power systems, and multi-display screen grids.",
        "Programmed advanced media servers and video processors for high-visibility client events."
      ]
    }
  },
  {
    company: "iPolis Webcasting",
    role: "Co-Founder & Technology Director",
    period: "2000 - 2007",
    bullets: {
      Recruiter: [
        "Co-founded a pioneering webcasting company, securing municipal city contracts and building it to a successful acquisition in 2007.",
        "Translated technical streaming capabilities into business propositions for government, education, and corporate clients.",
        "Created resourcing, pricing, and execution models that scaled operations while maintaining profitability."
      ],
      Engineer: [
        "Architected a pioneering municipal SaaS streaming platform, writing custom media distribution pipelines and RTMP ingest engines.",
        "Deployed, tuned, and managed dedicated Linux server clusters, optimizing kernel network parameters and packet routing to handle massive streaming loads."
      ],
      Investor: [
        "Navigated the early SaaS landscape, securing contracts with the City of San Francisco and bootstrapping to cash-flow positive.",
        "Facilitated and executed a successful acquisition in 2007, managing technical due diligence and IP transitions."
      ],
      Default: [
        "Co-founded iPolis, an early SaaS webcasting service that pioneered video streaming for municipal governments.",
        "Designed real-time network streaming pipelines, transcoders, and video distribution systems.",
        "Led company through product-market fit, client growth, and a successful acquisition in 2007."
      ]
    }
  }
];
