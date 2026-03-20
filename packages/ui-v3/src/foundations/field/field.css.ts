import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";
import { sprinkles } from "../../styles/sprinkles.css";

export const fieldRoot = style([
  sprinkles({
    display: "grid",
    gap: "x1",
    width: "100%"
  })
]);

export const fieldLabelRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x2
});

export const fieldLabel = style({
  color: semanticColorRoles.field.label,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: 1.4
});

export const fieldCaption = style({
  color: semanticColorRoles.text.tertiary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.4
});

export const fieldRequiredMark = style({
  color: semanticColorRoles.status.danger.text,
  marginLeft: themeVars.spacing.x1
});

export const fieldHelperText = recipe({
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
      danger: {
        color: semanticColorRoles.status.danger.text
      }
    }
  },
  defaultVariants: {
    tone: "default"
  }
});

export const fieldControlShell = recipe({
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
      danger: {
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

export const fieldAdornment = style([
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
