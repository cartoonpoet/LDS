import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

export const alert = recipe({
  base: {
    display: "grid",
    gap: themeVars.spacing.x2,
    width: "100%",
    padding: `6px ${themeVars.spacing.x3}`,
    borderRadius: themeVars.radius.sm,
    fontFamily: themeVars.font.family,
    boxSizing: "border-box"
  },
  variants: {
    tone: {
      info: {
        backgroundColor: "#dff5fb",
        color: themeVars.color.textHeading
      },
      neutral: {
        backgroundColor: "#eceef2",
        color: themeVars.color.textHeading
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

export const icon = style({
  flexShrink: 0,
  fontSize: "12px",
  lineHeight: 1,
  marginTop: "1px",
  color: themeVars.color.textSecondary
});

export const textWrap = style({
  minWidth: 0
});

export const title = style({
  margin: 0,
  color: themeVars.color.textHeading,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold,
  lineHeight: 1.4
});

export const description = style({
  color: themeVars.color.textHeading,
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
    cursor: "pointer"
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: themeVars.color.accentPrimary,
        color: themeVars.color.textInverse
      },
      warning: {
        backgroundColor: themeVars.color.accentWarning,
        color: themeVars.color.textInverse
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
  color: themeVars.color.textHeading,
  cursor: "pointer",
  padding: 0,
  fontSize: "14px",
  lineHeight: 1
});
