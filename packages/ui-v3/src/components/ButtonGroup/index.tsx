"use client";

import { useState } from "react";
import * as styles from "./ButtonGroup.css";

export type ButtonGroupItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type ButtonGroupProps = {
  items: ButtonGroupItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
};

const getInitialValue = (items: ButtonGroupItem[], defaultValue?: string) => {
  if (defaultValue) {
    return defaultValue;
  }

  return items.find(item => !item.disabled)?.value ?? "";
};

export function ButtonGroup({
  ariaLabel = "Button group",
  defaultValue,
  items,
  onValueChange,
  size = "md",
  value
}: ButtonGroupProps) {
  const [internalValue, setInternalValue] = useState(() => getInitialValue(items, defaultValue));
  const selectedValue = value ?? internalValue;

  const handleSelect = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <div aria-label={ariaLabel} className={styles.root} role="group">
      {items.map(item => {
        const selected = selectedValue === item.value;

        return (
          <button
            aria-pressed={selected}
            className={styles.button({ active: selected, size })}
            disabled={item.disabled}
            key={item.value}
            onClick={() => handleSelect(item.value)}
            type="button"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
