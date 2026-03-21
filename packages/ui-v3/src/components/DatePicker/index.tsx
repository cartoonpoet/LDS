import { useState, useCallback, useMemo } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./DatePicker.css";

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */

type DateCellState =
  | "default"
  | "today"
  | "selected"
  | "disabled"
  | "outside"
  | "rangeStart"
  | "rangeEnd"
  | "inRange";

type RangePosition = "start" | "middle" | "end" | "none";

interface CalendarDay {
  date: Date;
  isOutside: boolean;
}

export interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 선택된 날짜 */
  value?: Date | null;
  /** 날짜 변경 콜백 */
  onChange?: (date: Date) => void;
  /** 시간 선택 표시 */
  showTime?: boolean;
  /** 최소 선택 가능 날짜 */
  minDate?: Date;
  /** 최대 선택 가능 날짜 */
  maxDate?: Date;
}

export interface DateRangePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 시작 날짜 */
  startDate?: Date | null;
  /** 종료 날짜 */
  endDate?: Date | null;
  /** 범위 변경 콜백 */
  onChange?: (range: { start: Date | null; end: Date | null }) => void;
}

/* ═══════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════ */

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const days: CalendarDay[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrev - i),
      isOutside: true,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({ date: new Date(year, month, d), isOutside: false });
  }
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ date: new Date(year, month + 1, d), isOutside: true });
  }
  return days;
}

function isSameDay(
  a: Date | null | undefined,
  b: Date | null | undefined,
): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

function isInRange(
  d: Date,
  start: Date | null | undefined,
  end: Date | null | undefined,
): boolean {
  if (!start || !end) return false;
  const t = d.getTime();
  return t > start.getTime() && t < end.getTime();
}

function isDisabled(d: Date, min?: Date, max?: Date): boolean {
  if (min) {
    const minDay = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    if (d < minDay) return true;
  }
  if (max) {
    const maxDay = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    if (d > maxDay) return true;
  }
  return false;
}

/* ═══════════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════════ */

