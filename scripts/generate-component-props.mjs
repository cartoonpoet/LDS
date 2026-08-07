// packages/ui-v3/src/components/*/index.tsx 의 실제 export된 ~Props 타입에서
// 문서 사이트(apps/docs)의 Props 표 데이터를 추출해
// apps/docs/src/data/component-props.generated.ts 를 생성한다.
//
// 사용법: node scripts/generate-component-props.mjs  (루트: pnpm docs:props)
//
// ※ scripts/generate-component-docs.mjs 와의 관계:
//   - generate-component-docs.mjs  → *.stories.tsx 의 TemplateCode를 모아
//     packages/ui-v3/CLAUDE.md (AI용 사용 예제 레퍼런스)를 생성
//   - generate-component-props.mjs → 소스의 Props 타입 선언 자체를 파싱해
//     문서 사이트 Props 표 데이터를 생성 (이 파일)
//   두 스크립트는 서로 독립적이며, 컴포넌트 API 변경 시 둘 다 재실행한다.
//
// 추출 규칙:
//   - 각 컴포넌트 폴더의 index.tsx(없으면 stories/css/test 제외 형제 .ts/.tsx)에서
//     `${폴더명}Props` (일부는 PRIMARY_OVERRIDES 매핑) 선언을 찾는다.
//   - HTMLAttributes 등 DOM 상속 멤버는 제외 — 리터럴로 선언된 고유 멤버만.
//     (interface 본문 멤버 / 교차 타입의 TypeLiteral 멤버)
//   - 같은 파일의 리터럴 유니온 alias(예: ButtonVariant)는 `"a" | "b"` 로 전개.
//   - default 값은 구현 함수의 디스트럭처링 초기값에서 추출.
//   - description은 멤버 JSDoc 첫 줄.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const COMPONENTS_DIR = join(ROOT, "packages", "ui-v3", "src", "components");
const OUTPUT_FILE = join(ROOT, "apps", "docs", "src", "data", "component-props.generated.ts");

// 폴더명과 대표 Props 타입명이 다른 경우의 매핑
const PRIMARY_OVERRIDES = {
  FileUpload: "FileUploadAreaProps",
  Progress: "ProgressBarProps",
  QuickMenu: "QuickMenuItemProps",
  Stack: "HStackProps",
};

/* ─── 소스 파일 수집 ─── */

const componentDirs = readdirSync(COMPONENTS_DIR).filter((entry) =>
  statSync(join(COMPONENTS_DIR, entry)).isDirectory(),
);

const sourceFilesOf = (dir) => {
  const files = readdirSync(dir).filter(
    (f) =>
      (f.endsWith(".ts") || f.endsWith(".tsx")) &&
      !f.endsWith(".stories.tsx") &&
      !f.endsWith(".css.ts") &&
      !f.includes(".test."),
  );
  // index.tsx 우선 탐색
  files.sort((a, b) => (a.startsWith("index.") ? -1 : 0) - (b.startsWith("index.") ? -1 : 0));
  return files.map((f) => join(dir, f));
};

