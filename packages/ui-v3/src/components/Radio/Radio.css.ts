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

/* ─── visual circle ─── */
export const circle = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    flexShrink: 0,
    boxSizing: "border-box",
    transition: "background-color 150ms ease, border-color 150ms ease",
  },
  variants: {
    size: {
      small: { width: 12, height: 12 },
      medium: { width: 14, height: 14 },
      large: { width: 18, height: 18 },
    },
    variant: {
      basic: {},
      customized: {},
    },
    checked: {
      true: {},
      false: {},
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    /* ── Basic ── */
    {
      variants: { variant: "basic", checked: false, disabled: false },
      style: {
        backgroundColor: semanticColorRoles.surface.canvas,
        border: `1.5px solid ${grayPalette[500]}`,
      },
    },
    {
      variants: { variant: "basic", checked: true, disabled: false },
      style: {
        backgroundColor: semanticColorRoles.action.primary.default,
        border: "none",
      },
    },
    {
      variants: { variant: "basic", checked: false, disabled: true },
      style: {
        backgroundColor: grayPalette[200],
        border: "none",
      },
    },
    {
      variants: { variant: "basic", checked: true, disabled: true },
      style: {
        backgroundColor: "rgba(33, 81, 236, 0.18)",
        border: "none",
      },
    },
    /* ── Customized ── */
    {
      variants: { variant: "customized", checked: false, disabled: false },
      style: {
        backgroundColor: semanticColorRoles.surface.canvas,
        border: `1.5px solid ${grayPalette[500]}`,
      },
    },
    {
      variants: { variant: "customized", checked: true, disabled: false },
      style: {
        backgroundColor: semanticColorRoles.surface.canvas,
        border: `3px solid ${semanticColorRoles.action.primary.default}`,
      },
    },
    {
      variants: { variant: "customized", checked: false, disabled: true },
      style: {
        backgroundColor: semanticColorRoles.surface.canvas,
        border: "1.5px solid rgba(130, 134, 139, 0.18)",
        opacity: 0.5,
      },
    },
    {
      variants: { variant: "customized", checked: true, disabled: true },
      style: {
        backgroundColor: semanticColorRoles.surface.canvas,
        border: "3px solid rgba(33, 81, 236, 0.18)",
      },
    },
  ],
  defaultVariants: { size: "medium", variant: "basic", checked: false, disabled: false },
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

/* ─── radio group ─── */
export const group = style({
  display: "flex",
  gap: themeVars.spacing.x4,
});

export const groupVertical = style({
  flexDirection: "column",
  gap: themeVars.spacing.x3,
});
