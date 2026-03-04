import { DocsLayout } from "../src/components/DocsLayout";
import { docsRegistry } from "../src/lib/docs";

export default function NotFoundPage() {
  const fallback = docsRegistry[0];

  return (
    <DocsLayout currentSlug={fallback.slug} entry={fallback}>
      <div className="docs-page-card">
        <p className="docs-kicker">문서 없음</p>
        <h1>요청한 문서를 찾을 수 없습니다</h1>
        <p className="docs-summary">현재 LDS 문서 트리에는 해당 페이지가 등록되어 있지 않습니다.</p>
      </div>
    </DocsLayout>
  );
}
