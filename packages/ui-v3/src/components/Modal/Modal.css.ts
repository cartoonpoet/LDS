import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, opacityPalette } from "@lds/tokens";

/* ─── overlay (backdrop) ─── */
export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 9000,
  backgroundColor: semanticColorRoles.surface.backdrop,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: themeVars.spacing.x4,
});

/* ─── modal card ─── */
export const card = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxHeight: "90vh",
    backgroundColor: semanticColorRoles.surface.canvas,
    borderRadius: themeVars.radius.md,
    boxShadow: themeVars.shadow.raised,
    fontFamily: themeVars.font.family,
    color: semanticColorRoles.text.primary,
    overflow: "hidden",
  },
  variants: {
    size: {
      small: { maxWidth: 508 },
      medium: { maxWidth: 808 },
      large: { maxWidth: 1024 },
      xlarge: { maxWidth: 1280 },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

/* ─── header ─── */
export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x2,
  padding: `0 10px 0 ${themeVars.spacing.x6}`,
  height: 54,
  backgroundColor: opacityPalette.light,
  flexShrink: 0,
});

export const headerTitle = style({
  fontSize: "18px",
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.heading,
  lineHeight: 1.22,
  flex: 1,
  minWidth: 0,
});

export const headerActions = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexShrink: 0,
});

export const closeButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 34,
  height: 34,
  border: "none",
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.md,
  cursor: "pointer",
  color: semanticColorRoles.text.primary,
  flexShrink: 0,
  boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
  transition: "background-color 150ms ease",
  selectors: {
    "&:hover": {
      backgroundColor: grayPalette[50],
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: themeVars.shadow.focus,
    },
  },
});

/* ─── body ─── */
export const body = style({
  padding: `${themeVars.spacing.x4} ${themeVars.spacing.x6}`,
  overflowY: "auto",
  flex: 1,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightRegular,
  color: semanticColorRoles.text.primary,
  lineHeight: 1.5,
});

/* ─── footer ─── */
export const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: themeVars.spacing.x2,
  padding: `0 ${themeVars.spacing.x6}`,
  minHeight: 77,
  borderTop: `1px solid ${semanticColorRoles.border.subtle}`,
  flexShrink: 0,
});
