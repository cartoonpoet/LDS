import { createTheme, createThemeContract } from "@vanilla-extract/css";

export type LdsColorTokens = {
  accentPrimary: string;
  accentPrimaryHover: string;
  accentPrimaryActive: string;
  accentSecondary: string;
  accentSecondaryHover: string;
  accentSecondaryActive: string;
  accentSuccess: string;
  accentSuccessHover: string;
  accentSuccessActive: string;
  accentDanger: string;
  accentDangerHover: string;
  accentDangerActive: string;
  accentWarning: string;
  accentWarningHover: string;
  accentWarningActive: string;
  accentInfo: string;
  accentInfoHover: string;
  accentInfoActive: string;
  accentDark: string;
  accentDarkHover: string;
  accentDarkActive: string;
  neutralBackground: string;
  neutralSurface: string;
  neutralSurfaceAlt: string;
  neutralSurfaceRaised: string;
  neutralBorder: string;
  neutralBorderStrong: string;
  neutralDisabled: string;
  textPrimary: string;
  textHeading: string;
  textSecondary: string;
  textMuted: string;
  textDisabled: string;
  textInverse: string;
  focusRing: string;
};

export type LdsSpacingTokens = {
  x1: string;
  x2: string;
  x3: string;
  x4: string;
  x5: string;
  x6: string;
};

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

export const defaultColorTokens: LdsColorTokens = {
  accentPrimary: "#2f5bff",
  accentPrimaryHover: "#2550ee",
  accentPrimaryActive: "#1f46cf",
  accentSecondary: "#8a8f96",
  accentSecondaryHover: "#7f858d",
  accentSecondaryActive: "#6f757d",
  accentSuccess: "#2fc56f",
  accentSuccessHover: "#25bc67",
  accentSuccessActive: "#0b7a3e",
  accentDanger: "#eb5757",
  accentDangerHover: "#eb5252",
  accentDangerActive: "#bc272e",
  accentWarning: "#f0b319",
  accentWarningHover: "#eba90b",
  accentWarningActive: "#9a7100",
  accentInfo: "#18bfd9",
  accentInfoHover: "#0eb5d1",
  accentInfoActive: "#0b7384",
  accentDark: "#525b75",
  accentDarkHover: "#49526b",
  accentDarkActive: "#333333",
  neutralBackground: "#f7f8fc",
  neutralSurface: "#ffffff",
  neutralSurfaceAlt: "#f4f6fb",
  neutralSurfaceRaised: "#eef2f8",
  neutralBorder: "#d7dde8",
  neutralBorderStrong: "#b9c2d1",
  neutralDisabled: "#dfe3ea",
  textPrimary: "#000000",
  textHeading: "#0f1631",
  textSecondary: "#4f5f7c",
  textMuted: "#66748e",
  textDisabled: "#b8b8b8",
  textInverse: "#ffffff",
  focusRing: "rgba(47, 91, 255, 0.22)"
};

export const defaultSpacingTokens: LdsSpacingTokens = {
  x1: "4px",
  x2: "8px",
  x3: "12px",
  x4: "16px",
  x5: "20px",
  x6: "24px"
};

const defaultThemeValues = {
  color: defaultColorTokens,
  spacing: defaultSpacingTokens,
  radius: {
    sm: "4px",
    md: "6px",
    lg: "8px"
  },
  font: {
    family: "\"Pretendard\", \"Segoe UI\", sans-serif",
    sizeSm: "12px",
    sizeMd: "14px",
    sizeLg: "16px",
    weightRegular: "400",
    weightMedium: "500",
    weightBold: "700"
  },
  shadow: {
    focus: "0 0 0 3px rgba(47, 91, 255, 0.14)",
    raised: "0 6px 16px rgba(17, 24, 39, 0.08)"
  }
};

export const lightThemeClass = createTheme(themeVars, defaultThemeValues);
