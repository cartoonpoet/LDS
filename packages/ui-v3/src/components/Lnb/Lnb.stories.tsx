import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Icon } from "../Icon";
import { Lnb } from ".";
import type { LnbItem } from ".";

/**
 * ## Lnb
 *
 * 업무 화면 좌측 로컬 내비게이션입니다. 로고 영역 + 1depth 메뉴(아이콘) + 2depth 하위 메뉴로 구성되고,
 * 접힘(collapsed) 모드에서는 아이콘만 남습니다. 폭은 펼침 260px / 접힘 80px입니다.
 *
 * ### Import
 * ```tsx
 * import { Lnb } from "@lawkit/ui";
 * ```
 *
 * ### 동작
 * - 현재 페이지(`value`)가 속한 1depth 메뉴가 그라데이션으로 강조됩니다.
 * - 하위 메뉴가 있는 항목은 그룹 토글 버튼이며, 한 번에 한 그룹만 펼쳐집니다.
 * - 접힘 상태에서 그룹을 누르면 LNB가 펼쳐지며 해당 그룹이 열립니다.
 * - 라우팅은 `onSelect` 또는 항목의 `href`로 서비스가 연결합니다.
 */
const meta: Meta<typeof Lnb> = {
  title: "Components/Lnb",
  component: Lnb,
  decorators: [(Story) => <div className={lightThemeClass} style={{ height: 720, background: "#f2f4f6" }}><Story /></div>],
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof Lnb>;

const Logo = () => <strong style={{ fontSize: 22, color: "#2151ec" }}>Law.ai</strong>;
const Symbol = () => <strong style={{ fontSize: 22, color: "#2151ec" }}>L</strong>;

const items: LnbItem[] = [
  {
    value: "home",
    label: "홈",
    icon: <Icon name="home" />,
    children: [
      { value: "my-status", label: "나의 현황" },
      { value: "search", label: "통합검색" },
      { value: "company", label: "회사 현황" },
      { value: "board-home", label: "게시판" },
      { value: "legal-status", label: "법무 업무 현황" },
      { value: "standard", label: "표준계약서 조회" },
      { value: "approval", label: "결재함" },
      { value: "stats", label: "통계" },
    ],
  },
  { value: "contract", label: "계약", icon: <Icon name="fileText" /> },
  { value: "advice", label: "법률자문", icon: <Icon name="law" /> },
  { value: "litigation", label: "송무", icon: <Icon name="litigation" /> },
  { value: "project", label: "법무 프로젝트", icon: <Icon name="project" /> },
  { value: "seal", label: "인감 사용 신청", icon: <Icon name="seal" /> },
  { value: "board", label: "게시판", icon: <Icon name="board" /> },
  { value: "ipr", label: "지식재산권", icon: <Icon name="iPRs" /> },
  { value: "project2", label: "프로젝트", icon: <Icon name="project2" /> },
  { value: "regulation", label: "사규", icon: <Icon name="regulation" /> },
  {
    value: "official",
    label: "공문",
    icon: <Icon name="officialDocu" />,
    children: [
      { value: "official-send", label: "발신 공문" },
      { value: "official-receive", label: "수신 공문" },
    ],
  },
  {
    value: "ai",
    label: "AI",
    icon: <Icon name="aI" />,
    children: [
      { value: "ai-review", label: "AI 계약 검토" },
      { value: "ai-chat", label: "AI 법률 상담" },
    ],
  },
  {
    value: "system",
    label: "시스템 관리",
    icon: <Icon name="settings" />,
    children: [
      { value: "system-user", label: "사용자 관리" },
      { value: "system-code", label: "코드 관리" },
    ],
  },
];

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { Lnb, Icon } from "@lawkit/ui";
import type { LnbItem } from "@lawkit/ui";

const items: LnbItem[] = [
  {
    value: "home",
    label: "홈",
    icon: <Icon name="home" />,
    children: [
      { value: "my-status", label: "나의 현황" },
      { value: "search", label: "통합검색" },
    ],
  },
  { value: "contract", label: "계약", icon: <Icon name="fileText" />, href: "/contracts" },
  { value: "litigation", label: "송무", icon: <Icon name="litigation" /> },
];

// 기본 — 현재 페이지가 속한 그룹이 자동으로 펼쳐짐
const [page, setPage] = useState("my-status");

<Lnb
  items={items}
  value={page}
  onSelect={setPage}
  logo={<img src="/logo.svg" alt="Law.ai" />}
  collapsedLogo={<img src="/symbol.svg" alt="Law.ai" />}
/>

// 접힘 상태를 앱이 관리 (PageLayout.Nav 폭과 함께)
const [collapsed, setCollapsed] = useState(false);

<Lnb items={items} value={page} onSelect={setPage} collapsed={collapsed} onCollapsedChange={setCollapsed} />`,
      },
    },
  },
  render: function TemplateStory() {
    const [page, setPage] = useState("my-status");
    return <Lnb items={items} value={page} onSelect={setPage} logo={<Logo />} collapsedLogo={<Symbol />} />;
  },
};

export const Default: Story = {
  name: "기본 (하위 메뉴 닫힘)",
  render: function DefaultStory() {
    const [page, setPage] = useState("home");
    return <Lnb items={items} value={page} onSelect={setPage} logo={<Logo />} collapsedLogo={<Symbol />} />;
  },
};

export const SubMenuOpen: Story = {
  name: "하위 메뉴 펼침",
  render: function SubMenuOpenStory() {
    const [page, setPage] = useState("my-status");
    return <Lnb items={items} value={page} onSelect={setPage} logo={<Logo />} collapsedLogo={<Symbol />} />;
  },
};

export const Collapsed: Story = {
  name: "접힘",
  render: function CollapsedStory() {
    const [page, setPage] = useState("contract");
    return (
      <Lnb
        items={items}
        value={page}
        onSelect={setPage}
        defaultCollapsed
        logo={<Logo />}
        collapsedLogo={<Symbol />}
      />
    );
  },
};
