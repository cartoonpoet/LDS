import { assignInlineVars } from "@vanilla-extract/dynamic";
import type { LdsColorTokens, LdsSpacingTokens } from "./theme.css";
import {
  defaultColorTokens,
  defaultSpacingTokens,
  themeVars
} from "./theme.css";

export type LdsThemeInput = {
  color?: Partial<LdsColorTokens>;
  spacing?: Partial<LdsSpacingTokens>;
};

export function createLdsThemeVars(input: LdsThemeInput = {}) {
  const color = {
    ...defaultColorTokens,
    ...input.color
  };

  const spacing = {
    ...defaultSpacingTokens,
    ...input.spacing
  };

  return assignInlineVars({
    [themeVars.color.accentPrimary]: color.accentPrimary,
    [themeVars.color.accentPrimaryHover]: color.accentPrimaryHover,
    [themeVars.color.accentPrimaryActive]: color.accentPrimaryActive,
    [themeVars.color.accentSecondary]: color.accentSecondary,
    [themeVars.color.accentSecondaryHover]: color.accentSecondaryHover,
    [themeVars.color.accentSecondaryActive]: color.accentSecondaryActive,
    [themeVars.color.accentSuccess]: color.accentSuccess,
    [themeVars.color.accentSuccessHover]: color.accentSuccessHover,
    [themeVars.color.accentSuccessActive]: color.accentSuccessActive,
    [themeVars.color.accentDanger]: color.accentDanger,
    [themeVars.color.accentDangerHover]: color.accentDangerHover,
    [themeVars.color.accentDangerActive]: color.accentDangerActive,
    [themeVars.color.accentWarning]: color.accentWarning,
    [themeVars.color.accentWarningHover]: color.accentWarningHover,
    [themeVars.color.accentWarningActive]: color.accentWarningActive,
    [themeVars.color.accentInfo]: color.accentInfo,
    [themeVars.color.accentInfoHover]: color.accentInfoHover,
    [themeVars.color.accentInfoActive]: color.accentInfoActive,
    [themeVars.color.accentDark]: color.accentDark,
    [themeVars.color.accentDarkHover]: color.accentDarkHover,
    [themeVars.color.accentDarkActive]: color.accentDarkActive,
    [themeVars.color.neutralBackground]: color.neutralBackground,
    [themeVars.color.neutralSurface]: color.neutralSurface,
    [themeVars.color.neutralSurfaceAlt]: color.neutralSurfaceAlt,
    [themeVars.color.neutralSurfaceRaised]: color.neutralSurfaceRaised,
    [themeVars.color.neutralBorder]: color.neutralBorder,
    [themeVars.color.neutralBorderStrong]: color.neutralBorderStrong,
    [themeVars.color.neutralDisabled]: color.neutralDisabled,
    [themeVars.color.textPrimary]: color.textPrimary,
    [themeVars.color.textHeading]: color.textHeading,
    [themeVars.color.textSecondary]: color.textSecondary,
    [themeVars.color.textMuted]: color.textMuted,
    [themeVars.color.textDisabled]: color.textDisabled,
    [themeVars.color.textInverse]: color.textInverse,
    [themeVars.color.focusRing]: color.focusRing,
    [themeVars.spacing.x1]: spacing.x1,
    [themeVars.spacing.x2]: spacing.x2,
    [themeVars.spacing.x3]: spacing.x3,
    [themeVars.spacing.x4]: spacing.x4,
    [themeVars.spacing.x5]: spacing.x5,
    [themeVars.spacing.x6]: spacing.x6
  });
}
