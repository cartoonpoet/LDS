import type { SVGProps } from "react";

export type IconName = "info" | "confirm" | "saveTemporarily" | "secret" | "close";

export type IconSize = "sm" | "md";

export type IconComponentProps = SVGProps<SVGSVGElement> & {
  title?: string;
};
