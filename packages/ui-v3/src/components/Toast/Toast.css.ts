import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, greenPalette, yellowPalette, redPalette, opacityPalette } from "@lds/tokens";

const slideIn = keyframes({
  from: { opacity: 0, transform: "translateY(-8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

/* ─── root ─── */
export const root = style({
  width: 380,
  borderRadius: themeVars.radius.sm,
  backgroundColor: semanticColorRoles.surface.canvas,
  boxShadow: themeVars.shadow.raised,
  overflow: "hidden",
  animation: `${slideIn} 200ms ease`,
  fontFamily: themeVars.font.family,
});

/* ─── top row (icon + title + close) ─── */
export const top = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  padding: `${themeVars.spacing.x3} 14px`,
});

/* ─── icon circle ─── */
export const icon = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: "50%",
    flexShrink: 0,
    color: semanticColorRoles.text.inverse,
  },
  variants: {
    intent: {
      info: { backgroundColor: semanticColorRoles.action.primary.default },
      success: { backgroundColor: greenPalette[400] },
      warning: { backgroundColor: yellowPalette[400] },
      error: { backgroundColor: redPalette[400] },
    },
  },
  defaultVariants: { intent: "info" },
});

/* ─── title area ─── */
export const titleArea = style({
  flex: 1,
  minWidth: 0,
  display: "flex",
  alignItems: "baseline",
  gap: themeVars.spacing.x2,
});

export const heading = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "23px",
  color: semanticColorRoles.text.heading,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const time = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: grayPalette[700],
  flexShrink: 0,
  whiteSpace: "nowrap",
});

/* ─── close button ─── */
export const closeBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 14,
  height: 14,
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: semanticColorRoles.text.primary,
  flexShrink: 0,
  opacity: 0.5,
  transition: "opacity 150ms ease",
  selectors: {
    "&:hover": { opacity: 1 },
  },
});

/* ─── body (description text) ─── */
export const body = style({
  padding: "0 14px 12px 46px",
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: semanticColorRoles.text.primary,
});

/* ─── progress bar ─── */
export const progressTrack = style({
  height: 5,
  backgroundColor: opacityPalette.primary,
});

export const progressFill = recipe({
  base: {
    height: "100%",
    transition: "width 100ms linear",
  },
  variants: {
    intent: {
      info: { backgroundColor: semanticColorRoles.action.primary.default },
      success: { backgroundColor: greenPalette[400] },
      warning: { backgroundColor: yellowPalette[400] },
      error: { backgroundColor: redPalette[400] },
    },
  },
  defaultVariants: { intent: "info" },
});

/* ─── toast container (fixed position) ─── */
export const container = recipe({
  base: {
    position: "fixed",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: themeVars.spacing.x2,
    pointerEvents: "none",
  },
  variants: {
    position: {
      "top-right": { top: themeVars.spacing.x4, right: themeVars.spacing.x4 },
      "top-left": { top: themeVars.spacing.x4, left: themeVars.spacing.x4 },
      "top-center": { top: themeVars.spacing.x4, left: "50%", transform: "translateX(-50%)" },
      "bottom-right": { bottom: themeVars.spacing.x4, right: themeVars.spacing.x4 },
      "bottom-left": { bottom: themeVars.spacing.x4, left: themeVars.spacing.x4 },
      "bottom-center": { bottom: themeVars.spacing.x4, left: "50%", transform: "translateX(-50%)" },
    },
  },
  defaultVariants: { position: "top-right" },
});

export const toastItem = style({
  pointerEvents: "auto",
});
