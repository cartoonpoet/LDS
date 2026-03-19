import Link from "next/link";
import type { ReactNode } from "react";
import { docsGroups, type DocEntry } from "../../lib/docs";

type DocsLandingLayoutProps = {
  children: ReactNode;
  entry: DocEntry;
};

const storybookUrl = "http://localhost:6006";

const operatingPrinciples = [
  "토큰 → foundations → components → 문서 흐름을 한 제품 경험처럼 연결합니다.",
  "높은 정보 밀도의 법무 화면 안에서도 읽는 순서와 상태 판단을 빠르게 만듭니다.",
  "디자인 기준과 구현 기준을 분리하지 않고 같은 저장소에서 함께 진화시킵니다."
];

const heroHighlights = [
  "Montage처럼 큰 구조를 먼저 보여주고, 세부 문서는 그 다음에 읽게 합니다.",
  "LDS 시그니처 블루와 토큰 레이어를 중심으로 조용하지만 선명한 긴장감을 유지합니다.",
  "Storybook, foundations, components를 같은 제품 진입 수준에서 연결합니다."
];

export function DocsLandingLayout({ children, entry }: DocsLandingLayoutProps) {
  const allDocs = docsGroups.flatMap(group => group.items);
  const foundations = docsGroups.find(group => group.id === "foundations")?.items ?? [];
  const components = docsGroups.find(group => group.id === "components")?.items ?? [];
  const overview = docsGroups.find(group => group.id === "overview")?.items ?? [];
  const storybookFocus = components.slice(0, 4);
  const featuredSections = docsGroups.map(group => ({
    ...group,
    featuredItem: group.items[0],
    secondaryItems: group.items.slice(1, 4)
  }));

  return (
    <div className="docs-content docs-content-landing">
      <section className="docs-landing-hero">
        <div className="docs-landing-hero-copy">
          <div className="docs-landing-hero-meta">
            <p className="docs-kicker">{entry.sectionLabel}</p>
            <span className="docs-landing-eyebrow-pill">Legal design system for dense operational products</span>
          </div>

          <div className="docs-landing-hero-heading">
            <span className="docs-landing-hero-lead">LDS Documentation</span>
            <h1>법무 제품 팀이 바로 판단하고 바로 구현할 수 있는 문서 첫 화면으로 다시 다듬었습니다.</h1>
            <p className="docs-summary docs-landing-summary">
              랜딩 hero, section entry, CTA, spacing, typography hierarchy를 제품형 문서 경험에 맞게 재정렬했습니다. 첫 화면에서
              시스템의 범위를 이해하고, foundations와 components, Storybook까지 자연스럽게 이어집니다.
            </p>
          </div>

          <div className="docs-landing-actions docs-landing-actions-primary">
            <Link className="docs-cta docs-cta-primary" href="/foundations/colors">
              Foundations부터 시작
            </Link>
            <Link className="docs-cta docs-cta-strong" href="/components/button">
              핵심 컴포넌트 보기
            </Link>
            <a className="docs-cta docs-cta-subtle" href={storybookUrl} rel="noreferrer" target="_blank">
              Storybook 열기
            </a>
          </div>

          <div className="docs-landing-hero-proof" aria-label="Landing proof points">
            {heroHighlights.map(highlight => (
              <article className="docs-hero-proof-chip" key={highlight}>
                <span />
                <p>{highlight}</p>
              </article>
            ))}
          </div>

          <div className="docs-landing-signal-grid" aria-label="Landing signals">
            <article className="docs-signal-card docs-signal-card-emphasis">
              <span>Docs surface</span>
              <strong>{allDocs.length}개의 문서 진입점</strong>
              <p>개요, foundations, components를 제품 onboarding 흐름처럼 다시 묶었습니다.</p>
            </article>
            <article className="docs-signal-card">
              <span>Foundation layer</span>
              <strong>{foundations.length}개 기준 문서</strong>
              <p>컬러와 타이포그래피를 먼저 고정해 화면 판단 기준을 빠르게 맞춥니다.</p>
            </article>
            <article className="docs-signal-card">
              <span>Component layer</span>
              <strong>{components.length}개 핵심 패턴</strong>
              <p>액션, 입력, 탐색 패턴을 문서와 구현 관점에서 바로 이어서 확인할 수 있습니다.</p>
            </article>
          </div>
        </div>

        <div className="docs-landing-hero-stack">
          <article className="docs-hero-spotlight-card">
            <div className="docs-hero-spotlight-top">
              <p className="docs-kicker">Current focus</p>
              <span className="docs-landing-status-pill">UI v3 in progress</span>
            </div>
            <h2>문서도 하나의 제품 표면처럼 다뤄, 기준·검증·다음 액션이 한 화면 안에서 이어지게 했습니다.</h2>
            <div className="docs-hero-spotlight-metrics">
              <div>
                <span>Structure</span>
                <strong>Overview → Foundation → Component로 읽는 순서를 명확히 정렬</strong>
              </div>
              <div>
                <span>CTA system</span>
                <strong>Docs / Storybook / Featured resources를 같은 무게의 진입점으로 재배치</strong>
              </div>
              <div>
                <span>Visual rhythm</span>
                <strong>더 넓은 여백, 단정한 카드 계층, 조용한 강조색으로 Montage 감성을 LDS 톤으로 번역</strong>
              </div>
            </div>
          </article>

          <article className="docs-hero-route-card">
            <div className="docs-hero-route-head">
              <p className="docs-kicker">Recommended route</p>
              <h2>처음 보는 팀도 3단계면 시스템 흐름을 이해합니다.</h2>
            </div>
            <ol className="docs-hero-route-list">
              <li>
                <span>01</span>
                <div>
                  <strong>{overview[0]?.title ?? "소개"}</strong>
                  <p>{overview[0]?.summary ?? "LDS의 목적과 범위를 빠르게 파악합니다."}</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>{foundations[0]?.title ?? "Foundations"}</strong>
                  <p>공통 토큰과 읽기 규칙을 먼저 확인해 화면 기준을 맞춥니다.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>{components[0]?.title ?? "Components"}</strong>
                  <p>실제 UI 패턴과 구현 문서를 이어서 검토하고 바로 검증합니다.</p>
                </div>
              </li>
            </ol>
          </article>

          <article className="docs-hero-rail-card">
            <div className="docs-hero-rail-copy">
              <p className="docs-kicker">Signature tone</p>
              <h2>LDS 블루와 토큰 구조를 문서 레벨에서도 자연스럽게 드러냈습니다.</h2>
              <p>
                과하게 장식하지 않고, 브랜드 컬러는 구조를 설명하는 곳에만 집중적으로 배치했습니다. 그래서 첫 인상은 강하지만 읽기 경험은
                여전히 차분합니다.
              </p>
            </div>
            <div className="docs-hero-rail-swatches" aria-hidden="true">
              <span className="docs-hero-swatch docs-hero-swatch-primary" />
              <span className="docs-hero-swatch docs-hero-swatch-secondary" />
              <span className="docs-hero-swatch docs-hero-swatch-muted" />
            </div>
          </article>
        </div>
      </section>

      <section className="docs-section-grid docs-section-grid-featured" aria-label="Section entry points">
        {featuredSections.map(group => (
          <article className="docs-section-card docs-section-card-featured" key={group.id}>
            <div className="docs-section-card-top">
              <div className="docs-section-card-heading">
                <p className="docs-section-card-kicker">{group.label}</p>
                <h2>{group.heroTitle ?? group.label}</h2>
              </div>
              <p>{group.description}</p>
            </div>

            {group.featuredItem ? (
              <Link className="docs-section-card-primary-link" href={group.featuredItem.href}>
                <div>
                  <span className="docs-section-card-label">Start here</span>
                  <strong>{group.featuredItem.title}</strong>
                </div>
                <p>{group.featuredItem.summary}</p>
              </Link>
            ) : null}

            <div className="docs-section-card-links">
              {group.secondaryItems.map(item => (
                <Link className="docs-section-card-link" href={item.href} key={item.id}>
                  <strong>{item.title}</strong>
                  <span>{item.navLabel ?? item.summary}</span>
                </Link>
              ))}
            </div>

            <div className="docs-section-card-footer">
              <span>{group.items.length} docs included</span>
              <Link className="docs-section-card-footer-link" href={group.featuredItem?.href ?? "/"}>
                섹션 진입
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="docs-product-entry-grid" aria-label="Product entry points">
        <article className="docs-product-entry-card docs-product-entry-card-storybook">
          <div className="docs-product-entry-copy">
            <p className="docs-resource-kicker">Product entry</p>
            <h2>Storybook을 보조 링크가 아니라, 구현 상태를 바로 검증하는 핵심 진입으로 끌어올렸습니다.</h2>
            <p>
              문서를 읽은 직후 실제 컴포넌트 상태를 확인하고, variant와 행동을 빠르게 교차 검증할 수 있도록 메인 흐름 안에 배치했습니다.
            </p>
          </div>
          <div className="docs-product-entry-actions">
            <a className="docs-cta docs-cta-primary" href={storybookUrl} rel="noreferrer" target="_blank">
              Storybook에서 검증하기
            </a>
            <div className="docs-inline-chip-row">
              {storybookFocus.map(item => (
                <Link className="docs-inline-chip" href={item.href} key={item.id}>
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </article>

        <article className="docs-product-entry-card docs-product-entry-card-resource">
          <div className="docs-product-entry-copy">
            <p className="docs-resource-kicker">Resources</p>
            <h2>바로 참고할 기준 문서를 한 번 더 정제해 product shelf처럼 묶었습니다.</h2>
            <p>처음 들어온 팀원이 길을 잃지 않도록, 실제로 가장 먼저 열게 되는 문서를 짧은 설명과 함께 노출했습니다.</p>
          </div>
          <div className="docs-resource-shelf">
            <Link className="docs-resource-shelf-card" href="/foundations/typography">
              <span>Foundation</span>
              <strong>Typography guide</strong>
              <p>업무형 화면에 맞는 타입 스케일과 읽기 규칙</p>
            </Link>
            <Link className="docs-resource-shelf-card" href="/foundations/colors">
              <span>Foundation</span>
              <strong>Semantic colors</strong>
              <p>서비스별 커스터마이징에도 유지되는 시맨틱 색상 구조</p>
            </Link>
            <Link className="docs-resource-shelf-card" href="/components/input">
              <span>Component</span>
              <strong>Input status</strong>
              <p>폼 필드 상태와 확장 방향을 빠르게 점검하는 기준 문서</p>
            </Link>
          </div>
        </article>
      </section>

      <section className="docs-landing-principles" aria-label="Operating principles">
        <div className="docs-landing-principles-copy">
          <p className="docs-kicker">System principles</p>
          <h2>읽는 문서가 아니라, 팀의 판단 속도를 높이는 운영 레이어를 목표로 합니다.</h2>
        </div>
        <div className="docs-landing-principles-list">
          {operatingPrinciples.map(principle => (
            <article className="docs-principle-card" key={principle}>
              <span>•</span>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="docs-landing-body">{children}</section>
    </div>
  );
}
