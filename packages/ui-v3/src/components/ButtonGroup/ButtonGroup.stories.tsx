import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { ButtonGroup } from ".";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "ButtonGroup은 목록 필터나 간단한 세그먼트 전환에 쓰는 컴팩트 선택 UI입니다. 탭보다 가볍고 버튼보다 맥락을 덜 강조할 때 적합합니다."
      }
    }
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

export const Basic: Story = {
  args: {
    items: [
      { label: "전체", value: "all" },
      { label: "진행중", value: "open" },
      { label: "완료", value: "done" }
    ]
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <ButtonGroup items={[{ label: "전체", value: "all" }, { label: "내 문서", value: "mine" }]} size="sm" />
      <ButtonGroup items={[{ label: "전체", value: "all" }, { label: "내 문서", value: "mine" }]} size="md" />
      <ButtonGroup items={[{ label: "전체", value: "all" }, { label: "내 문서", value: "mine" }]} size="lg" />
    </div>
  )
};
