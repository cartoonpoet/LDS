import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Spacer.css";

/* ─── Types ─── */
export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {}

/* ─── Component ─── */
export function Spacer({ className, ...rest }: SpacerProps) {
  return <div aria-hidden="true" className={cx(s.spacer, className)} {...rest} />;
}
