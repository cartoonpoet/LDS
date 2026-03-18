import * as styles from "./Icon.css";
import { cx } from "../../lib/cx";
import { CloseIcon, ConfirmIcon, InfoIcon, SaveTemporarilyIcon, SecretIcon } from "./icons";
import type { IconName, IconSize } from "./types";
import type { SVGProps } from "react";

const iconRegistry = {
  info: InfoIcon,
  confirm: ConfirmIcon,
  saveTemporarily: SaveTemporarilyIcon,
  secret: SecretIcon,
  close: CloseIcon
} as const;

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: IconSize;
  title?: string;
};

export function Icon({ className, name, size = "md", title, ...props }: IconProps) {
  const SvgIcon = iconRegistry[name];

  return <SvgIcon className={cx(styles.icon({ size }), className)} title={title} {...props} />;
}

export type { IconName, IconSize } from "./types";
