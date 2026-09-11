import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
});

export const item = style({
  display: "flex",
  gap: themeVars.spacing.x3,
});

export const markerColumn = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "12px",
  flexShrink: 0,
});

export const dot = recipe({
  base: {
    boxSizing: "border-box",
    borderRadius: "999px",
    marginTop: "4px",
    flexShrink: 0,
  },
  variants: {
    status: {
      done: {
        width: "10px",
        height: "10px",
        background: themeVars.color.accentPrimary,
      },
      current: {
        width: "12px",
        height: "12px",
        background: semanticColorRoles.surface.canvas,
        border: `3px solid ${themeVars.color.accentPrimary}`,
      },
      upcoming: {
        width: "10px",
        height: "10px",
        background: semanticColorRoles.surface.canvas,
        border: `2px solid ${semanticColorRoles.border.strong}`,
      },
    },
  },
  defaultVariants: { status: "done" },
});

export const connector = style({
  width: "2px",
  flexGrow: 1,
  background: semanticColorRoles.border.subtle,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  paddingBottom: themeVars.spacing.x4,
  minWidth: 0,
});

export const date = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    color: semanticColorRoles.text.secondary,
  },
  variants: {
    status: {
      done: {},
      current: { color: themeVars.color.accentPrimaryActive, fontWeight: themeVars.font.weightBold },
      upcoming: { color: semanticColorRoles.text.tertiary },
    },
  },
  defaultVariants: { status: "done" },
});

export const title = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightBold,
    color: semanticColorRoles.text.heading,
  },
  variants: {
    status: {
      done: {},
      current: {},
      upcoming: { color: semanticColorRoles.text.secondary, fontWeight: themeVars.font.weightRegular },
    },
  },
  defaultVariants: { status: "done" },
});

export const description = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary,
});
