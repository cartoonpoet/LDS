import { defaultTypographyTokens, fontSizeScale, fontWeightScale, lineHeightScale } from "../foundation/typography-scale";

export const textStyles = {
  display: {
    lg: {
      fontSize: fontSizeScale[48],
      fontWeight: fontWeightScale.bold,
      lineHeight: lineHeightScale.tight
    },
    md: {
      fontSize: fontSizeScale[40],
      fontWeight: fontWeightScale.bold,
      lineHeight: lineHeightScale.tight
    }
  },
  heading: {
    lg: {
      fontSize: fontSizeScale[32],
      fontWeight: fontWeightScale.bold,
      lineHeight: lineHeightScale.snug
    },
    md: {
      fontSize: fontSizeScale[24],
      fontWeight: fontWeightScale.bold,
      lineHeight: lineHeightScale.snug
    },
    sm: {
      fontSize: fontSizeScale[20],
      fontWeight: fontWeightScale.semibold,
      lineHeight: lineHeightScale.normal
    }
  },
  body: {
    lg: {
      fontSize: fontSizeScale[16],
      fontWeight: fontWeightScale.regular,
      lineHeight: lineHeightScale.roomy
    },
    md: {
      fontSize: defaultTypographyTokens.sizeMd,
      fontWeight: fontWeightScale.regular,
      lineHeight: lineHeightScale.relaxed
    },
    sm: {
      fontSize: defaultTypographyTokens.sizeSm,
      fontWeight: fontWeightScale.regular,
      lineHeight: lineHeightScale.normal
    }
  },
  label: {
    md: {
      fontSize: defaultTypographyTokens.sizeMd,
      fontWeight: fontWeightScale.medium,
      lineHeight: lineHeightScale.normal
    },
    sm: {
      fontSize: defaultTypographyTokens.sizeSm,
      fontWeight: fontWeightScale.medium,
      lineHeight: lineHeightScale.normal
    }
  },
  caption: {
    md: {
      fontSize: defaultTypographyTokens.sizeSm,
      fontWeight: fontWeightScale.regular,
      lineHeight: lineHeightScale.normal
    }
  }
} as const;
