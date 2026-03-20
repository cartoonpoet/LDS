import Link from "next/link";
import { docsGroups, type DocEntry } from "../../lib/docs";

type DocsSidebarProps = {
  currentPath: string;
  entry: DocEntry;
};

function isSectionActive(sectionId: string, currentSectionId: string) {
  return sectionId === currentSectionId;
}

export function DocsSidebar({ currentPath, entry }: DocsSidebarProps) {
  return (
    <aside className="docs-sidebar">
      <div className="docs-brand">
        <div className="docs-brand-row">
          <span className="docs-badge">LDS</span>
          <span className="docs-brand-caption">Legal Design System</span>
        </div>
        <h1>Law Design System</h1>
        <p>법무 제품의 정보 밀도와 검토 흐름을 버티는 foundations, components, docs 기준을 함께 관리합니다.</p>
      </div>

      <div className="docs-sidebar-shortcuts" aria-label="Quick links">
        <a className="docs-sidebar-shortcut docs-sidebar-shortcut-primary" href="http://localhost:6006" rel="noreferrer" target="_blank">
          Storybook 열기
        </a>
        <Link className="docs-sidebar-shortcut" href="/">
          시작 화면
        </Link>
      </div>

      <nav className="docs-nav" aria-label="Docs navigation">
        {docsGroups.map(group => {
          const sectionActive = isSectionActive(group.id, entry.sectionId);

          return (
            <section className="docs-nav-group" data-active={sectionActive} key={group.id}>
              <div className="docs-nav-group-header">
                <p className="docs-nav-title">{group.label}</p>
                <p className="docs-nav-description">{group.description}</p>
              </div>
              <div className="docs-nav-list">
                {group.items.map(item => {
                  const href = item.href;
                  const isActive = currentPath === href;

                  return (
                    <Link className="docs-nav-link" data-active={isActive} href={href} key={item.id}>
                      <span className="docs-nav-link-label">{item.title}</span>
                      <span className="docs-nav-link-summary">{item.navLabel ?? item.summary}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
