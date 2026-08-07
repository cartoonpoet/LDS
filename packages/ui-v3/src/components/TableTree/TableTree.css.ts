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
  backgroundColor: semanticColorRoles.surface.tableHeader,
});

export const th = style({
  height: 42,
  padding: `0 ${themeVars.spacing.x4}`,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "42px",
  color: semanticColorRoles.text.heading,
  textAlign: "left",
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
  whiteSpace: "nowrap",
  userSelect: "none",
});

export const thBordered = style({
  borderRight: `1px solid ${grayPalette[200]}`,
  selectors: {
    "&:last-child": {
      borderRight: "none",
    },
  },
});

/* ─── tbody rows ─── */
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
    '&[data-selected="true"]': {
      backgroundColor: semanticColorRoles.action.primary.subtle,
    },
  },
});

export const trClickable = style({
  cursor: "pointer",
});

export const td = style({
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "21px",
  color: semanticColorRoles.text.primary,
  verticalAlign: "middle",
});

export const tdBordered = style({
  borderRight: `1px solid ${grayPalette[200]}`,
  selectors: {
    "&:last-child": {
      borderRight: "none",
    },
  },
});

/* ─── first column (indent + toggle) ─── */
export const firstCell = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
  minWidth: 0,
});

export const firstCellContent = style({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const toggleButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18,
  height: 18,
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  borderRadius: themeVars.radius.sm,
  cursor: "pointer",
  color: grayPalette[500],
  flexShrink: 0,
  transition: "background-color 150ms ease, color 150ms ease",
  selectors: {
    "&:hover": {
      backgroundColor: semanticColorRoles.action.primary.subtle,
      color: semanticColorRoles.action.primary.default,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: themeVars.shadow.focus,
    },
  },
});

export const toggleSpacer = style({
  display: "inline-block",
  width: 18,
  height: 18,
  flexShrink: 0,
});

export const caret = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 150ms ease",
  },
  variants: {
    expanded: {
      true: {},
      false: { transform: "rotate(-90deg)" },
    },
  },
  defaultVariants: { expanded: false },
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
