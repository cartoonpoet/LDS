import { createThemeContract } from "@vanilla-extract/css";

export const themeVars = createThemeContract({
  color: {
    accentPrimary: null,
    accentPrimaryHover: null,
    accentPrimaryActive: null,
    accentSecondary: null,
    accentSecondaryHover: null,
    accentSecondaryActive: null,
    accentSuccess: null,
    accentSuccessHover: null,
    accentSuccessActive: null,
    accentDanger: null,
    accentDangerHover: null,
    accentDangerActive: null,
    accentWarning: null,
    accentWarningHover: null,
    accentWarningActive: null,
    accentInfo: null,
    accentInfoHover: null,
    accentInfoActive: null,
    accentDark: null,
    accentDarkHover: null,
    accentDarkActive: null,
    neutralBackground: null,
    neutralSurface: null,
    neutralSurfaceAlt: null,
    neutralSurfaceRaised: null,
    neutralBorder: null,
    neutralBorderStrong: null,
    neutralDisabled: null,
    textPrimary: null,
    textHeading: null,
    textSecondary: null,
    textMuted: null,
    textDisabled: null,
    textInverse: null,
    focusRing: null
  },
  spacing: {
    x1: null,
    x2: null,
    x3: null,
    x4: null,
    x5: null,
    x6: null
  },
  radius: {
    sm: null,
    md: null,
    lg: null
  },
  font: {
    family: null,
    sizeSm: null,
    sizeMd: null,
    sizeLg: null,
    weightRegular: null,
    weightMedium: null,
    weightBold: null
  },
  shadow: {
    focus: null,
    raised: null
  }
});
