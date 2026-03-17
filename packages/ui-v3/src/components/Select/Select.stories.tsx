import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Select } from ".";

const baseOptions = [
  { label: "Draft", value: "draft" },
  { label: "In Review", value: "review" },
  { label: "Approved", value: "approved" }
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "LDS 선택 필드 컴포넌트입니다. placeholder, invalid, grouped options, multiple 모드를 지원합니다."
      }
    }
  },
  args: {
    label: "Status",
    options: baseOptions,
    placeholder: "Select a status"
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
export const Preselected: Story = { args: { defaultValue: "review" } };
export const WithHelperText: Story = { args: { helperText: "Choose the current document status." } };
export const Invalid: Story = { args: { invalid: true, helperText: "You must choose a status." } };
export const GroupedOptions: Story = { args: { options: [{ label: "Review", options: [{ label: "Draft", value: "draft" }, { label: "In Review", value: "review" }] }, { label: "Done", options: [{ label: "Approved", value: "approved" }] }] } };
export const Multiple: Story = { args: { multiple: true, size: "lg", options: [{ label: "Contract", value: "contract" }, { label: "Agreement", value: "agreement" }, { label: "Opinion", value: "opinion" }, { label: "Official Letter", value: "official" }] } };
