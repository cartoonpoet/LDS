import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  semanticColorRoles,
  themeVars,
  grayPalette,
} from "@lds/tokens";

/* ─── tree container ─── */
export const tree = style({
  display: "flex",
  flexDirection: "column",
  fontFamily: themeVars.font.family,
});

/* ─── tree item row ─── */
export const row = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 150ms ease",
    borderRadius: themeVars.radius.sm,
    userSelect: "none",
    ":hover": {
      backgroundColor: semanticColorRoles.action.primary.subtle,
    },
  },
  variants: {
    size: {
      medium: {
        height: 28,
        fontSize: "13px",
        fontWeight: themeVars.font.weightMedium,
      },
      small: {
        height: 24,
        fontSize: "11px",
        fontWeight: themeVars.font.weightMedium,
      },
    },
    selected: {
      true: {
        backgroundColor: semanticColorRoles.action.primary.subtle,
      },
      false: {},
    },
  },
  defaultVariants: { size: "medium", selected: false },
});

/* ─── indent / trail zone ─── */
export const trailZone = style({
  display: "flex",
  flexShrink: 0,
});

export const trailSegment = recipe({
  base: {
    width: 16,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flexShrink: 0,
  },
  variants: {
    hasLine: {
      true: {
        "::after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 1,
          backgroundColor: grayPalette[300],
        },
      },
      false: {},
    },
    isLast: {
      true: {
        "::after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: "50%",
          left: "50%",
          width: 1,
          backgroundColor: grayPalette[300],
        },
      },
      false: {},
    },
  },
  defaultVariants: { hasLine: false, isLast: false },
});

/* ─── caret (expand/collapse icon) ─── */
export const caret = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    flexShrink: 0,
    color: grayPalette[700],
    transition: "transform 200ms ease",
  },
  variants: {
    expanded: {
      true: { transform: "rotate(0deg)" },
      false: { transform: "rotate(-90deg)" },
    },
    visible: {
      true: {},
      false: { visibility: "hidden" as const },
    },
  },
  defaultVariants: { expanded: false, visible: true },
});

/* ─── level label badge (상위 마스터 / 마스터 / 하위) ─── */
export const levelBadge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 16,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: themeVars.radius.sm,
    fontSize: "11px",
    fontWeight: themeVars.font.weightBold,
    lineHeight: 1,
    whiteSpace: "nowrap",
    flexShrink: 0,
    marginRight: themeVars.spacing.x1,
  },
  variants: {
    color: {
      primary: {
        backgroundColor: semanticColorRoles.action.primary.subtle,
        color: semanticColorRoles.action.primary.default,
      },
      secondary: {
        backgroundColor: `rgba(130, 134, 139, 0.12)`,
        color: grayPalette[700],
      },
    },
  },
  defaultVariants: { color: "primary" },
});

/* ─── leading icons zone ─── */
export const leading = style({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
  gap: 4,
  paddingLeft: themeVars.spacing.x2,
});

/* ─── text zone ─── */
export const textZone = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
});

export const textSegment = recipe({
  base: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  variants: {
    type: {
      code: {
        color: semanticColorRoles.text.primary,
        fontWeight: themeVars.font.weightMedium,
      },
      title: {
        color: semanticColorRoles.text.primary,
        fontWeight: themeVars.font.weightBold,
        flex: 1,
        minWidth: 0,
      },
      date: {
        color: grayPalette[500],
        fontWeight: themeVars.font.weightMedium,
        flexShrink: 0,
      },
    },
  },
  defaultVariants: { type: "code" },
});

export const separator = style({
  color: grayPalette[300],
  flexShrink: 0,
  margin: "0 2px",
});

/* ─── children wrapper ─── */
export const children = style({
  display: "flex",
  flexDirection: "column",
});
