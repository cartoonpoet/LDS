import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CodeEnhancer } from "../src/components/site/CodeEnhancer";
import { SiteNav } from "../src/components/site/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LDS — Legal Design System",
    template: "%s — LDS"
  },
  description: "법무 제품의 뿌리가 되는 디자인 시스템. 컴포넌트, 인터랙션, 스타일을 하나의 기준으로 정의해요.",
  metadataBase: new URL("https://lds-docs.local"),
  openGraph: {
    title: "LDS — Legal Design System",
    description: "법무 제품의 뿌리가 되는 디자인 시스템"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* JS 실행 여부 마커 — 리빌 숨김(.reveal)은 html.js에서만 적용해, 청크 로드 실패 등
            클라이언트 JS가 죽어도 콘텐츠가 통째로 숨지 않게 한다.
            테마 결정도 페인트 전에 실행해 FOUC를 막는다: localStorage("lds-theme") 우선, 없으면 OS 설정 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");try{var t=localStorage.getItem("lds-theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}`
          }}
        />
      </head>
      <body>
        <SiteNav />
        {children}
        <CodeEnhancer />
      </body>
    </html>
  );
}
