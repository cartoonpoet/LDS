import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Container.css";

/* ─── Types ─── */
export type ContainerSize = "sm" | "md" | "lg" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** 최대 폭 — sm=768px, md=1024px, lg=1280px, full=제한 없음 */
  size?: ContainerSize;
  children?: ReactNode;
}

/* ─── Component ─── */
export function Container({ size, className, children, ...rest }: ContainerProps) {
  return (
    <div className={cx(s.container({ size }), className)} {...rest}>
      {children}
    </div>
  );
}
