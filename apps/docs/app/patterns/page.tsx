import type { Metadata } from "next";
import { Html, SubFooter } from "../../src/components/site/Shell";
import { PATTERNS } from "../../src/data/patterns";

export const metadata: Metadata = {
  title: "Patterns",
  description: "법무 제품에서 반복되는 화면 구조를 패턴으로 정리했어요."
};

export default function PatternsPage() {
  return (
    <main className="page subpage page-fade">
      <div className="doc-shell two-col">
        <aside className="sidebar">
          <div className="sidebar-sticky">
            <h5>Patterns</h5>
            <a href="#pt-grid" className="active">
              Overview
            </a>
            {PATTERNS.map(entry => (
              <a key={entry.slug} href="#pt-grid">
                {entry.name}
              </a>
            ))}
          </div>
        </aside>
        <div className="doc-main">
          <h1 className="doc-title">Patterns</h1>
          <p className="doc-desc">
            법무 제품에서 반복되는 화면 구조를 패턴으로 정리했어요. 같은 문제는 같은 방식으로 풀어야 사용자가 배우지
            않고도 화면을 이해해요.
          </p>
          <div className="pattern-grid" id="pt-grid">
            {PATTERNS.map(entry => (
              <div key={entry.slug} className="pattern-card">
                <div className="pat-diagram">
                  <Html html={entry.diagramHtml} />
                </div>
                <div className="pat-body">
                  <h3>{entry.name}</h3>
                  <p>{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SubFooter />
    </main>
  );
}
