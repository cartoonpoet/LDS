import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars, grayPalette, opacityPalette } from "@lds/tokens";

/* ─── wrapper (anchor) ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
});

/* ─── floating card ─── */
export const card = style({
  position: "absolute",
  bottom: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  marginBottom: themeVars.spacing.x2,
  zIndex: 1100,
  display: "flex",
  flexDirection: "column",
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.md,
  boxShadow: themeVars.shadow.raised,
  overflow: "hidden",
});

/* ─── summary header bar (dark) ─── */
export const header = style({
  display: "flex",
  alignItems: "center",
  padding: `0 ${themeVars.spacing.x4}`,
  height: 45,
  backgroundColor: grayPalette[800],
  borderRadius: `${themeVars.radius.md} ${themeVars.radius.md} 0 0`,
});

export const headerText = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeLg,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "24px",
  color: semanticColorRoles.text.inverse,
});

/* ─── steps body ─── */
export const body = style({
  display: "flex",
  alignItems: "center",
  gap: 0,
  padding: `${themeVars.spacing.x4} ${themeVars.spacing.x4}`,
});

/* ─── single step ─── */
export const step = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexShrink: 0,
});

export const stepIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 38,
  height: 38,
  borderRadius: themeVars.radius.md,
  backgroundColor: opacityPalette.light,
  flexShrink: 0,
});

export const stepLabel = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "17px",
  color: grayPalette[800],
  whiteSpace: "nowrap",
});

/* ─── arrow between steps ─── */
export const stepArrow = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  flexShrink: 0,
  color: grayPalette[800],
  margin: `0 ${themeVars.spacing.x1}`,
});
