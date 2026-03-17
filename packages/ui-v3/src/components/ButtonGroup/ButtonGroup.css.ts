import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "inline-flex",
  alignItems: "stretch",
  gap: "1px",
  padding: "1px",
  borderRadius: themeVars.radius.sm,
  background: semanticColorRoles.surface.canvas,
  border: `1px solid ${semanticColorRoles.field.border}`,
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)"
});

export const button = recipe({
  base: {
    minWidth: "68px",
    minHeight: "28px",
    padding: `0 ${themeVars.spacing.x3}`,
    border: 0,
    borderRadius: "3px",
    background: "transparent",
    color: semanticColorRoles.text.secondary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: "background-color 120ms ease, color 120ms ease, box-shadow 120ms ease",
    selectors: {
      "&:hover:not(:disabled)": {
        background: semanticColorRoles.surface.subtle,
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
        background: semanticColorRoles.button.solid.primary.background,
        color: semanticColorRoles.button.solid.primary.text,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)"
      },
      false: {}
    },
    size: {
      sm: {
        minWidth: "60px",
        minHeight: "24px",
        padding: `0 ${themeVars.spacing.x2}`
      },
      md: {},
      lg: {
        minWidth: "80px",
        minHeight: "32px",
        padding: `0 ${themeVars.spacing.x4}`,
        fontSize: themeVars.font.sizeMd
      }
    }
  },
  defaultVariants: {
    active: false,
    size: "md"
  }
});
