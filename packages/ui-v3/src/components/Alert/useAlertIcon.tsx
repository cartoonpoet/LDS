import { Icon } from "../Icon";
import type { AlertType } from ".";

const alertIconMap: Record<AlertType, "info" | "confirm" | "saveTemporarily" | "secret"> = {
  info: "info",
  confirm: "confirm",
  saveTemporarily: "saveTemporarily",
  secret: "secret"
};

export function useAlertIcon(type: AlertType) {
  return <Icon name={alertIconMap[type]} size="sm" />;
}
