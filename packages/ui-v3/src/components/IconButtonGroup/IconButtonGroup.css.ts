import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

const action = semanticColorRoles.action;

/* ─── container ─── */
export const root = recipe({
  base: {
    display: "inline-flex",
    borderRadius: themeVars.radius.sm,
    overflow: "hidden",
  },
  variants: {
    variant: {
      fill: {},
      outline: {},
    },
  },
  defaultVariants: {
    variant: "fill",
  },
});

/* ─── individual item (icon-only button) ─── */
export const item = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "background-color 150ms ease, color 150ms ease",
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
        selectors: {
          "&:first-child": { marginLeft: 0 },
          "&:hover:not([data-active='true'])": {
            backgroundColor: action.primary.subtle,
          },
        },
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
    active: false,
  },
});

/* ─── icon wrapper ─── */
export const iconSlot = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18,
  height: 18,
});
