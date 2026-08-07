import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Html, PatternsSidebar, SubFooter } from "../../../src/components/site/Shell";
import { PATTERNS, findPattern } from "../../../src/data/patterns";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PATTERNS.map(entry => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = findPattern(slug);
  return {
    title: entry ? `${entry.name} 패턴` : "Patterns",
    description: entry?.desc
  };
}

export default async function PatternDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = findPattern(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="page subpage page-fade">
      <div className="doc-shell two-col">
        <PatternsSidebar active={entry.slug} />
        <div className="doc-main">
          <div className="breadcrumb">Patterns</div>
          <h1 className="doc-title">{entry.name}</h1>
          <p className="doc-desc">{entry.desc}</p>
          {entry.diagramHtml && (
            <div
              className="pat-diagram"
              style={{ marginTop: 28, border: "1px solid var(--border)", borderRadius: 16 }}
            >
              <Html html={entry.diagramHtml} />
            </div>
          )}
          {entry.sections.map(section => (
            <section key={section.id} className="doc-section" id={section.id}>
              <h2>{section.title}</h2>
              {section.paras?.map(para => <p key={para}>{para}</p>)}
              {section.items && (
                <ul>
                  {section.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          {entry.componentSlug && (
            <section className="doc-section" id="component">
              <h2>구현 컴포넌트</h2>
              <p>
                이 패턴은 <a href={`/components/${entry.componentSlug}`}>{entry.name} 컴포넌트 문서</a>에서 실제
                Props와 템플릿 코드를 확인할 수 있어요.
              </p>
            </section>
          )}
        </div>
      </div>
      <SubFooter />
    </main>
  );
}
