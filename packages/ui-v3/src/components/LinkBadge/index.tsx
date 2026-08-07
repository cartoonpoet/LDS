import type { AnchorHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import * as styles from "./LinkBadge.css";

export type LinkBadgeProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    tone?: "primary" | "neutral";
    variant?: "filled" | "outline" | "muted";
    leadingIcon?: ReactNode;
    external?: boolean;
  }
>;

export function LinkBadge({
  children,
  className,
  external = false,
  leadingIcon,
  tone = "primary",
  variant = "outline",
  ...props
}: LinkBadgeProps) {
  const composedClassName = [styles.linkBadge({ tone, variant }), className].filter(Boolean).join(" ");

  return (
    <a
      className={composedClassName}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...props}
    >
      {leadingIcon ? <span className={styles.icon}>{leadingIcon}</span> : null}
      <span>{children}</span>
      {external ? (
        <span aria-hidden="true" className={styles.externalIcon}>
          ↗
        </span>
      ) : null}
    </a>
  );
}
