"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import * as styles from "./Dropdown.css";
import { useDropdownState } from "./useDropdownState";

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
  caption?: string;
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

export function Dropdown({
  caption,
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
  const triggerId = useId();
  const { filteredGroups, isSelected, open, query, select, selectedValue, setOpen, setQuery } = useDropdownState({
    defaultValue,
    groups,
    multiple,
    onValueChange,
    value
  });

  const selectedLabels = groups
    .flatMap(group => group.options)
    .filter(option => isSelected(option.value))
    .map(option => option.label);

  const triggerContent = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;

  return (
    <div className={styles.root}>
      {label ? (
        <label className={styles.labelRow} htmlFor={triggerId}>
          <span className={styles.label}>
            {label}
            {required ? <span className={styles.requiredMark}>*</span> : null}
          </span>
          {caption ? <span className={styles.caption}>{caption}</span> : null}
        </label>
      ) : null}
      <button
        aria-controls={`${triggerId}-panel`}
        aria-disabled={disabled}
        aria-expanded={open}
        aria-invalid={invalid}
        className={styles.trigger({ invalid, open, size })}
        disabled={disabled}
        id={triggerId}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className={`${styles.triggerValue} ${selectedLabels.length === 0 ? styles.placeholder : ""}`}>{triggerContent}</span>
        {multiple && selectedLabels.length > 0 ? <span className={styles.counter}>{selectedLabels.length}</span> : null}
        <span aria-hidden="true" className={styles.icon({ open })}>
          <svg fill="none" height="6" viewBox="0 0 10 6" width="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
          </svg>
        </span>
      </button>
      {open ? (
        <div className={styles.panel} id={`${triggerId}-panel`} role="group">
          {searchable ? (
            <input className={styles.searchInput} onChange={event => setQuery(event.target.value)} placeholder={searchPlaceholder} type="search" value={query} />
          ) : null}
          <div className={styles.list}>
            {filteredGroups.length === 0 ? <div className={styles.empty}>검색 결과가 없습니다.</div> : null}
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
                      onClick={() => select(option.value)}
                      type="button"
                    >
                      <span className={styles.optionMain}>
                        {multiple ? <span aria-hidden="true" className={styles.checkbox({ selected })}>{selected ? "✓" : ""}</span> : null}
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
      ) : null}
      {helperText ? <div className={styles.helperText({ tone: invalid ? "danger" : "neutral" })}>{helperText}</div> : null}
    </div>
  );
}
