export const fontFamilyTokens = {
  pretendard: '"Pretendard", "Segoe UI", sans-serif',
  malgunGothic: '"Malgun Gothic", "MalgunGothic", sans-serif'
} as const;

export const fontSizeScale = {
  8: "8px",
  9: "9px",
  10: "10px",
  11: "11px",
  12: "12px",
  13: "13px",
  14: "14px",
  15: "15px",
  16: "16px",
  18: "18px",
  20: "20px",
  21: "21px",
  22: "22px",
  24: "24px",
  25: "25px",
  28: "28px",
  30: "30px",
  49: "49px",
  63: "63px",
  77: "77px",
  84: "84px"
} as const;

export const lineHeightScale = {
  120: "1.2",
  121: "1.21",
  122: "1.22",
  124: "1.24",
  127: "1.27",
  133: "1.33",
  138: "1.38",
  139: "1.39",
  140: "1.4",
  143: "1.43",
  150: "1.5",
  156: "1.56",
  160: "1.6",
  162: "1.62",
  164: "1.64",
  171: "1.71",
  175: "1.75",
  180: "1.8",
  185: "1.85",
  normal: "normal"
} as const;

export const letterSpacingScale = {
  normal: "normal",
  plus1: "1px",
  minus180: "-1.8px",
  minus80: "-0.8px",
  minus64: "-0.64px",
  minus60: "-0.6px",
  minus48: "-0.48px",
  minus40: "-0.4px",
  minus30: "-0.3px",
  minus28: "-0.28px",
  minus20: "-0.2px",
  minus15: "-0.15px",
  minus07: "-0.07px"
} as const;

export const fontWeightScale = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700"
} as const;

export const defaultTypographyTokens = {
  family: fontFamilyTokens.pretendard,
  sizeSm: fontSizeScale[12],
  sizeMd: fontSizeScale[14],
  sizeLg: fontSizeScale[16],
  weightRegular: fontWeightScale.regular,
  weightMedium: fontWeightScale.medium,
  weightBold: fontWeightScale.bold
} as const;
