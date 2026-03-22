import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, greenPalette, redPalette } from "@lds/tokens";

/* ─── field wrapper (label + input + helper) ─── */
export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x2,
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
  gap: themeVars.spacing.x1,
});

export const label = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "16px",
  color: semanticColorRoles.text.primary,
});

export const requiredDot = style({
  width: 5,
  height: 5,
  borderRadius: "50%",
  backgroundColor: semanticColorRoles.action.primary.default,
  flexShrink: 0,
});

export const caption = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: semanticColorRoles.text.primary,
});

/* ─── input box ─── */
export const inputWrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: themeVars.spacing.x2,
    width: "100%",
    backgroundColor: semanticColorRoles.surface.canvas,
    borderRadius: themeVars.radius.sm,
    border: `1px solid ${grayPalette[400]}`,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightMedium,
    color: semanticColorRoles.text.primary,
    boxSizing: "border-box",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
  },
  variants: {
    size: {
      small: { height: 30, padding: `0 ${themeVars.spacing.x2}` },
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
        borderColor: semanticColorRoles.border.success,
      },
      warning: {
        borderColor: semanticColorRoles.border.danger,
      },
      disabled: {
        backgroundColor: semanticColorRoles.surface.disabled,
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
  color: semanticColorRoles.text.primary,
  lineHeight: "22px",
  padding: 0,
  "::placeholder": {
    color: semanticColorRoles.text.placeholder,
  },
});

globalStyle(`${input}:disabled::placeholder`, {
  color: semanticColorRoles.text.disabled,
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
  gap: themeVars.spacing.x1,
  flexShrink: 0,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.primary,
  whiteSpace: "nowrap",
});

export const suffixDivider = style({
  width: 1,
  height: 16,
  backgroundColor: grayPalette[200],
  marginRight: themeVars.spacing.x1,
});

/* ─── helper text ─── */
export const helper = recipe({
  base: {
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightBold,
    lineHeight: "16px",
  },
  variants: {
    state: {
      default: { color: semanticColorRoles.text.tertiary },
      active: { color: semanticColorRoles.text.tertiary },
      success: { color: greenPalette[500] },
      warning: { color: redPalette[500] },
      disabled: { color: semanticColorRoles.text.tertiary },
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
    gap: themeVars.spacing.x1,
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
        backgroundColor: semanticColorRoles.surface.disabled,
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
  gap: themeVars.spacing.x1,
  height: 24,
  padding: "0 10px",
  borderRadius: 30,
  border: `1px solid rgba(33, 81, 236, 0.3)`,
  backgroundColor: "rgba(33, 81, 236, 0.06)",
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
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
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.primary,
  lineHeight: "24px",
  padding: 0,
  "::placeholder": {
    color: semanticColorRoles.text.placeholder,
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
