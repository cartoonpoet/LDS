import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import * as styles from "./Alert.css";

export type AlertAction = {
  label: string;
  tone?: "primary" | "warning";
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "info" | "neutral";
  title?: string;
  icon?: ReactNode;
  primaryAction?: AlertAction;
  secondaryAction?: AlertAction;
  dismissible?: boolean;
  onClose?: () => void;
};

export function Alert({
  children,
  className,
  dismissible = false,
  icon = "i",
  onClose,
  primaryAction,
  secondaryAction,
  title,
  tone = "info",
  ...props
}: AlertProps) {
  const hasAction = Boolean(primaryAction || secondaryAction || dismissible);
  const composedClassName = [styles.alert({ tone, withAction: hasAction }), className].filter(Boolean).join(" ");

  return (
    <div className={composedClassName} role="alert" {...props}>
      <div className={styles.body}>
        <span aria-hidden="true" className={styles.icon}>
          {icon}
        </span>
        <div className={styles.textWrap}>
          {title ? <p className={styles.title}>{title}</p> : null}
          {children ? <div className={styles.description}>{children}</div> : null}
        </div>
      </div>
      {hasAction ? (
        <div className={styles.actionRow}>
          {primaryAction ? (
            <button className={styles.actionButton({ tone: primaryAction.tone ?? "primary" })} onClick={primaryAction.onClick} type="button">
              {primaryAction.label}
            </button>
          ) : null}
          {secondaryAction ? (
            <button className={styles.actionButton({ tone: secondaryAction.tone ?? "warning" })} onClick={secondaryAction.onClick} type="button">
              {secondaryAction.label}
            </button>
          ) : null}
          {dismissible ? (
            <button aria-label="Close alert" className={styles.closeButton} onClick={onClose} type="button">
              ×
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
