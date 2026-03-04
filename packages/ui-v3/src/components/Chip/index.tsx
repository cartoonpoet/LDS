import type { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import * as styles from "./Chip.css";

export type ChipProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    kind?: "basic" | "check" | "file" | "link";
    selected?: boolean;
    dismissible?: boolean;
    onDismiss?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    leadingIcon?: ReactNode;
    metaText?: ReactNode;
  }
>;

export function Chip({
  children,
  className,
  dismissible = false,
  kind = "basic",
  leadingIcon,
  metaText,
  onDismiss,
  selected = false,
  ...props
}: ChipProps) {
  const composedClassName = [styles.chip({ kind, selected }), className].filter(Boolean).join(" ");

  const leadingNode =
    kind === "check" ? (
      <span aria-hidden="true" className={styles.checkIndicator}>
        {selected ? "✓" : ""}
      </span>
    ) : leadingIcon ? (
      <span className={styles.leading}>{leadingIcon}</span>
    ) : null;

  return (
    <span className={composedClassName} {...props}>
      {leadingNode}
      <span className={styles.label}>{children}</span>
      {metaText && (kind === "file" || kind === "link") ? (
        <span className={styles.metaText({ kind })}>{metaText}</span>
      ) : null}
      {dismissible ? (
        <button aria-label="Remove chip" className={styles.dismissButton} onClick={onDismiss} type="button">
          ×
        </button>
      ) : null}
    </span>
  );
}
