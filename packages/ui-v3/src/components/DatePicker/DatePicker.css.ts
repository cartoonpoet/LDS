import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const stack = style({
  display: "grid",
  gap: themeVars.spacing.x1,
  width: "100%"
});

export const inline = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: themeVars.spacing.x3,
  width: "100%"
});

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
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "38px",
    borderRadius: themeVars.radius.sm,
    border: `1px solid ${semanticColorRoles.field.border}`,
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
    }
  },
  variants: {
    size: {
      sm: { minHeight: "32px" },
      md: {},
      lg: { minHeight: "44px" }
    },
    invalid: {
      true: {
        borderColor: semanticColorRoles.status.danger.border,
        selectors: {
          "&:hover": { borderColor: semanticColorRoles.status.danger.border },
          "&:focus-within": {
            borderColor: semanticColorRoles.status.danger.border,
            boxShadow: `0 0 0 3px ${semanticColorRoles.status.danger.fill}`
          }
        }
      },
      false: {}
    }
  },
  defaultVariants: {
    size: "md",
    invalid: false
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
    paddingRight: `calc(${themeVars.spacing.x6} + ${themeVars.spacing.x1})`,
    selectors: {
      "&::-webkit-calendar-picker-indicator": {
        opacity: 0,
        position: "absolute",
        inset: 0,
        cursor: "pointer"
      },
      "&:disabled": {
        color: semanticColorRoles.text.disabled,
        cursor: "not-allowed"
      }
    }
  },
  variants: {
    size: {
      sm: { fontSize: themeVars.font.sizeSm },
      md: {},
      lg: { fontSize: themeVars.font.sizeLg, paddingLeft: themeVars.spacing.x4, paddingRight: `calc(${themeVars.spacing.x6} + ${themeVars.spacing.x2})` }
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const icon = style({
  position: "absolute",
  right: themeVars.spacing.x3,
  top: "50%",
  transform: "translateY(-50%)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: semanticColorRoles.field.icon,
  pointerEvents: "none"
});

export const helperText = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    lineHeight: 1.4
  },
  variants: {
    tone: {
      neutral: { color: semanticColorRoles.field.helper },
      danger: { color: semanticColorRoles.status.danger.text }
    }
  },
  defaultVariants: {
    tone: "neutral"
  }
});
