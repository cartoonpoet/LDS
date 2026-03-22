import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { TreeView } from ".";
import type { TreeNode } from ".";

/* ─── Sample data ─── */

const contractNodes: TreeNode[] = [
  {
    id: "root",
    label: "상위 마스터",
    labelColor: "primary",
    columns: [
      { text: "C20190301", type: "code" },
      { text: "주식회사 한라산 법무관리시스템 구축 계약", type: "title" },
      { text: "2019-01-03", type: "date" },
    ],
    children: [
      {
        id: "master-1",
        label: "마스터",
        labelColor: "primary",
        columns: [
          { text: "C20190301-01", type: "code" },
          { text: "주식회사 한라산 법무관리시스템 유지보수 계약", type: "title" },
          { text: "2020-01-03", type: "date" },
        ],
        children: [
          {
            id: "child-1",
            label: "하위",
            labelColor: "secondary",
            columns: [
              { text: "C20190301-01-001", type: "code" },
              { text: "주식회사 한라산 법무관리시스템 유지보수 계약", type: "title" },
              { text: "2021-01-04", type: "date" },
            ],
          },
          {
            id: "child-2",
            label: "하위",
            labelColor: "secondary",
            columns: [
              { text: "C20190301-01-002", type: "code" },
              { text: "주식회사 한라산 법무관리시스템 유지보수 계약", type: "title" },
              { text: "2022-01-03", type: "date" },
            ],
          },
          {
            id: "child-3",
            label: "하위",
            labelColor: "secondary",
            columns: [
              { text: "C20190301-01-003", type: "code" },
              { text: "주식회사 한라산 법무관리시스템 유지보수 계약", type: "title" },
              { text: "2023-01-02", type: "date" },
            ],
          },
          {
            id: "child-4",
            label: "하위",
            labelColor: "secondary",
            columns: [
              { text: "C20190301-01-004", type: "code" },
              { text: "주식회사 한라산 법무관리시스템 유지보수 계약", type: "title" },
              { text: "2024-01-02", type: "date" },
            ],
          },
        ],
      },
    ],
  },
];

const folderNodes: TreeNode[] = [
  {
    id: "root",
    label: "프로젝트",
    labelColor: "primary",
    columns: [{ text: "LDS 디자인 시스템", type: "title" }],
    children: [
      {
        id: "src",
        label: "폴더",
        labelColor: "primary",
        columns: [{ text: "src", type: "title" }],
        children: [
          {
            id: "components",
            label: "폴더",
            labelColor: "secondary",
            columns: [{ text: "components", type: "title" }],
          },
          {
            id: "lib",
            label: "폴더",
            labelColor: "secondary",
            columns: [{ text: "lib", type: "title" }],
          },
        ],
      },
      {
        id: "package",
        columns: [{ text: "package.json", type: "title" }],
      },
      {
        id: "tsconfig",
        columns: [{ text: "tsconfig.json", type: "title" }],
      },
    ],
  },
];

/**
 * **TreeView** — 계층 구조 트리 컴포넌트
 *
 * ### 사용법
 * ```tsx
 * import { TreeView } from "@lds/ui-v3";
 * import type { TreeNode } from "@lds/ui-v3";
 *
 * const nodes: TreeNode[] = [
 *   {
 *     id: "1",
 *     label: "상위 마스터",
 *     columns: [
 *       { text: "C20190301", type: "code" },
 *       { text: "계약 제목", type: "title" },
 *       { text: "2019-01-03", type: "date" },
 *     ],
 *     children: [...]
 *   },
 * ];
 *
 * <TreeView nodes={nodes} onNodeSelect={(node) => console.log(node.id)} />
 * ```
 */
const meta: Meta<typeof TreeView> = {
  title: "Components/TreeView",
  component: TreeView,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6", maxWidth: 700 }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

/** 계약 트리 (Zeplin 원본 디자인) */
export const ContractTree: Story = {
  name: "Contract Tree",
  render: () => (
    <TreeView
      nodes={contractNodes}
      defaultExpandedIds={["root", "master-1"]}
    />
  ),
};

/** 노드 선택 */
export const Selectable: Story = {
  render: () => {
    const SelectableTree = () => {
      const [selectedId, setSelectedId] = useState<string>();
      return (
        <TreeView
          nodes={contractNodes}
          defaultExpandedIds={["root", "master-1"]}
          selectedId={selectedId}
          onNodeSelect={(node) => setSelectedId(node.id)}
        />
      );
    };
    return <SelectableTree />;
  },
};

/** 폴더 구조 */
export const FolderTree: Story = {
  name: "Folder Structure",
  render: () => (
    <TreeView
      nodes={folderNodes}
      defaultExpandedIds={["root", "src"]}
    />
  ),
};

/** 접힌 상태 */
export const Collapsed: Story = {
  render: () => (
    <TreeView
      nodes={contractNodes}
      defaultExpandedIds={[]}
    />
  ),
};
