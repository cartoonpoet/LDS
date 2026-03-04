import type { SelectHTMLAttributes } from "react";
import * as shared from "../../styles/shared.css";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: SelectOption[];
};

export function Select({ className, label, options, ...props }: SelectProps) {
  const selectClassName = [shared.fieldControl, className].filter(Boolean).join(" ");

  return (
    <label className={shared.fieldShell}>
      {label ? <span className={shared.fieldLabel}>{label}</span> : null}
      <select className={selectClassName} {...props}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

