import Link from "next/link";
import type { DocEntry } from "../../lib/docs";

type DocsPageHeaderProps = {
  entry: DocEntry;
  variant?: "section" | "detail";
};

const variantMeta = {
  section: {
    eyebrow: "Section",
    label: "섹션 문서",
    description: "현재 섹션에서 알아야 할 기준과 시작점을 먼저 정리합니다."
  },
  detail: {
    eyebrow: "Detail",
    label: "상세 문서",
    description: "실무 적용 전에 구현 범위와 관련 리소스를 빠르게 확인할 수 있도록 구성했습니다."
  }
} as const;

const componentQuickDecision: Record<string, { useFor: string; checkFirst: string }> = {
  button: {
    useFor: "핵심 CTA와 보조 액션의 우선순위를 빠르게 나눌 때",
    checkFirst: "variant 강조 차이와 같은 그룹 안의 액션 개수"
  },
  input: {
    useFor: "자유 입력과 상태 피드백을 같은 흐름에서 읽혀야 할 때",
    checkFirst: "label / helper / validation 리듬과 adornment 밀도"
  },
  select: {
    useFor: "허용된 옵션 중 하나를 안정적으로 고르게 할 때",
    checkFirst: "옵션 수, searchable 필요 여부, invalid 상태 표현"
  },
  alert: {
    useFor: "현재 화면 맥락을 끊지 않고 상태 변화나 경고를 알려야 할 때",
    checkFirst: "default vs expanded 레이아웃과 액션 수"
  }
};

export function DocsPageHeader({ entry, variant = "detail" }: DocsPageHeaderProps) {
  const meta = variantMeta[variant];
  const quickDecision = entry.pageType === "component" ? componentQuickDecision[entry.id] : undefined;

  return (
    <header className="docs-page-header" data-variant={variant}>
      <div className="docs-page-header-top">
        <div>
          <p className="docs-kicker">{entry.sectionLabel}</p>
          <h1>{entry.title}</h1>
        </div>
        <div className="docs-page-type-card">
          <span className="docs-page-type-eyebrow">{meta.eyebrow}</span>
          <strong>{meta.label}</strong>
          <p>{meta.description}</p>
        </div>
      </div>

      <p className="docs-summary">{entry.summary}</p>

      {quickDecision ? (
        <div className="docs-header-decision-strip">
          <div className="docs-header-decision-card">
            <span>Use for</span>
            <strong>{quickDecision.useFor}</strong>
          </div>
          <div className="docs-header-decision-card">
            <span>Check first</span>
            <strong>{quickDecision.checkFirst}</strong>
          </div>
        </div>
      ) : null}

      <div className="docs-header-meta-row">
        <span className="docs-meta-pill">{entry.sectionLabel}</span>
        {entry.pageType === "component" ? <span className="docs-meta-pill">UI v3 component</span> : null}
        {entry.pageType === "foundation" ? <span className="docs-meta-pill">Foundation token</span> : null}
        <a className="docs-meta-pill docs-meta-pill-link" href="http://localhost:6006" rel="noreferrer" target="_blank">
          Storybook
        </a>
        <Link className="docs-meta-pill docs-meta-pill-link" href="/">
          Landing
        </Link>
      </div>
    </header>
  );
}
