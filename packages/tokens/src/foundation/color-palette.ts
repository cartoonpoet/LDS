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

export const scourtPalette = {
  blue: "#003399",
  green: "#336633",
  red: "#660000",
  yellow: "#cc6600",
  stamp: "#ff0000"
} as const;

export const grayPalette = {
  0: "#ffffff",
  50: "#f2f4f6",
  100: "#f1f4f9",
  200: "#eeeff2",
  300: "#d1d1d1",
  400: "#cfd5e1",
  500: "#9ea7b8",
  600: "#82868b",
  700: "#626f86",
  800: "#4c5469",
  900: "#11152a"
} as const;

export const bluePalette = {
  100: "rgba(33, 81, 236, 0.12)",
  200: "rgba(23, 57, 165, 0.12)",
  300: "#2151ec",
  400: "#2151ec",
  500: "#2151ec",
  600: "#2151ec",
  700: "#1739a5"
} as const;

export const greenPalette = {
  100: "rgba(39, 194, 129, 0.12)",
  200: "#28c76f",
  300: "#28c76f",
  400: "#28c76f",
  500: "#1bc47d",
  600: "#28c76f",
  700: "#006d38"
} as const;

export const redPalette = {
  100: "rgba(234, 59, 59, 0.12)",
  200: "#ea5455",
  300: "#ea5455",
  400: "#ea5455",
  500: "#ea5455",
  600: "#ea5455",
  700: "#b12a30"
} as const;

export const yellowPalette = {
  100: "rgba(240, 175, 35, 0.12)",
  200: "#f0af23",
  300: "#f0af23",
  400: "#f0af23",
  500: "#f0af23",
  600: "#f0af23",
  700: "#7d5800"
} as const;

export const cyanPalette = {
  100: "rgba(0, 207, 232, 0.12)",
  200: "#00cfe8",
  300: "#00cfe8",
  400: "#00cfe8",
  500: "#00cfe8",
  600: "#00cfe8",
  700: "#006876"
} as const;

export const darkPalette = {
  100: "rgba(76, 84, 105, 0.12)",
  300: "#4c5469",
  400: "#4c5469",
  500: "#4c5469",
  600: "#4c5469",
  700: "#343434"
} as const;

export const opacityPalette = {
  scourtBlue: "rgba(0, 51, 153, 0.12)",
  primary: "rgba(33, 81, 236, 0.12)",
  secondary: "rgba(130, 134, 139, 0.12)",
  scourtGreen: "rgba(51, 102, 51, 0.12)",
  success: "rgba(39, 194, 129, 0.12)",
  scourtRed: "rgba(102, 0, 0, 0.12)",
  danger: "rgba(234, 59, 59, 0.12)",
  orange: "rgba(253, 126, 20, 0.12)",
  scourtYellow: "rgba(204, 102, 0, 0.12)",
  warning: "rgba(240, 175, 35, 0.12)",
  info: "rgba(0, 207, 232, 0.12)",
  black: "rgba(0, 0, 0, 0.12)",
  light: "rgba(158, 167, 184, 0.12)",
  dark: "rgba(76, 84, 105, 0.12)",
  primaryActive: "rgba(23, 57, 165, 0.12)"
} as const;

export const bootstrapPalette = {
  blue: "#0d6efd",
  purple: "#6f42c1",
  red: "#dc3545",
  pink: "#d63384",
  orange: "#fd7e14",
  yellow: "#ffc107",
  green: "#198754",
  emerald: "#2bdac7",
  teal: "#20c997",
  cyan: "#0dcaf0",
  gray: "#adb5bd",
} as const;

export const socialPalette = {
  youtube: "#c4302b",
  facebook: "#3b5998",
  github: "#211f1f",
  google: "#db3236",
  instagram: "#3f729b",
  linkedin: "#0e76a8",
  twitter: "#00acee",
} as const;

export const defaultColorTokens: LdsColorTokens = {
  accentPrimary: "#2151ec",
  accentPrimaryHover: "#2151ec",
  accentPrimaryActive: "#1739a5",
  accentSecondary: "#82868b",
  accentSecondaryHover: "#82868b",
  accentSecondaryActive: "#75797e",
  accentSuccess: "#28c76f",
  accentSuccessHover: "#28c76f",
  accentSuccessActive: "#006d38",
  accentDanger: "#ea5455",
  accentDangerHover: "#ea5455",
  accentDangerActive: "#b12a30",
  accentWarning: "#f0af23",
  accentWarningHover: "#f0af23",
  accentWarningActive: "#7d5800",
  accentInfo: "#00cfe8",
  accentInfoHover: "#00cfe8",
  accentInfoActive: "#006876",
  accentDark: "#4c5469",
  accentDarkHover: "#4c5469",
  accentDarkActive: "#343434",
  neutralBackground: "#f2f4f6",
  neutralSurface: "#ffffff",
  neutralSurfaceAlt: "#f1f4f9",
  neutralSurfaceRaised: "#eeeff2",
  neutralBorder: "#cfd5e1",
  neutralBorderStrong: "#9ea7b8",
  neutralDisabled: "#eeeff2",
  textPrimary: "#000000",
  textHeading: "#11152a",
  textSecondary: "#000000",
  textMuted: "#626f86",
  textDisabled: "#d1d1d1",
  textInverse: "#ffffff",
  focusRing: "rgba(23, 57, 165, 0.12)"
};
