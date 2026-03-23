import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Spinner.css";

export type SpinnerSize = "sm" | "md" | "lg" | "xl";
export type SpinnerColor = "primary" | "white";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** 스피너 크기 */
  size?: SpinnerSize;
  /** 스피너 색상 */
  color?: SpinnerColor;
  /** 로딩 텍스트 (스피너 오른쪽) */
  label?: string;
}

/**
 * Spinner — 로딩 상태를 나타내는 스피너 컴포넌트
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" label="로딩 중..." />
 * <Spinner color="white" />
 * ```
 */
export function Spinner({
  size = "md",
  color = "primary",
  label: labelText,
  className,
  ...rest
}: SpinnerProps) {
  return (
    <div className={cx(s.wrapper, className)} role="status" {...rest}>
      <div className={s.track({ size, color })} />
      <div className={s.root({ size, color })} />
      {labelText && <span className={s.label}>{labelText}</span>}
    </div>
  );
}
