import { useState } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { defaultDurationTokens } from "@lds/tokens";
import * as styles from "./Badge.css";

const EXIT_MS = parseInt(defaultDurationTokens.base, 10);

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
  const [dismissing, setDismissing] = useState(false);

  const handleDismissClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setDismissing(true);
    setTimeout(() => onDismiss?.(e), EXIT_MS);
  };

  return (
    <span className={styles.dismissOuter({ dismissing })}>
      <span className={styles.dismissInner}>
        <span aria-label={ariaLabel} className={composedClassName} {...props}>
          {leadingIcon ? <span className={styles.icon}>{leadingIcon}</span> : null}
          {!iconOnly ? children : null}
          {dismissible ? (
            <button
              aria-label="Remove badge"
              className={styles.dismissButton}
              onClick={handleDismissClick}
              type="button"
            >
              ×
            </button>
          ) : null}
        </span>
      </span>
    </span>
  );
}
