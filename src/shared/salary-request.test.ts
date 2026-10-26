import { describe, expect, it } from "vitest";
import {
  calculateStaffTotal,
  emptyChecklist,
  salaryRequestSchema,
  summarizeChecklist,
  toFieldErrors,
} from "./salary-request";
import { syntheticSalaryRequest } from "./test-fixtures";

function errorsFor(input: unknown) {
  const result = salaryRequestSchema.safeParse(input);
  return result.success ? [] : toFieldErrors(result.error);
}

describe("salaryRequestSchema", () => {
  it("accepts a valid synthetic request and normalizes TINs", () => {
    const parsed = salaryRequestSchema.parse(syntheticSalaryRequest());
    expect(parsed.staff.map((s) => s.tin)).toEqual(["000111222", "000333444000"]);
  });

  it.each(["", "2025-2026"])("accepts academic year %j", (academicYear) => {
    expect(errorsFor({ ...syntheticSalaryRequest(), academicYear })).toEqual([]);
  });

  it.each(["2025-2027", "2025", "25-26", "2025–2026"])("rejects academic year %j", (academicYear) => {
    expect(errorsFor({ ...syntheticSalaryRequest(), academicYear })).toEqual([
      { path: "academicYear", message: "Use consecutive years like 2025-2026." },
    ]);
  });

  it("rejects unknown projects and a blank LE prefix", () => {
    expect(errorsFor({ ...syntheticSalaryRequest(), projectId: "other" }).map((e) => e.path)).toEqual(["projectId"]);
    expect(errorsFor({ ...syntheticSalaryRequest(), lePrefix: " " }).map((e) => e.path)).toEqual(["lePrefix"]);
  });

  it("allows a blank LE number (draft)", () => {
    expect(errorsFor({ ...syntheticSalaryRequest(), leNumber: "" })).toEqual([]);
  });

  it("rejects end month before start month", () => {
    const input = syntheticSalaryRequest();
    input.staff[0]!.coverageEnd = "2025-04";
    expect(errorsFor(input)).toEqual([
      { path: "staff.0.coverageEnd", message: "End month cannot be before the start month." },
    ]);
  });

  it.each([
    ["tin", "12345", "staff.0.tin"],
    ["monthlyCentavos", 0, "staff.0.monthlyCentavos"],
    ["monthlyCentavos", -100, "staff.0.monthlyCentavos"],
    ["monthlyCentavos", 100.5, "staff.0.monthlyCentavos"],
    ["name", "  ", "staff.0.name"],
    ["coverageStart", "2026-13", "staff.0.coverageStart"],
  ])("rejects invalid %s %j", (field, value, path) => {
    const input = syntheticSalaryRequest();
    Object.assign(input.staff[0]!, { [field]: value });
    expect(errorsFor(input).map((e) => e.path)).toContain(path);
  });

  it("rejects totals beyond the safe range", () => {
    const input = syntheticSalaryRequest();
    input.staff[0]!.monthlyCentavos = Number.MAX_SAFE_INTEGER;
    expect(errorsFor(input)).toEqual([{ path: "staff.0.monthlyCentavos", message: "Total is too large." }]);
  });

  it("requires at least one staff member", () => {
    expect(errorsFor({ ...syntheticSalaryRequest(), staff: [] }).map((e) => e.path)).toEqual(["staff"]);
  });

  it("does not require any checklist item to be available", () => {
    const input = syntheticSalaryRequest();
    input.staff[0]!.checklist.dailyTimeRecord = { status: "missing", note: "" };
    expect(errorsFor(input)).toEqual([]);
  });
});

describe("calculateStaffTotal", () => {
  it("multiplies monthly amount by inclusive months", () => {
    expect(calculateStaffTotal({ monthlyCentavos: 2_500_000 as never, coverageStart: "2025-05", coverageEnd: "2026-02" }))
      .toEqual({ months: 10, totalCentavos: 25_000_000 });
    expect(calculateStaffTotal({ monthlyCentavos: 1_833_333 as never, coverageStart: "2026-01", coverageEnd: "2026-07" }))
      .toEqual({ months: 7, totalCentavos: 12_833_331 });
  });
});

describe("summarizeChecklist", () => {
  it("counts statuses and lists outstanding items per person", () => {
    const complete = emptyChecklist();
    complete.disbursementVoucher.status = "available";
    complete.contractOfServices.status = "notApplicable";
    complete.dailyTimeRecord.status = "available";
    complete.accomplishmentReport.status = "available";
    const partial = emptyChecklist();
    partial.dailyTimeRecord.status = "missing";

    const summary = summarizeChecklist([
      { name: "Alex Sample", checklist: complete },
      { name: "Bea Example", checklist: partial },
    ]);

    expect(summary.counts).toEqual({ available: 3, notApplicable: 1, missing: 1, notReviewed: 3 });
    expect(summary.outstanding).toEqual([
      {
        staffName: "Bea Example",
        missing: ["Approved Daily Time Record"],
        notReviewed: [
          "Disbursement Voucher",
          "Approved Contract of Services",
          "Accomplishment Report / Certificate of Services Rendered",
        ],
      },
    ]);
  });
});
