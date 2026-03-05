import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import * as styles from "./Select.css";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectOptionGroup = {
  label: string;
  options: SelectOption[];
};

type SelectItem = SelectOption | SelectOptionGroup;

type SelectSize = "sm" | "md" | "lg";

const hasNestedOptions = (item: SelectItem): item is SelectOptionGroup => "options" in item;

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  label?: string;
  options: SelectItem[];
  helperText?: string;
  invalid?: boolean;
  placeholder?: string;
  size?: SelectSize;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    className,
    disabled,
    helperText,
    invalid = false,
    label,
    multiple = false,
    options,
    placeholder,
    required,
    size = "md",
    ...props
  },
  ref
) {
  const hasPlaceholder = Boolean(placeholder) && !multiple;
  const selectClassName = [
    styles.control({
      hasPlaceholder,
      invalid,
      multiple,
      size
    }),
    className
  ]
    .filter(Boolean)
    .join(" ");

  const shellClassName = styles.controlShell({
    invalid,
    multiple,
    size
  });

  return (
    <label className={styles.root}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={shellClassName}>
        <select
          className={selectClassName}
          disabled={disabled}
          multiple={multiple}
          ref={ref}
          required={required || hasPlaceholder}
          {...props}
        >
          {hasPlaceholder ? (
            <option disabled hidden value="">
              {placeholder}
            </option>
          ) : null}
          {options.map(item =>
            hasNestedOptions(item) ? (
              <optgroup key={item.label} label={item.label}>
                {item.options.map(option => (
                  <option disabled={option.disabled} key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              <option disabled={item.disabled} key={item.value} value={item.value}>
                {item.label}
              </option>
            )
          )}
        </select>
        <span aria-hidden="true" className={styles.indicator({ hidden: multiple })}>
          <svg fill="none" height="6" viewBox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
        </span>
      </span>
      {helperText ? <span className={styles.helperText({ tone: invalid ? "danger" : "neutral" })}>{helperText}</span> : null}
    </label>
  );
});

Select.displayName = "Select";
