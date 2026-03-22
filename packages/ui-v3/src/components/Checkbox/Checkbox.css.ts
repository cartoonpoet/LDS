import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── wrapper ─── */
export const wrapper = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  cursor: "pointer",
  userSelect: "none",
  fontFamily: themeVars.font.family,
  position: "relative",
  verticalAlign: "middle",
});

export const wrapperDisabled = style({
  cursor: "not-allowed",
});

/* ─── hidden native input ─── */
export const hiddenInput = style({
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  border: 0,
});

/* ─── visual box ─── */
export const box = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    flexShrink: 0,
    boxSizing: "border-box",
    transition: "background-color 150ms ease, box-shadow 150ms ease",
  },
  variants: {
    size: {
      small: { width: 12, height: 12 },
      medium: { width: 14, height: 14 },
      large: { width: 18, height: 18 },
    },
    checked: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.default,
        boxShadow: "none",
      },
      false: {
        backgroundColor: semanticColorRoles.surface.canvas,
        boxShadow: `inset 0 0 0 1.5px ${grayPalette[500]}`,
      },
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { checked: false, disabled: true },
      style: {
        backgroundColor: grayPalette[200],
        boxShadow: "none",
      },
    },
    {
      variants: { checked: true, disabled: true },
      style: {
        opacity: 0.65,
      },
    },
  ],
  defaultVariants: { size: "medium", checked: false, disabled: false },
});

/* ─── check icon (SVG wrapper) ─── */
export const checkIcon = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: semanticColorRoles.text.inverse,
  },
  variants: {
    size: {
      small: { width: 5.3, height: 4 },
      medium: { width: 6.2, height: 4.7 },
      large: { width: 8, height: 6 },
    },
  },
  defaultVariants: { size: "medium" },
});

/* ─── label text ─── */
export const label = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontWeight: themeVars.font.weightMedium,
    color: semanticColorRoles.text.primary,
  },
  variants: {
    size: {
      small: { fontSize: themeVars.font.sizeSm, lineHeight: "16px" },
      medium: { fontSize: themeVars.font.sizeMd, lineHeight: "18px" },
      large: { fontSize: themeVars.font.sizeMd, lineHeight: "21px" },
    },
    disabled: {
      true: { color: grayPalette[300] },
      false: {},
    },
  },
  defaultVariants: { size: "medium", disabled: false },
});
