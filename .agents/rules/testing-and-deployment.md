# Rule: Production Render Verification & Playwright Testing Protocol

## 1. Always Run Playwright Runtime Exception Verification Before Declaring Success
- **Never rely on `npm run build` or Vite compilation alone**: A build can compile cleanly while still throwing uncaught runtime exceptions during React component render (e.g. `ReferenceError` for missing state variables or undefined property lookups).
- **Mandatory Playwright Headless Verification**: Before declaring any UI change or pass/persona customization complete, execute a headless Chromium render test against the built bundle or preview server:
  ```bash
  node -e '
  import("playwright").then(async ({ chromium }) => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    let errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto("http://127.0.0.1:4173/?pass=anthropic", { waitUntil: "networkidle" });
    if (errors.length > 0) throw new Error("Runtime Page Errors: " + errors.join(", "));
    await browser.close();
  });
  '
  ```
- Verify `errors.length === 0` and that actual DOM body text length is > 0.

## 2. Dynamic Tagline & State Null-Safety Fallbacks
- All dynamic taglines or persona objects accessed during render MUST have fail-safe fallbacks:
  `const activeTagline = personaTaglines[activePersonaKey] || personaTaglines.Default;`
- Never dereference nested properties on dynamic keys without checking for undefined.

## 3. GitHub Actions CI/CD Deploy Non-Blocking Rule
- `.github/workflows/deploy.yml` MUST use `continue-on-error: true` for non-critical steps (like Playwright OG preview screenshot generation) so Playwright timeouts never block portfolio deployments to GitHub Pages.
