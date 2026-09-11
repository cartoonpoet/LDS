import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

export const container = recipe({
  base: {
    boxSizing: "border-box",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: themeVars.spacing.x5,
    paddingRight: themeVars.spacing.x5,
  },
  variants: {
    size: {
      sm: { maxWidth: "768px" },
      md: { maxWidth: "1024px" },
      lg: { maxWidth: "1280px" },
      full: { maxWidth: "none" },
    },
  },
  defaultVariants: {
    size: "lg",
  },
});
