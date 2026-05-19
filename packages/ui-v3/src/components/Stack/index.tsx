import type { HTMLAttributes, ReactNode } from "react";
import { themeVars } from "@lds/tokens";
import { cx } from "../../lib/cx";
import * as s from "./Stack.css";

/* ─── Types ─── */
export type StackGap = keyof typeof themeVars.spacing;
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between";

export interface HStackProps extends HTMLAttributes<HTMLDivElement> {
  /** 자식 간격 (디자인 토큰 기반: x1=4px ~ x6=24px) */
  gap?: StackGap;
  /** 교차축 정렬 (alignItems) */
  align?: StackAlign;
  /** 주축 정렬 (justifyContent) */
  justify?: StackJustify;
  children?: ReactNode;
}

export type VStackProps = HStackProps;

/* ─── Components ─── */
export function HStack({
  gap,
  align,
  justify,
  className,
  style,
  children,
  ...rest
}: HStackProps) {
  return (
    <div
      className={cx(s.stack({ direction: "row", align, justify }), className)}
      style={gap ? { gap: themeVars.spacing[gap], ...style } : style}
      {...rest}
    >
      {children}
    </div>
  );
}
