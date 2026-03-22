import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

const action = semanticColorRoles.action;

/* ─── container ─── */
export const root = recipe({
  base: {
    display: "inline-flex",
  },
  variants: {
    variant: {
      fill: {
        borderRadius: themeVars.radius.sm,
        overflow: "hidden",
      },
      outline: {},
    },
    size: {
      small: {},
      medium: {},
    },
  },
  defaultVariants: {
    variant: "fill",
    size: "medium",
  },
});

/* ─── individual item (button) ─── */
export const item = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: themeVars.spacing.x1,
    border: "none",
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontWeight: themeVars.font.weightMedium,
    textAlign: "center",
    lineHeight: 1,
    transition: "background-color 150ms ease, color 150ms ease",
    flexShrink: 0,
    selectors: {
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
        zIndex: 1,
        position: "relative",
      },
    },
  },
  variants: {
    variant: {
      fill: {
        backgroundColor: action.primary.default,
        color: semanticColorRoles.text.inverse,
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        selectors: {
          "&:last-child": { borderRight: "none" },
          "&:hover:not([data-active='true'])": {
            backgroundColor: action.primary.hover,
          },
        },
      },
      outline: {
        backgroundColor: "transparent",
        color: action.primary.default,
        border: `1px solid ${action.primary.default}`,
        marginLeft: -1,
        borderRadius: 0,
        selectors: {
          "&:first-child": {
            marginLeft: 0,
            borderTopLeftRadius: themeVars.radius.sm,
            borderBottomLeftRadius: themeVars.radius.sm,
          },
          "&:last-child": {
            borderTopRightRadius: themeVars.radius.sm,
            borderBottomRightRadius: themeVars.radius.sm,
          },
          "&:hover:not([data-active='true'])": {
            backgroundColor: action.primary.subtle,
          },
        },
      },
    },
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
    active: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: "fill", active: true },
      style: {
        backgroundColor: action.primary.active,
      },
    },
    {
      variants: { variant: "outline", active: true },
      style: {
        backgroundColor: action.primary.subtle,
      },
    },
  ],
  defaultVariants: {
    variant: "fill",
    size: "medium",
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
