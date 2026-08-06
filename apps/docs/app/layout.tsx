import type { Metadata } from "next";
import type { ReactNode } from "react";
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
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
