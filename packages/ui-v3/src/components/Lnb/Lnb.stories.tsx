import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Lnb } from ".";

const meta: Meta<typeof Lnb> = {
  title: "Components/Lnb",
  component: Lnb,
  tags: ["autodocs"],
  args: {
    defaultExpandedIds: ["contracts"],
    groups: [
      {
        id: "contracts",
        label: "계약",
        children: [
          { id: "all", label: "전체 문서", description: "최근 업데이트 12건", active: true, href: "#all" },
          { id: "review", label: "검토 요청", description: "대기 4건", href: "#review" }
        ]
      },
      {
        id: "policies",
        label: "사규",
        children: [{ id: "security", label: "보안 정책", description: "최종 개정 2026.03", href: "#security" }]
      }
    ]
  },
  decorators: [Story => <div className={lightThemeClass} style={{ minHeight: 320, background: "#f4f6fb" }}><Story /></div>]
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
