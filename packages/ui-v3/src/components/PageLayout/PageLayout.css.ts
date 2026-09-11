import { style } from "@vanilla-extract/css";
import { semanticColorRoles } from "@lds/tokens";

export const root = style({
  display: "grid",
  gridTemplateAreas: `"header header header" "nav content panel"`,
  gridTemplateRows: "auto minmax(0, 1fr)",
  gridTemplateColumns: "auto minmax(0, 1fr) auto",
  height: "100dvh",
  boxSizing: "border-box",
  background: semanticColorRoles.surface.page,
});

export const header = style({
  gridArea: "header",
  boxSizing: "border-box",
  background: semanticColorRoles.surface.canvas,
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
});

export const nav = style({
  gridArea: "nav",
  boxSizing: "border-box",
  overflowY: "auto",
  background: semanticColorRoles.surface.subtle,
  borderRight: `1px solid ${semanticColorRoles.border.subtle}`,
  transition: "width 0.2s ease",
});

export const content = style({
  gridArea: "content",
  boxSizing: "border-box",
  minWidth: 0,
  overflowY: "auto",
});

export const panel = style({
  gridArea: "panel",
  boxSizing: "border-box",
  overflowY: "auto",
  background: semanticColorRoles.surface.canvas,
  borderLeft: `1px solid ${semanticColorRoles.border.subtle}`,
});
