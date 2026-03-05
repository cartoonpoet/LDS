import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Select } from ".";

const baseOptions = [
  { label: "Draft", value: "draft" },
  { label: "In Review", value: "review" },
  { label: "Approved", value: "approved" }
];

const withCode = (code: string, description: string) => ({
  docs: {
    description: {
      story: description
    },
    source: {
      code
    }
  }
});

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "LDS 선택 필드 컴포넌트입니다. placeholder, invalid, grouped options, multiple 모드를 지원합니다."
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

export const Default: Story = {
  parameters: {
    ...withCode(
      `import { Select } from "@lds/ui-v3";

const options = [
  { label: "Draft", value: "draft" },
  { label: "In Review", value: "review" },
  { label: "Approved", value: "approved" }
];

export function Example() {
  return <Select label="Status" options={options} placeholder="Select a status" />;
}`,
      "Default single-select dropdown."
    )
  }
};

export const Preselected: Story = {
  args: {
    defaultValue: "review"
  },
  parameters: {
    ...withCode(
      `import { Select } from "@lds/ui-v3";

const options = [
  { label: "Draft", value: "draft" },
  { label: "In Review", value: "review" },
  { label: "Approved", value: "approved" }
];

export function Example() {
  return <Select label="Status" options={options} defaultValue="review" />;
}`,
      "Preselected dropdown value."
    )
  }
};

export const WithHelperText: Story = {
  args: {
    helperText: "Choose the current document status."
  },
  parameters: {
    ...withCode(
      `import { Select } from "@lds/ui-v3";

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
      helperText="Choose the current document status."
    />
  );
}`,
      "Select with helper text."
    )
  }
};

export const Invalid: Story = {
  args: {
    invalid: true,
    helperText: "You must choose a status."
  },
  parameters: {
    ...withCode(
      `import { Select } from "@lds/ui-v3";

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
      invalid
      helperText="You must choose a status."
    />
  );
}`,
      "Invalid select state."
    )
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
  },
  parameters: {
    ...withCode(
      `import { Select } from "@lds/ui-v3";

const options = [
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
];

export function Example() {
  return <Select label="Status" options={options} />;
}`,
      "Grouped options with optgroup."
    )
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
  },
  parameters: {
    ...withCode(
      `import { Select } from "@lds/ui-v3";

const options = [
  { label: "Contract", value: "contract" },
  { label: "Agreement", value: "agreement" },
  { label: "Opinion", value: "opinion" },
  { label: "Official Letter", value: "official" }
];

export function Example() {
  return <Select label="Document Types" options={options} multiple size="lg" />;
}`,
      "Multiple select example."
    )
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
    ...withCode(
      `import { Select } from "@lds/ui-v3";

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
}`,
      "Base select template."
    )
  }
};
