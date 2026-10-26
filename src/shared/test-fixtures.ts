import { emptyChecklist, type SalaryRequestInput } from "./salary-request";

// Synthetic data only. Not based on real staff, TINs, or salaries.
export function syntheticSalaryRequest(): SalaryRequestInput {
  return {
    leNumber: "",
    requestDate: "2026-10-26",
    projectTitle: "Sample Research Project (synthetic)",
    chargeReference: "Sample Fund Code 0000",
    recipient: { name: "Sample Recipient", title: "Vice-Rector for Finance" },
    signatories: [
      { name: "Sample Signatory One", title: "Project Leader" },
      { name: "Sample Signatory Two", title: "Program Leader" },
    ],
    staff: [
      {
        name: "Alex Sample",
        designation: "Project Assistant I",
        tin: "000-111-222",
        monthlyCentavos: 2_500_000,
        coverageStart: "2025-05",
        coverageEnd: "2026-02",
        checklist: emptyChecklist(),
      },
      {
        name: "Bea Example",
        designation: "Science Research Specialist I",
        tin: "000-333-444-000",
        monthlyCentavos: 1_833_333,
        coverageStart: "2026-01",
        coverageEnd: "2026-07",
        checklist: emptyChecklist(),
      },
    ],
  };
}
