export const fontFamilyTokens = {
  sans: "\"Pretendard\", \"Segoe UI\", sans-serif"
} as const;

export const fontSizeScale = {
  12: "12px",
  14: "14px",
  16: "16px",
  18: "18px",
  20: "20px",
  24: "24px",
  32: "32px",
  40: "40px",
  48: "48px"
} as const;

export const lineHeightScale = {
  tight: "1.2",
  snug: "1.35",
  normal: "1.5",
  relaxed: "1.7",
  roomy: "1.85"
} as const;

export const fontWeightScale = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700"
} as const;

export const defaultTypographyTokens = {
  family: fontFamilyTokens.sans,
  sizeSm: fontSizeScale[12],
  sizeMd: fontSizeScale[14],
  sizeLg: fontSizeScale[16],
  weightRegular: fontWeightScale.regular,
  weightMedium: fontWeightScale.medium,
  weightBold: fontWeightScale.bold
} as const;
