import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: themeVars.spacing.x1,
    minHeight: "18px",
    padding: "0 6px",
    borderRadius: themeVars.radius.sm,
    border: "1px solid transparent",
    fontFamily: themeVars.font.family,
    fontSize: "10px",
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  },
  variants: {
    variant: {
      filled: {},
      outline: {},
      muted: {}
    },
    tone: {
      primary: {},
      neutral: {}
    },
    iconOnly: {
      true: {
        width: "18px",
        minWidth: "18px",
        padding: 0
      },
      false: {}
    }
  },
  compoundVariants: [
    {
      variants: { variant: "filled", tone: "primary" },
      style: {
        backgroundColor: semanticColorRoles.badge.filled.primary.background,
        color: semanticColorRoles.badge.filled.primary.text
      }
    },
    {
      variants: { variant: "filled", tone: "neutral" },
      style: {
        backgroundColor: semanticColorRoles.badge.filled.neutral.background,
        color: semanticColorRoles.badge.filled.neutral.text
      }
    },
    {
      variants: { variant: "outline", tone: "primary" },
      style: {
        backgroundColor: semanticColorRoles.badge.outline.primary.background,
        borderColor: semanticColorRoles.badge.outline.primary.border,
        color: semanticColorRoles.badge.outline.primary.text
      }
    },
    {
      variants: { variant: "outline", tone: "neutral" },
      style: {
        backgroundColor: semanticColorRoles.badge.outline.neutral.background,
        borderColor: semanticColorRoles.badge.outline.neutral.border,
        color: semanticColorRoles.badge.outline.neutral.text
      }
    },
    {
      variants: { variant: "muted", tone: "primary" },
      style: {
        backgroundColor: semanticColorRoles.badge.muted.primary.background,
        borderColor: semanticColorRoles.badge.muted.primary.border,
        color: semanticColorRoles.badge.muted.primary.text
      }
    },
    {
      variants: { variant: "muted", tone: "neutral" },
      style: {
        backgroundColor: semanticColorRoles.badge.muted.neutral.background,
        borderColor: semanticColorRoles.badge.muted.neutral.border,
        color: semanticColorRoles.badge.muted.neutral.text
      }
    }
  ],
  defaultVariants: {
    variant: "filled",
    tone: "primary",
    iconOnly: false
  }
});

export const icon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "9px",
  lineHeight: 1
});

export const dismissButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "10px",
  height: "10px",
  padding: 0,
  border: 0,
  background: "transparent",
  color: "inherit",
  fontSize: "10px",
  lineHeight: 1,
  cursor: "pointer"
});
