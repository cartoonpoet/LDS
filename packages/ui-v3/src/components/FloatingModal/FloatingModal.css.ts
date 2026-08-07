import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

/* ─── floating card (Modal card 시각 언어 + 우/좌 하단 고정) ─── */
export const card = recipe({
  base: {
    position: "fixed",
    bottom: themeVars.spacing.x6,
    zIndex: 8000,
    display: "flex",
    flexDirection: "column",
    width: 380,
    maxWidth: `calc(100vw - ${themeVars.spacing.x6} * 2)`,
    maxHeight: "70vh",
    backgroundColor: semanticColorRoles.surface.canvas,
    borderRadius: themeVars.radius.md,
    boxShadow: themeVars.shadow.modal,
    fontFamily: themeVars.font.family,
    color: semanticColorRoles.text.primary,
    overflow: "hidden",
  },
  variants: {
    position: {
      "bottom-right": { right: themeVars.spacing.x6 },
      "bottom-left": { left: themeVars.spacing.x6 },
    },
  },
  defaultVariants: { position: "bottom-right" },
});
