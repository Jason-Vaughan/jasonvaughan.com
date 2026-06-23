import { describe, test, expect } from "vitest";
import { certifications } from "./certifications.js";

describe("certifications data contract", () => {
  test("is a non-empty array", () => {
    expect(Array.isArray(certifications)).toBe(true);
    expect(certifications.length).toBeGreaterThan(0);
  });

  test("every cert has a non-empty name and issuer, and a string year", () => {
    for (const cert of certifications) {
      expect(typeof cert.name).toBe("string");
      expect(cert.name.trim().length).toBeGreaterThan(0);
      expect(typeof cert.issuer).toBe("string");
      expect(cert.issuer.trim().length).toBeGreaterThan(0);
      // year is always a string; "" means "render no chip"
      expect(typeof cert.year).toBe("string");
      // detail is optional; when present it must be a string ("" = none)
      if ("detail" in cert) {
        expect(typeof cert.detail).toBe("string");
      }
    }
  });

  test("any set year is a 4-digit year string", () => {
    for (const cert of certifications) {
      if (cert.year !== "") {
        expect(cert.year).toMatch(/^\d{4}$/);
      }
    }
  });

  test("issuer+name pairs are unique (stable React keys)", () => {
    const keys = certifications.map((c) => `${c.issuer}-${c.name}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  test("stays a curated short list — no résumé dump", () => {
    // Intentional design constraint: curated, not exhaustive. If this trips,
    // it's a deliberate decision, not a bug — bump the bound consciously.
    expect(certifications.length).toBeLessThanOrEqual(8);
  });
});
