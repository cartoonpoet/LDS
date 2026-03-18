import type { ComponentType } from "react";
import IntroductionDoc from "../content/overview/introduction.mdx";
import ColorsDoc from "../content/foundations/colors.mdx";
import TypographyDoc from "../content/foundations/typography.mdx";
import ButtonDoc from "../content/components/button.mdx";
import InputDoc from "../content/components/input.mdx";
import SelectDoc from "../content/components/select.mdx";
import AlertDoc from "../content/components/alert.mdx";
import DrawerDoc from "../content/components/drawer.mdx";
import TreeViewDoc from "../content/components/tree-view.mdx";
import TableTreeDoc from "../content/components/table-tree.mdx";
import CommentsDoc from "../content/components/comments.mdx";
import GnbDoc from "../content/components/gnb.mdx";
import LnbDoc from "../content/components/lnb.mdx";

type TocItem = {
  id: string;
  label: string;
};

export type DocPageType = "landing" | "overview" | "foundation" | "component";

export type DocEntry = {
  id: string;
  slug: string[];
  href: string;
  title: string;
  sectionId: string;
  sectionLabel: string;
  summary: string;
  navLabel?: string;
  pageType: DocPageType;
  toc: TocItem[];
  Component: ComponentType;
};

export type DocGroup = {
  id: string;
  label: string;
  description: string;
  heroTitle?: string;
  items: DocEntry[];
};

export function slugToHref(slug: string[]) {
  return slug.length === 0 ? "/" : `/${slug.join("/")}`;
}

function createDocEntry(entry: Omit<DocEntry, "href">): DocEntry {
  return {
    ...entry,
    href: slugToHref(entry.slug)
  };
}

export const docsRegistry: DocEntry[] = [
  createDocEntry({
    id: "introduction",
    slug: [],
    title: "소개",
    sectionId: "overview",
    sectionLabel: "개요",
    summary: "LDS v3가 왜 필요한지, 지금 무엇을 제공하는지 빠르게 이해할 수 있도록 정리한 시작 문서입니다.",
    navLabel: "LDS 시작점과 현재 범위",
    pageType: "landing",
    toc: [
      { id: "why-lds-matters", label: "LDS가 필요한 이유" },
      { id: "principles", label: "운영 원칙" },
      { id: "current-v3-surface", label: "현재 v3 구성" }
    ],
    Component: IntroductionDoc
  }),
  createDocEntry({
    id: "colors",
    slug: ["foundations", "colors"],
    title: "Colors",
    sectionId: "foundations",
    sectionLabel: "파운데이션",
    summary: "서비스마다 색상을 바꿔도 상태 일관성을 유지할 수 있도록, LDS 색상 토큰 구조를 설명합니다.",
    navLabel: "시맨틱 컬러 토큰 구조",
    pageType: "foundation",
    toc: [
      { id: "semantic-palette", label: "시맨틱 팔레트" },
      { id: "consumer-customization", label: "서비스별 커스터마이징" },
      { id: "usage-guidance", label: "사용 가이드" }
    ],
    Component: ColorsDoc
  }),
  createDocEntry({
    id: "typography",
    slug: ["foundations", "typography"],
    title: "Typography",
    sectionId: "foundations",
    sectionLabel: "파운데이션",
    summary: "업무형 화면에서 바로 적용할 수 있는 타입 스케일과 읽기 규칙을 정리합니다.",
    navLabel: "업무형 화면용 타입 스케일",
    pageType: "foundation",
    toc: [
      { id: "type-scale", label: "타입 스케일" },
      { id: "font-stack", label: "폰트 스택" },
      { id: "practical-rules", label: "운영 규칙" }
    ],
    Component: TypographyDoc
  }),
  createDocEntry({
    id: "button",
    slug: ["components", "button"],
    title: "Button",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "버튼을 언제, 어떻게 써야 하는지 바로 판단할 수 있도록 핵심 기준만 정리합니다.",
    navLabel: "핵심 액션 프리미티브",
    pageType: "component",
    toc: [
      { id: "overview", label: "Overview" },
      { id: "when-to-use", label: "When to use" },
      { id: "variants", label: "Variants" },
      { id: "usage-guidance", label: "Usage guidance" }
    ],
    Component: ButtonDoc
  }),
  createDocEntry({
    id: "input",
    slug: ["components", "input"],
    title: "Input",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "기본 텍스트 필드의 현재 구현 범위와 다음 확장 방향을 빠르게 확인할 수 있습니다.",
    navLabel: "필드 상태와 확장 방향",
    pageType: "component",
    toc: [
      { id: "overview", label: "Overview" },
      { id: "when-to-use", label: "When to use" },
      { id: "variants", label: "Variants" },
      { id: "usage-guidance", label: "Usage guidance" }
    ],
    Component: InputDoc
  }),
  createDocEntry({
    id: "select",
    slug: ["components", "select"],
    title: "Select",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "기본 셀렉트의 역할과 이후 드롭다운 패턴으로 확장되는 방향을 정리합니다.",
    navLabel: "선택 입력의 기본 패턴",
    pageType: "component",
    toc: [
      { id: "overview", label: "Overview" },
      { id: "when-to-use", label: "When to use" },
      { id: "variants", label: "Variants" },
      { id: "usage-guidance", label: "Usage guidance" }
    ],
    Component: SelectDoc
  }),
  createDocEntry({
    id: "alert",
    slug: ["components", "alert"],
    title: "Alert",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "상태 안내를 한 줄 또는 확장형 블록으로 빠르게 전달하는 피드백 패턴을 정리합니다.",
    navLabel: "빠른 상태 안내 패턴",
    pageType: "component",
    toc: [
      { id: "overview", label: "Overview" },
      { id: "when-to-use", label: "When to use" },
      { id: "variants", label: "Variants" },
      { id: "usage-guidance", label: "Usage guidance" }
    ],
    Component: AlertDoc
  }),
  createDocEntry({
    id: "drawer",
    slug: ["components", "drawer"],
    title: "Drawer",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "메인 컨텍스트를 유지한 채 보조 편집과 상세 정보를 여는 보조 레이어입니다.",
    navLabel: "보조 레이어 패턴",
    pageType: "component",
    toc: [
      { id: "overview", label: "개요" },
      { id: "supported-features", label: "현재 지원 범위" },
      { id: "usage-guidelines", label: "사용 가이드" }
    ],
    Component: DrawerDoc
  }),
  createDocEntry({
    id: "tree-view",
    slug: ["components", "tree-view"],
    title: "Tree View",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "계층 탐색 중심 화면을 위한 기본 트리 프리미티브입니다.",
    navLabel: "계층 탐색 프리미티브",
    pageType: "component",
    toc: [
      { id: "overview", label: "개요" },
      { id: "supported-features", label: "현재 지원 범위" },
      { id: "usage-guidelines", label: "사용 가이드" }
    ],
    Component: TreeViewDoc
  }),
  createDocEntry({
    id: "table-tree",
    slug: ["components", "table-tree"],
    title: "Table Tree",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "계층 정보와 표 컬럼을 함께 보여주는 목록형 트리 패턴입니다.",
    navLabel: "트리 + 테이블 패턴",
    pageType: "component",
    toc: [
      { id: "overview", label: "개요" },
      { id: "supported-features", label: "현재 지원 범위" },
      { id: "usage-guidelines", label: "사용 가이드" }
    ],
    Component: TableTreeDoc
  }),
  createDocEntry({
    id: "comments",
    slug: ["components", "comments"],
    title: "Comments",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "검토 이력, 협업 채팅, 하단 시트 코멘트를 하나의 패턴으로 정리한 컴포넌트입니다.",
    navLabel: "검토·협업 코멘트 패턴",
    pageType: "component",
    toc: [
      { id: "overview", label: "개요" },
      { id: "supported-features", label: "현재 지원 범위" },
      { id: "usage-guidelines", label: "사용 가이드" }
    ],
    Component: CommentsDoc
  }),
  createDocEntry({
    id: "gnb",
    slug: ["components", "gnb"],
    title: "GNB",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "앱 최상단의 글로벌 내비게이션 프리미티브입니다.",
    navLabel: "글로벌 내비게이션",
    toc: [{ id: "overview", label: "개요" }],
    pageType: "component",
    Component: GnbDoc
  }),
  createDocEntry({
    id: "lnb",
    slug: ["components", "lnb"],
    title: "LNB",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "좌측 정보 구조를 단계적으로 여는 로컬 내비게이션 프리미티브입니다.",
    navLabel: "로컬 내비게이션",
    toc: [{ id: "overview", label: "개요" }],
    pageType: "component",
    Component: LnbDoc
  })
];

