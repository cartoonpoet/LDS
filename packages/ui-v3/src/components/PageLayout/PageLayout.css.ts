import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = recipe({
  base: {
    display: "grid",
    gridTemplateRows: "auto minmax(0, 1fr)",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    height: "100dvh",
    boxSizing: "border-box",
    background: semanticColorRoles.surface.page,
  },
  variants: {
    headerSpan: {
      /* Header가 상단 전폭, Nav는 그 아래 */
      full: { gridTemplateAreas: `"header header header" "nav content panel"` },
      /* Nav가 화면 높이 전체, Header는 Content·Panel 위에만 */
      content: { gridTemplateAreas: `"nav header header" "nav content panel"` },
    },
  },
  defaultVariants: { headerSpan: "full" },
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
  transition: `width ${themeVars.duration.slow} ${themeVars.easing.standard}`,
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
