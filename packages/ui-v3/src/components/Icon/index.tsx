import * as styles from "./Icon.css";
import { cx } from "../../lib/cx";
import { iconRegistry } from "./registry";
import type { IconProps } from "./types";

export function Icon({ className, name, size = "md", title, ...props }: IconProps) {
  const SvgIcon = iconRegistry[name];

  return <SvgIcon className={cx(styles.icon({ size }), className)} title={title} {...props} />;
}

export { iconRegistry } from "./registry";
export type { IconName, IconProps, IconSize } from "./types";
