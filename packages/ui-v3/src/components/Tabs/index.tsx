"use client";

import { useId, useState } from "react";
import * as styles from "./Tabs.css";

export type TabItem = {
  label: string;
  value: string;
  content?: string;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  stretched?: boolean;
  variant?: "line" | "segment";
};

export function Tabs({
  defaultValue,
  items,
  onValueChange,
  stretched = false,
  value,
  variant = "line"
}: TabsProps) {
  const fallbackValue = items.find(item => !item.disabled)?.value ?? "";
  const [internalValue, setInternalValue] = useState(defaultValue ?? fallbackValue);
  const selectedValue = value ?? internalValue;
  const activeItem = items.find(item => item.value === selectedValue) ?? items[0];
  const baseId = useId();

  const handleSelect = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <div className={styles.root}>
      <div aria-label="Tabs" className={styles.list({ variant })} role="tablist">
        {items.map(item => {
          const tabId = `${baseId}-${item.value}-tab`;
          const panelId = `${baseId}-${item.value}-panel`;
          const isActive = item.value === activeItem?.value;

          return (
            <button
              aria-controls={panelId}
              aria-selected={isActive}
              className={styles.tab({ active: isActive, stretched, variant })}
              disabled={item.disabled}
              id={tabId}
              key={item.value}
              onClick={() => handleSelect(item.value)}
              role="tab"
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem ? (
        <div
          aria-labelledby={`${baseId}-${activeItem.value}-tab`}
          className={styles.panel}
          id={`${baseId}-${activeItem.value}-panel`}
          role="tabpanel"
        >
          {activeItem.content ?? `${activeItem.label} content`}
        </div>
      ) : null}
    </div>
  );
}
