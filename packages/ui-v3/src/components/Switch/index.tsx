import { useCallback } from "react";
import type { InputHTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Switch.css";

export type SwitchSize = "small" | "medium";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** 사이즈 */
  size?: SwitchSize;
  /** 체크 상태 */
  checked?: boolean;
  /** 라벨 텍스트 */
  label?: string;
  /** 변경 핸들러 */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * **Switch**
 *
 * 토글 스위치.
 *
 * - `size`: small(32x18) / medium(42x24)
 * - `label`: 왼쪽 라벨 텍스트
 * - `checked` / `onCheckedChange`: 제어 모드
 *
 * ```tsx
 * <Switch label="Label" checked={on} onCheckedChange={setOn} />
 * ```
 */
export function Switch({
  size = "medium",
  checked = false,
  label,
  disabled = false,
  onCheckedChange,
  onChange,
  className,
  ...rest
}: SwitchProps) {
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
      {label && <span className={s.label}>{label}</span>}
      <span className={s.track({ size, checked, disabled })}>
        <span className={s.knob({ size, checked })} />
      </span>
    </label>
  );
}
