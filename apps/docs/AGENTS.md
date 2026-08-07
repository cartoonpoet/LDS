# apps/docs (@lds/docs)

## 디렉토리 개요

LDS 제품 문서 사이트. Next.js(App Router, `--webpack`) + MDX + vanilla-extract next plugin.
`@lawkit/ui`/`@lds/tokens`를 workspace로 소비하며, 콘텐츠는 `src/data`의 인벤토리 객체가 주도한다.

```
app/
  page.tsx                 — 홈
  components/[slug]/       — 컴포넌트 상세 (src/data 기반)
  foundations/[slug]/      — 파운데이션
  patterns/ develop/ get-started/ updates/
  llms.txt/route.ts        — AI용 레퍼런스 (packages/ui-v3/CLAUDE.md를 빌드 시점에 읽어 서빙)
  globals.css              — 사이트 전역 스타일
src/
  data/                    — 인벤토리: component-list / component-previews / component-usage / components(RICH_PROPS) / foundations / patterns / updates
  components/docs/         — 문서 레이아웃 (DocsShell, Sidebar, Toc)
  components/site/         — 사이트 공통 UI (Shell, SiteNav, CodeBlock, highlight)
  content/                 — MDX 원고 (components/foundations/overview) — src/lib/docs.tsx가 수동 등록
  lib/docs.tsx             — MDX import 매핑 + TOC
```

## 파일 작성 컨벤션

- 컴포넌트 페이지는 MDX가 아니라 **`src/data` 인벤토리 주도**다. slug는 소문자 붙임 표기(`buttongroup`, `inputdatepicker`)로 `COMPONENT_LIST` 기준을 따른다.
- MDX 파일(`src/content/`)은 kebab-case, 추가 시 `src/lib/docs.tsx`에 import 등록해야 노출된다.
- 데이터 파일은 실제 `packages/ui-v3` 소스 API 기준으로만 작성한다(발명 금지).

## 코드 작성 컨벤션

### 신규 컴포넌트 문서 추가 절차

1. `src/data/component-list.ts` — `COMPONENT_LIST`에 `{ slug, name, desc }` 추가 (desc는 "~예요" 톤 유지)
2. `src/data/component-previews.ts` — `COMPONENT_PREVIEWS[slug]`에 미니 프리뷰 HTML 추가
3. `src/data/component-usage.ts` — `COMPONENT_USAGE[slug]`에 템플릿 코드 추가 (import 경로는 `@lds/ui-v3`로 통일, 원본은 `packages/ui-v3/CLAUDE.md`의 TemplateCode)
4. (선택) `src/data/components.ts` — `RICH_PROPS[slug]`에 실제 Props 인터페이스 기반 표 추가 (없으면 `DEFAULT_PROPS`)
5. **카운트 문구 갱신**: `component-list.ts` 상단 주석("실측 컴포넌트 54종"), `app/components/page.tsx`의 description("54종"), `app/not-found.tsx`("54개 컴포넌트")

### 프리뷰/스타일 규칙

- `component-previews.ts`의 프리뷰 HTML은 `app/globals.css`에 정의된 프리뷰 전용 클래스(`p-alert`, `p-button`, `p-dropdown` 등)를 재사용한다. 새 프리뷰에 새로운 시각 요소가 필요하면 globals.css에 클래스를 추가하되 기존 `p-*` 네이밍을 따른다.
- 코드 표시는 `src/components/site/CodeBlock.tsx` + `highlight.ts`를 사용한다(외부 하이라이터 도입 금지).

### llms.txt

- `app/llms.txt/route.ts`는 `force-static`으로 `packages/ui-v3/CLAUDE.md`를 읽는다.
- 컴포넌트/스토리 변경 시 **먼저 `pnpm --filter @lawkit/ui docs`로 CLAUDE.md를 재생성**한 뒤 docs를 빌드해야 llms.txt에 반영된다.

### 검증

```bash
pnpm --filter @lds/docs check    # tsc --noEmit (현재 문서 검증 수단)
pnpm --filter @lds/docs build    # next build --webpack
pnpm --filter @lds/docs dev      # 로컬 확인
```
