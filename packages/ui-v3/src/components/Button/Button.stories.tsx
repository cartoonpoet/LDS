import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Button } from ".";

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

export const Primary: Story = {
  parameters: {
    ...withCode(
      `import { Button } from "@lds/ui-v3";

export function Example() {
  return <Button>Confirm</Button>;
}`,
      "Primary solid button."
    )
  }
};

export const DangerOutline: Story = {
  args: {
    children: "Delete",
    tone: "danger",
    variant: "outline"
  },
  parameters: {
    ...withCode(
      `import { Button } from "@lds/ui-v3";

export function Example() {
  return (
    <Button tone="danger" variant="outline">
      Delete
    </Button>
  );
}`,
      "Outline danger action."
    )
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  parameters: {
    ...withCode(
      `import { Button } from "@lds/ui-v3";

export function Example() {
  return <Button disabled>Confirm</Button>;
}`,
      "Disabled button state."
    )
  }
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    tone: "primary",
    children: "Save Changes"
  },
  parameters: {
    ...withCode(
      `import { Button } from "@lds/ui-v3";

export function Example() {
  return (
    <Button variant="gradient" tone="primary">
      Save Changes
    </Button>
  );
}`,
      "Gradient button style."
    )
  }
};

export const LargeWithIcons: Story = {
  args: {
    size: "lg",
    leadingIcon: "<",
    trailingIcon: ">",
    children: "Move Forward"
  },
  parameters: {
    ...withCode(
      `import { Button } from "@lds/ui-v3";

export function Example() {
  return (
    <Button size="lg" leadingIcon="<" trailingIcon=">">
      Move Forward
    </Button>
  );
}`,
      "Large button with leading and trailing icons."
    )
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Submitting"
  },
  parameters: {
    ...withCode(
      `import { Button } from "@lds/ui-v3";

export function Example() {
  return <Button loading>Submitting</Button>;
}`,
      "Loading state button."
    )
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
  ],
  parameters: {
    ...withCode(
      `import { Button } from "@lds/ui-v3";

export function Example() {
  return <Button fullWidth>Full Width Action</Button>;
}`,
      "Button stretched to container width."
    )
  }
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
    ...withCode(
      `import { Button } from "@lds/ui-v3";

export function Example() {
  return (
    <Button tone="primary" variant="solid" size="md">
      Save
    </Button>
  );
}`,
      "Base template you can copy into a service."
    )
  }
};
