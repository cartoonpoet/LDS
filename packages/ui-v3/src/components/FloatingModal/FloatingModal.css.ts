import { keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, defaultDurationTokens } from "@lds/tokens";

/* ─── presence timing (index.tsx의 unmount 지연과 동일) ─── */
export const EXIT_MS = parseInt(defaultDurationTokens.base, 10);

/* ─── floating card (Modal card 시각 언어 + 우/좌 하단 고정) ─── */
const slideUp = keyframes({
  from: { opacity: 0, transform: "translateY(16px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

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
    animation: `${slideUp} ${themeVars.duration.base} ${themeVars.easing.standard}`,
    transition: `transform ${themeVars.duration.base} ${themeVars.easing.standard}, opacity ${themeVars.duration.base} ${themeVars.easing.standard}`,
  },
  variants: {
    position: {
      "bottom-right": { right: themeVars.spacing.x6 },
      "bottom-left": { left: themeVars.spacing.x6 },
    },
    closing: {
      true: { opacity: 0, transform: "translateY(16px)" },
      false: {},
    },
  },
  defaultVariants: { position: "bottom-right", closing: false },
});
