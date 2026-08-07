import { useCallback, useRef, useState } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import { useDismissibleLayer } from "../../lib/useDismissibleLayer";
import { Input } from "../Input";
import type { InputSize, InputState } from "../Input";
import { Icon } from "../Icon";
import { DateRangePicker } from "../DatePicker";
import * as s from "./InputDateRangePicker.css";

const formatYmd = (date: Date | null | undefined): string => {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const formatRangeYmd = (
  startDate: Date | null | undefined,
  endDate: Date | null | undefined,
): string => {
  const start = formatYmd(startDate);
  const end = formatYmd(endDate);
  if (start && end) return `${start} ~ ${end}`;
  if (start) return `${start} ~`;
  if (end) return `~ ${end}`;
  return "";
};

const CalendarIcon = () => <Icon name="calendar" size="sm" />;

const useRangePopover = (
  onChange?: (range: { start: Date | null; end: Date | null }) => void,
  disabled = false,
) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const openCalendar = useCallback(() => {
    if (!disabled) setOpen(true);
  }, [disabled]);

  const handleChange = useCallback(
    (range: { start: Date | null; end: Date | null }) => {
      onChange?.(range);
      if (range.end) setOpen(false);
    },
    [onChange],
  );

  /* 바깥 클릭 + ESC 닫기 */
  useDismissibleLayer({
    enabled: open,
    ref: wrapperRef,
    onDismiss: () => setOpen(false),
  });

  return { open, openCalendar, handleChange, wrapperRef };
};

export interface InputDateRangePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (range: { start: Date | null; end: Date | null }) => void;
  placeholder?: string;
  inputSize?: InputSize;
  state?: InputState;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

/**
 * **InputDateRangePicker**
 *
 * 하나의 Input에 `yyyy-MM-dd ~ yyyy-MM-dd` 형태로 범위를 표시하는 기본안입니다.
 *
 * - 포커스 / 클릭 → 캘린더 열림
 * - 시작일/종료일 선택 → 하나의 인풋에 범위 문자열 표시
 * - 종료일 선택 완료 시 닫힘
 * - ESC / 바깥 클릭 → 닫힘
 */
export const InputDateRangePicker = ({
  startDate,
  endDate,
  onChange,
  placeholder = "기간 선택",
  inputSize = "medium",
  state = "default",
  disabled = false,
  minDate,
  maxDate,
  className,
  ...rest
}: InputDateRangePickerProps) => {
  const { open, openCalendar, handleChange, wrapperRef } = useRangePopover(onChange, disabled);

  return (
    <div ref={wrapperRef} className={cx(s.wrapper, className)} {...rest}>
      <div className={s.singleTrigger} onClick={openCalendar}>
        <Input
          readOnly
          value={formatRangeYmd(startDate, endDate)}
          placeholder={placeholder}
          inputSize={inputSize}
          state={disabled ? "disabled" : open ? "active" : state}
          disabled={disabled}
          onFocus={openCalendar}
          wrapperClassName={s.singleInput}
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
        <div className={s.popover} role="dialog" aria-label="날짜 범위 선택 캘린더">
          <DateRangePicker startDate={startDate} endDate={endDate} onChange={handleChange} minDate={minDate} maxDate={maxDate} />
        </div>
      )}
    </div>
  );
};

export interface InputDateRangePickerSplitProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (range: { start: Date | null; end: Date | null }) => void;
  startPlaceholder?: string;
  endPlaceholder?: string;
  inputSize?: InputSize;
  state?: InputState;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

/**
 * **InputDateRangePickerSplit**
 *
 * Input 2개(시작일/종료일)로 범위를 보여주는 보조 variant입니다.
 */
export const InputDateRangePickerSplit = ({
  startDate,
  endDate,
  onChange,
  startPlaceholder = "시작일",
  endPlaceholder = "종료일",
  inputSize = "medium",
  state = "default",
  disabled = false,
  minDate,
  maxDate,
  className,
  ...rest
}: InputDateRangePickerSplitProps) => {
  const { open, openCalendar, handleChange, wrapperRef } = useRangePopover(onChange, disabled);

  return (
    <div ref={wrapperRef} className={cx(s.wrapper, className)} {...rest}>
      <div className={s.rangeTrigger} onClick={openCalendar}>
        <Input
          readOnly
          value={formatYmd(startDate)}
          placeholder={startPlaceholder}
          inputSize={inputSize}
          state={disabled ? "disabled" : open ? "active" : state}
          disabled={disabled}
          onFocus={openCalendar}
          wrapperClassName={s.rangeInput}
          rightIcon={
            <span className={s.calendarIcon}>
              <CalendarIcon />
            </span>
          }
          style={{ cursor: "pointer" }}
          aria-haspopup="dialog"
          aria-expanded={open}
        />
        <span className={s.rangeSeparator}>~</span>
        <Input
          readOnly
          value={formatYmd(endDate)}
          placeholder={endPlaceholder}
          inputSize={inputSize}
          state={disabled ? "disabled" : open ? "active" : state}
          disabled={disabled}
          onFocus={openCalendar}
          wrapperClassName={s.rangeInput}
          style={{ cursor: "pointer" }}
          aria-haspopup="dialog"
          aria-expanded={open}
        />
      </div>

      {open && (
        <div className={s.popover} role="dialog" aria-label="날짜 범위 선택 캘린더">
          <DateRangePicker startDate={startDate} endDate={endDate} onChange={handleChange} minDate={minDate} maxDate={maxDate} />
        </div>
      )}
    </div>
  );
};