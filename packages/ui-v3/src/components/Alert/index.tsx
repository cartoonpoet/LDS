import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { Icon } from "../Icon";
import * as styles from "./Alert.css";
import { useAlertIcon } from "./useAlertIcon";
import { useAlertState } from "./useAlertState";

export type AlertType = "info" | "confirm" | "saveTemporarily" | "secret";
export type AlertSize = "medium" | "small";
export type AlertLayout = "default" | "expanded";
export type AlertActionTone = "primary" | "warning";

export type AlertAction = {
  label: string;
  tone?: AlertActionTone;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  type?: AlertType;
  size?: AlertSize;
  layout?: AlertLayout;
  title?: string;
  icon?: ReactNode;
  action?: AlertAction;
  primaryAction?: AlertAction;
  secondaryAction?: AlertAction;
  textAction?: AlertAction;
  button?: boolean;
  textButton?: boolean;
  showCloseButton?: boolean;
  dismissible?: boolean;
  onClose?: () => void;
  tone?: "info" | "neutral";
};

export function Alert({
  action,
  button,
  children,
  className,
  dismissible,
  icon,
  layout = "default",
  onClose,
  primaryAction,
  secondaryAction,
  showCloseButton,
  size = "medium",
  textAction,
  textButton,
  title,
  tone,
  type = "info",
  ...props
}: AlertProps) {
  const {
    hasButtons,
    hasCloseButton,
    resolvedActions,
    resolvedLayout,
    resolvedSize,
    resolvedType,
    rootClassName
  } = useAlertState({
    action,
    className,
    dismissible,
    layout,
    primaryAction,
    secondaryAction,
    showCloseButton,
    size,
    textAction,
    tone,
    type
  });

  const defaultIcon = useAlertIcon(resolvedType);
  const leadingIcon = icon ?? defaultIcon;
  const hasTitle = Boolean(title);
  const shouldRenderButtons = button ?? hasButtons;
  const shouldRenderTextButton = textButton ?? Boolean(resolvedActions.textAction);
  const shouldRenderActions = shouldRenderButtons || shouldRenderTextButton || hasCloseButton;

  return (
    <div className={rootClassName} role="alert" {...props}>
      <div className={styles.contentArea[resolvedLayout]}>
        <div className={styles.bodyRow[resolvedSize]}>
          <span aria-hidden="true" className={styles.iconWrap({ size: resolvedSize, type: resolvedType })}>
            {leadingIcon}
          </span>
          <div className={styles.body[resolvedLayout]}>
            {title ? <p className={styles.title({ size: resolvedSize })}>{title}</p> : null}
            {children ? <div className={styles.description({ hasTitle, size: resolvedSize })}>{children}</div> : null}
          </div>
        </div>
      </div>

      {shouldRenderActions ? (
        <div
          className={styles.actionArea({
            layout: resolvedLayout,
            hasButtons: shouldRenderButtons,
            hasTextButton: shouldRenderTextButton,
            hasCloseButton
          })}
        >
          <div className={styles.actionGroup[resolvedLayout]}>
            {shouldRenderTextButton && resolvedActions.textAction ? (
              <button className={styles.textButton} onClick={resolvedActions.textAction.onClick} type="button">
                {resolvedActions.textAction.label}
              </button>
            ) : null}
            {shouldRenderButtons && resolvedActions.primaryAction ? (
              <button className={styles.actionButton({ tone: resolvedActions.primaryAction.tone ?? "primary" })} onClick={resolvedActions.primaryAction.onClick} type="button">
                {resolvedActions.primaryAction.label}
              </button>
            ) : null}
            {shouldRenderButtons && resolvedActions.secondaryAction ? (
              <button className={styles.actionButton({ tone: resolvedActions.secondaryAction.tone ?? "warning" })} onClick={resolvedActions.secondaryAction.onClick} type="button">
                {resolvedActions.secondaryAction.label}
              </button>
            ) : null}
          </div>
          {hasCloseButton ? (
            <button aria-label="Close alert" className={styles.closeButton({ layout: resolvedLayout })} onClick={onClose} type="button">
              <Icon name="close" size="sm" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
