import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x1,
  padding: themeVars.spacing.x2,
  border: `1px solid ${semanticColorRoles.border.default}`,
  borderRadius: themeVars.radius.md,
  backgroundColor: semanticColorRoles.surface.canvas
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "20px minmax(0, 1fr) auto",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  width: "100%",
  minHeight: 40,
  padding: `${themeVars.spacing.x2} ${themeVars.spacing.x3}`,
  border: 0,
  borderRadius: themeVars.radius.sm,
  background: "transparent",
  color: semanticColorRoles.text.primary,
  textAlign: "left",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: semanticColorRoles.surface.subtle
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: themeVars.shadow.focus
    },
    '&[data-selected="true"]': {
      backgroundColor: semanticColorRoles.action.primary.subtle,
      color: semanticColorRoles.text.primary
    },
    '&[data-disabled="true"]': {
      opacity: 0.48,
      cursor: "not-allowed"
    }
  }
});

export const expander = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  color: semanticColorRoles.text.secondary,
  fontSize: themeVars.font.sizeSm
});

export const labelBlock = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  gap: 2
});

export const primaryLine = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  minWidth: 0
});

export const label = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium
});

export const description = style({
  color: semanticColorRoles.text.secondary,
  fontSize: themeVars.font.sizeSm
});

export const meta = style({
  color: semanticColorRoles.text.tertiary,
  fontSize: themeVars.font.sizeSm,
  whiteSpace: "nowrap"
});
