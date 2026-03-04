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

export const requiredMark = style({
  color: themeVars.color.accentDanger,
  marginLeft: themeVars.spacing.x1
});

export const controlShell = recipe({
  base: [
    sprinkles({
      display: "flex",
      alignItems: "center",
      width: "100%"
    }),
    {
      minHeight: "34px",
      border: `1px solid ${themeVars.color.neutralBorder}`,
      borderRadius: themeVars.radius.sm,
      backgroundColor: themeVars.color.neutralSurface,
      transition: "border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
      selectors: {
        "&:focus-within": {
          borderColor: themeVars.color.accentPrimary,
          boxShadow: themeVars.shadow.focus
        }
      },
      "@media": {
        "screen and (max-width: 767px)": {
          minHeight: "38px"
        }
      }
    }
  ],
  variants: {
    size: {
      sm: {
        minHeight: "30px"
      },
      md: {},
      lg: {
        minHeight: "40px"
      }
    },
    tone: {
      default: {},
      success: {
        borderColor: themeVars.color.accentSuccess,
        selectors: {
          "&:focus-within": {
            borderColor: themeVars.color.accentSuccess,
            boxShadow: "0 0 0 3px rgba(47, 197, 111, 0.14)"
          }
        }
      },
      error: {
        borderColor: themeVars.color.accentDanger,
        selectors: {
          "&:focus-within": {
            borderColor: themeVars.color.accentDanger,
            boxShadow: "0 0 0 3px rgba(235, 87, 87, 0.14)"
          }
        }
      }
    },
    disabled: {
      true: {
        backgroundColor: themeVars.color.neutralDisabled,
        borderColor: themeVars.color.neutralBorder,
        cursor: "not-allowed"
      },
      false: {}
    }
  },
  defaultVariants: {
    size: "md",
    tone: "default",
    disabled: false
  }
});

export const input = recipe({
  base: {
    width: "100%",
    minWidth: 0,
    border: 0,
    background: "transparent",
    color: themeVars.color.textPrimary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    lineHeight: 1.4,
    outline: "none",
    padding: `0 ${themeVars.spacing.x3}`,
    selectors: {
      "&::placeholder": {
        color: themeVars.color.textMuted
      },
      "&:disabled": {
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    },
    "@media": {
      "screen and (max-width: 767px)": {
        fontSize: themeVars.font.sizeLg
      }
    }
  },
  variants: {
    size: {
      sm: {
        fontSize: themeVars.font.sizeSm
      },
      md: {},
      lg: {
        fontSize: themeVars.font.sizeLg
      }
    },
    hasPrefix: {
      true: {
        paddingLeft: themeVars.spacing.x2
      },
      false: {}
    },
    hasSuffix: {
      true: {
        paddingRight: themeVars.spacing.x2
      },
      false: {}
    }
  },
  defaultVariants: {
    size: "md",
    hasPrefix: false,
    hasSuffix: false
  }
});

export const adornment = style([
  sprinkles({
    display: "inline-flex",
    alignItems: "center"
  }),
  {
    color: themeVars.color.textMuted,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    paddingInline: themeVars.spacing.x3,
    whiteSpace: "nowrap"
  }
]);

export const helperText = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    lineHeight: 1.4
  },
  variants: {
    tone: {
      default: {
        color: themeVars.color.textMuted
      },
      success: {
        color: themeVars.color.accentSuccess
      },
      error: {
        color: themeVars.color.accentDanger
      }
    }
  },
  defaultVariants: {
    tone: "default"
  }
});
