# Jason Vaughan - Project Preferences

## Core Identity & Brand
- **Primary Persona:** Full-Stack Builder, Renaissance Developer, and Expert Keynote/Presentation Designer.
- **Tone:** Professional, authoritative, technically fluent, yet accessible and hands-on. Avoid overly academic theory; prioritize real-world execution, system engineering, and live-event stakes.
- **Key Focus Areas:** 
  - Presentation & Motion Graphics (Keynote, After Effects, C-Suite Storytelling)
  - Full-Stack Software Engineering (React, Node, SQLite, AI Integration)
  - Live Event Signal Flow & Fiber Optics (High-stakes, zero-fail environments)

## Tech Stack & Architecture
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend / API:** Vercel Serverless Functions
- **AI Integration:** Google Gemini SDK (`@google/genai`) for multi-turn chat and vector embeddings (`text-embedding-004`). 
- **Database/Storage:** Static JSON context mapped to embeddings (`content/embeddings.json`).

## AI Agent Workflow Rules (TangleClaw)
1. **Never hardcode ports:** Always check and register through TangleClaw PortHub.
2. **Never hand the operator a localhost link:** Always use the Tailscale MagicDNS format (`http(s)://cursatory.tail123678.ts.net:<port>`).
3. **Embeddings & Context:** Always generate embeddings securely via Vercel environment variables during build time; never commit or print the `GEMINI_API_KEY` to the repository or chat logs.
4. **Resumes & Artifacts:** Maintain highly targeted, persona-driven resumes (e.g., Apple Keynote Designer) natively as web routes (`/graphics`) rather than solely relying on static PDFs, allowing for rapid iteration and analytics tracking.
5. **Virtual Interview Agent:** The `portfolio-chat` assistant must act as Jason's candidate representative, matching skills against Job Descriptions, presenting his unique value proposition (operations + AI engineering), and declining off-topic questions.
