import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Tooltip } from ".";

/**
 * **Tooltip** — 마우스 호버 시 부가 정보를 보여주는 다크 툴팁
 *
 * ### 사용법
 * ```tsx
 * import { Tooltip } from "@lds/ui-v3";
 *
 * // 1-row (기본)
 * <Tooltip content="Tooltip right" placement="right">
 *   <button>Hover me</button>
 * </Tooltip>
 *
 * // 2-row (제목 + 내용)
 * <Tooltip title="이법무(법무팀)" content={"bmlee3@humaxit.com\n010-1234-5678"} placement="right">
 *   <span>이법무</span>
 * </Tooltip>
 * ```
 */
const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{
          padding: 80,
          backgroundColor: "#f2f4f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
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
type Story = StoryObj<typeof Tooltip>;

const SampleButton = ({ children }: { children: string }) => (
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

/** 기본 1줄 툴팁 (Top) */
export const Top: Story = {
  args: {
    content: "Tooltip Top",
    placement: "top",
  },
  render: (args) => (
    <Tooltip {...args}>
      <SampleButton>Top</SampleButton>
    </Tooltip>
  ),
};

/** 기본 1줄 툴팁 (Bottom) */
export const Bottom: Story = {
  args: {
    content: "Tooltip Bottom",
    placement: "bottom",
  },
  render: (args) => (
    <Tooltip {...args}>
      <SampleButton>Bottom</SampleButton>
    </Tooltip>
  ),
};

/** 기본 1줄 툴팁 (Left) */
export const Left: Story = {
  args: {
    content: "Tooltip Left",
    placement: "left",
  },
  render: (args) => (
    <Tooltip {...args}>
      <SampleButton>Left</SampleButton>
    </Tooltip>
  ),
};

/** 기본 1줄 툴팁 (Right) */
export const Right: Story = {
  args: {
    content: "Tooltip right",
    placement: "right",
  },
  render: (args) => (
    <Tooltip {...args}>
      <SampleButton>Right</SampleButton>
    </Tooltip>
  ),
};

/** 2줄 변형 — 이름 + 연락처 */
export const TwoRow: Story = {
  args: {
    title: "이법무(법무팀)",
    content: "bmlee3@humaxit.com\n010-1234-5678",
    placement: "right",
  },
  render: (args) => (
    <Tooltip {...args}>
      <SampleButton>이법무</SampleButton>
    </Tooltip>
  ),
};

/** 4방향 한눈에 보기 */
export const AllPlacements: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
      <Tooltip content="Tooltip Top" placement="top">
        <SampleButton>Top</SampleButton>
      </Tooltip>
      <Tooltip content="Tooltip Bottom" placement="bottom">
        <SampleButton>Bottom</SampleButton>
      </Tooltip>
      <Tooltip content="Tooltip Left" placement="left">
        <SampleButton>Left</SampleButton>
      </Tooltip>
      <Tooltip content="Tooltip right" placement="right">
        <SampleButton>Right</SampleButton>
      </Tooltip>
    </div>
  ),
};
