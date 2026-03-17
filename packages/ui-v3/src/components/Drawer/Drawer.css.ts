import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = recipe({
  base: {
    position: "fixed",
    inset: 0,
    display: "flex",
    pointerEvents: "none",
    zIndex: 1000
  },
  variants: {
    open: {
      true: { pointerEvents: "auto" },
      false: { visibility: "hidden" }
    },
    placement: {
      left: { justifyContent: "flex-start", alignItems: "stretch" },
      right: { justifyContent: "flex-end", alignItems: "stretch" },
      bottom: { justifyContent: "center", alignItems: "flex-end" }
    }
  },
  defaultVariants: {
    open: false,
    placement: "right"
  }
});

export const backdrop = style({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.4)"
});

export const panel = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: themeVars.spacing.x4,
    minWidth: 320,
    maxWidth: "100%",
    maxHeight: "100vh",
    padding: themeVars.spacing.x5,
    backgroundColor: semanticColorRoles.surface.canvas,
    boxShadow: themeVars.shadow.raised,
    overflow: "auto"
  },
  variants: {
    placement: {
      left: { height: "100vh" },
      right: { height: "100vh" },
      bottom: {
        width: "min(960px, 100vw)",
        borderTopLeftRadius: themeVars.radius.lg,
        borderTopRightRadius: themeVars.radius.lg
      }
    }
  },
  defaultVariants: {
    placement: "right"
  }
});

export const header = style({ display: "flex", justifyContent: "space-between", gap: themeVars.spacing.x3, alignItems: "flex-start" });
export const titleBlock = style({ display: "flex", flexDirection: "column", gap: themeVars.spacing.x1 });
export const title = style({ fontSize: themeVars.font.sizeLg, fontWeight: themeVars.font.weightBold, color: semanticColorRoles.text.primary });
export const description = style({ fontSize: themeVars.font.sizeSm, color: semanticColorRoles.text.secondary });
export const closeButton = style({ border: 0, background: "transparent", cursor: "pointer", color: semanticColorRoles.text.secondary, fontSize: themeVars.font.sizeLg });
export const body = style({ display: "flex", flexDirection: "column", gap: themeVars.spacing.x4 });
export const footer = style({ display: "flex", justifyContent: "flex-end", gap: themeVars.spacing.x2 });
