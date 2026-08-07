import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Textarea } from ".";
import { InputGroup } from "../Input";

/**
 * ## Textarea
 *
 * 여러 줄 텍스트 입력 필드. Input과 동일한 시각 언어(보더/포커스/상태)를 공유합니다.
 *
 * ### Import
 * ```tsx
 * import { Textarea } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `textareaSize` | `"small" \| "medium" \| "large"` | `"medium"` | 사이즈 (패딩) |
 * | `state` | `"default" \| "active" \| "success" \| "warning" \| "disabled"` | `"default"` | 상태 |
 * | `resize` | `"none" \| "vertical"` | `"vertical"` | 리사이즈 제어 |
 * | `showCount` | `boolean` | `false` | 글자수 표시 (`maxLength`와 함께 "n/max") |
 * | `rows` | `number` | `4` | 표시 줄 수 (네이티브) |
 */
const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  args: {
    placeholder: "내용을 입력하세요",
  },
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6", maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { Textarea, InputGroup } from "@lds/ui-v3";

// 기본
<Textarea placeholder="내용을 입력하세요" />

// 사이즈 / 줄 수
<Textarea textareaSize="small" rows={3} />
<Textarea textareaSize="large" rows={6} />

// 상태
<Textarea state="warning" defaultValue="필수 항목입니다" />
<Textarea state="disabled" placeholder="비활성화" />

// 리사이즈 잠금
<Textarea resize="none" />

// 글자수 표시
<Textarea maxLength={200} showCount placeholder="200자 이내로 입력" />

// InputGroup과 함께 (라벨 + 도움말)
<InputGroup label="비고" helperText="선택 입력 항목입니다">
  <Textarea placeholder="비고를 입력하세요" />
</InputGroup>`,
      },
    },
  },
};

export const Basic: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Textarea textareaSize="small" rows={3} placeholder="Small" />
      <Textarea textareaSize="medium" placeholder="Medium" />
      <Textarea textareaSize="large" rows={6} placeholder="Large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Textarea state="active" placeholder="Active" />
      <Textarea state="success" defaultValue="검토 완료된 내용입니다" />
      <Textarea state="warning" defaultValue="필수 항목입니다" />
      <Textarea state="disabled" placeholder="비활성화" />
    </div>
  ),
};

export const WithCount: Story = {
  args: {
    maxLength: 200,
    showCount: true,
    placeholder: "200자 이내로 입력",
  },
};

export const WithInputGroup: Story = {
  render: () => (
    <InputGroup label="비고" helperText="선택 입력 항목입니다">
      <Textarea placeholder="비고를 입력하세요" />
    </InputGroup>
  ),
};
