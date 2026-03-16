import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const chip = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: themeVars.spacing.x1,
    minHeight: "22px",
    padding: `0 ${themeVars.spacing.x2}`,
    borderRadius: "999px",
    border: `1px solid ${semanticColorRoles.chip.border}`,
    backgroundColor: semanticColorRoles.chip.background,
    color: semanticColorRoles.chip.text,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightMedium,
    lineHeight: 1,
    whiteSpace: "nowrap",
    boxSizing: "border-box"
  },
  variants: {
    kind: {
      basic: {},
      check: {
        minHeight: "24px",
        paddingLeft: themeVars.spacing.x1
      },
      file: {
        minHeight: "20px",
        paddingRight: themeVars.spacing.x1,
        borderRadius: themeVars.radius.sm
      },
      link: {
        minHeight: "20px",
        paddingRight: themeVars.spacing.x1,
        borderRadius: themeVars.radius.sm,
        color: semanticColorRoles.action.primary.default
      }
    },
    selected: {
      true: {},
      false: {}
    }
  },
  compoundVariants: [
    {
      variants: { kind: "basic", selected: true },
      style: {
        borderColor: semanticColorRoles.chip.selected.basic.border,
        backgroundColor: semanticColorRoles.chip.selected.basic.background,
        color: semanticColorRoles.chip.selected.basic.text
      }
    },
    {
      variants: { kind: "check", selected: true },
      style: {
        borderColor: semanticColorRoles.chip.selected.check.border,
        backgroundColor: semanticColorRoles.chip.selected.check.background,
        color: semanticColorRoles.chip.selected.check.text
      }
    },
    {
      variants: { kind: "file", selected: true },
      style: {
        borderColor: semanticColorRoles.chip.selected.file.border,
        backgroundColor: semanticColorRoles.chip.selected.file.background,
        color: semanticColorRoles.chip.selected.file.text
      }
    },
    {
      variants: { kind: "link", selected: true },
      style: {
        borderColor: semanticColorRoles.chip.selected.link.border,
        backgroundColor: semanticColorRoles.chip.selected.link.background,
        color: semanticColorRoles.chip.selected.link.text
      }
    }
  ],
  defaultVariants: {
    kind: "basic",
    selected: false
  }
});

export const leading = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  lineHeight: 1,
  flexShrink: 0
});

export const checkIndicator = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "14px",
  height: "14px",
  borderRadius: "999px",
  border: `1px solid ${semanticColorRoles.border.strong}`,
  backgroundColor: semanticColorRoles.surface.canvas,
  color: semanticColorRoles.action.primary.default,
  fontSize: "9px",
  lineHeight: 1,
  boxSizing: "border-box"
});

export const label = style({
  minWidth: 0
});

export const metaText = recipe({
  base: {
    fontSize: "10px",
    lineHeight: 1,
    fontWeight: themeVars.font.weightMedium
  },
  variants: {
    kind: {
      file: {
        color: semanticColorRoles.status.success.text
      },
      link: {
        color: semanticColorRoles.action.primary.default
      }
    }
  }
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
  cursor: "pointer",
  flexShrink: 0
});
