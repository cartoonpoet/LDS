import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({ display: 'inline-flex', alignItems: 'center', gap: themeVars.spacing.x1, flexWrap: 'wrap' });
export const pageButton = recipe({ base: { minWidth: '32px', height: '32px', padding: `0 ${themeVars.spacing.x2}`, borderRadius: themeVars.radius.sm, border: `1px solid ${semanticColorRoles.field.border}`, background: semanticColorRoles.surface.canvas, color: semanticColorRoles.text.primary, fontFamily: themeVars.font.family, fontSize: themeVars.font.sizeSm, cursor: 'pointer', selectors: { '&:hover:not(:disabled)': { borderColor: semanticColorRoles.field.borderHover, background: semanticColorRoles.surface.subtle }, '&:focus-visible': { outline: 'none', boxShadow: themeVars.shadow.focus }, '&:disabled': { color: semanticColorRoles.text.disabled, cursor: 'not-allowed' } } }, variants: { active: { true: { background: semanticColorRoles.button.solid.primary.background, borderColor: semanticColorRoles.button.solid.primary.background, color: semanticColorRoles.button.solid.primary.text }, false: {} } }, defaultVariants: { active: false } });
export const ellipsis = style({ minWidth: '32px', textAlign: 'center', color: semanticColorRoles.text.tertiary, fontSize: themeVars.font.sizeSm });
