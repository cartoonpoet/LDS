export const spacingScale = {
  xs: "4px",
  s: "8px",
  m: "12px",
  l: "16px",
  xl: "20px",
  xxl: "24px"
} as const;

export type LdsSpacingTokens = {
  x1: string;
  x2: string;
  x3: string;
  x4: string;
  x5: string;
  x6: string;
};

export const defaultSpacingTokens: LdsSpacingTokens = {
  x1: spacingScale.xs,
  x2: spacingScale.s,
  x3: spacingScale.m,
  x4: spacingScale.l,
  x5: spacingScale.xl,
  x6: spacingScale.xxl
};
