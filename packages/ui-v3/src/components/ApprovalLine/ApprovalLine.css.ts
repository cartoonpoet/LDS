import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = recipe({
  base: {
    display: "flex",
    gap: themeVars.spacing.x3,
    width: "100%"
  },
  variants: {
    direction: {
      horizontal: {
        alignItems: "stretch",
        overflowX: "auto",
        paddingBottom: themeVars.spacing.x1
      },
      vertical: {
        flexDirection: "column"
      }
    }
  },
  defaultVariants: {
    direction: "horizontal"
  }
});

export const item = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: themeVars.spacing.x2,
    minWidth: "180px",
    padding: themeVars.spacing.x4,
    borderRadius: themeVars.radius.md,
    border: `1px solid ${semanticColorRoles.border.subtle}`,
    background: semanticColorRoles.surface.canvas,
    color: semanticColorRoles.text.primary,
    boxSizing: "border-box"
  },
  variants: {
    direction: {
      horizontal: {},
      vertical: {
        minWidth: 0,
        width: "100%"
      }
    },
    status: {
      pending: { borderColor: semanticColorRoles.border.subtle },
      current: { borderColor: semanticColorRoles.button.solid.primary.background, boxShadow: themeVars.shadow.focus },
      approved: { borderColor: semanticColorRoles.status.success.border },
      rejected: { borderColor: semanticColorRoles.status.danger.border }
    }
  },
  defaultVariants: {
    direction: "horizontal",
    status: "pending"
  }
});

export const connector = recipe({
  base: {
    position: "absolute",
    background: semanticColorRoles.border.subtle
  },
  variants: {
    direction: {
      horizontal: {
        top: "50%",
        left: "100%",
        width: themeVars.spacing.x3,
        height: "1px",
        transform: "translateY(-50%)"
      },
      vertical: {
        top: "100%",
        left: themeVars.spacing.x4,
        width: "1px",
        height: themeVars.spacing.x3
      }
    },
    status: {
      pending: {},
      current: { background: semanticColorRoles.button.solid.primary.background },
      approved: { background: semanticColorRoles.status.success.border },
      rejected: { background: semanticColorRoles.status.danger.border }
    }
  },
  defaultVariants: {
    direction: "horizontal",
    status: "pending"
  }
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: themeVars.spacing.x3
});

export const nameBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x1,
  minWidth: 0
});

export const name = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.primary
});

export const role = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary
});

export const order = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "28px",
  height: "28px",
  borderRadius: "999px",
  background: semanticColorRoles.surface.subtle,
  color: semanticColorRoles.text.secondary,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold
});

export const meta = style({
  display: "flex",
  flexDirection: "column",
  gap: themeVars.spacing.x1,
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary
});

export const comment = style({
  paddingTop: themeVars.spacing.x2,
  borderTop: `1px solid ${semanticColorRoles.border.subtle}`,
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary,
  whiteSpace: "pre-wrap"
});

globalStyle(`${item.classNames.base} strong`, {
  color: semanticColorRoles.text.primary
});
