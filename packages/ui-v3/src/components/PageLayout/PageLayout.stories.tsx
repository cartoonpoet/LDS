import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Avatar } from "../Avatar";
import { Gnb } from "../Gnb";
import { Icon } from "../Icon";
import { Input } from "../Input";
import { Lnb } from "../Lnb";
import type { LnbItem } from "../Lnb";
import { PageLayout } from ".";

/**
 * ## PageLayout
 *
 * GNB + LNB + 콘텐츠 골격을 슬롯으로 제공하는 페이지 셸입니다.
 * grid-template-areas 기반이라 슬롯을 생략하면 해당 영역이 0으로 접힙니다.
 * Header에는 `Gnb`, Nav에는 `Lnb`를 올립니다. `headerSpan="content"`면 LNB가 화면 높이 전체를 차지하고
 * GNB는 본문 위에만 놓입니다(Law.ai 데스크톱 레이아웃).
 *
 * ### Import
 * ```tsx
 * import { PageLayout } from "@lawkit/ui";
 * ```
 *
 * ### Root Props
 * | Prop | Default | Description |
 * |------|---------|-------------|
 * | `headerSpan` | `"full"` | `full`: Header 상단 전폭 / `content`: Nav 옆 (Nav가 화면 높이 전체) |
 *
 * ### Slots
 * | Slot | Element | Props | Description |
 * |------|---------|-------|-------------|
 * | `PageLayout.Header` | `<header>` | - | GNB 영역 (상단 전폭) |
 * | `PageLayout.Nav` | `<nav>` | `width=240`, `collapsed`, `collapsedWidth=64` | LNB 영역 |
 * | `PageLayout.Content` | `<main>` | - | 본문 (스크롤 영역) |
 * | `PageLayout.Panel` | `<aside>` | `width=320` | 보조 패널 (선택) |
 */
