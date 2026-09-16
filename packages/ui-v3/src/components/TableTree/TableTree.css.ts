import { style, keyframes } from "@vanilla-extract/css";
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
  transition: `background-color ${themeVars.duration.base} ${themeVars.easing.standard}`,
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

/* ─── 자식 행 — 펼침 시 fade-in (실제 <tr>이라 grid-template-rows 높이
   트릭은 쓸 수 없어 진입 fade로 대체) ─── */
const rowFadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const trChild = style([
  tr,
  {
    animation: `${rowFadeIn} ${themeVars.duration.slow} ${themeVars.easing.standard}`,
  },
]);

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
  transition: `background-color ${themeVars.duration.base} ${themeVars.easing.standard}, color ${themeVars.duration.base} ${themeVars.easing.standard}`,
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
    transition: `transform ${themeVars.duration.base} ${themeVars.easing.standard}`,
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
