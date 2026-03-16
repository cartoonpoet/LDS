import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x4,
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x5}`,
  backgroundColor: semanticColorRoles.surface.raised,
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`
});

export const brand = style({ fontSize: themeVars.font.sizeLg, fontWeight: themeVars.font.weightBold, color: semanticColorRoles.text.heading });
export const nav = style({ display: "flex", alignItems: "center", gap: themeVars.spacing.x2 });
export const item = style({ padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`, borderRadius: themeVars.radius.sm, border: 0, background: "transparent", cursor: "pointer", color: semanticColorRoles.text.secondary, selectors: { '&[data-active="true"]': { backgroundColor: semanticColorRoles.action.primary.subtle, color: semanticColorRoles.text.primary }, '&:hover': { backgroundColor: semanticColorRoles.surface.subtle } } });
export const actions = style({ display: "flex", alignItems: "center", gap: themeVars.spacing.x2 });
