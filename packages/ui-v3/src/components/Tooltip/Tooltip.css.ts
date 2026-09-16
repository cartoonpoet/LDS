import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, darkPalette, defaultDurationTokens } from "@lds/tokens";

/* ─── presence timing (index.tsx의 unmount 지연과 동일) ─── */
export const EXIT_MS = parseInt(defaultDurationTokens.base, 10);

/* ─── wrapper (anchor) ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
});

/* ─── tooltip container (위치만 담당 — 애니메이션은 body에) ─── */
export const tooltip = recipe({
  base: {
    position: "absolute",
    zIndex: 1100,
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  variants: {
    placement: {
      top: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column",
        marginBottom: themeVars.spacing.x1,
      },
      bottom: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column-reverse",
        marginTop: themeVars.spacing.x1,
      },
      left: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row",
        marginRight: themeVars.spacing.x1,
      },
      right: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row-reverse",
        marginLeft: themeVars.spacing.x1,
      },
    },
  },
  defaultVariants: { placement: "top" },
});

/* ─── tooltip body (dark box) — placement 방향으로 fade + slide ─── */
const slideFromBottom = keyframes({
  from: { opacity: 0, transform: "translateY(4px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});
const slideFromTop = keyframes({
  from: { opacity: 0, transform: "translateY(-4px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});
const slideFromRight = keyframes({
  from: { opacity: 0, transform: "translateX(4px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});
const slideFromLeft = keyframes({
  from: { opacity: 0, transform: "translateX(-4px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

export const body = recipe({
  base: {
    backgroundColor: darkPalette[700],
    borderRadius: themeVars.radius.md,
    padding: `5px ${themeVars.spacing.x3}`,
    maxWidth: 280,
    whiteSpace: "normal",
    transition: `transform ${themeVars.duration.base} ${themeVars.easing.standard}, opacity ${themeVars.duration.base} ${themeVars.easing.standard}`,
  },
  variants: {
    placement: {
      top: { animation: `${slideFromBottom} ${themeVars.duration.base} ${themeVars.easing.standard}` },
      bottom: { animation: `${slideFromTop} ${themeVars.duration.base} ${themeVars.easing.standard}` },
      left: { animation: `${slideFromRight} ${themeVars.duration.base} ${themeVars.easing.standard}` },
      right: { animation: `${slideFromLeft} ${themeVars.duration.base} ${themeVars.easing.standard}` },
    },
    closing: {
      true: { opacity: 0 },
      false: {},
    },
  },
  compoundVariants: [
    { variants: { placement: "top", closing: true }, style: { transform: "translateY(4px)" } },
    { variants: { placement: "bottom", closing: true }, style: { transform: "translateY(-4px)" } },
    { variants: { placement: "left", closing: true }, style: { transform: "translateX(4px)" } },
    { variants: { placement: "right", closing: true }, style: { transform: "translateX(-4px)" } },
  ],
  defaultVariants: { placement: "top", closing: false },
});

/* ─── single-line content ─── */
export const content = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: semanticColorRoles.text.inverse,
});

/* ─── title (2-row variant) ─── */
export const title = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "16px",
  color: semanticColorRoles.text.inverse,
  marginBottom: themeVars.spacing.x1,
});

/* ─── arrow shapes ─── */
const arrowBase = style({
  width: 0,
  height: 0,
  flexShrink: 0,
});

export const arrow = recipe({
  base: [arrowBase],
  variants: {
    placement: {
      top: {
        borderLeft: "5.5px solid transparent",
        borderRight: "5.5px solid transparent",
        borderTop: `5px solid ${darkPalette[700]}`,
      },
      bottom: {
        borderLeft: "5.5px solid transparent",
        borderRight: "5.5px solid transparent",
        borderBottom: `5px solid ${darkPalette[700]}`,
      },
      left: {
        borderTop: "4.5px solid transparent",
        borderBottom: "4.5px solid transparent",
        borderLeft: `5px solid ${darkPalette[700]}`,
      },
      right: {
        borderTop: "4.5px solid transparent",
        borderBottom: "4.5px solid transparent",
        borderRight: `5px solid ${darkPalette[700]}`,
      },
    },
  },
  defaultVariants: { placement: "top" },
});
