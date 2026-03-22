import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── wrapper (positioned by chart library) ─── */
export const root = recipe({
  base: {
    display: "inline-flex",
    flexDirection: "column",
    borderRadius: themeVars.radius.sm,
    fontFamily: themeVars.font.family,
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: 1100,
  },
  variants: {
    variant: {
      default: {
        backgroundColor: semanticColorRoles.surface.canvas,
        border: `1px solid ${grayPalette[200]}`,
      },
      pie: {
        backgroundColor: semanticColorRoles.action.primary.default,
      },
    },
  },
  defaultVariants: { variant: "default" },
});

/* ─── header (date/category — default only) ─── */
export const header = style({
  padding: "7px 10px",
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "18px",
  color: semanticColorRoles.text.heading,
});

/* ─── divider (default only) ─── */
export const divider = style({
  height: 1,
  backgroundColor: grayPalette[200],
});

/* ─── body row ─── */
export const body = style({
  padding: "7px 10px",
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x1,
});

/* ─── single data row ─── */
export const row = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
});

/* ─── color dot ─── */
export const dot = style({
  width: 12,
  height: 12,
  borderRadius: "50%",
  flexShrink: 0,
});

/* ─── label text ─── */
export const label = recipe({
  base: {
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightBold,
    lineHeight: "18px",
  },
  variants: {
    variant: {
      default: { color: grayPalette[800] },
      pie: { color: semanticColorRoles.text.inverse },
    },
  },
  defaultVariants: { variant: "default" },
});

/* ─── value text ─── */
export const value = recipe({
  base: {
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightBold,
    lineHeight: "18px",
  },
  variants: {
    variant: {
      default: { color: grayPalette[800] },
      pie: { color: semanticColorRoles.text.inverse },
    },
  },
  defaultVariants: { variant: "default" },
});
