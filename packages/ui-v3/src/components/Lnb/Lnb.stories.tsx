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
      { id: "contracts", label: "계약", children: [{ id: "all", label: "전체 문서", active: true }, { id: "review", label: "검토 요청" }] },
      { id: "policies", label: "사규", children: [{ id: "security", label: "보안 정책" }] }
    ]
  },
  decorators: [Story => <div className={lightThemeClass} style={{ minHeight: 320 }}><Story /></div>]
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
