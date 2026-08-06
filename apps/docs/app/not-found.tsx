import Link from "next/link";
import { SubFooter } from "../src/components/site/Shell";

export default function NotFoundPage() {
  return (
    <main className="page subpage page-fade">
      <div className="doc-shell two-col" style={{ gridTemplateColumns: "1fr" }}>
        <div className="doc-main">
          <div className="breadcrumb">404</div>
          <h1 className="doc-title">페이지를 찾을 수 없어요</h1>
          <p className="doc-desc">주소가 바뀌었거나 아직 준비 중인 페이지예요. 홈에서 다시 시작해 보세요.</p>
          <div className="next-cards">
            <Link className="next-card" href="/">
              <b>홈으로 →</b>
              <span>LDS 브랜드 필름과 라이브 컴포넌트 데모를 만나보세요.</span>
            </Link>
            <Link className="next-card" href="/components">
              <b>Components 보기 →</b>
              <span>48개 컴포넌트를 갤러리에서 한눈에 둘러봐요.</span>
            </Link>
          </div>
        </div>
      </div>
      <SubFooter />
    </main>
  );
}
