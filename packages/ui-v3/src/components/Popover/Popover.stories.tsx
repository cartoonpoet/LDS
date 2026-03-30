import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Popover } from ".";

/**
 * **Popover** — 클릭 시 표시되는 팝오버 카드
 */
const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{
          padding: 120,
          backgroundColor: "#f2f4f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300,
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: {
    title: "Popover Title",
    content: "This is a very beautiful popover, show some love.",
    confirmText: "Read More",
    cancelText: "Skip",
    placement: "bottom",
  },
  render: (args) => (
    <Popover {...args}>
      <button type="button" style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>
        Click me
      </button>
    </Popover>
  ),
  parameters: {
    docs: {
      source: {
        code: `import { Popover } from "@lds/ui-v3";

// 기본 (간편 API)
<Popover
  title="Popover Title"
  content="This is a very beautiful popover, show some love."
  confirmText="Read More"
  cancelText="Skip"
  placement="right"
>
  <button>Click me</button>
</Popover>

// 커스텀 바디 (compound)
<Popover title="Custom" popoverBody={<MyCustomContent />} placement="bottom">
  <button>Click</button>
</Popover>
`,
      },
    },
  },
};

const TriggerButton = ({ children }: { children: string }) => (
  <button
    type="button"
    style={{
      padding: "8px 16px",
      borderRadius: 6,
      border: "1px solid #ccc",
      background: "#fff",
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

/** Popover Right */
export const Right: Story = {
  args: {
    title: "Popover Right",
    content: "This is a very beautiful popover, show some love.",
    confirmText: "Read More",
    cancelText: "Skip",
    placement: "right",
  },
  render: (args) => (
    <Popover {...args}>
      <TriggerButton>Right</TriggerButton>
    </Popover>
  ),
};

/** Popover Bottom */
export const Bottom: Story = {
  args: {
    title: "Popover Bottom",
    content: "This is a very beautiful popover, show some love.",
    confirmText: "Read More",
    cancelText: "Skip",
    placement: "bottom",
  },
  render: (args) => (
    <Popover {...args}>
      <TriggerButton>Bottom</TriggerButton>
    </Popover>
  ),
};

/** Popover Top */
export const Top: Story = {
  args: {
    title: "Popover Top",
    content: "This is a very beautiful popover, show some love.",
    confirmText: "Read More",
    cancelText: "Skip",
    placement: "top",
  },
  render: (args) => (
    <Popover {...args}>
      <TriggerButton>Top</TriggerButton>
    </Popover>
  ),
};

/** Popover Left */
export const Left: Story = {
  args: {
    title: "Popover Left",
    content: "This is a very beautiful popover, show some love.",
    confirmText: "Read More",
    cancelText: "Skip",
    placement: "left",
  },
  render: (args) => (
    <Popover {...args}>
      <TriggerButton>Left</TriggerButton>
    </Popover>
  ),
};

/** 제목 없이 본문만 */
export const NoHeader: Story = {
  args: {
    content: "간단한 팝오버 메시지",
    confirmText: "확인",
    placement: "bottom",
  },
  render: (args) => (
    <Popover {...args}>
      <TriggerButton>No Header</TriggerButton>
    </Popover>
  ),
};

/** 4방향 한눈에 */
export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
      {(["top", "bottom", "left", "right"] as const).map((p) => (
        <Popover
          key={p}
          title={`Popover ${p.charAt(0).toUpperCase() + p.slice(1)}`}
          content="This is a very beautiful popover, show some love."
          confirmText="Read More"
          cancelText="Skip"
          placement={p}
        >
          <TriggerButton>{p.charAt(0).toUpperCase() + p.slice(1)}</TriggerButton>
        </Popover>
      ))}
    </div>
  ),
};
