import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: themeVars.spacing.x2,
  padding: `${themeVars.spacing.x6} ${themeVars.spacing.x4}`,
  textAlign: "center",
});

export const icon = style({
  color: semanticColorRoles.border.strong,
  marginBottom: themeVars.spacing.x1,
});

export const title = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.heading,
});

export const description = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary,
});

export const action = style({
  marginTop: themeVars.spacing.x2,
});
