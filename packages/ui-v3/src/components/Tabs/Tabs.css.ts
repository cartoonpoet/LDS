import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

export const root = style({
  display: "grid",
  gap: themeVars.spacing.x2,
  width: "100%"
});

export const list = style({
  display: "flex",
  gap: themeVars.spacing.x1,
  width: "100%",
  overflowX: "auto"
});

export const tab = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "36px",
    padding: `0 ${themeVars.spacing.x3}`,
    borderRadius: themeVars.radius.sm,
    border: `1px solid ${themeVars.color.neutralBorder}`,
    backgroundColor: themeVars.color.neutralSurface,
    color: themeVars.color.textSecondary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightMedium,
    whiteSpace: "nowrap",
    cursor: "pointer",
    selectors: {
      "&:disabled": {
        opacity: 0.6,
        cursor: "not-allowed"
      }
    }
  },
  variants: {
    active: {
      true: {
        borderColor: themeVars.color.accentPrimary,
        backgroundColor: "#eef3ff",
        color: themeVars.color.accentPrimary,
        fontWeight: themeVars.font.weightBold
      },
      false: {}
    },
    stretched: {
      true: {
        flex: 1
      },
      false: {}
    }
  },
  defaultVariants: {
    active: false,
    stretched: false
  }
});

export const panel = style({
  padding: themeVars.spacing.x3,
  borderRadius: themeVars.radius.sm,
  border: `1px solid ${themeVars.color.neutralBorder}`,
  backgroundColor: themeVars.color.neutralSurface,
  color: themeVars.color.textSecondary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  lineHeight: 1.5
});
