import type { InputHTMLAttributes } from "react";
import * as shared from "../../styles/shared.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, label, ...props }: InputProps) {
  const inputClassName = [shared.fieldControl({ control: "input" }), className].filter(Boolean).join(" ");

  return (
    <label className={shared.fieldShell}>
      {label ? <span className={shared.fieldLabel}>{label}</span> : null}
      <input className={inputClassName} {...props} />
    </label>
  );
}
