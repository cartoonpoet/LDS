import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";
import { sprinkles } from "../../styles/sprinkles.css";

export const root = style([
  sprinkles({
    display: "grid",
    gap: "x1",
    width: "100%"
  })
]);

export const label = style({
  color: themeVars.color.textMuted,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: 1.4
});

export const controlShell = recipe({
  base: {
    position: "relative",
    width: "100%"
  },
  variants: {
    size: {
      sm: {},
      md: {},
      lg: {}
    },
    invalid: {
      true: {},
      false: {}
    },
    multiple: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      variants: {
        invalid: true
      },
      style: {
        selectors: {
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: themeVars.radius.sm,
            boxShadow: `inset 0 0 0 1px ${themeVars.color.accentDanger}`,
            pointerEvents: "none"
          }
        }
      }
    }
  ],
  defaultVariants: {
    size: "md",
    invalid: false,
    multiple: false
  }
});

export const control = recipe({
  base: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    minHeight: "34px",
    padding: `0 ${themeVars.spacing.x3}`,
    border: `1px solid ${themeVars.color.neutralBorder}`,
    borderRadius: themeVars.radius.sm,
    backgroundColor: themeVars.color.neutralSurface,
    color: themeVars.color.textPrimary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    lineHeight: 1.4,
    outline: "none",
    appearance: "none",
    transition: "border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
    "@media": {
      "screen and (max-width: 767px)": {
        minHeight: "38px",
        fontSize: themeVars.font.sizeLg
      }
    },
    selectors: {
      "&:focus": {
        borderColor: themeVars.color.accentPrimary,
        boxShadow: themeVars.shadow.focus
      },
      "&:disabled": {
        backgroundColor: themeVars.color.neutralDisabled,
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  },
  variants: {
    size: {
      sm: {
        minHeight: "30px",
        padding: `0 ${themeVars.spacing.x3}`,
        fontSize: themeVars.font.sizeSm,
        "@media": {
          "screen and (max-width: 767px)": {
            minHeight: "34px",
            fontSize: themeVars.font.sizeMd
          }
        }
      },
      md: {},
      lg: {
        minHeight: "40px",
        padding: `0 ${themeVars.spacing.x4}`,
        fontSize: themeVars.font.sizeLg,
        "@media": {
          "screen and (max-width: 767px)": {
            minHeight: "42px"
          }
        }
      }
    },
    invalid: {
      true: {
        borderColor: themeVars.color.accentDanger,
        selectors: {
          "&:focus": {
            borderColor: themeVars.color.accentDanger,
            boxShadow: "0 0 0 3px rgba(235, 87, 87, 0.14)"
          }
        }
      },
      false: {}
    },
    hasPlaceholder: {
      true: {
        selectors: {
          "&:required:invalid": {
            color: themeVars.color.textMuted
          }
        }
      },
      false: {}
    },
    multiple: {
      true: {
        minHeight: "88px",
        paddingTop: themeVars.spacing.x2,
        paddingBottom: themeVars.spacing.x2,
        paddingRight: themeVars.spacing.x3,
        backgroundImage: "none"
      },
      false: {
        paddingRight: themeVars.spacing.x6
      }
    }
  },
  compoundVariants: [
    {
      variants: {
        size: "sm",
        multiple: true
      },
      style: {
        minHeight: "76px"
      }
    },
    {
      variants: {
        size: "lg",
        multiple: true
      },
      style: {
        minHeight: "104px"
      }
    }
  ],
  defaultVariants: {
    size: "md",
    invalid: false,
    hasPlaceholder: false,
    multiple: false
  }
});

export const indicator = recipe({
  base: {
    position: "absolute",
    top: "50%",
    right: themeVars.spacing.x3,
    transform: "translateY(-50%)",
    width: "10px",
    height: "6px",
    pointerEvents: "none",
    color: themeVars.color.textMuted,
    selectors: {
      "select:disabled + &": {
        color: themeVars.color.textDisabled
      }
    }
  },
  variants: {
    hidden: {
      true: {
        display: "none"
      },
      false: {}
    }
  },
  defaultVariants: {
    hidden: false
  }
});

export const helperText = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    lineHeight: 1.4
  },
  variants: {
    tone: {
      neutral: {
        color: themeVars.color.textMuted
      },
      danger: {
        color: themeVars.color.accentDanger
      }
    }
  },
  defaultVariants: {
    tone: "neutral"
  }
});

