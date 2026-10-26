// Salary coverage is counted in whole calendar months, inclusive of both the
// start and end month. Day-level dates are never subtracted.

export type YearMonth = `${number}-${number}`;

const YEAR_MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export function isYearMonth(value: string): value is YearMonth {
  return YEAR_MONTH_PATTERN.test(value);
}

function parts(value: YearMonth): { year: number; month: number } {
  const match = YEAR_MONTH_PATTERN.exec(value);
  if (!match) throw new RangeError(`Invalid year-month: ${value}`);
  return { year: Number(match[1]), month: Number(match[2]) };
}

// May 2025 – February 2026 → 10. Returns 0 or less when end is before start.
export function countMonthsInclusive(start: YearMonth, end: YearMonth): number {
  const a = parts(start);
  const b = parts(end);
  return (b.year - a.year) * 12 + (b.month - a.month) + 1;
}

export function formatYearMonth(value: YearMonth): string {
  const { year, month } = parts(value);
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function formatCoverage(start: YearMonth, end: YearMonth): string {
  return start === end
    ? formatYearMonth(start)
    : `${formatYearMonth(start)} – ${formatYearMonth(end)}`;
}

// "2026-10-26" → "October 26, 2026". Parsed by hand to avoid timezone shifts.
export function formatIsoDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  const month = match ? MONTH_NAMES[Number(match[2]) - 1] : undefined;
  if (!match || !month) throw new RangeError(`Invalid date: ${value}`);
  return `${month} ${Number(match[3])}, ${match[1]}`;
}
