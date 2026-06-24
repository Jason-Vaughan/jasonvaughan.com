import { describe, test, expect } from "vitest";
import { skillGroups } from "./skills.js";

const ALLOWED_LEVELS = ["Expert", "Advanced", "Proficient", "Familiar"];

describe("skillGroups data contract", () => {
  test("is a non-empty array", () => {
    expect(Array.isArray(skillGroups)).toBe(true);
    expect(skillGroups.length).toBeGreaterThan(0);
  });

  test("every group has a non-empty domain and at least one skill", () => {
    for (const group of skillGroups) {
      expect(typeof group.domain).toBe("string");
      expect(group.domain.trim().length).toBeGreaterThan(0);
      expect(Array.isArray(group.skills)).toBe(true);
      expect(group.skills.length).toBeGreaterThan(0);
    }
  });

  test("domains are unique (no duplicate cards)", () => {
    const domains = skillGroups.map((g) => g.domain);
    expect(new Set(domains).size).toBe(domains.length);
  });

  test("every skill has a non-empty name and a string level", () => {
    for (const group of skillGroups) {
      for (const skill of group.skills) {
        expect(typeof skill.name).toBe("string");
        expect(skill.name.trim().length).toBeGreaterThan(0);
        // level is always a string; "" means "render no pill"
        expect(typeof skill.level).toBe("string");
      }
    }
  });

  test("skill names are unique within a group", () => {
    for (const group of skillGroups) {
      const names = group.skills.map((s) => s.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  test("any set level is from the allowed ladder", () => {
    for (const group of skillGroups) {
      for (const skill of group.skills) {
        if (skill.level !== "") {
          expect(ALLOWED_LEVELS).toContain(skill.level);
        }
      }
    }
  });
});
