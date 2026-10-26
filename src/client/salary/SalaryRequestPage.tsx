import { useMemo, useState } from "react";
import { Button } from "@/client/components/ui/button";
import { Field } from "@/client/components/Field";
import { Input } from "@/client/components/ui/input";
import {
  CHECKLIST_STATUS_LABELS,
  summarizeChecklist,
  type SalaryCheckResponse,
} from "@/shared/salary-request";
import { emptyStaff, initialForm, rowTotal, toRequestInput, validateForm, type SalaryForm, type StaffForm } from "./form-state";
import { LetterPreview } from "./LetterPreview";
import { StaffRowCard } from "./StaffRowCard";

// Most salary letters have no enclosures. Supporting documents are submitted
// with the checklist and are never listed in the letter (confirmed 2026-10-26).
const SUGGESTED_ENCLOSURES = ["Approved Line-Item Budget"];

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
  const [customEnclosure, setCustomEnclosure] = useState("");

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

  const toggleEnclosure = (item: string) =>
    update({
      enclosures: form.enclosures.includes(item)
        ? form.enclosures.filter((e) => e !== item)
        : [...form.enclosures, item],
    });

  const addCustomEnclosure = () => {
    const item = customEnclosure.trim();
    if (item && !form.enclosures.includes(item)) update({ enclosures: [...form.enclosures, item] });
    setCustomEnclosure("");
  };

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
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Letter details</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="LE number"
              value={form.leNumber}
              onChange={(v) => update({ leNumber: v })}
              hint="Enter exactly as issued by RCNAS. Leave blank while waiting; the letter stays a draft."
            />
            <Field
              label="Request date"
              type="date"
              value={form.requestDate}
              onChange={(v) => update({ requestDate: v })}
              error={errorFor("requestDate", form.requestDate)}
            />
            <Field
              label="Project title"
              value={form.projectTitle}
              onChange={(v) => update({ projectTitle: v })}
              error={errorFor("projectTitle", form.projectTitle)}
              className="sm:col-span-2"
            />
            <Field
              label="Funding/charge reference"
              value={form.chargeReference}
              onChange={(v) => update({ chargeReference: v })}
              error={errorFor("chargeReference", form.chargeReference)}
              className="sm:col-span-2"
            />
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Recipient (OVRF) and signatories</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Recipient name" value={form.recipient.name} onChange={(v) => update({ recipient: { ...form.recipient, name: v } })} />
            <Field label="Recipient title" value={form.recipient.title} onChange={(v) => update({ recipient: { ...form.recipient, title: v } })} />
            {form.signatories.map((s, i) => {
              const set = (patch: Partial<typeof s>) => {
                const next = [...form.signatories] as SalaryForm["signatories"];
                next[i] = { ...s, ...patch };
                update({ signatories: next });
              };
              return [
                <Field key={`n${i}`} label={`Signatory ${i + 1} name`} value={s.name} onChange={(v) => set({ name: v })} />,
                <Field key={`t${i}`} label={`Signatory ${i + 1} title`} value={s.title} onChange={(v) => set({ title: v })} />,
              ];
            })}
          </div>
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

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Enclosures (optional)</h3>
          <p className="text-muted-foreground text-sm">
            Most salary requests have none. Add only documents the letter itself refers to, such as the approved
            Line-Item Budget when requesting several months in advance. Supporting documents go with the checklist
            and are not listed here.
          </p>
          <div className="space-y-1.5">
            {[...new Set([...SUGGESTED_ENCLOSURES, ...form.enclosures])].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.enclosures.includes(item)} onChange={() => toggleEnclosure(item)} />
                {item}
              </label>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              aria-label="Other enclosure"
              placeholder="Other enclosure"
              value={customEnclosure}
              onChange={(e) => setCustomEnclosure(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustomEnclosure()}
            />
            <Button variant="outline" onClick={addCustomEnclosure}>
              Add
            </Button>
          </div>
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
