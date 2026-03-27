import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

/* ─── wrapper (anchor) ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
});

/* ─── popover container ─── */
export const popover = recipe({
  base: {
    position: "absolute",
    zIndex: 1100,
    display: "flex",
    alignItems: "center",
  },
  variants: {
    placement: {
      top: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column",
        marginBottom: 6,
      },
      bottom: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column-reverse",
        marginTop: 6,
      },
      left: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row",
        marginRight: 6,
      },
      right: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row-reverse",
        marginLeft: 6,
      },
    },
  },
  defaultVariants: { placement: "bottom" },
});

/* ─── card (white box) ─── */
export const card = style({
  animation: `${fadeIn} 150ms ease`,
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.md,
  border: `1px solid ${grayPalette[200]}`,
  boxShadow: themeVars.shadow.raised,
  overflow: "hidden",
  width: 276,
  display: "flex",
  flexDirection: "column",
});

/* ─── header bar (accent blue) ─── */
export const header = style({
  backgroundColor: semanticColorRoles.action.primary.default,
  padding: `${themeVars.spacing.x2} ${themeVars.spacing.x4}`,
  minHeight: 38,
  display: "flex",
  alignItems: "center",
});

export const headerTitle = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeLg,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "24px",
  color: semanticColorRoles.text.inverse,
});

/* ─── body ─── */
export const body = style({
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
});

export const bodyText = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightRegular,
  lineHeight: "21px",
  color: semanticColorRoles.text.secondary,
});

/* ─── footer (buttons) ─── */
export const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: themeVars.spacing.x2,
  padding: `0 ${themeVars.spacing.x4} ${themeVars.spacing.x3}`,
});

export const primaryBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `6px ${themeVars.spacing.x4}`,
  height: 29,
  backgroundColor: semanticColorRoles.action.primary.default,
  borderRadius: themeVars.radius.sm,
  border: "none",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.inverse,
  cursor: "pointer",
  transition: "opacity 150ms ease",
  selectors: {
    "&:hover": { opacity: 0.9 },
  },
});

export const outlineBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `6px ${themeVars.spacing.x4}`,
  height: 29,
  backgroundColor: "transparent",
  borderRadius: themeVars.radius.sm,
  border: `1px solid ${semanticColorRoles.action.primary.default}`,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.action.primary.default,
  cursor: "pointer",
  transition: "background-color 150ms ease",
  selectors: {
    "&:hover": { backgroundColor: "rgba(33, 81, 236, 0.06)" },
  },
});

/* ─── arrow ─── */
const arrowBase = style({
  width: 0,
  height: 0,
  flexShrink: 0,
});

export const arrow = recipe({
  base: [arrowBase],
  variants: {
    placement: {
      top: {
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderTop: "7px solid rgb(53, 56, 60)",
      },
      bottom: {
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderBottom: "7px solid rgb(53, 56, 60)",
      },
      left: {
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
        borderLeft: "7px solid rgb(53, 56, 60)",
      },
      right: {
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
        borderRight: "7px solid rgb(53, 56, 60)",
      },
    },
  },
  defaultVariants: { placement: "bottom" },
});
