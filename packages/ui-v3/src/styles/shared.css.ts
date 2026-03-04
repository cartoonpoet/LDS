import { style } from "@vanilla-extract/css";
import { themeVars } from "@lds/tokens";

export const fieldShell = style({
  display: "grid",
  gap: themeVars.spacing.x1
});

export const fieldLabel = style({
  color: themeVars.color.textMuted,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: 1.4
});

export const fieldControl = style({
  width: "100%",
  minHeight: "34px",
  padding: `0 ${themeVars.spacing.x3}`,
  border: `1px solid ${themeVars.color.neutralBorder}`,
  borderRadius: themeVars.radius.sm,
  backgroundColor: themeVars.color.neutralSurface,
  color: themeVars.color.textPrimary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  outline: "none",
  transition: "border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
  selectors: {
    "&:focus": {
      borderColor: themeVars.color.accentPrimary,
      boxShadow: themeVars.shadow.focus
    },
    "&::placeholder": {
      color: themeVars.color.textMuted
    },
    "&:disabled": {
      backgroundColor: themeVars.color.neutralDisabled,
      borderColor: themeVars.color.neutralBorder,
      color: themeVars.color.textDisabled,
      cursor: "not-allowed"
    }
  }
});
