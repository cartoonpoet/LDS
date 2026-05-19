import { style, createVar, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  semanticColorRoles,
  themeVars,
  grayPalette,
  greenPalette,
  yellowPalette,
  redPalette,
  opacityPalette,
} from "@lds/tokens";

/* ─── react-toastify 카운트다운 바 색상 CSS 변수 ─── */
export const progressColorVar = createVar();

// react-toastify가 사용하는 기본 progress bar 배경을 CSS 변수로 오버라이드
globalStyle(".Toastify__progress-bar-theme--light, .Toastify__progress-bar-theme--dark", {
  background: progressColorVar,
});

/* ─── root ─── */
export const root = style({
  width: 380,
  borderRadius: themeVars.radius.sm,
  backgroundColor: semanticColorRoles.surface.canvas,
  overflow: "hidden",
  fontFamily: themeVars.font.family,
  pointerEvents: "auto",
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

/* ─── manual progress bar ─── */
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

/* ─── react-toastify wrapper override (intent별 카운트다운 바 색상 포함) ─── */
export const toastOverride = recipe({
  base: {
    padding: 0,
    margin: 0,
    minHeight: "unset",
    borderRadius: themeVars.radius.sm,
    boxShadow: themeVars.shadow.raised,
    backgroundColor: "transparent",
    cursor: "default",
  },
  variants: {
    intent: {
      info: { vars: { [progressColorVar]: semanticColorRoles.action.primary.default } },
      success: { vars: { [progressColorVar]: greenPalette[400] } },
      warning: { vars: { [progressColorVar]: yellowPalette[400] } },
      error: { vars: { [progressColorVar]: redPalette[400] } },
    },
  },
  defaultVariants: { intent: "info" },
});
