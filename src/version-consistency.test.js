import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Repo root, relative to this file (src/version-consistency.test.js).
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Recursively collect every .html file under a directory. */
function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(p));
    else if (entry.name.endsWith(".html")) out.push(p);
  }
  return out;
}

/**
 * Guards the version-display invariant: every surface that shows a project
 * version must source it from the centralized manifest's `versions` block
 * (daily-synced from `releases/latest`), never a hardcoded literal. Hardcoded
 * versions silently drift — the /notse page sat at v0.5.12 while the card
 * showed the live v0.5.20. With every surface reading the one source, the card,
 * the sub-page, and "latest on git" stay in lockstep by construction.
 */
describe("version display is single-sourced (no drift)", () => {
  it("no static page under public/ hardcodes a version literal (vX.Y.Z)", () => {
    const offenders = [];
    for (const file of htmlFiles(join(ROOT, "public"))) {
      const matches = readFileSync(file, "utf8").match(/v\d+\.\d+\.\d+/g);
      if (matches) {
        offenders.push(`${file.replace(ROOT + "/", "")} → ${[...new Set(matches)].join(", ")}`);
      }
    }
    // A hit means a page baked in a version that will drift. Source it from the
    // manifest instead (see public/notse/index.html's .notse-version pattern).
    expect(offenders).toEqual([]);
  });

  it("the /notse sub-page reads its version from the manifest", () => {
    const html = readFileSync(join(ROOT, "public/notse/index.html"), "utf8");
    expect(html).toContain("notse-version");      // the element(s) the script fills
    expect(html).toContain("versions.notse");     // reads the manifest field
    expect(html).toContain("_collect-meta.json"); // from the centralized manifest
  });

  it("the Projects card sources versions from the manifest, not per-visitor GitHub", () => {
    const src = readFileSync(join(ROOT, "src/components/Projects.jsx"), "utf8");
    expect(src).toContain("manifest.versions");      // single source of truth
    expect(src).not.toContain("api.github.com");     // no per-visitor GitHub API release fetch
  });
});
