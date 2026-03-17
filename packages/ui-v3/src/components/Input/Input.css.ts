import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const input = recipe({
  base: {
    width: "100%",
    minWidth: 0,
    border: 0,
    background: "transparent",
    color: semanticColorRoles.field.text,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    lineHeight: 1.4,
    outline: "none",
    boxSizing: "border-box",
    padding: `0 ${themeVars.spacing.x3}`,
    selectors: {
      "&::placeholder": {
        color: semanticColorRoles.field.placeholder
      },
      "&:disabled": {
        color: semanticColorRoles.text.disabled,
        cursor: "not-allowed"
      }
    },
    "@media": {
      "screen and (max-width: 767px)": {
        fontSize: themeVars.font.sizeLg
      }
    }
  },
  variants: {
    size: {
      sm: {
        fontSize: themeVars.font.sizeSm
      },
      md: {},
      lg: {
        fontSize: themeVars.font.sizeLg
      }
    },
    hasPrefix: {
      true: {
        paddingLeft: themeVars.spacing.x2
      },
      false: {}
    },
    hasSuffix: {
      true: {
        paddingRight: themeVars.spacing.x2
      },
      false: {}
    }
  },
  defaultVariants: {
    size: "md",
    hasPrefix: false,
    hasSuffix: false
  }
});
