import type { ComponentType } from "react";
import IntroductionDoc from "../content/overview/introduction.mdx";
import ColorsDoc from "../content/foundations/colors.mdx";
import TypographyDoc from "../content/foundations/typography.mdx";
import ButtonDoc from "../content/components/button.mdx";
import InputDoc from "../content/components/input.mdx";
import SelectDoc from "../content/components/select.mdx";

type TocItem = {
  id: string;
  label: string;
};

export type DocEntry = {
  id: string;
  slug: string[];
  title: string;
  sectionId: string;
  sectionLabel: string;
  summary: string;
  toc: TocItem[];
  Component: ComponentType;
};

type DocGroup = {
  id: string;
  label: string;
  items: DocEntry[];
};

export const docsRegistry: DocEntry[] = [
  {
    id: "introduction",
    slug: [],
    title: "소개",
    sectionId: "overview",
    sectionLabel: "개요",
    summary: "LDS v3가 왜 필요한지, 지금 무엇을 제공하는지 빠르게 이해할 수 있도록 정리한 시작 문서입니다.",
    toc: [
      { id: "why-lds-matters", label: "LDS가 필요한 이유" },
      { id: "principles", label: "운영 원칙" },
      { id: "current-v3-surface", label: "현재 v3 구성" }
    ],
    Component: IntroductionDoc
  },
  {
    id: "colors",
    slug: ["foundations", "colors"],
    title: "Colors",
    sectionId: "foundations",
    sectionLabel: "파운데이션",
    summary: "서비스마다 색상을 바꿔도 상태 일관성을 유지할 수 있도록, LDS 색상 토큰 구조를 설명합니다.",
    toc: [
      { id: "semantic-palette", label: "시맨틱 팔레트" },
      { id: "consumer-customization", label: "서비스별 커스터마이징" },
      { id: "usage-guidance", label: "사용 가이드" }
    ],
    Component: ColorsDoc
  },
  {
    id: "typography",
    slug: ["foundations", "typography"],
    title: "Typography",
    sectionId: "foundations",
    sectionLabel: "파운데이션",
    summary: "업무형 화면에서 바로 적용할 수 있는 타입 스케일과 읽기 규칙을 정리합니다.",
    toc: [
      { id: "type-scale", label: "타입 스케일" },
      { id: "font-stack", label: "폰트 스택" },
      { id: "practical-rules", label: "운영 규칙" }
    ],
    Component: TypographyDoc
  },
  {
    id: "button",
    slug: ["components", "button"],
    title: "Button",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "버튼을 언제, 어떻게 써야 하는지 바로 판단할 수 있도록 핵심 기준만 정리합니다.",
    toc: [
      { id: "overview", label: "개요" },
      { id: "props-in-use", label: "주요 props" },
      { id: "guidelines", label: "사용 가이드" }
    ],
    Component: ButtonDoc
  },
  {
    id: "input",
    slug: ["components", "input"],
    title: "Input",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "기본 텍스트 필드의 현재 구현 범위와 다음 확장 방향을 빠르게 확인할 수 있습니다.",
    toc: [
      { id: "overview", label: "개요" },
      { id: "current-status", label: "현재 상태" },
      { id: "planned-enhancements", label: "예정된 확장" }
    ],
    Component: InputDoc
  },
  {
    id: "select",
    slug: ["components", "select"],
    title: "Select",
    sectionId: "components",
    sectionLabel: "컴포넌트",
    summary: "기본 셀렉트의 역할과 이후 드롭다운 패턴으로 확장되는 방향을 정리합니다.",
    toc: [
      { id: "overview", label: "개요" },
      { id: "intended-evolution", label: "확장 방향" },
      { id: "integration-notes", label: "적용 메모" }
    ],
    Component: SelectDoc
  }
];

export const docsGroups: DocGroup[] = [
  {
    id: "overview",
    label: "개요",
    items: docsRegistry.filter(entry => entry.sectionId === "overview")
  },
  {
    id: "foundations",
    label: "파운데이션",
    items: docsRegistry.filter(entry => entry.sectionId === "foundations")
  },
  {
    id: "components",
    label: "컴포넌트",
    items: docsRegistry.filter(entry => entry.sectionId === "components")
  }
];

export function findDocBySlug(slug: string[]) {
  return docsRegistry.find(entry => entry.slug.join("/") === slug.join("/"));
}
