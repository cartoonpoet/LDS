# Tokens Storybook 문서 (Colors / Typography) 설계

**날짜:** 2026-07-21
**패키지:** `packages/ui-v3` (데이터 소스: `packages/tokens`)

## 배경

Chromatic에 배포된 다른 디자인 시스템의 Storybook(`Tokens/Colors`, `Tokens/Typography` docs 페이지)처럼, LDS도 컬러/타이포그래피 토큰과 브랜드 프리셋을 한눈에 볼 수 있는 문서 페이지가 필요하다. 토큰 데이터 자체는 `packages/tokens/src`에 이미 존재하며, 이번 작업은 그 데이터를 시각화하는 Storybook 문서만 추가한다 (토큰 값 자체는 변경하지 않음).

---

## 파일 구조

```
packages/ui-v3/src/tokens/
  Colors.stories.tsx
  Typography.stories.tsx
```

`apps/storybook/.storybook/main.ts`의 `stories` glob이 `packages/ui-v3/src/**/*.stories.@(ts|tsx)`이므로 이 위치에 두면 자동으로 스캔된다.

`packages/ui-v3/src/components/Theming.stories.tsx`에서 브랜드 프리셋 데이터(`brands` const)를 export하도록 수정 (`Colors.stories.tsx`에서 재사용).

---

## 사이드바 구조

각 스토리 파일의 `meta.title`을 `"Tokens/Colors"`, `"Tokens/Typography"`로 지정한다. Storybook 사이드바에 `Components`, `Guide` 그룹과 나란히 새 `Tokens` 그룹이 생긴다 (참고 링크와 동일한 패턴).

---

## Colors.stories.tsx

### 데이터 소스
- `semanticColorRoles` (`@lds/tokens`) — `surface` / `text` / `border` / `action` / `status` 5개 그룹만 사용
- `grayPalette`, `bluePalette`, `greenPalette`, `redPalette`, `yellowPalette`, `cyanPalette`, `darkPalette`, `opacityPalette` (`@lds/tokens`)
- `Theming.stories.tsx`에서 export한 브랜드 프리셋 데이터

### 스코프에서 제외
- `semanticColorRoles`의 `button` / `field` / `table` / `badge` / `chip` / `alert` — 컴포넌트 전용 토큰이라 각 컴포넌트 Storybook 페이지에서 이미 확인 가능하므로 제외
- `scourtPalette` / `bootstrapPalette` / `socialPalette` — 특정 용도 유틸리티 팔레트라 제외

### 섹션 1 — Semantic Colors
그룹(surface/text/border/action/status)별로 소제목을 두고, 각 토큰 이름 + 스와치를 표로 렌더링.

- 단일 값 토큰(예: `surface.canvas`, `text.primary`): 스와치 1개 + 값 라벨(hex 또는 대응 foundation 토큰명)
- 상태가 여러 개인 토큰(`action.primary` → default/hover/active/subtle, `status.success` → text/fill/border): 참고 링크의 `bg.brand` 처럼 여러 스와치를 가로로 나란히 붙이고 각각 상태 라벨 표기

값 라벨은 하드코딩한다 (런타임 DOM 계산 없이): 리터럴 hex/rgba면 그대로 표기하고, `themeVars.color.X` 참조면 대응하는 `defaultColorTokens`의 키 이름(예: `accentPrimary`)을 표기한다.

### 섹션 2 — Primitive Colors
gray(0~900) / blue(100~700) / green / red / yellow / cyan / dark / opacity 팔레트를 각각 가로 스와치 스트립으로 렌더링. 각 스와치 아래 키(단계 번호 또는 이름)와 hex/rgba 값을 표기.

### 섹션 3 — Presets
`Theming.stories.tsx`에서 가져온 5개 브랜드 프리셋(Law.ai/Green/Purple/Orange/Scourt Blue)을 프리셋명 + accentPrimary/Hover/Active 3색 스와치로 요약. 컴포넌트 미리보기는 넣지 않는다 (기존 `Guide/Theming` → `BrandComparison` 스토리가 그 역할을 함). 각 프리셋 옆에 "컴포넌트 적용 예시는 Guide/Theming 참고"라는 안내 문구만 추가.

### 공통 렌더링 컴포넌트
```tsx
function ColorSwatch({ color, label }: { color: string; label: string }) { ... }
function ColorSwatchRow({ name, swatches }: { name: string; swatches: { label: string; color: string }[] }) { ... }
function PaletteStrip({ name, steps }: { name: string; steps: { key: string; value: string }[] }) { ... }
```

---

## Typography.stories.tsx

### 데이터 소스
- `fontFamilyTokens`, `fontSizeScale`, `fontWeightScale`, `lineHeightScale`, `letterSpacingScale` (foundation)
- `textStyles` (semantic) — 전체 13개 카테고리 모두 포함: `display`, `heading`, `appTitle`, `appLabel`, `appBody`, `bodyParagraph`, `input`, `placeholder`, `label`, `button`, `menu`, `table`, `viewer`, `mail`

### 섹션 1 — 소개
- Pretendard(기본 UI 폰트) / Malgun Gothic(viewer·mail 컨텍스트 전용) 안내 문구

### 섹션 2 — Foundation Scale
- fontSize / fontWeight / lineHeight / letterSpacing 값을 각각 간단한 표로 나열 (토큰명 → 실제 값)

### 섹션 3 — Semantic Text Styles
`textStyles`의 13개 카테고리를 순서대로 섹션으로 나누고, 각 카테고리 안의 모든 variant를 한 행씩 렌더링:
- 좌측: 크기(px) + weight/lineHeight/letterSpacing 메타 정보
- 우측: 해당 스타일이 실제 적용된 텍스트 샘플 (`style={{ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }}`)
- 샘플 문구는 카테고리 폰트 패밀리에 맞춰 통일된 한 두 문장 사용 (Pretendard 계열 vs Malgun Gothic 계열 구분)

### 공통 렌더링 컴포넌트
```tsx
function TextSpecimenRow({ name, value }: { name: string; value: TextStyleValue }) { ... }
function TextStyleSection({ title, styles }: { title: string; styles: Record<string, TextStyleValue> }) { ... }
```

---

## 테스트

문서 전용 스토리이므로 별도 테스트 파일은 만들지 않는다 (기존 `Theming.stories.tsx`도 테스트 없음). `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`으로 타입 체크만 확인한다.

---

## 검증 방법

```bash
cd apps/storybook && pnpm storybook
```
브라우저에서 `Tokens/Colors`, `Tokens/Typography` 사이드바 항목을 열어 스와치/텍스트 샘플이 올바르게 렌더링되는지 육안 확인.
