import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavigationTab } from ".";
import { lightThemeClass } from "@lds/tokens";

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 0.333C3.32 0.333 0.333 3.32 0.333 7S3.32 13.667 7 13.667 13.667 10.68 13.667 7 10.68 0.333 7 0.333Zm0.667 10H6.333V6.333h1.334v4Zm0-5.333H6.333V3.667h1.334V5Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * ## NavigationTab
 *
 * 필(Pill) 형태의 네비게이션 탭. 회색 배경 컨테이너 안에 활성 탭은 흰 배경 + Primary 테두리로 강조됩니다.
 * 각 탭에 아이콘을 함께 표시할 수 있습니다.
 *
 * ### Import
 * ```tsx
 * import { NavigationTab } from "@lds/ui-v3";
 * import type { NavigationTabItem } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `NavigationTabItem[]` | **필수** | 탭 아이템 목록 `{ value, label, icon? }` |
 * | `value` | `string` | - | 현재 활성화된 값 |
 * | `onChange` | `(value: string) => void` | - | 탭 변경 핸들러 |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 *
 * ### NavigationTabItem
 * ```ts
 * interface NavigationTabItem {
 *   value: string;    // 고유 식별 값
 *   label: string;    // 탭 텍스트
 *   icon?: ReactNode; // 아이콘 (선택)
 * }
 * ```
 *
 */
const meta: Meta<typeof NavigationTab> = {
  title: "Components/NavigationTab",
  component: NavigationTab,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof NavigationTab>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => {
    const [value, setValue] = useState("tab1");
    return (
      <NavigationTab
        items={[
          { value: "tab1", label: "Label", icon: <InfoIcon /> },
          { value: "tab2", label: "Label", icon: <InfoIcon /> },
          { value: "tab3", label: "Label", icon: <InfoIcon /> },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { NavigationTab } from "@lds/ui-v3";
import type { NavigationTabItem } from "@lds/ui-v3";

const [tab, setTab] = useState("overview");

// 아이콘 + 라벨
<NavigationTab
  items={[
    { value: "overview", label: "Overview", icon: <InfoIcon /> },
    { value: "details", label: "Details", icon: <DetailIcon /> },
    { value: "settings", label: "Settings", icon: <SettingsIcon /> },
  ]}
  value={tab}
  onChange={setTab}
/>

// 텍스트만
<NavigationTab
  items={[
    { value: "a", label: "Overview" },
    { value: "b", label: "Details" },
  ]}
  value={tab}
  onChange={setTab}
/>
`,
      },
    },
  },
};

const items = [
  { value: "tab1", label: "Label", icon: <InfoIcon /> },
  { value: "tab2", label: "Label", icon: <InfoIcon /> },
  { value: "tab3", label: "Label", icon: <InfoIcon /> },
  { value: "tab4", label: "Label", icon: <InfoIcon /> },
];

export const Default: Story = {
  args: { items, value: "tab1" },
};

export const NoIcons: Story = {
  args: {
    items: [
      { value: "a", label: "Overview" },
      { value: "b", label: "Details" },
      { value: "c", label: "Settings" },
    ],
    value: "a",
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("tab1");
    return <NavigationTab items={items} value={value} onChange={setValue} />;
  },
};
