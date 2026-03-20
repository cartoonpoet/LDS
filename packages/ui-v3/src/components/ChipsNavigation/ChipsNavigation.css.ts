import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, darkPalette } from "@lds/tokens";

/* ─── container ─── */
export const root = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
});

/* ─── divider between "All" and options ─── */
export const divider = style({
  width: 1,
  height: 20,
  backgroundColor: "#CFD5E1",
  flexShrink: 0,
});

/* ─── options area (right side) ─── */
export const options = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
  flexWrap: "wrap",
  minWidth: 0,
});

/* ─── chip (shared for "All" and option items) ─── */
export const chip = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    height: 26,
    padding: `0 ${themeVars.spacing.x2}`,
    border: "none",
    borderRadius: 30,
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    transition: "background-color 150ms ease, color 150ms ease",
    flexShrink: 0,
    selectors: {
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
      },
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: darkPalette[700],
        color: semanticColorRoles.text.inverse,
        selectors: {
          "&:hover": { opacity: 0.9 },
        },
      },
      false: {
        backgroundColor: `${darkPalette[700]}1F`,
        color: semanticColorRoles.text.primary,
        selectors: {
          "&:hover": {
            backgroundColor: `${darkPalette[700]}33`,
          },
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

/* ─── check icon for multi-select mode ─── */
export const checkIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 14,
  height: 14,
  flexShrink: 0,
});
