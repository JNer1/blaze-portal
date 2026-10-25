import { describe, expect, it } from "vitest";
import { formatTin, normalizeTin } from "./tin";

describe("TIN", () => {
  it.each([
    ["123456789", "123456789"],
    ["123-456-789", "123456789"],
    ["123 456 789 000", "123456789000"],
  ])("normalizes %j", (input, expected) => {
    expect(normalizeTin(input)).toBe(expected);
  });

  it.each(["12345678", "1234567890", "12345678a", ""])("rejects %j", (input) => {
    expect(normalizeTin(input)).toBeNull();
  });

  it("formats 9 and 12 digit values", () => {
    expect(formatTin("123456789")).toBe("123-456-789");
    expect(formatTin("123456789000")).toBe("123-456-789-000");
  });
});
