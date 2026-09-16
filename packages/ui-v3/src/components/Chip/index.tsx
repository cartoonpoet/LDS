import { useState } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { defaultDurationTokens } from "@lds/tokens";
import * as styles from "./Chip.css";

const EXIT_MS = parseInt(defaultDurationTokens.base, 10);

export type ChipProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    selected?: boolean;
    checkable?: boolean;
    dismissible?: boolean;
    onDismiss?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    leadingIcon?: ReactNode;
  }
>;

export function Chip({
  checkable = false,
  children,
  className,
  dismissible = false,
  leadingIcon,
  onDismiss,
  selected = false,
  ...props
}: ChipProps) {
  const composedClassName = [styles.chip({ checkable, selected }), className].filter(Boolean).join(" ");
  const [dismissing, setDismissing] = useState(false);

  const handleDismissClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setDismissing(true);
    setTimeout(() => onDismiss?.(e), EXIT_MS);
  };

  return (
    <span className={styles.dismissOuter({ dismissing })}>
      <span className={styles.dismissInner}>
        <span className={composedClassName} {...props}>
          {checkable ? <span className={styles.leading}>{selected ? "✓" : ""}</span> : null}
          {!checkable && leadingIcon ? <span className={styles.leading}>{leadingIcon}</span> : null}
          <span>{children}</span>
          {dismissible ? (
            <button aria-label="Remove chip" className={styles.dismissButton} onClick={handleDismissClick} type="button">
              ×
            </button>
          ) : null}
        </span>
      </span>
    </span>
  );
}
