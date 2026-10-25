import { Button } from "@/client/components/ui/button";
import { Field } from "@/client/components/Field";
import { Input } from "@/client/components/ui/input";
import { formatCentavos } from "@/shared/money";
import {
  CHECKLIST_STATUSES,
  CHECKLIST_STATUS_LABELS,
  SALARY_CHECKLIST_ITEMS,
  type ChecklistItemId,
  type ChecklistStatus,
} from "@/shared/salary-request";
import { rowTotal, type StaffForm } from "./form-state";

type Props = {
  row: StaffForm;
  index: number;
  error: (field: keyof StaffForm | "monthlyCentavos") => string | undefined;
  onChange: (row: StaffForm) => void;
  onRemove?: () => void;
};

export function StaffRowCard({ row, index, error, onChange, onRemove }: Props) {
  const set = <K extends keyof StaffForm>(key: K, value: StaffForm[K]) => onChange({ ...row, [key]: value });
  const setChecklist = (id: ChecklistItemId, patch: Partial<{ status: ChecklistStatus; note: string }>) =>
    set("checklist", { ...row.checklist, [id]: { ...row.checklist[id], ...patch } });
  const total = rowTotal(row);
  const label = row.name.trim() || `Staff member ${index + 1}`;

  return (
    <section aria-label={label} data-testid="staff-row" className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-medium">{label}</h4>
        {onRemove && (
          <Button variant="ghost" size="sm" onClick={onRemove}>
            Remove
          </Button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" value={row.name} onChange={(v) => set("name", v)} error={error("name")} />
        <Field
          label="Designation"
          value={row.designation}
          onChange={(v) => set("designation", v)}
          error={error("designation")}
        />
        <Field
          label="TIN"
          value={row.tin}
          onChange={(v) => set("tin", v)}
          error={error("tin")}
          inputMode="numeric"
          placeholder="000-000-000 or 000-000-000-000"
        />
        <Field
          label="Monthly salary (PHP)"
          value={row.monthly}
          onChange={(v) => set("monthly", v)}
          error={error("monthlyCentavos")}
          inputMode="decimal"
          placeholder="25,000.00"
        />
        <Field
          label="Coverage start"
          type="month"
          value={row.coverageStart}
          onChange={(v) => set("coverageStart", v)}
          error={error("coverageStart")}
        />
        <Field
          label="Coverage end"
          type="month"
          value={row.coverageEnd}
          onChange={(v) => set("coverageEnd", v)}
          error={error("coverageEnd")}
          hint="Include advance months here."
        />
      </div>

      <p className="mt-3 text-sm" data-testid="row-total">
        {total
          ? `${total.months} ${total.months === 1 ? "month" : "months"} × monthly salary = ${formatCentavos(total.totalCentavos)}`
          : "Total appears once the monthly salary and coverage months are valid."}
      </p>

      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-medium">Supporting documents (advisory — never blocks the letter)</legend>
        <div className="space-y-2">
          {SALARY_CHECKLIST_ITEMS.map((item) => {
            const entry = row.checklist[item.id];
            const selectId = `${row.key}-${item.id}`;
            return (
              <div key={item.id} className="grid items-start gap-2 sm:grid-cols-[1fr_auto_1fr]">
                <label htmlFor={selectId} className="text-sm">
                  {item.label}
                  {"guidance" in item && <span className="text-muted-foreground block text-xs">{item.guidance}</span>}
                </label>
                <select
                  id={selectId}
                  value={entry.status}
                  onChange={(e) => setChecklist(item.id, { status: e.target.value as ChecklistStatus })}
                  className="border-input h-9 rounded-md border bg-transparent px-2 text-sm"
                >
                  {CHECKLIST_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {CHECKLIST_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
                <Input
                  aria-label={`Note for ${item.label}`}
                  placeholder="Note (optional)"
                  value={entry.note}
                  onChange={(e) => setChecklist(item.id, { note: e.target.value })}
                />
              </div>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
