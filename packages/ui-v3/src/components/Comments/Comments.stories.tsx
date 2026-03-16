import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Comments } from ".";

const sampleItems = [
  {
    id: "1",
    author: "김연이",
    timestamp: "방금 전",
    meta: "검토 요청",
    tone: "accent" as const,
    body: "2조 3항 문구를 최신 양식 기준으로 정리해 두었습니다. 계약 상대방 확인 후 바로 확정 가능합니다.",
    attachments: ["계약서_v2.docx"]
  },
  {
    id: "2",
    author: "준법지원팀",
    timestamp: "12분 전",
    meta: "시스템",
    tone: "muted" as const,
    body: "첨부 문서 1건이 자동 보안 스캔을 통과했습니다."
  },
  {
    id: "3",
    author: "박검토",
    timestamp: "18분 전",
    meta: "담당자",
    mine: true,
    body: "좋습니다. 손해배상 상한만 확인되면 오늘 안에 회신하겠습니다."
  }
];

const meta: Meta<typeof Comments> = {
  title: "Patterns/Comments",
  component: Comments,
  tags: ["autodocs"],
  args: {
    title: "Comments",
    description: "주석, 협업 피드백, 진행 이력을 같은 구조 안에서 다루는 코멘트 패턴입니다.",
    items: sampleItems
  },
  decorators: [Story => <div className={lightThemeClass} style={{ padding: 24, background: "#f3f4f6", minHeight: 600 }}><Story /></div>]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Timeline: Story = {
  args: {
    variant: "timeline",
    title: "검토 이력"
  }
};

export const Chat: Story = {
  args: {
    variant: "chat",
    title: "실시간 협업 채널"
  }
};

export const BottomSheet: Story = {
  args: {
    variant: "bottom-sheet",
    title: "모바일 코멘트 시트",
    description: "문서 하단에서 열리는 코멘트 흐름을 가정한 변형입니다."
  }
};
