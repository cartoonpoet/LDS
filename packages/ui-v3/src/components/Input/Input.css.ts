import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";
import { sprinkles } from "../../styles/sprinkles.css";

export const root = style([
  sprinkles({
    display: "grid",
    gap: "x1",
    width: "100%"
  })
]);

export const label = style({
  color: semanticColorRoles.field.label,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: 1.4
});

export const requiredMark = style({
  color: semanticColorRoles.status.danger.text,
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
      border: `1px solid ${semanticColorRoles.field.border}`,
      borderRadius: themeVars.radius.sm,
      backgroundColor: semanticColorRoles.field.background,
      transition: "border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
      selectors: {
        "&:hover": {
          borderColor: semanticColorRoles.field.borderHover
        },
        "&:focus-within": {
          borderColor: semanticColorRoles.field.borderFocus,
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
        borderColor: semanticColorRoles.status.success.border,
        selectors: {
          "&:hover": {
            borderColor: semanticColorRoles.status.success.border
          },
          "&:focus-within": {
            borderColor: semanticColorRoles.status.success.border,
            boxShadow: `0 0 0 3px ${semanticColorRoles.status.success.fill}`
          }
        }
      },
      error: {
        borderColor: semanticColorRoles.status.danger.border,
        selectors: {
          "&:hover": {
            borderColor: semanticColorRoles.status.danger.border
          },
          "&:focus-within": {
            borderColor: semanticColorRoles.status.danger.border,
            boxShadow: `0 0 0 3px ${semanticColorRoles.status.danger.fill}`
          }
        }
      }
    },
    disabled: {
      true: {
        backgroundColor: semanticColorRoles.field.backgroundDisabled,
        borderColor: semanticColorRoles.field.border,
        cursor: "not-allowed",
        selectors: {
          "&:hover": {
            borderColor: semanticColorRoles.field.border
          }
        }
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
    color: semanticColorRoles.field.text,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    lineHeight: 1.4,
    outline: "none",
    boxSizing: "border-box",
    padding: `0 ${themeVars.spacing.x3}`,
    selectors: {
      "&::placeholder": {
        color: semanticColorRoles.field.placeholder
      },
      "&:disabled": {
        color: semanticColorRoles.text.disabled,
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
    color: semanticColorRoles.field.icon,
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
        color: semanticColorRoles.field.helper
      },
      success: {
        color: semanticColorRoles.status.success.text
      },
      error: {
        color: semanticColorRoles.status.danger.text
      }
    }
  },
  defaultVariants: {
    tone: "default"
  }
});
