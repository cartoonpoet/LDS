import { style, globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, opacityPalette } from "@lds/tokens";

/* ─── trigger button ─── */
export const trigger = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: themeVars.spacing.x2,
    width: "100%",
    backgroundColor: semanticColorRoles.surface.canvas,
    border: `1px solid ${grayPalette[200]}`,
    borderRadius: themeVars.radius.sm,
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontWeight: themeVars.font.weightRegular,
    color: semanticColorRoles.text.primary,
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    boxSizing: "border-box",
    selectors: {
      "&:focus-visible": {
        outline: "none",
        borderColor: semanticColorRoles.border.focus,
        boxShadow: themeVars.shadow.focus,
      },
    },
  },
  variants: {
    size: {
      small: {
        height: 26,
        padding: `0 ${themeVars.spacing.x2}`,
        fontSize: themeVars.font.sizeSm,
      },
      medium: {
        height: 38,
        padding: `0 ${themeVars.spacing.x3}`,
        fontSize: themeVars.font.sizeMd,
      },
      large: {
        height: 47,
        padding: `0 ${themeVars.spacing.x3}`,
        fontSize: themeVars.font.sizeMd,
      },
    },
    open: {
      true: {
        borderColor: semanticColorRoles.border.focus,
      },
      false: {},
    },
    disabled: {
      true: {
        opacity: 0.4,
        cursor: "not-allowed",
        pointerEvents: "none" as const,
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "medium",
    open: false,
    disabled: false,
  },
});

/* ─── trigger icon ─── */
export const triggerIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 18,
  height: 18,
  color: semanticColorRoles.text.tertiary,
});

/* ─── trigger label ─── */
export const triggerLabel = style({
  flex: 1,
  minWidth: 0,
  textAlign: "left",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

/* ─── placeholder text ─── */
export const placeholder = style({
  color: semanticColorRoles.text.placeholder,
});

/* ─── chevron icon ─── */
export const chevron = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 18,
    height: 18,
    color: semanticColorRoles.text.primary,
    transition: "transform 200ms ease",
    marginLeft: "auto",
  },
  variants: {
    open: {
      true: { transform: "rotate(180deg)" },
      false: { transform: "rotate(0deg)" },
    },
  },
  defaultVariants: { open: false },
});

/* ─── wrapper (relative position anchor) ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: "100%",
});

/* ─── options panel ─── */
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
    gap: themeVars.spacing.x2,
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
    transition: "background-color 100ms ease",
    selectors: {
      "&:hover": {
        backgroundColor: opacityPalette.primary,
      },
      "&:focus-visible": {
        outline: "none",
        backgroundColor: opacityPalette.primary,
      },
    },
  },
  variants: {
    selected: {
      true: {
        color: semanticColorRoles.action.primary.default,
        backgroundColor: opacityPalette.primary,
      },
      false: {},
    },
    disabled: {
      true: {
        opacity: 0.4,
        cursor: "not-allowed",
        pointerEvents: "none" as const,
      },
      false: {},
    },
  },
  defaultVariants: {
    selected: false,
    disabled: false,
  },
});

/* ─── option text group (multi-level) ─── */
export const optionTextGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  flex: 1,
  minWidth: 0,
});

export const optionDescription = style({
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.tertiary,
  lineHeight: 1.4,
});

/* ─── checkbox (multi-check mode) ─── */
export const checkbox = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 16,
    height: 16,
    borderRadius: 3,
    border: `1.5px solid ${grayPalette[400]}`,
    backgroundColor: semanticColorRoles.surface.canvas,
    transition: "background-color 150ms ease, border-color 150ms ease",
  },
  variants: {
    checked: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.default,
        borderColor: semanticColorRoles.action.primary.default,
        color: semanticColorRoles.text.inverse,
      },
      false: {},
    },
  },
  defaultVariants: { checked: false },
});

/* ─── panel header (multi-check) ─── */
export const panelHeader = style({
  display: "flex",
  alignItems: "center",
  padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.primary,
  borderBottom: `1px solid ${grayPalette[200]}`,
});
