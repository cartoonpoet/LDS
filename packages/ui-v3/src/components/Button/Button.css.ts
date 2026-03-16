import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, bluePalette, cyanPalette, darkPalette, greenPalette, redPalette, yellowPalette } from "@lds/tokens";
import { sprinkles } from "../../styles/sprinkles.css";

const spin = keyframes({
  from: {
    transform: "rotate(0deg)"
  },
  to: {
    transform: "rotate(360deg)"
  }
});

const tones = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "neutral"
] as const;

const toneVariant = {
  primary: {},
  secondary: {},
  success: {},
  danger: {},
  warning: {},
  info: {},
  dark: {},
  neutral: {}
} as const;

const solidDisabled = {
  backgroundColor: themeVars.color.neutralDisabled,
  color: themeVars.color.textInverse,
  cursor: "not-allowed"
} as const;

const outlineDisabled = {
  borderColor: themeVars.color.neutralBorder,
  color: themeVars.color.textDisabled,
  cursor: "not-allowed"
} as const;

const createSolidTone = (defaultColor: string, hoverColor: string, activeColor: string) => ({
  backgroundColor: defaultColor,
  color: themeVars.color.textInverse,
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: hoverColor
    },
    "&:active:not(:disabled)": {
      backgroundColor: activeColor
    },
    "&:disabled": solidDisabled
  }
});

const createOutlineTone = (borderColor: string, textColor: string, hoverColor: string, activeColor: string) => ({
  borderColor,
  color: textColor,
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: hoverColor
    },
    "&:active:not(:disabled)": {
      backgroundColor: activeColor
    },
    "&:disabled": outlineDisabled
  }
});

const createGradientTone = (from: string, to: string, active: string, disabled: string) => ({
  backgroundImage: `linear-gradient(90deg, ${from} 0%, ${to} 100%)`,
  color: themeVars.color.textInverse,
  selectors: {
    "&:hover:not(:disabled)": {
      filter: "brightness(1.03)"
    },
    "&:active:not(:disabled)": {
      backgroundImage: `linear-gradient(90deg, ${active} 0%, ${active} 100%)`
    },
    "&:disabled": {
      backgroundImage: `linear-gradient(90deg, ${disabled} 0%, ${disabled} 100%)`,
      color: themeVars.color.textInverse,
      cursor: "not-allowed"
    }
  }
});

const solidToneStyles = {
  primary: createSolidTone(
    themeVars.color.accentPrimary,
    themeVars.color.accentPrimaryHover,
    themeVars.color.accentPrimaryActive
  ),
  secondary: createSolidTone(
    themeVars.color.accentSecondary,
    themeVars.color.accentSecondaryHover,
    themeVars.color.accentSecondaryActive
  ),
  success: createSolidTone(
    themeVars.color.accentSuccess,
    themeVars.color.accentSuccessHover,
    themeVars.color.accentSuccessActive
  ),
  danger: createSolidTone(
    themeVars.color.accentDanger,
    themeVars.color.accentDangerHover,
    themeVars.color.accentDangerActive
  ),
  warning: createSolidTone(
    themeVars.color.accentWarning,
    themeVars.color.accentWarningHover,
    themeVars.color.accentWarningActive
  ),
  info: createSolidTone(
    themeVars.color.accentInfo,
    themeVars.color.accentInfoHover,
    themeVars.color.accentInfoActive
  ),
  dark: createSolidTone(
    themeVars.color.accentDark,
    themeVars.color.accentDarkHover,
    themeVars.color.accentDarkActive
  ),
  neutral: createSolidTone(
    themeVars.color.accentSecondary,
    themeVars.color.accentSecondaryHover,
    themeVars.color.accentSecondaryActive
  )
} as const;

const outlineToneStyles = {
  primary: createOutlineTone(
    themeVars.color.accentPrimary,
    themeVars.color.accentPrimary,
    semanticColorRoles.action.primary.subtle,
    bluePalette[200]
  ),
  secondary: createOutlineTone(
    themeVars.color.accentSecondary,
    themeVars.color.accentSecondary,
    semanticColorRoles.action.secondary.subtle,
    themeVars.color.neutralSurfaceRaised
  ),
  success: createOutlineTone(
    themeVars.color.accentSuccess,
    themeVars.color.accentSuccess,
    semanticColorRoles.status.success.fill,
    greenPalette[200]
  ),
  danger: createOutlineTone(
    themeVars.color.accentDanger,
    themeVars.color.accentDanger,
    semanticColorRoles.status.danger.fill,
    redPalette[200]
  ),
  warning: createOutlineTone(
    themeVars.color.accentWarning,
    themeVars.color.accentWarningActive,
    semanticColorRoles.status.warning.fill,
    yellowPalette[200]
  ),
  info: createOutlineTone(
    themeVars.color.accentInfo,
    themeVars.color.accentInfo,
    semanticColorRoles.status.info.fill,
    cyanPalette[200]
  ),
  dark: createOutlineTone(
    themeVars.color.accentDark,
    themeVars.color.accentDark,
    semanticColorRoles.surface.raised,
    themeVars.color.neutralDisabled
  ),
  neutral: createOutlineTone(
    themeVars.color.neutralBorderStrong,
    themeVars.color.textPrimary,
    themeVars.color.neutralSurfaceAlt,
    themeVars.color.neutralSurfaceRaised
  )
} as const;

