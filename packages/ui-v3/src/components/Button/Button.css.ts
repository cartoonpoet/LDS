import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { themeVars } from "@lds/tokens";

const spin = keyframes({
  from: {
    transform: "rotate(0deg)"
  },
  to: {
    transform: "rotate(360deg)"
  }
});

export const base = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: themeVars.spacing.x2,
  minHeight: "38px",
  padding: `0 ${themeVars.spacing.x4}`,
  borderRadius: themeVars.radius.sm,
  border: "1px solid transparent",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: 1,
  cursor: "pointer",
  transition: "background-color 120ms ease, border-color 120ms ease, color 120ms ease, box-shadow 120ms ease",
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: themeVars.shadow.focus
    },
    "&:disabled": {
      cursor: "not-allowed"
    }
  }
});

export const variant = styleVariants({
  solid: {},
  gradient: {},
  outline: {
    backgroundColor: themeVars.color.neutralSurface
  }
});

export const size = styleVariants({
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
});

export const fullWidth = style({
  width: "100%"
});

const makeGradient = (from: string, to: string, active: string, disabled: string) => ({
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
      color: themeVars.color.textInverse
    }
  }
});

export const toneSolid = styleVariants({
  primary: {
    backgroundColor: themeVars.color.accentPrimary,
    color: themeVars.color.textInverse,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.color.accentPrimaryHover
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.color.accentPrimaryActive
      },
      "&:disabled": {
        backgroundColor: themeVars.color.neutralDisabled,
        color: themeVars.color.textInverse,
        cursor: "not-allowed"
      }
    }
  },
  secondary: {
    backgroundColor: themeVars.color.accentSecondary,
    color: themeVars.color.textInverse,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.color.accentSecondaryHover
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.color.accentSecondaryActive
      },
      "&:disabled": {
        backgroundColor: themeVars.color.neutralDisabled,
        color: themeVars.color.textInverse,
        cursor: "not-allowed"
      }
    }
  },
  success: {
    backgroundColor: themeVars.color.accentSuccess,
    color: themeVars.color.textInverse,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.color.accentSuccessHover
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.color.accentSuccessActive
      },
      "&:disabled": {
        backgroundColor: themeVars.color.neutralDisabled,
        color: themeVars.color.textInverse,
        cursor: "not-allowed"
      }
    }
  },
  danger: {
    backgroundColor: themeVars.color.accentDanger,
    color: themeVars.color.textInverse,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.color.accentDangerHover
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.color.accentDangerActive
      },
      "&:disabled": {
        backgroundColor: themeVars.color.neutralDisabled,
        color: themeVars.color.textInverse,
        cursor: "not-allowed"
      }
    }
  },
  warning: {
    backgroundColor: themeVars.color.accentWarning,
    color: themeVars.color.textInverse,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.color.accentWarningHover
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.color.accentWarningActive
      },
      "&:disabled": {
        backgroundColor: themeVars.color.neutralDisabled,
        color: themeVars.color.textInverse,
        cursor: "not-allowed"
      }
    }
  },
  info: {
    backgroundColor: themeVars.color.accentInfo,
    color: themeVars.color.textInverse,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.color.accentInfoHover
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.color.accentInfoActive
      },
      "&:disabled": {
        backgroundColor: themeVars.color.neutralDisabled,
        color: themeVars.color.textInverse,
        cursor: "not-allowed"
      }
    }
  },
  dark: {
    backgroundColor: themeVars.color.accentDark,
    color: themeVars.color.textInverse,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.color.accentDarkHover
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.color.accentDarkActive
      },
      "&:disabled": {
        backgroundColor: themeVars.color.neutralDisabled,
        color: themeVars.color.textInverse,
        cursor: "not-allowed"
      }
    }
  },
  neutral: {
    backgroundColor: themeVars.color.accentSecondary,
    color: themeVars.color.textInverse
  }
});

export const toneOutline = styleVariants({
  primary: {
    borderColor: themeVars.color.accentPrimary,
    color: themeVars.color.accentPrimary,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: "#eef3ff"
      },
      "&:active:not(:disabled)": {
        backgroundColor: "#dfe7ff"
      },
      "&:disabled": {
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  },
  secondary: {
    borderColor: themeVars.color.accentSecondary,
    color: themeVars.color.accentSecondary,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: "#f5f6f8"
      },
      "&:active:not(:disabled)": {
        backgroundColor: "#eceef2"
      },
      "&:disabled": {
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  },
  success: {
    borderColor: themeVars.color.accentSuccess,
    color: themeVars.color.accentSuccess,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: "#eefaf3"
      },
      "&:active:not(:disabled)": {
        backgroundColor: "#d5f0de"
      },
      "&:disabled": {
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  },
  danger: {
    borderColor: themeVars.color.accentDanger,
    color: themeVars.color.accentDanger,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: "#fef0f0"
      },
      "&:active:not(:disabled)": {
        backgroundColor: "#f8dddd"
      },
      "&:disabled": {
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  },
  warning: {
    borderColor: themeVars.color.accentWarning,
    color: themeVars.color.accentWarningActive,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: "#fff8e7"
      },
      "&:active:not(:disabled)": {
        backgroundColor: "#f4ead1"
      },
      "&:disabled": {
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  },
  info: {
    borderColor: themeVars.color.accentInfo,
    color: themeVars.color.accentInfo,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: "#ecfbfe"
      },
      "&:active:not(:disabled)": {
        backgroundColor: "#d2f1f6"
      },
      "&:disabled": {
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  },
  dark: {
    borderColor: themeVars.color.accentDark,
    color: themeVars.color.accentDark,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: "#f0f2f6"
      },
      "&:active:not(:disabled)": {
        backgroundColor: "#e2e6ec"
      },
      "&:disabled": {
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  },
  neutral: {
    borderColor: themeVars.color.neutralBorderStrong,
    color: themeVars.color.textPrimary,
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: themeVars.color.neutralSurfaceAlt
      },
      "&:active:not(:disabled)": {
        backgroundColor: themeVars.color.neutralSurfaceRaised
      },
      "&:disabled": {
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  }
});

export const toneGradient = styleVariants({
  primary: makeGradient("#4e73ff", "#2f5bff", themeVars.color.accentPrimaryActive, "#8ea4ed"),
  secondary: makeGradient("#a6abb2", "#8a8f96", themeVars.color.accentSecondaryActive, "#b4b7bc"),
  success: makeGradient("#47cf7e", "#2fc56f", themeVars.color.accentSuccessActive, "#7ad4a3"),
  danger: makeGradient("#f06c6c", "#eb5757", "#f52929", "#e79a9a"),
  warning: makeGradient("#f4c94f", "#f0b319", themeVars.color.accentWarningActive, "#efd07b"),
  info: makeGradient("#2bc8dc", "#18bfd9", themeVars.color.accentInfoActive, "#60cfdd"),
  dark: makeGradient("#767676", "#555555", "#222222", "#a5a5a5"),
  neutral: makeGradient("#a6abb2", "#8a8f96", themeVars.color.accentSecondaryActive, "#b4b7bc")
});

export const content = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: themeVars.spacing.x2
});

export const icon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0,
  fontSize: "1em"
});

export const spinner = style({
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  border: "2px solid currentColor",
  borderRightColor: "transparent",
  animation: `${spin} 0.75s linear infinite`
});
