import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── wrapper ─── */
export const wrapper = style({
  width: "100%",
  overflow: "auto",
  fontFamily: themeVars.font.family,
});

/* ─── table ─── */
export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  borderSpacing: 0,
  backgroundColor: semanticColorRoles.surface.canvas,
  border: `1px solid ${semanticColorRoles.border.subtle}`,
});

/* ─── thead ─── */
export const thead = style({
  backgroundColor: semanticColorRoles.surface.subtle,
});

export const th = style({
  height: 42,
  padding: `0 ${themeVars.spacing.x6}`,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "42px",
  color: semanticColorRoles.text.heading,
  letterSpacing: "1px",
  textAlign: "left",
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
  whiteSpace: "nowrap",
  userSelect: "none",
});

export const thSortable = style({
  cursor: "pointer",
  transition: "background-color 150ms ease",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
});

export const thInner = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
});

export const sortIcon = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    color: grayPalette[500],
    transition: "transform 200ms ease, opacity 200ms ease",
    opacity: 0.4,
  },
  variants: {
    active: {
      true: { opacity: 1, color: semanticColorRoles.action.primary.default },
      false: {},
    },
    direction: {
      asc: { transform: "rotate(180deg)" },
      desc: {},
    },
  },
  defaultVariants: { active: false, direction: "desc" },
});

/* ─── tbody ─── */
export const tbody = style({});

export const tr = style({
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
  transition: "background-color 150ms ease",
  ":hover": {
    backgroundColor: semanticColorRoles.action.primary.subtle,
  },
  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

export const trSelected = style({
  backgroundColor: semanticColorRoles.action.primary.subtle,
});

export const td = style({
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x6}`,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "21px",
  color: semanticColorRoles.text.primary,
  verticalAlign: "middle",
});

/* ─── bordered variant ─── */
export const tableBordered = style({});

export const tdBordered = style({
  borderRight: `1px solid ${grayPalette[200]}`,
  selectors: {
    "&:last-child": {
      borderRight: "none",
    },
  },
});

export const thBordered = style({
  borderRight: `1px solid ${grayPalette[200]}`,
  selectors: {
    "&:last-child": {
      borderRight: "none",
    },
  },
});

/* ─── checkbox cell ─── */
export const checkboxCell = style({
  width: 62,
  textAlign: "center",
  verticalAlign: "middle",
  padding: `0 ${themeVars.spacing.x5}`,
});

export const checkbox = style({
  width: 18,
  height: 18,
  cursor: "pointer",
  accentColor: semanticColorRoles.action.primary.default,
});

/* ─── empty state ─── */
export const emptyRow = style({
  height: 200,
});

export const emptyCell = style({
  textAlign: "center",
  padding: `${themeVars.spacing.x6} ${themeVars.spacing.x6}`,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  color: grayPalette[500],
});
