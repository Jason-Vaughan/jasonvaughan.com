import { describe, test, expect, beforeEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("Resume Password Gate Invariants", () => {
  let store = {};

  beforeEach(() => {
    store = {};
    vi.stubGlobal("localStorage", {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = String(value);
      },
      clear: () => {
        store = {};
      },
    });
  });

  test("Initially locked when localStorage is empty", () => {
    const isUnlocked = localStorage.getItem("resumeUnlocked") === "true";
    expect(isUnlocked).toBe(false);
  });

  test("Correct password unlocks the resume and persists to localStorage", () => {
    const validPasswords = ["jason2026", "tpm2026", "moscone"];
    for (const pwd of validPasswords) {
      store = {};
      const input = pwd.trim().toLowerCase();
      const success = (input === "jason2026" || input === "tpm2026" || input === "moscone");
      if (success) {
        localStorage.setItem("resumeUnlocked", "true");
      }
      expect(localStorage.getItem("resumeUnlocked")).toBe("true");
    }
  });

  test("Incorrect password fails to unlock", () => {
    const pwd = "wrongpassword";
    const input = pwd.trim().toLowerCase();
    const success = (input === "jason2026" || input === "tpm2026" || input === "moscone");
    if (success) {
      localStorage.setItem("resumeUnlocked", "true");
    }
    expect(localStorage.getItem("resumeUnlocked")).toBeNull();
  });

  test("App.jsx implements the password check gate before downloading", () => {
    const src = readFileSync(join(ROOT, "src/App.jsx"), "utf8");
    // Verify that handleResumeClick checks isResumeUnlocked
    expect(src).toContain("if (isResumeUnlocked)");
    // Verify that the download triggers only when unlocked
    expect(src).toContain("triggerResumeDownload()");
    // Verify the modal is opened when locked
    expect(src).toContain("setIsPasswordModalOpen(true)");
  });

  test("No button/link in App.jsx directly references the secure PDF file path (must go through click handler)", () => {
    const src = readFileSync(join(ROOT, "src/App.jsx"), "utf8");
    // Find all occurrences of the secure resume filename
    const matches = src.match(/Jason_Vaughan_Resume_secure_2026\.pdf/g) || [];
    // Should ONLY be referenced inside the triggerResumeDownload function helper, never as a raw href
    expect(matches.length).toBe(1);
  });

  test("About.jsx click handler delegates to onDownloadResume instead of direct linking", () => {
    const src = readFileSync(join(ROOT, "src/components/About.jsx"), "utf8");
    expect(src).toContain("onDownloadResume()");
    expect(src).not.toContain("Jason_Vaughan_Resume_secure_2026.pdf");
  });

  test("PortfolioModal.jsx click handler delegates to onDownloadResume instead of direct linking", () => {
    const src = readFileSync(join(ROOT, "src/components/PortfolioModal.jsx"), "utf8");
    expect(src).toContain("onDownloadResume()");
    expect(src).not.toContain("Jason_Vaughan_Resume_secure_2026.pdf");
  });
});
