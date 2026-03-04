import { notFound } from "next/navigation";
import { docsRegistry, findDocBySlug } from "../../src/lib/docs";
import { DocsLayout } from "../../src/components/DocsLayout";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  return docsRegistry.map(entry => ({
    slug: entry.slug.length === 0 ? [] : entry.slug
  }));
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = findDocBySlug(slug ?? []);

  if (!entry) {
    notFound();
  }

  return (
    <DocsLayout currentSlug={entry.slug} entry={entry}>
      <entry.Component />
    </DocsLayout>
  );
}

