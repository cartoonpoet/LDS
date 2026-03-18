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

export function DocsPageHeader({ entry, variant = "detail" }: DocsPageHeaderProps) {
  const meta = variantMeta[variant];

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
