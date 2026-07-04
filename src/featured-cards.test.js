import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Repo root, relative to this file (src/featured-cards.test.js).
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Read a featured-card component's source as text. */
function cardSource(name) {
  return readFileSync(join(ROOT, "src/components", name), "utf8");
}

/**
 * Guards the featured hero cards' distribution links and the version-drift
 * invariant. TangleBrain ships on PyPI as of v0.17.0 — the card must keep the
 * package link and install command visible. Both Tangle cards must source
 * their version chip from the centralized GitHub-release hook, never a
 * hardcoded literal (same invariant as version-consistency.test.js).
 */
describe("featured Tangle cards", () => {
  it("TangleBrain card links to its PyPI package with an install CTA", () => {
    const src = cardSource("FeaturedTangleBrain.jsx");
    expect(src).toContain("https://pypi.org/project/tanglebrain/");
    expect(src).toContain("pip install tanglebrain");
  });

  it.each(["FeaturedTangleClaw.jsx", "FeaturedTangleBrain.jsx"])(
    "%s sources its version chip from useGitHubLatestRelease, no hardcoded version",
    (file) => {
      const src = cardSource(file);
      expect(src).toContain("useGitHubLatestRelease");
      expect(src).not.toMatch(/v\d+\.\d+\.\d+/);
    },
  );
});
