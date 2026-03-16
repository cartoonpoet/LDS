import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { ESignForm } from ".";

const meta: Meta<typeof ESignForm> = {
  title: "Components/ESignForm",
  component: ESignForm,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "전자서명 요청/동의 입력을 위한 폼 컴포넌트입니다. 필수 입력 필드, 동의 체크, 참여자 서명 상태를 함께 보여줍니다."
      }
    }
  },
  args: {
    title: "전자서명 요청",
    description: "계약 당사자 정보를 확인한 뒤 전자서명을 진행해 주세요.",
    fields: [
      { id: "company", label: "회사명", required: true, placeholder: "예: OpenClaw" },
      { id: "signer", label: "서명자명", required: true, placeholder: "예: 김준호" }
    ],
    participants: [
      { id: "1", name: "김준호", role: "요청자", status: "signed", signedAt: "2026-03-16 09:32" },
      { id: "2", name: "이연이", role: "검토자", status: "pending" }
    ]
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: 24, background: "#f4f6fb" }}>
        <div style={{ maxWidth: 720 }}>
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
