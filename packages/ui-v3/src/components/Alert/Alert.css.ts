import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

export const alert = recipe({
  base: {
    display: "grid",
    gap: themeVars.spacing.x2,
    width: "100%",
    padding: themeVars.spacing.x3,
    borderRadius: themeVars.radius.sm,
    border: "1px solid transparent",
    fontFamily: themeVars.font.family
  },
  variants: {
    tone: {
      info: {
        backgroundColor: "#ecfbfe",
        borderColor: "#c9eef5"
      },
      success: {
        backgroundColor: "#eefaf3",
        borderColor: "#cdebd9"
      },
      warning: {
        backgroundColor: "#fff8e7",
        borderColor: "#f4e0aa"
      },
      danger: {
        backgroundColor: "#fef0f0",
        borderColor: "#f4c5c5"
      },
      neutral: {
        backgroundColor: themeVars.color.neutralSurfaceAlt,
        borderColor: themeVars.color.neutralBorder
      }
    }
  },
  defaultVariants: {
    tone: "info"
  }
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x2
});

export const title = style({
  margin: 0,
  color: themeVars.color.textHeading,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: 1.4
});

export const content = style({
  color: themeVars.color.textSecondary,
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.5
});

export const actionRow = style({
  display: "flex",
  gap: themeVars.spacing.x2,
  justifyContent: "flex-end"
});

export const closeButton = style({
  border: 0,
  background: "transparent",
  color: themeVars.color.textMuted,
  cursor: "pointer",
  padding: 0,
  fontSize: themeVars.font.sizeMd,
  lineHeight: 1
});
