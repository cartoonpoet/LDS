import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { QuickMenuItem } from ".";

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M9 1H4.5C3.67 1 3 1.67 3 2.5v11c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5V5L9 1z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * **QuickMenuItem** — 퀵 메뉴 아이콘 카드 컴포넌트
 *
 * - Default: 흰 배경 + 테두리
 * - Hover / Active: 그래디언트 배경
 */
const meta: Meta<typeof QuickMenuItem> = {
  title: "Components/QuickMenuItem",
  component: QuickMenuItem,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6", display: "inline-flex" }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    icon: <FileIcon />,
    label: "계약",
  },
};

export default meta;
type Story = StoryObj<typeof QuickMenuItem>;

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
};

export const Row: Story = {
  name: "Row (4 items)",
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <QuickMenuItem icon={<FileIcon />} label="계약" active />
      <QuickMenuItem icon={<FileIcon />} label="소송" />
      <QuickMenuItem icon={<FileIcon />} label="프로젝트" />
      <QuickMenuItem icon={<FileIcon />} label="자문" />
    </div>
  ),
};
