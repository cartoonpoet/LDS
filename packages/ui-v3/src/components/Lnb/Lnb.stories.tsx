import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Lnb } from ".";

const groups = [
  {
    id: "home",
    label: "홈",
    icon: "⌂",
    children: [
      { id: "dashboard", label: "나의 현황", active: true, href: "#dashboard" },
      { id: "search", label: "통합검색", href: "#search" }
    ]
  },
  {
    id: "contracts",
    label: "계약 검토",
    icon: "🗎",
    children: [
      { id: "all", label: "전체 문서", description: "최근 업데이트 12건", href: "#all" },
      { id: "review", label: "검토 요청", description: "대기 4건", href: "#review" }
    ]
  },
  {
    id: "projects",
    label: "법무 프로젝트",
    icon: "◫",
    children: [{ id: "policy", label: "정책 관리", description: "최종 개정 2026.03", href: "#policy" }]
  },
  {
    id: "board",
    label: "게시판",
    icon: "☰",
    children: [{ id: "notice", label: "공지", href: "#notice" }]
  }
];

const meta: Meta<typeof Lnb> = {
  title: "Components/Lnb",
  component: Lnb,
  tags: ["autodocs"],
  args: {
    defaultExpandedIds: ["home", "contracts"],
    groups
  },
  decorators: [Story => <div className={lightThemeClass} style={{ minHeight: 640, padding: 24, background: "#f4f6fb" }}><Story /></div>]
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Expanded: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
