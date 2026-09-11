import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { themeVars } from "@lds/tokens";
import { cx } from "../../lib/cx";
import * as s from "./Box.css";

/* ─── Types ─── */
export type BoxSpacing = keyof typeof themeVars.spacing;
export type BoxBackground = "page" | "canvas" | "subtle" | "raised";
export type BoxRadius = keyof typeof themeVars.radius;

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  /** 사방 패딩 (디자인 토큰: x1=4px ~ x6=24px) */
  p?: BoxSpacing;
  /** 좌우 패딩 — p보다 우선 */
  px?: BoxSpacing;
  /** 상하 패딩 — p보다 우선 */
  py?: BoxSpacing;
  /** 배경 (surface 역할 토큰) */
  bg?: BoxBackground;
  /** 모서리 라운드 (radius 토큰: sm=4px, md=6px, lg=8px) */
  radius?: BoxRadius;
  /** 1px border.subtle 테두리 */
  border?: boolean;
  children?: ReactNode;
}

/* ─── Component ─── */
export function Box({
  p,
  px,
  py,
  bg,
  radius,
  border,
  className,
  style,
  children,
  ...rest
}: BoxProps) {
  const tokenStyle: CSSProperties = {};
  if (p) tokenStyle.padding = themeVars.spacing[p];
  if (px) {
    tokenStyle.paddingLeft = themeVars.spacing[px];
    tokenStyle.paddingRight = themeVars.spacing[px];
  }
  if (py) {
    tokenStyle.paddingTop = themeVars.spacing[py];
    tokenStyle.paddingBottom = themeVars.spacing[py];
  }
  if (radius) tokenStyle.borderRadius = themeVars.radius[radius];

  return (
    <div
      className={cx(s.box({ bg, border }), className)}
      style={{ ...tokenStyle, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
