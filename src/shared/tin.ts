// Philippine TIN: 9 digits, optionally followed by a 3-digit branch code.
// This checks format only; it does not confirm the number with BIR.

export function normalizeTin(input: string): string | null {
  const digits = input.replace(/[\s-]/g, "");
  return /^\d{9}(\d{3})?$/.test(digits) ? digits : null;
}

export function formatTin(digits: string): string {
  return digits.replace(/(\d{3})(?=\d)/g, "$1-");
}
