import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

/* ─── color token helpers ─── */
const solid = semanticColorRoles.button.solid;
const outline = semanticColorRoles.button.outline;

/* ─── root button ─── */
export const root = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: themeVars.spacing.x1,
    border: "none",
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    textAlign: "center",
    textDecoration: "none",
    verticalAlign: "middle",
    userSelect: "none",
    transition:
      "background-color 150ms ease, box-shadow 150ms ease, border-color 150ms ease, opacity 150ms ease",
    selectors: {
      "&:focus-visible": {
        outline: "none",
        boxShadow: themeVars.shadow.focus,
      },
    },
  },

  variants: {
    /* ─── variant × color ─── */
    color: {
      primary: {},
      secondary: {},
      success: {},
      danger: {},
      warning: {},
      info: {},
      dark: {},
      neutral: {},
    },

    variant: {
      default: {},
      outline: { backgroundColor: "transparent" },
    },

    shape: {
      rounded: { borderRadius: themeVars.radius.sm },
      round: { borderRadius: "9999px" },
    },

    size: {
      small: {
        height: 30,
        padding: `0 ${themeVars.spacing.x2}`,
        fontSize: themeVars.font.sizeSm,
      },
      medium: {
        height: 38,
        padding: `0 ${themeVars.spacing.x3}`,
        fontSize: themeVars.font.sizeMd,
      },
      large: {
        height: 46,
        padding: `0 ${themeVars.spacing.x4}`,
        fontSize: themeVars.font.sizeLg,
      },
    },
  },

  compoundVariants: [
    /* ─── SOLID variants ─── */
    {
      variants: { variant: "default", color: "primary" },
      style: {
        backgroundColor: solid.primary.background,
        color: solid.primary.text,
        selectors: {
          "&:hover:not(:disabled)": {
            boxShadow: `0 0 10px rgba(33, 81, 236, 0.65)`,
          },
          "&:active:not(:disabled)": {
            backgroundColor: solid.primary.active,
            boxShadow: "none",
          },
        },
      },
    },
    {
      variants: { variant: "default", color: "secondary" },
      style: {
        backgroundColor: solid.secondary.background,
        color: solid.secondary.text,
        selectors: {
          "&:hover:not(:disabled)": {
            boxShadow: `0 0 10px rgba(130, 134, 139, 0.65)`,
          },
          "&:active:not(:disabled)": {
            backgroundColor: solid.secondary.active,
            boxShadow: "none",
          },
        },
      },
    },
    {
      variants: { variant: "default", color: "success" },
      style: {
        backgroundColor: solid.success.background,
        color: solid.success.text,
        selectors: {
          "&:hover:not(:disabled)": {
            boxShadow: `0 0 10px rgba(40, 199, 111, 0.65)`,
          },
          "&:active:not(:disabled)": {
            backgroundColor: solid.success.active,
            boxShadow: "none",
          },
        },
      },
    },
    {
      variants: { variant: "default", color: "danger" },
      style: {
        backgroundColor: solid.danger.background,
        color: solid.danger.text,
        selectors: {
          "&:hover:not(:disabled)": {
            boxShadow: `0 0 10px rgba(234, 84, 85, 0.65)`,
          },
          "&:active:not(:disabled)": {
            backgroundColor: solid.danger.active,
            boxShadow: "none",
          },
        },
      },
    },
    {
      variants: { variant: "default", color: "warning" },
      style: {
        backgroundColor: solid.warning.background,
        color: solid.warning.text,
        selectors: {
          "&:hover:not(:disabled)": {
            boxShadow: `0 0 10px rgba(240, 175, 35, 0.65)`,
          },
          "&:active:not(:disabled)": {
            backgroundColor: solid.warning.active,
            boxShadow: "none",
          },
        },
      },
    },
    {
      variants: { variant: "default", color: "info" },
      style: {
        backgroundColor: solid.info.background,
        color: solid.info.text,
        selectors: {
          "&:hover:not(:disabled)": {
            boxShadow: `0 0 10px rgba(0, 207, 232, 0.65)`,
          },
          "&:active:not(:disabled)": {
            backgroundColor: solid.info.active,
            boxShadow: "none",
          },
        },
      },
    },
    {
      variants: { variant: "default", color: "dark" },
      style: {
        backgroundColor: solid.dark.background,
        color: solid.dark.text,
        selectors: {
          "&:hover:not(:disabled)": {
            boxShadow: `0 0 10px rgba(75, 75, 75, 0.65)`,
          },
          "&:active:not(:disabled)": {
            backgroundColor: solid.dark.active,
            boxShadow: "none",
          },
        },
      },
    },
    {
      variants: { variant: "default", color: "neutral" },
      style: {
        backgroundColor: solid.neutral.background,
        color: solid.neutral.text,
        selectors: {
          "&:hover:not(:disabled)": {
            boxShadow: `0 0 10px rgba(130, 134, 139, 0.65)`,
          },
          "&:active:not(:disabled)": {
            backgroundColor: solid.neutral.active,
            boxShadow: "none",
          },
        },
      },
    },

    /* ─── OUTLINE variants ─── */
    {
      variants: { variant: "outline", color: "primary" },
      style: {
        border: `1px solid ${outline.primary.border}`,
        color: outline.primary.text,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: outline.primary.hover,
          },
          "&:active:not(:disabled)": {
            backgroundColor: outline.primary.active,
          },
        },
      },
    },
    {
      variants: { variant: "outline", color: "secondary" },
      style: {
        border: `1px solid ${outline.secondary.border}`,
        color: outline.secondary.text,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: outline.secondary.hover,
          },
          "&:active:not(:disabled)": {
            backgroundColor: outline.secondary.active,
          },
        },
      },
    },
    {
      variants: { variant: "outline", color: "success" },
      style: {
        border: `1px solid ${outline.success.border}`,
        color: outline.success.text,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: outline.success.hover,
          },
          "&:active:not(:disabled)": {
            backgroundColor: outline.success.active,
          },
        },
      },
    },
    {
      variants: { variant: "outline", color: "danger" },
      style: {
        border: `1px solid ${outline.danger.border}`,
        color: outline.danger.text,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: outline.danger.hover,
          },
          "&:active:not(:disabled)": {
            backgroundColor: outline.danger.active,
          },
        },
      },
    },
    {
      variants: { variant: "outline", color: "warning" },
      style: {
        border: `1px solid ${outline.warning.border}`,
        color: outline.warning.text,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: outline.warning.hover,
          },
          "&:active:not(:disabled)": {
            backgroundColor: outline.warning.active,
          },
        },
      },
    },
    {
      variants: { variant: "outline", color: "info" },
      style: {
        border: `1px solid ${outline.info.border}`,
        color: outline.info.text,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: outline.info.hover,
          },
          "&:active:not(:disabled)": {
            backgroundColor: outline.info.active,
          },
        },
      },
    },
    {
      variants: { variant: "outline", color: "dark" },
      style: {
        border: `1px solid ${outline.dark.border}`,
        color: outline.dark.text,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: outline.dark.hover,
          },
          "&:active:not(:disabled)": {
            backgroundColor: outline.dark.active,
          },
        },
      },
    },
    {
      variants: { variant: "outline", color: "neutral" },
      style: {
        border: `1px solid ${outline.neutral.border}`,
        color: outline.neutral.text,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: outline.neutral.hover,
          },
          "&:active:not(:disabled)": {
            backgroundColor: outline.neutral.active,
          },
        },
      },
    },
  ],

  defaultVariants: {
    variant: "default",
    color: "primary",
    shape: "rounded",
    size: "medium",
  },
});

/* ─── disabled state (applied via data attribute) ─── */
export const disabled = style({
  cursor: "not-allowed",
  opacity: 0.4,
  pointerEvents: "none",
});

/* ─── icon wrapper ─── */
export const iconSlot = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 14,
  height: 14,
});
