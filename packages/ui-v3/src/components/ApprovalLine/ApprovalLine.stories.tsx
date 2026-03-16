import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { ApprovalLine } from ".";

const items = [
  { id: "1", order: 1, name: "김준호", role: "작성자", department: "법무팀", status: "approved" as const, date: "2026-03-16 09:10" },
  { id: "2", order: 2, name: "이연이", role: "검토자", department: "운영팀", status: "current" as const, metadata: "세부 조항 검토 중" },
  { id: "3", order: 3, name: "박서윤", role: "최종 승인", department: "경영지원", status: "pending" as const }
];

const meta: Meta<typeof ApprovalLine> = {
  title: "Components/ApprovalLine",
  component: ApprovalLine,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "문서 결재 흐름을 가로/세로 형태로 표현하는 LDS 결재선 컴포넌트입니다. 승인 상태, 담당 역할, 메모를 함께 노출할 수 있습니다."
      }
    }
  },
  args: {
    items
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: 24, background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {};

export const Vertical: Story = {
  args: {
    direction: "vertical"
  }
};

export const WithRejectedStep: Story = {
  args: {
    items: [
      ...items.slice(0, 2),
      { id: "3", order: 3, name: "박서윤", role: "최종 승인", status: "rejected", date: "2026-03-16 11:48", comment: "첨부 서류 보완 후 재상신 부탁드립니다." }
    ]
  }
};
