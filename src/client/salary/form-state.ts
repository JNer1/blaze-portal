import { parsePesoAmount, type Centavos } from "@/shared/money";
import { isYearMonth } from "@/shared/months";
import {
  calculateStaffTotal,
  emptyChecklist,
  salaryRequestSchema,
  toFieldErrors,
  type ChecklistItemId,
  type ChecklistStatus,
  type SalaryRequestInput,
  type StaffTotal,
} from "@/shared/salary-request";

// What the form holds: raw text exactly as typed. Converted to the shared
// schema's input (centavos, YYYY-MM) only when validating or sending.
export type StaffForm = {
  key: string;
  name: string;
  designation: string;
  tin: string;
  monthly: string;
  coverageStart: string;
  coverageEnd: string;
  checklist: Record<ChecklistItemId, { status: ChecklistStatus; note: string }>;
};

export type SalaryForm = {
  leNumber: string;
  requestDate: string;
  projectTitle: string;
  chargeReference: string;
  recipient: { name: string; title: string };
  signatories: [{ name: string; title: string }, { name: string; title: string }];
  staff: StaffForm[];
};

let nextKey = 0;

export function emptyStaff(): StaffForm {
  nextKey += 1;
  return {
    key: `staff-${nextKey}`,
    name: "",
    designation: "",
    tin: "",
    monthly: "",
    coverageStart: "",
    coverageEnd: "",
    checklist: emptyChecklist(),
  };
}

export function todayIso(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function initialForm(): SalaryForm {
  return {
    leNumber: "",
    requestDate: todayIso(),
    projectTitle: "",
    chargeReference: "",
    recipient: { name: "", title: "" },
    signatories: [
      { name: "", title: "" },
      { name: "", title: "" },
    ],
    staff: [emptyStaff()],
  };
}

export function toRequestInput(form: SalaryForm): SalaryRequestInput {
  return {
    leNumber: form.leNumber,
    requestDate: form.requestDate,
    projectTitle: form.projectTitle,
    chargeReference: form.chargeReference,
    recipient: form.recipient,
    signatories: form.signatories,
    staff: form.staff.map((row) => {
      const amount = parsePesoAmount(row.monthly);
      return {
        name: row.name,
        designation: row.designation,
        tin: row.tin,
        // An unparseable amount is reported by parsePesoAmount below; send a
        // value the schema also rejects so client and server agree.
        monthlyCentavos: amount.ok ? amount.centavos : Number.NaN,
        coverageStart: row.coverageStart,
        coverageEnd: row.coverageEnd,
        checklist: row.checklist,
      };
    }),
  };
}

export type FormErrors = Record<string, string>;

export function validateForm(form: SalaryForm): FormErrors {
  const errors: FormErrors = {};

  form.staff.forEach((row, index) => {
    const amount = parsePesoAmount(row.monthly);
    if (!amount.ok) errors[`staff.${index}.monthlyCentavos`] = amount.error;
  });

  const result = salaryRequestSchema.safeParse(toRequestInput(form));
  if (!result.success) {
    for (const { path, message } of toFieldErrors(result.error)) {
      // Keep the first message per field; amount parsing messages are clearer.
      errors[path] ??= message;
    }
  }
  return errors;
}

// Total for one row, or null while the row's amount or months are incomplete.
export function rowTotal(row: StaffForm): (StaffTotal & { monthlyCentavos: Centavos }) | null {
  const amount = parsePesoAmount(row.monthly);
  if (!amount.ok || amount.centavos <= 0) return null;
  if (!isYearMonth(row.coverageStart) || !isYearMonth(row.coverageEnd)) return null;
  try {
    const monthlyCentavos = amount.centavos;
    return {
      monthlyCentavos,
      ...calculateStaffTotal({ monthlyCentavos, coverageStart: row.coverageStart, coverageEnd: row.coverageEnd }),
    };
  } catch {
    return null;
  }
}
