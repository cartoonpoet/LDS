import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodeBlock } from "../../../src/components/site/CodeBlock";
import { ComponentsSidebar, Html, SubFooter } from "../../../src/components/site/Shell";
import { COMPONENTS, findComponent } from "../../../src/data/components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return COMPONENTS.map(entry => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = findComponent(slug);
  return {
    title: entry ? entry.name : "Components",
    description: entry?.desc
  };
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = findComponent(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="page subpage page-fade">
      <div className="doc-shell two-col">
        <ComponentsSidebar active={entry.slug} />
        <div className="doc-main" id="cd-top">
          <div className="breadcrumb">Components</div>
          <h1 className="doc-title">{entry.name}</h1>
          <p className="doc-desc">{entry.desc}</p>
          <div className="live-preview">
            <Html html={entry.previewHtml} />
          </div>
          <div className="doc-tabs">
            <a className="on" href="#cd-top">
              Overview
            </a>
            <a href="#cd-usage">Usage</a>
            <a href="#cd-props">Props</a>
          </div>
          <section className="doc-section" id="cd-usage">
            <h2>Usage</h2>
            <p>{entry.name}는 LDS 토큰 위에서 동작해서 어떤 테마에서도 같은 모습을 유지해요. 접근성 속성은 기본으로 들어 있어요.</p>
            <CodeBlock code={entry.usageCode} />
          </section>
          <section className="doc-section" id="cd-props">
            <h2>Props</h2>
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                {entry.props.map(([name, type, defaultValue, description]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>
                      <code dangerouslySetInnerHTML={{ __html: type }} />
                    </td>
                    <td>
                      <code>{defaultValue}</code>
                    </td>
                    <td>{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <SubFooter />
    </main>
  );
}
