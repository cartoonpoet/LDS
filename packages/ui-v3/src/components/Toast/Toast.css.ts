import { style } from "@vanilla-extract/css";
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

/* ─── react-toastify wrapper override ─── */
// react-toastify가 생성하는 wrapper div의 기본 스타일을 무력화
export const toastOverride = style({
  padding: 0,
  margin: 0,
  minHeight: "unset",
  borderRadius: themeVars.radius.sm,
  boxShadow: themeVars.shadow.raised,
  backgroundColor: "transparent",
  cursor: "default",
});

/* ─── react-toastify countdown progress bar ─── */
// autoClose 카운트다운 바를 LDS 색상으로 오버라이드
export const progressBar = recipe({
  base: {
    height: 4,
    opacity: 1,
  },
  variants: {
    intent: {
      info: { background: semanticColorRoles.action.primary.default },
      success: { background: greenPalette[400] },
      warning: { background: yellowPalette[400] },
      error: { background: redPalette[400] },
    },
  },
  defaultVariants: { intent: "info" },
});
