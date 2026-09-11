import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Divider.css";

/* ─── Types ─── */
export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /** 방향 — vertical은 flex 부모 안에서 stretch */
  orientation?: DividerOrientation;
}

/* ─── Component ─── */
export function Divider({ orientation = "horizontal", className, ...rest }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cx(s.divider({ orientation }), className)}
        {...rest}
      />
    );
  }
  return <hr className={cx(s.divider({ orientation }), className)} {...rest} />;
}
