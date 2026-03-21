import { useCallback, useRef } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Slider.css";

/* ═══════════════════════════════════════════
   Shared helpers
   ═══════════════════════════════════════════ */

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function pct(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

function valueFromEvent(
  e: MouseEvent | React.MouseEvent,
  track: HTMLElement,
  min: number,
  max: number,
  step: number,
) {
  const rect = track.getBoundingClientRect();
  const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
  const raw = min + ratio * (max - min);
  return Math.round(raw / step) * step;
}

function generateTicks(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

function generateLabels(min: number, max: number, count: number) {
  const step = (max - min) / count;
  return Array.from({ length: count + 1 }, (_, i) =>
    Math.round(min + i * step),
  );
}

/* ═══════════════════════════════════════════
   Slider
   ═══════════════════════════════════════════ */

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 현재 값 */
  value?: number;
  /** 값 변경 콜백 */
  onChange?: (value: number) => void;
  /** 최솟값 */
  min?: number;
  /** 최댓값 */
  max?: number;
  /** 증감 단위 */
  step?: number;
  /** 틱 마크 표시 */
  showTicks?: boolean;
  /** 스케일 라벨 표시 (0, 10, 20 … 100) */
  showLabels?: boolean;
  /** 값 배지 표시 */
  showValue?: boolean;
  /** 비활성화 */
  disabled?: boolean;
}

/**
 * **Slider**
 *
 * 단일 핸들 슬라이더.
 *
 * - `showTicks`: 틱 마크 표시
 * - `showLabels`: 0–100 스케일 라벨
 * - `showValue`: 핸들 위 값 배지
 *
 * ```tsx
 * <Slider value={50} onChange={setValue} />
 * <Slider value={v} onChange={setV} showTicks showLabels showValue />
 * ```
 */
export function Slider({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showTicks = false,
  showLabels = false,
  showValue = false,
  disabled = false,
  className,
  ...rest
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const percent = pct(clamp(value, min, max), min, max);

  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !trackRef.current) return;
      e.preventDefault();
      const update = (ev: MouseEvent) => {
        if (!trackRef.current) return;
        onChange?.(clamp(valueFromEvent(ev, trackRef.current, min, max, step), min, max));
      };
      update(e.nativeEvent);
      const onUp = () => {
        document.removeEventListener("mousemove", update);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", update);
      document.addEventListener("mouseup", onUp);
    },
    [disabled, min, max, step, onChange],
  );

  return (
    <div
      className={cx(s.root, className)}
      style={disabled ? { opacity: 0.5, pointerEvents: "none" } : undefined}
      {...rest}
    >
      <div className={s.sliderRow} ref={trackRef} onMouseDown={startDrag}>
        <div className={s.track} />
        <div
          className={s.trackFill}
          style={{ left: 0, width: `${percent}%` }}
        />
        <div className={s.thumb} style={{ left: `${percent}%` }} tabIndex={0}>
          {showValue && (
            <div className={s.valueBadge}>
              {Number.isInteger(value) ? value : value.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {showTicks && (
        <div className={s.ticksRow}>
          {generateTicks(21).map((i) => (
            <div key={i} className={s.tick} />
          ))}
        </div>
      )}

      {showLabels && (
        <div className={s.labelsRow}>
          {generateLabels(min, max, 10).map((label) => (
            <span key={label} className={s.scaleLabel}>
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   RangeSlider
   ═══════════════════════════════════════════ */

export interface RangeSliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** [시작, 끝] 범위 값 */
  value?: [number, number];
  /** 범위 변경 콜백 */
  onChange?: (value: [number, number]) => void;
  /** 최솟값 */
  min?: number;
  /** 최댓값 */
  max?: number;
  /** 증감 단위 */
  step?: number;
  /** 틱 마크 표시 */
  showTicks?: boolean;
  /** 스케일 라벨 표시 */
  showLabels?: boolean;
  /** 값 배지 표시 */
  showValue?: boolean;
  /** 비활성화 */
  disabled?: boolean;
}

/**
 * **RangeSlider**
 *
 * 듀얼 핸들 범위 슬라이더.
 *
 * ```tsx
 * <RangeSlider value={[25, 75]} onChange={setRange} showTicks showLabels showValue />
 * ```
 */
export function RangeSlider({
  value = [25, 75],
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showTicks = false,
  showLabels = false,
  showValue = false,
  disabled = false,
  className,
  ...rest
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"start" | "end" | null>(null);

  const lo = clamp(value[0], min, max);
  const hi = clamp(value[1], min, max);
  const pctLo = pct(lo, min, max);
  const pctHi = pct(hi, min, max);

  const startDrag = useCallback(
    (handle: "start" | "end") => (e: React.MouseEvent) => {
      if (disabled || !trackRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      dragging.current = handle;

      const update = (ev: MouseEvent) => {
        if (!trackRef.current) return;
        const v = clamp(
          valueFromEvent(ev, trackRef.current, min, max, step),
          min,
          max,
        );
        if (dragging.current === "start") {
          onChange?.([Math.min(v, hi), hi]);
        } else {
          onChange?.([lo, Math.max(v, lo)]);
        }
      };

      const onUp = () => {
        dragging.current = null;
        document.removeEventListener("mousemove", update);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", update);
      document.addEventListener("mouseup", onUp);
    },
    [disabled, min, max, step, lo, hi, onChange],
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !trackRef.current) return;
      const v = clamp(
        valueFromEvent(e.nativeEvent, trackRef.current, min, max, step),
        min,
        max,
      );
      const distLo = Math.abs(v - lo);
      const distHi = Math.abs(v - hi);
      if (distLo <= distHi) {
        onChange?.([Math.min(v, hi), hi]);
      } else {
        onChange?.([lo, Math.max(v, lo)]);
      }
    },
    [disabled, min, max, step, lo, hi, onChange],
  );

  const formatVal = (v: number) =>
    Number.isInteger(v) ? String(v) : v.toFixed(2);

  return (
    <div
      className={cx(s.root, className)}
      style={disabled ? { opacity: 0.5, pointerEvents: "none" } : undefined}
      {...rest}
    >
      <div
        className={s.sliderRow}
        ref={trackRef}
        onMouseDown={handleTrackClick}
      >
        <div className={s.track} />
        <div
          className={s.trackFill}
          style={{ left: `${pctLo}%`, width: `${pctHi - pctLo}%` }}
        />

        {/* start thumb */}
        <div
          className={s.thumb}
          style={{ left: `${pctLo}%` }}
          onMouseDown={startDrag("start")}
          tabIndex={0}
        >
          {showValue && (
            <div className={s.valueBadge}>{formatVal(lo)}</div>
          )}
        </div>

        {/* end thumb */}
        <div
          className={s.thumb}
          style={{ left: `${pctHi}%` }}
          onMouseDown={startDrag("end")}
          tabIndex={0}
        >
          {showValue && (
            <div className={s.valueBadge}>{formatVal(hi)}</div>
          )}
        </div>
      </div>

      {showTicks && (
        <div className={s.ticksRow}>
          {generateTicks(21).map((i) => (
            <div key={i} className={s.tick} />
          ))}
        </div>
      )}

      {showLabels && (
        <div className={s.labelsRow}>
          {generateLabels(min, max, 10).map((label) => (
            <span key={label} className={s.scaleLabel}>
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
