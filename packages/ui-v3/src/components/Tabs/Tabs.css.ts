import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

export const root = style({
  display: "grid",
  gap: themeVars.spacing.x2,
  width: "100%"
});

export const list = recipe({
  base: {
    display: "flex",
    gap: "2px",
    width: "100%",
    overflowX: "auto",
    borderBottom: `1px solid ${themeVars.color.neutralBorder}`
  },
  variants: {
    variant: {
      line: {},
      segment: {
        gap: themeVars.spacing.x1,
        borderBottom: 0
      }
    }
  },
  defaultVariants: {
    variant: "line"
  }
});

export const tab = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "28px",
    padding: `0 ${themeVars.spacing.x3}`,
    border: 0,
    backgroundColor: "transparent",
    color: "#8e95a5",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightMedium,
    whiteSpace: "nowrap",
    cursor: "pointer",
    selectors: {
      "&:disabled": {
        opacity: 0.5,
        cursor: "not-allowed"
      }
    }
  },
  variants: {
    active: {
      true: {},
      false: {}
    },
    stretched: {
      true: {
        flex: 1
      },
      false: {}
    },
    variant: {
      line: {},
      segment: {
        minHeight: "26px",
        borderRadius: themeVars.radius.sm,
        border: `1px solid ${themeVars.color.neutralBorder}`,
        backgroundColor: themeVars.color.neutralSurface
      }
    }
  },
  compoundVariants: [
    {
      variants: { variant: "line", active: true },
      style: {
        color: themeVars.color.accentPrimary,
        boxShadow: `inset 0 -2px 0 ${themeVars.color.accentPrimary}`,
        fontWeight: themeVars.font.weightBold
      }
    },
    {
      variants: { variant: "segment", active: true },
      style: {
        borderColor: themeVars.color.accentPrimary,
        backgroundColor: themeVars.color.accentPrimary,
        color: themeVars.color.textInverse,
        fontWeight: themeVars.font.weightBold
      }
    }
  ],
  defaultVariants: {
    active: false,
    stretched: false,
    variant: "line"
  }
});

export const panel = style({
  paddingTop: themeVars.spacing.x2,
  color: themeVars.color.textSecondary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  lineHeight: 1.5
});
