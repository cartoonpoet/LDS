import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";
import { sprinkles } from "./sprinkles.css";

const selectIndicator = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2366748E' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

export const fieldShell = style([
  sprinkles({
    display: "grid",
    gap: "x1",
    width: "100%"
  })
]);

export const fieldLabel = style({
  color: themeVars.color.textMuted,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  fontWeight: themeVars.font.weightMedium,
  lineHeight: 1.4
});

export const fieldControl = recipe({
  base: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    minHeight: "34px",
    padding: `0 ${themeVars.spacing.x3}`,
    border: `1px solid ${themeVars.color.neutralBorder}`,
    borderRadius: themeVars.radius.sm,
    backgroundColor: themeVars.color.neutralSurface,
    color: themeVars.color.textPrimary,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    outline: "none",
    transition: "border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease",
    "@media": {
      "screen and (max-width: 767px)": {
        minHeight: "38px",
        fontSize: themeVars.font.sizeLg
      }
    },
    selectors: {
      "&:focus": {
        borderColor: themeVars.color.accentPrimary,
        boxShadow: themeVars.shadow.focus
      },
      "&::placeholder": {
        color: themeVars.color.textMuted
      },
      "&:disabled": {
        backgroundColor: themeVars.color.neutralDisabled,
        borderColor: themeVars.color.neutralBorder,
        color: themeVars.color.textDisabled,
        cursor: "not-allowed"
      }
    }
  },
  variants: {
    control: {
      input: {},
      select: {
        appearance: "none",
        paddingRight: themeVars.spacing.x6,
        backgroundImage: selectIndicator,
        backgroundPosition: `right ${themeVars.spacing.x3} center`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "10px 6px"
      }
    }
  },
  defaultVariants: {
    control: "input"
  }
});
