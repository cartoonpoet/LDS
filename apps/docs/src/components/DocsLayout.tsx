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
            <span className="docs-badge">LDS</span>
            <span className="docs-brand-caption">Legal Design System</span>
          </div>
          <h1>Law Design System</h1>
          <p>법무 시스템 전반에 일관된 화면 경험과 구현 기준을 제공하는 공개 문서입니다.</p>
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
                      <span className="docs-nav-link-label">{item.title}</span>
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
            <div className="docs-breadcrumbs" aria-label="Breadcrumb">
              <span className="docs-topbar-label">LDS</span>
              <span className="docs-topbar-separator">/</span>
              <span className="docs-topbar-path">{currentSection?.label}</span>
              <span className="docs-topbar-separator">/</span>
              <span className="docs-topbar-current">{entry.title}</span>
            </div>
            <a className="docs-topbar-link" href="http://localhost:6006" rel="noreferrer" target="_blank">
              Storybook
            </a>
          </div>
          <header className="docs-page-header">
            <p className="docs-kicker">{entry.sectionLabel}</p>
            <h1>{entry.title}</h1>
            <p className="docs-summary">{entry.summary}</p>
          </header>
          <div className="docs-page-body">{children}</div>
        </div>
      </main>
      <aside className="docs-right-rail">
        <div className="docs-toc-card">
          <h2 className="docs-toc-title">On this page</h2>
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
