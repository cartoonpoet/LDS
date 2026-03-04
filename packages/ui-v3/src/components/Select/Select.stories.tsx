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
  args: {
    label: "Status",
    options: baseOptions
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

export const Preselected: Story = {
  args: {
    defaultValue: "review"
  }
};