function ChevronLeft() {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 1L1 6L6 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L6 6L1 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CalendarPanel (internal)
   ═══════════════════════════════════════════ */

interface CalendarPanelProps {
  year: number;
  month: number;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  selectedDate?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onDateClick?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  hoverDate?: Date | null;
  onDateHover?: (date: Date | null) => void;
}

function CalendarPanel({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  selectedDate,
  rangeStart,
  rangeEnd,
  onDateClick,
  minDate,
  maxDate,
  hoverDate,
  onDateHover,
}: CalendarPanelProps) {
  const days = useMemo(() => generateCalendarDays(year, month), [year, month]);

  const isRangeMode = rangeStart !== undefined;
  const effectiveEnd = rangeEnd ?? hoverDate;

  /* swap if start > end */
  const rStart =
    rangeStart && effectiveEnd && rangeStart > effectiveEnd
      ? effectiveEnd
      : rangeStart;
  const rEnd =
    rangeStart && effectiveEnd && rangeStart > effectiveEnd
      ? rangeStart
      : effectiveEnd;

  const getCellState = (day: CalendarDay): DateCellState => {
    if (day.isOutside) return "outside";
    if (isDisabled(day.date, minDate, maxDate)) return "disabled";

    if (isRangeMode) {
      if (isSameDay(day.date, rStart)) return "rangeStart";
      if (isSameDay(day.date, rEnd)) return "rangeEnd";
      if (isInRange(day.date, rStart, rEnd)) return "inRange";
    }

    if (isSameDay(day.date, selectedDate)) return "selected";
    if (isToday(day.date)) return "today";
    return "default";
  };

  const getRangePos = (day: CalendarDay): RangePosition => {
    if (day.isOutside || !rStart || !rEnd || isSameDay(rStart, rEnd))
      return "none";
    if (isSameDay(day.date, rStart)) return "start";
    if (isSameDay(day.date, rEnd)) return "end";
    if (isInRange(day.date, rStart, rEnd)) return "middle";
    return "none";
  };

  return (
    <div className={s.calendarPanel}>
      {/* header */}
      <div className={s.header}>
        {onPrevMonth ? (
          <button
            type="button"
            className={s.navButton}
            onClick={onPrevMonth}
            aria-label="이전 달"
          >
            <ChevronLeft />
          </button>
        ) : (
          <span className={s.navPlaceholder} />
        )}
        <span className={s.headerTitle}>
          {year}년 {month + 1}월
        </span>
        {onNextMonth ? (
          <button
            type="button"
            className={s.navButton}
            onClick={onNextMonth}
            aria-label="다음 달"
          >
            <ChevronRight />
          </button>
        ) : (
          <span className={s.navPlaceholder} />
        )}
      </div>

      {/* weekday labels */}
      <div className={s.weekdays}>
        {WEEKDAYS.map((d) => (
          <span key={d} className={s.weekdayLabel}>
            {d}
          </span>
        ))}
      </div>

      <div className={s.divider} />

      {/* date grid */}
      <div className={s.dateGrid}>
        {days.map((day, i) => {
          const state = getCellState(day);
          const rangePos = getRangePos(day);
          const clickable = state !== "disabled" && state !== "outside";

          return (
            <div key={i} className={s.dateCell}>
              {rangePos !== "none" && (
                <div className={s.rangeBg({ position: rangePos })} />
              )}
              <button
                type="button"
                className={s.dateButton({ state })}
                onClick={clickable ? () => onDateClick?.(day.date) : undefined}
                onMouseEnter={
                  clickable ? () => onDateHover?.(day.date) : undefined
                }
                onMouseLeave={
                  onDateHover ? () => onDateHover(null) : undefined
                }
                disabled={state === "disabled"}
                tabIndex={clickable ? 0 : -1}
                aria-label={`${day.date.getFullYear()}년 ${day.date.getMonth() + 1}월 ${day.date.getDate()}일`}
              >
                {day.date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TimePicker (internal)
   ═══════════════════════════════════════════ */

interface TimePickerInternalProps {
  hours: number;
  minutes: number;
  onHoursChange: (h: number) => void;
  onMinutesChange: (m: number) => void;
}

function TimePickerInternal({
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
}: TimePickerInternalProps) {
  const isPM = hours >= 12;
  const display12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  const handleHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    if (isNaN(v)) return;
    const h = Math.min(Math.max(v, 1), 12);
    onHoursChange(isPM ? (h === 12 ? 12 : h + 12) : h === 12 ? 0 : h);
  };

  const handleMinute = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    if (isNaN(v)) return;
    onMinutesChange(Math.min(Math.max(v, 0), 59));
  };

  const toggleAmPm = () => {
    onHoursChange(isPM ? hours - 12 : hours + 12);
  };

  return (
    <>
      <div className={s.divider} />
      <div className={s.timeRow}>
        <input
          type="text"
          className={s.timeInput}
          value={String(display12).padStart(2, "0")}
          onChange={handleHour}
          aria-label="시"
        />
        <span className={s.timeSeparator}>:</span>
        <input
          type="text"
          className={s.timeInput}
          value={String(minutes).padStart(2, "0")}
          onChange={handleMinute}
          aria-label="분"
        />
        <button
          type="button"
          className={s.amPmToggle}
          onClick={toggleAmPm}
          aria-label="오전/오후 전환"
        >
          {isPM ? "PM" : "AM"}
        </button>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   DatePicker
   ═══════════════════════════════════════════ */

/**
 * **DatePicker**
 *
 * 날짜 선택 캘린더 패널.
 *
 * - 단일 날짜 선택
 * - `showTime`으로 시간 입력 추가 가능
 * - `minDate` / `maxDate`로 선택 범위 제한
 *
 * ```tsx
 * <DatePicker value={date} onChange={setDate} />
 * <DatePicker value={date} onChange={setDate} showTime />
 * ```
 */
export function DatePicker({
  value,
  onChange,
  showTime = false,
  minDate,
  maxDate,
  className,
  ...rest
}: DatePickerProps) {
  const initial = value ?? new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const [hours, setHours] = useState(value ? value.getHours() : 12);
  const [minutes, setMinutes] = useState(value ? value.getMinutes() : 0);

  const goToPrev = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      if (showTime) {
        const d = new Date(date);
        d.setHours(hours, minutes);
        onChange?.(d);
      } else {
        onChange?.(date);
      }
    },
    [onChange, showTime, hours, minutes],
  );

  return (
    <div className={cx(s.container, className)} {...rest}>
      <CalendarPanel
        year={viewYear}
        month={viewMonth}
        onPrevMonth={goToPrev}
        onNextMonth={goToNext}
        selectedDate={value}
        onDateClick={handleDateClick}
        minDate={minDate}
        maxDate={maxDate}
      />
      {showTime && (
        <TimePickerInternal
          hours={hours}
          minutes={minutes}
          onHoursChange={setHours}
          onMinutesChange={setMinutes}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   DateRangePicker
   ═══════════════════════════════════════════ */

/**
 * **DateRangePicker**
 *
 * 날짜 범위 선택을 위한 듀얼 캘린더 패널.
 *
 * - 좌측: 현재 월, 우측: 다음 월
 * - 시작일 → 종료일 순서로 클릭하여 범위 선택
 * - 호버 시 범위 미리보기
 *
 * ```tsx
 * <DateRangePicker
 *   startDate={start}
 *   endDate={end}
 *   onChange={({ start, end }) => { setStart(start); setEnd(end); }}
 * />
 * ```
 */
export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  className,
  ...rest
}: DateRangePickerProps) {
  const initial = startDate ?? new Date();
  const [leftYear, setLeftYear] = useState(initial.getFullYear());
  const [leftMonth, setLeftMonth] = useState(initial.getMonth());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"start" | "end">(
    startDate && !endDate ? "end" : "start",
  );

  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;
  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;

  const goToPrev = useCallback(() => {
    setLeftMonth((m) => {
      if (m === 0) {
        setLeftYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setLeftMonth((m) => {
      if (m === 11) {
        setLeftYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      if (selecting === "start") {
        onChange?.({ start: date, end: null });
        setSelecting("end");
      } else {
        if (startDate && date < startDate) {
          onChange?.({ start: date, end: null });
          setSelecting("end");
        } else {
          onChange?.({ start: startDate ?? date, end: date });
          setSelecting("start");
        }
      }
    },
    [selecting, startDate, onChange],
  );

  const showHover = selecting === "end" ? hoverDate : null;

  return (
    <div className={cx(s.rangeContainer, className)} {...rest}>
      <CalendarPanel
        year={leftYear}
        month={leftMonth}
        onPrevMonth={goToPrev}
        rangeStart={startDate}
        rangeEnd={endDate}
        onDateClick={handleDateClick}
        hoverDate={showHover}
        onDateHover={setHoverDate}
      />
      <div className={s.verticalDivider} />
      <CalendarPanel
        year={rightYear}
        month={rightMonth}
        onNextMonth={goToNext}
        rangeStart={startDate}
        rangeEnd={endDate}
        onDateClick={handleDateClick}
        hoverDate={showHover}
        onDateHover={setHoverDate}
      />
    </div>
  );
}
