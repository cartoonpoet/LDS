import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { TreeView } from ".";

const items = [
  {
    id: "contracts",
    label: "계약 문서",
    description: "부서별 계약서 폴더",
    meta: "12",
    children: [
      { id: "nda", label: "NDA", meta: "4" },
      { id: "msa", label: "MSA", meta: "3" },
      {
        id: "vendors",
        label: "협력사",
        meta: "5",
        children: [
          { id: "vendor-a", label: "A사", description: "최종 수정 2일 전" },
          { id: "vendor-b", label: "B사", description: "최종 수정 7일 전" }
        ]
      }
    ]
  },
  {
    id: "policies",
    label: "사규 / 정책",
    meta: "8",
    children: [
      { id: "security", label: "보안 정책" },
      { id: "hr", label: "인사 규정" }
    ]
  }
];

const meta: Meta<typeof TreeView> = {
  title: "Components/TreeView",
  component: TreeView,
  tags: ["autodocs"],
  args: {
    items,
    defaultExpandedIds: ["contracts", "vendors"],
    defaultSelectedId: "vendor-a"
  },
  decorators: [Story => <div className={lightThemeClass} style={{ padding: 24, width: 360, background: "#f4f6fb" }}><Story /></div>]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
