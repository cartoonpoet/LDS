import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  width: "100%",
  border: `1px solid ${semanticColorRoles.border.default}`,
  borderRadius: themeVars.radius.md,
  backgroundColor: semanticColorRoles.surface.canvas,
  overflow: "hidden"
});

export const scrollArea = style({
  width: "100%",
  overflowX: "auto"
});

export const table = style({
  width: "100%",
  minWidth: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  color: semanticColorRoles.text.primary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.5
});

export const caption = style({
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
  color: semanticColorRoles.text.secondary,
  textAlign: "left",
  fontSize: themeVars.font.sizeSm,
  captionSide: "top"
});

const cellBase = {
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
  verticalAlign: "middle"
} as const;

export const headerCell = recipe({
  base: {
    ...cellBase,
    backgroundColor: semanticColorRoles.surface.subtle,
    color: semanticColorRoles.text.secondary,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightBold,
    whiteSpace: "nowrap"
  },
  variants: {
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" }
    },
    density: {
      compact: { padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}` },
      comfortable: { padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}` }
    }
  },
  defaultVariants: {
    align: "left",
    density: "comfortable"
  }
});

export const bodyCell = recipe({
  base: {
    ...cellBase,
    backgroundColor: semanticColorRoles.surface.canvas,
    color: semanticColorRoles.text.primary
  },
  variants: {
    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" }
    },
    density: {
      compact: { padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}` },
      comfortable: { padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}` }
    }
  },
  defaultVariants: {
    align: "left",
    density: "comfortable"
  }
});

export const row = style({});

globalStyle(`${row}:hover td`, {
  backgroundColor: semanticColorRoles.surface.subtle
});

globalStyle(`${row}:last-child td`, {
  borderBottom: 0
});

export const headerLabel = recipe({
  base: {
    display: "inline-flex",
    width: "100%"
  },
  variants: {
    align: {
      left: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      right: { justifyContent: "flex-end" }
    }
  },
  defaultVariants: {
    align: "left"
  }
});

export const sortButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: themeVars.spacing.x1,
    width: "100%",
    padding: 0,
    border: 0,
    background: "transparent",
    color: "inherit",
    font: "inherit",
    cursor: "pointer",
    selectors: {
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
        borderRadius: themeVars.radius.sm
      }
    }
  },
  variants: {
    align: {
      left: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      right: { justifyContent: "flex-end" }
    }
  },
  defaultVariants: {
    align: "left"
  }
});

export const sortIcon = recipe({
  base: {
    color: semanticColorRoles.text.tertiary,
    fontSize: themeVars.font.sizeSm,
    lineHeight: 1,
    transition: "transform 120ms ease, color 120ms ease"
  },
  variants: {
    active: {
      true: { color: semanticColorRoles.text.primary },
      false: {}
    },
    direction: {
      asc: {},
      desc: { transform: "rotate(180deg)" }
    }
  },
  defaultVariants: {
    active: false,
    direction: "asc"
  }
});

export const emptyCell = recipe({
  base: {
    padding: `${themeVars.spacing.x6} ${themeVars.spacing.x4}`,
    color: semanticColorRoles.text.tertiary,
    textAlign: "center"
  },
  variants: {
    density: {
      compact: { padding: `${themeVars.spacing.x5} ${themeVars.spacing.x3}` },
      comfortable: { padding: `${themeVars.spacing.x6} ${themeVars.spacing.x4}` }
    }
  },
  defaultVariants: {
    density: "comfortable"
  }
});
