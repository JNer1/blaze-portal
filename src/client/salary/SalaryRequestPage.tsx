import { useMemo, useState } from "react";
import { Button } from "@/client/components/ui/button";
import { Field } from "@/client/components/Field";
import {
  CHECKLIST_STATUS_LABELS,
  summarizeChecklist,
  type SalaryCheckResponse,
} from "@/shared/salary-request";
import { emptyStaff, initialForm, rowTotal, toRequestInput, validateForm, type SalaryForm, type StaffForm } from "./form-state";
import { LetterPreview } from "./LetterPreview";
import { OfficialPicker } from "./OfficialPicker";
import { ProjectTitle } from "./ProjectTitle";
import { OFFICES } from "@/shared/offices";
import { getProject } from "@/shared/projects";
import { StaffRowCard } from "./StaffRowCard";

type ServerCheck =
  | { state: "idle" }
  | { state: "checking" }
  | { state: "passed" }
  | { state: "failed"; messages: string[] }
  | { state: "mismatch" }
  | { state: "error" };

export function SalaryRequestPage() {
  const [form, setForm] = useState<SalaryForm>(initialForm);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [serverCheck, setServerCheck] = useState<ServerCheck>({ state: "idle" });

  const project = getProject(form.projectId);
  const errors = useMemo(() => validateForm(form), [form]);
  const checklist = useMemo(() => summarizeChecklist(form.staff), [form.staff]);

  const update = (patch: Partial<SalaryForm>) => {
    setForm((f) => ({ ...f, ...patch }));
    setServerCheck({ state: "idle" });
  };

  // Show a field's error once it has a value, or for every field after "Check request".
  const errorFor = (path: string, value: string) =>
    showAllErrors || value.trim() !== "" ? errors[path] : undefined;

  const updateStaff = (index: number, row: StaffForm) =>
    update({ staff: form.staff.map((r, i) => (i === index ? row : r)) });

  async function checkWithServer() {
    setShowAllErrors(true);
    setServerCheck({ state: "checking" });
    try {
      const res = await fetch("/api/salary-requests/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toRequestInput(form)),
      });
      const body = (await res.json()) as SalaryCheckResponse;
      if (!body.ok) {
        setServerCheck({ state: "failed", messages: [...new Set(body.errors.map((e) => e.message))] });
        return;
      }
      // The server recalculates independently; any disagreement is a bug, not user error.
      const matches = body.staff.every((t, i) => {
        const local = rowTotal(form.staff[i]!);
        return local?.months === t.months && local.totalCentavos === t.totalCentavos;
      });
      setServerCheck(matches ? { state: "passed" } : { state: "mismatch" });
    } catch {
      setServerCheck({ state: "error" });
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-8">
        <section aria-label="Project" className="bg-muted space-y-1 rounded-lg p-4 text-sm">
          <h3 className="font-semibold">{project.shortName}</h3>
          <p>
            <ProjectTitle project={project} />
          </p>
          <p className="text-muted-foreground">Account name: {project.accountName}</p>
          <p className="text-muted-foreground">
            Signed by: {project.projectLeader.name}, {project.projectLeader.title}
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Letter details</h3>
          <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
            <Field
              label="LE prefix"
              value={form.lePrefix}
              onChange={(v) => update({ lePrefix: v })}
              error={errorFor("lePrefix", form.lePrefix || " ")}
              hint="Usually unchanged."
              className="sm:w-36"
            />
            <Field
              label="LE number"
              value={form.leNumber}
              onChange={(v) => update({ leNumber: v })}
              placeholder="LE1356"
              hint="Exactly as issued by RCNAS. Leave blank while waiting; the letter stays a draft."
            />
            <div className="sm:col-span-2">
              <p className="mb-1.5 text-sm font-medium">Academic year</p>
              <div className="flex items-start gap-2">
                <Field
                  label="A.Y. from"
                  value={form.academicYear.from}
                  onChange={(from) =>
                    // Fill in the following year automatically; it stays editable.
                    update({
                      academicYear: { from, to: /^\d{4}$/.test(from) ? String(Number(from) + 1) : form.academicYear.to },
                    })
                  }
                  error={errorFor("academicYear.from", form.academicYear.from)}
                  inputMode="numeric"
                  placeholder="2025"
                  className="w-32"
                />
                <span className="pt-8">–</span>
                <Field
                  label="A.Y. to"
                  value={form.academicYear.to}
                  onChange={(to) => update({ academicYear: { ...form.academicYear, to } })}
                  error={errorFor("academicYear.to", form.academicYear.to)}
                  inputMode="numeric"
                  placeholder="2026"
                  className="w-32"
                />
              </div>
            </div>
            <Field
              label="Request date"
              type="date"
              value={form.requestDate}
              onChange={(v) => update({ requestDate: v })}
              error={errorFor("requestDate", form.requestDate)}
            />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Recipient and endorsement</h3>
          <OfficialPicker
            label="Recipient"
            office={OFFICES.ovrf}
            value={form.recipient}
            onChange={(recipient) => update({ recipient })}
            withSalutation
          />
          <OfficialPicker
            label="Endorsed by"
            office={OFFICES.rcnas}
            value={form.endorser}
            onChange={(endorser) => update({ endorser })}
          />
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Research staff</h3>
          {errorFor("staff", "") && <p className="text-destructive text-sm">{errors.staff}</p>}
          {form.staff.map((row, i) => (
            <StaffRowCard
              key={row.key}
              row={row}
              index={i}
              onChange={(r) => updateStaff(i, r)}
              onRemove={form.staff.length > 1 ? () => update({ staff: form.staff.filter((_, j) => j !== i) }) : undefined}
              error={(field) => {
                const value = field === "monthlyCentavos" ? row.monthly : String(row[field as keyof StaffForm] ?? "");
                return errorFor(`staff.${i}.${field}`, value);
              }}
            />
          ))}
          <Button variant="outline" onClick={() => update({ staff: [...form.staff, emptyStaff()] })}>
            Add staff member
          </Button>
        </section>

        <section aria-label="Checklist summary" className="bg-muted space-y-2 rounded-lg p-4 text-sm">
          <h3 className="font-semibold">Supporting documents summary</h3>
          <p>
            {(["available", "missing", "notReviewed", "notApplicable"] as const)
              .map((s) => `${CHECKLIST_STATUS_LABELS[s]}: ${checklist.counts[s]}`)
              .join(" · ")}
          </p>
          {checklist.outstanding.map((o, i) => (
            <p key={i}>
              <strong>{o.staffName.trim() || "Unnamed staff member"}</strong>
              {o.missing.length > 0 && ` — missing: ${o.missing.join(", ")}`}
              {o.notReviewed.length > 0 && ` — not reviewed: ${o.notReviewed.join(", ")}`}
            </p>
          ))}
          <p className="text-muted-foreground">
            Advisory only. These statuses are marked by staff and do not verify or approve any document.
          </p>
        </section>

        <section className="space-y-2">
          <Button onClick={checkWithServer} disabled={serverCheck.state === "checking"}>
            Check request
          </Button>
          <ServerCheckMessage check={serverCheck} />
        </section>
      </div>

      <div className="lg:sticky lg:top-8 lg:self-start">
        <p className="text-muted-foreground mb-2 text-sm">
          Preview only. Wording is a placeholder; the official letter will use your reviewed Google Docs template.
        </p>
        <LetterPreview form={form} />
      </div>
    </div>
  );
}

function ServerCheckMessage({ check }: { check: ServerCheck }) {
  switch (check.state) {
    case "idle":
      return null;
    case "checking":
      return <p className="text-sm">Checking…</p>;
    case "passed":
      return <p role="status" className="text-sm text-green-700">Server check passed. Totals match.</p>;
    case "mismatch":
      return <p role="alert" className="text-destructive text-sm">Server totals differ from the form. Please report this.</p>;
    case "error":
      return <p role="alert" className="text-destructive text-sm">Could not reach the server.</p>;
    case "failed":
      return (
        <div role="alert" className="text-destructive text-sm">
          <p>Fix these before the letter can be finalized:</p>
          <ul className="ml-5 list-disc">
            {check.messages.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      );
  }
}
