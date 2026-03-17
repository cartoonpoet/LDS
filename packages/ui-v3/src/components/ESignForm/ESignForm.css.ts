import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "grid",
  gap: themeVars.spacing.x4,
  padding: themeVars.spacing.x5,
  borderRadius: themeVars.radius.lg,
  border: `1px solid ${semanticColorRoles.border.default}`,
  background: semanticColorRoles.surface.canvas
});

export const header = style({
  display: "grid",
  gap: themeVars.spacing.x2
});

export const title = style({
  fontSize: themeVars.font.sizeLg,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.primary
});

export const description = style({
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary,
  lineHeight: 1.6
});

export const fieldGrid = recipe({
  base: {
    display: "grid",
    gap: themeVars.spacing.x3
  },
  variants: {
    columns: {
      1: { gridTemplateColumns: "minmax(0, 1fr)" },
      2: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }
    }
  },
  defaultVariants: {
    columns: 1
  }
});

export const agreement = style({
  display: "flex",
  alignItems: "flex-start",
  gap: themeVars.spacing.x2,
  padding: themeVars.spacing.x3,
  borderRadius: themeVars.radius.md,
  background: semanticColorRoles.surface.subtle,
  color: semanticColorRoles.text.secondary,
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.6
});

export const checkbox = style({
  marginTop: "2px"
});

export const signatures = style({
  display: "grid",
  gap: themeVars.spacing.x3
});

export const signatureCard = recipe({
  base: {
    display: "grid",
    gap: themeVars.spacing.x2,
    padding: themeVars.spacing.x4,
    borderRadius: themeVars.radius.md,
    border: `1px solid ${semanticColorRoles.border.subtle}`,
    background: semanticColorRoles.surface.canvas
  },
  variants: {
    signed: {
      true: { borderColor: semanticColorRoles.status.success.border },
      false: {}
    }
  },
  defaultVariants: {
    signed: false
  }
});

export const signatureHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x3
});

export const signatureName = style({
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.primary
});

export const signatureMeta = style({
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: themeVars.spacing.x2,
  flexWrap: "wrap"
});
