import type { Metadata } from "next";
import { Html, SubFooter } from "../../src/components/site/Shell";
import { FOUNDATIONS_HUB_MAIN } from "../../src/data/page-html";

export const metadata: Metadata = {
  title: "Foundations",
  description: "색부터 그림자까지, 모든 화면이 딛고 서는 공통의 기반이에요."
};

export default function FoundationsHubPage() {
  return (
    <main className="page subpage page-fade">
      <Html html={FOUNDATIONS_HUB_MAIN} />
      <SubFooter />
    </main>
  );
}
