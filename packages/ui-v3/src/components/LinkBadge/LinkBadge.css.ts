import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

export const linkBadge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    minHeight: "18px",
    padding: "0 6px",
    borderRadius: themeVars.radius.sm,
    border: "1px solid transparent",
    fontFamily: themeVars.font.family,
    fontSize: "10px",
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    textDecoration: "none",
    cursor: "pointer",
    selectors: {
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus
      },
      "&:hover": {
        textDecoration: "underline",
        textUnderlineOffset: "2px"
      }
    }
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
    }
  },
  compoundVariants: [
    {
      variants: { variant: "filled", tone: "primary" },
      style: {
        backgroundColor: themeVars.color.accentPrimary,
        color: themeVars.color.textInverse
      }
    },
    {
      variants: { variant: "filled", tone: "neutral" },
      style: {
        backgroundColor: themeVars.color.accentSecondary,
        color: themeVars.color.textInverse
      }
    },
    {
      variants: { variant: "outline", tone: "primary" },
      style: {
        backgroundColor: themeVars.color.neutralSurface,
        borderColor: "#b7c7ff",
        color: themeVars.color.accentPrimary
      }
    },
    {
      variants: { variant: "outline", tone: "neutral" },
      style: {
        backgroundColor: themeVars.color.neutralSurface,
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textSecondary
      }
    },
    {
      variants: { variant: "muted", tone: "primary" },
      style: {
        backgroundColor: "#f5f7ff",
        borderColor: "#dde5ff",
        color: "#7c8fc9"
      }
    },
    {
      variants: { variant: "muted", tone: "neutral" },
      style: {
        backgroundColor: "#fafbfc",
        borderColor: "#e7ebf2",
        color: "#99a3b3"
      }
    }
  ],
  defaultVariants: {
    variant: "outline",
    tone: "primary"
  }
});

export const icon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "9px",
  lineHeight: 1
});

export const externalIcon = style({
  fontSize: "9px",
  lineHeight: 1,
  opacity: 0.75
});
