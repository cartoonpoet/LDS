import type { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import * as styles from "./Badge.css";

export type BadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: "primary" | "neutral";
    variant?: "filled" | "outline" | "muted";
    leadingIcon?: ReactNode;
    dismissible?: boolean;
    onDismiss?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    iconOnly?: boolean;
    "aria-label"?: string;
  }
>;

export function Badge({
  "aria-label": ariaLabel,
  children,
  className,
  dismissible = false,
  iconOnly = false,
  leadingIcon,
  onDismiss,
  tone = "primary",
  variant = "filled",
  ...props
}: BadgeProps) {
  const composedClassName = [styles.badge({ iconOnly, tone, variant }), className].filter(Boolean).join(" ");

  return (
    <span aria-label={ariaLabel} className={composedClassName} {...props}>
      {leadingIcon ? <span className={styles.icon}>{leadingIcon}</span> : null}
      {!iconOnly ? children : null}
      {dismissible ? (
        <button
          aria-label="Remove badge"
          className={styles.dismissButton}
          onClick={onDismiss}
          type="button"
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
