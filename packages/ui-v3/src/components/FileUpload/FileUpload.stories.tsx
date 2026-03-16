import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { FileUpload } from ".";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "드래그 앤 드롭과 파일 목록 관리를 지원하는 업로드 컴포넌트입니다. 계약서, 증빙서류 등 첨부 플로우의 기본 프리미티브로 사용합니다."
      }
    }
  },
  args: {
    defaultValue: [
      { id: "1", name: "contract-v2.pdf", size: 143200 },
      { id: "2", name: "attachment.png", size: 82400 }
    ]
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: 24, background: "#f4f6fb" }}>
        <div style={{ maxWidth: 680 }}>
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleFile: Story = {
  args: {
    multiple: false,
    defaultValue: [{ id: "1", name: "signed-contract.pdf", size: 268401 }]
  }
};
