import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── container (pill bar) ─── */
export const root = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: 0,
  backgroundColor: grayPalette[100],
  borderRadius: 9999,
  padding: themeVars.spacing.x1,
});

/* ─── sliding pill (translateX + width로 이동) ─── */
export const slidingPill = style({
  position: "absolute",
  top: themeVars.spacing.x1,
  bottom: themeVars.spacing.x1,
  left: 0,
  borderRadius: 9999,
  backgroundColor: semanticColorRoles.text.inverse,
  border: `1px solid ${semanticColorRoles.action.primary.default}`,
  transition: `transform ${themeVars.duration.base} ${themeVars.easing.standard}, width ${themeVars.duration.base} ${themeVars.easing.standard}`,
  zIndex: 0,
});

/* ─── individual tab ─── */
export const tab = recipe({
  base: {
    position: "relative",
    zIndex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: themeVars.spacing.x1,
    height: 38,
    padding: `0 ${themeVars.spacing.x3}`,
    border: "none",
    borderRadius: 9999,
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    backgroundColor: "transparent",
    color: semanticColorRoles.text.secondary,
    transition: `background-color ${themeVars.duration.base} ${themeVars.easing.standard}, color ${themeVars.duration.base} ${themeVars.easing.standard}, border-color ${themeVars.duration.base} ${themeVars.easing.standard}`,
    selectors: {
      "&:hover:not(:disabled)": {
        color: semanticColorRoles.text.primary,
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
      },
    },
  },
  variants: {
    active: {
      true: {
        color: semanticColorRoles.action.primary.default,
        selectors: {
          "&:hover:not(:disabled)": {
            color: semanticColorRoles.action.primary.hover,
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});

/* ─── icon slot ─── */
export const iconSlot = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 14,
  height: 14,
});
