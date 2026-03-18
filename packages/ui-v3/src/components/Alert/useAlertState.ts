import * as styles from "./Alert.css";
import { cx } from "../../lib/cx";
import type { AlertAction, AlertLayout, AlertProps, AlertSize, AlertType } from "./index";

export function useAlertState({
  action,
  className,
  dismissible,
  layout = "default",
  primaryAction,
  secondaryAction,
  showCloseButton,
  size = "medium",
  textAction,
  tone,
  type = "info"
}: Pick<
  AlertProps,
  | "action"
  | "className"
  | "dismissible"
  | "layout"
  | "primaryAction"
  | "secondaryAction"
  | "showCloseButton"
  | "size"
  | "textAction"
  | "tone"
  | "type"
>) {
  const resolvedType = resolveType({ tone, type });
  const resolvedLayout: AlertLayout = layout;
  const resolvedSize: AlertSize = size;
  const resolvedActions = resolveActions({ action, primaryAction, secondaryAction, textAction });
  const hasButtons = Boolean(resolvedActions.primaryAction || resolvedActions.secondaryAction || resolvedActions.textAction);
  const hasCloseButton = Boolean(showCloseButton ?? dismissible);
  const hasActions = Boolean(hasButtons || hasCloseButton);

  return {
    resolvedType,
    resolvedSize,
    resolvedLayout,
    resolvedActions,
    hasButtons,
    hasCloseButton,
    hasActions,
    rootClassName: cx(
      styles.alertRoot({
        type: resolvedType,
        size: resolvedSize,
        layout: resolvedLayout
      }),
      className
    )
  };
}

function resolveType({ tone, type }: Pick<AlertProps, "tone" | "type">): AlertType {
  if (type) {
    return type;
  }

  if (tone === "neutral") {
    return "confirm";
  }

  return "info";
}

function resolveActions({ action, primaryAction, secondaryAction, textAction }: Pick<AlertProps, "action" | "primaryAction" | "secondaryAction" | "textAction">) {
  if (action) {
    return {
      primaryAction: action,
      secondaryAction,
      textAction
    };
  }

  return {
    primaryAction,
    secondaryAction,
    textAction
  } as {
    primaryAction?: AlertAction;
    secondaryAction?: AlertAction;
    textAction?: AlertAction;
  };
}
