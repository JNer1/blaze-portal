import { describe, expect, it } from "vitest";
import { emptyStaff, initialForm, rowTotal, todayIso, toRequestInput, validateForm, type SalaryForm } from "./form-state";
import { salaryRequestSchema } from "@/shared/salary-request";

function filledForm(): SalaryForm {
  const form = initialForm();
  form.requestDate = "2026-10-26";
  form.staff = [
    { ...emptyStaff(), name: "Alex Sample", designation: "Project Assistant I", tin: "000-111-222", monthly: "25,000.00", coverageStart: "2025-05", coverageEnd: "2026-02" },
    { ...emptyStaff(), name: "Bea Example", designation: "Science Research Specialist I", tin: "000333444000", monthly: "18,333.33", coverageStart: "2026-01", coverageEnd: "2026-07" },
  ];
  return form;
}

describe("salary form", () => {
  it("produces input the shared schema accepts", () => {
    const form = filledForm();
    expect(validateForm(form)).toEqual({});
    expect(salaryRequestSchema.safeParse(toRequestInput(form)).success).toBe(true);
  });

  it("calculates row totals as the user types", () => {
    const [alex, bea] = filledForm().staff;
    expect(rowTotal(alex!)).toEqual({ monthlyCentavos: 2_500_000, months: 10, totalCentavos: 25_000_000 });
    expect(rowTotal(bea!)).toEqual({ monthlyCentavos: 1_833_333, months: 7, totalCentavos: 12_833_331 });
    expect(rowTotal({ ...alex!, monthly: "" })).toBeNull();
    expect(rowTotal({ ...alex!, coverageEnd: "2025-01" })).toBeNull();
  });

  it("reports the amount parsing message rather than a generic one", () => {
    const form = filledForm();
    form.staff[0]!.monthly = "25000.555";
    expect(validateForm(form)).toEqual({ "staff.0.monthlyCentavos": "Use at most two decimal places." });
  });

  it("reports every invalid field at once", () => {
    const form = filledForm();
    form.staff[1]!.tin = "12";
    form.staff[1]!.coverageEnd = "2025-12";
    form.academicYear = { from: "2025", to: "2027" };
    expect(Object.keys(validateForm(form)).sort()).toEqual([
      "academicYear.to",
      "staff.1.coverageEnd",
      "staff.1.tin",
    ]);
  });

  it("starts with project settings and directory heads filled in", () => {
    const form = initialForm();
    expect(form.lePrefix).toBe("S037-00-");
    expect(form.recipient.name).not.toBe("");
    expect(form.recipient.salutation).not.toBe("");
    expect(form.endorser.name).not.toBe("");
  });

  it("formats today's local date", () => {
    expect(todayIso(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});
