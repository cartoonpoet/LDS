import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "24px",
    padding: `0 ${themeVars.spacing.x2}`,
    borderRadius: "999px",
    border: "1px solid transparent",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1
  },
  variants: {
    tone: {
      neutral: {},
      primary: {},
      success: {},
      warning: {},
      danger: {},
      info: {}
    },
    variant: {
      soft: {},
      solid: {},
      outline: {}
    }
  },
  compoundVariants: [
    { variants: { tone: "neutral", variant: "soft" }, style: { backgroundColor: themeVars.color.neutralSurfaceAlt, color: themeVars.color.textSecondary } },
    { variants: { tone: "primary", variant: "soft" }, style: { backgroundColor: "#eef3ff", color: themeVars.color.accentPrimary } },
    { variants: { tone: "success", variant: "soft" }, style: { backgroundColor: "#eefaf3", color: themeVars.color.accentSuccess } },
    { variants: { tone: "warning", variant: "soft" }, style: { backgroundColor: "#fff8e7", color: themeVars.color.accentWarningActive } },
    { variants: { tone: "danger", variant: "soft" }, style: { backgroundColor: "#fef0f0", color: themeVars.color.accentDanger } },
    { variants: { tone: "info", variant: "soft" }, style: { backgroundColor: "#ecfbfe", color: themeVars.color.accentInfo } },
    { variants: { tone: "neutral", variant: "solid" }, style: { backgroundColor: themeVars.color.accentSecondary, color: themeVars.color.textInverse } },
    { variants: { tone: "primary", variant: "solid" }, style: { backgroundColor: themeVars.color.accentPrimary, color: themeVars.color.textInverse } },
    { variants: { tone: "success", variant: "solid" }, style: { backgroundColor: themeVars.color.accentSuccess, color: themeVars.color.textInverse } },
    { variants: { tone: "warning", variant: "solid" }, style: { backgroundColor: themeVars.color.accentWarning, color: themeVars.color.textInverse } },
    { variants: { tone: "danger", variant: "solid" }, style: { backgroundColor: themeVars.color.accentDanger, color: themeVars.color.textInverse } },
    { variants: { tone: "info", variant: "solid" }, style: { backgroundColor: themeVars.color.accentInfo, color: themeVars.color.textInverse } },
    { variants: { tone: "neutral", variant: "outline" }, style: { borderColor: themeVars.color.neutralBorderStrong, color: themeVars.color.textSecondary } },
    { variants: { tone: "primary", variant: "outline" }, style: { borderColor: themeVars.color.accentPrimary, color: themeVars.color.accentPrimary } },
    { variants: { tone: "success", variant: "outline" }, style: { borderColor: themeVars.color.accentSuccess, color: themeVars.color.accentSuccess } },
    { variants: { tone: "warning", variant: "outline" }, style: { borderColor: themeVars.color.accentWarning, color: themeVars.color.accentWarningActive } },
    { variants: { tone: "danger", variant: "outline" }, style: { borderColor: themeVars.color.accentDanger, color: themeVars.color.accentDanger } },
    { variants: { tone: "info", variant: "outline" }, style: { borderColor: themeVars.color.accentInfo, color: themeVars.color.accentInfo } }
  ],
  defaultVariants: {
    tone: "neutral",
    variant: "soft"
  }
});
