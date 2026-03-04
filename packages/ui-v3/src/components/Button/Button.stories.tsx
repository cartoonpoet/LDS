import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Button } from ".";

const buttonTemplateCode = `import { Button } from "@lds/ui-v3";

export function Example() {
  return (
    <Button tone="primary" variant="solid" size="md">
      Save
    </Button>
  );
}`;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Confirm",
    tone: "primary",
    variant: "solid",
    size: "md"
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const DangerOutline: Story = {
  args: {
    children: "Delete",
    tone: "danger",
    variant: "outline"
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    tone: "primary",
    children: "Save Changes"
  }
};

export const LargeWithIcons: Story = {
  args: {
    size: "lg",
    leadingIcon: "<",
    trailingIcon: ">",
    children: "Move Forward"
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Submitting"
  }
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Action"
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", width: "320px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export const UsageTemplate: Story = {
  name: "Usage Template",
  args: {
    children: "Save",
    tone: "primary",
    variant: "solid",
    size: "md"
  },
  parameters: {
    docs: {
      description: {
        story: "Basic usage example you can copy into a service."
      },
      source: {
        code: buttonTemplateCode
      }
    }
  }
};
