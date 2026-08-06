import type { Metadata } from "next";
import { Html, SubFooter } from "../../src/components/site/Shell";
import { DEVELOP_MAIN } from "../../src/data/page-html";

export const metadata: Metadata = {
  title: "Develop",
  description: "React 컴포넌트와 프레임워크 중립적인 토큰 패키지로 배포돼요."
};

export default function DevelopPage() {
  return (
    <main className="page subpage page-fade">
      <Html html={DEVELOP_MAIN} />
      <SubFooter />
    </main>
  );
}
