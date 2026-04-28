import { describe, test, expect } from "vitest";
import { autoLanguageTags } from "./languageTags.js";

describe("autoLanguageTags", () => {
  test("returns empty array when languages is undefined / null / not array", () => {
    expect(autoLanguageTags(undefined)).toEqual([]);
    expect(autoLanguageTags(null)).toEqual([]);
    expect(autoLanguageTags("not-an-array")).toEqual([]);
    expect(autoLanguageTags({})).toEqual([]);
  });

  test("returns empty array when no languages present", () => {
    expect(autoLanguageTags([], [])).toEqual([]);
    expect(autoLanguageTags([], ["React"])).toEqual([]);
  });

  test("returns language names that aren't in curated tags", () => {
    const langs = [
      { name: "Python", percent: 80 },
      { name: "JavaScript", percent: 20 },
    ];
    expect(autoLanguageTags(langs, ["React"])).toEqual(["Python", "JavaScript"]);
  });

  test("de-dupes against curated tags case-insensitively", () => {
    const langs = [
      { name: "Python", percent: 80 },
      { name: "JavaScript", percent: 20 },
    ];
    expect(autoLanguageTags(langs, ["python"])).toEqual(["JavaScript"]);
    expect(autoLanguageTags(langs, ["JAVASCRIPT"])).toEqual(["Python"]);
  });

  test("filters noise languages (CSS / HTML / Shell / etc.)", () => {
    const langs = [
      { name: "TypeScript", percent: 70 },
      { name: "CSS", percent: 15 },
      { name: "HTML", percent: 10 },
      { name: "Shell", percent: 3 },
      { name: "Dockerfile", percent: 2 },
    ];
    expect(autoLanguageTags(langs, [])).toEqual(["TypeScript"]);
  });

  test("subsumes JavaScript when TypeScript is curated", () => {
    const langs = [
      { name: "JavaScript", percent: 60 },
      { name: "TypeScript", percent: 40 },
    ];
    expect(autoLanguageTags(langs, ["TypeScript"])).toEqual([]);
  });

  test("subsumes JavaScript when TypeScript is detected (not curated)", () => {
    const langs = [
      { name: "JavaScript", percent: 60 },
      { name: "TypeScript", percent: 40 },
    ];
    // TypeScript is detected, so JavaScript gets subsumed and TS itself appears
    expect(autoLanguageTags(langs, [])).toEqual(["TypeScript"]);
  });

  test("subsumes JavaScript when Node.js is in curated tags", () => {
    const langs = [{ name: "JavaScript", percent: 100 }];
    expect(autoLanguageTags(langs, ["Node.js"])).toEqual([]);
  });

  test("preserves input order in output", () => {
    const langs = [
      { name: "Go", percent: 60 },
      { name: "Python", percent: 30 },
      { name: "Rust", percent: 10 },
    ];
    expect(autoLanguageTags(langs, [])).toEqual(["Go", "Python", "Rust"]);
  });

  test("handles all-noise input", () => {
    const langs = [
      { name: "CSS", percent: 50 },
      { name: "HTML", percent: 30 },
      { name: "Makefile", percent: 20 },
    ];
    expect(autoLanguageTags(langs, [])).toEqual([]);
  });
});
