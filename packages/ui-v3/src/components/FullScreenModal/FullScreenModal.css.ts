import { keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, defaultDurationTokens } from "@lds/tokens";

/* ─── presence timing (index.tsx의 unmount 지연과 동일) ─── */
export const EXIT_MS = parseInt(defaultDurationTokens.slow, 10);

/* ─── full-viewport surface (backdrop 없이 전체 표면) ─── */
const slideUp = keyframes({
  from: { opacity: 0, transform: "translateY(24px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const surface = recipe({
  base: {
    position: "fixed",
    inset: 0,
    zIndex: 9000,
    display: "flex",
    flexDirection: "column",
    backgroundColor: semanticColorRoles.surface.canvas,
    fontFamily: themeVars.font.family,
    color: semanticColorRoles.text.primary,
    overflow: "hidden",
    animation: `${slideUp} ${themeVars.duration.slow} ${themeVars.easing.standard}`,
    transition: `transform ${themeVars.duration.slow} ${themeVars.easing.standard}, opacity ${themeVars.duration.slow} ${themeVars.easing.standard}`,
  },
  variants: {
    closing: {
      true: { opacity: 0, transform: "translateY(24px)" },
      false: {},
    },
  },
  defaultVariants: { closing: false },
});
