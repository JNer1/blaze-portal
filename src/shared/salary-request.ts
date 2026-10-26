import { z } from "zod";
import { isCentavos, multiplyCentavos, toCentavos, type Centavos } from "./money";
import { countMonthsInclusive, isYearMonth, type YearMonth } from "./months";
import { PROJECT_IDS } from "./projects";
import { normalizeTin } from "./tin";

// Salary worksheet items from the supplied checklist workbook. Advisory only:
// no status ever blocks preparing the letter. See docs/08-salary-request.md.
export const SALARY_CHECKLIST_ITEMS = [
  { id: "disbursementVoucher", label: "Disbursement Voucher" },
  {
    id: "contractOfServices",
    label: "Approved Contract of Services",
    guidance: "For first payment.",
  },
  { id: "dailyTimeRecord", label: "Approved Daily Time Record" },
  {
    id: "accomplishmentReport",
    label: "Accomplishment Report / Certificate of Services Rendered",
    guidance: "Duly approved by the Project Leader.",
  },
] as const satisfies readonly { id: string; label: string; guidance?: string }[];

export type ChecklistItemId = (typeof SALARY_CHECKLIST_ITEMS)[number]["id"];

export const CHECKLIST_STATUSES = ["notReviewed", "available", "missing", "notApplicable"] as const;
export type ChecklistStatus = (typeof CHECKLIST_STATUSES)[number];

export const CHECKLIST_STATUS_LABELS: Record<ChecklistStatus, string> = {
  notReviewed: "Not reviewed",
  available: "Marked available by staff",
  missing: "Missing",
  notApplicable: "Not applicable",
};

const checklistItemIds = SALARY_CHECKLIST_ITEMS.map((item) => item.id) as [
  ChecklistItemId,
  ...ChecklistItemId[],
];

const checklistEntrySchema = z.object({
  status: z.enum(CHECKLIST_STATUSES),
  note: z.string().trim().max(500),
});

const yearMonthSchema = z
  .string()
  .refine(isYearMonth, "Enter a month.")
  .transform((value) => value as YearMonth);

const optionalText = (max: number) => z.string().trim().max(max);
const requiredText = (max: number, message: string) => z.string().trim().min(1, message).max(max);

export const salaryStaffSchema = z
  .object({
    name: requiredText(200, "Enter the staff member's name."),
    designation: requiredText(200, "Enter the designation."),
    tin: z.string().transform((value, ctx) => {
      const digits = normalizeTin(value);
      if (digits === null) {
        ctx.addIssue({ code: "custom", message: "Enter a 9- or 12-digit TIN." });
        return z.NEVER;
      }
      return digits;
    }),
    monthlyCentavos: z
      .int()
      .positive("Monthly amount must be greater than zero.")
      .refine(isCentavos, "Amount is too large.")
      .transform((value) => value as Centavos),
    coverageStart: yearMonthSchema,
    coverageEnd: yearMonthSchema,
    checklist: z.record(z.enum(checklistItemIds), checklistEntrySchema),
  })
  // `when` lets these run even if another field (e.g. TIN) failed, so the user
  // sees every problem at once, but only when the values they need are valid.
  .refine((row) => countMonthsInclusive(row.coverageStart, row.coverageEnd) >= 1, {
    path: ["coverageEnd"],
    message: "End month cannot be before the start month.",
    when: ({ value }) => hasValidCoverage(value),
  })
  .refine(
    (row) =>
      isCentavos(row.monthlyCentavos * countMonthsInclusive(row.coverageStart, row.coverageEnd)),
    {
      path: ["monthlyCentavos"],
      message: "Total is too large.",
      when: ({ value }) =>
        hasValidCoverage(value) &&
        Number.isSafeInteger((value as { monthlyCentavos?: unknown }).monthlyCentavos),
    },
  );

function hasValidCoverage(value: unknown): boolean {
  const row = value as { coverageStart?: unknown; coverageEnd?: unknown };
  return (
    typeof row.coverageStart === "string" &&
    typeof row.coverageEnd === "string" &&
    isYearMonth(row.coverageStart) &&
    isYearMonth(row.coverageEnd)
  );
}

