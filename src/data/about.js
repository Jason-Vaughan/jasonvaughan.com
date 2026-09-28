// Centralized About narrative, timeline, and pillars data.
// Exposes structured text to the About.jsx component.

export const aboutData = {
  hero: {
    Default: {
      title: "I build systems that solve complex technical problems.",
      subtitle: "For over 25 years I've led technology for some of the world's largest live events while building AI tools and software that automate the work I do every day."
    },
    Inspyr: {
      title: "I turn ideas into experiences.",
      subtitle: ""
    }
  },
  
  story: {
    Default: [
      "My software journey started in the early 2000s with iPolis, a first-of-its-kind SaaS webcasting service. Designing and operating that platform gave me a core foundation in software architecture, network streaming, and system engineering from the ground up.",
      "Parallel to code, my career grew in the live event industry. I transitioned from a stagecraft apprentice to freelance technical directing, managing high-stakes technology deployments for global giants like Google, AWS, Adobe, and Salesforce. Operating live broadcast environments with zero margin for error taught me about fail-safes, signal flow, and real-time networking.",
      "As AI technology became viable, I focused on building custom tools to automate the workflows I manage daily. Tired of complex spreadsheets for tracking union pay rates, I built TiLT. Frustrated by unstable remote SSH connections during a trip to Mexico, I designed TangleClaw and TangleBrain. I write software to scratch my own operational itches first, and then package those tools so others can run them reliably on their own hardware."
    ],
    Inspyr: [
      "For more than 25 years, I’ve worked across visual design, technical production, and live presentation, helping executives, engineers, producers, and creative teams transform ideas into visuals that communicate clearly to an audience.",
      "My work often begins well before anything reaches the screen. I collaborate directly with stakeholders to understand what they’re trying to communicate, develop visual approaches and proofs, and then carry those ideas through graphics, animation, motion content, and presentation design.",
      "I’m equally comfortable designing and building the work myself or leading the team responsible for delivering it. Years of operating major live events have also shaped how I design: presentations need to remain flexible, editable, and dependable through rehearsals, executive changes, and meet the realistic boundaries of a live show.",
      "My video engineering background allows me to bridge the gap between why something should look a certain way and how those pixels ultimately reach the audience through complex display systems. That ability to connect creative intent with technical execution has become a specialty I’m known for, and it’s often why I’m brought into a project.",
      "This combination of creative development and technical production has taken me from professional theater to executive presentations and major technology events around the world."
    ]
  },
  
  pillars: [
    {
      title: "Live Event Technology",
      description: "Managing high-capacity show infrastructure, LED walls, fiber arrays, and digital signal flow.",
      tags: ["Technical Direction", "SMPTE-2110", "Dante", "Fiber Optics", "Barco E2", "Disguise", "QLab"]
    },
    {
      title: "Presentation & Motion Graphics",
      description: "Transforming complex, engineer-authored content into visually compelling narratives for high-stakes technical presentations, working directly with technical stakeholders to support system-level concepts.",
      tags: ["Keynote", "PowerPoint", "After Effects", "Motion Graphics", "Speaker Coaching"],
      highlightFor: ["Inspyr"]
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
    { year: "2026", event: "Joined Google Event Technology Team (ETT) as Technical Program Manager & Demo Interface Lead." },
    { year: "2026", event: "Device Demo Interface Lead for Made by Google 2026 live global broadcast (Times Square & 12 platforms)." },
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
    bio: "Senior Events Production Leader & Technical Program Manager with 25+ years leading high-stakes live events, flagship broadcasts, and building AI tools that automate complex show workflows.",
    highlight: "Combines 25+ years of live broadcast operations and executive keynote staging with hands-on AI workflow development."
  },
  Recruiter: {
    bio: "AV Production Specialist & Technical Program Manager with 25+ years of experience leading flagship broadcasts, executive keynotes, and enterprise event technology.",
    highlight: "Senior production leader and AI-native developer who designs automated SOP runbooks and fail-safe show workflows."
  },
  SystemsBuilder: {
    bio: "Systems Builder & Infrastructure Lead with 25+ years of experience bridging live broadcast networks, physical fiber infrastructure, and local-first AI orchestration.",
    highlight: "I build robust production tools and high-performance routing backends, replacing manual operational toil with scalable automation."
  },
  Engineer: {
    bio: "Systems & Infrastructure Lead with 25+ years of experience bridging live broadcast networks, physical fiber infrastructure, and local-first AI orchestration.",
    highlight: "I build robust production tools and high-performance routing backends, backed by decades of zero-downtime enterprise show operations."
  },
  A16z: {
    bio: "Events Production & Operations Leader with 25+ years managing high-touch executive events, multi-vendor relationships, and large-scale technical production.",
    highlight: "Combines deep experience producing flagship summits (Google, AWS, Salesforce) with elite project and budget management skills."
  },
  Inspyr: {
    bio: "Visual storytelling and technical presentation specialist with 25+ years of experience translating ideas into graphics, animation, motion content, and live visual experiences for executive presentations, major technology events, and professional theater. Collaborates directly with executives, engineers, producers, and artistic directors from initial concept and proofing through design, programming, rehearsal, and final delivery, either hands-on or leading multidisciplinary creative teams.",
    highlight: "Deeply immersed in applied AI since 2020, integrating generative models into creative development, technical problem-solving, visual exploration, and production workflows."
  },
  EventPro: {
    bio: "Production Technology Leader & Technical Director with 25+ years managing complex signal flow, fiber arrays, Barco screen switching, and broadcast staging for global keynotes.",
    highlight: "Live production authority merging physical show networks with intelligent automation to eliminate backstage friction."
  },
  OpenClaw: {
    bio: "Creator of the OpenClaw Agent Framework. Live event technical leader building local-first multi-agent systems, ClawHub plugins, and persistent agent backends.",
    highlight: "Pushing the boundaries of human-AI collaboration with inspectable, local-first agent fleets built for real-world operations."
  },
  Investor: {
    bio: "Events Production & Systems Leader with 25+ years of experience building high-stakes live event infrastructure, broadcast technology, and software tools.",
    highlight: "Senior operations lead and software builder leveraging AI to solve real-world production pain points."
  }
};