const meta: Meta<typeof PageLayout> = {
  title: "Components/PageLayout",
  component: PageLayout,
  /* 스토리별 높이는 parameters.frameHeight로 지정 (기본 480) */
  decorators: [
    (Story, { parameters }) => (
      <div className={lightThemeClass} style={{ height: parameters.frameHeight ?? 480 }}><Story /></div>
    ),
  ],
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof PageLayout>;

const demoBox = { padding: 16, fontSize: 13, color: "#626f86" } as const;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { PageLayout } from "@lawkit/ui";

// 기본 — Header + Nav + Content
<PageLayout>
  <PageLayout.Header>{/* GNB: 로고·전역 메뉴·프로필 */}</PageLayout.Header>
  <PageLayout.Nav>{/* LNB: 메뉴 트리 */}</PageLayout.Nav>
  <PageLayout.Content>
    <Container size="lg">{/* 페이지 본문 */}</Container>
  </PageLayout.Content>
</PageLayout>

// 보조 패널 + LNB 접힘 (상태는 앱이 관리)
const [collapsed, setCollapsed] = useState(false);

<PageLayout>
  <PageLayout.Header>{/* GNB */}</PageLayout.Header>
  <PageLayout.Nav collapsed={collapsed}>{/* LNB */}</PageLayout.Nav>
  <PageLayout.Content>{/* 본문 */}</PageLayout.Content>
  <PageLayout.Panel width={360}>{/* 사건 상세 미리보기 */}</PageLayout.Panel>
</PageLayout>

// Law.ai 데스크톱 — LNB 화면 높이 전체 + GNB는 본문 위 (LNB 폭 260/80)
// gnbStart · gnbEnd 구성은 Gnb 템플릿 참고
<PageLayout headerSpan="content">
  <PageLayout.Header><Gnb start={gnbStart} end={gnbEnd} /></PageLayout.Header>
  <PageLayout.Nav width={260} collapsed={collapsed} collapsedWidth={80}>
    <Lnb items={items} value={page} onSelect={setPage} collapsed={collapsed} onCollapsedChange={setCollapsed} />
  </PageLayout.Nav>
  <PageLayout.Content>{/* 본문 */}</PageLayout.Content>
</PageLayout>`,
      },
    },
  },
  render: () => (
    <PageLayout style={{ height: "100%" }}>
      <PageLayout.Header><div style={demoBox}>GNB</div></PageLayout.Header>
      <PageLayout.Nav><div style={demoBox}>LNB</div></PageLayout.Nav>
      <PageLayout.Content><div style={demoBox}>Content</div></PageLayout.Content>
      <PageLayout.Panel><div style={demoBox}>Panel</div></PageLayout.Panel>
    </PageLayout>
  ),
};

export const HeaderNavContent: Story = {
  name: "기본 (Header + Nav + Content)",
  render: () => (
    <PageLayout style={{ height: "100%" }}>
      <PageLayout.Header><div style={demoBox}>GNB — 로고 · 전역 메뉴 · 프로필</div></PageLayout.Header>
      <PageLayout.Nav><div style={demoBox}>LNB 메뉴</div></PageLayout.Nav>
      <PageLayout.Content><div style={demoBox}>페이지 본문 — 내부는 Container·Grid·Stack으로 조립</div></PageLayout.Content>
    </PageLayout>
  ),
};

export const CollapsibleNav: Story = {
  name: "LNB 접기/펼치기",
  render: function CollapsibleNavStory() {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <PageLayout style={{ height: "100%" }}>
        <PageLayout.Header>
          <div style={{ ...demoBox, display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => setCollapsed((c) => !c)}>{collapsed ? "펼치기" : "접기"}</button>
            <span>GNB</span>
          </div>
        </PageLayout.Header>
        <PageLayout.Nav collapsed={collapsed}>
          <div style={demoBox}>{collapsed ? "☰" : "LNB 메뉴"}</div>
        </PageLayout.Nav>
        <PageLayout.Content><div style={demoBox}>본문</div></PageLayout.Content>
      </PageLayout>
    );
  },
};

/* ─── Law.ai 레이아웃 (Figma: Foundations / Layout) ─── */

const lnbItems: LnbItem[] = [
  {
    value: "home",
    label: "홈",
    icon: <Icon name="home" />,
    children: [
      { value: "my-status", label: "나의 현황" },
      { value: "search", label: "통합검색" },
      { value: "approval", label: "결재함" },
    ],
  },
  { value: "contract", label: "계약", icon: <Icon name="fileText" /> },
  { value: "advice", label: "법률자문", icon: <Icon name="law" /> },
  { value: "litigation", label: "송무", icon: <Icon name="litigation" /> },
  { value: "seal", label: "인감 사용 신청", icon: <Icon name="seal" /> },
  { value: "board", label: "게시판", icon: <Icon name="board" /> },
  { value: "regulation", label: "사규", icon: <Icon name="regulation" /> },
  {
    value: "system",
    label: "시스템 관리",
    icon: <Icon name="settings" />,
    children: [{ value: "system-user", label: "사용자 관리" }],
  },
];

const logo = <strong style={{ fontSize: 22, color: "#2151ec" }}>Law.ai</strong>;
const symbol = <strong style={{ fontSize: 22, color: "#2151ec" }}>L</strong>;

const desktopGnb = (
  <Gnb
    start={
      <>
        <Gnb.IconButton icon={<Icon name="helpCircle" />} label="도움말" />
        <Gnb.IconButton icon={<Icon name="calendar" />} label="일정" />
        <Gnb.Divider />
        <div style={{ width: 400, maxWidth: "100%" }}>
          <Input placeholder="검색어를 입력해 주세요" leftIcon={<Icon name="search" size="sm" />} />
        </div>
      </>
    }
    end={
      <>
        <Gnb.IconButton icon={<Icon name="settings" />} label="설정" />
        <Gnb.Profile name="이법무 변호사님" description="휴맥스홀딩스" avatar={<Avatar system />} />
      </>
    }
  />
);

function DesktopShell({ defaultCollapsed = false, panel = false }: { defaultCollapsed?: boolean; panel?: boolean }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [page, setPage] = useState("my-status");
  return (
    <PageLayout headerSpan="content" style={{ height: "100%" }}>
      <PageLayout.Header>{desktopGnb}</PageLayout.Header>
      <PageLayout.Nav width={260} collapsed={collapsed} collapsedWidth={80}>
        <Lnb
          items={lnbItems}
          value={page}
          onSelect={setPage}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          logo={logo}
          collapsedLogo={symbol}
        />
      </PageLayout.Nav>
      <PageLayout.Content><div style={demoBox}>본문 — {page}</div></PageLayout.Content>
      {panel && <PageLayout.Panel><div style={demoBox}>사건 상세 미리보기</div></PageLayout.Panel>}
    </PageLayout>
  );
}

export const LawaiExpanded: Story = {
  name: "Law.ai · LNB 펼침",
  parameters: { frameHeight: 960 },
  render: () => <DesktopShell />,
};

export const LawaiCollapsed: Story = {
  name: "Law.ai · LNB 접힘",
  parameters: { frameHeight: 960 },
  render: () => <DesktopShell defaultCollapsed />,
};

export const LawaiWithPanel: Story = {
  name: "Law.ai · Panel 포함",
  parameters: { frameHeight: 960 },
  render: () => <DesktopShell panel />,
};

export const LawaiMobile: Story = {
  name: "Law.ai · Mobile",
  parameters: { frameHeight: 720 },
  decorators: [(Story) => <div style={{ width: 360, height: "100%" }}><Story /></div>],
  render: () => (
    <PageLayout style={{ height: "100%" }}>
      <PageLayout.Header>
        <Gnb
          start={<Gnb.IconButton icon={<Icon name="menu" />} label="메뉴 열기" />}
          end={
            <>
              <Gnb.IconButton icon={<Icon name="search" />} label="검색" />
              <Gnb.IconButton icon={<Icon name="settings" />} label="설정" />
              <Gnb.Profile compact name="이법무 변호사님" avatar={<Avatar system status="online" />} />
            </>
          }
        />
      </PageLayout.Header>
      <PageLayout.Content><div style={demoBox}>본문</div></PageLayout.Content>
    </PageLayout>
  ),
};
