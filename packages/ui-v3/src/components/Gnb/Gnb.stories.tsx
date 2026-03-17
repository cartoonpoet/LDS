import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Button } from "../Button";
import { Gnb } from ".";

const meta: Meta<typeof Gnb> = {
  title: "Components/Gnb",
  component: Gnb,
  tags: ["autodocs"],
  args: {
    brand: "LDS Legal",
    defaultActiveId: "contracts",
    items: [
      { id: "contracts", label: "계약" },
      { id: "approvals", label: "결재" },
      { id: "policies", label: "사규" }
    ],
    actions: <Button size="sm">새 문서</Button>
  },
  decorators: [Story => <div className={lightThemeClass}><Story /></div>]
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
