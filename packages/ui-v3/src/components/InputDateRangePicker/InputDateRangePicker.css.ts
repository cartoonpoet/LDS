import { style } from "@vanilla-extract/css";
import { themeVars, grayPalette } from "@lds/tokens";

export const wrapper = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: 360,
  fontFamily: themeVars.font.family,
});

export const rangeTrigger = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  width: "100%",
  cursor: "pointer",
});

export const singleTrigger = style({
  width: "100%",
  cursor: "pointer",
});

export const rangeInput = style({
  flex: "1 1 0",
  minWidth: 0,
});

export const singleInput = style({
  width: "100%",
});

export const rangeSeparator = style({
  flexShrink: 0,
  fontSize: themeVars.font.sizeMd,
  color: grayPalette[500],
  fontWeight: themeVars.font.weightMedium,
  userSelect: "none",
});

export const calendarIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: grayPalette[500],
});
export const popover = style({
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  zIndex: 1000,
  borderRadius: themeVars.radius.sm,
  boxShadow: themeVars.shadow.raised,
});
