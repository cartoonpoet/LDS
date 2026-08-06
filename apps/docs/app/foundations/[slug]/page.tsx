import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FoundationsSidebar, Html, SubFooter } from "../../../src/components/site/Shell";
import { FOUNDATION_NAV, findFoundation } from "../../../src/data/foundations";
import { FOUNDATIONS_COLOR_MAIN } from "../../../src/data/page-html";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FOUNDATION_NAV.map(entry => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "color") {
    return { title: "Color", description: "LDS 색상 시스템 — 9개 팔레트와 시맨틱 컬러 역할" };
  }
  const entry = findFoundation(slug);
  return {
    title: entry ? entry.name : "Foundations",
    description: entry?.desc
  };
}

export default async function FoundationDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (slug === "color") {
    return (
      <main className="page subpage page-fade">
        <Html html={FOUNDATIONS_COLOR_MAIN} />
        <SubFooter />
      </main>
    );
  }

  const entry = findFoundation(slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="page subpage page-fade">
      <div className="doc-shell two-col">
        <FoundationsSidebar active={entry.slug} />
        <div className="doc-main">
          <div className="breadcrumb">Foundations</div>
          <h1 className="doc-title">{entry.name}</h1>
          <p className="doc-desc">{entry.desc}</p>
          <div className="color-hero">
            <span className="orbit o1" />
            <span className="orbit o2" />
            <span className="orbit o3" />
            <span className="orbit o4" />
            <span className="orbit o5" />
            <span className="strip st1" />
            <span className="strip st2" />
            <div className="fd-hero-token">{entry.token}</div>
          </div>
          <section className="doc-section">
            <h2>Overview</h2>
            <p>{entry.paras[0]}</p>
            <p>{entry.paras[1]}</p>
          </section>
          <section className="doc-section">
            <h2>{entry.showcaseTitle}</h2>
            <Html html={entry.showcaseHtml} />
          </section>
        </div>
      </div>
      <SubFooter />
    </main>
  );
}
