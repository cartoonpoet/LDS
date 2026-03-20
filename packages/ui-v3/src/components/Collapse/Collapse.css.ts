import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

/* ─── root container ─── */
export const root = recipe({
  base: {
    fontFamily: themeVars.font.family,
    backgroundColor: semanticColorRoles.surface.canvas,
  },
  variants: {
    variant: {
      default: {},
      shadow: {},
      border: {},
      margin: {},
    },
    expanded: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    /* Shadow: rounded + shadow when expanded */
    {
      variants: { variant: "shadow", expanded: true },
      style: {
        borderRadius: 4,
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.08)",
      },
    },
    {
      variants: { variant: "shadow", expanded: false },
      style: {
        borderRadius: 4,
      },
    },
    /* Border: always bordered */
    {
      variants: { variant: "border", expanded: true },
      style: {
        border: `1px solid ${semanticColorRoles.border.subtle}`,
      },
    },
    {
      variants: { variant: "border", expanded: false },
      style: {
        border: `1px solid ${semanticColorRoles.border.subtle}`,
      },
    },
    /* Margin: rounded + shadow */
    {
      variants: { variant: "margin", expanded: true },
      style: {
        borderRadius: 4,
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.08)",
      },
    },
    {
      variants: { variant: "margin", expanded: false },
      style: {
        borderRadius: 4,
        boxShadow: "0 2px 15px rgba(0, 0, 0, 0.06)",
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    expanded: false,
  },
});

/* ─── header (trigger) ─── */
export const header = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: themeVars.spacing.x2,
    width: "100%",
    padding: `10px ${themeVars.spacing.x3}`,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontSize: "15px",
    fontWeight: themeVars.font.weightMedium,
    color: semanticColorRoles.text.heading,
    lineHeight: 1.6,
    textAlign: "left",
    selectors: {
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
        position: "relative",
        zIndex: 1,
      },
    },
  },
  variants: {
    variant: {
      default: {
        borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
      },
      shadow: {},
      border: {},
      margin: {},
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/* ─── chevron icon ─── */
export const chevron = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    flexShrink: 0,
    color: semanticColorRoles.text.secondary,
    transition: "transform 200ms ease",
  },
  variants: {
    expanded: {
      true: { transform: "rotate(180deg)" },
      false: { transform: "rotate(0deg)" },
    },
  },
  defaultVariants: { expanded: false },
});

/* ─── header text ─── */
export const headerText = style({
  flex: 1,
  minWidth: 0,
});

/* ─── header action icon ─── */
export const headerAction = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 16,
  height: 16,
  flexShrink: 0,
  color: semanticColorRoles.text.secondary,
});

/* ─── content area ─── */
export const content = recipe({
  base: {
    overflow: "hidden",
    transition: "grid-template-rows 200ms ease",
    display: "grid",
  },
  variants: {
    expanded: {
      true: { gridTemplateRows: "1fr" },
      false: { gridTemplateRows: "0fr" },
    },
  },
  defaultVariants: { expanded: false },
});

export const contentInner = recipe({
  base: {
    overflow: "hidden",
  },
  variants: {
    variant: {
      default: {},
      shadow: {
        borderTop: `1px solid ${semanticColorRoles.border.subtle}`,
      },
      border: {
        borderTop: `1px solid ${semanticColorRoles.border.subtle}`,
      },
      margin: {},
    },
  },
  defaultVariants: { variant: "default" },
});

export const contentBody = style({
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x3}`,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightRegular,
  color: semanticColorRoles.text.secondary,
  lineHeight: 1.5,
});

/* ─── group (accordion) ─── */
export const group = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
  },
  variants: {
    variant: {
      default: {},
      shadow: {},
      border: {},
      margin: { gap: themeVars.spacing.x2 },
    },
  },
  defaultVariants: { variant: "default" },
});
