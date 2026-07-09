import { describe, it, expect } from "vitest";
import { portfolioItems, modalTypes } from "./portfolioItems";

describe("Curated Portfolio Items Integrity", () => {
  it("should contain a valid array of items", () => {
    expect(Array.isArray(portfolioItems)).toBe(true);
    expect(portfolioItems.length).toBeGreaterThan(0);
  });

  it("should enforce valid fields on all items", () => {
    const ids = new Set();
    
    portfolioItems.forEach((item) => {
      expect(typeof item.id).toBe("string");
      expect(item.id.length).toBeGreaterThan(0);
      expect(ids.has(item.id)).toBe(false); // uniqueness
      ids.add(item.id);

      expect(typeof item.title).toBe("string");
      expect(typeof item.summary).toBe("string");
      expect(typeof item.whyItMatters).toBe("string");
      
      expect(Array.isArray(item.modes)).toBe(true);
      expect(item.modes.length).toBeGreaterThan(0);
      
      expect(Array.isArray(item.skills)).toBe(true);
      expect(Array.isArray(item.stats)).toBe(true);
      
      expect(Array.isArray(item.links)).toBe(true);
      item.links.forEach((link) => {
        expect(typeof link.label).toBe("string");
        expect(typeof link.target).toBe("string");
      });

      expect(typeof item.priority).toBe("number");
    });
  });

  it("should configure the expected curated modal views", () => {
    const keys = Object.keys(modalTypes);
    expect(keys).toContain("recruiterPortfolio");
    expect(keys).toContain("developerProjects");
    expect(keys).toContain("productionTech");
    expect(keys).toContain("googleExperience");
    expect(keys).toContain("jobMatch");

    Object.entries(modalTypes).forEach(([key, info]) => {
      expect(typeof info.title).toBe("string");
      expect(typeof info.subheader).toBe("string");
      expect(typeof info.modeFilter).toBe("string");
    });
  });
});
