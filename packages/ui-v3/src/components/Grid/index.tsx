import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { themeVars } from "@lds/tokens";
import { cx } from "../../lib/cx";
import * as s from "./Grid.css";

/* ─── Types ─── */
export type GridGap = keyof typeof themeVars.spacing;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** 동일 폭 컬럼 수 — repeat(N, minmax(0, 1fr)) */
  columns?: number;
  /** 행/열 공통 간격 토큰 */
  gap?: GridGap;
  /** 행 간격 — gap보다 우선 */
  rowGap?: GridGap;
  /** 열 간격 — gap보다 우선 */
  columnGap?: GridGap;
  children?: ReactNode;
}

/* ─── Component ─── */
export function Grid({
  columns = 1,
  gap,
  rowGap,
  columnGap,
  className,
  style,
  children,
  ...rest
}: GridProps) {
  const tokenStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };
  if (gap) tokenStyle.gap = themeVars.spacing[gap];
  if (rowGap) tokenStyle.rowGap = themeVars.spacing[rowGap];
  if (columnGap) tokenStyle.columnGap = themeVars.spacing[columnGap];

  return (
    <div className={cx(s.grid, className)} style={{ ...tokenStyle, ...style }} {...rest}>
      {children}
    </div>
  );
}
