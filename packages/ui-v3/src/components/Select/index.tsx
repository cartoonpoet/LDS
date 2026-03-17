import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { Field } from "../../foundations/field";
import * as styles from "./Select.css";
import { cx } from "../../lib/cx";
import { useSelectState } from "./useSelectState";

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
  caption?: string;
  options: SelectItem[];
  helperText?: string;
  invalid?: boolean;
  placeholder?: string;
  size?: SelectSize;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    caption,
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
  const state = useSelectState({ invalid, multiple, placeholder, size });

  return (
    <Field caption={caption} helperText={helperText} label={label} required={required} tone={state.tone}>
      <span className={styles.controlShell}>
        <select
          className={cx(
            styles.control({
              hasPlaceholder: state.hasPlaceholder,
              invalid,
              multiple: state.multiple,
              size: state.size
            }),
            className
          )}
          defaultValue={state.hasPlaceholder ? "" : props.defaultValue}
          disabled={disabled}
          multiple={state.multiple}
          ref={ref}
          required={required || state.hasPlaceholder}
          {...props}
        >
          {state.hasPlaceholder ? (
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
        <span aria-hidden="true" className={styles.indicator({ hidden: state.multiple })}>
          <svg fill="none" height="6" viewBox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
          </svg>
        </span>
      </span>
    </Field>
  );
});

Select.displayName = "Select";
