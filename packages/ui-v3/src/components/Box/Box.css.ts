import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles } from "@lds/tokens";

export const box = recipe({
  base: {
    boxSizing: "border-box",
  },
  variants: {
    bg: {
      page: { background: semanticColorRoles.surface.page },
      canvas: { background: semanticColorRoles.surface.canvas },
      subtle: { background: semanticColorRoles.surface.subtle },
      raised: { background: semanticColorRoles.surface.raised },
    },
    border: {
      true: { border: `1px solid ${semanticColorRoles.border.subtle}` },
    },
  },
});
