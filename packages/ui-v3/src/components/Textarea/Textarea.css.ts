import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── wrapper (textarea + count) ─── */
export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x1,
  width: "100%",
  fontFamily: themeVars.font.family,
});

/* ─── textarea box (Input과 동일한 시각 언어) ─── */
export const textarea = recipe({
  base: {
    display: "block",
    width: "100%",
    backgroundColor: semanticColorRoles.surface.canvas,
    borderRadius: themeVars.radius.sm,
    border: `1px solid ${grayPalette[400]}`,
    outline: "none",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightMedium,
    color: semanticColorRoles.text.primary,
    lineHeight: "22px",
    boxSizing: "border-box",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    "::placeholder": {
      color: semanticColorRoles.text.placeholder,
    },
  },
  variants: {
    size: {
      small: { padding: `6px ${themeVars.spacing.x2}` },
      medium: { padding: "8px 14px" },
      large: { padding: "12px 14px" },
    },
    state: {
      default: {
        selectors: {
          "&:focus": {
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
      },
    },
    resize: {
      none: { resize: "none" },
      vertical: { resize: "vertical" },
    },
  },
  defaultVariants: { size: "medium", state: "default", resize: "vertical" },
});

globalStyle(`${wrapper} textarea:disabled::placeholder`, {
  color: semanticColorRoles.text.disabled,
});

/* ─── character count ─── */
export const count = style({
  alignSelf: "flex-end",
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "16px",
  color: semanticColorRoles.text.tertiary,
});
