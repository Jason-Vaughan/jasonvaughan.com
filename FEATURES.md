# Feature Index

<!--
Maintained automatically: the wrap-step handler appends
stubs when PRs touch new files. Fill in descriptions before
next wrap.

Format: - **Name** — short description. file.js:line, file2.js:line.
-->

## UI / Web
- **Git Stats Feed** — pre-computed stats feed for the BuilderStats component. `public/git-stats.json`.
- **Certifications Tests** — unit tests for the certifications data payload. `src/data/certifications.test.js`.
- **React Entry Point** — main initialization file for the Vite app. `src/main.jsx`.
- **Live Bundle** — compiled JavaScript output. `live-bundle.js`.
- **Chat Widget** — virtual interview chat interface. `src/components/ChatWidget.jsx`.
- **Baked Stats** — pre-computed stats payload for the portfolio grid. `src/data/baked-stats.json`.
- **Projects Data** — curated list of portfolio projects. `src/data/projects.js`.
- **Persona Selector** — targeted layout and passcode routing logic. `src/components/PersonaSelector.jsx`.
- **About Data** — content blocks for the about section. `src/data/about.js`.
- **Career Data** — snapshot entries for the career timeline. `src/data/career.js`.
- **Home Page** — primary landing route for the SPA. `src/pages/Home.jsx`.
- **About Tests** — unit tests for the about content structure. `src/data/about.test.js`.
- **Cierre Sensei Hero** — featured project hero component. `src/components/FeaturedCierreSensei.jsx`.
- **TiLT Hero** — featured project hero component. `src/components/FeaturedProject.jsx`.
- **TangleBrain Hero** — featured project hero component. `src/components/FeaturedTangleBrain.jsx`.
- **TangleClaw Hero** — featured project hero component. `src/components/FeaturedTangleClaw.jsx`.
- **React Router** — route definitions for the single page app. `src/App.jsx`.
- **About UI** — about section component rendering. `src/components/About.jsx`.
- **Dev Lab** — sandbox component for UI experiments. `src/pages/DevLab.jsx`.
- **Builder Stats** — global header stats aggregation component. `src/components/BuilderStats.jsx`.
- **Career UI** — timeline component for career snapshot. `src/components/Career.jsx`.
- **Visual Portfolio Gallery** — dynamic grid and slideshow component. `src/components/VisualPortfolio.jsx`.
- **Portfolio Index** — JSON index of photographic assets. `src/data/portfolio-index.json`.
- **Designer Portfolio Page** — dedicated visual art route. `src/pages/DesignerPortfolio.jsx`.
- **OpenAI Dossier** — static HTML landing page for OpenAI application. `public/openai/index.html`.
- **a16z Cover Letter HTML** — exported cover letter document. `docs/a16z_Crypto_Events_Associate_Cover_Letter.html`.
- **a16z Resume HTML** — exported resume document. `docs/a16z_Full_Resume_Draft.html`.

## Server / API
- **Chat API** — Vercel serverless function handling Gemini API chat requests. `api/chat.js`.
- **Vercel Config** — routing and serverless function deployments. `vercel.json`.

## Methodologies / Engines
- **Agent Rules** — core TangleClaw agent rules and prompt constraints. `AGENTS.md`.
- **Project Map** — structural layout documentation. `PROJECT-MAP.md`.
- **General Backlog** — pending tasks and project ideas. `TODO.md`.
- **Project Preferences** — tech stack alignment and agent behavioral guardrails. `project-preferences.md`.
- **a16z Cover Letter** — markdown draft of the a16z cover letter. `docs/a16z_Crypto_Events_Associate_Cover_Letter.md`.
- **a16z Resume Bullets** — scratchpad for targeted resume bullet points. `docs/a16z_Resume_Bullets.md`.
- **a16z Resume Draft** — markdown draft of the a16z resume. `docs/a16z_Full_Resume_Draft.md`.
- **a16z Messages** — targeted outreach messaging strategy. `docs/a16z_TopChoice_Messages.md`.
- **GitHub Profile** — automated README generation for GitHub profile. `docs/GitHub_Profile_README.md`.

## CLI / Tooling
- **Package Lock** — exact dependency versions tree. `package-lock.json`.
- **Package Config** — NPM scripts and dependency lists. `package.json`.
- **Embeddings Script** — utility to generate vector embeddings for semantic search. `scripts/generate-embeddings.js`.
