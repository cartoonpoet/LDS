import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  bluePalette,
  greenPalette,
  redPalette,
  yellowPalette,
  semanticColorRoles,
  themeVars,
} from "@lds/tokens";

export const root = recipe({
  base: {
    boxSizing: "border-box",
    display: "flex",
    gap: themeVars.spacing.x3,
    padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
    borderRadius: themeVars.radius.md,
    border: "1px solid transparent",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    lineHeight: 1.5,
    color: semanticColorRoles.text.primary,
  },
  variants: {
    intent: {
      info: {
        background: bluePalette[100],
        borderColor: themeVars.color.accentPrimary,
      },
      success: {
        background: greenPalette[100],
        borderColor: themeVars.color.accentSuccess,
      },
      warning: {
        background: yellowPalette[100],
        borderColor: themeVars.color.accentWarning,
      },
      danger: {
        background: redPalette[100],
        borderColor: themeVars.color.accentDanger,
      },
    },
  },
  defaultVariants: {
    intent: "info",
  },
});

export const icon = recipe({
  base: {
    flexShrink: 0,
    display: "inline-flex",
    marginTop: "1px",
  },
  variants: {
    intent: {
      info: { color: themeVars.color.accentPrimary },
      success: { color: themeVars.color.accentSuccessActive },
      warning: { color: themeVars.color.accentWarningActive },
      danger: { color: themeVars.color.accentDangerActive },
    },
  },
  defaultVariants: {
    intent: "info",
  },
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x1,
  minWidth: 0,
});

export const title = style({
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.heading,
});
