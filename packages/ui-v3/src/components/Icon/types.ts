import type { SVGProps } from "react";
import { iconRegistry } from "./registry";

export const iconSizes = ["sm", "md", "lg"] as const;

export type IconName = keyof typeof iconRegistry;
export type IconSize = (typeof iconSizes)[number];

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: IconSize;
  title?: string;
};
