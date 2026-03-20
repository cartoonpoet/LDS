import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── wrapper ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
});

/* ─── positioned container ─── */
export const container = recipe({
  base: {
    position: "absolute",
    zIndex: 1100,
    display: "flex",
    alignItems: "center",
  },
  variants: {
    placement: {
      right: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row-reverse",
        marginLeft: 6,
      },
      left: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row",
        marginRight: 6,
      },
      bottom: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column-reverse",
        marginTop: 6,
      },
      top: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column",
        marginBottom: 6,
      },
    },
  },
  defaultVariants: { placement: "right" },
});

/* ─── card ─── */
export const card = style({
  width: 400,
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.md,
  border: `1px solid ${grayPalette[200]}`,
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
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
      right: {
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
        borderRight: `8px solid ${grayPalette[200]}`,
      },
      left: {
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
        borderLeft: `8px solid ${grayPalette[200]}`,
      },
      bottom: {
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderBottom: `8px solid ${grayPalette[200]}`,
      },
      top: {
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderTop: `8px solid ${grayPalette[200]}`,
      },
    },
  },
  defaultVariants: { placement: "right" },
});

/* ─── header ─── */
export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: `${themeVars.spacing.x4} 20px`,
  gap: themeVars.spacing.x3,
});

export const headerContent = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x2,
  flex: 1,
  minWidth: 0,
});

export const headerBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `1px ${themeVars.spacing.x2}`,
  height: 20,
  borderRadius: 17,
  backgroundColor: "rgba(33, 81, 236, 0.12)",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.action.primary.default,
  alignSelf: "flex-start",
});

export const headerTitle = style({
  fontFamily: themeVars.font.family,
  fontSize: "18px",
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "22px",
  color: "rgb(17, 21, 42)",
});

export const closeBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: "rgb(0, 0, 0)",
  flexShrink: 0,
});

/* ─── divider ─── */
export const divider = style({
  height: 1,
  backgroundColor: "rgb(235, 233, 241)",
  margin: `0 1px`,
});

/* ─── badges row ─── */
export const badgesRow = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: themeVars.spacing.x1,
  padding: `${themeVars.spacing.x3} 20px`,
});

/* ─── list group ─── */
export const listGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x2,
  padding: `${themeVars.spacing.x3} 20px`,
});

export const listItem = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
});

export const listLabel = style({
  width: 80,
  flexShrink: 0,
  fontFamily: themeVars.font.family,
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: "18px",
  color: "rgb(158, 167, 184)",
});

export const listValue = style({
  fontFamily: themeVars.font.family,
  fontSize: "13px",
  fontWeight: themeVars.font.weightRegular,
  lineHeight: "18px",
  color: "rgb(0, 0, 0)",
  flex: 1,
  minWidth: 0,
});

/* ─── footer ─── */
export const footer = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  padding: `${themeVars.spacing.x4} 20px`,
});

export const primaryBtn = style({
  flex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 38,
  padding: `0 ${themeVars.spacing.x4}`,
  backgroundColor: semanticColorRoles.action.primary.default,
  borderRadius: themeVars.radius.sm,
  border: "none",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  color: "rgb(255, 255, 255)",
  cursor: "pointer",
  transition: "opacity 150ms ease",
  selectors: {
    "&:hover": { opacity: 0.9 },
  },
});

export const outlineBtn = style({
  flex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 38,
  padding: `0 ${themeVars.spacing.x4}`,
  backgroundColor: "transparent",
  borderRadius: themeVars.radius.sm,
  border: `1px solid ${semanticColorRoles.action.primary.default}`,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.action.primary.default,
  cursor: "pointer",
  transition: "background-color 150ms ease",
  selectors: {
    "&:hover": { backgroundColor: "rgba(33, 81, 236, 0.06)" },
  },
});
