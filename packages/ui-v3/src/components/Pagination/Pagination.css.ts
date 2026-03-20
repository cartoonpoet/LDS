import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, opacityPalette } from "@lds/tokens";

/* ─── root container ─── */
export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  fontFamily: themeVars.font.family,
});

/* ─── arrow button (prev / next) ─── */
export const arrowButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  border: "none",
  borderRadius: 29,
  backgroundColor: opacityPalette.light,
  cursor: "pointer",
  color: semanticColorRoles.action.primary.default,
  flexShrink: 0,
  transition: "background-color 150ms ease",
  selectors: {
    "&:hover": {
      backgroundColor: opacityPalette.secondary,
    },
    "&:disabled": {
      opacity: 0.4,
      cursor: "default",
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: themeVars.shadow.focus,
    },
  },
});

/* ─── numbers track (pill bg) ─── */
export const numbersTrack = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: opacityPalette.light,
  borderRadius: 16,
  padding: `0 ${themeVars.spacing.x1}`,
  height: 28,
  gap: 0,
});

/* ─── page number button ─── */
export const pageButton = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    border: "none",
    borderRadius: 29,
    backgroundColor: "transparent",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: themeVars.font.family,
    color: semanticColorRoles.text.primary,
    cursor: "pointer",
    transition: "background-color 150ms ease, color 150ms ease",
    selectors: {
      "&:hover": {
        backgroundColor: opacityPalette.secondary,
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
        fontSize: "14px",
        fontWeight: 600,
        selectors: {
          "&:hover": {
            backgroundColor: semanticColorRoles.action.primary.hover,
          },
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

/* ─── total count ─── */
export const totalCount = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 2,
  fontSize: "13px",
  fontWeight: 500,
  fontFamily: themeVars.font.family,
  color: semanticColorRoles.text.primary,
});

export const totalCountNumber = style({
  fontWeight: 600,
});
