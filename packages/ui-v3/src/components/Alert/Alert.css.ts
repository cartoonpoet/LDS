import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, opacityPalette } from "@lds/tokens";

/* ─── type → background color mapping (from Zeplin) ─── */
const typeBackgrounds = {
  info: opacityPalette.info,
  confirm: opacityPalette.secondary,
  secret: opacityPalette.info,
  saveTemporarily: opacityPalette.secondary,
} as const;

const typeIconColors = {
  info: semanticColorRoles.status.info.text,
  confirm: semanticColorRoles.text.tertiary,
  secret: semanticColorRoles.status.info.text,
  saveTemporarily: semanticColorRoles.text.tertiary,
} as const;

/* ─── root container ─── */
export const root = recipe({
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: themeVars.spacing.x2,
    padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`,
    borderRadius: themeVars.radius.md,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    lineHeight: 1.5,
    color: semanticColorRoles.text.primary,
    transition: "background-color 150ms ease",
  },
  variants: {
    type: {
      info: { backgroundColor: typeBackgrounds.info },
      confirm: { backgroundColor: typeBackgrounds.confirm },
      secret: { backgroundColor: typeBackgrounds.secret },
      saveTemporarily: { backgroundColor: typeBackgrounds.saveTemporarily },
    },
    size: {
      small: {
        fontSize: themeVars.font.sizeSm,
        padding: `${themeVars.spacing.x1} ${themeVars.spacing.x2}`,
        gap: themeVars.spacing.x1,
      },
      medium: {},
    },
  },
  defaultVariants: {
    type: "info",
    size: "medium",
  },
});

/* ─── icon wrapper ─── */
export const iconWrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  variants: {
    size: {
      small: { width: 16, height: 16 },
      medium: { width: 20, height: 20 },
    },
  },
  defaultVariants: { size: "medium" },
});

export const iconColor = styleVariants(typeIconColors, (color) => ({
  color,
}));

/* ─── content area ─── */
export const content = style({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x1,
});

export const title = style({
  fontWeight: themeVars.font.weightBold,
  lineHeight: 1.4,
});

export const description = style({
  lineHeight: 1.5,
  color: semanticColorRoles.text.primary,
});

/* ─── action area (buttons) ─── */
export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexShrink: 0,
});

export const actionButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${themeVars.spacing.x1} ${themeVars.spacing.x3}`,
    borderRadius: themeVars.radius.sm,
    border: "none",
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightMedium,
    color: semanticColorRoles.text.inverse,
    lineHeight: 1.4,
    transition: "opacity 150ms ease",
    selectors: {
      "&:hover": { opacity: 0.85 },
      "&:active": { opacity: 0.7 },
    },
  },
  variants: {
    intent: {
      primary: { backgroundColor: semanticColorRoles.action.primary.default },
      warning: { backgroundColor: semanticColorRoles.status.warning.border },
      danger: { backgroundColor: semanticColorRoles.status.danger.border },
      secondary: { backgroundColor: semanticColorRoles.action.secondary.default },
    },
  },
  defaultVariants: { intent: "primary" },
});

/* ─── close button ─── */
export const closeButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 20,
  height: 20,
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
  color: semanticColorRoles.text.tertiary,
  borderRadius: themeVars.radius.sm,
  transition: "color 150ms ease, background-color 150ms ease",
  selectors: {
    "&:hover": {
      color: semanticColorRoles.text.primary,
      backgroundColor: "rgba(0,0,0,0.06)",
    },
  },
});

/* ─── text button (link style) ─── */
export const textButton = style({
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.action.primary.default,
  textDecoration: "underline",
  selectors: {
    "&:hover": { color: semanticColorRoles.action.primary.active },
  },
});
