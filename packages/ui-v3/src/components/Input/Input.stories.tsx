import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Input } from ".";

const inputTemplateCode = `import { Input } from "@lds/ui-v3";

export function Example() {
  return <Input label="Document Title" placeholder="Enter a title" />;
}`;

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    label: "Label",
    placeholder: "Enter text"
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

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Read only"
  }
};

export const UsageTemplate: Story = {
  name: "Usage Template",
  args: {
    label: "Document Title",
    placeholder: "Enter a title"
  },
  parameters: {
    docs: {
      description: {
        story: "Basic text field usage."
      },
      source: {
        code: inputTemplateCode
      }
    }
  }
};
