import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Repo root, relative to this file (src/builder-stats.test.js).
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Read BuilderStats component's source as text. */
function componentSource() {
  return readFileSync(join(ROOT, "src/components/BuilderStats.jsx"), "utf8");
}

describe("BuilderStats component invariants", () => {
  it("defaults activeTab state to codebase", () => {
    const src = componentSource();
    // Verify that activeTab state initializes to 'codebase'
    expect(src).toContain('useState("codebase")');
  });

  it("implements codebase view switching tab layout with switcher options", () => {
    const src = componentSource();
    expect(src).toContain('setActiveTab("codebase")');
    expect(src).toContain('setActiveTab("registry")');
  });

  it("does not restrict stats under recruiter mode in the codebase view", () => {
    const src = componentSource();
    
    // Recruiter-specific simplification code block should be removed
    expect(src).not.toContain('visitorType === "Recruiter" ?');
    
    // Standard builder stats should be present
    expect(src).toContain('label: "Lines of Code"');
    expect(src).toContain('label: "Commits"');
    expect(src).toContain('label: "Tests Passing"');
    expect(src).toContain('label: "Projects Shipped"');
  });

  it("renders stats in renderCodebaseView to show all active codebase metrics", () => {
    const src = componentSource();
    // Verify renderCodebaseView maps over stats directly
    expect(src).toContain('stats.map((s)');
  });
});
