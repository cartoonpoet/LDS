import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, opacityPalette, greenPalette, redPalette, yellowPalette, cyanPalette, defaultDurationTokens } from "@lds/tokens";

/* ─── presence timing (index.tsx의 unmount 지연과 동일) ─── */
export const EXIT_MS = parseInt(defaultDurationTokens.base, 10);

/* ─── overlay (backdrop) ─── */
const overlayFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const overlay = recipe({
  base: {
    position: "fixed",
    inset: 0,
    zIndex: 9000,
    backgroundColor: semanticColorRoles.surface.backdrop,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: themeVars.spacing.x4,
    animation: `${overlayFadeIn} ${themeVars.duration.base} ${themeVars.easing.standard}`,
    transition: `opacity ${themeVars.duration.base} ${themeVars.easing.standard}`,
  },
  variants: {
    closing: {
      true: { opacity: 0 },
      false: {},
    },
  },
  defaultVariants: { closing: false },
});

/* ─── card ─── */
const cardIn = keyframes({
  from: { opacity: 0, transform: "scale(0.96)" },
  to: { opacity: 1, transform: "scale(1)" },
});

export const card = recipe({
  base: {
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
    animation: `${cardIn} ${themeVars.duration.base} ${themeVars.easing.standard}`,
    transition: `transform ${themeVars.duration.base} ${themeVars.easing.standard}, opacity ${themeVars.duration.base} ${themeVars.easing.standard}`,
  },
  variants: {
    closing: {
      true: { opacity: 0, transform: "scale(0.96)" },
      false: {},
    },
  },
  defaultVariants: { closing: false },
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
      warning: { color: yellowPalette[400] },
      success: { color: greenPalette[400] },
      danger: { color: redPalette[400] },
      info: { color: cyanPalette[400] },
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
