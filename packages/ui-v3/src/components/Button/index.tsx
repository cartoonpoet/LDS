import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import * as styles from "./Button.css";

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?:
      | "primary"
      | "secondary"
      | "success"
      | "danger"
      | "warning"
      | "info"
      | "dark"
      | "neutral";
    variant?: "solid" | "outline" | "gradient";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    loading?: boolean;
  }
>;

export function Button({
  children,
  className,
  fullWidth = false,
  leadingIcon,
  loading = false,
  size = "md",
  tone = "primary",
  trailingIcon,
  type = "button",
  variant = "solid",
  disabled,
  ...props
}: ButtonProps) {
  const composedClassName = [
    styles.buttonRecipe({
      size,
      tone,
      variant
    }),
    fullWidth ? styles.fullWidth : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={composedClassName} disabled={disabled || loading} type={type} {...props}>
      <span className={styles.content}>
        {loading ? <span aria-hidden="true" className={styles.spinner} /> : null}
        {!loading && leadingIcon ? <span className={styles.icon}>{leadingIcon}</span> : null}
        <span>{children}</span>
        {!loading && trailingIcon ? <span className={styles.icon}>{trailingIcon}</span> : null}
      </span>
    </button>
  );
}
