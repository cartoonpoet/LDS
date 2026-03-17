import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  width: 280,
  padding: themeVars.spacing.x4,
  borderRight: `1px solid ${semanticColorRoles.border.subtle}`,
  backgroundColor: semanticColorRoles.surface.canvas
});

export const nav = style({
  display: "grid",
  gap: themeVars.spacing.x3
});

export const group = style({
  display: "grid",
  gap: themeVars.spacing.x1
});

export const trigger = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: themeVars.spacing.x2,
    width: "100%",
    minHeight: "40px",
    padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`,
    border: 0,
    borderRadius: themeVars.radius.sm,
    background: "transparent",
    color: semanticColorRoles.text.primary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightBold,
    cursor: "pointer",
    textAlign: "left",
    selectors: {
      "&:hover": { backgroundColor: semanticColorRoles.surface.subtle },
      "&:focus-visible": { outline: "none", boxShadow: themeVars.shadow.focus }
    }
  },
  variants: {
    expanded: {
      true: { backgroundColor: semanticColorRoles.surface.subtle },
      false: {}
    }
  },
  defaultVariants: {
    expanded: false
  }
});

export const triggerLabel = style({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

export const triggerIcon = recipe({
  base: {
    color: semanticColorRoles.text.tertiary,
    transition: "transform 120ms ease"
  },
  variants: {
    expanded: {
      true: { transform: "rotate(180deg)" },
      false: {}
    }
  },
  defaultVariants: {
    expanded: false
  }
});

export const childList = style({
  display: "grid",
  gap: themeVars.spacing.x1,
  margin: 0,
  padding: 0,
  listStyle: "none"
});

export const child = recipe({
  base: {
    display: "grid",
    gap: "2px",
    padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`,
    borderRadius: themeVars.radius.sm,
    color: semanticColorRoles.text.secondary,
    textDecoration: "none",
    selectors: {
      "&:hover": { backgroundColor: semanticColorRoles.surface.subtle, color: semanticColorRoles.text.primary },
      "&:focus-visible": { outline: "none", boxShadow: themeVars.shadow.focus }
    }
  },
  variants: {
    active: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.subtle,
        color: semanticColorRoles.text.primary,
        boxShadow: `inset 2px 0 0 ${semanticColorRoles.button.solid.primary.background}`
      },
      false: {}
    }
  },
  defaultVariants: {
    active: false
  }
});

export const childLabel = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: 1.4
});

export const childDescription = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.4,
  color: semanticColorRoles.text.tertiary
});
