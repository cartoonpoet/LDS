import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  semanticColorRoles,
  themeVars,
  grayPalette,
  cyanPalette,
  opacityPalette,
} from "@lds/tokens";

/* ═══════════════════════════════════════════
   FileUploadArea
   ═══════════════════════════════════════════ */

/** gradient border 외곽 */
export const uploadAreaOuter = style({
  padding: 1,
  borderRadius: themeVars.radius.lg,
  background: `linear-gradient(to right, ${cyanPalette[200]}, ${semanticColorRoles.action.primary.default})`,
});

/** 내부 흰색 영역 */
export const uploadAreaInner = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: themeVars.spacing.x5,
  padding: `${themeVars.spacing.x5} ${themeVars.spacing.x6}`,
  backgroundColor: semanticColorRoles.surface.canvas,
  borderRadius: themeVars.radius.md,
  fontFamily: themeVars.font.family,
});

/** 상단 텍스트 영역 */
export const uploadTextGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  width: "100%",
});

export const uploadTitle = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "21px",
  color: cyanPalette[200],
});

export const uploadDescription = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: "18px",
  color: grayPalette[700],
  textAlign: "center",
});

/** 버튼 그룹 */
export const uploadButtons = style({
  display: "flex",
  gap: themeVars.spacing.x2,
});

export const attachButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
  height: 38,
  padding: `0 ${themeVars.spacing.x4}`,
  border: `1px solid ${grayPalette[600]}`,
  borderRadius: themeVars.radius.sm,
  backgroundColor: semanticColorRoles.surface.canvas,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  fontFamily: themeVars.font.family,
  color: semanticColorRoles.text.primary,
  cursor: "pointer",
  transition: "background-color 150ms ease, border-color 150ms ease",
  ":hover": {
    backgroundColor: opacityPalette.light,
  },
});

export const primaryButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
  height: 38,
  padding: `0 ${themeVars.spacing.x4}`,
  border: "none",
  borderRadius: themeVars.radius.sm,
  backgroundColor: semanticColorRoles.action.primary.default,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  fontFamily: themeVars.font.family,
  color: semanticColorRoles.text.inverse,
  cursor: "pointer",
  transition: "background-color 150ms ease",
  ":hover": {
    backgroundColor: semanticColorRoles.action.primary.active,
  },
});

/** 첨부 파일 목록 (completed 상태) */
export const attachedList = style({
  display: "flex",
  gap: themeVars.spacing.x3,
  width: "100%",
  flexWrap: "wrap",
});

/* ═══════════════════════════════════════════
   FileThumbnail
   ═══════════════════════════════════════════ */

export const thumbnail = recipe({
  base: {
    position: "relative",
    borderRadius: themeVars.radius.sm,
    overflow: "hidden",
    border: `1px solid ${semanticColorRoles.border.subtle}`,
    flexShrink: 0,
    cursor: "pointer",
  },
  variants: {
    layout: {
      horizontal: {},
      vertical: {},
    },
    size: {
      large: {},
      medium: {},
      small: {},
    },
  },
  compoundVariants: [
    { variants: { layout: "horizontal", size: "large" }, style: { width: 240, height: 153 } },
    { variants: { layout: "horizontal", size: "medium" }, style: { width: 138, height: 88 } },
    { variants: { layout: "horizontal", size: "small" }, style: { width: 104, height: 66 } },
    { variants: { layout: "vertical", size: "large" }, style: { width: 138, height: 216 } },
    { variants: { layout: "vertical", size: "medium" }, style: { width: 88, height: 138 } },
    { variants: { layout: "vertical", size: "small" }, style: { width: 58, height: 91 } },
  ],
  defaultVariants: { layout: "horizontal", size: "medium" },
});

export const thumbnailImg = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

export const thumbnailOverlay = style({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: themeVars.spacing.x2,
  opacity: 0,
  transition: "opacity 200ms ease",
  selectors: {
    [`*:hover > &`]: {
      opacity: 1,
    },
  },
});

export const thumbnailActions = style({
  display: "flex",
  gap: themeVars.spacing.x2,
  justifyContent: "flex-end",
});

export const thumbnailActionBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18,
  height: 18,
  border: "none",
  background: "none",
  cursor: "pointer",
  color: semanticColorRoles.text.inverse,
  padding: 0,
});

export const thumbnailFilename = style({
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.inverse,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontFamily: themeVars.font.family,
});

/* ═══════════════════════════════════════════
   FileItem
   ═══════════════════════════════════════════ */

export const fileItem = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: themeVars.spacing.x3,
    border: `1px solid ${semanticColorRoles.border.subtle}`,
    borderRadius: themeVars.radius.sm,
    backgroundColor: semanticColorRoles.surface.canvas,
    fontFamily: themeVars.font.family,
    transition: "border-color 150ms ease",
    ":hover": {
      borderColor: grayPalette[500],
    },
  },
  variants: {
    active: {
      true: {
        borderColor: semanticColorRoles.action.primary.default,
        backgroundColor: semanticColorRoles.action.primary.subtle,
      },
      false: {},
    },
  },
  defaultVariants: { active: false },
});

export const fileItemLeft = style({
  display: "flex",
  alignItems: "center",
  gap: themeVars.spacing.x2,
  minWidth: 0,
  flex: 1,
});

export const fileIconBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  flexShrink: 0,
  borderRadius: themeVars.radius.sm,
  backgroundColor: opacityPalette.light,
  color: grayPalette[600],
});

export const fileInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 0,
});

export const fileName = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.heading,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const fileMeta = style({
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  color: grayPalette[700],
});

export const fileDeleteBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18,
  height: 18,
  border: "none",
  background: "none",
  cursor: "pointer",
  color: grayPalette[500],
  padding: 0,
  flexShrink: 0,
  transition: "color 150ms ease",
  ":hover": {
    color: grayPalette[800],
  },
});

/* ═══════════════════════════════════════════
   FileAttachBadge
   ═══════════════════════════════════════════ */

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: themeVars.spacing.x1,
  height: 28,
  padding: `0 ${themeVars.spacing.x2}`,
  border: `1px solid ${semanticColorRoles.border.subtle}`,
  borderRadius: themeVars.radius.sm,
  backgroundColor: semanticColorRoles.surface.canvas,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightMedium,
  color: semanticColorRoles.text.heading,
  fontFamily: themeVars.font.family,
});

export const badgeIcon = style({
  color: grayPalette[500],
  display: "inline-flex",
  flexShrink: 0,
});

export const badgeRemoveBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 14,
  height: 14,
  border: "none",
  background: "none",
  cursor: "pointer",
  color: grayPalette[500],
  padding: 0,
  marginLeft: themeVars.spacing.x1,
  transition: "color 150ms ease",
  ":hover": {
    color: grayPalette[800],
  },
});

/* ═══════════════════════════════════════════
   Selected pill badge
   ═══════════════════════════════════════════ */

export const selectedPill = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 18,
  padding: `0 ${themeVars.spacing.x2}`,
  borderRadius: 17,
  backgroundColor: semanticColorRoles.action.primary.default,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.inverse,
  fontFamily: themeVars.font.family,
});
