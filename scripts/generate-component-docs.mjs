// packages/ui-v3/src/components 하위 모든 *.stories.tsx 파일을 순회하며
// TemplateCode 스토리의 parameters.docs.source.code 값을 추출하고
// packages/ui-v3/CLAUDE.md 파일을 생성한다.
//
// 사용법: node scripts/generate-component-docs.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT = join(__dirname, "..");
const COMPONENTS_DIR = join(ROOT, "packages", "ui-v3", "src", "components");
const OUTPUT_FILE = join(ROOT, "packages", "ui-v3", "CLAUDE.md");

// TemplateCode 없는 파일 skip 목록 (컴포넌트명 기준)
const SKIP_COMPONENTS = new Set(["Icon", "QuickMenu", "RadioButtonGroup"]);

// 디렉토리를 재귀 순회하여 *.stories.tsx 파일 목록 반환
const findStoriesFiles = (dir) => {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findStoriesFiles(fullPath));
    } else if (entry.endsWith(".stories.tsx")) {
      results.push(fullPath);
    }
  }
  return results;
};

// stories.tsx 파일에서 TemplateCode의 parameters.docs.source.code 백틱 리터럴 추출
// 반환값: 추출된 코드 문자열 또는 null
const extractTemplateCode = (filePath) => {
  const content = readFileSync(filePath, "utf-8");

  // export const TemplateCode 블록이 있는지 확인
  const templateCodeIndex = content.indexOf("export const TemplateCode");
  if (templateCodeIndex === -1) {
    return null;
  }

  // TemplateCode 블록 이후 텍스트에서 code: ` ... ` 패턴 추출
  const afterTemplateCode = content.slice(templateCodeIndex);

  // code\s*:\s*`([\s\S]*?)` 패턴으로 백틱 리터럴 추출
  const codeMatch = afterTemplateCode.match(/code\s*:\s*`([\s\S]*?)`\s*[,\n]/);
  if (!codeMatch) {
    return null;
  }

  return codeMatch[1];
};

// 파일 경로에서 컴포넌트명 추출
// 예: .../components/Button/Button.stories.tsx → "Button"
//     .../components/Theming.stories.tsx → null (루트 파일, skip)
const extractComponentName = (filePath) => {
  const rel = relative(COMPONENTS_DIR, filePath);
  const parts = rel.split(sep);

  // Theming.stories.tsx처럼 components/ 바로 하위 루트 파일은 skip
  if (parts.length === 1) {
    return null;
  }

  // 폴더명을 컴포넌트명으로 사용 (예: Button/Button.stories.tsx → "Button")
  return parts[0];
};

// 모든 stories 파일 탐색
const allStoriesFiles = findStoriesFiles(COMPONENTS_DIR);

// 컴포넌트별 TemplateCode 추출
const components = [];

for (const filePath of allStoriesFiles) {
  const componentName = extractComponentName(filePath);

  // 루트 파일(Theming 등) skip
  if (!componentName) continue;

  // skip 목록 컴포넌트 제외
  if (SKIP_COMPONENTS.has(componentName)) continue;

  const templateCode = extractTemplateCode(filePath);

  // TemplateCode 없는 경우 skip
  if (!templateCode) continue;

  components.push({ name: componentName, code: templateCode });
}

// 알파벳 순 정렬
components.sort((a, b) => a.name.localeCompare(b.name));

// CLAUDE.md 내용 생성
const lines = [
  "# @lawkit/ui 컴포넌트 레퍼런스",
  "",
  "이 파일은 자동 생성됩니다. `pnpm --filter @lawkit/ui docs` 로 재생성하세요.",
  "",
  "@lawkit/ui 컴포넌트 사용 시 아래 템플릿 코드를 참고하세요.",
  '모든 컴포넌트는 `import { ComponentName } from "@lawkit/ui"` 로 사용합니다.',
  "",
  "---",
  "",
];

for (const { name, code } of components) {
  lines.push(`## ${name}`, "");
  lines.push("```tsx");
  lines.push(code.trimEnd());
  lines.push("```");
  lines.push("");
}

writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf-8");
console.log(
  `Generated ${components.length} components → packages/ui-v3/CLAUDE.md`,
);
