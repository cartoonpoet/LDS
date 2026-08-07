import type { Metadata } from "next";
import Link from "next/link";
import { ComponentsSidebar, Html, SubFooter } from "../../src/components/site/Shell";
import { COMPONENTS } from "../../src/data/components";

export const metadata: Metadata = {
  title: "Components",
  description: "LDS의 컴포넌트 54종을 둘러보세요."
};

export default function ComponentsPage() {
  return (
    <main className="page subpage page-fade">
      <div className="doc-shell two-col">
        <ComponentsSidebar />
        <div className="doc-main">
          <h1 className="doc-title">Components</h1>
          <p className="doc-desc">
            LDS의 모든 컴포넌트를 둘러보세요. 하나의 토큰 시스템 위에서 만들어져, 어떤 화면에 놓아도 같은 언어로
            이야기해요.
          </p>
          <div className="comp-grid">
            {COMPONENTS.map(entry => (
              <Link key={entry.slug} className="comp-card" href={`/components/${entry.slug}`}>
                <div className="comp-preview">
                  <Html html={entry.previewHtml} />
                </div>
                <div className="comp-name">
                  {entry.name}
                  <small>{entry.desc}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <SubFooter />
    </main>
  );
}
