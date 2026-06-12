import { style } from "@vanilla-extract/css";
import { themeVars, grayPalette } from "@lds/tokens";

/* ─── relative wrapper (input + floating calendar) ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: 260,
  fontFamily: themeVars.font.family,
});

/* ─── clickable trigger area (input box) ─── */
export const trigger = style({
  cursor: "pointer",
});

/* ─── calendar icon inside the input ─── */
export const calendarIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: grayPalette[500],
});

/* ─── floating calendar popover ─── */
export const popover = style({
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  zIndex: 1000,
  borderRadius: themeVars.radius.sm,
  boxShadow: themeVars.shadow.raised,
});
