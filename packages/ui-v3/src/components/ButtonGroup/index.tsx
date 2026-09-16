import { useRef } from "react";
import type { ReactNode, MouseEventHandler } from "react";
import { cx } from "../../lib/cx";
import { useSlidingIndicator } from "../../lib/useSlidingIndicator";
import * as s from "./ButtonGroup.css";

/* ─── Types ─── */
export type ButtonGroupVariant = "fill" | "outline" | "segmented";
export type ButtonGroupSize = "small" | "medium";

export interface ButtonGroupItem {
  /** 고유 식별 값 */
  value: string;
  /** 버튼 텍스트 */
  label: string;
  /** 좌측 아이콘 */
  icon?: ReactNode;
}

export interface ButtonGroupProps {
  /** 아이템 목록 */
  items: ButtonGroupItem[];
  /** 현재 활성화된 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 스타일 변형 */
  variant?: ButtonGroupVariant;
  /** 크기 */
  size?: ButtonGroupSize;
  /** 추가 className */
  className?: string;
}

/* ─── Component ─── */
export function ButtonGroup({
  items,
  value,
  onChange,
  variant = "fill",
  size = "medium",
  className,
}: ButtonGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIndex = items.findIndex((item) => item.value === value);
  const isSegmented = variant === "segmented";
  const pillRect = useSlidingIndicator(containerRef, isSegmented ? activeIndex : -1);

  return (
    <div
      ref={containerRef}
      className={cx(s.root({ variant, size }), className)}
      role="group"
    >
      {isSegmented && pillRect && (
        <div
          className={s.slidingPill}
          style={{ transform: `translateX(${pillRect.left}px)`, width: pillRect.width }}
          aria-hidden="true"
        />
      )}
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            data-slide-item
            className={s.item({ variant, size, active: isActive })}
            data-active={isActive}
            aria-pressed={isActive}
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
