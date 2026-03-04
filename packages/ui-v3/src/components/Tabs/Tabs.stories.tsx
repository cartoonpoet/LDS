import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Tabs } from ".";

const items = [
  { label: "Overview", value: "overview", content: "Overview content" },
  { label: "History", value: "history", content: "History content" },
  { label: "Files", value: "files", content: "Files content" }
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

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  args: {
    items
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", width: "560px", background: "#f4f6fb" }}>
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
      `import { Tabs } from "@lds/ui-v3";

const items = [
  { label: "Overview", value: "overview", content: "Overview content" },
  { label: "History", value: "history", content: "History content" },
  { label: "Files", value: "files", content: "Files content" }
];

export function Example() {
  return <Tabs items={items} />;
}`,
      "Default tabs."
    )
  }
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "history"
  },
  parameters: {
    ...withCode(
      `import { Tabs } from "@lds/ui-v3";

const items = [
  { label: "Overview", value: "overview", content: "Overview content" },
  { label: "History", value: "history", content: "History content" },
  { label: "Files", value: "files", content: "Files content" }
];

export function Example() {
  return <Tabs items={items} defaultValue="history" />;
}`,
      "Tabs with default selected item."
    )
  }
};

export const Stretched: Story = {
  args: {
    stretched: true
  },
  parameters: {
    ...withCode(
      `import { Tabs } from "@lds/ui-v3";

const items = [
  { label: "Overview", value: "overview", content: "Overview content" },
  { label: "History", value: "history", content: "History content" },
  { label: "Files", value: "files", content: "Files content" }
];

export function Example() {
  return <Tabs items={items} stretched />;
}`,
      "Tabs stretched to fill container."
    )
  }
};
