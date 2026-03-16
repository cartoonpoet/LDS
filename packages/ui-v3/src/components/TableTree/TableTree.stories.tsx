import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { TableTree } from ".";

const meta: Meta<typeof TableTree> = {
  title: "Components/TableTree",
  component: TableTree,
  tags: ["autodocs"],
  args: {
    columns: [
      { key: "name", label: "문서 분류" },
      { key: "owner", label: "담당 부서" },
      { key: "count", label: "건수" }
    ],
    defaultExpandedIds: ["contracts", "vendors"],
    items: [
      {
        id: "contracts",
        cells: ["계약 문서", "법무팀", "12건"],
        children: [
          { id: "nda", cells: ["NDA", "법무팀", "4건"] },
          { id: "msa", cells: ["MSA", "사업개발", "3건"] },
          {
            id: "vendors",
            cells: ["협력사", "구매팀", "5건"],
            children: [
              { id: "vendor-a", cells: ["A사", "구매팀", "2건"] },
              { id: "vendor-b", cells: ["B사", "구매팀", "3건"] }
            ]
          }
        ]
      },
      { id: "policies", cells: ["사규 / 정책", "인사팀", "8건"] }
    ]
  },
  decorators: [Story => <div className={lightThemeClass} style={{ padding: 24, background: "#f4f6fb" }}><Story /></div>]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
