import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── root nav ─── */
export const root = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontWeight: themeVars.font.weightMedium,
  },
  variants: {
    size: {
      small: { fontSize: themeVars.font.sizeSm },
      medium: { fontSize: themeVars.font.sizeMd },
    },
  },
  defaultVariants: { size: "medium" },
});

/* ─── ol ─── */
export const list = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: themeVars.spacing.x2,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

/* ─── li ─── */
export const item = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
});

/* ─── link (intermediate item) ─── */
export const link = style({
  color: grayPalette[500],
  textDecoration: "none",
  transition: "color 150ms ease",
  selectors: {
    "&:hover": {
      color: semanticColorRoles.action.primary.default,
      textDecoration: "underline",
    },
    "&:focus-visible": {
      outline: "none",
      borderRadius: themeVars.radius.sm,
      boxShadow: themeVars.shadow.focus,
    },
  },
});

/* ─── current page (last item) ─── */
export const current = style({
  color: semanticColorRoles.text.primary,
  fontWeight: themeVars.font.weightBold,
});

/* ─── separator ─── */
export const separator = style({
  display: "inline-flex",
  alignItems: "center",
  color: grayPalette[400],
  userSelect: "none",
});
