import { globalStyle, style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  border: `1px solid ${semanticColorRoles.border.default}`,
  borderRadius: themeVars.radius.md,
  overflow: "hidden",
  backgroundColor: semanticColorRoles.surface.canvas
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.primary
});

export const headerCell = style({
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
  backgroundColor: semanticColorRoles.surface.subtle,
  color: semanticColorRoles.text.secondary,
  textAlign: "left",
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`
});

export const row = style({});
globalStyle(`${row}:hover td`, { backgroundColor: semanticColorRoles.surface.subtle });

export const cell = style({
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
  verticalAlign: "middle"
});

export const primaryCell = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  minHeight: 20
});

export const expander = style({
  width: 16,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: semanticColorRoles.text.secondary,
  background: "transparent",
  border: 0,
  padding: 0,
  cursor: "pointer"
});
