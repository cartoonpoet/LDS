import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({ width: 280, display: "flex", flexDirection: "column", gap: themeVars.spacing.x1, padding: themeVars.spacing.x3, borderRight: `1px solid ${semanticColorRoles.border.subtle}`, backgroundColor: semanticColorRoles.surface.canvas });
export const group = style({ display: "flex", flexDirection: "column", gap: themeVars.spacing.x1 });
export const trigger = style({ display: "flex", alignItems: "center", justifyContent: "space-between", gap: themeVars.spacing.x2, padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`, border: 0, background: "transparent", borderRadius: themeVars.radius.sm, cursor: "pointer", textAlign: "left", selectors: { '&:hover': { backgroundColor: semanticColorRoles.surface.subtle } } });
export const childList = style({ display: "flex", flexDirection: "column", gap: themeVars.spacing.x1, paddingLeft: themeVars.spacing.x3 });
export const child = style({ padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`, borderRadius: themeVars.radius.sm, color: semanticColorRoles.text.secondary, selectors: { '&[data-active="true"]': { backgroundColor: semanticColorRoles.action.primary.subtle, color: semanticColorRoles.text.primary } } });
