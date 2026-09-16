import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars, grayPalette, defaultDurationTokens } from "@lds/tokens";

/* ─── presence timing (index.tsx의 unmount 지연과 동일) ─── */
export const EXIT_MS = parseInt(defaultDurationTokens.base, 10);

export const wrapper = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: 360,
  fontFamily: themeVars.font.family,
});

export const rangeTrigger = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  width: "100%",
  cursor: "pointer",
});

export const singleTrigger = style({
  width: "100%",
  cursor: "pointer",
});

export const rangeInput = style({
  flex: "1 1 0",
  minWidth: 0,
});

export const singleInput = style({
  width: "100%",
});

export const rangeSeparator = style({
  flexShrink: 0,
  fontSize: themeVars.font.sizeMd,
  color: grayPalette[500],
  fontWeight: themeVars.font.weightMedium,
  userSelect: "none",
});

export const calendarIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: grayPalette[500],
});
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
