import type { Metadata } from "next";
import Link from "next/link";
import { SubFooter } from "../../src/components/site/Shell";
import { RELEASES } from "../../src/data/updates";

export const metadata: Metadata = {
  title: "Updates",
  description: "LDS의 성장 기록이에요. 모든 릴리즈는 테스트와 접근성 게이트를 통과한 뒤에 나와요."
};

export default function UpdatesPage() {
  return (
    <main className="page subpage page-fade">
      <div className="doc-shell two-col">
        <aside className="sidebar">
          <div className="sidebar-sticky">
            <h5>Updates</h5>
            <a className="active" href="#top">
              Changelog
            </a>
            <h5>More</h5>
            <Link href="/develop">Develop</Link>
            <Link href="/components">Components</Link>
          </div>
        </aside>
        <div className="doc-main" id="top">
          <div className="breadcrumb">Updates</div>
          <h1 className="doc-title">Changelog</h1>
          <p className="doc-desc">LDS의 성장 기록이에요. 모든 릴리즈는 테스트와 접근성 게이트를 통과한 뒤에 나와요.</p>
          {RELEASES.map(release => (
            <div key={release.version} className="release">
              <div className="release-head">
                <span className={`ver-pill${release.latest ? "" : " minor"}`}>{release.version}</span>
                <span className="release-date">{release.date}</span>
                <span className="release-tag">{release.tag}</span>
              </div>
              <ul>
                {release.items.map(item => (
                  <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <SubFooter />
    </main>
  );
}
