import type { HTMLAttributes, PropsWithChildren } from "react";
import * as styles from "./Badge.css";

export type BadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: "neutral" | "primary" | "success" | "warning" | "danger" | "info";
    variant?: "soft" | "solid" | "outline";
  }
>;

export function Badge({ children, className, tone = "neutral", variant = "soft", ...props }: BadgeProps) {
  const composedClassName = [styles.badge({ tone, variant }), className].filter(Boolean).join(" ");
  return (
    <span className={composedClassName} {...props}>
      {children}
    </span>
  );
}
