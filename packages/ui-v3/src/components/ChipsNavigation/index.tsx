import { cx } from "../../lib/cx";
import * as s from "./ChipsNavigation.css";

/* ─── Types ─── */
export interface ChipsNavigationItem {
  /** 고유 식별 값 */
  value: string;
  /** 표시 텍스트 */
  label: string;
}

export interface ChipsNavigationProps {
  /** 옵션 목록 */
  items: ChipsNavigationItem[];
  /** 선택된 값 (단일 선택 시 string, 다중 선택 시 string[]) */
  value?: string | string[];
  /** 값 변경 핸들러 */
  onChange?: (value: string | string[]) => void;
  /** 다중 선택 모드 */
  multiple?: boolean;
  /** "All" 칩 텍스트 */
  allLabel?: string;
  /** 추가 className */
  className?: string;
}

/* ─── Check Icon ─── */
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.333 7l3.5 3.5 5.834-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Component ─── */
export function ChipsNavigation({
  items,
  value,
  onChange,
  multiple = false,
  allLabel = "All",
  className,
}: ChipsNavigationProps) {
  const selectedSet = new Set(
    Array.isArray(value) ? value : value != null ? [value] : [],
  );
  const isAllActive = selectedSet.size === 0;

  function handleAllClick() {
    if (multiple) {
      onChange?.([]);
    } else {
      onChange?.("");
    }
  }

  function handleItemClick(itemValue: string) {
    if (multiple) {
      const current = Array.isArray(value) ? [...value] : [];
      const idx = current.indexOf(itemValue);
      if (idx >= 0) {
        current.splice(idx, 1);
      } else {
        current.push(itemValue);
      }
      onChange?.(current);
    } else {
      onChange?.(itemValue);
    }
  }

  return (
    <div className={cx(s.root, className)} role="group">
      <button
        type="button"
        className={s.chip({ active: isAllActive })}
        aria-pressed={isAllActive}
        onClick={handleAllClick}
      >
        {allLabel}
      </button>

      <div className={s.divider} />

      <div className={s.options}>
        {items.map((item) => {
          const isActive = selectedSet.has(item.value);
          return (
            <button
              key={item.value}
              type="button"
              className={s.chip({ active: isActive })}
              aria-pressed={isActive}
              onClick={() => handleItemClick(item.value)}
            >
              {multiple && isActive && (
                <span className={s.checkIcon}>
                  <CheckIcon />
                </span>
              )}
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
