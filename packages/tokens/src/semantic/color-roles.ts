import {
  bluePalette,
  cyanPalette,
  darkPalette,
  defaultColorTokens,
  grayPalette,
  greenPalette,
  redPalette,
  yellowPalette
} from "../foundation/color-palette";

export const semanticColorRoles = {
  surface: {
    page: defaultColorTokens.neutralBackground,
    canvas: defaultColorTokens.neutralSurface,
    subtle: defaultColorTokens.neutralSurfaceAlt,
    raised: defaultColorTokens.neutralSurfaceRaised,
    disabled: defaultColorTokens.neutralDisabled
  },
  text: {
    primary: defaultColorTokens.textPrimary,
    heading: defaultColorTokens.textHeading,
    secondary: defaultColorTokens.textSecondary,
    tertiary: defaultColorTokens.textMuted,
    disabled: defaultColorTokens.textDisabled,
    inverse: defaultColorTokens.textInverse
  },
  border: {
    subtle: grayPalette[300],
    default: defaultColorTokens.neutralBorder,
    strong: defaultColorTokens.neutralBorderStrong,
    focus: defaultColorTokens.accentPrimary
  },
  action: {
    primary: {
      default: defaultColorTokens.accentPrimary,
      hover: defaultColorTokens.accentPrimaryHover,
      active: defaultColorTokens.accentPrimaryActive,
      subtle: bluePalette[100]
    },
    secondary: {
      default: defaultColorTokens.accentSecondary,
      hover: defaultColorTokens.accentSecondaryHover,
      active: defaultColorTokens.accentSecondaryActive,
      subtle: grayPalette[100]
    }
  },
  status: {
    success: {
      text: greenPalette[700],
      fill: greenPalette[100],
      border: greenPalette[500]
    },
    danger: {
      text: redPalette[700],
      fill: redPalette[100],
      border: redPalette[500]
    },
    warning: {
      text: yellowPalette[700],
      fill: yellowPalette[100],
      border: yellowPalette[500]
    },
    info: {
      text: cyanPalette[700],
      fill: cyanPalette[100],
      border: cyanPalette[500]
    },
    dark: {
      text: darkPalette[700],
      fill: grayPalette[100],
      border: darkPalette[500]
    }
  }
} as const;
