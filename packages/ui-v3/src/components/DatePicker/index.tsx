import type { InputHTMLAttributes } from "react";
import * as styles from "./DatePicker.css";

type BaseFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  label?: string;
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

function Field({ helperText, invalid = false, label, required = false, size = 'md', type, ...props }: BaseFieldProps & { type: 'date' | 'time' | 'datetime-local' }) {
  return (
    <label className={styles.stack}>
      {label ? <span className={styles.label}>{label}{required ? <span className={styles.requiredMark}>*</span> : null}</span> : null}
      <input className={styles.input({ invalid, size })} required={required} type={type} {...props} />
      {helperText ? <span className={styles.helperText({ tone: invalid ? 'danger' : 'neutral' })}>{helperText}</span> : null}
    </label>
  );
}

export function DatePicker(props: DatePickerProps) { return <Field {...props} type="date" />; }
export function TimePicker(props: TimePickerProps) { return <Field {...props} type="time" />; }
export function DateTimePicker(props: BaseFieldProps) { return <Field {...props} type="datetime-local" />; }

export function DateRangePicker({ endLabel = '종료일', endProps, helperText, invalid = false, label, required = false, size = 'md', startLabel = '시작일', startProps }: DateRangePickerProps) {
  return (
    <div className={styles.stack}>
      {label ? <div className={styles.label}>{label}{required ? <span className={styles.requiredMark}>*</span> : null}</div> : null}
      <div className={styles.inline}>
        <label className={styles.stack}><span className={styles.label}>{startLabel}</span><input className={styles.input({ invalid, size })} required={required} type="date" {...startProps} /></label>
        <label className={styles.stack}><span className={styles.label}>{endLabel}</span><input className={styles.input({ invalid, size })} required={required} type="date" {...endProps} /></label>
      </div>
      {helperText ? <span className={styles.helperText({ tone: invalid ? 'danger' : 'neutral' })}>{helperText}</span> : null}
    </div>
  );
}