const parseFile = (filePath) =>
  ts.createSourceFile(filePath, readFileSync(filePath, "utf-8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

/* ─── 타입 표시 문자열 ─── */

// 같은 파일 내 `type X = "a" | "b"` 형태(리터럴 유니온) alias 수집
const collectLiteralUnionAliases = (sourceFile) => {
  const aliases = new Map();
  for (const stmt of sourceFile.statements) {
    if (!ts.isTypeAliasDeclaration(stmt)) continue;
    const text = unionText(stmt.type, sourceFile);
    if (text) aliases.set(stmt.name.text, text);
  }
  return aliases;
};

// UnionType이 전부 리터럴/단순 키워드일 때만 전개 텍스트 반환, 아니면 null
const unionText = (typeNode, sourceFile) => {
  if (!ts.isUnionTypeNode(typeNode)) return null;
  const parts = [];
  for (const t of typeNode.types) {
    if (ts.isLiteralTypeNode(t) || t.kind === ts.SyntaxKind.NumberKeyword || t.kind === ts.SyntaxKind.StringKeyword) {
      parts.push(t.getText(sourceFile));
    } else {
      return null;
    }
  }
  return parts.join(" | ");
};

// 멀티라인 선언을 한 줄 표시용으로 정리 (개행/트레일링 콤마 정돈)
const cleanTypeText = (text) =>
  text.replace(/\s+/g, " ").replace(/\(\s+/g, "(").replace(/,\s*\)/g, ")").trim();

const displayType = (typeNode, sourceFile, aliases) => {
  if (!typeNode) return "unknown";
  // 로컬 리터럴 유니온 alias는 전개 (예: ButtonVariant → "default" | "outline")
  if (ts.isTypeReferenceNode(typeNode) && !typeNode.typeArguments && ts.isIdentifier(typeNode.typeName)) {
    const expanded = aliases.get(typeNode.typeName.text);
    if (expanded) return expanded;
  }
  // 그 외는 선언 텍스트 그대로 (공백 정리)
  return cleanTypeText(typeNode.getText(sourceFile));
};

/* ─── JSDoc description ─── */

const jsDocDescription = (member) => {
  const jsDocs = member.jsDoc;
  if (!jsDocs || jsDocs.length === 0) return undefined;
  const last = jsDocs[jsDocs.length - 1];
  const comment = last.comment;
  let text = typeof comment === "string" ? comment : comment?.map((c) => c.text ?? "").join("");
  if (!text) {
    // "@tanstack/react-table ..." 처럼 @로 시작해 태그로 파싱되는 설명 → 원문에서 복원
    text = last
      .getText()
      .replace(/^\/\*\*|\*\/$/g, "")
      .replace(/^\s*\*\s?/gm, "");
  }
  if (!text.trim()) return undefined;
  return text.replace(/\s+/g, " ").trim();
};

/* ─── Props 선언 탐색 ─── */

// 타입 노드에서 "리터럴로 작성된" 멤버만 재귀 수집 (상속/참조 타입 멤버 제외)
// TypeLiteral / IntersectionType / PropsWithChildren<...> 래핑을 처리한다.
const literalMembersOfTypeNode = (typeNode) => {
  if (ts.isTypeLiteralNode(typeNode)) return [...typeNode.members];
  if (ts.isIntersectionTypeNode(typeNode)) {
    return typeNode.types.flatMap((t) => literalMembersOfTypeNode(t) ?? []);
  }
  if (
    ts.isTypeReferenceNode(typeNode) &&
    ts.isIdentifier(typeNode.typeName) &&
    typeNode.typeName.text === "PropsWithChildren" &&
    typeNode.typeArguments?.length === 1
  ) {
    return literalMembersOfTypeNode(typeNode.typeArguments[0]);
  }
  return null;
};

const literalMembersOf = (decl) => {
  if (ts.isInterfaceDeclaration(decl)) return [...decl.members];
  if (ts.isTypeAliasDeclaration(decl)) {
    const members = literalMembersOfTypeNode(decl.type);
    if (members && members.length > 0) return members;
    // `type VStackProps = HStackProps` 같은 단순 alias → 참조 선언을 호출부에서 재탐색
  }
  return null;
};

const findDeclaration = (sourceFile, typeName) => {
  for (const stmt of sourceFile.statements) {
    if ((ts.isInterfaceDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt)) && stmt.name.text === typeName) {
      return stmt;
    }
  }
  return null;
};

/* ─── 디스트럭처링 기본값 추출 ─── */

// 파일 내 모든 ObjectBindingPattern 파라미터를 모아, Props 멤버명과 가장 많이
// 겹치는 패턴에서 초기값을 읽는다. (forwardRef 내부의 무주석 파라미터도 커버)
const collectDefaults = (sourceFile, memberNames) => {
  const patterns = [];
  const visit = (node) => {
    if (
      (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
      node.parameters.length > 0
    ) {
      const first = node.parameters[0];
      if (ts.isObjectBindingPattern(first.name)) patterns.push(first.name);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  let best = null;
  let bestScore = 0;
  for (const pattern of patterns) {
    const names = pattern.elements
      .filter((el) => ts.isBindingElement(el) && el.name && ts.isIdentifier(el.name))
      .map((el) => (el.propertyName && ts.isIdentifier(el.propertyName) ? el.propertyName.text : el.name.text));
    const score = names.filter((n) => memberNames.has(n)).length;
    if (score > bestScore) {
      bestScore = score;
      best = pattern;
    }
  }
  const defaults = new Map();
  if (!best || bestScore < 1) return defaults;
  for (const el of best.elements) {
    if (!ts.isBindingElement(el) || !el.initializer) continue;
    const key = el.propertyName && ts.isIdentifier(el.propertyName) ? el.propertyName.text : ts.isIdentifier(el.name) ? el.name.text : null;
    if (key && memberNames.has(key)) {
      defaults.set(key, el.initializer.getText(sourceFile).replace(/\s+/g, " ").trim());
    }
  }
  return defaults;
};

/* ─── 컴포넌트별 추출 ─── */

const extractComponent = (folderName) => {
  const dir = join(COMPONENTS_DIR, folderName);
  const typeName = PRIMARY_OVERRIDES[folderName] ?? `${folderName}Props`;

  for (const filePath of sourceFilesOf(dir)) {
    const sourceFile = parseFile(filePath);
    let decl = findDeclaration(sourceFile, typeName);
    if (!decl) continue;

    // `type XProps = YProps` 단순 alias면 참조 선언으로 한 번 따라감
    let members = literalMembersOf(decl);
    if (!members && ts.isTypeAliasDeclaration(decl) && ts.isTypeReferenceNode(decl.type) && ts.isIdentifier(decl.type.typeName)) {
      const ref = findDeclaration(sourceFile, decl.type.typeName.text);
      if (ref) members = literalMembersOf(ref);
    }
    if (!members) return { rows: [], reason: `members unresolved: ${typeName}` };

    const aliases = collectLiteralUnionAliases(sourceFile);
    const rows = [];
    const memberNames = new Set();
    for (const member of members) {
      if (!ts.isPropertySignature(member) && !ts.isMethodSignature(member)) continue;
      const name = ts.isIdentifier(member.name) || ts.isStringLiteral(member.name) ? member.name.text : null;
      if (!name) continue;
      memberNames.add(name);
      rows.push({
        name,
        type: ts.isMethodSignature(member)
          ? cleanTypeText(member.getText(sourceFile).replace(/;$/, ""))
          : displayType(member.type, sourceFile, aliases),
        required: !member.questionToken,
        description: jsDocDescription(member),
      });
    }

    const defaults = collectDefaults(sourceFile, memberNames);
    for (const row of rows) {
      const def = defaults.get(row.name);
      if (def !== undefined) row.default = def;
    }
    return { rows, typeName, file: filePath };
  }
  return { rows: [], reason: `type not found: ${typeName}` };
};

/* ─── 실행 + 출력 ─── */

const result = {};
const failures = [];
for (const folder of componentDirs) {
  const slug = folder.toLowerCase();
  const { rows, reason } = extractComponent(folder);
  if (rows.length === 0) failures.push(`${folder}: ${reason ?? "no members"}`);
  result[slug] = rows;
}

const esc = (str) => JSON.stringify(str);

const lines = [
  "// ⚠️ 자동 생성 — 직접 수정 금지",
  "// 재생성: node scripts/generate-component-props.mjs (루트: pnpm docs:props)",
  "// 원본: packages/ui-v3/src/components/*/index.tsx 의 export된 ~Props 타입",
  "",
  "export type GeneratedProp = {",
  "  name: string;",
  "  type: string;",
  "  required: boolean;",
  "  default?: string;",
  "  description?: string;",
  "};",
  "",
  "export const GENERATED_PROPS: Record<string, readonly GeneratedProp[]> = {",
];

for (const slug of Object.keys(result).sort()) {
  const rows = result[slug];
  if (rows.length === 0) {
    lines.push(`  ${esc(slug)}: [],`);
    continue;
  }
  lines.push(`  ${esc(slug)}: [`);
  for (const row of rows) {
    const parts = [`name: ${esc(row.name)}`, `type: ${esc(row.type)}`, `required: ${row.required}`];
    if (row.default !== undefined) parts.push(`default: ${esc(row.default)}`);
    if (row.description !== undefined) parts.push(`description: ${esc(row.description)}`);
    lines.push(`    { ${parts.join(", ")} },`);
  }
  lines.push("  ],");
}
lines.push("};", "");

writeFileSync(OUTPUT_FILE, lines.join("\n"), "utf-8");

const ok = Object.values(result).filter((rows) => rows.length > 0).length;
console.log(`Generated props for ${ok}/${componentDirs.length} components → apps/docs/src/data/component-props.generated.ts`);
if (failures.length > 0) {
  console.log("Empty (extraction failed or memberless):");
  for (const f of failures) console.log(`  - ${f}`);
}
