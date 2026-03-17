import type { InputHTMLAttributes, ReactNode } from "react";
import * as styles from "./DatePicker.css";

type BaseFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  label?: string;
  caption?: string;
  helperText?: string;
  invalid?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
};

export type DatePickerProps = BaseFieldProps;
export type TimePickerProps = BaseFieldProps;
export type DateRangePickerProps = Omit<BaseFieldProps, "value" | "defaultValue" | "onChange"> & {
  startLabel?: string;
  endLabel?: string;
  startProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">;
  endProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">;
};

type FieldShellProps = {
  label?: string;
  caption?: string;
  required?: boolean;
  helperText?: string;
  invalid?: boolean;
  children: ReactNode;
};

const calendarIcon = (
  <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 1.5V3.5M11 1.5V3.5M2.5 5.5H13.5M4.75 7.75H5.25M7.75 7.75H8.25M10.75 7.75H11.25M4.75 10.75H5.25M7.75 10.75H8.25M10.75 10.75H11.25M4.4 3H11.6C12.4401 3 12.8601 3 13.181 3.16349C13.4632 3.3073 13.6927 3.53677 13.8365 3.81897C14 4.13988 14 4.55992 14 5.4V11.6C14 12.4401 14 12.8601 13.8365 13.181C13.6927 13.4632 13.4632 13.6927 13.181 13.8365C12.8601 14 12.4401 14 11.6 14H4.4C3.55992 14 3.13988 14 2.81897 13.8365C2.53677 13.6927 2.3073 13.4632 2.16349 13.181C2 12.8601 2 12.4401 2 11.6V5.4C2 4.55992 2 4.13988 2.16349 3.81897C2.3073 3.53677 2.53677 3.3073 2.81897 3.16349C3.13988 3 3.55992 3 4.4 3Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"/>
  </svg>
);

const timeIcon = (
  <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M8 4.75V8L10.25 9.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"/>
  </svg>
);

function FieldShell({ caption, children, helperText, invalid = false, label, required = false }: FieldShellProps) {
  return (
    <label className={styles.stack}>
      {label ? (
        <span className={styles.labelRow}>
          <span className={styles.label}>
            {label}
            {required ? <span className={styles.requiredMark}>*</span> : null}
          </span>
          {caption ? <span className={styles.caption}>{caption}</span> : null}
        </span>
      ) : null}
      {children}
      {helperText ? <span className={styles.helperText({ tone: invalid ? "danger" : "neutral" })}>{helperText}</span> : null}
    </label>
  );
}

function Field({ caption, helperText, invalid = false, label, required = false, size = "md", type, ...props }: BaseFieldProps & { type: "date" | "time" | "datetime-local" }) {
  const icon = type === "time" ? timeIcon : calendarIcon;

  return (
    <FieldShell caption={caption} helperText={helperText} invalid={invalid} label={label} required={required}>
      <span className={styles.controlShell({ invalid, size })}>
        <input className={styles.input({ size })} required={required} type={type} {...props} />
        <span aria-hidden="true" className={styles.icon}>
          {icon}
        </span>
      </span>
    </FieldShell>
  );
}

function RangeField({ caption, invalid = false, label, required = false, size = "md", type = "date", ...props }: BaseFieldProps & { type?: "date" | "time" | "datetime-local" }) {
  const icon = type === "time" ? timeIcon : calendarIcon;

  return (
    <label className={styles.stack}>
      {label ? (
        <span className={styles.labelRow}>
          <span className={styles.label}>{label}</span>
          {caption ? <span className={styles.caption}>{caption}</span> : null}
        </span>
      ) : null}
      <span className={styles.controlShell({ invalid, size })}>
        <input className={styles.input({ size })} required={required} type={type} {...props} />
        <span aria-hidden="true" className={styles.icon}>
          {icon}
        </span>
      </span>
    </label>
  );
}

export function DatePicker(props: DatePickerProps) {
  return <Field {...props} type="date" />;
}

export function TimePicker(props: TimePickerProps) {
  return <Field {...props} type="time" />;
}

export function DateTimePicker(props: BaseFieldProps) {
  return <Field {...props} type="datetime-local" />;
}

export function DateRangePicker({
  caption,
  endLabel = "종료일",
  endProps,
  helperText,
  invalid = false,
  label,
  required = false,
  size = "md",
  startLabel = "시작일",
  startProps
}: DateRangePickerProps) {
  return (
    <FieldShell caption={caption} helperText={helperText} invalid={invalid} label={label} required={required}>
      <div className={styles.inline}>
        <RangeField {...startProps} invalid={invalid} label={startLabel} required={required} size={size} />
        <RangeField {...endProps} invalid={invalid} label={endLabel} required={required} size={size} />
      </div>
    </FieldShell>
  );
}
