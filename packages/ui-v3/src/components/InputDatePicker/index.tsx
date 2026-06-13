import { useState, useRef, useEffect, useCallback } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { Input } from "../Input";
import type { InputSize, InputState } from "../Input";
import { Icon } from "../Icon";
import { DatePicker } from "../DatePicker";
import * as s from "./InputDatePicker.css";

/* ═══════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════ */

/** Date → "yyyy-MM-dd" (빈 값이면 "") */
export const formatYmd = (date: Date | null | undefined): string => {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/* ─── Calendar Icon ─── */
const CalendarIcon = () => <Icon name="calendar" size="sm" />;

/* ═══════════════════════════════════════════
   InputDatePicker
   ═══════════════════════════════════════════ */

export interface InputDatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 선택된 날짜 */
  value?: Date | null;
  /** 날짜 변경 콜백 */
  onChange?: (date: Date) => void;
  /** placeholder (선택 전 표시) */
  placeholder?: string;
  /** 인풋 사이즈 */
  inputSize?: InputSize;
  /** 인풋 상태 (테두리 색 등) */
  state?: InputState;
  /** 비활성화 */
  disabled?: boolean;
  /** 최소 선택 가능 날짜 */
  minDate?: Date;
  /** 최대 선택 가능 날짜 */
  maxDate?: Date;
}

/**
 * **InputDatePicker**
 *
 * Input 박스에 포커스하거나 캘린더 아이콘을 클릭하면 `DatePicker` 캘린더가
 * 팝오버로 펼쳐지는 날짜 선택 컴포넌트.
 *
 * - 포커스 / 클릭 → 캘린더 열림
 * - 날짜 선택 → 인풋에 `yyyy-MM-dd` 표시 후 닫힘
 * - ESC / 바깥 클릭 → 닫힘
 *
 * > ⚠️ 아직 정식 export 컴포넌트가 아닌 Storybook 검토용 시안입니다.
 *
 * ```tsx
 * const [date, setDate] = useState<Date | null>(null);
 * <InputDatePicker value={date} onChange={setDate} />
 * ```
 */
export const InputDatePicker = ({
  value,
  onChange,
  placeholder = "날짜 선택",
  inputSize = "medium",
  state = "default",
  disabled = false,
  minDate,
  maxDate,
  className,
  ...rest
}: InputDatePickerProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const openCalendar = useCallback(() => {
    if (!disabled) setOpen(true);
  }, [disabled]);

  const handleSelect = useCallback(
    (date: Date) => {
      onChange?.(date);
      setOpen(false);
    },
    [onChange],
  );

  /* 바깥 클릭 닫기 */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* ESC 닫기 */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div ref={wrapperRef} className={cx(s.wrapper, className)} {...rest}>
      {/* 트리거 영역 — 캘린더는 포함하지 않아 날짜 클릭이 재오픈을 유발하지 않음 */}
      <div className={s.trigger} onClick={openCalendar}>
        <Input
          readOnly
          value={formatYmd(value)}
          placeholder={placeholder}
          inputSize={inputSize}
          state={disabled ? "disabled" : open ? "active" : state}
          disabled={disabled}
          onFocus={openCalendar}
          rightIcon={
            <span className={s.calendarIcon}>
              <CalendarIcon />
            </span>
          }
          style={{ cursor: "pointer" }}
          aria-haspopup="dialog"
          aria-expanded={open}
        />
      </div>

      {open && (
        <div className={s.popover} role="dialog" aria-label="날짜 선택 캘린더">
          <DatePicker
            value={value}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
}
