import type { ButtonProps } from "./index";
import * as styles from "./Button.css";
import { cx } from "../../lib/cx";

export function useButtonState({
  className,
  disabled,
  fullWidth = false,
  loading = false,
  size = "md",
  tone = "primary",
  variant = "solid"
}: Pick<ButtonProps, "className" | "disabled" | "fullWidth" | "loading" | "size" | "tone" | "variant">) {
  const isDisabled = Boolean(disabled || loading);

  return {
    isDisabled,
    buttonClassName: cx(
      styles.buttonRecipe({
        size,
        tone,
        variant
      }),
      fullWidth && styles.fullWidth,
      className
    )
  };
}
