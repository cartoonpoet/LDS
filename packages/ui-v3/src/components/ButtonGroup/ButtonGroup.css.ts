import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "inline-flex",
  alignItems: "stretch",
  gap: "2px",
  padding: "2px",
  borderRadius: themeVars.radius.sm,
  background: semanticColorRoles.surface.subtle,
  border: `1px solid ${semanticColorRoles.field.border}`
});

export const button = recipe({
  base: {
    minWidth: "72px",
    minHeight: "32px",
    padding: `0 ${themeVars.spacing.x4}`,
    border: 0,
    borderRadius: `calc(${themeVars.radius.sm} - 2px)`,
    background: "transparent",
    color: semanticColorRoles.text.secondary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "background-color 120ms ease, color 120ms ease, box-shadow 120ms ease",
    selectors: {
      "&:hover:not(:disabled)": {
        background: semanticColorRoles.surface.canvas,
        color: semanticColorRoles.text.primary
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
        position: "relative",
        zIndex: 1
      },
      "&:disabled": {
        color: semanticColorRoles.text.disabled,
        cursor: "not-allowed"
      }
    }
  },
  variants: {
    active: {
      true: {
        background: semanticColorRoles.surface.canvas,
        color: semanticColorRoles.text.primary,
        boxShadow: themeVars.shadow.raised,
        fontWeight: themeVars.font.weightBold
      },
      false: {}
    },
    size: {
      sm: {
        minWidth: "64px",
        minHeight: "28px",
        padding: `0 ${themeVars.spacing.x3}`
      },
      md: {},
      lg: {
        minWidth: "84px",
        minHeight: "38px",
        padding: `0 ${themeVars.spacing.x5}`,
        fontSize: themeVars.font.sizeMd
      }
    }
  },
  defaultVariants: {
    active: false,
    size: "md"
  }
});
