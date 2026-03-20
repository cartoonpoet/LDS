import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { TagSelect } from ".";

/**
 * **TagSelect** — 드롭다운 셀렉트 + 선택 항목을 태그 뱃지로 표시
 *
 * ### 사용법
 * ```tsx
 * import { TagSelect } from "@lds/ui-v3";
 *
 * <TagSelect
 *   options={[
 *     { value: "1", label: "Option" },
 *     { value: "2", label: "Option" },
 *   ]}
 *   value={["1"]}
 *   onChange={(v) => setValue(v)}
 *   placeholder="Placeholder"
 * />
 * ```
 */
const meta: Meta<typeof TagSelect> = {
  title: "Components/TagSelect",
  component: TagSelect,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6", maxWidth: 350 }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagSelect>;

const sampleOptions = [
  { value: "1", label: "Option A" },
  { value: "2", label: "Option B" },
  { value: "3", label: "Option C" },
  { value: "4", label: "Option D" },
  { value: "5", label: "Option E" },
];

/** 기본 — 미선택 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <TagSelect
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Placeholder"
      />
    );
  },
};

/** 선택된 항목 있음 */
export const WithSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["1", "2"]);
    return (
      <TagSelect
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Placeholder"
      />
    );
  },
};
