import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import * as styles from "./Input.css";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  helperText?: string;
  status?: "default" | "success" | "error";
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: "sm" | "md" | "lg";
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    disabled = false,
    helperText,
    label,
    prefix,
    required,
    size = "md",
    status = "default",
    suffix,
    ...props
  },
  ref
) {
  const hasPrefix = prefix !== undefined && prefix !== null;
  const hasSuffix = suffix !== undefined && suffix !== null;

  const inputClassName = [
    styles.input({
      hasPrefix,
      hasSuffix,
      size
    }),
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={styles.root}>
      {label ? (
        <span className={styles.label}>
          {label}
          {required ? <span className={styles.requiredMark}>*</span> : null}
        </span>
      ) : null}
      <span
        className={styles.controlShell({
          disabled,
          size,
          tone: status
        })}
      >
        {hasPrefix ? <span className={styles.adornment}>{prefix}</span> : null}
        <input className={inputClassName} disabled={disabled} ref={ref} required={required} {...props} />
        {hasSuffix ? <span className={styles.adornment}>{suffix}</span> : null}
      </span>
      {helperText ? <span className={styles.helperText({ tone: status })}>{helperText}</span> : null}
    </label>
  );
});

Input.displayName = "Input";
