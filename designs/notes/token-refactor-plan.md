# LDS Token Refactor Plan

## Goal

Zeplin 기준 디자인 자산을 React + vanilla-extract 기반으로 안정적으로 옮길 수 있도록, 현재 단일 파일 중심 토큰 구조를 **foundation / semantic / contract / theme / runtime** 계층으로 재구성한다.

이 계획은 다음 원칙을 따른다.

- **클린코드 우선**: 역할이 다른 토큰을 한 파일에 몰아두지 않는다
- **디자인-개발 연결성**: Zeplin 보드의 색상/텍스트 스타일/상태 체계를 코드 구조와 직접 대응시킨다
- **확장 가능성**: 버튼, 폼, 테이블, 배지, 승인선, 차트까지 확장 가능한 기본 구조를 먼저 만든다
- **vanilla-extract 친화성**: `createThemeContract`, `createTheme`, `assignInlineVars` 흐름을 유지한다

---

## Current Problems

### 1. Single-file concentration
현재 `theme.css.ts` 하나에 color / spacing / radius / font / shadow가 모두 들어 있다.

문제점:
- 책임이 과도하게 섞여 있음
- Zeplin 기준 토큰이 늘어나면 diff 추적이 어려움
- foundation과 semantic 역할이 분리되지 않음

### 2. Color depth is shallow
현재 color는 주로 버튼/기본 UI 위주의 semantic token만 존재한다.

부족한 것:
- grayscale / brand scale 같은 base palette
- state alias (`successBg`, `dangerText` 등)
- surface layering
- status/domain token
- data viz/chart token

### 3. Typography system is too small
현재 typography는 family / sizeSm / sizeMd / sizeLg / weights 정도만 존재한다.

부족한 것:
- display / heading / title / body / label / caption
- line-height
- letter-spacing
- 문서와 제품 UI에서 재사용 가능한 텍스트 스타일 계층

### 4. Scale systems are incomplete
spacing, radius, shadow 모두 초기값 수준이다.

---

## Target Architecture

```text
packages/tokens/src/
  foundation/
    color-palette.ts
    spacing-scale.ts
    radius-scale.ts
    typography-scale.ts
    shadow-scale.ts

  semantic/
    color-roles.ts
    text-styles.ts

  contracts/
    theme-contract.css.ts

  themes/
    light-theme.css.ts

  runtime/
    create-theme-vars.ts

  index.ts
```

---

## Layer Responsibilities

### foundation/
원본 토큰 값의 집합.

예:
- gray-0 ~ gray-900
- blue-100 ~ blue-700
- space-0 ~ space-16
- radius-none ~ radius-full
- font-size-12 ~ 48

특징:
- 디자인 원본과 가장 가까운 레벨
- semantic 의미를 갖지 않음
- 재사용 가능한 순수 scale 역할

### semantic/
실제 제품과 컴포넌트가 소비하는 역할 기반 토큰.

예:
- `text.primary`
- `surface.page`
- `surface.card`
- `border.default`
- `action.primary.default`
- `status.success.text`

특징:
- foundation 값을 조합해서 만듦
- 컴포넌트는 가능하면 foundation이 아니라 semantic을 읽는다

### contracts/
vanilla-extract `createThemeContract` 정의.

특징:
- semantic 기준으로 contract를 정의
- 실제 theme 파일이 contract를 채운다

### themes/
light / dark / brand theme 값 바인딩.

현재 1차 범위:
- `light-theme.css.ts`

### runtime/
런타임 오버라이드 생성.

특징:
- 제품별 테마 변경
- semantic 중심 override 우선
- foundation 직접 override는 제한적으로 허용

---

## Proposed Token Domains

### Color
1. **palette**
   - gray
   - blue
   - green
   - red
   - yellow
   - cyan
   - indigo / purple (필요 시)

2. **surface**
   - page
   - section
   - card
   - raised
   - overlay
   - inverse

3. **text**
   - primary
   - secondary
   - tertiary
   - disabled
   - inverse
   - heading

4. **border**
   - subtle
   - default
   - strong
   - interactive
   - disabled

5. **action**
   - primary / secondary / neutral / danger / success / warning / info
   - each: default / hover / active / disabled / text / border / bg

6. **status**
   - draft
   - review
   - approved
   - rejected
   - completed
   - pending

7. **chart**
   - 1 ~ n scale

### Typography
- fontFamily
- fontWeight
- fontSize
- lineHeight
- letterSpacing
- semantic text styles
  - display.lg / md / sm
  - heading.lg / md / sm
  - title.lg / md / sm
  - body.lg / md / sm
  - label.lg / md / sm
  - caption.lg / md / sm

### Spacing
추천 scale:
- 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64

### Radius
추천 scale:
- none, xs, sm, md, lg, xl, full

### Shadow
추천 scale:
- none, xs, sm, md, lg, focus

---

## Mapping Strategy from Zeplin

### Zeplin boards to inspect first
우선순위:
1. Theme Colors
2. Text Style
3. Color States
4. Bootstrap Colors
5. Filled / Border / Gradient Buttons Colors & States
6. Form Elements

### Mapping rule
- Zeplin에 보이는 **raw color scale**는 foundation으로
- 상태/역할 기반 이름은 semantic으로
- 컴포넌트별 구체 state 값은 semantic action/status token으로 올린다

예:
- `Blue/500` → foundation palette
- `Primary Button / Hover` → semantic action.primary.hover
- `Text / Secondary` → semantic text.secondary

---

## Refactor Order

### Phase 1 — structure split
- foundation 파일 분리
- semantic 파일 분리
- contract 분리
- light theme 분리
- runtime 파일 이동
- 기존 export 유지로 외부 API 호환성 유지

### Phase 2 — color expansion
- base palette 추가
- semantic color domain 정리
- 기존 token 이름을 새 구조에 alias로 연결

### Phase 3 — typography expansion
- text style token 정의
- docs / ui-v3가 공용으로 사용할 수 있게 export 정리

### Phase 4 — component-domain readiness
- button / form / badge / table에 필요한 semantic token 보강

---

## Backward Compatibility

초기 리팩터링에서는 기존 소비 코드가 한 번에 깨지지 않도록 다음을 유지한다.

- `themeVars`
- `defaultColorTokens`
- `defaultSpacingTokens`
- `lightThemeClass`
- `createLdsThemeVars`

단, 내부 구현은 새 구조로 옮긴다.

---

## Clean Code Rules

- foundation은 semantic 이름을 갖지 않는다
- semantic은 raw hex를 직접 갖지 않고 foundation을 조합한다
- contract는 의미 계층을 반영해야 한다
- runtime override는 semantic 기준을 우선한다
- UI 패키지는 foundation보다 semantic token을 우선 소비한다
- 토큰 이름은 상태와 역할을 모두 드러내야 한다

---

## Immediate Next Task

다음 작업은 **Phase 1: structure split** 이다.

즉,
- 현재 `theme.css.ts`를 여러 파일로 나누고
- export surface를 유지하면서
- 내부 구조를 foundation / semantic / contract / theme / runtime 계층으로 재구성한다.
