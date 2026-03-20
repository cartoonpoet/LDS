import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Button.css";

/* ─── Types ─── */
export type ButtonVariant = "default" | "outline";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "neutral";
export type ButtonShape = "rounded" | "round";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** 버튼 스타일 변형 */
  variant?: ButtonVariant;
  /** 색상 테마 */
  color?: ButtonColor;
  /** 모양 (rounded: 5px / round: pill) */
  shape?: ButtonShape;
  /** 크기 */
  size?: ButtonSize;
  /** 좌측 아이콘 */
  iconLeft?: ReactNode;
  /** 우측 아이콘 */
  iconRight?: ReactNode;
  /** 버튼 텍스트 */
  children?: ReactNode;
}

/* ─── Component ─── */
export function Button({
  variant = "default",
  color = "primary",
  shape = "rounded",
  size = "medium",
  iconLeft,
  iconRight,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cx(
        s.root({ variant, color, shape, size }),
        disabled && s.disabled,
        className,
      )}
      {...rest}
    >
      {iconLeft && <span className={s.iconSlot}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={s.iconSlot}>{iconRight}</span>}
    </button>
  );
}
