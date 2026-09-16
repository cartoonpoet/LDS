import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, defaultDurationTokens } from "@lds/tokens";

/* ─── presence timing (index.tsx의 unmount 지연과 동일) ─── */
export const EXIT_MS = parseInt(defaultDurationTokens.base, 10);

/* ─── wrapper (anchor) ─── */
export const wrapper = style({
  position: "relative",
  display: "inline-flex",
});

/* ─── popover container ─── */
export const popover = recipe({
  base: {
    position: "absolute",
    zIndex: 1100,
    display: "flex",
    alignItems: "center",
  },
  variants: {
    placement: {
      top: {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column",
        marginBottom: 6,
      },
      bottom: {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "column-reverse",
        marginTop: 6,
      },
      left: {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row",
        marginRight: 6,
      },
      right: {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        flexDirection: "row-reverse",
        marginLeft: 6,
      },
    },
  },
  defaultVariants: { placement: "bottom" },
});

/* ─── card (white box) — placement 방향으로 fade + 4~8px slide ─── */
const slideFromBottom = keyframes({
  from: { opacity: 0, transform: "translateY(6px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});
const slideFromTop = keyframes({
  from: { opacity: 0, transform: "translateY(-6px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});
const slideFromRight = keyframes({
  from: { opacity: 0, transform: "translateX(6px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});
const slideFromLeft = keyframes({
  from: { opacity: 0, transform: "translateX(-6px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

const cardTransition = `transform ${themeVars.duration.base} ${themeVars.easing.standard}, opacity ${themeVars.duration.base} ${themeVars.easing.standard}`;

export const card = recipe({
  base: {
    backgroundColor: semanticColorRoles.surface.canvas,
    borderRadius: themeVars.radius.md,
    border: `1px solid ${grayPalette[200]}`,
    boxShadow: themeVars.shadow.raised,
    overflow: "hidden",
    width: 276,
    display: "flex",
    flexDirection: "column",
    transition: cardTransition,
  },
  variants: {
    /* placement === popover가 뜨는 방향 → 그 반대쪽에서 미끄러져 들어옴 */
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
    { variants: { placement: "top", closing: true }, style: { transform: "translateY(6px)" } },
    { variants: { placement: "bottom", closing: true }, style: { transform: "translateY(-6px)" } },
    { variants: { placement: "left", closing: true }, style: { transform: "translateX(6px)" } },
    { variants: { placement: "right", closing: true }, style: { transform: "translateX(-6px)" } },
  ],
  defaultVariants: { placement: "bottom", closing: false },
});

/* ─── header bar (accent blue) ─── */
export const header = style({
  backgroundColor: semanticColorRoles.action.primary.default,
  padding: `${themeVars.spacing.x2} ${themeVars.spacing.x4}`,
  minHeight: 38,
  display: "flex",
  alignItems: "center",
});

export const headerTitle = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeLg,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "24px",
  color: semanticColorRoles.text.inverse,
});

/* ─── body ─── */
export const body = style({
  padding: `${themeVars.spacing.x3} ${themeVars.spacing.x4}`,
});

export const bodyText = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightRegular,
  lineHeight: "21px",
  color: semanticColorRoles.text.secondary,
});

/* ─── footer (buttons) ─── */
export const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: themeVars.spacing.x2,
  padding: `0 ${themeVars.spacing.x4} ${themeVars.spacing.x3}`,
});

export const primaryBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `6px ${themeVars.spacing.x4}`,
  height: 29,
  backgroundColor: semanticColorRoles.action.primary.default,
  borderRadius: themeVars.radius.sm,
  border: "none",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.inverse,
  cursor: "pointer",
  transition: `opacity ${themeVars.duration.base} ${themeVars.easing.standard}`,
  selectors: {
    "&:hover": { opacity: 0.9 },
  },
});

export const outlineBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: `6px ${themeVars.spacing.x4}`,
  height: 29,
  backgroundColor: "transparent",
  borderRadius: themeVars.radius.sm,
  border: `1px solid ${semanticColorRoles.action.primary.default}`,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.action.primary.default,
  cursor: "pointer",
  transition: `background-color ${themeVars.duration.base} ${themeVars.easing.standard}`,
  selectors: {
    "&:hover": { backgroundColor: "rgba(33, 81, 236, 0.06)" },
  },
});

/* ─── arrow ─── */
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
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderTop: "7px solid rgb(53, 56, 60)",
      },
      bottom: {
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderBottom: "7px solid rgb(53, 56, 60)",
      },
      left: {
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
        borderLeft: "7px solid rgb(53, 56, 60)",
      },
      right: {
        borderTop: "7px solid transparent",
        borderBottom: "7px solid transparent",
        borderRight: "7px solid rgb(53, 56, 60)",
      },
    },
  },
  defaultVariants: { placement: "bottom" },
});
