import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Badge } from ".";

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

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "Draft",
    tone: "primary",
    variant: "soft"
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

export const Soft: Story = {
  parameters: {
    ...withCode(
      `import { Badge } from "@lds/ui-v3";

export function Example() {
  return <Badge tone="primary">Draft</Badge>;
}`,
      "Soft badge."
    )
  }
};

export const Solid: Story = {
  args: {
    children: "Approved",
    tone: "success",
    variant: "solid"
  },
  parameters: {
    ...withCode(
      `import { Badge } from "@lds/ui-v3";

export function Example() {
  return (
    <Badge tone="success" variant="solid">
      Approved
    </Badge>
  );
}`,
      "Solid badge."
    )
  }
};

export const Outline: Story = {
  args: {
    children: "Blocked",
    tone: "danger",
    variant: "outline"
  },
  parameters: {
    ...withCode(
      `import { Badge } from "@lds/ui-v3";

export function Example() {
  return (
    <Badge tone="danger" variant="outline">
      Blocked
    </Badge>
  );
}`,
      "Outline badge."
    )
  }
};
