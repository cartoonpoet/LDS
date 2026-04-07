import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

const action = semanticColorRoles.action;

/* ─── container ─── */
export const root = recipe({
  base: {
    display: "inline-flex",
  },
  variants: {
    size: {
      small: {},
      medium: {},
    },
    fullWidth: {
      true: {
        display: "flex",
        width: "100%",
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "medium",
    fullWidth: false,
  },
});

/* ─── individual item (button) ─── */
export const item = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: themeVars.spacing.x1,
    border: `1px solid ${semanticColorRoles.border.subtle}`,
    borderRadius: themeVars.radius.sm,
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontWeight: themeVars.font.weightMedium,
    textAlign: "center",
    lineHeight: 1,
    transition:
      "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
    flexShrink: 0,
    backgroundColor: semanticColorRoles.surface.canvas,
    color: semanticColorRoles.text.primary,
    selectors: {
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
        zIndex: 1,
        position: "relative",
      },
      "&:hover:not([aria-checked='true'])": {
        backgroundColor: action.primary.subtle,
      },
    },
  },
  variants: {
    size: {
      small: {
        height: 31,
        padding: `0 ${themeVars.spacing.x2}`,
        fontSize: themeVars.font.sizeSm,
      },
      medium: {
        height: 38,
        padding: `0 ${themeVars.spacing.x3}`,
        fontSize: themeVars.font.sizeMd,
      },
    },
    fullWidth: {
      true: {
        flex: 1,
      },
      false: {},
    },
    active: {
      true: {
        backgroundColor: action.primary.default,
        borderColor: action.primary.default,
        color: semanticColorRoles.text.inverse,
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "medium",
    fullWidth: false,
    active: false,
  },
});

/* ─── icon slot ─── */
export const iconSlot = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 14,
  height: 14,
});