// "2025-2026": two consecutive years. Entered manually (confirmed 2026-10-27).
export function isAcademicYear(value: string): boolean {
  const match = /^(\d{4})-(\d{4})$/.exec(value);
  return match !== null && Number(match[2]) === Number(match[1]) + 1;
}

const letterPersonSchema = z.object({
  name: optionalText(200),
  title: optionalText(200),
});

export const salaryRequestSchema = z.object({
  // Project settings (title, account name, project leader) come from the
  // project, not the request.
  projectId: z.enum(PROJECT_IDS),
  // Printed as "UST: <prefix><LE number>". The prefix defaults from the
  // project and can be overridden. The LE number is entered exactly as issued
  // by RCNAS; blank means the letter is still a draft.
  lePrefix: requiredText(50, "Enter the LE prefix."),
  leNumber: optionalText(50),
  academicYear: z
    .string()
    .trim()
    .refine((v) => v === "" || isAcademicYear(v), "Use consecutive years like 2025-2026."),
  requestDate: z.iso.date("Enter the request date."),
  // Copies of the names used, so later directory changes don't alter this letter.
  recipient: letterPersonSchema.extend({ salutation: optionalText(200) }),
  endorser: letterPersonSchema,
  staff: z.array(salaryStaffSchema).min(1, "Add at least one staff member.").max(50),
});

export type SalaryRequestInput = z.input<typeof salaryRequestSchema>;
export type SalaryRequest = z.output<typeof salaryRequestSchema>;
export type SalaryStaff = z.output<typeof salaryStaffSchema>;

export type StaffTotal = { months: number; totalCentavos: Centavos };

// Per-staff only. Salary letters carry no grand total (confirmed 2026-10-26).
export function calculateStaffTotal(
  row: Pick<SalaryStaff, "monthlyCentavos" | "coverageStart" | "coverageEnd">,
): StaffTotal {
  const months = countMonthsInclusive(row.coverageStart, row.coverageEnd);
  if (months < 1) throw new RangeError("End month is before start month.");
  return { months, totalCentavos: multiplyCentavos(toCentavos(row.monthlyCentavos), months) };
}

export type ChecklistSummary = {
  counts: Record<ChecklistStatus, number>;
  outstanding: { staffName: string; missing: string[]; notReviewed: string[] }[];
};

export function summarizeChecklist(
  staff: readonly { name: string; checklist: Partial<Record<ChecklistItemId, { status: ChecklistStatus }>> }[],
): ChecklistSummary {
  const counts: Record<ChecklistStatus, number> = {
    notReviewed: 0,
    available: 0,
    missing: 0,
    notApplicable: 0,
  };
  const outstanding: ChecklistSummary["outstanding"] = [];

  for (const person of staff) {
    const missing: string[] = [];
    const notReviewed: string[] = [];
    for (const item of SALARY_CHECKLIST_ITEMS) {
      const status = person.checklist[item.id]?.status ?? "notReviewed";
      counts[status] += 1;
      if (status === "missing") missing.push(item.label);
      if (status === "notReviewed") notReviewed.push(item.label);
    }
    if (missing.length > 0 || notReviewed.length > 0) {
      outstanding.push({ staffName: person.name, missing, notReviewed });
    }
  }
  return { counts, outstanding };
}

export function emptyChecklist(): Record<ChecklistItemId, { status: ChecklistStatus; note: string }> {
  return Object.fromEntries(
    SALARY_CHECKLIST_ITEMS.map((item) => [item.id, { status: "notReviewed", note: "" }]),
  ) as Record<ChecklistItemId, { status: ChecklistStatus; note: string }>;
}

export type FieldError = { path: string; message: string };

export function toFieldErrors(error: z.ZodError): FieldError[] {
  return error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }));
}

export type SalaryCheckResponse =
  | { ok: true; staff: StaffTotal[] }
  | { ok: false; errors: FieldError[] };
