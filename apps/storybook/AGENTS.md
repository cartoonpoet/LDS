# apps/storybook (@lds/storybook)

## 디렉토리 개요

컴포넌트 워크벤치 겸 배포 게이트. **스토리 파일은 이 앱에 없다** — `.storybook/main.ts`가
`packages/ui-v3/src/**/*.stories.@(ts|tsx)`를 로드한다 (`src/placeholder.ts`는 tsc용 빈 파일).
스토리 작성 컨벤션은 `packages/ui-v3/AGENTS.md` 참조.

```
.storybook/
  main.ts       — 스토리 경로 + vanilla-extract 플러그인 + @lds/ui-v3·@lds/tokens 소스 alias
  preview.tsx   — body에 lightThemeClass 부착 데코레이터, docs.codePanel: true
vercel.json     — Vercel 배포 설정 (테스트 게이트)
```

## 파일 작성 컨벤션

- 스토리·컴포넌트 문서 변경은 전부 `packages/ui-v3`에서 한다. 이 앱에서는 로더/프리뷰 설정만 수정한다.
- alias가 dist가 아닌 **소스**(`packages/*/src`)를 가리키므로 빌드 없이 HMR로 동작한다. alias 변경 시 두 파일(main.ts의 resolve.alias) 모두 확인.

## 코드 작성 컨벤션

### Vercel 배포 + 테스트 게이트 (vercel.json)

`buildCommand`가 순서대로 실행된다:

1. `pnpm --filter @lawkit/ui test` — **테스트 실패 시 배포 중단**
2. `pnpm --filter @lawkit/ui build`
3. `node scripts/publish-if-new.mjs` — package.json 버전이 npm에 없으면 자동 publish (`NPM_TOKEN` 필요, 없으면 스킵)
4. `pnpm run build` (storybook build → `storybook-static/`)

즉 storybook 배포가 곧 `@lawkit/ui` npm 릴리스 트리거다. `packages/ui-v3` 버전을 올리고 main에 푸시하면 배포와 함께 publish된다.

### preview 설정

- 전역 데코레이터가 `document.body`에 `lightThemeClass`를 붙이므로 개별 스토리에서 테마 클래스를 중복 적용할 필요 없음 (컴포넌트 스토리의 배경/패딩 데코레이터는 별개).
- `docs.codePanel: true`가 이미 켜져 있어 TemplateCode 스토리에 복사 버튼이 자동 제공된다 — 애드온 추가 금지.

### 명령

```bash
pnpm storybook                           # 루트에서 (turbo run storybook --filter=@lds/storybook)
pnpm --filter @lds/storybook storybook   # 개발 서버 (포트 6006)
pnpm --filter @lds/storybook build       # 정적 빌드 → storybook-static/
```

### 참고

- 테마 커스터마이징 가이드 문서는 스토리로 존재: `packages/ui-v3/src/components/Theming.stories.tsx` (createLdsThemeVars 프리셋 예시)
- 토큰 문서 스토리: `packages/ui-v3/src/tokens/` (Colors/Typography/Layout)
- 배포 URL: https://lds-storybook.vercel.app
