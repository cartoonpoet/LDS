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
  },
  button: {
    solid: {
      primary: {
        background: defaultColorTokens.accentPrimary,
        hover: defaultColorTokens.accentPrimaryHover,
        active: defaultColorTokens.accentPrimaryActive,
        text: defaultColorTokens.textInverse
      },
      secondary: {
        background: defaultColorTokens.accentSecondary,
        hover: defaultColorTokens.accentSecondaryHover,
        active: defaultColorTokens.accentSecondaryActive,
        text: defaultColorTokens.textInverse
      },
      success: {
        background: defaultColorTokens.accentSuccess,
        hover: greenPalette[600],
        active: greenPalette[700],
        text: defaultColorTokens.textInverse
      },
      danger: {
        background: defaultColorTokens.accentDanger,
        hover: redPalette[600],
        active: redPalette[700],
        text: defaultColorTokens.textInverse
      },
      warning: {
        background: defaultColorTokens.accentWarning,
        hover: yellowPalette[600],
        active: yellowPalette[700],
        text: defaultColorTokens.textInverse
      },
      info: {
        background: defaultColorTokens.accentInfo,
        hover: cyanPalette[600],
        active: cyanPalette[700],
        text: defaultColorTokens.textInverse
      },
      dark: {
        background: defaultColorTokens.accentDark,
        hover: darkPalette[600],
        active: darkPalette[700],
        text: defaultColorTokens.textInverse
      },
      neutral: {
        background: grayPalette[500],
        hover: grayPalette[600],
        active: grayPalette[700],
        text: defaultColorTokens.textInverse
      },
      disabled: {
        background: defaultColorTokens.neutralDisabled,
        text: defaultColorTokens.textInverse
      }
    },
    outline: {
      primary: {
        border: defaultColorTokens.accentPrimary,
        text: defaultColorTokens.accentPrimary,
        hover: bluePalette[100],
        active: bluePalette[200]
      },
      secondary: {
        border: defaultColorTokens.accentSecondary,
        text: defaultColorTokens.accentSecondary,
        hover: grayPalette[100],
        active: grayPalette[200]
      },
      success: {
        border: greenPalette[500],
        text: greenPalette[700],
        hover: greenPalette[100],
        active: greenPalette[200]
      },
      danger: {
        border: redPalette[500],
        text: redPalette[700],
        hover: redPalette[100],
        active: redPalette[200]
      },
      warning: {
        border: yellowPalette[500],
        text: yellowPalette[700],
        hover: yellowPalette[100],
        active: yellowPalette[200]
      },
      info: {
        border: cyanPalette[500],
        text: cyanPalette[700],
        hover: cyanPalette[100],
        active: cyanPalette[200]
      },
      dark: {
        border: darkPalette[500],
        text: darkPalette[700],
        hover: grayPalette[100],
        active: grayPalette[200]
      },
      neutral: {
        border: defaultColorTokens.neutralBorderStrong,
        text: defaultColorTokens.textPrimary,
        hover: defaultColorTokens.neutralSurfaceAlt,
        active: defaultColorTokens.neutralSurfaceRaised
      },
      disabled: {
        border: defaultColorTokens.neutralBorder,
        text: defaultColorTokens.textDisabled
      }
    },
    gradient: {
      primary: {
        from: bluePalette[400],
        to: bluePalette[500],
        hoverFrom: bluePalette[500],
        hoverTo: bluePalette[600],
        activeFrom: bluePalette[600],
        activeTo: bluePalette[600],
        disabledFrom: bluePalette[300],
        disabledTo: bluePalette[300],
        text: defaultColorTokens.textInverse
      },
      secondary: {
        from: grayPalette[400],
        to: grayPalette[500],
        hoverFrom: grayPalette[500],
        hoverTo: grayPalette[600],
        activeFrom: grayPalette[600],
        activeTo: grayPalette[600],
        disabledFrom: grayPalette[300],
        disabledTo: grayPalette[300],
        text: defaultColorTokens.textInverse
      },
      success: {
        from: greenPalette[400],
        to: greenPalette[500],
        hoverFrom: greenPalette[500],
        hoverTo: greenPalette[600],
        activeFrom: greenPalette[600],
        activeTo: greenPalette[600],
        disabledFrom: greenPalette[300],
        disabledTo: greenPalette[300],
        text: defaultColorTokens.textInverse
      },
      danger: {
        from: redPalette[400],
        to: redPalette[500],
        hoverFrom: redPalette[500],
        hoverTo: redPalette[600],
        activeFrom: redPalette[600],
        activeTo: redPalette[600],
        disabledFrom: redPalette[300],
        disabledTo: redPalette[300],
        text: defaultColorTokens.textInverse
      },
      warning: {
        from: yellowPalette[400],
        to: yellowPalette[500],
        hoverFrom: yellowPalette[500],
        hoverTo: yellowPalette[600],
        activeFrom: yellowPalette[600],
        activeTo: yellowPalette[600],
        disabledFrom: yellowPalette[300],
        disabledTo: yellowPalette[300],
        text: defaultColorTokens.textInverse
      },
      info: {
        from: cyanPalette[400],
        to: cyanPalette[500],
        hoverFrom: cyanPalette[500],
        hoverTo: cyanPalette[600],
        activeFrom: cyanPalette[600],
        activeTo: cyanPalette[600],
        disabledFrom: cyanPalette[300],
        disabledTo: cyanPalette[300],
        text: defaultColorTokens.textInverse
      },
      dark: {
        from: darkPalette[300],
        to: darkPalette[400],
        hoverFrom: darkPalette[400],
        hoverTo: darkPalette[500],
        activeFrom: darkPalette[600],
        activeTo: darkPalette[600],
        disabledFrom: grayPalette[300],
        disabledTo: grayPalette[300],
        text: defaultColorTokens.textInverse
      },
      neutral: {
        from: grayPalette[400],
        to: grayPalette[500],
        hoverFrom: grayPalette[500],
        hoverTo: grayPalette[600],
        activeFrom: grayPalette[600],
        activeTo: grayPalette[600],
        disabledFrom: grayPalette[300],
        disabledTo: grayPalette[300],
        text: defaultColorTokens.textInverse
      }
    }
  },
  field: {
    label: defaultColorTokens.textSecondary,
    text: defaultColorTokens.textPrimary,
    placeholder: defaultColorTokens.textMuted,
    helper: defaultColorTokens.textMuted,
    background: defaultColorTokens.neutralSurface,
    backgroundDisabled: defaultColorTokens.neutralDisabled,
    border: defaultColorTokens.neutralBorder,
    borderHover: defaultColorTokens.neutralBorderStrong,
    borderFocus: defaultColorTokens.accentPrimary,
    icon: defaultColorTokens.textMuted
  },
  badge: {
    filled: {
      primary: {
        background: defaultColorTokens.accentPrimary,
        text: defaultColorTokens.textInverse
      },
      neutral: {
        background: defaultColorTokens.accentSecondary,
        text: defaultColorTokens.textInverse
      }
    },
    outline: {
      primary: {
        background: defaultColorTokens.neutralSurface,
        border: bluePalette[300],
        text: defaultColorTokens.accentPrimary
      },
      neutral: {
        background: defaultColorTokens.neutralSurface,
        border: defaultColorTokens.neutralBorder,
        text: defaultColorTokens.textSecondary
      }
    },
    muted: {
      primary: {
        background: bluePalette[100],
        border: bluePalette[200],
        text: defaultColorTokens.accentPrimary
      },
      neutral: {
        background: defaultColorTokens.neutralSurfaceAlt,
        border: grayPalette[200],
        text: defaultColorTokens.textSecondary
      }
    }
  },
  chip: {
    background: defaultColorTokens.neutralSurface,
    border: defaultColorTokens.neutralBorder,
    text: defaultColorTokens.textSecondary,
    selected: {
      basic: {
        background: bluePalette[100],
        border: bluePalette[300],
        text: defaultColorTokens.accentPrimary
      },
      check: {
        background: bluePalette[100],
        border: bluePalette[300],
        text: defaultColorTokens.accentPrimary
      },
      file: {
        background: greenPalette[100],
        border: greenPalette[200],
        text: defaultColorTokens.textSecondary
      },
      link: {
        background: defaultColorTokens.neutralSurface,
        border: bluePalette[200],
        text: defaultColorTokens.accentPrimary
      }
    }
  },
  alert: {
    info: {
      background: cyanPalette[100],
      border: cyanPalette[200],
      text: defaultColorTokens.textHeading,
      icon: cyanPalette[700]
    },
    neutral: {
      background: defaultColorTokens.neutralSurfaceRaised,
      border: grayPalette[300],
      text: defaultColorTokens.textHeading,
      icon: defaultColorTokens.textSecondary
    },
    action: {
      primary: {
        background: defaultColorTokens.accentPrimary,
        hover: defaultColorTokens.accentPrimaryHover,
        active: defaultColorTokens.accentPrimaryActive,
        text: defaultColorTokens.textInverse
      },
      warning: {
        background: defaultColorTokens.accentWarning,
        hover: yellowPalette[600],
        active: yellowPalette[700],
        text: defaultColorTokens.textInverse
      }
    }
  }
} as const;
