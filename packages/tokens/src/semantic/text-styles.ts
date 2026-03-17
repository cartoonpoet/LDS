import {
  fontFamilyTokens,
  fontSizeScale,
  fontWeightScale,
  letterSpacingScale,
  lineHeightScale
} from "../foundation/typography-scale";

export const textStyles = {
  display: {
    1: {
      fontFamily: fontFamilyTokens.pretendard,
      fontSize: fontSizeScale[84],
      fontWeight: fontWeightScale.regular,
      lineHeight: lineHeightScale[121],
      letterSpacing: letterSpacingScale.normal
    },
    2: {
      fontFamily: fontFamilyTokens.pretendard,
      fontSize: fontSizeScale[77],
      fontWeight: fontWeightScale.regular,
      lineHeight: lineHeightScale[122],
      letterSpacing: letterSpacingScale.normal
    },
    3: {
      fontFamily: fontFamilyTokens.pretendard,
      fontSize: fontSizeScale[63],
      fontWeight: fontWeightScale.regular,
      lineHeight: lineHeightScale[122],
      letterSpacing: letterSpacingScale.normal
    },
    4: {
      fontFamily: fontFamilyTokens.pretendard,
      fontSize: fontSizeScale[49],
      fontWeight: fontWeightScale.regular,
      lineHeight: lineHeightScale[122],
      letterSpacing: letterSpacingScale.normal
    }
  },
  heading: {
    h1: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[28], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[121], letterSpacing: letterSpacingScale.normal },
    h2: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[24], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[121], letterSpacing: letterSpacingScale.normal },
    h3: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[21], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[124], letterSpacing: letterSpacingScale.normal },
    h4: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[18], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[139], letterSpacing: letterSpacingScale.normal },
    h5: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[15], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[160], letterSpacing: letterSpacingScale.normal },
    h6: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[164], letterSpacing: letterSpacingScale.normal },
    h7: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[162], letterSpacing: letterSpacingScale.normal }
  },
  appTitle: {
    large: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[22], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[127], letterSpacing: letterSpacingScale.minus60 },
    heading: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[18], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[133], letterSpacing: letterSpacingScale.minus40 },
    medium: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.minus40 },
    small: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[12], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[133], letterSpacing: letterSpacingScale.minus15 },
    description: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[10], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[120], letterSpacing: letterSpacingScale.minus15 }
  },
  appLabel: {
    heading: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[18], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale[133], letterSpacing: letterSpacingScale.minus40 },
    large: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.minus40 },
    medium: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale[143], letterSpacing: letterSpacingScale.minus20 },
    small: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[12], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale[133], letterSpacing: letterSpacingScale.minus15 },
    description: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[10], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale[120], letterSpacing: letterSpacingScale.minus15 }
  },
  appBody: {
    heading: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[18], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[133], letterSpacing: letterSpacingScale.minus07 },
    large: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.minus40 },
    medium: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[143], letterSpacing: letterSpacingScale.minus20 },
    small: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[12], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[133], letterSpacing: letterSpacingScale.minus15 },
    description: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[10], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[120], letterSpacing: letterSpacingScale.minus15 }
  },
  bodyParagraph: {
    lead: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.normal },
    bold: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.normal },
    semibold: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.normal },
    regular: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.normal },
    body: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.normal },
    italicized: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[171], letterSpacing: letterSpacingScale.normal },
    smallBold: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[138], letterSpacing: letterSpacingScale.normal },
    smallSemibold: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale[138], letterSpacing: letterSpacingScale.normal },
    small: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[138], letterSpacing: letterSpacingScale.normal },
    smallRegular: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[138], letterSpacing: letterSpacingScale.normal },
    medium12: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[12], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.normal }
  },
  input: {
    lg: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    md: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    sm: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[11], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal }
  },
  placeholder: {
    lg: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    md: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale[185], letterSpacing: letterSpacingScale.normal },
    sm: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[11], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal }
  },
  label: {
    lg: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    md: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    sm: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[11], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal }
  },
  button: {
    lg: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    lgSemibold: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    md: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    mdSemibold: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    sm: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[12], fontWeight: fontWeightScale.medium, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal },
    smSemibold: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[12], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.normal }
  },
  menu: {
    active: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[15], fontWeight: fontWeightScale.semibold, lineHeight: lineHeightScale[160], letterSpacing: letterSpacingScale.normal }
  },
  table: {
    header: { fontFamily: fontFamilyTokens.pretendard, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale.normal, letterSpacing: letterSpacingScale.plus1 }
  },
  viewer: {
    title: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[25], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[140], letterSpacing: letterSpacingScale.minus80 },
    subtitle: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[20], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[140], letterSpacing: letterSpacingScale.minus80 },
    label: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[185], letterSpacing: letterSpacingScale.minus60 },
    body: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[185], letterSpacing: letterSpacingScale.minus60 },
    bodyBold: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[13], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[185], letterSpacing: letterSpacingScale.minus60 },
    body2: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[11], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[180], letterSpacing: letterSpacingScale.normal },
    body2Bold: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[11], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[180], letterSpacing: letterSpacingScale.normal },
    labelSmall: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[9], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[156], letterSpacing: letterSpacingScale.minus60 },
    bodySmall: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[9], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[156], letterSpacing: letterSpacingScale.minus60 },
    bodySmallBold: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[9], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[156], letterSpacing: letterSpacingScale.minus60 },
    labelDescription: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[8], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.minus30 },
    bodyDescription: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[8], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[150], letterSpacing: letterSpacingScale.minus30 }
  },
  mail: {
    heading: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[30], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[120], letterSpacing: letterSpacingScale.minus180 },
    headingBold: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[30], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[120], letterSpacing: letterSpacingScale.minus180 },
    paragraphLarge: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[175], letterSpacing: letterSpacingScale.minus64 },
    paragraphLargeBold: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[16], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[175], letterSpacing: letterSpacingScale.minus64 },
    paragraphMedium: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[143], letterSpacing: letterSpacingScale.minus28 },
    paragraphMediumBold: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[14], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[143], letterSpacing: letterSpacingScale.minus28 },
    paragraphSmall: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[12], fontWeight: fontWeightScale.regular, lineHeight: lineHeightScale[133], letterSpacing: letterSpacingScale.minus48 },
    paragraphSmallBold: { fontFamily: fontFamilyTokens.malgunGothic, fontSize: fontSizeScale[12], fontWeight: fontWeightScale.bold, lineHeight: lineHeightScale[133], letterSpacing: letterSpacingScale.minus48 }
  }
} as const;
