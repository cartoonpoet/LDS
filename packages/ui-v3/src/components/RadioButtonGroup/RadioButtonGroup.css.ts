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
    borderRadius: themeVars.radius.sm,
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontWeight: themeVars.font.weightMedium,
    textAlign: "center",
    lineHeight: 1,
    transition:
      "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
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
      /**
       * fill — inactive: neutral border + canvas bg
       *         active:  solid primary bg + inverse text
       */
      fill: {
        border: `1px solid ${semanticColorRoles.border.subtle}`,
        backgroundColor: semanticColorRoles.surface.canvas,
        color: semanticColorRoles.text.primary,
        selectors: {
          "&:hover:not([aria-checked='true'])": {
            backgroundColor: action.primary.subtle,
          },
        },
      },
      /**
       * outline — inactive: primary border + transparent + primary text
       *           active:  subtleActive tint + primary border + primary text
       */
      outline: {
        border: `1px solid ${action.primary.default}`,
        backgroundColor: "transparent",
        color: action.primary.default,
        selectors: {
          "&:hover:not([aria-checked='true'])": {
            backgroundColor: action.primary.subtle,
          },
        },
      },
      /**
       * subtle — inactive: neutral border + canvas bg + default text
       *          active:  primary tint bg + primary border + primary text
       *          (Zeplin "Custom Option" 선택 상태와 동일)
       */
      subtle: {
        border: `1px solid ${semanticColorRoles.border.subtle}`,
        backgroundColor: semanticColorRoles.surface.canvas,
        color: semanticColorRoles.text.primary,
        selectors: {
          "&:hover:not([aria-checked='true'])": {
            backgroundColor: action.primary.subtle,
            borderColor: action.primary.default,
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
    fullWidth: {
      true: { flex: 1 },
      false: {},
    },
    active: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    /* fill active */
    {
      variants: { variant: "fill", active: true },
      style: {
        backgroundColor: action.primary.default,
        borderColor: action.primary.default,
        color: semanticColorRoles.text.inverse,
      },
    },
    /* outline active */
    {
      variants: { variant: "outline", active: true },
      style: {
        backgroundColor: action.primary.subtleActive,
        borderColor: action.primary.default,
        color: action.primary.default,
      },
    },
    /* subtle active */
    {
      variants: { variant: "subtle", active: true },
      style: {
        backgroundColor: action.primary.subtle,
        borderColor: action.primary.default,
        color: action.primary.default,
      },
    },
  ],
  defaultVariants: {
    variant: "fill",
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
