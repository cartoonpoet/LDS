import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, opacityPalette } from "@lds/tokens";

/* ─── ProgressBar ─── */

export const progressTrack = style({
  position: "relative",
  width: "100%",
  height: 12,
  backgroundColor: opacityPalette.primary,
  borderRadius: 7,
  overflow: "hidden",
  display: "flex",
});

export const progressBar = recipe({
  base: {
    height: "100%",
    borderRadius: 7,
    transition: "width 300ms ease",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    color: {
      primary: { backgroundColor: semanticColorRoles.action.primary.default },
      success: { backgroundColor: "#28c76f" },
      danger: { backgroundColor: "#ea5455" },
      warning: { backgroundColor: "#f0af23" },
      info: { backgroundColor: "#00cfe8" },
    },
    striped: {
      true: {
        backgroundImage:
          "linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)",
        backgroundSize: "12px 12px",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    striped: false,
  },
});

const stripeMove = keyframes({
  "0%": { backgroundPosition: "0 0" },
  "100%": { backgroundPosition: "12px 0" },
});

export const animated = style({
  animation: `${stripeMove} 1s linear infinite`,
});

export const progressValue = style({
  position: "absolute",
  right: 4,
  fontSize: "12px",
  fontWeight: 400,
  fontFamily: themeVars.font.family,
  color: semanticColorRoles.text.inverse,
  lineHeight: 1,
  whiteSpace: "nowrap",
});

/* ─── StepBar ─── */

export const stepBarRoot = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  fontFamily: themeVars.font.family,
});

export const stepItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
});

export const stepIcon = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    borderRadius: themeVars.radius.md,
    flexShrink: 0,
  },
  variants: {
    status: {
      completed: {
        backgroundColor: opacityPalette.primary,
        color: semanticColorRoles.action.primary.default,
      },
      active: {
        backgroundColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
      },
      scheduled: {
        backgroundColor: opacityPalette.light,
        color: grayPalette[500],
      },
    },
  },
  defaultVariants: {
    status: "scheduled",
  },
});

export const stepLabel = recipe({
  base: {
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1.21,
    whiteSpace: "nowrap",
  },
  variants: {
    status: {
      completed: { color: grayPalette[800] },
      active: { color: grayPalette[800] },
      scheduled: { color: grayPalette[300] },
    },
  },
  defaultVariants: {
    status: "scheduled",
  },
});

export const stepArrow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  color: grayPalette[800],
  flexShrink: 0,
});
