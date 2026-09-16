import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars, grayPalette, defaultDurationTokens } from "@lds/tokens";

/* ─── presence timing (index.tsx의 unmount 지연과 동일) ─── */
export const EXIT_MS = parseInt(defaultDurationTokens.base, 10);

/* ─── relative wrapper (input + floating calendar) ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: 260,
  fontFamily: themeVars.font.family,
});

/* ─── clickable trigger area (input box) ─── */
export const trigger = style({
  cursor: "pointer",
});

/* ─── calendar icon inside the input ─── */
export const calendarIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: grayPalette[500],
});

/* ─── floating calendar popover ─── */
const slideFromTop = keyframes({
  from: { opacity: 0, transform: "translateY(-4px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const popover = recipe({
  base: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    zIndex: 1000,
    borderRadius: themeVars.radius.sm,
    boxShadow: themeVars.shadow.raised,
    animation: `${slideFromTop} ${themeVars.duration.base} ${themeVars.easing.standard}`,
    transition: `transform ${themeVars.duration.base} ${themeVars.easing.standard}, opacity ${themeVars.duration.base} ${themeVars.easing.standard}`,
  },
  variants: {
    closing: {
      true: { opacity: 0, transform: "translateY(-4px)" },
      false: {},
    },
  },
  defaultVariants: { closing: false },
});
