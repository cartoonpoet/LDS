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

/* ─── card ─── */
export const card = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: 512,
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.md,
  boxShadow: themeVars.shadow.raised,
  fontFamily: themeVars.font.family,
  textAlign: "center",
  overflow: "hidden",
});

/* ─── icon wrapper ─── */
export const iconWrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: "50%",
    marginTop: themeVars.spacing.x6,
  },
  variants: {
    intent: {
      warning: { backgroundColor: opacityPalette.warning },
      success: { backgroundColor: opacityPalette.success },
      danger: { backgroundColor: opacityPalette.danger },
      info: { backgroundColor: opacityPalette.info },
    },
  },
  defaultVariants: {
    intent: "warning",
  },
});

/* ─── default intent icons color ─── */
export const intentIconColor = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    intent: {
      warning: { color: "#f0af23" },
      success: { color: "#28c76f" },
      danger: { color: "#ea5455" },
      info: { color: "#00cfe8" },
    },
  },
  defaultVariants: {
    intent: "warning",
  },
});

/* ─── title ─── */
export const title = style({
  fontSize: "21px",
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.heading,
  lineHeight: 1.24,
  padding: `${themeVars.spacing.x4} ${themeVars.spacing.x6} 0`,
});

/* ─── body ─── */
export const body = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightRegular,
  color: grayPalette[800],
  lineHeight: 1.5,
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x6}`,
});

/* ─── actions ─── */
export const actions = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: themeVars.spacing.x2,
  padding: `${themeVars.spacing.x4} ${themeVars.spacing.x6} ${themeVars.spacing.x6}`,
});
