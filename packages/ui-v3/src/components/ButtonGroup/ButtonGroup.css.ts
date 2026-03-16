import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({ display: 'inline-flex', alignItems: 'stretch', borderRadius: themeVars.radius.sm, overflow: 'hidden', border: `1px solid ${semanticColorRoles.field.border}` });
export const button = recipe({
  base: {
    minHeight: '36px', padding: `0 ${themeVars.spacing.x4}`, border: 'none', borderRight: `1px solid ${semanticColorRoles.field.border}`, background: semanticColorRoles.surface.canvas, color: semanticColorRoles.text.primary, fontFamily: themeVars.font.family, fontSize: themeVars.font.sizeSm, cursor: 'pointer',
    selectors: { '&:last-child': { borderRight: 'none' }, '&:hover:not(:disabled)': { background: semanticColorRoles.surface.subtle }, '&:focus-visible': { outline: 'none', boxShadow: themeVars.shadow.focus, position: 'relative', zIndex: 1 }, '&:disabled': { color: semanticColorRoles.text.disabled, cursor: 'not-allowed' } }
  },
  variants: { active: { true: { background: semanticColorRoles.button.solid.primary.background, color: semanticColorRoles.button.solid.primary.text }, false: {} }, size: { sm: { minHeight: '30px', padding: `0 ${themeVars.spacing.x3}` }, md: {}, lg: { minHeight: '42px', padding: `0 ${themeVars.spacing.x5}`, fontSize: themeVars.font.sizeMd } } },
  defaultVariants: { active: false, size: 'md' }
});
