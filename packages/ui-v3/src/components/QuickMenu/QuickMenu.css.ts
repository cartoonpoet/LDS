import { style } from "@vanilla-extract/css";
import {
  semanticColorRoles,
  themeVars,
  grayPalette,
  opacityPalette,
} from "@lds/tokens";

export const quickMenuItem = style({
  width: 150.8,
  height: 104,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: 10,
  padding: "0 21px",
  borderRadius: 6,
  cursor: "pointer",
  border: `1px solid ${semanticColorRoles.border.subtle}`,
  backgroundColor: semanticColorRoles.surface.canvas,
  boxSizing: "border-box",
  transition: "background 150ms ease, border-color 150ms ease",
  ":hover": {
    backgroundImage: `linear-gradient(125deg, ${semanticColorRoles.action.primary.default} 0%, #6f8ef3 100%)`,
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
});

export const quickMenuItemActive = style({
  backgroundImage: `linear-gradient(125deg, ${semanticColorRoles.action.primary.default} 0%, #6f8ef3 100%)`,
  backgroundColor: "transparent",
  borderColor: "transparent",
});

export const quickMenuIconWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: opacityPalette.secondary,
  color: grayPalette[500],
  flexShrink: 0,
  transition: "background-color 150ms ease, color 150ms ease",
  selectors: {
    [`${quickMenuItem}:hover &`]: {
      backgroundColor: grayPalette[0],
      color: semanticColorRoles.action.primary.default,
    },
  },
});

export const quickMenuIconWrapperActive = style({
  backgroundColor: grayPalette[0],
  color: semanticColorRoles.action.primary.default,
});

export const quickMenuLabel = style({
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  lineHeight: "17px",
  color: semanticColorRoles.text.heading,
  whiteSpace: "nowrap",
  transition: "color 150ms ease",
  selectors: {
    [`${quickMenuItem}:hover &`]: {
      color: semanticColorRoles.text.inverse,
    },
  },
});

export const quickMenuLabelActive = style({
  color: semanticColorRoles.text.inverse,
});
