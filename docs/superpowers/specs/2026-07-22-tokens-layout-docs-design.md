# Tokens Storybook 문서 — Layout (Spacing / Radius / Shadow) 설계

**날짜:** 2026-07-22
**패키지:** `packages/ui-v3` (데이터 소스: `packages/tokens`)

## 배경

`Tokens/Colors`, `Tokens/Typography` 문서 페이지를 추가한 뒤 남은 gap을 점검한 결과, `packages/tokens/src/foundation/`의 `spacing-scale.ts`, `radius-scale.ts`, `shadow-scale.ts`가 Storybook 어디에도 시각적으로 문서화되어 있지 않다는 것을 확인했다. 특히 `radius-scale.ts`, `shadow-scale.ts`는 `packages/tokens/src/index.ts`에서 아예 export도 되어 있지 않다 (`letterSpacingScale` 때와 동일한 종류의 누락).

Iconography는 이미 `Components/Icon`의 `Gallery` 스토리가 전체 아이콘을 보여주고 있어 중복이라 제외한다.

## 파일 구조

```
packages/tokens/src/index.ts                        ← Modify: defaultRadiusTokens, defaultShadowTokens export 추가
packages/ui-v3/src/tokens/
  docHelpers.tsx                                     ← Modify: SpacingBar, RadiusSwatch, ShadowSwatch 추가
  docHelpers.test.tsx                                ← Modify: 위 3개 컴포넌트 테스트 추가
  Layout.stories.tsx                                 ← Create
```

## export 보강

`packages/tokens/src/index.ts`에 다음을 추가한다:

```ts
export { defaultRadiusTokens } from "./foundation/radius-scale";
export { defaultShadowTokens } from "./foundation/shadow-scale";
```

(`spacingScale`, `defaultSpacingTokens`는 이미 export되어 있음 — 추가 불필요.)

## 데이터 스코프

- **Spacing**: `defaultSpacingTokens` (x1~x6, 4/8/12/16/20/24px)만 다룬다. 원시 `spacingScale`(xs/s/m/l/xl/xxl)은 실제 컴포넌트 코드 어디에서도 직접 참조되지 않고 `defaultSpacingTokens`를 만드는 데만 쓰이는 내부 소스이므로 문서에서는 제외한다 — `themeVars.spacing.x1~x6` 형태로 실제 소비되는 `defaultSpacingTokens` 쪽이 개발자에게 의미 있는 정보다.
- **Radius**: `defaultRadiusTokens` (sm/md/lg, 4/6/8px) 전부.
- **Shadow**: `defaultShadowTokens` (focus/raised/modal) 전부.

## `Layout.stories.tsx`

`title: "Tokens/Layout"`. 3개 스토리:

### `Spacing`
`defaultSpacingTokens`의 각 항목을 `SpacingBar`로 렌더링. 실제 px 값은 너무 작아(4~24px) 눈으로 비교하기 어려우므로, 막대 너비는 값에 배율(×4)을 곱해 표시하고 라벨에는 실제 px 값을 그대로 표기한다 (배율은 시각적 비교용이지 실제 크기가 아님을 라벨로 분명히 한다).

### `Radius`
`defaultRadiusTokens`의 각 항목을 `RadiusSwatch`로 렌더링 — 고정 크기(48×48) 박스에 해당 `border-radius`를 그대로 적용.

### `Shadow`
`defaultShadowTokens`의 각 항목을 `ShadowSwatch`로 렌더링 — 흰 박스에 해당 `box-shadow`를 그대로 적용. 그림자가 잘리지 않도록 충분한 여백을 둔다.

### 공통 렌더링 컴포넌트 (docHelpers.tsx에 추가)

```tsx
function SpacingBar({ name, value }: { name: string; value: string }): JSX.Element
function RadiusSwatch({ name, value }: { name: string; value: string }): JSX.Element
function ShadowSwatch({ name, value }: { name: string; value: string }): JSX.Element
```

기존 `SectionTitle`을 재사용해 각 스토리 상단에 섹션 제목을 둔다. chrome 색상(텍스트/캡션/테두리)은 기존 관례대로 `semanticColorRoles`/`grayPalette` 토큰을 사용하고 하드코딩하지 않는다 (스와치가 보여줘야 하는 대상 값 자체는 예외).

## 테스트

`docHelpers.test.tsx`에 `SpacingBar`, `RadiusSwatch`, `ShadowSwatch` 각각에 대한 렌더링 테스트를 추가한다 (이름/값 텍스트가 렌더링되는지, 그리고 `SpacingBar`는 배율이 적용된 width 스타일이, `RadiusSwatch`/`ShadowSwatch`는 각각 `borderRadius`/`boxShadow` 인라인 스타일이 실제로 적용되는지 `toHaveStyle`로 확인).

`Layout.stories.tsx`는 데이터를 헬퍼에 꽂아 넣기만 하는 조립 코드이므로 별도 테스트 파일을 만들지 않는다 — 기존 `Colors.stories.tsx`/`Typography.stories.tsx`와 동일한 관례. 검증은 `packages/ui-v3/tsconfig.json` 기준 타입 체크(스토리/테스트 파일은 이 tsconfig에서 제외되므로, 임시 tsconfig로 실제 타입 체크도 함께 확인) + Storybook 육안 확인으로 한다.

## 검증 방법

```bash
cd apps/storybook && pnpm storybook
```
사이드바에서 `Tokens/Layout` 항목을 열어 `Spacing`/`Radius`/`Shadow` 3개 스토리가 올바르게 렌더링되는지 육안 확인.
