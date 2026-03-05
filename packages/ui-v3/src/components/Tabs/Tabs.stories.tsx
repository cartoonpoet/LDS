import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Tabs } from ".";

const items = [
  { label: "Tab 1", value: "tab1", content: "Tab 1 content" },
  { label: "Tab 2", value: "tab2", content: "Tab 2 content" },
  { label: "Tab 3", value: "tab3", content: "Tab 3 content" },
  { label: "Tab 4", value: "tab4", content: "Tab 4 content" }
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
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "LDS 탭 컴포넌트입니다. line/segment 스타일과 stretched 배치를 지원합니다."
      }
    }
  },
  args: {
    items
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: "24px", width: "640px", background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Line: Story = {
  parameters: {
    ...withCode(
      `import { Tabs } from "@lds/ui-v3";

const items = [
  { label: "Tab 1", value: "tab1", content: "Tab 1 content" },
  { label: "Tab 2", value: "tab2", content: "Tab 2 content" },
  { label: "Tab 3", value: "tab3", content: "Tab 3 content" },
  { label: "Tab 4", value: "tab4", content: "Tab 4 content" }
];

export function Example() {
  return <Tabs items={items} variant="line" />;
}`,
      "Line tab style close to the Zeplin standard tabs."
    )
  }
};

export const Segment: Story = {
  args: {
    variant: "segment"
  },
  parameters: {
    ...withCode(
      `import { Tabs } from "@lds/ui-v3";

const items = [
  { label: "Tab 1", value: "tab1", content: "Tab 1 content" },
  { label: "Tab 2", value: "tab2", content: "Tab 2 content" },
  { label: "Tab 3", value: "tab3", content: "Tab 3 content" },
  { label: "Tab 4", value: "tab4", content: "Tab 4 content" }
];

export function Example() {
  return <Tabs items={items} variant="segment" />;
}`,
      "Segmented tab style."
    )
  }
};

export const StretchedSegment: Story = {
  args: {
    variant: "segment",
    stretched: true
  },
  parameters: {
    ...withCode(
      `import { Tabs } from "@lds/ui-v3";

const items = [
  { label: "Tab 1", value: "tab1", content: "Tab 1 content" },
  { label: "Tab 2", value: "tab2", content: "Tab 2 content" },
  { label: "Tab 3", value: "tab3", content: "Tab 3 content" },
  { label: "Tab 4", value: "tab4", content: "Tab 4 content" }
];

export function Example() {
  return <Tabs items={items} variant="segment" stretched />;
}`,
      "Stretched segmented tabs."
    )
  }
};
