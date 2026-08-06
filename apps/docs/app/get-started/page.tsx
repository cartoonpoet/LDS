import type { Metadata } from "next";
import { Html, SubFooter } from "../../src/components/site/Shell";
import { GET_STARTED_MAIN } from "../../src/data/page-html";

export const metadata: Metadata = {
  title: "Get Started",
  description: "설치하고 감싸기만 하면 어느 화면이든 같은 언어로 이야기하기 시작해요."
};

export default function GetStartedPage() {
  return (
    <main className="page subpage page-fade">
      <Html html={GET_STARTED_MAIN} />
      <SubFooter />
    </main>
  );
}
