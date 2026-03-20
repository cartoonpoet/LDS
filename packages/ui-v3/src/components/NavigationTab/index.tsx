import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./NavigationTab.css";

/* ─── Types ─── */
export interface NavigationTabItem {
  /** 고유 식별 값 */
  value: string;
  /** 탭 텍스트 */
  label: string;
  /** 아이콘 */
  icon?: ReactNode;
}

export interface NavigationTabProps {
  /** 탭 목록 */
  items: NavigationTabItem[];
  /** 현재 활성화된 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 추가 className */
  className?: string;
}

/* ─── Component ─── */
export function NavigationTab({
  items,
  value,
  onChange,
  className,
}: NavigationTabProps) {
  return (
    <div className={cx(s.root, className)} role="tablist">
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            className={s.tab({ active: isActive })}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange?.(item.value)}
          >
            {item.icon && <span className={s.iconSlot}>{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
