import { describe, expect, it } from "vitest";
import {
  centavosToInput,
  formatCentavos,
  multiplyCentavos,
  parsePesoAmount,
  toCentavos,
} from "./money";

describe("parsePesoAmount", () => {
  it.each([
    ["25000", 2_500_000],
    ["25,000", 2_500_000],
    ["25,000.00", 2_500_000],
    ["₱18,333.33", 1_833_333],
    ["0.29", 29],
    ["1.5", 150],
    ["  1234567.89 ", 123_456_789],
  ])("parses %j exactly", (input, expected) => {
    expect(parsePesoAmount(input)).toEqual({ ok: true, centavos: expected });
  });

  it.each([
    ["", "Enter an amount."],
    ["-100", "Amount cannot be negative."],
    ["10.555", "Use at most two decimal places."],
    ["1,00", "Enter an amount like 25,000.00."],
    ["12,3456", "Enter an amount like 25,000.00."],
    ["abc", "Enter an amount like 25,000.00."],
    ["1e5", "Enter an amount like 25,000.00."],
    ["99999999999999999", "Amount is too large."],
  ])("rejects %j", (input, error) => {
    expect(parsePesoAmount(input)).toEqual({ ok: false, error });
  });
});

describe("multiplyCentavos", () => {
  it("multiplies without floating-point drift", () => {
    expect(multiplyCentavos(toCentavos(1_833_333), 7)).toBe(12_833_331);
    expect(multiplyCentavos(toCentavos(29), 3)).toBe(87);
  });

  it("refuses results outside the safe integer range", () => {
    expect(() => multiplyCentavos(toCentavos(Number.MAX_SAFE_INTEGER), 2)).toThrow(RangeError);
  });

  it("refuses fractional factors", () => {
    expect(() => multiplyCentavos(toCentavos(100), 1.5)).toThrow(RangeError);
  });
});

describe("formatCentavos", () => {
  it.each([
    [0, "₱0.00"],
    [5, "₱0.05"],
    [2_500_000, "₱25,000.00"],
    [12_833_331, "₱128,333.31"],
    [Number.MAX_SAFE_INTEGER, "₱90,071,992,547,409.91"],
  ])("formats %d as %s", (value, expected) => {
    expect(formatCentavos(toCentavos(value))).toBe(expected);
  });

  it("round-trips through the input format", () => {
    expect(centavosToInput(toCentavos(1_833_333))).toBe("18333.33");
    expect(parsePesoAmount(centavosToInput(toCentavos(1_833_333)))).toEqual({
      ok: true,
      centavos: 1_833_333,
    });
  });
});
