import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Button } from "../Button";
import { Viewer, ViewerStatusBadge } from ".";

const meta: Meta<typeof Viewer> = {
  title: "Components/Viewer",
  component: Viewer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "문서/첨부/PDF 미리보기를 위한 LDS Viewer 셸입니다. 상단 툴바와 본문 영역을 분리해 읽기 화면을 일관되게 구성합니다."
      }
    }
  },
  args: {
    title: "서비스 이용약관 개정안",
    description: "문서 버전 1.2 · 최종 수정 2026-03-16",
    metadata: <ViewerStatusBadge>검토중</ViewerStatusBadge>,
    actions: <Button size="sm" variant="outline">다운로드</Button>,
    toolbarEnd: <Button size="sm">다음 문서</Button>,
    children: (
      <div style={{ display: "grid", gap: 16 }}>
        <h2 style={{ margin: 0 }}>제1조 목적</h2>
        <p style={{ margin: 0, lineHeight: 1.7 }}>이 약관은 회사가 제공하는 서비스의 이용조건과 절차, 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
        <p style={{ margin: 0, lineHeight: 1.7 }}>법무 시스템의 문서 뷰어 영역에서는 본문, 코멘트, 결재 맥락을 함께 보여줄 수 있도록 단순한 셸 구조를 제공합니다.</p>
      </div>
    )
  },
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ padding: 24, background: "#eef2f8" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DocumentPage: Story = {};

export const EmbeddedContent: Story = {
  args: {
    mode: "embed",
    children: <iframe style={{ border: 0, width: "100%", minHeight: 420, background: "white" }} title="viewer-demo" />
  }
};
