import type { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import * as styles from "./Chip.css";

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

  return (
    <span className={composedClassName} {...props}>
      {checkable ? <span className={styles.leading}>{selected ? "✓" : ""}</span> : null}
      {!checkable && leadingIcon ? <span className={styles.leading}>{leadingIcon}</span> : null}
      <span>{children}</span>
      {dismissible ? (
        <button aria-label="Remove chip" className={styles.dismissButton} onClick={onDismiss} type="button">
          ×
        </button>
      ) : null}
    </span>
  );
}
