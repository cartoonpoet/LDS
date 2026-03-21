import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  semanticColorRoles,
  themeVars,
  grayPalette,
  greenPalette,
  redPalette,
  yellowPalette,
  cyanPalette,
} from "@lds/tokens";

/* ─── avatar base ─── */
export const avatar = recipe({
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    overflow: "visible",
    flexShrink: 0,
    fontFamily: themeVars.font.family,
  },
  variants: {
    size: {
      sm: { width: 24, height: 24 },
      md: { width: 38, height: 38 },
      lg: { width: 48, height: 48 },
    },
  },
  defaultVariants: { size: "md" },
});

/* ─── photo / system inner circle ─── */
export const photoCircle = style({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
  display: "block",
});

export const systemCircle = style({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  backgroundColor: semanticColorRoles.action.primary.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: semanticColorRoles.text.inverse,
});

/* ─── label circle (initials) ─── */
export const labelCircle = recipe({
  base: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    textAlign: "center",
  },
  variants: {
    color: {
      primary: {
        backgroundColor: semanticColorRoles.action.primary.subtle,
        color: semanticColorRoles.action.primary.default,
      },
      success: {
        backgroundColor: greenPalette[100],
        color: greenPalette[500],
      },
      danger: {
        backgroundColor: redPalette[100],
        color: redPalette[200],
      },
      warning: {
        backgroundColor: yellowPalette[100],
        color: yellowPalette[200],
      },
      info: {
        backgroundColor: cyanPalette[100],
        color: cyanPalette[200],
      },
      secondary: {
        backgroundColor: `rgba(130, 134, 139, 0.12)`,
        color: grayPalette[600],
      },
    },
    size: {
      sm: { fontSize: "10px", lineHeight: "24px" },
      md: { fontSize: themeVars.font.sizeLg, lineHeight: "38px" },
      lg: { fontSize: "20px", lineHeight: "48px" },
    },
  },
  defaultVariants: { color: "success", size: "md" },
});

/* ─── status dot ─── */
export const statusDot = recipe({
  base: {
    position: "absolute",
    borderRadius: "50%",
    border: `2px solid ${semanticColorRoles.surface.canvas}`,
    boxSizing: "content-box",
  },
  variants: {
    status: {
      online: { backgroundColor: greenPalette[500] },
      away: { backgroundColor: yellowPalette[200] },
      busy: { backgroundColor: redPalette[200] },
    },
    size: {
      sm: { width: 6, height: 6, bottom: -1, right: -1 },
      md: { width: 8, height: 8, bottom: 0, right: 0 },
      lg: { width: 10, height: 10, bottom: 0, right: 0 },
    },
  },
  defaultVariants: { status: "online", size: "md" },
});

/* ─── avatar group ─── */
export const group = style({
  display: "inline-flex",
  alignItems: "center",
});

export const groupItem = style({
  marginLeft: -8,
  borderRadius: "50%",
  border: `2px solid ${semanticColorRoles.surface.canvas}`,
  boxSizing: "content-box",
  selectors: {
    "&:first-child": {
      marginLeft: 0,
    },
  },
});
