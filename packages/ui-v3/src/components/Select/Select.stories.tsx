import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Select } from ".";

const baseOptions = [
  { label: "Draft", value: "draft" },
  { label: "In Review", value: "review" },
  { label: "Approved", value: "approved" }
];

const selectTemplateCode = `import { Select } from "@lds/ui-v3";

const options = [
  { label: "Draft", value: "draft" },
  { label: "In Review", value: "review" },
  { label: "Approved", value: "approved" }
];

export function Example() {
  return (
    <Select
      label="Status"
      options={options}
      placeholder="Select a status"
    />
  );
}`;

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
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

export const Preselected: Story = {
  args: {
    defaultValue: "review"
  }
};

export const WithHelperText: Story = {
  args: {
    helperText: "Choose the current document status."
  }
};

export const Invalid: Story = {
  args: {
    invalid: true,
    helperText: "You must choose a status."
  }
};

export const GroupedOptions: Story = {
  args: {
    options: [
      {
        label: "Review",
        options: [
          { label: "Draft", value: "draft" },
          { label: "In Review", value: "review" }
        ]
      },
      {
        label: "Done",
        options: [{ label: "Approved", value: "approved" }]
      }
    ]
  }
};

export const Multiple: Story = {
  args: {
    multiple: true,
    size: "lg",
    options: [
      { label: "Contract", value: "contract" },
      { label: "Agreement", value: "agreement" },
      { label: "Opinion", value: "opinion" },
      { label: "Official Letter", value: "official" }
    ]
  }
};

export const UsageTemplate: Story = {
  name: "Usage Template",
  args: {
    label: "Status",
    options: baseOptions,
    placeholder: "Select a status"
  },
  parameters: {
    docs: {
      description: {
        story: "Basic single-select dropdown usage."
      },
      source: {
        code: selectTemplateCode
      }
    }
  }
};
