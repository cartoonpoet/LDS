import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles } from "@lds/tokens";

export const divider = recipe({
  base: {
    border: "none",
    margin: 0,
    flexShrink: 0,
    background: semanticColorRoles.border.subtle,
  },
  variants: {
    orientation: {
      horizontal: { width: "100%", height: "1px" },
      vertical: { width: "1px", alignSelf: "stretch" },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
