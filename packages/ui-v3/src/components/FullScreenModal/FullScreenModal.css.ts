import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

/* ─── full-viewport surface (backdrop 없이 전체 표면) ─── */
export const surface = style({
  position: "fixed",
  inset: 0,
  zIndex: 9000,
  display: "flex",
  flexDirection: "column",
  backgroundColor: semanticColorRoles.surface.canvas,
  fontFamily: themeVars.font.family,
  color: semanticColorRoles.text.primary,
  overflow: "hidden",
});
