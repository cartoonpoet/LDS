import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

/* ─── wrapper (anchor) ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
});

/* ─── tooltip container ─── */
export const tooltip = recipe({
  base: {
    position: "absolute",
    zIndex: 1100,
    display: "flex",
    alignItems: "center",
    animation: `${fadeIn} 150ms ease`,
    pointerEvents: "none",
  },
  variants: {
    placement: {
      top: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column",
        marginBottom: 4,
      },
      bottom: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column-reverse",
        marginTop: 4,
      },
      left: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row",
        marginRight: 4,
      },
      right: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row-reverse",
        marginLeft: 4,
      },
    },
  },
  defaultVariants: { placement: "top" },
});

/* ─── tooltip body (dark box) ─── */
export const body = style({
  backgroundColor: "rgb(52, 52, 52)",
  borderRadius: themeVars.radius.md,
  padding: `5px ${themeVars.spacing.x3}`,
  maxWidth: 280,
  whiteSpace: "normal",
});

/* ─── single-line content ─── */
export const content = style({
  fontFamily: themeVars.font.family,
  fontSize: "13px",
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: "rgb(255, 255, 255)",
});

/* ─── title (2-row variant) ─── */
export const title = style({
  fontFamily: themeVars.font.family,
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: "16px",
  color: "rgb(255, 255, 255)",
  marginBottom: 4,
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
        borderTop: "5px solid rgb(52, 52, 52)",
      },
      bottom: {
        borderLeft: "5.5px solid transparent",
        borderRight: "5.5px solid transparent",
        borderBottom: "5px solid rgb(52, 52, 52)",
      },
      left: {
        borderTop: "4.5px solid transparent",
        borderBottom: "4.5px solid transparent",
        borderLeft: "5px solid rgb(52, 52, 52)",
      },
      right: {
        borderTop: "4.5px solid transparent",
        borderBottom: "4.5px solid transparent",
        borderRight: "5px solid rgb(52, 52, 52)",
      },
    },
  },
  defaultVariants: { placement: "top" },
});
