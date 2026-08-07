import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * AI 에이전트용 시스템 레퍼런스 라우트 (seed-design의 /llms.txt 패턴).
 * packages/ui-v3/CLAUDE.md(자동 생성 컴포넌트 레퍼런스)를 빌드 시점에 읽어 서빙한다.
 */
export const dynamic = "force-static";

const HEADER = `# LDS — Legal Design System

법무 제품을 위한 디자인 시스템. 컴포넌트, 인터랙션, 스타일을 하나의 기준으로 정의합니다.

## 설치

\`\`\`bash
pnpm add @lds/ui-v3 @lds/tokens
\`\`\`

## 테마 적용

\`\`\`tsx
import { lightThemeClass, createLdsThemeVars } from "@lds/tokens";

// 기본 테마
<div className={lightThemeClass}>...</div>

// 브랜드 컬러 오버라이드
const brandTheme = createLdsThemeVars({
  color: { accentPrimary: "#16a34a", accentPrimaryHover: "#15803d", accentPrimaryActive: "#166534" },
});
<div className={lightThemeClass} style={brandTheme}>...</div>
\`\`\`

## 링크

- 문서: https://lds-docs.vercel.app
- Storybook: https://lds-storybook.vercel.app
- GitHub: https://github.com/cartoonpoet/LDS

---

아래는 전체 컴포넌트 레퍼런스(자동 생성)입니다.

`;

export function GET() {
  const reference = readFileSync(
    join(process.cwd(), "..", "..", "packages", "ui-v3", "CLAUDE.md"),
    "utf8"
  );
  return new Response(HEADER + reference, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
