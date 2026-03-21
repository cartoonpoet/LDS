import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import type { ColumnDef, SortingState, RowSelectionState } from "@tanstack/react-table";
import { DataTable } from ".";

/* ─── Sample data ─── */

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleData: User[] = [
  { id: 1, name: "김철수", email: "chulsoo@example.com", role: "관리자", status: "활성" },
  { id: 2, name: "이영희", email: "younghee@example.com", role: "사용자", status: "활성" },
  { id: 3, name: "박민수", email: "minsoo@example.com", role: "사용자", status: "비활성" },
  { id: 4, name: "최지연", email: "jiyeon@example.com", role: "편집자", status: "활성" },
  { id: 5, name: "정하나", email: "hana@example.com", role: "사용자", status: "활성" },
];

const columns: ColumnDef<User, any>[] = [
  { accessorKey: "id", header: "번호", size: 80 },
  { accessorKey: "name", header: "이름" },
  { accessorKey: "email", header: "이메일" },
  { accessorKey: "role", header: "역할", size: 120 },
  { accessorKey: "status", header: "상태", size: 100 },
];

/**
 * **DataTable** — @tanstack/react-table 기반 데이터 테이블
 *
 * ### 사용법
 * ```tsx
 * import { DataTable } from "@lds/ui-v3";
 * import type { ColumnDef } from "@tanstack/react-table";
 *
 * const columns: ColumnDef<Item>[] = [
 *   { accessorKey: "name", header: "이름" },
 *   { accessorKey: "email", header: "이메일" },
 * ];
 *
 * <DataTable data={items} columns={columns} />
 * ```
 */
const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6" }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

/** 기본 테이블 */
export const Default: Story = {
  render: () => <DataTable data={sampleData} columns={columns} />,
};

/** 세로 구분선 (bordered) */
export const Bordered: Story = {
  render: () => <DataTable data={sampleData} columns={columns} bordered />,
};

/** 행 선택 (체크박스) */
export const Selectable: Story = {
  render: () => {
    const SelectableTable = () => {
      const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
      return (
        <DataTable
          data={sampleData}
          columns={columns}
          selectable
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          getRowId={(row) => String(row.id)}
        />
      );
    };
    return <SelectableTable />;
  },
};

/** 정렬 */
export const Sortable: Story = {
  render: () => {
    const SortableTable = () => {
      const [sorting, setSorting] = useState<SortingState>([]);
      return (
        <DataTable
          data={sampleData}
          columns={columns}
          sorting={sorting}
          onSortingChange={setSorting}
        />
      );
    };
    return <SortableTable />;
  },
};

/** 선택 + 정렬 + bordered */
export const FullFeatured: Story = {
  name: "Full Featured",
  render: () => {
    const FullTable = () => {
      const [sorting, setSorting] = useState<SortingState>([]);
      const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
      return (
        <DataTable
          data={sampleData}
          columns={columns}
          selectable
          bordered
          sorting={sorting}
          onSortingChange={setSorting}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          getRowId={(row) => String(row.id)}
        />
      );
    };
    return <FullTable />;
  },
};

/** 빈 데이터 */
export const Empty: Story = {
  render: () => <DataTable data={[]} columns={columns} emptyText="조회된 데이터가 없습니다." />,
};

/** 행 클릭 */
export const RowClick: Story = {
  name: "Row Click",
  render: () => (
    <DataTable
      data={sampleData}
      columns={columns}
      onRowClick={(row) => alert(`클릭: ${row.name}`)}
    />
  ),
};
