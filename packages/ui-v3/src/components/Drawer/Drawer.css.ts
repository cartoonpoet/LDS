import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

/* ─── transition duration (index.tsx의 unmount 지연과 동일) ─── */
export const TRANSITION_MS = 200;

/* ─── overlay (backdrop) ─── */
const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const overlay = recipe({
  base: {
    position: "fixed",
    inset: 0,
    zIndex: 9000,
    backgroundColor: semanticColorRoles.surface.backdrop,
    animation: `${fadeIn} ${TRANSITION_MS}ms ease`,
    transition: `opacity ${TRANSITION_MS}ms ease`,
  },
  variants: {
    closing: {
      true: { opacity: 0 },
      false: {},
    },
  },
  defaultVariants: { closing: false },
});

/* ─── slide-in panel ─── */
const slideInRight = keyframes({
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
});

const slideInLeft = keyframes({
  from: { transform: "translateX(-100%)" },
  to: { transform: "translateX(0)" },
});

export const panel = recipe({
  base: {
    position: "fixed",
    top: 0,
    bottom: 0,
    zIndex: 9000,
    display: "flex",
    flexDirection: "column",
    maxWidth: "100vw",
    backgroundColor: semanticColorRoles.surface.canvas,
    boxShadow: themeVars.shadow.modal,
    fontFamily: themeVars.font.family,
    color: semanticColorRoles.text.primary,
    overflow: "hidden",
    transition: `transform ${TRANSITION_MS}ms ease`,
  },
  variants: {
    side: {
      right: {
        right: 0,
        animation: `${slideInRight} ${TRANSITION_MS}ms ease`,
      },
      left: {
        left: 0,
        animation: `${slideInLeft} ${TRANSITION_MS}ms ease`,
      },
    },
    size: {
      small: { width: 360 },
      medium: { width: 480 },
      large: { width: 640 },
    },
    closing: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { side: "right", closing: true },
      style: { transform: "translateX(100%)" },
    },
    {
      variants: { side: "left", closing: true },
      style: { transform: "translateX(-100%)" },
    },
  ],
  defaultVariants: { side: "right", size: "medium", closing: false },
});
