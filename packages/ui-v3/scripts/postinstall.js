import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// 자기 자신 패키지 빌드 시에는 실행하지 않음
if (process.env.npm_package_name === '@lawkit/ui') process.exit(0);

// 소비 프로젝트 루트 (npm install 실행 위치)
const projectRoot = process.cwd();

const CLAUDE_MD_REF_LINE = '@node_modules/@lawkit/ui/CLAUDE.md';
const CURSOR_RULES_DIR = '.cursor/rules';
const CURSOR_RULES_FILE = '.cursor/rules/lds.mdc';
const COPILOT_INSTRUCTIONS_FILE = '.github/copilot-instructions.md';
const COPILOT_MARKER = '<!-- @lawkit/ui -->';

const CURSOR_MDC_CONTENT = `---
description: @lawkit/ui 컴포넌트 사용 규칙
globs: "**/*.tsx,**/*.ts"
alwaysApply: false
---

@lawkit/ui 컴포넌트를 사용할 때는 node_modules/@lawkit/ui/CLAUDE.md 파일을 참고하세요.
컴포넌트별 import 방법과 템플릿 코드가 정리되어 있습니다.
`;

const COPILOT_APPEND_CONTENT = `
<!-- @lawkit/ui -->
## @lawkit/ui 컴포넌트
컴포넌트 사용법은\`node_modules/@lawkit/ui/CLAUDE.md\` 를 참고하세요.
`;

let anyActionTaken = false;

try {
  // 1. CLAUDE.md 처리 — 파일 끝에 추가 (기존 구조 보존)
  const claudeMdPath = join(projectRoot, 'CLAUDE.md');
  if (existsSync(claudeMdPath)) {
    const content = readFileSync(claudeMdPath, 'utf-8');
    if (!content.includes(CLAUDE_MD_REF_LINE)) {
      const updated = content.trimEnd() + '\n' + CLAUDE_MD_REF_LINE + '\n';
      writeFileSync(claudeMdPath, updated, 'utf-8');
      console.log('[@lawkit/ui] CLAUDE.md 참조 추가됨');
    } else {
      console.log('[@lawkit/ui] CLAUDE.md 참조 이미 존재 — skip');
    }
    anyActionTaken = true;
  }

  // 2. .cursor/rules/ 디렉토리 처리
  const cursorRulesDirPath = join(projectRoot, CURSOR_RULES_DIR);
  if (existsSync(cursorRulesDirPath)) {
    const ldsMdcPath = join(projectRoot, CURSOR_RULES_FILE);
    if (!existsSync(ldsMdcPath)) {
      writeFileSync(ldsMdcPath, CURSOR_MDC_CONTENT, 'utf-8');
      console.log('[@lawkit/ui] .cursor/rules/lds.mdc 생성됨');
    } else {
      console.log('[@lawkit/ui] .cursor/rules/lds.mdc 이미 존재 — skip');
    }
    anyActionTaken = true;
  }

  // 3. .github/copilot-instructions.md 처리
  const copilotInstructionsPath = join(projectRoot, COPILOT_INSTRUCTIONS_FILE);
  if (existsSync(copilotInstructionsPath)) {
    const content = readFileSync(copilotInstructionsPath, 'utf-8');
    if (!content.includes(COPILOT_MARKER)) {
      const updated = content.trimEnd() + COPILOT_APPEND_CONTENT;
      writeFileSync(copilotInstructionsPath, updated, 'utf-8');
      console.log('[@lawkit/ui] copilot-instructions.md 참조 추가됨');
    } else {
      console.log('[@lawkit/ui] copilot-instructions.md 참조 이미 존재 — skip');
    }
    anyActionTaken = true;
  }

  if (!anyActionTaken) {
    console.log('[@lawkit/ui] AI 설정 파일을 찾지 못했습니다. 필요 시 수동으로 추가하세요.');
  }
} catch (err) {
  // postinstall 실패가 npm install 전체를 막지 않도록 경고만 출력
  console.warn('[@lawkit/ui] AI 설정 파일 업데이트 중 오류 발생 (무시됨):', err.message);
}
