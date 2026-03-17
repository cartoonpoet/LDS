import {
  bluePalette,
  cyanPalette,
  darkPalette,
  defaultColorTokens,
  grayPalette,
  greenPalette,
  opacityPalette,
  redPalette,
  scourtPalette,
  yellowPalette
} from "../foundation/color-palette";

export const semanticColorRoles = {
  surface: {
    page: defaultColorTokens.neutralBackground,
    canvas: defaultColorTokens.neutralSurface,
    subtle: defaultColorTokens.neutralSurfaceAlt,
    raised: defaultColorTokens.neutralSurfaceRaised,
    disabled: defaultColorTokens.neutralDisabled,
    tableHeader: grayPalette[100],
    backdrop: "rgba(0, 0, 0, 0.2)"
  },
  text: {
    primary: defaultColorTokens.textPrimary,
    heading: defaultColorTokens.textHeading,
    secondary: defaultColorTokens.textSecondary,
    tertiary: defaultColorTokens.textMuted,
    disabled: defaultColorTokens.textDisabled,
    inverse: defaultColorTokens.textInverse,
    placeholder: defaultColorTokens.textMuted
  },
  border: {
    subtle: defaultColorTokens.neutralBorder,
    default: defaultColorTokens.neutralBorder,
    strong: defaultColorTokens.neutralBorderStrong,
    focus: defaultColorTokens.accentPrimary,
    input: grayPalette[500],
    primary: defaultColorTokens.accentPrimary,
    secondary: defaultColorTokens.accentSecondary,
    success: "#28c76f",
    danger: defaultColorTokens.accentDanger,
    warning: defaultColorTokens.accentWarning,
    info: defaultColorTokens.accentInfo,
    dark: "#4b4b4b"
  },
  action: {
    primary: {
      default: defaultColorTokens.accentPrimary,
      hover: defaultColorTokens.accentPrimaryHover,
      active: defaultColorTokens.accentPrimaryActive,
      subtle: opacityPalette.primary,
      subtleActive: opacityPalette.primaryActive
    },
    secondary: {
      default: defaultColorTokens.accentSecondary,
      hover: defaultColorTokens.accentSecondaryHover,
      active: defaultColorTokens.accentSecondaryActive,
      subtle: opacityPalette.secondary
    }
  },
  status: {
    success: {
      text: greenPalette[700],
      fill: opacityPalette.success,
      border: "#28c76f"
    },
    danger: {
      text: redPalette[700],
      fill: opacityPalette.danger,
      border: defaultColorTokens.accentDanger
    },
    warning: {
      text: yellowPalette[700],
      fill: opacityPalette.warning,
      border: defaultColorTokens.accentWarning
    },
    info: {
      text: cyanPalette[700],
      fill: opacityPalette.info,
      border: defaultColorTokens.accentInfo
    },
    dark: {
      text: darkPalette[700],
      fill: opacityPalette.dark,
      border: defaultColorTokens.accentDark
    },
    scourt: {
      blue: { text: scourtPalette.blue, fill: opacityPalette.scourtBlue },
      green: { text: scourtPalette.green, fill: opacityPalette.scourtGreen },
      red: { text: scourtPalette.red, fill: opacityPalette.scourtRed },
      yellow: { text: scourtPalette.yellow, fill: opacityPalette.scourtYellow },
      stamp: { text: scourtPalette.stamp, fill: opacityPalette.danger }
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
        background: "#28c76f",
        hover: "#28c76f",
        active: "#006d38",
        text: defaultColorTokens.textInverse
      },
      danger: {
        background: defaultColorTokens.accentDanger,
        hover: defaultColorTokens.accentDangerHover,
        active: defaultColorTokens.accentDangerActive,
        text: defaultColorTokens.textInverse
      },
      warning: {
        background: defaultColorTokens.accentWarning,
        hover: defaultColorTokens.accentWarningHover,
        active: defaultColorTokens.accentWarningActive,
        text: defaultColorTokens.textInverse
      },
      info: {
        background: defaultColorTokens.accentInfo,
        hover: defaultColorTokens.accentInfoHover,
        active: defaultColorTokens.accentInfoActive,
        text: defaultColorTokens.textInverse
      },
      dark: {
        background: defaultColorTokens.accentDark,
        hover: defaultColorTokens.accentDarkHover,
        active: defaultColorTokens.accentDarkActive,
        text: defaultColorTokens.textInverse
      },
      neutral: {
        background: defaultColorTokens.neutralBorderStrong,
        hover: defaultColorTokens.accentSecondary,
        active: defaultColorTokens.accentSecondaryActive,
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
        hover: opacityPalette.primary,
        active: opacityPalette.primaryActive
      },
      secondary: {
        border: defaultColorTokens.accentSecondary,
        text: defaultColorTokens.accentSecondary,
        hover: opacityPalette.secondary,
        active: opacityPalette.secondary
      },
      success: {
        border: "#28c76f",
        text: greenPalette[700],
        hover: opacityPalette.success,
        active: opacityPalette.success
      },
      danger: {
        border: defaultColorTokens.accentDanger,
        text: redPalette[700],
        hover: opacityPalette.danger,
        active: opacityPalette.danger
      },
      warning: {
        border: defaultColorTokens.accentWarning,
        text: yellowPalette[700],
        hover: opacityPalette.warning,
        active: opacityPalette.warning
      },
      info: {
        border: defaultColorTokens.accentInfo,
        text: cyanPalette[700],
        hover: opacityPalette.info,
        active: opacityPalette.info
      },
      dark: {
        border: defaultColorTokens.accentDark,
        text: darkPalette[700],
        hover: opacityPalette.dark,
        active: opacityPalette.dark
      },
      neutral: {
        border: defaultColorTokens.neutralBorderStrong,
        text: defaultColorTokens.textPrimary,
        hover: defaultColorTokens.neutralSurfaceAlt,
        active: defaultColorTokens.neutralSurfaceRaised
      },
      disabled: {
        border: defaultColorTokens.neutralBorder,
        text: defaultColorTokens.textDisabled,
        hover: defaultColorTokens.neutralSurface,
        active: defaultColorTokens.neutralSurface
      }
    },
    gradient: {
      primary: {
        from: defaultColorTokens.accentPrimary,
        to: defaultColorTokens.accentPrimary,
        hoverFrom: defaultColorTokens.accentPrimaryHover,
        hoverTo: defaultColorTokens.accentPrimaryHover,
        activeFrom: defaultColorTokens.accentPrimaryActive,
        activeTo: defaultColorTokens.accentPrimaryActive,
        disabledFrom: "rgba(33, 81, 236, 0.18)",
        disabledTo: "rgba(33, 81, 236, 0.18)",
        text: defaultColorTokens.textInverse
      },
      secondary: {
        from: defaultColorTokens.accentSecondary,
        to: defaultColorTokens.accentSecondary,
        hoverFrom: defaultColorTokens.accentSecondaryHover,
        hoverTo: defaultColorTokens.accentSecondaryHover,
        activeFrom: defaultColorTokens.accentSecondaryActive,
        activeTo: defaultColorTokens.accentSecondaryActive,
        disabledFrom: "rgba(130, 134, 139, 0.18)",
        disabledTo: "rgba(130, 134, 139, 0.18)",
        text: defaultColorTokens.textInverse
      },
      success: {
        from: "#28c76f",
        to: "#28c76f",
        hoverFrom: "#28c76f",
        hoverTo: "#28c76f",
        activeFrom: "#006d38",
        activeTo: "#006d38",
        disabledFrom: "rgba(40, 199, 111, 0.18)",
        disabledTo: "rgba(40, 199, 111, 0.18)",
        text: defaultColorTokens.textInverse
      },
      danger: {
        from: defaultColorTokens.accentDanger,
        to: defaultColorTokens.accentDanger,
        hoverFrom: defaultColorTokens.accentDangerHover,
        hoverTo: defaultColorTokens.accentDangerHover,
        activeFrom: defaultColorTokens.accentDangerActive,
        activeTo: defaultColorTokens.accentDangerActive,
        disabledFrom: "rgba(234, 84, 85, 0.18)",
        disabledTo: "rgba(234, 84, 85, 0.18)",
        text: defaultColorTokens.textInverse
      },
      warning: {
        from: defaultColorTokens.accentWarning,
        to: defaultColorTokens.accentWarning,
        hoverFrom: defaultColorTokens.accentWarningHover,
        hoverTo: defaultColorTokens.accentWarningHover,
        activeFrom: defaultColorTokens.accentWarningActive,
        activeTo: defaultColorTokens.accentWarningActive,
        disabledFrom: "rgba(240, 175, 35, 0.18)",
        disabledTo: "rgba(240, 175, 35, 0.18)",
        text: defaultColorTokens.textInverse
      },
      info: {
        from: defaultColorTokens.accentInfo,
        to: defaultColorTokens.accentInfo,
        hoverFrom: defaultColorTokens.accentInfoHover,
        hoverTo: defaultColorTokens.accentInfoHover,
        activeFrom: defaultColorTokens.accentInfoActive,
        activeTo: defaultColorTokens.accentInfoActive,
        disabledFrom: "rgba(0, 207, 232, 0.18)",
        disabledTo: "rgba(0, 207, 232, 0.18)",
        text: defaultColorTokens.textInverse
      },
      dark: {
        from: defaultColorTokens.accentDark,
        to: defaultColorTokens.accentDark,
        hoverFrom: defaultColorTokens.accentDarkHover,
        hoverTo: defaultColorTokens.accentDarkHover,
        activeFrom: defaultColorTokens.accentDarkActive,
        activeTo: defaultColorTokens.accentDarkActive,
        disabledFrom: "rgba(75, 75, 75, 0.18)",
        disabledTo: "rgba(75, 75, 75, 0.18)",
        text: defaultColorTokens.textInverse
      },
      neutral: {
        from: defaultColorTokens.accentSecondary,
        to: defaultColorTokens.accentSecondary,
        hoverFrom: defaultColorTokens.accentSecondaryHover,
        hoverTo: defaultColorTokens.accentSecondaryHover,
        activeFrom: defaultColorTokens.accentSecondaryActive,
        activeTo: defaultColorTokens.accentSecondaryActive,
        disabledFrom: "rgba(130, 134, 139, 0.18)",
        disabledTo: "rgba(130, 134, 139, 0.18)",
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
    border: grayPalette[500],
    borderHover: defaultColorTokens.neutralBorderStrong,
    borderFocus: defaultColorTokens.accentPrimary,
    icon: defaultColorTokens.textMuted
  },
  table: {
    headerBackground: grayPalette[100],
    bodyBackground: grayPalette[50],
    border: defaultColorTokens.neutralBorder,
    text: defaultColorTokens.textPrimary
  },
  badge: {
    filled: {
      primary: { background: defaultColorTokens.accentPrimary, text: defaultColorTokens.textInverse },
      neutral: { background: defaultColorTokens.accentSecondary, text: defaultColorTokens.textInverse }
    },
    outline: {
      primary: { background: defaultColorTokens.neutralSurface, border: defaultColorTokens.accentPrimary, text: defaultColorTokens.accentPrimary },
      neutral: { background: defaultColorTokens.neutralSurface, border: defaultColorTokens.neutralBorder, text: defaultColorTokens.textMuted }
    },
    muted: {
      primary: { background: opacityPalette.primary, border: defaultColorTokens.accentPrimary, text: defaultColorTokens.accentPrimary },
      neutral: { background: opacityPalette.light, border: defaultColorTokens.neutralBorder, text: defaultColorTokens.textMuted }
    }
  },
  chip: {
    background: defaultColorTokens.neutralSurface,
    border: defaultColorTokens.neutralBorder,
    text: defaultColorTokens.textMuted,
    selected: {
      basic: { background: opacityPalette.primary, border: defaultColorTokens.accentPrimary, text: defaultColorTokens.accentPrimary },
      check: { background: opacityPalette.primary, border: defaultColorTokens.accentPrimary, text: defaultColorTokens.accentPrimary },
      file: { background: opacityPalette.success, border: "#28c76f", text: greenPalette[700] },
      link: { background: defaultColorTokens.neutralSurface, border: defaultColorTokens.accentPrimary, text: defaultColorTokens.accentPrimary }
    }
  },
  alert: {
    info: { background: opacityPalette.info, border: defaultColorTokens.accentInfo, text: defaultColorTokens.textHeading, icon: cyanPalette[700] },
    neutral: { background: defaultColorTokens.neutralSurfaceRaised, border: defaultColorTokens.neutralBorder, text: defaultColorTokens.textHeading, icon: defaultColorTokens.textMuted },
    action: {
      primary: { background: defaultColorTokens.accentPrimary, hover: defaultColorTokens.accentPrimaryHover, active: defaultColorTokens.accentPrimaryActive, text: defaultColorTokens.textInverse },
      warning: { background: defaultColorTokens.accentWarning, hover: defaultColorTokens.accentWarningHover, active: defaultColorTokens.accentWarningActive, text: defaultColorTokens.textInverse }
    }
  }
} as const;
