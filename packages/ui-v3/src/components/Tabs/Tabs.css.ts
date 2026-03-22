import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, darkPalette, opacityPalette } from "@lds/tokens";

/* ─── container ─── */
export const root = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

/* ─── tab row ─── */
export const tabRow = style({
  display: "flex",
  alignItems: "stretch",
});

/* ─── tab list (scrollable area) ─── */
export const tabList = style({
  display: "flex",
  flex: 1,
  minWidth: 0,
});

/* ─── individual tab item ─── */
export const tabItem = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: themeVars.spacing.x1,
    flex: 1,
    border: "none",
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    textAlign: "center",
    transition: "background-color 150ms ease, color 150ms ease",
    selectors: {
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
        zIndex: 1,
        position: "relative",
      },
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
      },
      false: {
        backgroundColor: `${darkPalette[700]}1F`,
        color: semanticColorRoles.text.primary,
        selectors: {
          "&:hover": {
            backgroundColor: `${darkPalette[700]}33`,
          },
        },
      },
    },
    size: {
      large: {
        height: 48,
        fontSize: themeVars.font.sizeLg,
      },
      medium: {
        height: 40,
        fontSize: themeVars.font.sizeMd,
      },
    },
  },
  defaultVariants: {
    active: false,
    size: "large",
  },
});

/* ─── badge ─── */
export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    fontFamily: themeVars.font.family,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    minWidth: 20,
    paddingInline: 6,
  },
  variants: {
    active: {
      true: {
        backgroundColor: semanticColorRoles.text.inverse,
        color: semanticColorRoles.action.primary.default,
      },
      false: {
        backgroundColor: opacityPalette.black,
        color: semanticColorRoles.text.primary,
      },
    },
    size: {
      large: { height: 20, fontSize: themeVars.font.sizeMd },
      medium: { height: 18, fontSize: themeVars.font.sizeSm },
    },
  },
  defaultVariants: {
    active: false,
    size: "large",
  },
});

/* ─── action button (Add Tab) ─── */
export const actionButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: themeVars.spacing.x1,
  padding: `0 ${themeVars.spacing.x3}`,
  border: "none",
  background: "none",
  cursor: "pointer",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.action.primary.default,
  flexShrink: 0,
  selectors: {
    "&:hover": { opacity: 0.8 },
    "&:focus-visible": {
      outline: "none",
      boxShadow: themeVars.shadow.focus,
    },
  },
});

export const actionIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 16,
  height: 16,
  flexShrink: 0,
});

/* ─── bottom indicator line ─── */
export const indicator = style({
  width: "100%",
  height: 1,
  backgroundColor: semanticColorRoles.action.primary.default,
  flexShrink: 0,
});
