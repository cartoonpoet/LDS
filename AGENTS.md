# AGENTS.md

AI 어시스턴트가 이 저장소에서 작업할 때 참고하는 가이드.

## 프로젝트 개요

LDS(Legal Design System)는 법무 제품을 위한 디자인 시스템 모노레포다.
pnpm workspace + Turborepo로 구성되며, 진행 중 작업 맥락은 @HANDOFF.md 참고.

## 디렉토리 개요

| 경로 | 패키지명 | 역할 |
| --- | --- | --- |
| `packages/tokens` | `@lds/tokens` | 디자인 토큰 (foundation → semantic → contract → theme) |
| `packages/ui-v3` | `@lawkit/ui` | React 컴포넌트 라이브러리 (npm 배포 대상) |
| `packages/eslint-config`, `packages/typescript-config` | — | 공유 설정 |
| `apps/docs` | `@lds/docs` | 제품 문서 사이트 (Next.js) |
| `apps/storybook` | `@lds/storybook` | 컴포넌트 워크벤치 (Storybook, Vercel 배포) |
| `scripts/` | — | 레포 공용 스크립트 (`generate-component-docs.mjs`, `publish-if-new.mjs`) |

### 연결 흐름

`tokens → ui-v3 → docs / storybook`

- 토큰 변경은 `packages/tokens`에서 시작하고, 컴포넌트는 토큰만 참조한다(하드코딩 금지).
- 스토리 파일은 `packages/ui-v3` 안에 있고 `apps/storybook`은 그것을 로드만 한다.

## AGENTS.md 계층 원칙

- **상위 AGENTS는 얕고 넓게**: 폴더군의 역할과 연결 흐름만
- **하위 AGENTS는 깊고 좁게**: 해당 폴더에 국한된 구조와 컨벤션
- 중복 없이 계층적으로 작성. 각 폴더에서 작업할 때 해당 폴더의 AGENTS.md를 우선 적용한다.

## 문서 역할 분리

| 문서 | 역할 | 비고 |
| --- | --- | --- |
| `AGENTS.md` | 폴더 개요 + AI 컨벤션 | 각 핵심 폴더에 계층적으로 배치 |
| `HANDOFF.md` | 작업 인수인계 (완료 내역, 남은 작업, 상세 패턴) | 작업 시작 시 반드시 먼저 읽기 |
| `packages/ui-v3/CLAUDE.md` | 컴포넌트 템플릿 코드 레퍼런스 | **자동 생성 — 직접 수정 금지.** `pnpm --filter @lawkit/ui docs`로 재생성 |
| `README.md` | 사람 대상 소개 | — |

## 공통 명령

```bash
pnpm dev / build / lint / check / test   # turbo run (전 패키지)
pnpm storybook                           # Storybook 개발 서버

# 검증 (HANDOFF.md 기준)
npx tsc --noEmit -p packages/ui-v3/tsconfig.json   # 타입 체크
pnpm --filter @lawkit/ui test                      # 전체 테스트
npx vitest run src/components/Button/Button.test.tsx  # 특정 컴포넌트만 (packages/ui-v3에서)
```

## 커밋 컨벤션

```
feat: {컴포넌트명} 컴포넌트 개발
test: {대상} 테스트 추가
docs: {내용} 문서 추가
ci: {내용} CI 설정
```

## Boundaries

- ✅ **Always**: 작업 전 HANDOFF.md 확인, 컴포넌트 수정 후 해당 테스트 실행, 스토리 변경 시 `pnpm --filter @lawkit/ui docs` 재생성
- ⚠️ **Ask first**: 새 패키지 추가, turbo/vercel 설정 변경, 외부 의존성 추가
- 🚫 **Never**: `packages/ui-v3/CLAUDE.md` 직접 수정, 토큰 값 하드코딩, `dist/`·`node_modules/` 수정, `pnpm` 외 패키지 매니저 사용
