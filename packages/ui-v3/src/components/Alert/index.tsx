import type { HTMLAttributes, ReactNode } from "react";
import * as styles from "./Alert.css";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "info" | "success" | "warning" | "danger" | "neutral";
  title?: string;
  action?: ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
};

export function Alert({
  action,
  children,
  className,
  dismissible = false,
  onClose,
  title,
  tone = "info",
  ...props
}: AlertProps) {
  const composedClassName = [styles.alert({ tone }), className].filter(Boolean).join(" ");

  return (
    <div className={composedClassName} role="alert" {...props}>
      {(title || dismissible) && (
        <div className={styles.header}>
          {title ? <p className={styles.title}>{title}</p> : <span />}
          {dismissible ? (
            <button aria-label="Close alert" className={styles.closeButton} onClick={onClose} type="button">
              ×
            </button>
          ) : null}
        </div>
      )}
      {children ? <div className={styles.content}>{children}</div> : null}
      {action ? <div className={styles.actionRow}>{action}</div> : null}
    </div>
  );
}
