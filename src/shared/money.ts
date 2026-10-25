// Money is always a whole number of centavos (PHP). Never store or calculate
// pesos as floating-point values: 0.29 * 100 === 28.999999999999996.

declare const centavosBrand: unique symbol;
export type Centavos = number & { readonly [centavosBrand]: true };

export function isCentavos(value: number): value is Centavos {
  return Number.isSafeInteger(value);
}

export function toCentavos(value: number): Centavos {
  if (!isCentavos(value)) {
    throw new RangeError(`Not a safe whole number of centavos: ${value}`);
  }
  return value;
}

export type ParseAmountResult =
  | { ok: true; centavos: Centavos }
  | { ok: false; error: string };

// Accepts "25000", "25,000", "25,000.5", "₱18,333.33". Comma grouping must be
// consistent. More than two decimal places is rejected, never rounded.
const AMOUNT_PATTERN = /^(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d{1,2}))?$/;

export function parsePesoAmount(input: string): ParseAmountResult {
  const text = input.trim().replace(/^₱\s*/, "");
  if (text === "") return { ok: false, error: "Enter an amount." };
  if (text.startsWith("-")) return { ok: false, error: "Amount cannot be negative." };

  const match = AMOUNT_PATTERN.exec(text);
  if (!match) {
    return /\.\d{3,}$/.test(text)
      ? { ok: false, error: "Use at most two decimal places." }
      : { ok: false, error: "Enter an amount like 25,000.00." };
  }

  const [whole = "0", fraction = ""] = text.replaceAll(",", "").split(".");
  const centavos = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  if (!isCentavos(centavos)) return { ok: false, error: "Amount is too large." };
  return { ok: true, centavos };
}

export function multiplyCentavos(amount: Centavos, factor: number): Centavos {
  if (!Number.isSafeInteger(factor)) {
    throw new RangeError(`Factor must be a whole number: ${factor}`);
  }
  return toCentavos(amount * factor);
}

// Formats without dividing into a float, so large values stay exact.
export function formatCentavos(amount: Centavos): string {
  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);
  const cents = abs % 100;
  const pesos = (abs - cents) / 100;
  const grouped = String(pesos).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}₱${grouped}.${String(cents).padStart(2, "0")}`;
}

// Plain "25000.00" form for re-populating an input field.
export function centavosToInput(amount: Centavos): string {
  const cents = amount % 100;
  return `${(amount - cents) / 100}.${String(cents).padStart(2, "0")}`;
}
