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

export const grayPalette = {
  0: "#ffffff",
  50: "#f7f8fc",
  100: "#f4f6fb",
  200: "#eef2f8",
  300: "#dfe3ea",
  400: "#d7dde8",
  500: "#b9c2d1",
  600: "#8a8f96",
  700: "#66748e",
  800: "#4f5f7c",
  900: "#0f1631"
} as const;

export const bluePalette = {
  100: "#eef3ff",
  200: "#dfe7ff",
  300: "#8ea4ed",
  400: "#4e73ff",
  500: "#2f5bff",
  600: "#2550ee",
  700: "#1f46cf"
} as const;

export const greenPalette = {
  100: "#eefaf3",
  200: "#d5f0de",
  300: "#7ad4a3",
  400: "#47cf7e",
  500: "#2fc56f",
  600: "#25bc67",
  700: "#0b7a3e"
} as const;

export const redPalette = {
  100: "#fef0f0",
  200: "#f8dddd",
  300: "#e79a9a",
  400: "#f06c6c",
  500: "#eb5757",
  600: "#eb5252",
  700: "#bc272e"
} as const;

export const yellowPalette = {
  100: "#fff8e7",
  200: "#f4ead1",
  300: "#efd07b",
  400: "#f4c94f",
  500: "#f0b319",
  600: "#eba90b",
  700: "#9a7100"
} as const;

export const cyanPalette = {
  100: "#ecfbfe",
  200: "#d2f1f6",
  300: "#60cfdd",
  400: "#2bc8dc",
  500: "#18bfd9",
  600: "#0eb5d1",
  700: "#0b7384"
} as const;

export const darkPalette = {
  300: "#767676",
  400: "#555555",
  500: "#525b75",
  600: "#49526b",
  700: "#333333"
} as const;

export const defaultColorTokens: LdsColorTokens = {
  accentPrimary: bluePalette[500],
  accentPrimaryHover: bluePalette[600],
  accentPrimaryActive: bluePalette[700],
  accentSecondary: grayPalette[600],
  accentSecondaryHover: "#7f858d",
  accentSecondaryActive: "#6f757d",
  accentSuccess: greenPalette[500],
  accentSuccessHover: greenPalette[600],
  accentSuccessActive: greenPalette[700],
  accentDanger: redPalette[500],
  accentDangerHover: redPalette[600],
  accentDangerActive: redPalette[700],
  accentWarning: yellowPalette[500],
  accentWarningHover: yellowPalette[600],
  accentWarningActive: yellowPalette[700],
  accentInfo: cyanPalette[500],
  accentInfoHover: cyanPalette[600],
  accentInfoActive: cyanPalette[700],
  accentDark: darkPalette[500],
  accentDarkHover: darkPalette[600],
  accentDarkActive: darkPalette[700],
  neutralBackground: grayPalette[50],
  neutralSurface: grayPalette[0],
  neutralSurfaceAlt: grayPalette[100],
  neutralSurfaceRaised: grayPalette[200],
  neutralBorder: grayPalette[400],
  neutralBorderStrong: grayPalette[500],
  neutralDisabled: grayPalette[300],
  textPrimary: "#000000",
  textHeading: grayPalette[900],
  textSecondary: grayPalette[800],
  textMuted: grayPalette[700],
  textDisabled: "#b8b8b8",
  textInverse: grayPalette[0],
  focusRing: "rgba(47, 91, 255, 0.22)"
};
