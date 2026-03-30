import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from ".";
import { lightThemeClass } from "@lds/tokens";

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2.667v10.666M2.667 8h10.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * ## Tabs
 *
 * 언더라인 스타일 탭 바. 활성 탭은 Primary 배경으로 채워지며, 하단에 인디케이터 라인이 표시됩니다.
 * Badge 카운트와 Action 버튼(예: "Add Tab")을 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { Tabs } from "@lds/ui-v3";
 * import type { TabItem } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `TabItem[]` | **필수** | 탭 아이템 목록 `{ value, label, badge? }` |
 * | `value` | `string` | - | 현재 활성화된 값 |
 * | `onChange` | `(value: string) => void` | - | 탭 변경 핸들러 |
 * | `size` | `"large" \| "medium"` | `"large"` | 크기. large=48px, medium=40px |
 * | `action` | `{ label, icon?, onClick? }` | - | 우측 액션 버튼 (예: 탭 추가) |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 *
 * ### TabItem
 * ```ts
 * interface TabItem {
 *   value: string;  // 고유 식별 값
 *   label: string;  // 탭 텍스트
 *   badge?: number; // 뱃지 카운트 (숫자 표시)
 * }
 * ```
 *
 */
const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  decorators: [(Story) => <div className={lightThemeClass} style={{ width: "100%" }}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["large", "medium"],
      description: "크기. large=48px, medium=40px",
    },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => {
    const [value, setValue] = useState("tab1");
    return (
      <Tabs
        items={[
          { value: "tab1", label: "Tab 1" },
          { value: "tab2", label: "Tab 2" },
          { value: "tab3", label: "Tab 3" },
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
import { Tabs } from "@lds/ui-v3";
import type { TabItem } from "@lds/ui-v3";

const [tab, setTab] = useState("tab1");

// 기본 탭
<Tabs
  items={[
    { value: "tab1", label: "Tab 1" },
    { value: "tab2", label: "Tab 2" },
    { value: "tab3", label: "Tab 3" },
  ]}
  value={tab}
  onChange={setTab}
/>

// Badge 탭
<Tabs
  items={[
    { value: "tab1", label: "Tab 1", badge: 12 },
    { value: "tab2", label: "Tab 2", badge: 9 },
    { value: "tab3", label: "Tab 3", badge: 3 },
  ]}
  value={tab}
  onChange={setTab}
  size="medium"
/>

// Action 버튼 포함
<Tabs
  items={items}
  value={tab}
  onChange={setTab}
  action={{
    label: "Add Tab",
    icon: <PlusIcon />,
    onClick: handleAddTab,
  }}
/>
`,
      },
    },
  },
};

const basicItems = [
  { value: "tab1", label: "Tab 1" },
  { value: "tab2", label: "Tab 2" },
  { value: "tab3", label: "Tab 3" },
  { value: "tab4", label: "Tab 4" },
];

const badgeItems = [
  { value: "tab1", label: "Tab 1", badge: 12 },
  { value: "tab2", label: "Tab 2", badge: 9 },
  { value: "tab3", label: "Tab 3", badge: 7 },
  { value: "tab4", label: "Tab 4", badge: 3 },
];

export const BasicLarge: Story = {
  args: { items: basicItems, value: "tab1", size: "large" },
};

export const BasicMedium: Story = {
  args: { items: basicItems, value: "tab1", size: "medium" },
};

export const BadgeLarge: Story = {
  args: { items: badgeItems, value: "tab1", size: "large" },
};

export const BadgeMedium: Story = {
  args: { items: badgeItems, value: "tab1", size: "medium" },
};

export const WithAction: Story = {
  args: {
    items: basicItems,
    value: "tab1",
    size: "large",
    action: {
      label: "Add Tab",
      icon: <PlusIcon />,
      onClick: () => alert("Add Tab clicked"),
    },
  },
};

export const WithActionMedium: Story = {
  args: {
    items: basicItems,
    value: "tab1",
    size: "medium",
    action: {
      label: "Add Tab",
      icon: <PlusIcon />,
      onClick: () => alert("Add Tab clicked"),
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("tab1");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Tabs items={basicItems} value={value} onChange={setValue} size="large" />
        <Tabs items={badgeItems} value={value} onChange={setValue} size="medium" />
      </div>
    );
  },
};
