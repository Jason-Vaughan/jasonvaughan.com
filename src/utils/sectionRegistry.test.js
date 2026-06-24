import { describe, test, expect, beforeEach, vi } from "vitest";
import {
  registerSection,
  unregisterSection,
  openSection,
  __resetSectionRegistry,
} from "./sectionRegistry.js";

describe("sectionRegistry", () => {
  beforeEach(() => __resetSectionRegistry());

  test("openSection calls the registered opener and reports a hit", () => {
    const open = vi.fn();
    registerSection("skills", open);
    expect(openSection("skills")).toBe(true);
    expect(open).toHaveBeenCalledTimes(1);
  });

  test("openSection is a safe no-op for unregistered ids", () => {
    expect(openSection("does-not-exist")).toBe(false);
  });

  test("unregisterSection removes the opener", () => {
    const open = vi.fn();
    registerSection("certifications", open);
    unregisterSection("certifications");
    expect(openSection("certifications")).toBe(false);
    expect(open).not.toHaveBeenCalled();
  });

  test("re-registering the same id replaces the opener (latest wins)", () => {
    const first = vi.fn();
    const second = vi.fn();
    registerSection("skills", first);
    registerSection("skills", second);
    openSection("skills");
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
