import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

export const chip = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: themeVars.spacing.x1,
    minHeight: "22px",
    padding: `0 ${themeVars.spacing.x2}`,
    borderRadius: "999px",
    border: `1px solid ${themeVars.color.neutralBorder}`,
    backgroundColor: themeVars.color.neutralSurface,
    color: themeVars.color.textSecondary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  },
  variants: {
    kind: {
      basic: {},
      check: {
        minHeight: "24px",
        paddingLeft: themeVars.spacing.x1
      },
      file: {
        minHeight: "20px",
        paddingRight: themeVars.spacing.x1,
        borderRadius: themeVars.radius.sm
      },
      link: {
        minHeight: "20px",
        paddingRight: themeVars.spacing.x1,
        borderRadius: themeVars.radius.sm,
        color: themeVars.color.accentPrimary
      }
    },
    selected: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      variants: { kind: "basic", selected: true },
      style: {
        borderColor: "#b7c7ff",
        backgroundColor: "#eef3ff",
        color: themeVars.color.accentPrimary
      }
    },
    {
      variants: { kind: "check", selected: true },
      style: {
        borderColor: "#b7c7ff",
        backgroundColor: "#eef3ff",
        color: themeVars.color.accentPrimary
      }
    },
    {
      variants: { kind: "file", selected: true },
      style: {
        borderColor: "#cce7d8",
        backgroundColor: "#f5fcf8"
      }
    },
    {
      variants: { kind: "link", selected: true },
      style: {
        borderColor: "#d8e3ff",
        backgroundColor: "#f7f9ff"
      }
    }
  ],
  defaultVariants: {
    kind: "basic",
    selected: false
  }
});

export const leading = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  lineHeight: 1,
  flexShrink: 0
});

export const checkIndicator = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "14px",
  height: "14px",
  borderRadius: "999px",
  border: `1px solid ${themeVars.color.neutralBorderStrong}`,
  backgroundColor: themeVars.color.neutralSurface,
  color: themeVars.color.accentPrimary,
  fontSize: "9px",
  lineHeight: 1,
  boxSizing: "border-box"
});

export const label = style({
  minWidth: 0
});

export const metaText = recipe({
  base: {
    fontSize: "10px",
    lineHeight: 1,
    fontWeight: themeVars.font.weightMedium
  },
  variants: {
    kind: {
      file: {
        color: themeVars.color.accentSuccess
      },
      link: {
        color: themeVars.color.accentPrimary
      }
    }
  }
});

export const dismissButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "10px",
  height: "10px",
  border: 0,
  background: "transparent",
  padding: 0,
  color: "inherit",
  fontSize: "10px",
  lineHeight: 1,
  cursor: "pointer",
  flexShrink: 0
});
