"use client";

import { useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import * as styles from "./Dropdown.css";

export type DropdownOption = {
  value: string;
  label: string;
  description?: ReactNode;
  disabled?: boolean;
  keywords?: string[];
};

export type DropdownOptionGroup = {
  label?: string;
  options: DropdownOption[];
};

export type DropdownProps = {
  label?: string;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  searchable?: boolean;
  multiple?: boolean;
  groups: DropdownOptionGroup[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  searchPlaceholder?: string;
};

const normalizeValue = (value: DropdownProps["value"] | DropdownProps["defaultValue"], multiple: boolean) => {
  if (multiple) {
    return Array.isArray(value) ? value : value ? [value] : [];
  }

  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
};

export function Dropdown({
  defaultValue,
  disabled = false,
  groups,
  helperText,
  invalid = false,
  label,
  multiple = false,
  onValueChange,
  placeholder = "항목 선택",
  required = false,
  searchable = false,
  searchPlaceholder = "검색어 입력",
  size = "md",
  value
}: DropdownProps) {
  const [internalValue, setInternalValue] = useState(() => normalizeValue(defaultValue, multiple));
  const [query, setQuery] = useState("");
  const triggerId = useId();
  const selectedValue = value ?? internalValue;

  const filteredGroups = useMemo(() => {
    if (!query.trim()) {
      return groups;
    }

    const normalizedQuery = query.trim().toLowerCase();

    return groups
      .map(group => ({
        ...group,
        options: group.options.filter(option => {
          const haystack = [option.label, ...(option.keywords ?? [])].join(" ").toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      }))
      .filter(group => group.options.length > 0);
  }, [groups, query]);

  const isSelected = (optionValue: string) =>
    Array.isArray(selectedValue) ? selectedValue.includes(optionValue) : selectedValue === optionValue;

  const commitValue = (nextValue: string | string[]) => {
    if (value === undefined) {
      setInternalValue(nextValue as never);
    }

    onValueChange?.(nextValue);
  };

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
      const nextValue = currentValues.includes(optionValue)
        ? currentValues.filter(current => current !== optionValue)
        : [...currentValues, optionValue];

      commitValue(nextValue);
      return;
    }

    commitValue(optionValue);
  };

  const selectedLabels = groups
    .flatMap(group => group.options)
    .filter(option => isSelected(option.value))
    .map(option => option.label);

  const triggerContent = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;

  return (
    <div className={styles.root}>
      {label ? (
        <label className={styles.label} htmlFor={triggerId}>
          {label}
          {required ? <span className={styles.requiredMark}>*</span> : null}
        </label>
      ) : null}
      <button
        aria-disabled={disabled}
        aria-invalid={invalid}
        className={styles.trigger({ invalid, size })}
        disabled={disabled}
        id={triggerId}
        type="button"
      >
        <span className={`${styles.triggerValue} ${selectedLabels.length === 0 ? styles.placeholder : ""}`}>{triggerContent}</span>
        <span aria-hidden="true" className={styles.icon}>
          <svg fill="none" height="6" viewBox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
          </svg>
        </span>
      </button>
      <div className={styles.panel} role="group">
        {searchable ? (
          <input className={styles.searchInput} onChange={event => setQuery(event.target.value)} placeholder={searchPlaceholder} type="search" value={query} />
        ) : null}
        <div className={styles.list}>
          {filteredGroups.map((group, index) => (
            <div className={styles.group} key={`${group.label ?? "group"}-${index}`}>
              {group.label ? <div className={styles.groupLabel}>{group.label}</div> : null}
              {group.options.map(option => {
                const selected = isSelected(option.value);

                return (
                  <button
                    className={styles.option({ selected })}
                    disabled={option.disabled}
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    type="button"
                  >
                    <span className={styles.optionMain}>
                      {multiple ? (
                        <span aria-hidden="true" className={styles.checkSlot}>
                          {selected ? <span className={styles.check}>✓</span> : null}
                        </span>
                      ) : null}
                      <span className={styles.optionText}>
                        <span>{option.label}</span>
                        {option.description ? <span className={styles.optionMeta}>{option.description}</span> : null}
                      </span>
                    </span>
                    {!multiple && selected ? <span className={styles.check}>✓</span> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {helperText ? <div className={styles.helperText({ tone: invalid ? "danger" : "neutral" })}>{helperText}</div> : null}
    </div>
  );
}
