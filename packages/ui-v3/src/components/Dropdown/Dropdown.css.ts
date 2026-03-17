import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "grid",
  gap: themeVars.spacing.x1,
  width: "100%"
});

export const labelRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x2
});

export const label = style({
  color: semanticColorRoles.field.label,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: 1.4
});

export const caption = style({
  color: semanticColorRoles.text.tertiary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  lineHeight: 1.4
});

export const requiredMark = style({
  color: semanticColorRoles.status.danger.text,
  marginLeft: themeVars.spacing.x1
});

export const trigger = recipe({
  base: {
    width: "100%",
    minHeight: "38px",
    padding: `0 ${themeVars.spacing.x3}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: themeVars.spacing.x2,
    borderRadius: themeVars.radius.sm,
    border: `1px solid ${semanticColorRoles.field.border}`,
    background: semanticColorRoles.field.background,
    color: semanticColorRoles.field.text,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    lineHeight: 1.4,
    textAlign: "left",
    cursor: "pointer",
    transition: "border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
    selectors: {
      "&:hover:not(:disabled)": { borderColor: semanticColorRoles.field.borderHover },
      "&:focus-visible": { outline: "none", boxShadow: themeVars.shadow.focus, borderColor: semanticColorRoles.field.borderFocus },
      "&:disabled": { background: semanticColorRoles.field.backgroundDisabled, color: semanticColorRoles.text.disabled, cursor: "not-allowed" }
    }
  },
  variants: {
    size: {
      sm: { minHeight: "32px", fontSize: themeVars.font.sizeSm },
      md: {},
      lg: { minHeight: "44px", fontSize: themeVars.font.sizeLg, padding: `0 ${themeVars.spacing.x4}` }
    },
    invalid: {
      true: { borderColor: semanticColorRoles.status.danger.border },
      false: {}
    },
    open: {
      true: { borderColor: semanticColorRoles.field.borderFocus, boxShadow: themeVars.shadow.focus },
      false: {}
    }
  },
  defaultVariants: { size: "md", invalid: false, open: false }
});

export const triggerValue = style({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

export const placeholder = style({ color: semanticColorRoles.field.placeholder });

export const counter = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "20px",
  height: "20px",
  padding: `0 ${themeVars.spacing.x1}`,
  borderRadius: "999px",
  background: semanticColorRoles.action.primary.subtle,
  color: semanticColorRoles.button.solid.primary.background,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold
});

export const icon = recipe({
  base: {
    flexShrink: 0,
    width: "10px",
    height: "6px",
    color: semanticColorRoles.field.icon,
    transition: "transform 120ms ease"
  },
  variants: {
    open: {
      true: { transform: "rotate(180deg)" },
      false: {}
    }
  },
  defaultVariants: {
    open: false
  }
});

export const panel = style({
  display: "grid",
  gap: themeVars.spacing.x2,
  padding: themeVars.spacing.x3,
  borderRadius: themeVars.radius.md,
  border: `1px solid ${semanticColorRoles.field.border}`,
  background: semanticColorRoles.surface.canvas,
  boxShadow: themeVars.shadow.raised
});

export const searchInput = style({
  width: "100%",
  minHeight: "34px",
  padding: `0 ${themeVars.spacing.x3}`,
  borderRadius: themeVars.radius.sm,
  border: `1px solid ${semanticColorRoles.field.border}`,
  background: semanticColorRoles.field.background,
  color: semanticColorRoles.field.text,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  selectors: {
    "&:focus": { outline: "none", borderColor: semanticColorRoles.field.borderFocus, boxShadow: themeVars.shadow.focus }
  }
});

export const list = style({ display: "grid", gap: themeVars.spacing.x1 });
export const group = style({ display: "grid", gap: themeVars.spacing.x1 });
export const groupLabel = style({ fontSize: themeVars.font.sizeSm, fontWeight: themeVars.font.weightBold, color: semanticColorRoles.text.tertiary });

export const option = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: themeVars.spacing.x2,
    width: "100%",
    minHeight: "32px",
    padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`,
    borderRadius: themeVars.radius.sm,
    border: "none",
    background: "transparent",
    color: semanticColorRoles.text.primary,
    cursor: "pointer",
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    textAlign: "left",
    selectors: {
      "&:hover:not(:disabled)": { background: semanticColorRoles.surface.subtle },
      "&:focus-visible": { outline: "none", boxShadow: themeVars.shadow.focus },
      "&:disabled": { color: semanticColorRoles.text.disabled, cursor: "not-allowed" }
    }
  },
  variants: {
    selected: {
      true: { background: semanticColorRoles.action.primary.subtle, color: semanticColorRoles.text.primary },
      false: {}
    }
  },
  defaultVariants: { selected: false }
});

export const optionMain = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  minWidth: 0,
  flex: 1
});

export const checkbox = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "14px",
    height: "14px",
    borderRadius: "3px",
    border: `1px solid ${semanticColorRoles.field.border}`,
    color: "transparent",
    fontSize: "10px",
    fontWeight: themeVars.font.weightBold
  },
  variants: {
    selected: {
      true: {
        borderColor: semanticColorRoles.button.solid.primary.background,
        background: semanticColorRoles.button.solid.primary.background,
        color: semanticColorRoles.button.solid.primary.text
      },
      false: {}
    }
  },
  defaultVariants: {
    selected: false
  }
});

export const optionText = style({
  display: "grid",
  gap: "2px",
  minWidth: 0
});

export const optionMeta = style({ color: semanticColorRoles.text.tertiary, fontSize: themeVars.font.sizeSm });
export const check = style({ color: semanticColorRoles.button.solid.primary.background, fontWeight: themeVars.font.weightBold, flexShrink: 0 });
export const empty = style({ color: semanticColorRoles.text.tertiary, fontSize: themeVars.font.sizeSm, padding: `${themeVars.spacing.x2} ${themeVars.spacing.x1}` });
export const helperText = recipe({
  base: { fontFamily: themeVars.font.family, fontSize: themeVars.font.sizeSm, lineHeight: 1.4 },
  variants: {
    tone: {
      neutral: { color: semanticColorRoles.field.helper },
      danger: { color: semanticColorRoles.status.danger.text }
    }
  },
  defaultVariants: { tone: "neutral" }
});
