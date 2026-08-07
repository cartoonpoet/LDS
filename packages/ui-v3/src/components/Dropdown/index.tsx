import { useState, useCallback, useRef, type ReactNode } from "react";
import { cx } from "../../lib/cx";
import { useControllableState } from "../../lib/useControllableState";
import { useDismissibleLayer } from "../../lib/useDismissibleLayer";
import * as s from "./Dropdown.css";

/* ─── Types ─── */
export type DropdownSize = "small" | "medium" | "large";

export interface DropdownOption {
  /** 옵션 값 */
  value: string;
  /** 표시 텍스트 */
  label: string;
  /** 설명 (Multi Level 모드) */
  description?: string;
  /** 비활성화 */
  disabled?: boolean;
}

export interface DropdownProps {
  /** 크기 */
  size?: DropdownSize;
  /** 옵션 목록 */
  options: DropdownOption[];
  /** 선택된 값 (controlled) — 다중 선택 시 배열 */
  value?: string | string[];
  /** 기본 선택 값 (uncontrolled) */
  defaultValue?: string | string[];
  /** 변경 핸들러 */
  onChange?: (value: string | string[]) => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 좌측 아이콘 */
  icon?: ReactNode;
  /** 다중 선택 (체크박스 모드) */
  multiple?: boolean;
  /** 패널 헤더 텍스트 (Multi Check 모드) */
  panelHeader?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 추가 className */
  className?: string;
}

/* ─── SVG Icons ─── */
const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 6.75 9 11.25l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Dropdown Component ─── */
export function Dropdown({
  size = "medium",
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = "선택하세요",
  icon,
  multiple = false,
  panelHeader,
  disabled = false,
  className,
}: DropdownProps) {
  const [value, setValue] = useControllableState<string | string[]>({
    value: controlledValue,
    defaultValue: defaultValue ?? (multiple ? [] : ""),
    onChange,
  });

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* close on outside click + Escape */
  useDismissibleLayer({
    enabled: open,
    ref: wrapperRef,
    onDismiss: () => setOpen(false),
  });

  const toggle = useCallback(() => {
    if (!disabled) setOpen((prev) => !prev);
  }, [disabled]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (multiple) {
        const arr = Array.isArray(value) ? value : [];
        const next = arr.includes(optionValue)
          ? arr.filter((v) => v !== optionValue)
          : [...arr, optionValue];
        setValue(next);
      } else {
        setValue(optionValue);
        setOpen(false);
      }
    },
    [multiple, value, setValue],
  );

  /* derive display text */
  const selectedValues = multiple
    ? (Array.isArray(value) ? value : [])
    : (typeof value === "string" && value ? [value] : []);

  const displayLabel =
    selectedValues.length === 0
      ? null
      : selectedValues
          .map((v) => options.find((o) => o.value === v)?.label ?? v)
          .join(", ");

  const isSelected = (optionValue: string) =>
    multiple
      ? (Array.isArray(value) ? value : []).includes(optionValue)
      : value === optionValue;

  return (
    <div ref={wrapperRef} className={cx(s.wrapper, className)}>
      <button
        type="button"
        className={s.trigger({ size, open, disabled })}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={toggle}
      >
        {icon && <span className={s.triggerIcon}>{icon}</span>}
        <span className={cx(s.triggerLabel, !displayLabel && s.placeholder)}>
          {displayLabel || placeholder}
        </span>
        <span className={s.chevron({ open })}>
          <ChevronIcon />
        </span>
      </button>

      {open && (
        <div className={s.panel} role="listbox" aria-multiselectable={multiple || undefined}>
          {panelHeader && <div className={s.panelHeader}>{panelHeader}</div>}
          {options.map((opt) => {
            const selected = isSelected(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={selected}
                className={s.option({ selected, disabled: !!opt.disabled })}
                onClick={() => handleSelect(opt.value)}
              >
                {multiple && (
                  <span className={s.checkbox({ checked: selected })}>
                    {selected && <CheckIcon />}
                  </span>
                )}
                {opt.description ? (
                  <span className={s.optionTextGroup}>
                    <span>{opt.label}</span>
                    <span className={s.optionDescription}>{opt.description}</span>
                  </span>
                ) : (
                  <span>{opt.label}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
