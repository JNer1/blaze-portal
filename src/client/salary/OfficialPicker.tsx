import { useId } from "react";
import { Field } from "@/client/components/Field";
import { Label } from "@/client/components/ui/label";
import { headLabel, type Office } from "@/shared/offices";
import { personFromHead, type LetterPerson } from "./form-state";

type Person = LetterPerson & { salutation?: string };

type Props<P extends Person> = {
  label: string;
  office: Office;
  value: P;
  onChange: (value: P) => void;
  withSalutation?: boolean;
};

const OTHER = "other";

// Pick an office head from the directory; the fields below stay editable for
// one-off overrides (e.g. an officer-in-charge not yet in the directory).
export function OfficialPicker<P extends Person>({ label, office, value, onChange, withSalutation }: Props<P>) {
  const id = useId();
  const selected = office.heads.findIndex((h) => h.name === value.name && h.title === value.title);

  const choose = (choice: string) => {
    if (choice === OTHER) return;
    const person = personFromHead(office.heads[Number(choice)]);
    onChange({ ...value, name: person.name, title: person.title, ...(withSalutation ? { salutation: person.salutation } : {}) });
  };

  return (
    <fieldset className="space-y-3 rounded-lg border p-4">
      <legend className="px-1 text-sm font-medium">{label}</legend>
      <div>
        <Label htmlFor={id} className="mb-1.5">
          {office.name} head
        </Label>
        <select
          id={id}
          value={selected >= 0 ? String(selected) : OTHER}
          onChange={(e) => choose(e.target.value)}
          className="border-input h-9 w-full rounded-md border bg-transparent px-2 text-sm"
        >
          {office.heads.map((head, i) => (
            <option key={head.name} value={i}>
              {headLabel(head)}
            </option>
          ))}
          <option value={OTHER}>Other (type below)</option>
        </select>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={`${label} name`} value={value.name} onChange={(name) => onChange({ ...value, name })} />
        <Field label={`${label} title`} value={value.title} onChange={(title) => onChange({ ...value, title })} />
        {withSalutation && (
          <Field
            label="Salutation"
            value={value.salutation ?? ""}
            onChange={(salutation) => onChange({ ...value, salutation })}
            hint={`Printed as "Dear ${value.salutation?.trim() || "…"}:"`}
            className="sm:col-span-2"
          />
        )}
      </div>
    </fieldset>
  );
}
