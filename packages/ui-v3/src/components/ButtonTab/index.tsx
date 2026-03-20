import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./ButtonTab.css";

/* ─── Types ─── */
export interface ButtonTabItem {
  /** 고유 식별 값 */
  value: string;
  /** 탭 텍스트 */
  label: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export interface ButtonTabProps {
  /** 탭 목록 */
  items: ButtonTabItem[];
  /** 현재 활성화된 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 추가 className */
  className?: string;
}

/* ─── Component ─── */
export function ButtonTab({
  items,
  value,
  onChange,
  className,
}: ButtonTabProps) {
  return (
    <div className={cx(s.root, className)} role="tablist">
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            className={s.tab({ active: isActive, disabled: !!item.disabled })}
            aria-selected={isActive}
            disabled={item.disabled}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange?.(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
