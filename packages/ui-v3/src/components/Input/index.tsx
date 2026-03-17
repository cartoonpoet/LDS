import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Field, FieldAdornment, FieldControlShell } from "../../foundations/field";
import * as styles from "./Input.css";
import { cx } from "../../lib/cx";
import { useInputState } from "./useInputState";

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
  const state = useInputState({
    disabled,
    prefix,
    size,
    status,
    suffix
  });

  return (
    <Field helperText={helperText} label={label} required={required} tone={state.tone}>
      <FieldControlShell disabled={state.disabled} size={state.size} tone={state.tone}>
        {state.hasPrefix ? <FieldAdornment>{prefix}</FieldAdornment> : null}
        <input
          className={cx(
            styles.input({
              hasPrefix: state.hasPrefix,
              hasSuffix: state.hasSuffix,
              size: state.size
            }),
            className
          )}
          disabled={state.disabled}
          ref={ref}
          required={required}
          {...props}
        />
        {state.hasSuffix ? <FieldAdornment>{suffix}</FieldAdornment> : null}
      </FieldControlShell>
    </Field>
  );
});

Input.displayName = "Input";
