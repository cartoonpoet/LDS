import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { ApprovalLine } from ".";

/**
 * ## ApprovalLine
 *
 * 결재선입니다. 결재자 순서·이름·직책과 대기/진행중/승인/반려 상태를
 * 카드 + 커넥터로 표시합니다. 수평·수직을 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { ApprovalLine } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `ApprovalLineItem[]` | (필수) | `{ id, name, order?, role?, department?, status?, date?, comment?, metadata? }` |
 * | `items[].status` | `"pending" \| "current" \| "approved" \| "rejected"` | `"pending"` | 결재 상태 |
 * | `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | 배치 방향 |
 * | `showConnector` | `boolean` | `true` | 카드 사이 연결선 |
 * | `ariaLabel` | `string` | `"결재선"` | 접근성 라벨 |
 */
const meta: Meta<typeof ApprovalLine> = {
  title: "Components/ApprovalLine",
  component: ApprovalLine,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "select", options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof ApprovalLine>;

const items = [
  { id: "1", order: 1, name: "박기안", role: "대리", department: "영업팀", status: "approved" as const, date: "9. 8. 14:02" },
  { id: "2", order: 2, name: "이검토", role: "과장", department: "법무팀", status: "approved" as const, date: "9. 9. 10:31" },
  { id: "3", order: 3, name: "최법무", role: "팀장", department: "법무팀", status: "current" as const },
  { id: "4", order: 4, name: "정대표", role: "대표이사", status: "pending" as const },
];

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { ApprovalLine } from "@lds/ui-v3";

// 기본 — 수평 결재선
<ApprovalLine
  items={[
    { id: "1", order: 1, name: "박기안", role: "대리", department: "영업팀", status: "approved", date: "9. 8. 14:02" },
    { id: "2", order: 2, name: "이검토", role: "과장", department: "법무팀", status: "approved", date: "9. 9. 10:31" },
    { id: "3", order: 3, name: "최법무", role: "팀장", department: "법무팀", status: "current" },
    { id: "4", order: 4, name: "정대표", role: "대표이사", status: "pending" },
  ]}
/>

// 수직 + 코멘트
<ApprovalLine
  direction="vertical"
  items={[
    { id: "1", name: "박기안", status: "approved" },
    { id: "2", name: "최법무", status: "rejected", comment: "계약 기간 조항 수정 후 재상신 바랍니다." },
  ]}
/>`,
      },
    },
  },
  render: () => <ApprovalLine items={items} />,
};

export const Vertical: Story = {
  name: "수직 + 반려 코멘트",
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <ApprovalLine
        direction="vertical"
        items={[
          { id: "1", order: 1, name: "박기안", role: "대리", department: "영업팀", status: "approved", date: "9. 8. 14:02" },
          { id: "2", order: 2, name: "최법무", role: "팀장", department: "법무팀", status: "rejected", comment: "계약 기간 조항 수정 후 재상신 바랍니다." },
        ]}
      />
    </div>
  ),
};

export const NoConnector: Story = {
  name: "커넥터 없음",
  render: () => <ApprovalLine items={items} showConnector={false} />,
};
