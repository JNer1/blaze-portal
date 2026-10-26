import { describe, expect, it } from "vitest";
import { countMonthsInclusive, formatCoverage, formatIsoDate, isYearMonth } from "./months";

describe("countMonthsInclusive", () => {
  it.each([
    ["2025-05", "2026-02", 10],
    ["2026-01", "2026-01", 1],
    ["2026-01", "2026-07", 7],
    ["2025-12", "2026-01", 2],
    ["2026-03", "2026-02", 0],
  ] as const)("%s to %s is %d", (start, end, expected) => {
    expect(countMonthsInclusive(start, end)).toBe(expected);
  });
});

describe("isYearMonth", () => {
  it("accepts YYYY-MM only", () => {
    expect(isYearMonth("2026-10")).toBe(true);
    expect(isYearMonth("2026-13")).toBe(false);
    expect(isYearMonth("2026-1")).toBe(false);
    expect(isYearMonth("2026-10-01")).toBe(false);
  });
});

describe("formatting", () => {
  it("formats coverage ranges", () => {
    expect(formatCoverage("2025-05", "2026-02")).toBe("May 2025 – February 2026");
    expect(formatCoverage("2026-01", "2026-01")).toBe("January 2026");
  });

  it("formats ISO dates without timezone shifts", () => {
    expect(formatIsoDate("2026-10-01")).toBe("October 1, 2026");
    expect(() => formatIsoDate("2026-13-01")).toThrow(RangeError);
  });
});
