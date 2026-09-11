import { recipe } from "@vanilla-extract/recipes";
import { redPalette, yellowPalette, semanticColorRoles, themeVars } from "@lds/tokens";

export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    boxSizing: "border-box",
    padding: `2px ${themeVars.spacing.x2}`,
    borderRadius: themeVars.radius.sm,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightBold,
    lineHeight: 1.4,
    whiteSpace: "nowrap",
  },
  variants: {
    level: {
      dday: {
        background: themeVars.color.accentDanger,
        color: semanticColorRoles.text.inverse,
      },
      danger: {
        background: redPalette[100],
        border: `1px solid ${themeVars.color.accentDanger}`,
        color: themeVars.color.accentDangerActive,
      },
      warning: {
        background: yellowPalette[100],
        border: `1px solid ${themeVars.color.accentWarning}`,
        color: themeVars.color.accentWarningActive,
      },
      neutral: {
        background: semanticColorRoles.surface.raised,
        color: semanticColorRoles.text.secondary,
      },
      overdue: {
        background: themeVars.color.accentDark,
        color: semanticColorRoles.text.inverse,
      },
    },
  },
});
