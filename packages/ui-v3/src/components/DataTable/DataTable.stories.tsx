import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { DataTable } from ".";

type ContractRow = {
  id: string;
  title: string;
  owner: string;
  status: "검토중" | "완료" | "보류";
  updatedAt: string;
};

const rows: ContractRow[] = [
  { id: "row-1", title: "NDA 검토", owner: "이연이", status: "검토중", updatedAt: "2026-03-16" },
  { id: "row-2", title: "MOU 체결", owner: "김준호", status: "완료", updatedAt: "2026-03-15" },
  { id: "row-3", title: "라이선스 확인", owner: "박서윤", status: "보류", updatedAt: "2026-03-12" }
];

const columns = [
  {
    key: "title",
    label: "문서명",
    accessor: "title" as const,
    sortable: true,
    width: "35%"
  },
  {
    key: "owner",
    label: "담당자",
    accessor: "owner" as const,
    sortable: true,
    width: "20%"
  },
  {
    key: "status",
    label: "상태",
    align: "center" as const,
    sortable: true,
    renderCell: (row: ContractRow) => {
      const tone = row.status === "완료" ? "primary" : row.status === "보류" ? "neutral" : "primary";
      const variant = row.status === "검토중" ? "outline" : row.status === "보류" ? "muted" : "filled";

      return <Badge tone={tone} variant={variant}>{row.status}</Badge>;
    }
  },
  {
    key: "updatedAt",
    label: "수정일",
    accessor: "updatedAt" as const,
    align: "right" as const,
    sortable: true,
    width: "20%"
  },
  {
    key: "action",
    label: "",
    align: "right" as const,
    renderCell: () => <Button size="sm" variant="outline">열기</Button>,
    width: "1%"
  }
];

const meta: Meta<typeof DataTable<ContractRow>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "정렬 가능한 헤더, 비어 있는 상태, density를 지원하는 LDS 데이터 테이블입니다. 법무 시스템 목록 화면의 기본 테이블 프리미티브로 사용합니다."
      }
    }
  },
  args: {
    caption: "계약 문서 목록",
    columns,
    rows,
    rowKey: "id"
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

export const Comfortable: Story = {};

export const Compact: Story = {
  args: {
    density: "compact"
  }
};

export const Empty: Story = {
  args: {
    rows: [],
    emptyState: "현재 표시할 문서가 없습니다."
  }
};
