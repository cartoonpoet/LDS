import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

const slideIn = keyframes({
  from: { opacity: 0, transform: "translateY(-8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

/* ─── root ─── */
export const root = style({
  width: 380,
  borderRadius: themeVars.radius.sm,
  backgroundColor: semanticColorRoles.surface.canvas,
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
  overflow: "hidden",
  animation: `${slideIn} 200ms ease`,
  fontFamily: themeVars.font.family,
});

/* ─── top row (icon + title + close) ─── */
export const top = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 14px",
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
    color: "rgb(255, 255, 255)",
  },
  variants: {
    intent: {
      info: { backgroundColor: semanticColorRoles.action.primary.default },
      success: { backgroundColor: "#12B76A" },
      warning: { backgroundColor: "#F79009" },
      error: { backgroundColor: "#F04438" },
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
  gap: 8,
});

export const heading = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: 700,
  lineHeight: "23px",
  color: "rgb(17, 21, 42)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const time = style({
  fontSize: "13px",
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: "rgb(98, 111, 134)",
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
  color: "rgb(0, 0, 0)",
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
  fontSize: "13px",
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: "rgb(0, 0, 0)",
});

/* ─── progress bar ─── */
export const progressTrack = style({
  height: 5,
  backgroundColor: "rgba(33, 81, 236, 0.12)",
});

export const progressFill = recipe({
  base: {
    height: "100%",
    transition: "width 100ms linear",
  },
  variants: {
    intent: {
      info: { backgroundColor: semanticColorRoles.action.primary.default },
      success: { backgroundColor: "#12B76A" },
      warning: { backgroundColor: "#F79009" },
      error: { backgroundColor: "#F04438" },
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
    gap: 8,
    pointerEvents: "none",
  },
  variants: {
    position: {
      "top-right": { top: 16, right: 16 },
      "top-left": { top: 16, left: 16 },
      "top-center": { top: 16, left: "50%", transform: "translateX(-50%)" },
      "bottom-right": { bottom: 16, right: 16 },
      "bottom-left": { bottom: 16, left: 16 },
      "bottom-center": { bottom: 16, left: "50%", transform: "translateX(-50%)" },
    },
  },
  defaultVariants: { position: "top-right" },
});

export const toastItem = style({
  pointerEvents: "auto",
});
