import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = recipe({
  base: {
    display: "grid",
    alignContent: "start",
    minHeight: "100%",
    padding: themeVars.spacing.x4,
    borderRight: `1px solid ${semanticColorRoles.border.subtle}`,
    backgroundColor: semanticColorRoles.surface.canvas,
    boxShadow: "8px 0 24px rgba(15, 23, 42, 0.04)"
  },
  variants: {
    collapsed: {
      true: {
        width: 72,
        gap: themeVars.spacing.x4,
        justifyItems: "center"
      },
      false: {
        width: 280,
        gap: themeVars.spacing.x5
      }
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const brand = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "40px"
  },
  variants: {
    collapsed: {
      true: { justifyContent: "center" },
      false: { justifyContent: "space-between" }
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const logo = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  color: semanticColorRoles.button.solid.primary.background,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeLg,
  fontWeight: themeVars.font.weightBold
});

export const logoMark = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: "999px",
  border: `1px solid ${semanticColorRoles.action.primary.subtle}`,
  background: semanticColorRoles.surface.canvas,
  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.14)"
});

export const collapseButton = style({
  border: 0,
  background: "transparent",
  color: semanticColorRoles.text.tertiary,
  cursor: "pointer",
  fontSize: themeVars.font.sizeMd,
  selectors: {
    "&:focus-visible": { outline: "none", boxShadow: themeVars.shadow.focus, borderRadius: themeVars.radius.sm }
  }
});

export const nav = recipe({
  base: {
    display: "grid",
    width: "100%"
  },
  variants: {
    collapsed: {
      true: { gap: themeVars.spacing.x3, justifyItems: "center" },
      false: { gap: themeVars.spacing.x2 }
    }
  },
  defaultVariants: { collapsed: false }
});

export const group = style({
  display: "grid",
  gap: themeVars.spacing.x1,
  width: "100%"
});

export const trigger = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: themeVars.spacing.x2,
    width: "100%",
    minHeight: "28px",
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
    },
    collapsed: {
      true: {
        width: 40,
        minHeight: 40,
        padding: 0,
        justifyContent: "center"
      },
      false: {}
    },
    active: {
      true: {
        background: semanticColorRoles.button.solid.primary.background,
        color: semanticColorRoles.button.solid.primary.text,
        boxShadow: "0 8px 16px rgba(37, 99, 235, 0.22)"
      },
      false: {}
    }
  },
  defaultVariants: {
    expanded: false,
    collapsed: false,
    active: false
  }
});

export const triggerMain = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  minWidth: 0
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
    },
    active: {
      true: { color: semanticColorRoles.button.solid.primary.text },
      false: {}
    }
  },
  defaultVariants: {
    expanded: false,
    active: false
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: themeVars.spacing.x2,
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
        backgroundColor: semanticColorRoles.surface.subtle,
        color: semanticColorRoles.text.primary
      },
      false: {}
    }
  },
  defaultVariants: {
    active: false
  }
});

export const childText = style({
  display: "grid",
  gap: "2px",
  minWidth: 0
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

export const chevron = style({
  color: semanticColorRoles.text.tertiary,
  flexShrink: 0
});
