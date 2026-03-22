import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

/* ─── root container ─── */
export const root = recipe({
  base: {
    position: "relative",
    backgroundColor: semanticColorRoles.surface.canvas,
    borderRadius: themeVars.radius.md,
    boxShadow: themeVars.shadow.raised,
    fontFamily: themeVars.font.family,
    color: semanticColorRoles.text.primary,
  },
  variants: {
    bordered: {
      true: {
        border: `1px solid ${semanticColorRoles.border.subtle}`,
      },
      false: {},
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

/* ─── header area ─── */
export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x2,
  padding: `0 ${themeVars.spacing.x4}`,
  minHeight: 53,
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
});

export const headerTitle = style({
  fontSize: themeVars.font.sizeLg,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.heading,
  lineHeight: 1.6,
  flex: 1,
  minWidth: 0,
});

export const headerActions = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  flexShrink: 0,
});

/* ─── body area ─── */
export const body = style({
  padding: themeVars.spacing.x4,
});

/* ─── title (inside body) ─── */
export const title = style({
  fontSize: "18px",
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.heading,
  lineHeight: 1.22,
  marginBottom: themeVars.spacing.x1,
});

/* ─── body text ─── */
export const bodyText = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightRegular,
  color: semanticColorRoles.text.secondary,
  lineHeight: 1.5,
});

/* ─── footer area ─── */
export const footer = style({
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
  borderTop: `1px solid ${semanticColorRoles.border.subtle}`,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightRegular,
  color: semanticColorRoles.text.tertiary,
  lineHeight: 1.5,
});
