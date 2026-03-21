import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── container ─── */
export const container = style({
  display: "inline-flex",
  alignItems: "center",
  fontFamily: themeVars.font.family,
});

/* ─── stepper button (−/+) ─── */
export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "5px",
    backgroundColor: semanticColorRoles.action.primary.default,
    color: semanticColorRoles.text.inverse,
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
    transition: "background-color 150ms ease",
    ":hover": {
      backgroundColor: semanticColorRoles.action.primary.active,
    },
    ":disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
  variants: {
    size: {
      small: { width: 16, height: 16 },
      medium: { width: 20, height: 20 },
      large: { width: 24, height: 24 },
    },
  },
  defaultVariants: { size: "medium" },
});

/* ─── input field ─── */
export const input = recipe({
  base: {
    border: "none",
    borderRadius: "5px",
    backgroundColor: grayPalette[200],
    textAlign: "center",
    fontFamily: themeVars.font.family,
    outline: "none",
    boxSizing: "border-box",
    MozAppearance: "textfield",
    selectors: {
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
        WebkitAppearance: "none",
        margin: 0,
      },
    },
  },
  variants: {
    size: {
      small: {
        width: 44,
        height: 24,
        fontSize: themeVars.font.sizeSm,
        fontWeight: "600",
        lineHeight: "18px",
        color: grayPalette[800],
      },
      medium: {
        width: 58,
        height: 26,
        fontSize: themeVars.font.sizeMd,
        fontWeight: "600",
        lineHeight: "21px",
        color: grayPalette[800],
      },
      large: {
        width: 76,
        height: 32,
        fontSize: "15px",
        fontWeight: themeVars.font.weightMedium,
        lineHeight: "24px",
        color: semanticColorRoles.text.heading,
      },
    },
  },
  defaultVariants: { size: "medium" },
});