export const docsGroups: DocGroup[] = [
  {
    id: "overview",
    label: "개요",
    heroTitle: "디자인 시스템을 빠르게 이해하는 시작점",
    description: "디자인 시스템의 방향성과 운영 원칙, 현재 제공 범위를 빠르게 이해합니다.",
    items: docsRegistry.filter(entry => entry.sectionId === "overview")
  },
  {
    id: "foundations",
    label: "파운데이션",
    heroTitle: "색상과 타이포그래피 같은 공통 기준",
    description: "색상, 타이포그래피처럼 전체 화면의 일관성을 만드는 기준 레이어를 다룹니다.",
    items: docsRegistry.filter(entry => entry.sectionId === "foundations")
  },
  {
    id: "components",
    label: "컴포넌트",
    heroTitle: "실제 화면에 바로 쓰는 핵심 UI 패턴",
    description: "실제 화면에 재사용되는 버튼, 입력, 선택 계열의 구현 기준을 제공합니다.",
    items: docsRegistry.filter(entry => entry.sectionId === "components")
  }
];

export function findDocBySlug(slug: string[]) {
  return docsRegistry.find(entry => entry.slug.join("/") === slug.join("/"));
}

export function getDocNeighbors(currentId: string) {
  const currentIndex = docsRegistry.findIndex(entry => entry.id === currentId);

  return {
    prev: currentIndex > 0 ? docsRegistry[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < docsRegistry.length - 1 ? docsRegistry[currentIndex + 1] : undefined
  };
}

export function getRelatedDocs(currentId: string) {
  const currentEntry = docsRegistry.find(entry => entry.id === currentId);

  if (!currentEntry) {
    return [];
  }

  return docsRegistry.filter(entry => entry.id !== currentId && entry.sectionId === currentEntry.sectionId).slice(0, 3);
}
