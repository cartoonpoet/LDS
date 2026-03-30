import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ButtonTab } from ".";
import { lightThemeClass } from "@lds/tokens";

/**
 * ## ButtonTab
 *
 * 탭 스타일의 세그먼트 컨트롤. 활성 탭은 Primary 배경으로 강조되며, 개별 탭을 비활성화할 수 있습니다.
 *
 * ### Import
 * ```tsx
 * import { ButtonTab } from "@lds/ui-v3";
 * import type { ButtonTabItem } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `ButtonTabItem[]` | **필수** | 탭 아이템 목록 `{ value, label, disabled? }` |
 * | `value` | `string` | - | 현재 활성화된 값 |
 * | `onChange` | `(value: string) => void` | - | 탭 변경 핸들러 |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 *
 * ### ButtonTabItem
 * ```ts
 * interface ButtonTabItem {
 *   value: string;      // 고유 식별 값
 *   label: string;      // 탭 텍스트
 *   disabled?: boolean; // 비활성화 여부
 * }
 * ```
 */
const meta: Meta<typeof ButtonTab> = {
  title: "Components/ButtonTab",
  component: ButtonTab,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ButtonTab>;

const items = Array.from({ length: 10 }, (_, i) => ({
  value: `tab${i + 1}`,
  label: `Tab ${i + 1}`,
}));

const itemsWithDisabled = [
  { value: "tab1", label: "Tab 1" },
  { value: "tab2", label: "Tab 2" },
  { value: "tab3", label: "Tab 3", disabled: true },
  { value: "tab4", label: "Tab 4" },
];

export const TemplateCode: Story = {
  name: "Template Code",
  args: { items, value: "tab2" },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { ButtonTab } from "@lds/ui-v3";

const [tab, setTab] = useState("tab1");

<ButtonTab
  items={[
    { value: "tab1", label: "Tab 1" },
    { value: "tab2", label: "Tab 2" },
    { value: "tab3", label: "Tab 3", disabled: true },
    { value: "tab4", label: "Tab 4" },
  ]}
  value={tab}
  onChange={setTab}
/>
`,
      },
    },
  },
};

export const Default: Story = {
  args: { items, value: "tab2" },
};

export const WithDisabled: Story = {
  args: { items: itemsWithDisabled, value: "tab2" },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("tab1");
    return <ButtonTab items={items.slice(0, 5)} value={value} onChange={setValue} />;
  },
};
