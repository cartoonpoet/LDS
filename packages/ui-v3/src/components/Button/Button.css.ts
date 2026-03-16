import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";
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
  backgroundColor: semanticColorRoles.button.solid.disabled.background,
  color: semanticColorRoles.button.solid.disabled.text,
  boxShadow: "none",
  cursor: "not-allowed"
} as const;

const outlineDisabled = {
  borderColor: semanticColorRoles.button.outline.disabled.border,
  color: semanticColorRoles.button.outline.disabled.text,
  backgroundColor: semanticColorRoles.surface.canvas,
  boxShadow: "none",
  cursor: "not-allowed"
} as const;

const createSolidTone = (tone: keyof typeof semanticColorRoles.button.solid) => {
  if (tone === "disabled") {
    return {};
  }

  const palette = semanticColorRoles.button.solid[tone];

  return {
    backgroundColor: palette.background,
    color: palette.text,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: palette.hover,
        boxShadow: themeVars.shadow.raised
      },
      "&:active:not(:disabled)": {
        backgroundColor: palette.active,
        boxShadow: "none",
        transform: "translateY(1px)"
      },
      "&:disabled": solidDisabled
    }
  };
};

const createOutlineTone = (tone: keyof typeof semanticColorRoles.button.outline) => {
  if (tone === "disabled") {
    return {};
  }

  const palette = semanticColorRoles.button.outline[tone];

  return {
    borderColor: palette.border,
    color: palette.text,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: palette.hover
      },
      "&:active:not(:disabled)": {
        backgroundColor: palette.active,
        transform: "translateY(1px)"
      },
      "&:disabled": outlineDisabled
    }
  };
};

const createGradientTone = (tone: keyof typeof semanticColorRoles.button.gradient) => {
  const palette = semanticColorRoles.button.gradient[tone];

  return {
    backgroundImage: `linear-gradient(90deg, ${palette.from} 0%, ${palette.to} 100%)`,
    color: palette.text,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundImage: `linear-gradient(90deg, ${palette.hoverFrom} 0%, ${palette.hoverTo} 100%)`,
        boxShadow: themeVars.shadow.raised
      },
      "&:active:not(:disabled)": {
        backgroundImage: `linear-gradient(90deg, ${palette.activeFrom} 0%, ${palette.activeTo} 100%)`,
        boxShadow: "none",
        transform: "translateY(1px)"
      },
      "&:disabled": {
        backgroundImage: `linear-gradient(90deg, ${palette.disabledFrom} 0%, ${palette.disabledTo} 100%)`,
        color: palette.text,
        boxShadow: "none",
        cursor: "not-allowed"
      }
    }
  };
};

const solidToneStyles = {
  primary: createSolidTone("primary"),
  secondary: createSolidTone("secondary"),
  success: createSolidTone("success"),
  danger: createSolidTone("danger"),
  warning: createSolidTone("warning"),
  info: createSolidTone("info"),
  dark: createSolidTone("dark"),
  neutral: createSolidTone("neutral")
} as const;

const outlineToneStyles = {
  primary: createOutlineTone("primary"),
  secondary: createOutlineTone("secondary"),
  success: createOutlineTone("success"),
  danger: createOutlineTone("danger"),
  warning: createOutlineTone("warning"),
  info: createOutlineTone("info"),
  dark: createOutlineTone("dark"),
  neutral: createOutlineTone("neutral")
} as const;

const gradientToneStyles = {
  primary: createGradientTone("primary"),
  secondary: createGradientTone("secondary"),
  success: createGradientTone("success"),
  danger: createGradientTone("danger"),
  warning: createGradientTone("warning"),
  info: createGradientTone("info"),
  dark: createGradientTone("dark"),
  neutral: createGradientTone("neutral")
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
      border: `1px solid transparent`,
      fontFamily: themeVars.font.family,
      fontSize: themeVars.font.sizeMd,
      fontWeight: themeVars.font.weightBold,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      cursor: "pointer",
      transition:
        "background-color 120ms ease, background-image 120ms ease, border-color 120ms ease, color 120ms ease, box-shadow 120ms ease, transform 80ms ease",
      selectors: {
        "&:focus-visible": {
          outline: "none",
          boxShadow: themeVars.shadow.focus
        },
        "&:disabled": {
          cursor: "not-allowed",
          transform: "none"
        }
      }
    }
  ],
  variants: {
    variant: {
      solid: {},
      gradient: {},
      outline: {
        backgroundColor: semanticColorRoles.surface.canvas
      }
    },
    size: {
      sm: {
        minHeight: "30px",
        padding: `0 ${themeVars.spacing.x3}`,
        fontSize: themeVars.font.sizeSm
      },
      md: {
        minHeight: "38px",
        padding: `0 ${themeVars.spacing.x4}`,
        fontSize: themeVars.font.sizeMd
      },
      lg: {
        minHeight: "44px",
        padding: `0 ${themeVars.spacing.x5}`,
        fontSize: themeVars.font.sizeLg
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
