import { globalStyle, style } from "@vanilla-extract/css";
import { semanticColorRoles, textStyles, themeVars } from "@lds/tokens";

/* ─── root bar ─── */
export const root = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x5,
  height: 62,
  padding: `0 ${themeVars.spacing.x6}`,
  boxSizing: "border-box",
  fontFamily: themeVars.font.family,
  background: semanticColorRoles.surface.canvas,
  boxShadow: themeVars.shadow.raised,
});

export const start = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flex: 1,
  minWidth: 0,
});

export const end = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexShrink: 0,
});

/* ─── icon button ─── */
export const iconButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 28,
  height: 28,
  padding: 0,
  border: "none",
  borderRadius: themeVars.radius.sm,
  background: "transparent",
  color: semanticColorRoles.text.primary,
  cursor: "pointer",
  transition: `color ${themeVars.duration.base} ${themeVars.easing.standard}`,
  selectors: {
    "&:hover": { color: semanticColorRoles.action.primary.default },
    "&:focus-visible": {
      outline: "none",
      boxShadow: themeVars.shadow.focus,
    },
  },
});

globalStyle(`${iconButton} > svg`, { width: 20, height: 20 });

/* ─── divider ─── */
export const divider = style({
  flexShrink: 0,
  width: 1,
  height: 28,
  marginInline: themeVars.spacing.x2,
  background: semanticColorRoles.border.subtle,
});

/* ─── profile ─── */
export const profile = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x3,
  marginLeft: themeVars.spacing.x2,
  padding: 0,
  border: "none",
  borderRadius: themeVars.radius.sm,
  background: "transparent",
  color: "inherit",
  font: "inherit",
  textAlign: "right",
  selectors: {
    "button&": { cursor: "pointer" },
    "&:focus-visible": {
      outline: "none",
      boxShadow: themeVars.shadow.focus,
    },
  },
});

export const profileText = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  minWidth: 0,
});

export const profileName = style({
  ...textStyles.bodyParagraph.semibold,
  fontFamily: themeVars.font.family,
  color: semanticColorRoles.text.heading,
  whiteSpace: "nowrap",
});

export const profileDescription = style({
  ...textStyles.bodyParagraph.small,
  fontFamily: themeVars.font.family,
  color: semanticColorRoles.text.primary,
  whiteSpace: "nowrap",
});

/* compact 프로필의 이름 — 화면에선 숨기고 스크린리더에만 */
export const srOnly = style({
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
});
