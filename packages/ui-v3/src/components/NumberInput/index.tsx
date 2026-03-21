import { useCallback } from "react";
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./NumberInput.css";

export type NumberInputSize = "small" | "medium" | "large";

export interface NumberInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 현재 값 */
  value?: number;
  /** 값 변경 콜백 */
  onChange?: (value: number) => void;
  /** 사이즈 */
  size?: NumberInputSize;
  /** 최솟값 */
  min?: number;
  /** 최댓값 */
  max?: number;
  /** 증감 단위 */
  step?: number;
  /** 비활성화 */
  disabled?: boolean;
}

/* ─── Icons ─── */

function MinusIcon({ size }: { size: NumberInputSize }) {
  const w = size === "small" ? 7 : size === "large" ? 12 : 11;
  const h = size === "small" ? 1 : size === "large" ? 2 : 1.5;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={w} height={h} rx={h / 2} fill="currentColor" />
    </svg>
  );
}

function PlusIcon({ size }: { size: NumberInputSize }) {
  const d = size === "small" ? 7 : size === "large" ? 12 : 11;
  const t = size === "small" ? 1 : size === "large" ? 2 : 1.5;
  const mid = d / 2;
  return (
    <svg
      width={d}
      height={d}
      viewBox={`0 0 ${d} ${d}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y={mid - t / 2} width={d} height={t} rx={t / 2} fill="currentColor" />
      <rect x={mid - t / 2} width={t} height={d} rx={t / 2} fill="currentColor" />
    </svg>
  );
}

/**
 * **NumberInput**
 *
 * 숫자 입력 스테퍼. −/+ 버튼으로 값 증감.
 *
 * - `size`: small / medium / large
 * - `min` / `max`로 범위 제한
 * - `step`으로 증감 단위 설정
 *
 * ```tsx
 * <NumberInput value={count} onChange={setCount} min={0} max={100} />
 * ```
 */
export function NumberInput({
  value = 0,
  onChange,
  size = "medium",
  min,
  max,
  step = 1,
  disabled = false,
  className,
  ...rest
}: NumberInputProps) {
  const clamp = useCallback(
    (v: number) => {
      let clamped = v;
      if (min !== undefined) clamped = Math.max(min, clamped);
      if (max !== undefined) clamped = Math.min(max, clamped);
      return clamped;
    },
    [min, max],
  );

  const decrement = useCallback(() => {
    onChange?.(clamp(value - step));
  }, [value, step, onChange, clamp]);

  const increment = useCallback(() => {
    onChange?.(clamp(value + step));
  }, [value, step, onChange, clamp]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v)) onChange?.(clamp(v));
    },
    [onChange, clamp],
  );

  const atMin = min !== undefined && value <= min;
  const atMax = max !== undefined && value >= max;

  return (
    <div className={cx(s.container, className)} {...rest}>
      <button
        type="button"
        className={s.button({ size })}
        onClick={decrement}
        disabled={disabled || atMin}
        aria-label="감소"
      >
        <MinusIcon size={size} />
      </button>
      <input
        type="text"
        inputMode="numeric"
        className={s.input({ size })}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        aria-label="수량"
      />
      <button
        type="button"
        className={s.button({ size })}
        onClick={increment}
        disabled={disabled || atMax}
        aria-label="증가"
      >
        <PlusIcon size={size} />
      </button>
    </div>
  );
}
