import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const stack = style({ display: 'grid', gap: themeVars.spacing.x1, width: '100%' });
export const inline = style({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: themeVars.spacing.x2, width: '100%' });
export const label = style({ color: semanticColorRoles.field.label, fontFamily: themeVars.font.family, fontSize: themeVars.font.sizeSm, fontWeight: themeVars.font.weightMedium, lineHeight: 1.4 });
export const requiredMark = style({ color: semanticColorRoles.status.danger.text, marginLeft: themeVars.spacing.x1 });
export const input = recipe({
  base: {
    width: '100%', minHeight: '38px', padding: `0 ${themeVars.spacing.x3}`,
    borderRadius: themeVars.radius.sm, border: `1px solid ${semanticColorRoles.field.border}`,
    backgroundColor: semanticColorRoles.field.background, color: semanticColorRoles.field.text,
    fontFamily: themeVars.font.family, fontSize: themeVars.font.sizeMd, lineHeight: 1.4,
    boxSizing: 'border-box',
    selectors: {
      '&:hover:not(:disabled)': { borderColor: semanticColorRoles.field.borderHover },
      '&:focus': { outline: 'none', borderColor: semanticColorRoles.field.borderFocus, boxShadow: themeVars.shadow.focus },
      '&:disabled': { backgroundColor: semanticColorRoles.field.backgroundDisabled, color: semanticColorRoles.text.disabled, cursor: 'not-allowed' }
    }
  },
  variants: {
    size: {
      sm: { minHeight: '32px', fontSize: themeVars.font.sizeSm },
      md: {},
      lg: { minHeight: '44px', fontSize: themeVars.font.sizeLg, padding: `0 ${themeVars.spacing.x4}` }
    },
    invalid: { true: { borderColor: semanticColorRoles.status.danger.border }, false: {} }
  },
  defaultVariants: { size: 'md', invalid: false }
});
export const helperText = recipe({ base: { fontFamily: themeVars.font.family, fontSize: themeVars.font.sizeSm, lineHeight: 1.4 }, variants: { tone: { neutral: { color: semanticColorRoles.field.helper }, danger: { color: semanticColorRoles.status.danger.text } } }, defaultVariants: { tone: 'neutral' } });
