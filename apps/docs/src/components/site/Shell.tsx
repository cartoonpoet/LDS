import Link from "next/link";
import { COMPONENT_LIST } from "../../data/component-list";
import { FOUNDATION_NAV } from "../../data/foundations";
import { PATTERNS } from "../../data/patterns";

/** 시안에서 추출한 검증된 정적 마크업을 레이아웃 영향 없이 렌더링 */
export const Html = ({ html }: { html: string }) => (
  <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
);

export const SubFooter = () => (
  <div className="sub-footer">
    <div className="sub-footer-inner">
      <span>
        <b>LDS</b> · Legal Design System
      </span>
      <span>© 2026 LDS</span>
    </div>
  </div>
);

export const ComponentsSidebar = ({ active }: { active?: string }) => (
  <aside className="sidebar">
    <div className="sidebar-sticky">
      <h5>Components</h5>
      <Link href="/components" className={active ? undefined : "active"}>
        Overview
      </Link>
      {COMPONENT_LIST.map(entry => (
        <Link
          key={entry.slug}
          href={`/components/${entry.slug}`}
          className={active === entry.slug ? "active" : undefined}
        >
          {entry.name}
        </Link>
      ))}
    </div>
  </aside>
);

export const PatternsSidebar = ({ active }: { active?: string }) => (
  <aside className="sidebar">
    <div className="sidebar-sticky">
      <h5>Patterns</h5>
      <Link href="/patterns" className={active ? undefined : "active"}>
        Overview
      </Link>
      {PATTERNS.map(entry => (
        <Link
          key={entry.slug}
          href={`/patterns/${entry.slug}`}
          className={active === entry.slug ? "active" : undefined}
        >
          {entry.name}
        </Link>
      ))}
    </div>
  </aside>
);

export const FoundationsSidebar = ({ active }: { active?: string }) => (
  <aside className="sidebar">
    <div className="sidebar-sticky">
      <h5>Foundations</h5>
      <Link href="/foundations" className={active ? undefined : "active"}>
        Overview
      </Link>
      {FOUNDATION_NAV.map(entry => (
        <Link
          key={entry.slug}
          href={entry.slug === "color" ? "/foundations/color" : `/foundations/${entry.slug}`}
          className={active === entry.slug ? "active" : undefined}
        >
          {entry.name}
        </Link>
      ))}
    </div>
  </aside>
);
