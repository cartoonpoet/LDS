import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, textStyles, themeVars } from "@lds/tokens";

const gradient = semanticColorRoles.button.gradient.primary;

const focusRing = {
  "&:focus-visible": {
    outline: "none",
    boxShadow: themeVars.shadow.focus,
  },
} as const;

/* ─── root nav ─── */
export const root = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    fontFamily: themeVars.font.family,
    background: semanticColorRoles.surface.canvas,
    boxShadow: themeVars.shadow.raised,
    transition: `width ${themeVars.duration.slow} ${themeVars.easing.standard}`,
  },
  variants: {
    collapsed: {
      false: { width: 260 },
      true: { width: 80 },
    },
  },
  defaultVariants: { collapsed: false },
});

/* ─── header (logo + toggle) ─── */
export const header = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: themeVars.spacing.x3,
    flexShrink: 0,
    padding: `${themeVars.spacing.x6} ${themeVars.spacing.x6} 0`,
  },
  variants: {
    collapsed: {
      false: { justifyContent: "space-between" },
      true: { flexDirection: "column", paddingInline: 0 },
    },
  },
  defaultVariants: { collapsed: false },
});

export const logo = style({
  display: "flex",
  alignItems: "center",
  minWidth: 0,
  height: 30,
});

export const toggle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 30,
  height: 30,
  padding: 0,
  border: "none",
  borderRadius: themeVars.radius.sm,
  background: semanticColorRoles.surface.tableHeader,
  color: semanticColorRoles.text.primary,
  cursor: "pointer",
  transition: `background ${themeVars.duration.base} ${themeVars.easing.standard}`,
  selectors: {
    "&:hover": { background: semanticColorRoles.surface.raised },
    ...focusRing,
  },
});

/* 접힘 상태에선 펼치기 방향으로 반전 */
export const toggleIconFlipped = style({ transform: "scaleX(-1)" });

/* ─── menu list ─── */
export const list = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    margin: 0,
    padding: `${themeVars.spacing.x6} ${themeVars.spacing.x4}`,
    overflowY: "auto",
    listStyle: "none",
  },
  variants: {
    collapsed: {
      false: {},
      true: { alignItems: "center", paddingInline: 0 },
    },
  },
  defaultVariants: { collapsed: false },
});

/* ─── 1depth item ─── */
export const item = recipe({
  base: {
    ...textStyles.menu.active,
    fontFamily: themeVars.font.family,
    display: "flex",
    alignItems: "center",
    gap: themeVars.spacing.x2,
    width: "100%",
    height: 42,
    padding: `0 ${themeVars.spacing.x4}`,
    boxSizing: "border-box",
    border: "none",
    borderRadius: themeVars.radius.md,
    background: "transparent",
    color: semanticColorRoles.text.primary,
    textAlign: "left",
    textDecoration: "none",
    cursor: "pointer",
    transition: `background ${themeVars.duration.base} ${themeVars.easing.standard}`,
    selectors: {
      /* background 단축 속성은 active 그라데이션(background-image)을 지우므로 color만 바꾼다 */
      "&:hover": { backgroundColor: semanticColorRoles.surface.subtle },
      ...focusRing,
    },
  },
  variants: {
    active: {
      false: {},
      true: {
        backgroundImage: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
        color: gradient.text,
        fontWeight: themeVars.font.weightBold,
      },
    },
    collapsed: {
      false: {},
      true: { justifyContent: "center", width: 42, padding: 0 },
    },
  },
  defaultVariants: { active: false, collapsed: false },
});

export const icon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 18,
  height: 18,
});

/* 아이콘 크기는 slot이 결정 — Icon size prop과 무관하게 18px로 맞춘다 */
globalStyle(`${icon} > svg`, { width: "100%", height: "100%" });

export const label = style({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const chevron = recipe({
  base: {
    display: "inline-flex",
    flexShrink: 0,
    transition: `transform ${themeVars.duration.base} ${themeVars.easing.standard}`,
  },
  variants: {
    open: {
      false: {},
      true: { transform: "rotate(90deg)" },
    },
  },
  defaultVariants: { open: false },
});

/* ─── 2depth ─── */
export const subList = style({
  display: "flex",
  flexDirection: "column",
  margin: 0,
  padding: `${themeVars.spacing.x2} 0`,
  listStyle: "none",
});

export const subItem = recipe({
  base: {
    ...textStyles.bodyParagraph.body,
    fontFamily: themeVars.font.family,
    display: "flex",
    alignItems: "center",
    gap: themeVars.spacing.x3,
    width: "100%",
    height: 35,
    padding: `0 ${themeVars.spacing.x4}`,
    boxSizing: "border-box",
    border: "none",
    borderRadius: themeVars.radius.md,
    background: "transparent",
    color: semanticColorRoles.text.primary,
    textAlign: "left",
    textDecoration: "none",
    cursor: "pointer",
    transition: `background ${themeVars.duration.base} ${themeVars.easing.standard}`,
    selectors: {
      "&:hover": { background: semanticColorRoles.surface.subtle },
      ...focusRing,
    },
  },
  variants: {
    active: {
      false: {},
      true: {
        background: semanticColorRoles.surface.page,
        selectors: { "&:hover": { background: semanticColorRoles.surface.page } },
      },
    },
  },
  defaultVariants: { active: false },
});

export const bullet = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 18,
  height: 18,
  "::before": {
    content: '""',
    width: 10,
    height: 10,
    boxSizing: "border-box",
    border: "1.5px solid currentColor",
    borderRadius: "50%",
  },
});
