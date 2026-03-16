import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: themeVars.radius.lg,
  overflow: "hidden",
  border: `1px solid ${semanticColorRoles.border.default}`,
  background: semanticColorRoles.surface.canvas,
  minHeight: "320px"
});

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x3,
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
  background: semanticColorRoles.surface.subtle,
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`
});

export const toolbarGroup = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexWrap: "wrap"
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x1,
  minWidth: 0
});

export const title = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.primary
});

export const description = style({
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary
});

export const viewport = recipe({
  base: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: themeVars.spacing.x5,
    background: semanticColorRoles.surface.subtle,
    overflow: "auto"
  },
  variants: {
    mode: {
      page: {},
      embed: { padding: 0, background: semanticColorRoles.surface.canvas }
    }
  },
  defaultVariants: {
    mode: "page"
  }
});

export const page = style({
  width: "100%",
  maxWidth: "960px",
  minHeight: "100%",
  padding: themeVars.spacing.x6,
  borderRadius: themeVars.radius.md,
  background: semanticColorRoles.surface.canvas,
  boxShadow: themeVars.shadow.raised,
  boxSizing: "border-box"
});

export const meta = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary
});
