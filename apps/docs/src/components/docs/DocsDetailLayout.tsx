import Link from "next/link";
import type { ReactNode } from "react";
import { getDocNeighbors, getRelatedDocs, type DocEntry } from "../../lib/docs";
import { DocsPageHeader } from "./DocsPageHeader";

type DocsDetailLayoutProps = {
  children: ReactNode;
  entry: DocEntry;
};

export function DocsDetailLayout({ children, entry }: DocsDetailLayoutProps) {
  const { prev, next } = getDocNeighbors(entry.id);
  const relatedDocs = getRelatedDocs(entry.id);
  const variant = entry.sectionId === "overview" ? "section" : "detail";

  return (
    <div className="docs-content docs-content-detail">
      <div className="docs-topbar">
        <div className="docs-breadcrumbs" aria-label="Breadcrumb">
          <span className="docs-topbar-label">LDS</span>
          <span className="docs-topbar-separator">/</span>
          <span className="docs-topbar-path">{entry.sectionLabel}</span>
          <span className="docs-topbar-separator">/</span>
          <span className="docs-topbar-current">{entry.title}</span>
        </div>
        <a className="docs-topbar-link" href="http://localhost:6006" rel="noreferrer" target="_blank">
          Storybook
        </a>
      </div>

      <DocsPageHeader entry={entry} variant={variant} />

      <div className="docs-page-body">{children}</div>

      {relatedDocs.length > 0 ? (
        <section className="docs-related-section" aria-label="Related docs">
          <div className="docs-related-section-header">
            <p className="docs-kicker">Related</p>
            <h2>같이 보면 좋은 문서</h2>
          </div>
          <div className="docs-related-grid">
            {relatedDocs.map(doc => (
              <Link className="docs-related-card" href={doc.href} key={doc.id}>
                <span className="docs-related-kicker">{doc.sectionLabel}</span>
                <strong>{doc.title}</strong>
                <p>{doc.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <nav className="docs-pager" aria-label="Page navigation">
        {prev ? (
          <Link className="docs-pager-link" href={prev.href}>
            <span className="docs-pager-label">Previous</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link className="docs-pager-link docs-pager-link-next" href={next.href}>
            <span className="docs-pager-label">Next</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
