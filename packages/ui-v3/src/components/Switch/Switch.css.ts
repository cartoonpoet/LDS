import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

/* ─── wrapper (label + switch) ─── */
export const wrapper = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
  userSelect: "none",
  fontFamily: themeVars.font.family,
});

export const wrapperDisabled = style({
  cursor: "not-allowed",
  opacity: 0.6,
});

/* ─── label ─── */
export const label = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "21px",
  color: "rgb(0, 0, 0)",
});

/* ─── track ─── */
export const track = recipe({
  base: {
    position: "relative",
    borderRadius: 14,
    transition: "background-color 200ms ease",
    flexShrink: 0,
  },
  variants: {
    size: {
      small: { width: 32, height: 18 },
      medium: { width: 42, height: 24 },
    },
    checked: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.default,
      },
      false: {
        backgroundColor: "rgb(209, 209, 209)",
      },
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { checked: true, disabled: true },
      style: { backgroundColor: "rgba(33, 81, 236, 0.18)" },
    },
  ],
  defaultVariants: { size: "medium", checked: false, disabled: false },
});

/* ─── knob ─── */
export const knob = recipe({
  base: {
    position: "absolute",
    top: "50%",
    borderRadius: "50%",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
    transition: "left 200ms ease",
  },
  variants: {
    size: {
      small: { width: 11.25, height: 11.25, transform: "translateY(-50%)" },
      medium: { width: 14, height: 14, transform: "translateY(-50%)" },
    },
    checked: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    { variants: { size: "small", checked: false }, style: { left: 3.375 } },
    { variants: { size: "small", checked: true }, style: { left: 17.25 } },
    { variants: { size: "medium", checked: false }, style: { left: 5 } },
    { variants: { size: "medium", checked: true }, style: { left: 23 } },
  ],
  defaultVariants: { size: "medium", checked: false },
});

/* ─── hidden input ─── */
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
