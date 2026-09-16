import { createTheme, globalStyle } from "@vanilla-extract/css";
import { themeVars } from "../contracts/theme-contract.css";
import { defaultColorTokens } from "../foundation/color-palette";
import { defaultSpacingTokens } from "../foundation/spacing-scale";
import { defaultRadiusTokens } from "../foundation/radius-scale";
import { defaultTypographyTokens } from "../foundation/typography-scale";
import { defaultShadowTokens } from "../foundation/shadow-scale";
import { defaultDurationTokens } from "../foundation/duration-scale";
import { defaultEasingTokens } from "../foundation/easing-scale";

export const defaultThemeValues = {
  color: defaultColorTokens,
  spacing: defaultSpacingTokens,
  radius: defaultRadiusTokens,
  font: defaultTypographyTokens,
  shadow: defaultShadowTokens,
  duration: defaultDurationTokens,
  easing: defaultEasingTokens
};

export const lightThemeClass = createTheme(themeVars, defaultThemeValues);

globalStyle(`.${lightThemeClass}`, {
  fontFamily: themeVars.font.family,
  color: themeVars.color.textPrimary,
});
