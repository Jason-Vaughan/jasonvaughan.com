import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { aboutData } from "./about";
import { PERSONAS } from "../components/PersonaSelector";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("About Data Integrity", () => {
  it("should contain the required hero properties", () => {
    expect(aboutData.hero).toBeDefined();
    expect(typeof aboutData.hero.title).toBe("string");
    expect(typeof aboutData.hero.subtitle).toBe("string");
  });

  it("should contain story as an array of paragraphs", () => {
    expect(Array.isArray(aboutData.story)).toBe(true);
    expect(aboutData.story.length).toBeGreaterThan(0);
    aboutData.story.forEach((p) => {
      expect(typeof p).toBe("string");
    });
  });

  it("should contain pillars with valid fields", () => {
    expect(Array.isArray(aboutData.pillars)).toBe(true);
    expect(aboutData.pillars.length).toBe(4);
    aboutData.pillars.forEach((pillar) => {
      expect(typeof pillar.title).toBe("string");
      expect(typeof pillar.description).toBe("string");
      expect(Array.isArray(pillar.tags)).toBe(true);
    });
  });

  it("should contain milestones in the timeline", () => {
    expect(Array.isArray(aboutData.timeline)).toBe(true);
    expect(aboutData.timeline.length).toBeGreaterThan(0);
    aboutData.timeline.forEach((item) => {
      expect(typeof item.year).toBe("string");
      expect(typeof item.event).toBe("string");
    });
  });
});

describe("Persona Selector Configurations", () => {
  const expectedKeys = ["Recruiter", "Engineer", "EventPro", "OpenClaw", "Investor"];

  it("should export the 5 expected personas", () => {
    expect(Object.keys(PERSONAS)).toEqual(expect.arrayContaining(expectedKeys));
  });

  it("should configure valid sections for each persona", () => {
    Object.entries(PERSONAS).forEach(([key, info]) => {
      expect(typeof info.label).toBe("string");
      expect(typeof info.bannerText).toBe("string");
      expect(Array.isArray(info.sections)).toBe(true);
      expect(info.sections.length).toBeGreaterThan(0);
    });
  });

  it("should map each persona to collapsible IDs that literally exist in the app", () => {
    const appSource = readFileSync(join(__dirname, "../App.jsx"), "utf8");
    Object.entries(PERSONAS).forEach(([key, info]) => {
      info.sections.forEach((secId) => {
        if (secId === "skills") {
          expect(appSource).toContain("<Skills");
        } else if (secId === "certifications") {
          expect(appSource).toContain("<Certifications");
        } else {
          const idPattern = new RegExp(`id=["']${secId}["']`);
          expect(appSource).toMatch(idPattern);
        }
      });
    });
  });
});
