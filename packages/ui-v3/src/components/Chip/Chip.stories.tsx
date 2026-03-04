import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Chip } from ".";

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

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  args: {
    children: "Option 1"
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

export const Basic: Story = {
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return <Chip>Option 1</Chip>;
}`,
      "Basic chip."
    )
  }
};

export const SelectedCheck: Story = {
  args: {
    checkable: true,
    selected: true
  },
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return (
    <Chip checkable selected>
      Option 1
    </Chip>
  );
}`,
      "Check-type chip."
    )
  }
};

export const Dismissible: Story = {
  args: {
    dismissible: true
  },
  parameters: {
    ...withCode(
      `import { Chip } from "@lds/ui-v3";

export function Example() {
  return <Chip dismissible>Option 1</Chip>;
}`,
      "Dismissible chip."
    )
  }
};