const gradientToneStyles = {
  primary: createGradientTone(bluePalette[400], bluePalette[500], themeVars.color.accentPrimaryActive, bluePalette[300]),
  secondary: createGradientTone("#a6abb2", themeVars.color.accentSecondary, themeVars.color.accentSecondaryActive, "#b4b7bc"),
  success: createGradientTone(greenPalette[400], greenPalette[500], themeVars.color.accentSuccessActive, greenPalette[300]),
  danger: createGradientTone(redPalette[400], redPalette[500], themeVars.color.accentDangerActive, redPalette[300]),
  warning: createGradientTone(yellowPalette[400], yellowPalette[500], themeVars.color.accentWarningActive, yellowPalette[300]),
  info: createGradientTone(cyanPalette[400], cyanPalette[500], themeVars.color.accentInfoActive, cyanPalette[300]),
  dark: createGradientTone(darkPalette[300], darkPalette[400], themeVars.color.accentDarkActive, "#a5a5a5"),
  neutral: createGradientTone("#a6abb2", themeVars.color.accentSecondary, themeVars.color.accentSecondaryActive, "#b4b7bc")
} as const;

export const buttonRecipe = recipe({
  base: [
    sprinkles({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "x2"
    }),
    {
      maxWidth: "100%",
      minHeight: "38px",
      padding: `0 ${themeVars.spacing.x4}`,
      borderRadius: themeVars.radius.sm,
      border: "1px solid transparent",
      fontFamily: themeVars.font.family,
      fontSize: themeVars.font.sizeMd,
      fontWeight: themeVars.font.weightBold,
      lineHeight: 1,
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition:
        "background-color 120ms ease, border-color 120ms ease, color 120ms ease, box-shadow 120ms ease",
      selectors: {
        "&:focus-visible": {
          outline: "none",
          boxShadow: themeVars.shadow.focus
        },
        "&:disabled": {
          cursor: "not-allowed"
        }
      }
    }
  ],
  variants: {
    variant: {
      solid: {},
      gradient: {},
      outline: {
        backgroundColor: themeVars.color.neutralSurface
      }
    },
    size: {
      sm: {
        minHeight: "30px",
        padding: `0 ${themeVars.spacing.x3}`,
        fontSize: themeVars.font.sizeSm,
        "@media": {
          "screen and (max-width: 767px)": {
            minHeight: "32px"
          }
        }
      },
      md: {
        minHeight: "38px",
        padding: `0 ${themeVars.spacing.x4}`,
        fontSize: themeVars.font.sizeMd,
        "@media": {
          "screen and (max-width: 767px)": {
            minHeight: "36px",
            padding: `0 ${themeVars.spacing.x3}`,
            fontSize: themeVars.font.sizeSm
          }
        }
      },
      lg: {
        minHeight: "44px",
        padding: `0 ${themeVars.spacing.x5}`,
        fontSize: themeVars.font.sizeLg,
        "@media": {
          "screen and (max-width: 767px)": {
            minHeight: "40px",
            padding: `0 ${themeVars.spacing.x4}`,
            fontSize: themeVars.font.sizeMd
          }
        }
      }
    },
    tone: toneVariant
  },
  compoundVariants: [
    ...tones.map(tone => ({
      variants: {
        variant: "solid" as const,
        tone
      },
      style: solidToneStyles[tone]
    })),
    ...tones.map(tone => ({
      variants: {
        variant: "outline" as const,
        tone
      },
      style: outlineToneStyles[tone]
    })),
    ...tones.map(tone => ({
      variants: {
        variant: "gradient" as const,
        tone
      },
      style: gradientToneStyles[tone]
    }))
  ],
  defaultVariants: {
    variant: "solid",
    size: "md",
    tone: "primary"
  }
});

export const fullWidth = style([
  sprinkles({
    width: "100%"
  })
]);

export const content = style([
  sprinkles({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "x2"
  }),
  {
    minWidth: 0
  }
]);

export const icon = style([
  sprinkles({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  }),
  {
    lineHeight: 0,
    fontSize: "1em"
  }
]);

export const spinner = style({
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  border: "2px solid currentColor",
  borderRightColor: "transparent",
  animation: `${spin} 0.75s linear infinite`
});
