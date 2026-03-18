import type { DocEntry } from "../../lib/docs";

type DocsTocProps = {
  entry: DocEntry;
  isLanding: boolean;
};

export function DocsToc({ entry, isLanding }: DocsTocProps) {
  if (isLanding || entry.toc.length === 0) {
    return <aside className="docs-right-rail docs-right-rail-empty" aria-hidden="true" />;
  }

  return (
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
  );
}
