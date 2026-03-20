import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── field wrapper (label + input + helper) ─── */
export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  fontFamily: themeVars.font.family,
});

/* ─── label row ─── */
export const labelRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const labelGroup = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
});

export const label = style({
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: "16px",
  color: "rgb(0, 0, 0)",
});

export const requiredDot = style({
  width: 5,
  height: 5,
  borderRadius: "50%",
  backgroundColor: semanticColorRoles.action.primary.default,
  flexShrink: 0,
});

export const caption = style({
  fontSize: "13px",
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: "rgb(0, 0, 0)",
});

/* ─── input box ─── */
export const inputWrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    backgroundColor: semanticColorRoles.surface.canvas,
    borderRadius: themeVars.radius.sm,
    border: `1px solid ${grayPalette[400]}`,
    fontFamily: themeVars.font.family,
    fontSize: "13px",
    fontWeight: themeVars.font.weightMedium,
    color: semanticColorRoles.text.primary,
    boxSizing: "border-box",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
  },
  variants: {
    size: {
      small: { height: 30, padding: "0 8px" },
      medium: { height: 38, padding: "0 14px" },
      large: { height: 46, padding: "0 14px" },
    },
    state: {
      default: {
        selectors: {
          "&:focus-within": {
            borderColor: semanticColorRoles.action.primary.default,
            boxShadow: themeVars.shadow.focus,
          },
        },
      },
      active: {
        borderColor: semanticColorRoles.action.primary.default,
        boxShadow: themeVars.shadow.focus,
      },
      success: {
        borderColor: "rgb(40, 199, 111)",
      },
      warning: {
        borderColor: "rgb(234, 84, 85)",
      },
      disabled: {
        backgroundColor: "rgb(238, 239, 242)",
        cursor: "not-allowed",
        pointerEvents: "none" as const,
      },
    },
  },
  defaultVariants: { size: "medium", state: "default" },
});

/* ─── native input ─── */
export const input = style({
  flex: 1,
  minWidth: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  color: "rgb(0, 0, 0)",
  lineHeight: "22px",
  padding: 0,
  "::placeholder": {
    color: "rgb(98, 111, 134)",
  },
});

globalStyle(`${input}:disabled::placeholder`, {
  color: "rgb(209, 209, 209)",
});

/* ─── left / right icon ─── */
export const iconSlot = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: grayPalette[400],
  },
  variants: {
    size: {
      small: { width: 14, height: 14 },
      medium: { width: 14, height: 14 },
      large: { width: 16, height: 16 },
    },
  },
  defaultVariants: { size: "medium" },
});

/* ─── suffix (unit text / dropdown action) ─── */
export const suffix = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  flexShrink: 0,
  fontSize: "13px",
  fontWeight: themeVars.font.weightMedium,
  color: "rgb(0, 0, 0)",
  whiteSpace: "nowrap",
});

export const suffixDivider = style({
  width: 1,
  height: 16,
  backgroundColor: grayPalette[200],
  marginRight: 4,
});

/* ─── helper text ─── */
export const helper = recipe({
  base: {
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: "16px",
  },
  variants: {
    state: {
      default: { color: "rgb(98, 111, 134)" },
      active: { color: "rgb(98, 111, 134)" },
      success: { color: "rgb(27, 196, 125)" },
      warning: { color: "rgb(234, 84, 85)" },
      disabled: { color: "rgb(98, 111, 134)" },
    },
  },
  defaultVariants: { state: "default" },
});

/* ──────────────── MultiSelect ──────────────── */

export const multiWrapper = recipe({
  base: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 4,
    width: "100%",
    minHeight: 38,
    backgroundColor: semanticColorRoles.surface.canvas,
    borderRadius: themeVars.radius.sm,
    border: `1px solid ${grayPalette[400]}`,
    padding: "7px 10px",
    boxSizing: "border-box",
    fontFamily: themeVars.font.family,
    transition: "border-color 150ms ease",
    selectors: {
      "&:focus-within": {
        borderColor: semanticColorRoles.action.primary.default,
      },
    },
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: "rgb(238, 239, 242)",
        cursor: "not-allowed",
        pointerEvents: "none" as const,
      },
      false: {},
    },
  },
  defaultVariants: { disabled: false },
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  height: 24,
  padding: "0 10px",
  borderRadius: 30,
  border: `1px solid rgba(33, 81, 236, 0.3)`,
  backgroundColor: "rgba(33, 81, 236, 0.06)",
  fontSize: "13px",
  fontWeight: 600,
  color: semanticColorRoles.action.primary.default,
  whiteSpace: "nowrap",
});

export const badgeRemove = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 12,
  height: 12,
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  color: semanticColorRoles.action.primary.default,
  flexShrink: 0,
});

export const multiInput = style({
  flex: 1,
  minWidth: 60,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  fontSize: "13px",
  fontWeight: themeVars.font.weightMedium,
  color: "rgb(0, 0, 0)",
  lineHeight: "24px",
  padding: 0,
  "::placeholder": {
    color: "rgb(98, 111, 134)",
  },
});

export const multiIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 14,
  height: 14,
  color: grayPalette[400],
  marginLeft: "auto",
  alignSelf: "center",
  flexShrink: 0,
});
