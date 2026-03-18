import Link from "next/link";
import type { ReactNode } from "react";
import { docsGroups, type DocEntry } from "../../lib/docs";

type DocsLandingLayoutProps = {
  children: ReactNode;
  entry: DocEntry;
};

export function DocsLandingLayout({ children, entry }: DocsLandingLayoutProps) {
  return (
    <div className="docs-content docs-content-landing">
      <section className="docs-landing-hero">
        <div className="docs-landing-copy">
          <p className="docs-kicker">{entry.sectionLabel}</p>
          <h1>LDS로 법무 제품의 기준을 더 선명하게 맞춥니다.</h1>
          <p className="docs-summary docs-landing-summary">
            디자인 토큰, foundations, components, implementation notes를 한 흐름 안에서 연결해 디자이너와 개발자가 같은
            화면 기준으로 판단할 수 있게 돕습니다.
          </p>
          <div className="docs-landing-actions">
            <Link className="docs-cta docs-cta-primary" href="/foundations/colors">
              Foundations 보기
            </Link>
            <Link className="docs-cta" href="/components/button">
              Components 보기
            </Link>
            <a className="docs-cta" href="http://localhost:6006" rel="noreferrer" target="_blank">
              Storybook
            </a>
          </div>
        </div>

        <div className="docs-landing-panel">
          <div className="docs-landing-stat">
            <span>Current focus</span>
            <strong>UI v3 foundations + core actions</strong>
          </div>
          <div className="docs-landing-stat">
            <span>Approach</span>
            <strong>문서 내용은 유지하고 shell과 탐색 경험을 재구성</strong>
          </div>
          <div className="docs-landing-stat">
            <span>Surface</span>
            <strong>Foundations / Components / Storybook</strong>
          </div>
        </div>
      </section>

      <section className="docs-section-grid" aria-label="Section entry points">
        {docsGroups.map(group => {
          const featuredItem = group.items[0];

          return (
            <article className="docs-section-card" key={group.id}>
              <div className="docs-section-card-top">
                <p className="docs-section-card-kicker">{group.label}</p>
                <h2>{group.heroTitle ?? group.label}</h2>
                <p>{group.description}</p>
              </div>
              <div className="docs-section-card-links">
                {group.items.slice(0, 4).map(item => (
                  <Link className="docs-section-card-link" href={item.href} key={item.id}>
                    <strong>{item.title}</strong>
                    <span>{item.navLabel ?? item.summary}</span>
                  </Link>
                ))}
              </div>
              {featuredItem ? (
                <Link className="docs-section-card-featured" href={featuredItem.href}>
                  바로 시작: {featuredItem.title}
                </Link>
              ) : null}
            </article>
          );
        })}
      </section>

      <section className="docs-resource-strip" aria-label="Resources">
        <div>
          <p className="docs-resource-kicker">Resources</p>
          <h2>문서와 구현 레이어를 함께 보세요.</h2>
        </div>
        <div className="docs-resource-links">
          <a href="http://localhost:6006" rel="noreferrer" target="_blank">
            Storybook
          </a>
          <Link href="/foundations/typography">Typography foundation</Link>
          <Link href="/components/input">Input status</Link>
        </div>
      </section>

      <section className="docs-landing-body">{children}</section>
    </div>
  );
}
