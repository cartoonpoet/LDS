import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from ".";
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
 * ## ButtonGroup
 *
 * 세그먼트형 버튼 그룹. 여러 옵션 중 하나를 선택하는 토글 컨트롤입니다.
 *
 * ### Import
 * ```tsx
 * import { ButtonGroup } from "@lds/ui-v3";
 * import type { ButtonGroupItem } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `ButtonGroupItem[]` | **필수** | 버튼 아이템 목록 `{ value, label, icon? }` |
 * | `value` | `string` | - | 현재 선택된 값 |
 * | `onChange` | `(value: string) => void` | - | 선택 변경 핸들러 |
 * | `variant` | `"fill" \| "outline"` | `"fill"` | 스타일. fill=Solid 채움, outline=테두리 |
 * | `size` | `"small" \| "medium"` | `"medium"` | 크기. small=31px, medium=38px |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 *
 * ### ButtonGroupItem
 * ```ts
 * interface ButtonGroupItem {
 *   value: string;   // 고유 식별 값
 *   label: string;   // 버튼 텍스트
 *   icon?: ReactNode; // 좌측 아이콘 (선택)
 * }
 * ```
 */
const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["fill", "outline"],
      description: "스타일. fill=Solid 채움, outline=테두리",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "크기. small=31px, medium=38px",
    },
  },
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const defaultItems = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

export const TemplateCode: Story = {
  name: "Template Code",
  args: { items: defaultItems, value: "left", variant: "fill" },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { ButtonGroup } from "@lds/ui-v3";

const [value, setValue] = useState("left");

// 기본 Fill 스타일
<ButtonGroup
  items={[
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ]}
  value={value}
  onChange={setValue}
/>

// Outline 스타일
<ButtonGroup items={items} value={value} onChange={setValue} variant="outline" />

// Small 사이즈 + 아이콘
<ButtonGroup
  items={[
    { value: "a", label: "옵션A", icon: <MyIcon /> },
    { value: "b", label: "옵션B", icon: <MyIcon /> },
  ]}
  value={value}
  onChange={setValue}
  size="small"
/>
`,
      },
    },
  },
};

export const Fill: Story = {
  args: { items: defaultItems, value: "left", variant: "fill" },
};

export const Outline: Story = {
  args: { items: defaultItems, value: "left", variant: "outline" },
};

export const Small: Story = {
  args: { items: defaultItems, value: "left", size: "small" },
};

export const SmallOutline: Story = {
  args: { items: defaultItems, value: "left", variant: "outline", size: "small" },
};

export const WithIcons: Story = {
  args: {
    items: [
      { value: "left", label: "Left", icon: <InfoIcon /> },
      { value: "center", label: "Center", icon: <InfoIcon /> },
      { value: "right", label: "Right", icon: <InfoIcon /> },
    ],
    value: "left",
    variant: "fill",
  },
};

export const WithIconsOutline: Story = {
  args: {
    items: [
      { value: "left", label: "Left", icon: <InfoIcon /> },
      { value: "center", label: "Center", icon: <InfoIcon /> },
      { value: "right", label: "Right", icon: <InfoIcon /> },
    ],
    value: "left",
    variant: "outline",
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("left");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ButtonGroup items={defaultItems} value={value} onChange={setValue} variant="fill" />
        <ButtonGroup items={defaultItems} value={value} onChange={setValue} variant="outline" />
        <p style={{ margin: 0 }}>Selected: <strong>{value}</strong></p>
      </div>
    );
  },
};
