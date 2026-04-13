import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── wrapper (relative anchor) ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: "100%",
  fontFamily: themeVars.font.family,
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
    open: {
      true: {
        borderColor: semanticColorRoles.action.primary.default,
        boxShadow: themeVars.shadow.focus,
      },
      false: {
        selectors: {
          "&:focus-within": {
            borderColor: semanticColorRoles.action.primary.default,
            boxShadow: themeVars.shadow.focus,
          },
        },
      },
    },
    disabled: {
      true: {
        backgroundColor: semanticColorRoles.surface.disabled,
        cursor: "not-allowed",
        pointerEvents: "none" as const,
      },
      false: {},
    },
  },
  defaultVariants: { size: "medium", open: false, disabled: false },
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

/* ─── divider + search icon group ─── */
export const suffixGroup = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexShrink: 0,
});

export const divider = style({
  width: 1,
  height: 16,
  backgroundColor: grayPalette[200],
});

export const searchIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 14,
  height: 14,
  color: grayPalette[400],
});

/* ─── badges area (multiple mode) ─── */
export const badgesArea = style({
  display: "flex",
  flexWrap: "wrap",
  gap: themeVars.spacing.x1,
  marginTop: themeVars.spacing.x2,
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

/* ─── dropdown panel ─── */
export const panel = style({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  marginTop: themeVars.spacing.x1,
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.md,
  boxShadow: themeVars.shadow.raised,
  zIndex: 1000,
  maxHeight: 240,
  overflowY: "auto",
  padding: `${themeVars.spacing.x1} 0`,
});

/* ─── option item ─── */
export const option = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `6px ${themeVars.spacing.x3}`,
    minHeight: 32,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightRegular,
    color: semanticColorRoles.text.primary,
    textAlign: "left",
    boxSizing: "border-box",
    transition: "background-color 100ms ease, color 100ms ease",
  },
  variants: {
    highlighted: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
      },
      false: {},
    },
  },
  defaultVariants: { highlighted: false },
});

/* ─── no results ─── */
export const noResult = style({
  padding: `6px ${themeVars.spacing.x3}`,
  fontSize: themeVars.font.sizeMd,
  color: semanticColorRoles.text.tertiary,
});
