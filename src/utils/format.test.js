import { describe, test, expect } from "vitest";
import { formatBigNumber } from "./format.js";

describe("formatBigNumber", () => {
  test("formats sub-1k integers with toLocaleString (no suffix)", () => {
    expect(formatBigNumber(0)).toBe("0");
    expect(formatBigNumber(1)).toBe("1");
    expect(formatBigNumber(42)).toBe("42");
    expect(formatBigNumber(999)).toBe("999");
  });

  test("formats thousands with K+ suffix and floor (no decimal)", () => {
    expect(formatBigNumber(1000)).toBe("1K+");
    expect(formatBigNumber(1500)).toBe("1K+");
    expect(formatBigNumber(9999)).toBe("9K+");
    expect(formatBigNumber(330_000)).toBe("330K+");
    expect(formatBigNumber(999_999)).toBe("999K+");
  });

  test("formats millions with M+ suffix and one decimal", () => {
    expect(formatBigNumber(1_000_000)).toBe("1.0M+");
    expect(formatBigNumber(1_500_000)).toBe("1.5M+");
    expect(formatBigNumber(9_300_000)).toBe("9.3M+");
    expect(formatBigNumber(999_999_999)).toBe("1000.0M+");
  });

  test("formats billions with B+ suffix and one decimal", () => {
    expect(formatBigNumber(1_000_000_000)).toBe("1.0B+");
    expect(formatBigNumber(9_300_000_000)).toBe("9.3B+");
    expect(formatBigNumber(12_500_000_000)).toBe("12.5B+");
  });

  test("boundary values cross to the next suffix tier", () => {
    expect(formatBigNumber(999)).toBe("999");
    expect(formatBigNumber(1000)).toBe("1K+");
    expect(formatBigNumber(999_999)).toBe("999K+");
    expect(formatBigNumber(1_000_000)).toBe("1.0M+");
    expect(formatBigNumber(999_999_999)).toBe("1000.0M+");
    expect(formatBigNumber(1_000_000_000)).toBe("1.0B+");
  });
});
