import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChipsNavigation } from ".";
import { lightThemeClass } from "@lds/tokens";

/**
 * ## ChipsNavigation
 *
 * 칩 기반 필터 네비게이션. "All" 칩과 옵션 칩들로 구성되며 단일/다중 선택을 지원합니다.
 * 다중 선택 시 선택된 칩에 체크 아이콘이 표시됩니다.
 *
 * ### Import
 * ```tsx
 * import { ChipsNavigation } from "@lds/ui-v3";
 * import type { ChipsNavigationItem } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `ChipsNavigationItem[]` | **필수** | 옵션 목록 `{ value, label }` |
 * | `value` | `string \| string[]` | - | 선택된 값. 단일=string, 다중=string[] |
 * | `onChange` | `(value: string \| string[]) => void` | - | 선택 변경 핸들러 |
 * | `multiple` | `boolean` | `false` | 다중 선택 모드 |
 * | `allLabel` | `string` | `"All"` | "All" 칩 텍스트 |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 *
 * ### ChipsNavigationItem
 * ```ts
 * interface ChipsNavigationItem {
 *   value: string; // 고유 식별 값
 *   label: string; // 표시 텍스트
 * }
 * ```
 */
const meta: Meta<typeof ChipsNavigation> = {
  title: "Components/ChipsNavigation",
  component: ChipsNavigation,
  decorators: [(Story) => <div className={lightThemeClass} style={{ width: "100%" }}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    multiple: { description: "다중 선택 모드. true이면 여러 칩 동시 선택 가능" },
    allLabel: { description: '"All" 칩의 표시 텍스트' },
  },
};
export default meta;
type Story = StoryObj<typeof ChipsNavigation>;

const items = Array.from({ length: 10 }, (_, i) => ({
  value: `opt${i + 1}`,
  label: `Option ${i + 1}`,
}));

export const TemplateCode: Story = {
  name: "Template Code",
  args: { items, value: "" },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { ChipsNavigation } from "@lds/ui-v3";

// 단일 선택
const [filter, setFilter] = useState<string | string[]>("");

<ChipsNavigation
  items={[
    { value: "opt1", label: "Option 1" },
    { value: "opt2", label: "Option 2" },
    { value: "opt3", label: "Option 3" },
  ]}
  value={filter}
  onChange={setFilter}
/>

// 다중 선택
const [filters, setFilters] = useState<string | string[]>([]);

<ChipsNavigation
  items={items}
  value={filters}
  onChange={setFilters}
  multiple
/>

// "All" 텍스트 커스텀
<ChipsNavigation
  items={items}
  value={filter}
  onChange={setFilter}
  allLabel="전체"
/>
`,
      },
    },
  },
};

/** 아무것도 선택하지 않은 상태 (All 활성) */
export const Default: Story = {
  args: { items, value: "" },
};

/** 단일 선택 */
export const SingleSelected: Story = {
  args: { items, value: "opt3" },
};

/** 다중 선택 (체크 아이콘 표시) */
export const MultiChecked: Story = {
  args: {
    items,
    value: ["opt4", "opt6", "opt7", "opt8", "opt9"],
    multiple: true,
  },
};

/** 단일 선택 인터랙션 */
export const InteractiveSingle: Story = {
  render: () => {
    const [value, setValue] = useState<string | string[]>("");
    return <ChipsNavigation items={items} value={value} onChange={setValue} />;
  },
};

/** 다중 선택 인터랙션 */
export const InteractiveMulti: Story = {
  render: () => {
    const [value, setValue] = useState<string | string[]>([]);
    return <ChipsNavigation items={items} value={value} onChange={setValue} multiple />;
  },
};
