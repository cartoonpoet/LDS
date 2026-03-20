import { useCallback } from "react";
import type { InputHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Checkbox.css";

export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** 사이즈 */
  size?: CheckboxSize;
  /** 체크 상태 */
  checked?: boolean;
  /** 라벨 텍스트 */
  label?: string;
  /** 변경 핸들러 */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * **Checkbox**
 *
 * 체크박스 폼 컨트롤.
 *
 * - `size`: small(12px) / medium(14px) / large(18px)
 * - Checked: 파란 배경 + 흰 체크 아이콘
 * - Disabled Unchecked: 회색 배경
 * - Disabled Checked: 파란 배경 opacity 0.65
 *
 * ```tsx
 * <Checkbox label="동의합니다" checked={agreed} onCheckedChange={setAgreed} />
 * ```
 */
export function Checkbox({
  size = "medium",
  checked = false,
  label,
  disabled = false,
  onCheckedChange,
  onChange,
  className,
  ...rest
}: CheckboxProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      onChange?.(e);
    },
    [onCheckedChange, onChange],
  );

  return (
    <label className={cx(s.wrapper, disabled && s.wrapperDisabled, className)}>
      <input
        type="checkbox"
        className={s.hiddenInput}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      <span className={s.box({ size, checked, disabled })}>
        {checked && (
          <span className={s.checkIcon({ size })}>
            <CheckSvg size={size} />
          </span>
        )}
      </span>
      {label && (
        <span className={s.label({ size, disabled })}>{label}</span>
      )}
    </label>
  );
}

/* ─── Check SVG — sized per variant ─── */
function CheckSvg({ size }: { size: CheckboxSize }) {
  const dims: Record<CheckboxSize, { w: number; h: number; d: string }> = {
    small: {
      w: 5.3,
      h: 4,
      d: "M0.75 2L2.08 3.25L4.55 0.75",
    },
    medium: {
      w: 6.2,
      h: 4.7,
      d: "M0.75 2.35L2.43 3.95L5.45 0.75",
    },
    large: {
      w: 8,
      h: 6,
      d: "M1 3L3.14 5L7 1",
    },
  };
  const { w, h, d } = dims[size];
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
