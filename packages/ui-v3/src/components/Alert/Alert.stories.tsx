import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from ".";
import { lightThemeClass } from "@lds/tokens";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    type: "info",
    children: "중요! 이것은 기본 알림입니다. 확인해주세요!",
    closable: true,
  },
};

export const Confirm: Story = {
  args: {
    type: "confirm",
    children: "의견 검토 중 (검토자 : 김팀장 / 검토상태 : 확인 중)",
    closable: true,
  },
};

export const Secret: Story = {
  args: {
    type: "secret",
    children: "비밀 문서입니다. 열람 권한을 확인하세요.",
    closable: true,
  },
};

export const SaveTemporarily: Story = {
  args: {
    type: "saveTemporarily",
    children: "임시 저장된 문서가 있습니다.",
    closable: true,
  },
};

export const Expanded: Story = {
  args: {
    type: "info",
    title: "알림 제목",
    children: "이것은 확장된 알림입니다. 제목과 본문이 분리됩니다.",
    closable: true,
  },
};

export const Small: Story = {
  args: {
    type: "info",
    size: "small",
    children: "작은 사이즈 알림입니다.",
    closable: true,
  },
};

export const WithTextButton: Story = {
  args: {
    type: "info",
    children: "중요! 이것은 기본 알림입니다. 확인해주세요!",
    textButton: { label: "자세히 보기", onClick: () => alert("clicked") },
  },
};

export const WithActionButtons: Story = {
  args: {
    type: "confirm",
    title: "의견 검토 중",
    children: "의견 검토 중 (검토자 : 강팀장, 권팀장, 김팀장, 문팀장, 박팀장)",
    actions: [
      { label: "승인", intent: "primary", onClick: () => alert("승인") },
      { label: "반려", intent: "warning", onClick: () => alert("반려") },
    ],
  },
};

export const NoDismiss: Story = {
  args: {
    type: "info",
    children: "닫기 버튼이 없는 알림입니다.",
    closable: false,
  },
};
