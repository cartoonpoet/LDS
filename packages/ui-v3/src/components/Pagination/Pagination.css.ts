import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x4,
  flexWrap: "wrap"
});

export const controls = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexWrap: "wrap"
});

export const pageList = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  flexWrap: "wrap"
});

export const pageItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px"
});

export const pageButton = recipe({
  base: {
    minWidth: "24px",
    height: "24px",
    padding: 0,
    borderRadius: "999px",
    border: "1px solid transparent",
    background: "transparent",
    color: semanticColorRoles.text.secondary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    lineHeight: 1,
    cursor: "pointer",
    transition: "border-color 120ms ease, background-color 120ms ease, color 120ms ease, box-shadow 120ms ease",
    selectors: {
      "&:hover:not(:disabled)": {
        color: semanticColorRoles.text.primary,
        background: semanticColorRoles.surface.subtle
      },
      "&:focus-visible": { outline: "none", boxShadow: themeVars.shadow.focus },
      "&:disabled": { color: semanticColorRoles.text.disabled, cursor: "not-allowed" }
    }
  },
  variants: {
    active: {
      true: {
        background: semanticColorRoles.button.solid.primary.background,
        color: semanticColorRoles.button.solid.primary.text,
        fontWeight: themeVars.font.weightBold
      },
      false: {}
    },
    kind: {
      number: { minWidth: "24px" },
      icon: {
        minWidth: "20px",
        width: "20px",
        height: "20px"
      },
      summary: {
        minWidth: "auto",
        padding: `0 ${themeVars.spacing.x1}`
      }
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
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
  color: semanticColorRoles.text.secondary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.4,
  fontWeight: themeVars.font.weightMedium
});

export const totalCount = style({
  color: semanticColorRoles.text.primary,
  fontWeight: themeVars.font.weightBold
});
