"use client";

import { useState } from "react";
import * as styles from "./ButtonGroup.css";

export type ButtonGroupItem = { label: string; value: string; disabled?: boolean };
export type ButtonGroupProps = { items: ButtonGroupItem[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void; size?: 'sm' | 'md' | 'lg'; ariaLabel?: string; };

export function ButtonGroup({ ariaLabel = 'Button group', defaultValue, items, onValueChange, size = 'md', value }: ButtonGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? '');
  const selectedValue = value ?? internalValue;
  return <div aria-label={ariaLabel} className={styles.root} role="group">{items.map(item => <button aria-pressed={selectedValue === item.value} className={styles.button({ active: selectedValue === item.value, size })} disabled={item.disabled} key={item.value} onClick={() => { if (value === undefined) setInternalValue(item.value); onValueChange?.(item.value); }} type="button">{item.label}</button>)}</div>;
}
