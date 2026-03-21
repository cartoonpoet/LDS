import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars, grayPalette } from "@lds/tokens";

/* ─── root ─── */
export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontFamily: themeVars.font.family,
  userSelect: "none",
});

/* ─── slider row (track + thumbs) ─── */
export const sliderRow = style({
  position: "relative",
  height: 16,
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

/* ─── track ─── */
export const track = style({
  position: "absolute",
  left: 0,
  right: 0,
  height: 6,
  borderRadius: 3,
  backgroundColor: semanticColorRoles.action.primary.subtle,
});

export const trackFill = style({
  position: "absolute",
  height: 6,
  borderRadius: 3,
  backgroundColor: semanticColorRoles.action.primary.default,
});

/* ─── thumb ─── */
export const thumb = style({
  position: "absolute",
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: semanticColorRoles.surface.canvas,
  border: `2px solid ${semanticColorRoles.action.primary.default}`,
  boxSizing: "content-box",
  transform: "translateX(-50%)",
  cursor: "grab",
  zIndex: 2,
  transition: "box-shadow 150ms ease",
  outline: "none",
  ":hover": {
    boxShadow: `0 0 0 4px ${semanticColorRoles.action.primary.subtle}`,
  },
  ":active": {
    cursor: "grabbing",
  },
  ":focus-visible": {
    boxShadow: themeVars.shadow.focus,
  },
});

/* ─── value badge ─── */
export const valueBadge = style({
  position: "absolute",
  top: -28,
  transform: "translateX(-50%)",
  minWidth: 39,
  height: 22,
  padding: `0 ${themeVars.spacing.x1}`,
  borderRadius: "5px",
  backgroundColor: grayPalette[200],
  fontSize: "12px",
  fontWeight: "600",
  lineHeight: "22px",
  color: grayPalette[800],
  textAlign: "center",
  whiteSpace: "nowrap",
  zIndex: 3,
  pointerEvents: "none",
});

/* ─── ticks ─── */
export const ticksRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  height: 6,
  padding: "0 1px",
});

export const tick = style({
  width: 0.5,
  height: 6,
  backgroundColor: grayPalette[200],
  flexShrink: 0,
});

/* ─── scale labels (0, 10, 20 ... 100) ─── */
export const labelsRow = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 1px",
});

export const scaleLabel = style({
  fontSize: "11px",
  fontWeight: themeVars.font.weightRegular,
  color: grayPalette[300],
  textAlign: "center",
  minWidth: 16,
});
