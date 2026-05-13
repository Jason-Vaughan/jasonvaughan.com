import { describe, test, expect } from "vitest";
import { formatBigNumber, formatDelta } from "./format.js";

describe("formatBigNumber", () => {
  test("formats sub-1k integers with toLocaleString (no suffix)", () => {
    expect(formatBigNumber(0)).toBe("0");
    expect(formatBigNumber(1)).toBe("1");
    expect(formatBigNumber(42)).toBe("42");
    expect(formatBigNumber(999)).toBe("999");
  });

  test("formats 1K-100K with one decimal so small changes are visible", () => {
    expect(formatBigNumber(1000)).toBe("1.0K+");
    expect(formatBigNumber(2_809)).toBe("2.8K+");
    expect(formatBigNumber(5_869)).toBe("5.9K+");
    expect(formatBigNumber(9_999)).toBe("10.0K+");
    expect(formatBigNumber(94_963)).toBe("95.0K+");
    expect(formatBigNumber(99_999)).toBe("100.0K+");
  });

  test("formats 100K-1M with whole K (already 3 sig figs)", () => {
    expect(formatBigNumber(100_000)).toBe("100K+");
    expect(formatBigNumber(330_000)).toBe("330K+");
    expect(formatBigNumber(398_650)).toBe("398K+");
    expect(formatBigNumber(999_999)).toBe("999K+");
  });

  test("formats millions with M+ suffix and one decimal", () => {
    expect(formatBigNumber(1_000_000)).toBe("1.0M+");
    expect(formatBigNumber(1_500_000)).toBe("1.5M+");
    expect(formatBigNumber(9_300_000)).toBe("9.3M+");
  });

  test("formats billions with B+ suffix and one decimal", () => {
    expect(formatBigNumber(1_000_000_000)).toBe("1.0B+");
    expect(formatBigNumber(9_300_000_000)).toBe("9.3B+");
    expect(formatBigNumber(12_500_000_000)).toBe("12.5B+");
  });

  test("boundary values cross to the next suffix tier", () => {
    expect(formatBigNumber(999)).toBe("999");
    expect(formatBigNumber(1000)).toBe("1.0K+");
    expect(formatBigNumber(99_999)).toBe("100.0K+");
    expect(formatBigNumber(100_000)).toBe("100K+");
    expect(formatBigNumber(999_999)).toBe("999K+");
    expect(formatBigNumber(1_000_000)).toBe("1.0M+");
    expect(formatBigNumber(1_000_000_000)).toBe("1.0B+");
  });
});

describe("formatDelta", () => {
  test("zero renders as ±0", () => {
    expect(formatDelta(0)).toBe("±0");
  });

  test("positive deltas use + prefix", () => {
    expect(formatDelta(1)).toBe("+1");
    expect(formatDelta(42)).toBe("+42");
    expect(formatDelta(999)).toBe("+999");
  });

  test("negative deltas use unicode minus", () => {
    expect(formatDelta(-1)).toBe("−1");
    expect(formatDelta(-42)).toBe("−42");
  });

  test("K/M abbreviation for large deltas", () => {
    expect(formatDelta(1_000)).toBe("+1.0K");
    expect(formatDelta(36_000)).toBe("+36.0K");
    expect(formatDelta(100_000)).toBe("+100K");
    expect(formatDelta(1_500_000)).toBe("+1.5M");
    expect(formatDelta(-2_500)).toBe("−2.5K");
  });
});
