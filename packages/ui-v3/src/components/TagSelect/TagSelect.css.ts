import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── root ─── */
export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  fontFamily: themeVars.font.family,
  width: "100%",
});

/* ─── trigger (select input) ─── */
export const trigger = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  height: 38,
  padding: "0 14px",
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.sm,
  border: `1px solid rgb(235, 233, 241)`,
  boxSizing: "border-box",
  cursor: "pointer",
  transition: "border-color 150ms ease",
  selectors: {
    "&:focus-within": {
      borderColor: semanticColorRoles.action.primary.default,
    },
  },
});

export const triggerInput = style({
  flex: 1,
  minWidth: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  fontSize: "13px",
  fontWeight: themeVars.font.weightRegular,
  color: semanticColorRoles.text.primary,
  lineHeight: "22px",
  padding: 0,
  "::placeholder": {
    color: "rgb(98, 111, 134)",
  },
});

export const triggerIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 14,
  height: 14,
  flexShrink: 0,
  color: grayPalette[400],
});

/* ─── tags row ─── */
export const tags = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 4,
});

export const tag = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  height: 24,
  padding: "0 10px",
  borderRadius: 30,
  border: `1px solid ${semanticColorRoles.action.primary.default}`,
  backgroundColor: "transparent",
  fontSize: "13px",
  fontWeight: themeVars.font.weightRegular,
  color: semanticColorRoles.action.primary.default,
  whiteSpace: "nowrap",
});

export const tagRemove = style({
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
  position: "relative",
});

export const menu = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.md,
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
  maxHeight: 200,
  overflowY: "auto",
  padding: "4px 0",
});

export const option = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  padding: "6px 12px",
  minHeight: 32,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "13px",
  fontWeight: themeVars.font.weightRegular,
  color: semanticColorRoles.text.primary,
  textAlign: "left",
  boxSizing: "border-box",
  transition: "background-color 100ms ease",
  selectors: {
    "&:hover": {
      backgroundColor: "rgba(33, 81, 236, 0.06)",
    },
  },
});

export const optionCheck = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 16,
  height: 16,
  borderRadius: 3,
  border: `1.5px solid ${grayPalette[400]}`,
  backgroundColor: semanticColorRoles.surface.canvas,
  flexShrink: 0,
  transition: "background-color 150ms ease, border-color 150ms ease",
});

export const optionCheckSelected = style({
  backgroundColor: semanticColorRoles.action.primary.default,
  borderColor: semanticColorRoles.action.primary.default,
  color: "rgb(255, 255, 255)",
});
