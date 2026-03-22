import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const mention = style({
  display: "inline-flex",
  alignItems: "center",
  height: 20,
  padding: "0 4px",
  borderRadius: themeVars.radius.sm,
  backgroundColor: semanticColorRoles.action.primary.subtle,
  color: semanticColorRoles.action.primary.default,
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: themeVars.font.family,
  lineHeight: "16px",
  whiteSpace: "nowrap",
  cursor: "pointer",
  textDecoration: "none",
  verticalAlign: "middle",
});
