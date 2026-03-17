# @lds/tokens

LDS 디자인 토큰 패키지입니다.

## 방향

이 패키지는 **React + vanilla-extract** 기반 UI 패키지가 공통으로 소비하는 토큰 레이어를 제공합니다.

핵심 원칙:
- foundation scale과 semantic role을 분리합니다.
- 컴포넌트는 raw hex보다 semantic token을 우선 소비합니다.
- `createThemeContract` 기반 contract를 유지해 런타임 override를 안전하게 받습니다.
- 초기 기준 테마는 light theme이며, 기존 export surface는 최대한 유지합니다.

## 구조

```text
src/
  foundation/
    color-palette.ts
    spacing-scale.ts
    radius-scale.ts
    shadow-scale.ts
    typography-scale.ts
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

## 토큰 계층

### 1) Foundation
Zeplin 보드에서 직접 보이는 raw palette / scale을 담습니다.

예:
- `bluePalette[500]`
- `grayPalette[300]`
- `fontSizeScale.md`
- `spacing.x3`

### 2) Semantic
실제 UI 의도를 표현하는 alias입니다.

예:
- `semanticColorRoles.text.primary`
- `semanticColorRoles.action.primary.hover`
- `semanticColorRoles.status.danger.fill`
- `semanticColorRoles.field.borderFocus`
- `semanticColorRoles.button.solid.primary.background`

### 3) Theme contract / runtime
vanilla-extract contract를 통해 theme variable shape를 고정하고,
런타임에서 일부 값을 override할 수 있게 합니다.

## 현재 포함된 semantic domain

현재 정리된 semantic role:
- surface
- text
- border
- action
- status
- button
- field
- badge
- chip
- alert

이 구조로 `ui-v3` 컴포넌트에서 버튼 상태값, 폼 포커스/에러 상태, badge/chip/alert 시각 역할을 공통 토큰으로 소비할 수 있습니다.

## 사용 예시

```ts
import { semanticColorRoles, themeVars } from "@lds/tokens";

const primaryButton = {
  backgroundColor: semanticColorRoles.button.solid.primary.background,
  color: semanticColorRoles.button.solid.primary.text,
  borderRadius: themeVars.radius.sm
};
```

```ts
import { createLdsThemeVars } from "@lds/tokens";

const brandOverride = createLdsThemeVars({
  color: {
    accentPrimary: "#3b82f6",
    accentPrimaryHover: "#2563eb"
  }
});
```

## Backward compatibility

초기 리팩터링 단계에서는 아래 export를 계속 유지합니다.

- `themeVars`
- `defaultColorTokens`
- `defaultSpacingTokens`
- `lightThemeClass`
- `createLdsThemeVars`

즉, 기존 소비 코드는 급격히 깨지지 않되 내부 구현은 semantic 중심으로 점진 이관합니다.

## 참고 문서

- `../../designs/notes/token-refactor-plan.md`
- `../../designs/notes/zeplin-token-audit.md`
