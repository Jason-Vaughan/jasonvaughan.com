// Centralized About narrative, timeline, and pillars data.
// Exposes structured text to the About.jsx component.

export const aboutData = {
  hero: {
    title: "I build systems that solve complex technical problems.",
    subtitle: "For over 25 years I've led technology for some of the world's largest live events while building AI tools and software that automate the work I do every day."
  },
  
  story: [
    "My software journey started in the early 2000s with iPolis, a first-of-its-kind SaaS webcasting service. Designing and operating that platform gave me a core foundation in software architecture, network streaming, and system engineering from the ground up.",
    "Parallel to code, my career grew in the live event industry. I transitioned from a stagecraft apprentice to freelance technical directing, managing high-stakes technology deployments for global giants like Google, AWS, Adobe, and Salesforce. Operating live broadcast environments with zero margin for error taught me about fail-safes, signal flow, and real-time networking.",
    "As AI technology became viable, I focused on building custom tools to automate the workflows I manage daily. Tired of complex spreadsheets for tracking union pay rates, I built TiLT. Frustrated by unstable remote SSH connections during a trip to Mexico, I designed TangleClaw and TangleBrain. I write software to scratch my own operational itches first, and then package those tools so others can run them reliably on their own hardware."
  ],
  
  pillars: [
    {
      title: "Live Event Technology",
      description: "Managing high-capacity show infrastructure, LED walls, fiber arrays, and digital signal flow.",
      tags: ["Technical Direction", "SMPTE-2110", "Dante", "Fiber Optics", "Barco E2", "Disguise", "QLab"]
    },
    {
      title: "AI & Automation",
      description: "Local-first LLM routing, agentic coding workflows, and Model Context Protocol (MCP) integrations.",
      tags: ["Local Inference", "Ollama", "Model Routing", "Agent Systems", "Workflow Automation"]
    },
    {
      title: "Software Development",
      description: "Building resilient backends, Node.js zero-npm-dependency servers, persistent APIs, and PWAs.",
      tags: ["Node.js", "Python", "REST APIs", "TypeScript", "tmux Integration", "Git Architecture"]
    },
    {
      title: "Technical Leadership",
      description: "Apprentice mentoring, technical program management, and teaching current-gen technology.",
      tags: ["Program Management", "Team Leadership", "Union Instruction", "Apprentice Mentoring", "Agile / Scrum"]
    }
  ],
  
  philosophy: [
    {
      question: "Why local AI?",
      answer: "Privacy, predictability, and ownership. Sending every basic task to a cloud API is expensive and unnecessary when you can run capable models locally on hardware you own."
    },
    {
      question: "Why open source?",
      answer: "I believe software should be inspectable and auditable. Building transparent tools like TangleClaw fosters community collaboration and keeps developers in control of their environments."
    },
    {
      question: "What problems excite you?",
      answer: "Bridging physical and digital worlds. I love building systems where software interacts directly with hardware—whether it's broadcast switchers, networking pipes, or AI agents editing files."
    }
  ],
  
  timeline: [
    { year: "2000", event: "Co-designed iPolis webcasting SaaS, establishing my base in software development." },
    { year: "2007", event: "Began freelance technical direction, managing signal routing for major corporate events." },
    { year: "2016", event: "Appointed ACT Video Head, leading complex fiber/signal infrastructure for large productions." },
    { year: "2026", event: "Joined Google as ETT Technical Program Manager (TPM)." },
    { year: "2026", event: "Launched OpenClaw open-source ecosystem, simplifying autonomous agent development." }
  ],
  
  personal: [
    "Mexico condo renovation project (handling hardware, design, and logistics)",
    "Creative photography & video production editing",
    "Sailing and navigation",
    "Deep-dive local AI model testing and evaluation"
  ],
  
  next: "I'm focusing heavily on human-AI collaboration planes, autonomous coding agent evaluation, and pushing local-first AI workflows into daily developer infrastructure."
};

export const personaTaglines = {
  Default: {
    bio: "Full-stack builder with 25 years across live events, SaaS, and AI-assisted development. I ship products that solve real problems — from union pay tracking to broadcast tools to developer infrastructure.",
    highlight: "AI-Native builder who lives, sleeps, and breathes systems automation. I design and scale custom local agent pipelines."
  },
  Recruiter: {
    bio: "Technical Program Manager & AI Systems Builder with 25 years of experience across enterprise live events, SaaS products, and agentic AI architectures.",
    highlight: "AI-Native developer passionate about human-AI collaboration. I scale custom local LLM routing and production developer pipelines."
  },
  Engineer: {
    bio: "AI-Native Systems Engineer & Full-Stack Developer. 25 years shipping production systems, zero-dependency Node.js services, and local LLM orchestration.",
    highlight: "I live, sleep, and breathe AI engineering. I build custom local agent gateway systems (OpenClaw) and local RAG pipelines."
  },
  EventPro: {
    bio: "Production Technology Leader & Technical Director. 25 years managing complex signal flow, fiber arrays, and LED show systems for global keynotes.",
    highlight: "AI-Native developer merging physical show networks with intelligent automation. I design local AI tools that handle timecard triage."
  },
  OpenClaw: {
    bio: "Creator of the OpenClaw Agent Framework. AI-Native developer building local-first multi-agent systems, ClawHub plugins, and persistent agent backends.",
    highlight: "I eat, sleep, and breathe agentic workflows. Pushing the boundaries of human-AI collaboration with inspectable, local-first agent fleets."
  },
  Investor: {
    bio: "Product Builder & SaaS Founder. 25 years shipping high-stakes technology, billing platforms, and AI systems that solve expensive operational problems.",
    highlight: "AI-Native operator building software with high margins. I leverage AI to build products that solve concrete customer pain points."
  }
};
