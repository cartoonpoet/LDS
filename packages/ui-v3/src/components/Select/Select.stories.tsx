import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Select } from ".";

const baseOptions = [
  { label: "Placeholder", value: "placeholder", disabled: true },
  { label: "옵션 1", value: "option-1" },
  { label: "옵션 2", value: "option-2" },
  { label: "옵션 3", value: "option-3" }
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "LDS 선택 필드 컴포넌트입니다. Zeplin의 form element 톤에 맞춰 label/caption, placeholder, invalid, grouped options, multiple 모드를 지원합니다."
      }
    }
  },
  args: {
    label: "Label *",
    caption: "Caption Text",
    options: baseOptions,
    placeholder: "Placeholder"
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", width: "320px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Preselected: Story = { args: { defaultValue: "option-2" } };
export const WithHelperText: Story = { args: { helperText: "캡션, 설명, 오류 메시지 등을 여기에 표시합니다." } };
export const Invalid: Story = { args: { invalid: true, helperText: "Placeholder를 다시 선택할 수는 없습니다." } };
export const GroupedOptions: Story = { args: { options: [{ label: "Review", options: [{ label: "Draft", value: "draft" }, { label: "In Review", value: "review" }] }, { label: "Done", options: [{ label: "Approved", value: "approved" }] }] } };
export const Multiple: Story = { args: { multiple: true, size: "lg", options: [{ label: "Contract", value: "contract" }, { label: "Agreement", value: "agreement" }, { label: "Opinion", value: "opinion" }, { label: "Official Letter", value: "official" }] } };
