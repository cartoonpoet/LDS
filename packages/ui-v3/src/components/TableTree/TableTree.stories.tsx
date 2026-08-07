import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { TableTree } from ".";
import type { TableTreeColumn, TableTreeRow } from ".";

/**
 * ## TableTree
 *
 * 모계약–하위계약처럼 계층이 있는 데이터를 표 안에서 접었다 펼치는 프리미티브.
 * table/thead/tbody 시맨틱 마크업과 DataTable의 시각 언어를 따르며,
 * 자식 행은 부모 확장 시에만 렌더됩니다. (자체 재귀 렌더 — 외부 의존성 없음)
 *
 * ### Import
 * ```tsx
 * import { TableTree } from "@lds/ui-v3";
 * import type { TableTreeColumn, TableTreeRow } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `columns` | `TableTreeColumn[]` — `{ key, header, width?, align? }` | - | 컬럼 정의 |
 * | `rows` | `TableTreeRow[]` — `{ id, cells, children? }` | - | 계층 행 데이터 |
 * | `defaultExpandedIds` | `string[]` | `[]` | 초기 펼침 행 ID (uncontrolled) |
 * | `expandedIds` | `string[]` | - | 펼침 행 ID (controlled) |
 * | `onExpandedChange` | `(ids: string[]) => void` | - | 펼침 상태 변경 콜백 |
 * | `onRowClick` | `(row: TableTreeRow) => void` | - | 행 클릭 콜백 |
 * | `selectedId` | `string` | - | 선택된 행 ID |
 * | `bordered` | `boolean` | `false` | 세로 구분선 표시 |
 * | `indentSize` | `number` | `20` | 깊이당 들여쓰기 px |
 * | `emptyText` | `ReactNode` | `"데이터가 없습니다."` | 데이터 없을 때 표시 메시지 |
 */
const meta: Meta<typeof TableTree> = {
  title: "Components/TableTree",
  component: TableTree,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const columns: TableTreeColumn[] = [
  { key: "code", header: "관리번호", width: 180 },
  { key: "title", header: "계약명" },
  { key: "status", header: "상태", width: 120 },
  { key: "date", header: "체결일", width: 120, align: "right" },
];

const rows: TableTreeRow[] = [
  {
    id: "1",
    cells: { code: "C20190301", title: "법무관리시스템 구축 계약", status: "진행중", date: "2019-01-03" },
    children: [
      {
        id: "1-1",
        cells: { code: "C20190301-01", title: "법무관리시스템 유지보수", status: "진행중", date: "2020-01-03" },
        children: [
          {
            id: "1-1-1",
            cells: { code: "C20190301-01-01", title: "유지보수 연장 합의", status: "완료", date: "2021-01-03" },
          },
        ],
      },
      {
        id: "1-2",
        cells: { code: "C20190301-02", title: "라이선스 추가 공급", status: "완료", date: "2020-06-15" },
      },
    ],
  },
  {
    id: "2",
    cells: { code: "C20221108", title: "Law.ai 공급 계약", status: "검토중", date: "2022-11-08" },
  },
];

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => <TableTree columns={columns} rows={rows} defaultExpandedIds={["1"]} />,
  parameters: {
    docs: {
      source: {
        code: `import { TableTree } from "@lds/ui-v3";
import type { TableTreeColumn, TableTreeRow } from "@lds/ui-v3";

const columns: TableTreeColumn[] = [
  { key: "code", header: "관리번호", width: 180 },
  { key: "title", header: "계약명" },
  { key: "date", header: "체결일", width: 120, align: "right" },
];

const rows: TableTreeRow[] = [
  {
    id: "1",
    cells: { code: "C20190301", title: "법무관리시스템 구축 계약", date: "2019-01-03" },
    children: [
      {
        id: "1-1",
        cells: { code: "C20190301-01", title: "유지보수 계약", date: "2020-01-03" },
      },
    ],
  },
  {
    id: "2",
    cells: { code: "C20221108", title: "Law.ai 공급 계약", date: "2022-11-08" },
  },
];

// 기본 — 자식 행은 부모 확장 시에만 렌더
<TableTree columns={columns} rows={rows} />

// 초기 펼침 + 행 클릭/선택
<TableTree
  columns={columns}
  rows={rows}
  defaultExpandedIds={["1"]}
  selectedId={selectedId}
  onRowClick={(row) => setSelectedId(row.id)}
/>

// Controlled 펼침 상태
const [expandedIds, setExpandedIds] = useState<string[]>(["1"]);
<TableTree
  columns={columns}
  rows={rows}
  expandedIds={expandedIds}
  onExpandedChange={setExpandedIds}
/>

// 세로 구분선 + 들여쓰기 조절 + 빈 상태 메시지
<TableTree columns={columns} rows={rows} bordered indentSize={28} emptyText="조회된 계약이 없습니다." />`,
      },
    },
  },
};

export const Basic: Story = {
  render: () => <TableTree columns={columns} rows={rows} />,
};

export const DefaultExpanded: Story = {
  render: () => <TableTree columns={columns} rows={rows} defaultExpandedIds={["1", "1-1"]} />,
};

function SelectableExample() {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  return (
    <TableTree
      columns={columns}
      rows={rows}
      defaultExpandedIds={["1"]}
      selectedId={selectedId}
      onRowClick={(row) => setSelectedId(row.id)}
    />
  );
}

export const Selectable: Story = {
  render: () => <SelectableExample />,
};

function ControlledExample() {
  const [expandedIds, setExpandedIds] = useState<string[]>(["1"]);
  return (
    <div>
      <p style={{ marginBottom: 8, fontSize: 13 }}>펼침: {expandedIds.join(", ") || "없음"}</p>
      <TableTree
        columns={columns}
        rows={rows}
        expandedIds={expandedIds}
        onExpandedChange={setExpandedIds}
      />
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Bordered: Story = {
  render: () => <TableTree columns={columns} rows={rows} defaultExpandedIds={["1"]} bordered />,
};

export const Empty: Story = {
  render: () => <TableTree columns={columns} rows={[]} emptyText="조회된 계약이 없습니다." />,
};
