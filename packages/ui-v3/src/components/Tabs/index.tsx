import type { ReactNode, MouseEventHandler } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Tabs.css";

/* ─── Types ─── */
export type TabsSize = "large" | "medium";

export interface TabItem {
  /** 고유 식별 값 */
  value: string;
  /** 탭 텍스트 */
  label: string;
  /** 뱃지 카운트 (Badge 모드) */
  badge?: number;
}

export interface TabsProps {
  /** 탭 목록 */
  items: TabItem[];
  /** 현재 활성화된 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 크기 */
  size?: TabsSize;
  /** 액션 버튼 (예: "Add Tab") */
  action?: {
    label: string;
    icon?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  };
  /** 추가 className */
  className?: string;
}

/* ─── Component ─── */
export function Tabs({
  items,
  value,
  onChange,
  size = "large",
  action: actionProp,
  className,
}: TabsProps) {
  return (
    <div className={cx(s.root, className)}>
      <div className={s.tabRow}>
        <div className={s.tabList} role="tablist">
          {items.map((item) => {
            const isActive = item.value === value;
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                className={s.tabItem({ active: isActive, size })}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange?.(item.value)}
              >
                {item.label}
                {item.badge != null && (
                  <span className={s.badge({ active: isActive, size })}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {actionProp && (
          <button
            type="button"
            className={s.actionButton}
            onClick={actionProp.onClick}
          >
            {actionProp.icon && (
              <span className={s.actionIcon}>{actionProp.icon}</span>
            )}
            {actionProp.label}
          </button>
        )}
      </div>

      <div className={s.indicator} />
    </div>
  );
}
