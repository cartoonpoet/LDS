import type { LdsThemeInput } from "@lds/tokens";

/**
 * 스토리북 데모용 브랜드 프리셋.
 * Theming.stories.tsx / Colors.stories.tsx에서 공유.
 * (.stories 파일에서 export하면 Storybook이 스토리로 인식하므로 별도 모듈로 분리)
 */
export const brandPresets: Record<string, LdsThemeInput> = {
  "Law.ai (기본)": {},
  "Green Brand": {
    color: {
      accentPrimary: "#16a34a",
      accentPrimaryHover: "#15803d",
      accentPrimaryActive: "#166534",
    },
  },
  "Purple Brand": {
    color: {
      accentPrimary: "#7c3aed",
      accentPrimaryHover: "#6d28d9",
      accentPrimaryActive: "#5b21b6",
    },
  },
  "Orange Brand": {
    color: {
      accentPrimary: "#ea580c",
      accentPrimaryHover: "#c2410c",
      accentPrimaryActive: "#9a3412",
    },
  },
  "Scourt Blue": {
    color: {
      accentPrimary: "#003399",
      accentPrimaryHover: "#002b80",
      accentPrimaryActive: "#001f5c",
    },
  },
};
