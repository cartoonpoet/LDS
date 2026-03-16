import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const alert = recipe({
  base: {
    display: "grid",
    gap: themeVars.spacing.x2,
    width: "100%",
    padding: `6px ${themeVars.spacing.x3}`,
    border: "1px solid transparent",
    borderRadius: themeVars.radius.sm,
    fontFamily: themeVars.font.family,
    boxSizing: "border-box"
  },
  variants: {
    tone: {
      info: {
        backgroundColor: semanticColorRoles.alert.info.background,
        borderColor: semanticColorRoles.alert.info.border,
        color: semanticColorRoles.alert.info.text
      },
      neutral: {
        backgroundColor: semanticColorRoles.alert.neutral.background,
        borderColor: semanticColorRoles.alert.neutral.border,
        color: semanticColorRoles.alert.neutral.text
      }
    },
    withAction: {
      true: {
        gridTemplateColumns: "1fr auto"
      },
      false: {}
    }
  },
  defaultVariants: {
    tone: "info",
    withAction: false
  }
});

export const body = style({
  display: "flex",
  alignItems: "flex-start",
  gap: themeVars.spacing.x2,
  minWidth: 0
});

export const icon = recipe({
  base: {
    flexShrink: 0,
    fontSize: "12px",
    lineHeight: 1,
    marginTop: "1px"
  },
  variants: {
    tone: {
      info: {
        color: semanticColorRoles.alert.info.icon
      },
      neutral: {
        color: semanticColorRoles.alert.neutral.icon
      }
    }
  },
  defaultVariants: {
    tone: "info"
  }
});

export const textWrap = style({
  minWidth: 0
});

export const title = style({
  margin: 0,
  color: semanticColorRoles.text.heading,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold,
  lineHeight: 1.4
});

export const description = style({
  color: semanticColorRoles.text.heading,
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.4
});

export const actionRow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  justifySelf: "end",
  alignSelf: "center"
});

export const actionButton = recipe({
  base: {
    minWidth: "42px",
    height: "24px",
    padding: `0 ${themeVars.spacing.x2}`,
    border: 0,
    borderRadius: themeVars.radius.sm,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightBold,
    lineHeight: 1,
    cursor: "pointer",
    transition: "background-color 120ms ease, box-shadow 120ms ease, transform 80ms ease",
    selectors: {
      "&:hover": {
        boxShadow: themeVars.shadow.raised
      },
      "&:active": {
        transform: "translateY(1px)",
        boxShadow: "none"
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus
      }
    }
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: semanticColorRoles.alert.action.primary.background,
        color: semanticColorRoles.alert.action.primary.text,
        selectors: {
          "&:hover": {
            backgroundColor: semanticColorRoles.alert.action.primary.hover,
            boxShadow: themeVars.shadow.raised
          },
          "&:active": {
            backgroundColor: semanticColorRoles.alert.action.primary.active,
            transform: "translateY(1px)",
            boxShadow: "none"
          }
        }
      },
      warning: {
        backgroundColor: semanticColorRoles.alert.action.warning.background,
        color: semanticColorRoles.alert.action.warning.text,
        selectors: {
          "&:hover": {
            backgroundColor: semanticColorRoles.alert.action.warning.hover,
            boxShadow: themeVars.shadow.raised
          },
          "&:active": {
            backgroundColor: semanticColorRoles.alert.action.warning.active,
            transform: "translateY(1px)",
            boxShadow: "none"
          }
        }
      }
    }
  },
  defaultVariants: {
    tone: "primary"
  }
});

export const closeButton = style({
  border: 0,
  background: "transparent",
  color: semanticColorRoles.text.heading,
  cursor: "pointer",
  padding: 0,
  fontSize: "14px",
  lineHeight: 1
});
