import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, defaultColorTokens } from "@lds/tokens";

/* ─── root container ─── */
export const root = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    fontFamily: themeVars.font.family,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  variants: {
    variant: {
      default: {},
      flush: {},
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/* border between items in default variant */
const rootDefault = root({ variant: "default" });
globalStyle(`${rootDefault} > * + *`, {
  borderTop: `1px solid ${grayPalette[200]}`,
});

/* ─── list group item ─── */
export const item = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: themeVars.spacing.x2,
    padding: `0 ${themeVars.spacing.x4}`,
    minHeight: 42,
    backgroundColor: semanticColorRoles.surface.canvas,
    color: grayPalette[800],
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightRegular,
    fontFamily: themeVars.font.family,
    lineHeight: 1.5,
    boxSizing: "border-box",
    transition: "background-color 150ms ease, color 150ms ease",
  },
  variants: {
    active: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
      },
    },
    danger: {
      true: {
        color: defaultColorTokens.accentDanger,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none" as const,
      },
    },
    clickable: {
      true: {
        cursor: "pointer",
        selectors: {
          "&:hover": {
            backgroundColor: grayPalette[50],
          },
        },
      },
    },
    flush: {
      true: {
        minHeight: 52,
        fontSize: themeVars.font.sizeLg,
      },
    },
  },
  compoundVariants: [
    {
      variants: { active: true, clickable: true },
      style: {
        selectors: {
          "&:hover": {
            backgroundColor: semanticColorRoles.action.primary.hover,
          },
        },
      },
    },
  ],
  defaultVariants: {
    active: false,
    danger: false,
    disabled: false,
    clickable: false,
    flush: false,
  },
});

/* ─── leading / trailing / content ─── */
export const leading = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const content = style({
  flex: 1,
  minWidth: 0,
});

export const trailing = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  marginLeft: "auto",
  color: grayPalette[500],
  fontSize: themeVars.font.sizeSm,
});

/* ─── bottom sheet ─── */
export const bottomSheet = style({
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: `${themeVars.radius.md} ${themeVars.radius.md} 0 0`,
  boxShadow: themeVars.shadow.raised,
  overflow: "hidden",
});

export const dragHandle = style({
  display: "flex",
  justifyContent: "center",
  padding: `${themeVars.spacing.x2} 0`,
});

export const dragHandleBar = style({
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: grayPalette[300],
});
