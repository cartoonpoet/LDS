import type { PropsWithChildren, ReactNode } from "react";
import * as styles from "./field.css";

export type FieldTone = "default" | "success" | "danger";
export type FieldSize = "sm" | "md" | "lg";

export type FieldProps = PropsWithChildren<{
  label?: string;
  caption?: string;
  helperText?: string;
  required?: boolean;
  tone?: FieldTone;
}>;

export function Field({ caption, children, helperText, label, required, tone = "default" }: FieldProps) {
  return (
    <label className={styles.fieldRoot}>
      {label ? (
        <span className={styles.fieldLabelRow}>
          <span className={styles.fieldLabel}>
            {label}
            {required ? <span className={styles.fieldRequiredMark}>*</span> : null}
          </span>
          {caption ? <span className={styles.fieldCaption}>{caption}</span> : null}
        </span>
      ) : null}
      {children}
      {helperText ? <span className={styles.fieldHelperText({ tone })}>{helperText}</span> : null}
    </label>
  );
}

export type FieldControlShellProps = PropsWithChildren<{
  disabled?: boolean;
  size?: FieldSize;
  tone?: FieldTone;
}>;

export function FieldControlShell({ children, disabled = false, size = "md", tone = "default" }: FieldControlShellProps) {
  return <span className={styles.fieldControlShell({ disabled, size, tone })}>{children}</span>;
}

export function FieldAdornment({ children }: { children: ReactNode }) {
  return <span className={styles.fieldAdornment}>{children}</span>;
}
