import { recipe } from "@vanilla-extract/recipes";

export const icon = recipe({
  base: {
    display: "inline-block",
    flexShrink: 0,
    verticalAlign: "middle"
  },
  variants: {
    size: {
      sm: {
        width: "16px",
        height: "16px"
      },
      md: {
        width: "24px",
        height: "24px"
      }
    }
  },
  defaultVariants: {
    size: "md"
  }
});
