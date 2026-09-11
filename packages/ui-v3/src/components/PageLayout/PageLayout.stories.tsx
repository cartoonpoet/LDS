import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { PageLayout } from ".";

/**
 * ## PageLayout
 *
 * GNB + LNB + 콘텐츠 골격을 슬롯으로 제공하는 페이지 셸입니다.
 * grid-template-areas 기반이라 슬롯을 생략하면 해당 영역이 0으로 접힙니다.
 * GNB/LNB의 내용물은 각 서비스가 채웁니다(패턴 가이드 참조).
 *
 * ### Import
 * ```tsx
 * import { PageLayout } from "@lds/ui-v3";
 * ```
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
  decorators: [(Story) => <div className={lightThemeClass} style={{ height: 480 }}><Story /></div>],
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
        code: `import { PageLayout } from "@lds/ui-v3";

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
