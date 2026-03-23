import { style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles } from "@lds/tokens";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const root = recipe({
  base: {
    display: "inline-block",
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: semanticColorRoles.action.primary.default,
    borderTopColor: "transparent",
    animation: `${spin} 0.75s linear infinite`,
    boxSizing: "border-box",
  },
  variants: {
    size: {
      sm: { width: 16, height: 16, borderWidth: 2 },
      md: { width: 20, height: 20, borderWidth: 2.5 },
      lg: { width: 32, height: 32, borderWidth: 3 },
      xl: { width: 48, height: 48, borderWidth: 4 },
    },
    color: {
      primary: {
        borderColor: semanticColorRoles.action.primary.default,
        borderTopColor: "transparent",
      },
      white: {
        borderColor: "rgba(255, 255, 255, 0.9)",
        borderTopColor: "transparent",
      },
    },
  },
  defaultVariants: { size: "md", color: "primary" },
});

export const track = recipe({
  base: {
    position: "absolute",
    borderRadius: "50%",
    borderStyle: "solid",
    opacity: 0.3,
    boxSizing: "border-box",
  },
  variants: {
    size: {
      sm: { width: 16, height: 16, borderWidth: 2 },
      md: { width: 20, height: 20, borderWidth: 2.5 },
      lg: { width: 32, height: 32, borderWidth: 3 },
      xl: { width: 48, height: 48, borderWidth: 4 },
    },
    color: {
      primary: { borderColor: semanticColorRoles.action.primary.default },
      white: { borderColor: "rgba(255, 255, 255, 0.9)" },
    },
  },
  defaultVariants: { size: "md", color: "primary" },
});

export const wrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

export const label = style({
  marginLeft: 8,
  fontSize: 14,
  color: semanticColorRoles.text.secondary,
});
