# Phase 2: SEO Expansion & Project Detail Pages

## Overview
Currently, the portfolio is a Single Page Application (SPA) built with Vite and React. While it excels as a fast, interactive resume for direct visitors, it is practically invisible to search engines for specific project queries (e.g., "TangleClaw", "TiLT") due to its lack of dedicated URLs and static HTML content.

This plan details the process of expanding the portfolio into a discoverable hub without changing the existing visual design or disrupting the current deployment pipeline.

## Objectives
1. Create dedicated, routable URLs for each major project (e.g., `/projects/tangleclaw`, `/projects/notse`).
2. Implement Static Site Generation (SSG) so GitHub Actions outputs raw `tangleclaw.html` files containing the full text, making it instantly readable by Googlebot.
3. Keep the current Vite build system and Tailwind/React architecture completely intact.

## Step-by-Step Implementation

### Step 1: Install and Configure Routing
- Install `react-router-dom`.
- Refactor `src/App.jsx` to act as the layout wrapper.
- Move the current homepage content into a new `src/pages/Home.jsx` component.
- Set up routes for `/` (Home) and `/projects/:slug` (Project Detail).

### Step 2: Build the Project Detail Template
- Create a new `src/pages/ProjectDetail.jsx` component.
- Ensure the template matches the existing site branding (navbar, footer, typography).
- It should dynamically pull data (title, long-form description, screenshots, GitHub links, tech stack) based on the `:slug` from a central data file (`src/data/projects.js`).

### Step 3: Extract Project Data
- Move all hardcoded project text out of the individual components (`FeaturedTangleClaw.jsx`, `Notse`, etc.) and into a structured array in `src/data/projects.js`.
- This ensures the homepage cards and the new dedicated pages pull from a single source of truth.

### Step 4: Add Vite Pre-rendering (SSG)
- Install a pre-rendering plugin (e.g., `vite-plugin-prerender` or `vite-ssg`).
- Configure the `vite.config.js` to explicitly list the new project routes (`/projects/notse`, `/projects/tangleclaw`, etc.).
- When `npm run build` is executed by GitHub Actions, the plugin will load each route and save the fully rendered DOM as physical `.html` files in the `dist` folder.

### Step 5: Content Creation (User Action)
- Expand the short descriptions in `src/data/projects.js` into long-form, multi-paragraph case studies. 
- *SEO relies heavily on word count and specific keyword density.*

### Step 6: Update Sitemap
- Update `public/sitemap.xml` to include the new `/projects/...` URLs so Google knows exactly where to find them.

## Completion Criteria
- Visiting `jasonvaughan.com/projects/tangleclaw` loads directly without 404ing.
- Viewing the raw page source (`Cmd + Option + U`) of a project page reveals the full project text in the HTML, proving SSG is working.
