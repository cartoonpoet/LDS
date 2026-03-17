import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x3,
  flexWrap: "wrap"
});

export const controls = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
  flexWrap: "wrap"
});

export const pageList = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
  flexWrap: "wrap"
});

export const pageItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x1
});

export const pageButton = recipe({
  base: {
    minWidth: "32px",
    height: "32px",
    padding: `0 ${themeVars.spacing.x2}`,
    borderRadius: themeVars.radius.sm,
    border: `1px solid ${semanticColorRoles.field.border}`,
    background: semanticColorRoles.surface.canvas,
    color: semanticColorRoles.text.primary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    lineHeight: 1,
    cursor: "pointer",
    transition: "border-color 120ms ease, background-color 120ms ease, color 120ms ease, box-shadow 120ms ease",
    selectors: {
      "&:hover:not(:disabled)": { borderColor: semanticColorRoles.field.borderHover, background: semanticColorRoles.surface.subtle },
      "&:focus-visible": { outline: "none", boxShadow: themeVars.shadow.focus },
      "&:disabled": { color: semanticColorRoles.text.disabled, cursor: "not-allowed", background: semanticColorRoles.surface.canvas }
    }
  },
  variants: {
    active: {
      true: {
        background: semanticColorRoles.button.solid.primary.background,
        borderColor: semanticColorRoles.button.solid.primary.background,
        color: semanticColorRoles.button.solid.primary.text,
        fontWeight: themeVars.font.weightBold
      },
      false: {}
    },
    kind: {
      number: { minWidth: "32px" },
      text: { minWidth: "48px", padding: `0 ${themeVars.spacing.x3}` }
    }
  },
  defaultVariants: { active: false, kind: "number" }
});

export const ellipsis = style({
  minWidth: "12px",
  textAlign: "center",
  color: semanticColorRoles.text.tertiary,
  fontSize: themeVars.font.sizeSm
});

export const summary = style({
  margin: 0,
  color: semanticColorRoles.text.secondary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.4
});
