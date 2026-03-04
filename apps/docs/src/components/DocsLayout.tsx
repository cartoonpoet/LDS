import Link from "next/link";
import type { ReactNode } from "react";
import { docsGroups, type DocEntry } from "../lib/docs";

type DocsLayoutProps = {
  children: ReactNode;
  currentSlug: string[];
  entry: DocEntry;
};

function slugToHref(slug: string[]) {
  return slug.length === 0 ? "/" : `/${slug.join("/")}`;
}

export function DocsLayout({ children, currentSlug, entry }: DocsLayoutProps) {
  const currentPath = slugToHref(currentSlug);
  const currentSection = docsGroups.find(group => group.id === entry.sectionId);

  return (
    <div className="docs-shell">
      <aside className="docs-sidebar">
        <div className="docs-brand">
          <div className="docs-brand-row">
            <span className="docs-badge">v3</span>
            <span className="docs-brand-caption">React 18</span>
          </div>
          <h1>Law Design System</h1>
          <p>법무 서비스 전반에서 일관된 UI와 구현 기준을 제공하는 LDS 문서 사이트입니다.</p>
        </div>
        <nav>
          {docsGroups.map(group => (
            <section className="docs-nav-group" key={group.id}>
              <h2 className="docs-nav-title">{group.label}</h2>
              <div className="docs-nav-list">
                {group.items.map(item => {
                  const href = slugToHref(item.slug);
                  const isActive = currentPath === href;

                  return (
                    <Link className="docs-nav-link" data-active={isActive} href={href} key={item.id}>
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>
      </aside>
      <main className="docs-main">
        <div className="docs-content">
          <div className="docs-topbar">
            <div>
              <p className="docs-topbar-label">문서</p>
              <p className="docs-topbar-path">
                {currentSection?.label} / {entry.title}
              </p>
            </div>
            <a className="docs-topbar-link" href="http://localhost:6006" rel="noreferrer" target="_blank">
              스토리북 열기
            </a>
          </div>
          <div className="docs-page-card">
            <p className="docs-kicker">{entry.sectionLabel}</p>
            <h1>{entry.title}</h1>
            <p className="docs-summary">{entry.summary}</p>
            {children}
          </div>
        </div>
      </main>
      <aside className="docs-right-rail">
        <div className="docs-toc-card">
          <h2 className="docs-toc-title">이 페이지에서</h2>
          <div className="docs-toc-list">
            {entry.toc.map(item => (
              <a className="docs-toc-link" href={`#${item.id}`} key={item.id}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
