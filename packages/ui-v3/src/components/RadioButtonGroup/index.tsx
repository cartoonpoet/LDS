import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./RadioButtonGroup.css";

/* ─── Types ─── */
export type RadioButtonGroupVariant = "fill" | "outline";

export interface RadioButtonGroupItem {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface RadioButtonGroupProps {
  items: RadioButtonGroupItem[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: RadioButtonGroupVariant;
  size?: "small" | "medium";
  fullWidth?: boolean;
  gap?: number;
  className?: string;
}

/* ─── Component ─── */
export const RadioButtonGroup = ({
  items,
  value,
  onChange,
  variant = "fill",
  size = "medium",
  fullWidth = false,
  gap,
  className,
}: RadioButtonGroupProps) => {
  return (
    <div
      role="radiogroup"
      className={cx(s.root({ size, fullWidth }), className)}
      style={gap !== undefined ? { gap } : undefined}
    >
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={s.item({ variant, size, fullWidth, active: isActive })}
            onClick={() => onChange?.(item.value)}
          >
            {item.icon && <span className={s.iconSlot}>{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
