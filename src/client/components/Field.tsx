import { useId, type ReactNode } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: ReactNode;
  type?: "text" | "date" | "month";
  inputMode?: "decimal" | "numeric";
  placeholder?: string;
  className?: string;
};

export function Field({ label, value, onChange, error, hint, className, ...input }: FieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-1.5">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...input}
      />
      {error ? (
        <p id={`${id}-error`} className="text-destructive mt-1 text-sm">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-muted-foreground mt-1 text-sm">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
