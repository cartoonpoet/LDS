import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

/* ─── container ─── */
export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 0,
});

/* ─── individual tab ─── */
export const tab = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    padding: `0 ${themeVars.spacing.x3}`,
    border: "none",
    borderRadius: themeVars.radius.sm,
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    backgroundColor: "transparent",
    color: semanticColorRoles.text.primary,
    transition: "background-color 150ms ease, color 150ms ease",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: semanticColorRoles.surface.subtle,
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
      },
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: semanticColorRoles.action.primary.hover,
          },
        },
      },
      false: {},
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.4,
        pointerEvents: "none" as const,
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
});
