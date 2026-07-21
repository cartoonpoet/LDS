import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass, createLdsThemeVars } from "@lds/tokens";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Radio, RadioGroup } from "./Radio";
import { Switch } from "./Switch";
import { Input } from "./Input";
import { Spinner } from "./Spinner";
import { Alert } from "./Alert";
import { ProgressBar } from "./Progress";
import { Tabs } from "./Tabs";

/* ─── 브랜드 프리셋 ─── */

export const brandPresets = {
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
} as const;

/* ─── 공통 데모 컴포넌트 ─── */

function ComponentShowcase() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Buttons */}
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#626f86" }}>Button</h4>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button disabled>Disabled</Button>
          <Button size="small">Small</Button>
        </div>
      </section>

      {/* Form Controls */}
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#626f86" }}>Form Controls</h4>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <Checkbox checked label="체크박스" onChange={() => {}} />
          <Switch checked onChange={() => {}} />
          <RadioGroup name="demo" value="a" onChange={() => {}}>
            <Radio value="a" label="라디오" />
          </RadioGroup>
          <Spinner size="sm" />
        </div>
      </section>

      {/* Input */}
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#626f86" }}>Input</h4>
        <div style={{ maxWidth: 320 }}>
          <Input placeholder="텍스트를 입력하세요" />
        </div>
      </section>

      {/* Progress */}
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#626f86" }}>Progress</h4>
        <div style={{ maxWidth: 320 }}>
          <ProgressBar value={65} color="primary" />
        </div>
      </section>

      {/* Tabs */}
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#626f86" }}>Tabs</h4>
        <Tabs
          items={[
            { key: "tab1", label: "탭 1" },
            { key: "tab2", label: "탭 2" },
            { key: "tab3", label: "탭 3" },
          ]}
          activeKey="tab1"
          onChange={() => {}}
        />
      </section>

      {/* Alert */}
      <section>
        <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#626f86" }}>Alert</h4>
        <Alert type="primary">브랜드 컬러가 적용된 알림 메시지입니다.</Alert>
      </section>
    </div>
  );
}

/* ─── Meta ─── */

/**
 * ## Theming Guide — 브랜드 컬러 커스터마이징
 *
 * LDS 디자인 시스템은 **회사별 브랜드 컬러**를 런타임에 교체할 수 있도록 설계되어 있습니다.
 * `createLdsThemeVars()` 함수로 CSS 변수를 오버라이드하면, 하위 모든 컴포넌트에 자동 반영됩니다.
 *
 * ---
 *
 * ### 사용법
 *
 * #### 1. 기본 테마 (오버라이드 없음)
 * ```tsx
 * import { lightThemeClass } from "@lds/tokens";
 *
 * <div className={lightThemeClass}>
 *   <Button>기본 파란색 버튼</Button>
 * </div>
 * ```
 *
 * #### 2. 브랜드 컬러 오버라이드
 * ```tsx
 * import { lightThemeClass, createLdsThemeVars } from "@lds/tokens";
 *
 * const brandTheme = createLdsThemeVars({
 *   color: {
 *     accentPrimary: "#16a34a",       // 메인 브랜드 컬러
 *     accentPrimaryHover: "#15803d",   // 호버 시
 *     accentPrimaryActive: "#166534",  // 클릭 시
 *   },
 * });
 *
 * <div className={lightThemeClass} style={brandTheme}>
 *   <Button>녹색 브랜드 버튼</Button>  // 자동으로 녹색
 * </div>
 * ```
 *
 * #### 3. 앱 루트에서 회사별 분기
 * ```tsx
 * const BRAND_THEMES = {
 *   lawai: {},
 *   clientA: {
 *     color: {
 *       accentPrimary: "#7c3aed",
 *       accentPrimaryHover: "#6d28d9",
 *       accentPrimaryActive: "#5b21b6",
 *     },
 *   },
 *   clientB: {
 *     color: {
 *       accentPrimary: "#003399",
 *       accentPrimaryHover: "#002b80",
 *       accentPrimaryActive: "#001f5c",
 *     },
 *   },
 * };
 *
 * function App({ clientId }: { clientId: string }) {
 *   const themeVars = createLdsThemeVars(BRAND_THEMES[clientId]);
 *
 *   return (
 *     <div className={lightThemeClass} style={themeVars}>
 *       <YourApp />
 *     </div>
 *   );
 * }
 * ```
 *
 * ---
 *
 * ### 오버라이드 가능한 컬러 토큰
 *
 * | 토큰 | 설명 | 기본값 |
 * |------|------|--------|
 * | `accentPrimary` | 메인 브랜드 컬러 | `#2151ec` |
 * | `accentPrimaryHover` | Primary 호버 | `#2151ec` |
 * | `accentPrimaryActive` | Primary 클릭 | `#1739a5` |
 * | `accentSecondary` | 보조 컬러 | `#82868b` |
 * | `accentSuccess` | 성공 | `#28c76f` |
 * | `accentDanger` | 위험 | `#ea5455` |
 * | `accentWarning` | 경고 | `#f0af23` |
 * | `accentInfo` | 정보 | `#00cfe8` |
 * | `neutralBackground` | 배경색 | `#f2f4f6` |
 * | `neutralSurface` | 표면색 | `#ffffff` |
 * | `textPrimary` | 기본 텍스트 | `#000000` |
 * | `textHeading` | 제목 텍스트 | `#11152a` |
 *
 * > 전체 토큰 목록은 `LdsColorTokens` 타입을 참조하세요.
 */
const meta: Meta = {
  title: "Guide/Theming",
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;

/* ─── Stories ─── */

/** 기본 Law.ai 테마 (오버라이드 없음) */
export const Default: StoryObj = {
  render: () => <ComponentShowcase />,
};

/** 모든 브랜드 프리셋을 나란히 비교합니다. */
export const BrandComparison: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {Object.entries(brandPresets).map(([name, themeInput]) => {
        const vars = Object.keys(themeInput).length > 0
          ? createLdsThemeVars(themeInput)
          : undefined;
        return (
          <div
            key={name}
            style={{
              ...vars,
              padding: 24,
              backgroundColor: "#fff",
              borderRadius: 8,
              border: "1px solid #eeeff2",
            }}
          >
            <h3 style={{ margin: "0 0 16px", fontSize: 16, color: "#11152a" }}>
              {name}
              {themeInput.color?.accentPrimary && (
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    backgroundColor: themeInput.color.accentPrimary,
                    marginLeft: 8,
                    verticalAlign: "middle",
                  }}
                />
              )}
            </h3>
            <ComponentShowcase />
          </div>
        );
      })}
    </div>
  ),
};

/** Storybook Controls로 직접 브랜드 컬러를 변경해 보세요. */
export const Interactive: StoryObj<{
  accentPrimary: string;
  accentPrimaryHover: string;
  accentPrimaryActive: string;
}> = {
  args: {
    accentPrimary: "#2151ec",
    accentPrimaryHover: "#2151ec",
    accentPrimaryActive: "#1739a5",
  },
  argTypes: {
    accentPrimary: { control: "color" },
    accentPrimaryHover: { control: "color" },
    accentPrimaryActive: { control: "color" },
  },
  render: (args) => {
    const vars = createLdsThemeVars({
      color: {
        accentPrimary: args.accentPrimary,
        accentPrimaryHover: args.accentPrimaryHover,
        accentPrimaryActive: args.accentPrimaryActive,
      },
    });
    return (
      <div style={{ ...vars }}>
        <ComponentShowcase />
      </div>
    );
  },
};
