import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "grid",
  gap: themeVars.spacing.x4
});

export const dropzone = recipe({
  base: {
    display: "grid",
    gap: themeVars.spacing.x2,
    placeItems: "center",
    minHeight: "180px",
    padding: themeVars.spacing.x6,
    borderRadius: themeVars.radius.lg,
    border: `1px dashed ${semanticColorRoles.border.default}`,
    background: semanticColorRoles.surface.subtle,
    color: semanticColorRoles.text.secondary,
    textAlign: "center",
    cursor: "pointer"
  },
  variants: {
    dragging: {
      true: {
        borderColor: semanticColorRoles.button.solid.primary.background,
        boxShadow: themeVars.shadow.focus,
        color: semanticColorRoles.text.primary
      },
      false: {}
    }
  },
  defaultVariants: {
    dragging: false
  }
});

export const title = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.primary
});

export const helper = style({
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.6
});

export const hiddenInput = style({
  display: "none"
});

export const fileList = style({
  display: "grid",
  gap: themeVars.spacing.x2
});

export const fileItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x3,
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
  borderRadius: themeVars.radius.md,
  border: `1px solid ${semanticColorRoles.border.subtle}`,
  background: semanticColorRoles.surface.canvas
});

export const fileMeta = style({
  display: "grid",
  gap: themeVars.spacing.x1
});

export const fileName = style({
  color: semanticColorRoles.text.primary,
  fontWeight: themeVars.font.weightBold
});

export const fileSize = style({
  color: semanticColorRoles.text.secondary,
  fontSize: themeVars.font.sizeSm
});
