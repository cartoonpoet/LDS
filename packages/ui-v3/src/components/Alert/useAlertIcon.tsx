import { Icon, type IconName } from "../Icon";
import type { AlertType } from ".";

const alertIconMap = {
  info: "info",
  confirm: "confirm",
  saveTemporarily: "saveTemporarily",
  secret: "secret"
} as const satisfies Record<AlertType, Exclude<IconName, "close">>;

export function useAlertIcon(type: AlertType) {
  return <Icon name={alertIconMap[type]} size="sm" />;
}
