import type { ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./IconButtonGroup.css";

/* ─── Types ─── */
export type IconButtonGroupVariant = "fill" | "outline";

export interface IconButtonGroupItem {
  /** 고유 식별 값 */
  value: string;
  /** 아이콘 */
  icon: ReactNode;
  /** 접근성 라벨 */
  "aria-label": string;
}

export interface IconButtonGroupProps {
  /** 아이템 목록 */
  items: IconButtonGroupItem[];
  /** 현재 활성화된 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 스타일 변형 */
  variant?: IconButtonGroupVariant;
  /** 추가 className */
  className?: string;
}

/* ─── Component ─── */
export function IconButtonGroup({
  items,
  value,
  onChange,
  variant = "fill",
  className,
}: IconButtonGroupProps) {
  return (
    <div className={cx(s.root({ variant }), className)} role="group">
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            className={s.item({ variant, active: isActive })}
            data-active={isActive}
            aria-pressed={isActive}
            aria-label={item["aria-label"]}
            onClick={() => onChange?.(item.value)}
          >
            <span className={s.iconSlot}>{item.icon}</span>
          </button>
        );
      })}
    </div>
  );
}
