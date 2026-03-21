import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, opacityPalette } from "@lds/tokens";

/* ─── single calendar container ─── */
export const container = style({
  display: "inline-flex",
  flexDirection: "column",
  backgroundColor: semanticColorRoles.surface.canvas,
  border: `1px solid ${semanticColorRoles.border.subtle}`,
  borderRadius: themeVars.radius.sm,
  fontFamily: themeVars.font.family,
  overflow: "hidden",
  userSelect: "none",
});

/* ─── calendar panel (shared by single & range) ─── */
export const calendarPanel = style({
  display: "flex",
  flexDirection: "column",
  width: 266,
});

/* ─── header ─── */
export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
});

export const headerTitle = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.heading,
  lineHeight: "23px",
});

export const navButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  border: "none",
  background: "none",
  cursor: "pointer",
  color: grayPalette[500],
  padding: 0,
  borderRadius: themeVars.radius.sm,
  transition: "color 150ms ease",
  ":hover": {
    color: grayPalette[700],
  },
});

export const navPlaceholder = style({
  width: 20,
  height: 20,
});

/* ─── weekday labels ─── */
export const weekdays = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  padding: `0 ${themeVars.spacing.x2}`,
});

export const weekdayLabel = style({
  fontSize: "13px",
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.primary,
  textAlign: "center",
  lineHeight: "18px",
  padding: `${themeVars.spacing.x1} 0`,
});

/* ─── divider ─── */
export const divider = style({
  height: 1,
  backgroundColor: grayPalette[200],
});

/* ─── date grid ─── */
export const dateGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  padding: `${themeVars.spacing.x1} ${themeVars.spacing.x2}`,
  rowGap: 2,
});

/* ─── date cell (wrapper for positioning range bg) ─── */
export const dateCell = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  height: 36,
});

/* ─── date button ─── */
export const dateButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid transparent",
    background: "none",
    cursor: "pointer",
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightRegular,
    lineHeight: "21px",
    fontFamily: themeVars.font.family,
    transition:
      "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
    position: "relative",
    zIndex: 1,
    padding: 0,
    outline: "none",
    boxSizing: "border-box",
  },
  variants: {
    state: {
      default: {
        color: grayPalette[800],
        ":hover": {
          backgroundColor: opacityPalette.light,
          borderColor: grayPalette[400],
        },
        ":focus-visible": {
          borderColor: semanticColorRoles.border.focus,
        },
      },
      today: {
        color: semanticColorRoles.action.primary.default,
        fontWeight: themeVars.font.weightBold,
        ":hover": {
          backgroundColor: opacityPalette.light,
          borderColor: grayPalette[400],
        },
        ":focus-visible": {
          borderColor: semanticColorRoles.border.focus,
        },
      },
      selected: {
        backgroundColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
        ":hover": {
          backgroundColor: semanticColorRoles.action.primary.active,
        },
      },
      disabled: {
        color: semanticColorRoles.text.disabled,
        cursor: "not-allowed",
      },
      outside: {
        color: grayPalette[300],
        cursor: "default",
      },
      rangeStart: {
        backgroundColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
      },
      rangeEnd: {
        backgroundColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
      },
      inRange: {
        color: semanticColorRoles.action.primary.default,
        ":hover": {
          backgroundColor: opacityPalette.light,
          borderColor: grayPalette[400],
        },
      },
    },
  },
  defaultVariants: { state: "default" },
});

/* ─── range background strip (behind circle) ─── */
export const rangeBg = recipe({
  base: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  variants: {
    position: {
      start: {
        left: "50%",
        backgroundColor: semanticColorRoles.action.primary.subtle,
      },
      middle: {
        backgroundColor: semanticColorRoles.action.primary.subtle,
      },
      end: {
        right: "50%",
        backgroundColor: semanticColorRoles.action.primary.subtle,
      },
      none: {},
    },
  },
  defaultVariants: { position: "none" },
});

/* ─── time picker ─── */
export const timeRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: themeVars.spacing.x1,
  padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`,
});

export const timeInput = style({
  width: 80,
  height: 36,
  border: `1px solid ${semanticColorRoles.border.subtle}`,
  borderRadius: themeVars.radius.sm,
  textAlign: "center",
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightRegular,
  color: grayPalette[800],
  fontFamily: themeVars.font.family,
  outline: "none",
  boxSizing: "border-box",
  ":focus": {
    borderColor: semanticColorRoles.border.focus,
  },
});

export const timeSeparator = style({
  fontSize: themeVars.font.sizeMd,
  color: grayPalette[800],
  fontWeight: themeVars.font.weightMedium,
});

export const amPmToggle = style({
  minWidth: 48,
  height: 36,
  border: `1px solid ${semanticColorRoles.border.subtle}`,
  borderRadius: themeVars.radius.sm,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  fontFamily: themeVars.font.family,
  cursor: "pointer",
  backgroundColor: semanticColorRoles.surface.canvas,
  color: grayPalette[800],
  boxSizing: "border-box",
  padding: `0 ${themeVars.spacing.x2}`,
  transition: "border-color 150ms ease",
  ":hover": {
    borderColor: grayPalette[500],
  },
});

/* ─── range picker wrapper (dual calendar) ─── */
export const rangeContainer = style({
  display: "inline-flex",
  backgroundColor: semanticColorRoles.surface.canvas,
  border: `1px solid ${semanticColorRoles.border.subtle}`,
  borderRadius: themeVars.radius.lg,
  fontFamily: themeVars.font.family,
  overflow: "hidden",
  userSelect: "none",
});

export const verticalDivider = style({
  width: 1,
  backgroundColor: grayPalette[400],
  alignSelf: "stretch",
});
