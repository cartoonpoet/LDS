# packages/tokens (@lds/tokens)

## 디렉토리 개요

디자인 토큰 패키지. `ui-v3`의 모든 스타일이 여기서 나온다. 빌드 없이 `src/index.ts`를 그대로 export한다.

```
src/
  foundation/   — 원시 스케일: color-palette, spacing-scale, radius-scale, shadow-scale, typography-scale
  semantic/     — 역할 매핑: color-roles(semanticColorRoles), text-styles(textStyles)
  contracts/    — theme-contract.css.ts: createThemeContract → themeVars (CSS 변수 계약)
  themes/       — light-theme.css.ts: createTheme(themeVars, defaultThemeValues) → lightThemeClass
  runtime/      — create-theme-vars.ts: createLdsThemeVars (런타임 테마 오버라이드)
  index.ts      — 배럴
```

토큰 흐름: **foundation(값) → contracts(계약 슬롯) → themes(기본 테마 값 주입) → runtime(런타임 오버라이드)**.
semantic은 foundation 팔레트를 역할 이름으로 재노출한다.

## 파일 작성 컨벤션

- foundation 파일은 `{도메인}-scale.ts`/`color-palette.ts` 네이밍, `default{도메인}Tokens` 객체와 타입을 함께 export한다.
- CSS 변수를 만드는 파일만 `.css.ts` 확장자를 쓴다(contracts, themes). 순수 값 모듈은 `.ts`.
- 새 export는 반드시 `src/index.ts` 배럴에 추가한다. 소비자는 `@lds/tokens` 루트에서만 import한다.

## 코드 작성 컨벤션

### 소비 방법 (ui-v3 기준)

- 정적 스타일: `themeVars.color.…`, `themeVars.spacing.x1~x6`, `themeVars.radius.sm/md/lg`, `themeVars.shadow.…`, `themeVars.font.…` (CSS 변수 참조 — 테마 전환 대응)
- 역할 기반: `semanticColorRoles.surface/text/border/action.…`, `textStyles` (foundation 값을 역할명으로 재노출한 상수)
- 원시 팔레트: `grayPalette`, `bluePalette`, `opacityPalette` 등 (index.ts 참조) — semantic으로 표현 안 될 때만
- 테마 적용: `lightThemeClass`를 루트 요소에 부착. `ui-v3` 배럴이 `lightThemeClass`/`themeVars`/`createLdsThemeVars`를 re-export하므로 앱은 `@lawkit/ui`만 설치해도 된다.

### 런타임 테마 (createLdsThemeVars)

- `assignInlineVars` 기반. `LdsThemeInput`은 현재 `color`/`spacing`의 Partial만 받는다.
- 소비자는 `<div className={lightThemeClass} style={createLdsThemeVars({ color: {...} })}>`로 브랜드 오버라이드한다.

### 토큰 추가 절차 (예: color 토큰)

1. `foundation/color-palette.ts` — `LdsColorTokens` 타입과 `defaultColorTokens`에 값 추가
2. `contracts/theme-contract.css.ts` — `themeVars`에 같은 키로 `null` 슬롯 추가
3. `themes/light-theme.css.ts` — `defaultThemeValues`는 default 객체를 통째로 쓰므로 보통 자동 반영 (구조 바뀌면 확인)
4. `runtime/create-theme-vars.ts` — **`assignInlineVars` 매핑은 수동 나열**이므로 새 키를 직접 추가 (누락 시 런타임 오버라이드 불가)
5. `src/index.ts` export 확인 → `ui-v3`에서 `themeVars.…`로 사용

### 검증

```bash
pnpm --filter @lds/tokens check    # tsc --noEmit
pnpm --filter @lawkit/ui test      # 소비자 회귀 확인
```
