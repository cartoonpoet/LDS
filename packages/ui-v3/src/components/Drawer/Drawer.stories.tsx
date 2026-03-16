import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Button } from "../Button";
import { Drawer } from ".";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: {
    defaultOpen: true,
    title: "계약 상세",
    description: "보조 편집과 이력 확인을 한 패널에서 처리할 때 사용합니다.",
    children: (
      <>
        <p>문서 상태: 검토중</p>
        <p>담당자: 김연이</p>
        <p>최종 수정: 2026-03-16 14:20</p>
      </>
    ),
    footer: (
      <>
        <Button tone="neutral" variant="outline">취소</Button>
        <Button>저장</Button>
      </>
    )
  },
  decorators: [Story => <div className={lightThemeClass} style={{ minHeight: 480, background: "#e5e7eb" }}><Story /></div>]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {};
export const BottomSheet: Story = { args: { placement: "bottom" } };
