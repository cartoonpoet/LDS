import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

/* ─── dismiss wrapper (닫기 시 fade + width collapse 후 언마운트) ─── */
export const dismissOuter = recipe({
  base: {
    display: "inline-grid",
    overflow: "hidden",
    verticalAlign: "middle",
    transition: `grid-template-columns ${themeVars.duration.base} ${themeVars.easing.standard}, opacity ${themeVars.duration.base} ${themeVars.easing.standard}`,
  },
  variants: {
    dismissing: {
      true: { gridTemplateColumns: "0fr", opacity: 0 },
      false: { gridTemplateColumns: "1fr", opacity: 1 },
    },
  },
  defaultVariants: { dismissing: false },
});

export const dismissInner = style({
  overflow: "hidden",
  minWidth: 0,
});

export const chip = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: themeVars.spacing.x1,
    minHeight: "22px",
    padding: `0 ${themeVars.spacing.x2}`,
    borderRadius: "999px",
    border: `1px solid ${themeVars.color.neutralBorder}`,
    backgroundColor: themeVars.color.neutralSurface,
    color: themeVars.color.textSecondary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    whiteSpace: "nowrap"
  },
  variants: {
    selected: {
      true: {
        borderColor: "#b7c7ff",
        backgroundColor: "#eef3ff",
        color: themeVars.color.accentPrimary
      },
      false: {}
    },
    checkable: {
      true: {},
      false: {}
    }
  },
  defaultVariants: {
    selected: false,
    checkable: false
  }
});

export const leading = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  lineHeight: 1
});

export const dismissButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "10px",
  height: "10px",
  border: 0,
  background: "transparent",
  padding: 0,
  color: "inherit",
  fontSize: "10px",
  lineHeight: 1,
  cursor: "pointer"
});
