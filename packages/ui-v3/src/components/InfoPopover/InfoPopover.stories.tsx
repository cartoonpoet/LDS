import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { InfoPopover } from ".";

/**
 * **InfoPopover** — 프로세스 진행 상태를 스텝으로 표시하는 정보 팝오버
 *
 * ### 사용법
 * ```tsx
 * import { InfoPopover } from "@lds/ui-v3";
 *
 * <InfoPopover
 *   title="법무검토 중 외 3개"
 *   steps={[
 *     { label: "법무 검토 중" },
 *     { label: "요청자 검토 중" },
 *     { label: "계약서 검토 완료" },
 *     { label: "체결 품의 중" },
 *   ]}
 * >
 *   <span style={{ color: "#4C5469", cursor: "pointer" }}>법무검토 중 외 3개</span>
 * </InfoPopover>
 * ```
 */
const meta: Meta<typeof InfoPopover> = {
  title: "Components/InfoPopover",
  component: InfoPopover,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{
          padding: 160,
          paddingTop: 300,
          backgroundColor: "#f2f4f6",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InfoPopover>;

/** 기본 — 4단계 프로세스 */
export const Default: Story = {
  args: {
    title: "법무검토 중 외 3개",
    steps: [
      { label: "법무 검토 중" },
      { label: "요청자 검토 중" },
      { label: "계약서 검토 완료" },
      { label: "체결 품의 중" },
    ],
  },
  render: (args) => (
    <InfoPopover {...args}>
      <span
        style={{
          color: "#4C5469",
          cursor: "pointer",
          textDecoration: "underline",
          fontSize: 14,
        }}
      >
        법무검토 중 외 3개
      </span>
    </InfoPopover>
  ),
};

/** 2단계 */
export const TwoSteps: Story = {
  args: {
    title: "계약 진행 중",
    steps: [
      { label: "검토 요청" },
      { label: "법무 검토 중" },
    ],
  },
  render: (args) => (
    <InfoPopover {...args}>
      <span
        style={{
          color: "#4C5469",
          cursor: "pointer",
          textDecoration: "underline",
          fontSize: 14,
        }}
      >
        계약 진행 중
      </span>
    </InfoPopover>
  ),
};
