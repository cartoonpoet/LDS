import {
  bluePalette,
  cyanPalette,
  darkPalette,
  grayPalette,
  greenPalette,
  opacityPalette,
  redPalette,
  scourtPalette,
  yellowPalette
} from "../foundation/color-palette";
import { themeVars } from "../contracts/theme-contract.css";

const t = themeVars.color;

export const semanticColorRoles = {
  surface: {
    page: t.neutralBackground,
    canvas: t.neutralSurface,
    subtle: t.neutralSurfaceAlt,
    raised: t.neutralSurfaceRaised,
    disabled: t.neutralDisabled,
    tableHeader: grayPalette[100],
    backdrop: "rgba(0, 0, 0, 0.2)"
  },
  text: {
    primary: t.textPrimary,
    heading: t.textHeading,
    secondary: t.textSecondary,
    tertiary: t.textMuted,
    disabled: t.textDisabled,
    inverse: t.textInverse,
    placeholder: t.textMuted
  },
  border: {
    subtle: t.neutralBorder,
    default: t.neutralBorder,
    strong: t.neutralBorderStrong,
    focus: t.accentPrimary,
    input: grayPalette[500],
    primary: t.accentPrimary,
    secondary: t.accentSecondary,
    success: "#28c76f",
    danger: t.accentDanger,
    warning: t.accentWarning,
    info: t.accentInfo,
    dark: "#4b4b4b"
  },
  action: {
    primary: {
      default: t.accentPrimary,
      hover: t.accentPrimaryHover,
      active: t.accentPrimaryActive,
      subtle: opacityPalette.primary,
      subtleActive: opacityPalette.primaryActive
    },
    secondary: {
      default: t.accentSecondary,
      hover: t.accentSecondaryHover,
      active: t.accentSecondaryActive,
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
      border: t.accentDanger
    },
    warning: {
      text: yellowPalette[700],
      fill: opacityPalette.warning,
      border: t.accentWarning
    },
    info: {
      text: cyanPalette[700],
      fill: opacityPalette.info,
      border: t.accentInfo
    },
    dark: {
      text: darkPalette[700],
      fill: opacityPalette.dark,
      border: t.accentDark
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
        background: t.accentPrimary,
        hover: t.accentPrimaryHover,
        active: t.accentPrimaryActive,
        text: t.textInverse
      },
      secondary: {
        background: t.accentSecondary,
        hover: t.accentSecondaryHover,
        active: t.accentSecondaryActive,
        text: t.textInverse
      },
      success: {
        background: "#28c76f",
        hover: "#28c76f",
        active: "#006d38",
        text: t.textInverse
      },
      danger: {
        background: t.accentDanger,
        hover: t.accentDangerHover,
        active: t.accentDangerActive,
        text: t.textInverse
      },
      warning: {
        background: t.accentWarning,
        hover: t.accentWarningHover,
        active: t.accentWarningActive,
        text: t.textInverse
      },
      info: {
        background: t.accentInfo,
        hover: t.accentInfoHover,
        active: t.accentInfoActive,
        text: t.textInverse
      },
      dark: {
        background: t.accentDark,
        hover: t.accentDarkHover,
        active: t.accentDarkActive,
        text: t.textInverse
      },
      neutral: {
        background: t.neutralBorderStrong,
        hover: t.accentSecondary,
        active: t.accentSecondaryActive,
        text: t.textInverse
      },
      disabled: {
        background: t.neutralDisabled,
        text: t.textInverse
      }
    },
    outline: {
      primary: {
        border: t.accentPrimary,
        text: t.accentPrimary,
        hover: opacityPalette.primary,
        active: opacityPalette.primaryActive
      },
      secondary: {
        border: t.accentSecondary,
        text: t.accentSecondary,
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
        border: t.accentDanger,
        text: redPalette[700],
        hover: opacityPalette.danger,
        active: opacityPalette.danger
      },
      warning: {
        border: t.accentWarning,
        text: yellowPalette[700],
        hover: opacityPalette.warning,
        active: opacityPalette.warning
      },
      info: {
        border: t.accentInfo,
        text: cyanPalette[700],
        hover: opacityPalette.info,
        active: opacityPalette.info
      },
      dark: {
        border: t.accentDark,
        text: darkPalette[700],
        hover: opacityPalette.dark,
        active: opacityPalette.dark
      },
      neutral: {
        border: t.neutralBorderStrong,
        text: t.textPrimary,
        hover: t.neutralSurfaceAlt,
        active: t.neutralSurfaceRaised
      },
      disabled: {
        border: t.neutralBorder,
        text: t.textDisabled,
        hover: t.neutralSurface,
        active: t.neutralSurface
      }
    },
    gradient: {
      primary: {
        from: t.accentPrimary,
        to: t.accentPrimary,
        hoverFrom: t.accentPrimaryHover,
        hoverTo: t.accentPrimaryHover,
        activeFrom: t.accentPrimaryActive,
        activeTo: t.accentPrimaryActive,
        disabledFrom: "rgba(33, 81, 236, 0.18)",
        disabledTo: "rgba(33, 81, 236, 0.18)",
        text: t.textInverse
      },
      secondary: {
        from: t.accentSecondary,
        to: t.accentSecondary,
        hoverFrom: t.accentSecondaryHover,
        hoverTo: t.accentSecondaryHover,
        activeFrom: t.accentSecondaryActive,
        activeTo: t.accentSecondaryActive,
        disabledFrom: "rgba(130, 134, 139, 0.18)",
        disabledTo: "rgba(130, 134, 139, 0.18)",
        text: t.textInverse
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
        text: t.textInverse
      },
      danger: {
        from: t.accentDanger,
        to: t.accentDanger,
        hoverFrom: t.accentDangerHover,
        hoverTo: t.accentDangerHover,
        activeFrom: t.accentDangerActive,
        activeTo: t.accentDangerActive,
        disabledFrom: "rgba(234, 84, 85, 0.18)",
        disabledTo: "rgba(234, 84, 85, 0.18)",
        text: t.textInverse
      },
      warning: {
        from: t.accentWarning,
        to: t.accentWarning,
        hoverFrom: t.accentWarningHover,
        hoverTo: t.accentWarningHover,
        activeFrom: t.accentWarningActive,
        activeTo: t.accentWarningActive,
        disabledFrom: "rgba(240, 175, 35, 0.18)",
        disabledTo: "rgba(240, 175, 35, 0.18)",
        text: t.textInverse
      },
      info: {
        from: t.accentInfo,
        to: t.accentInfo,
        hoverFrom: t.accentInfoHover,
        hoverTo: t.accentInfoHover,
        activeFrom: t.accentInfoActive,
        activeTo: t.accentInfoActive,
        disabledFrom: "rgba(0, 207, 232, 0.18)",
        disabledTo: "rgba(0, 207, 232, 0.18)",
        text: t.textInverse
      },
      dark: {
        from: t.accentDark,
        to: t.accentDark,
        hoverFrom: t.accentDarkHover,
        hoverTo: t.accentDarkHover,
        activeFrom: t.accentDarkActive,
        activeTo: t.accentDarkActive,
        disabledFrom: "rgba(75, 75, 75, 0.18)",
        disabledTo: "rgba(75, 75, 75, 0.18)",
        text: t.textInverse
      },
      neutral: {
        from: t.accentSecondary,
        to: t.accentSecondary,
        hoverFrom: t.accentSecondaryHover,
        hoverTo: t.accentSecondaryHover,
        activeFrom: t.accentSecondaryActive,
        activeTo: t.accentSecondaryActive,
        disabledFrom: "rgba(130, 134, 139, 0.18)",
        disabledTo: "rgba(130, 134, 139, 0.18)",
        text: t.textInverse
      }
    }
  },
  field: {
    label: t.textSecondary,
    text: t.textPrimary,
    placeholder: t.textMuted,
    helper: t.textMuted,
    background: t.neutralSurface,
    backgroundDisabled: t.neutralDisabled,
    border: grayPalette[500],
    borderHover: t.neutralBorderStrong,
    borderFocus: t.accentPrimary,
    icon: t.textMuted
  },
  table: {
    headerBackground: grayPalette[100],
    bodyBackground: grayPalette[50],
    border: t.neutralBorder,
    text: t.textPrimary
  },
  badge: {
    filled: {
      primary: { background: t.accentPrimary, text: t.textInverse },
      neutral: { background: t.accentSecondary, text: t.textInverse }
    },
    outline: {
      primary: { background: t.neutralSurface, border: t.accentPrimary, text: t.accentPrimary },
      neutral: { background: t.neutralSurface, border: t.neutralBorder, text: t.textMuted }
    },
    muted: {
      primary: { background: opacityPalette.primary, border: t.accentPrimary, text: t.accentPrimary },
      neutral: { background: opacityPalette.light, border: t.neutralBorder, text: t.textMuted }
    }
  },
  chip: {
    background: t.neutralSurface,
    border: t.neutralBorder,
    text: t.textMuted,
    selected: {
      basic: { background: opacityPalette.primary, border: t.accentPrimary, text: t.accentPrimary },
      check: { background: opacityPalette.primary, border: t.accentPrimary, text: t.accentPrimary },
      file: { background: opacityPalette.success, border: "#28c76f", text: greenPalette[700] },
      link: { background: t.neutralSurface, border: t.accentPrimary, text: t.accentPrimary }
    }
  },
  alert: {
    info: { background: opacityPalette.info, border: t.accentInfo, text: t.textHeading, icon: cyanPalette[700] },
    neutral: { background: t.neutralSurfaceRaised, border: t.neutralBorder, text: t.textHeading, icon: t.textMuted },
    action: {
      primary: { background: t.accentPrimary, hover: t.accentPrimaryHover, active: t.accentPrimaryActive, text: t.textInverse },
      warning: { background: t.accentWarning, hover: t.accentWarningHover, active: t.accentWarningActive, text: t.textInverse }
    }
  }
};
