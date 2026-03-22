import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  semanticColorRoles,
  themeVars,
  grayPalette,
  opacityPalette,
  greenPalette,
  redPalette,
  yellowPalette,
} from "@lds/tokens";

/* ═══════════════════════════════════════════
   Widget (card container)
   ═══════════════════════════════════════════ */

export const widget = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: semanticColorRoles.surface.canvas,
  border: `1px solid ${semanticColorRoles.border.subtle}`,
  borderRadius: themeVars.radius.md,
  boxShadow: themeVars.shadow.raised,
  fontFamily: themeVars.font.family,
  overflow: "hidden",
});

/* ─── header ─── */
export const widgetHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0 ${themeVars.spacing.x5}`,
  height: 64,
  flexShrink: 0,
});

export const headerLeft = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
});

export const headerTitle = style({
  fontSize: "18px",
  fontWeight: themeVars.font.weightBold,
  lineHeight: "25px",
  color: semanticColorRoles.text.heading,
});

export const headerBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 20,
  height: 20,
  padding: "0 6px",
  borderRadius: 17,
  backgroundColor: semanticColorRoles.action.primary.default,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "18px",
  color: semanticColorRoles.text.inverse,
});

export const collapseButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  border: "none",
  background: "none",
  cursor: "pointer",
  color: grayPalette[500],
  padding: 0,
  transition: "transform 200ms ease, color 150ms ease",
  ":hover": {
    color: grayPalette[700],
  },
});

export const collapseButtonOpen = style({
  transform: "rotate(180deg)",
});

/* ─── divider ─── */
export const divider = style({
  height: 1,
  backgroundColor: semanticColorRoles.border.subtle,
  flexShrink: 0,
});

/* ─── body ─── */
export const widgetBody = style({
  padding: themeVars.spacing.x5,
});

export const widgetBodyFlush = style({
  padding: 0,
});

/* ═══════════════════════════════════════════
   StatCell
   ═══════════════════════════════════════════ */

export const statCell = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: themeVars.spacing.x2,
    padding: themeVars.spacing.x3,
    borderRadius: themeVars.radius.sm,
    backgroundColor: `rgba(158, 167, 184, 0.03)`,
    fontFamily: themeVars.font.family,
    flex: 1,
    minWidth: 0,
  },
  variants: {
    active: {
      true: {
        backgroundColor: `rgba(33, 81, 236, 0.03)`,
        border: `1px solid ${semanticColorRoles.action.primary.subtle}`,
      },
      false: {},
    },
  },
  defaultVariants: { active: false },
});

export const statLabel = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "18px",
  color: grayPalette[600],
});

export const statValue = recipe({
  base: {
    fontSize: "24px",
    fontWeight: themeVars.font.weightBold,
    lineHeight: "29px",
  },
  variants: {
    color: {
      primary: { color: semanticColorRoles.action.primary.default },
      heading: { color: semanticColorRoles.text.heading },
      success: { color: greenPalette[500] },
      danger: { color: redPalette[500] },
      warning: { color: yellowPalette[500] },
    },
  },
  defaultVariants: { color: "primary" },
});

/* ═══════════════════════════════════════════
   StatGrid (cells container)
   ═══════════════════════════════════════════ */

export const statGrid = style({
  display: "flex",
  gap: themeVars.spacing.x3,
});

/* ═══════════════════════════════════════════
   QuickMenuItem
   ═══════════════════════════════════════════ */

export const quickMenu = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  padding: themeVars.spacing.x3,
  borderRadius: themeVars.radius.md,
  cursor: "pointer",
  transition: "background-color 150ms ease",
  textDecoration: "none",
  ":hover": {
    backgroundColor: opacityPalette.light,
  },
});

export const quickMenuIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: `linear-gradient(135deg, #2151ec, #6f8ef3)`,
  color: semanticColorRoles.text.inverse,
  flexShrink: 0,
});

export const quickMenuLabel = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.heading,
  textAlign: "center",
  whiteSpace: "nowrap",
});

/* ═══════════════════════════════════════════
   ScheduleItem
   ═══════════════════════════════════════════ */

export const scheduleItem = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x2,
  padding: themeVars.spacing.x5,
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.md,
  border: `1px solid ${semanticColorRoles.border.subtle}`,
});

export const scheduleTop = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
});

export const scheduleDate = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "18px",
  color: semanticColorRoles.text.heading,
});

export const scheduleTitle = style({
  fontSize: "18px",
  fontWeight: themeVars.font.weightBold,
  lineHeight: "25px",
  color: semanticColorRoles.text.heading,
});

export const scheduleBody = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: grayPalette[800],
});

/* ═══════════════════════════════════════════
   Table section (for widget tables)
   ═══════════════════════════════════════════ */

export const tableHeader = style({
  display: "flex",
  alignItems: "center",
  height: 38,
  backgroundColor: semanticColorRoles.surface.subtle,
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
  padding: `0 ${themeVars.spacing.x5}`,
  gap: themeVars.spacing.x4,
});

export const tableHeaderCell = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.heading,
  letterSpacing: "1px",
});

export const tableRow = style({
  display: "flex",
  alignItems: "center",
  height: 58,
  padding: `0 ${themeVars.spacing.x5}`,
  gap: themeVars.spacing.x4,
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

export const tableCell = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: semanticColorRoles.text.heading,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
