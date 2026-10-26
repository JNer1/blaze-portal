import { formatCentavos } from "@/shared/money";
import { formatCoverage, formatIsoDate, isYearMonth } from "@/shared/months";
import { formatTin, normalizeTin } from "@/shared/tin";
import { OFFICES } from "@/shared/offices";
import { getProject } from "@/shared/projects";
import { rowTotal, type SalaryForm } from "./form-state";

function orPlaceholder(value: string, placeholder: string) {
  const text = value.trim();
  return text ? text : <span className="text-neutral-400">[{placeholder}]</span>;
}

function safeDate(value: string) {
  try {
    return formatIsoDate(value);
  } catch {
    return null;
  }
}

export function LetterPreview({ form }: { form: SalaryForm }) {
  const project = getProject(form.projectId);
  const le = form.leNumber.trim();
  const leader = project.projectLeader;

  return (
    <article
      aria-label="Letter preview"
      className="relative mx-auto aspect-[210/297] w-full max-w-[210mm] overflow-hidden bg-white p-[8%] font-serif text-[11px] leading-relaxed text-neutral-900 shadow-md"
    >
      {!le && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-5xl font-bold text-red-500/15 -rotate-30"
        >
          DRAFT – NO LE
        </div>
      )}

      <div className="font-semibold" data-testid="le-header">
        <p>
          UST: {form.lePrefix.trim()}
          {le || <span className="text-neutral-400">[LE number]</span>}
        </p>
        <p>A.Y. {orPlaceholder(form.academicYear, "yyyy-yyyy")}</p>
      </div>
      <p className="mt-4">{safeDate(form.requestDate) ?? orPlaceholder("", "Date")}</p>

      <div className="mt-4">
        <p className="font-semibold">{orPlaceholder(form.recipient.name, "Recipient name")}</p>
        <p>{orPlaceholder(form.recipient.title, "Recipient title")}</p>
        <p>{OFFICES.ovrf.name}</p>
      </div>

      <p className="mt-4">Dear {orPlaceholder(form.recipient.salutation, "Salutation")}:</p>
      <p className="mt-3">Greetings!</p>

      <p className="mt-3 text-justify">
        In line with the {project.shortName}: {project.accountName} we would like to request the following amounts
        in check for the salaries of the following research staff of the project:
      </p>

      <table className="mt-3 w-full border-collapse text-[10px]">
        <thead>
          <tr className="bg-neutral-100">
            {["Name", "Designation", "TIN", "Monthly Salary", "Coverage", "Total Amount"].map((h) => (
              <th key={h} scope="col" className="border border-neutral-400 px-1.5 py-1 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {form.staff.map((row) => {
            const total = rowTotal(row);
            const tin = normalizeTin(row.tin);
            const coverage =
              isYearMonth(row.coverageStart) && isYearMonth(row.coverageEnd) && total
                ? `${formatCoverage(row.coverageStart, row.coverageEnd)} (${total.months} ${total.months === 1 ? "month" : "months"})`
                : null;
            return (
              <tr key={row.key}>
                <td className="border border-neutral-400 px-1.5 py-1">{orPlaceholder(row.name, "Name")}</td>
                <td className="border border-neutral-400 px-1.5 py-1">{orPlaceholder(row.designation, "Designation")}</td>
                <td className="border border-neutral-400 px-1.5 py-1 whitespace-nowrap">
                  {tin ? formatTin(tin) : orPlaceholder("", "TIN")}
                </td>
                <td className="border border-neutral-400 px-1.5 py-1 text-right whitespace-nowrap">
                  {total ? formatCentavos(total.monthlyCentavos) : "—"}
                </td>
                <td className="border border-neutral-400 px-1.5 py-1">{coverage ?? "—"}</td>
                <td className="border border-neutral-400 px-1.5 py-1 text-right whitespace-nowrap">
                  {total ? formatCentavos(total.totalCentavos) : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="mt-3 text-justify">
        This will be charged under the requested FCDU account for the {project.shortName}: {project.accountName}.
      </p>
      <p className="mt-3">Thank you and hoping for your kind consideration regarding this matter.</p>

      <div className="mt-3 grid grid-cols-2 gap-6">
        <div data-testid="signed-by">
          <p>Respectfully,</p>
          <p className="mt-8 font-semibold">{leader.name}</p>
          <p>{leader.title}</p>
        </div>
        <div data-testid="endorsed-by">
          <p>Endorsed by:</p>
          <p className="mt-8 font-semibold">{orPlaceholder(form.endorser.name, "Endorser name")}</p>
          <p>{orPlaceholder(form.endorser.title, "Endorser title")}</p>
        </div>
      </div>
    </article>
  );
}
