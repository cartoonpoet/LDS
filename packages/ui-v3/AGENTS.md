# packages/ui-v3 (@lawkit/ui)

## 디렉토리 개요

React 컴포넌트 라이브러리. `@lds/tokens`의 토큰만 참조해 스타일링하고, npm에 `@lawkit/ui`로 배포된다.
스토리는 이 패키지 안에 있고 `apps/storybook`이 로드하며, `CLAUDE.md`는 스토리의 TemplateCode에서 자동 생성된다.

```
src/
  components/{Name}/   — 컴포넌트 (54종)
  foundations/field/   — Field 등 폼 공통 프리미티브
  lib/                 — 내부 유틸/훅 (배럴 미export)
  styles/              — sprinkles.css.ts, shared.css.ts
  test/                — setup.ts, utils.tsx(renderWithUser)
  tokens/              — 토큰 문서용 스토리 (Colors/Typography/Layout)
  index.ts             — 배럴
```

## 파일 작성 컨벤션

- 컴포넌트는 **4파일 구조** 고정: `src/components/{Name}/`
  - `{Name}.css.ts` — vanilla-extract 스타일
  - `index.tsx` — 컴포넌트 코드
  - `{Name}.stories.tsx` — Storybook 스토리
  - `{Name}.test.tsx` — Vitest 테스트
- 완성 후 `src/index.ts`에 컴포넌트 + Props 타입을 export 추가한다.
- `src/lib/`의 내부 훅(`Portal`, `useFocusTrap`, `useControllableState`, `useDismissibleLayer`, `useScrollLock`, `usePresence`)은 **배럴로 export하지 않는다**. 공개 유틸은 `cx`뿐이다.

## 코드 작성 컨벤션

### 스타일 (vanilla-extract 필수, 하드코딩 금지)

```ts
import { recipe } from "@vanilla-extract/recipes";
import { themeVars, semanticColorRoles, grayPalette } from "@lds/tokens";

export const root = recipe({
  base: { /* 공통 */ },
  variants: { size: { small: {}, medium: {} } },
  defaultVariants: { size: "medium" },
});
```

- variants 있으면 `recipe`, 정적이면 `style`.
- 자주 쓰는 토큰: 배경 `semanticColorRoles.surface.canvas`, 텍스트 `semanticColorRoles.text.primary`, 테두리 `border.subtle`/`grayPalette[200]`, 액센트 `action.primary.default`, 간격 `themeVars.spacing.x1~x6`, 라운드 `themeVars.radius.sm/md/lg`. 전체 표는 HANDOFF.md 「토큰 참조」 참조.

### 컴포넌트

```tsx
import { cx } from "../../lib/cx";
import * as s from "./{Name}.css";

export interface {Name}Props extends HTMLAttributes<HTMLDivElement> { ... }
export function {Name}({ className, ...rest }: {Name}Props) {
  return <div className={cx(s.root({ variant }), className)} {...rest} />;
}
```

- 오버레이류는 `lib/`의 Portal + useFocusTrap + useScrollLock + useDismissibleLayer 조합을 재사용한다(새로 만들지 말 것).

### 스토리 + TemplateCode

- meta: `title: "Components/{Name}"`, `tags: ["autodocs"]`, `lightThemeClass` 데코레이터 (HANDOFF.md 「Storybook 패턴」).
- **TemplateCode 스토리 필수**: `type Story` 선언 바로 다음, 첫 스토리 앞에 배치. `name: "Template Code"`, 실제 코드는 `parameters.docs.source.code` 백틱 리터럴에 넣는다.
- 이 코드가 `scripts/generate-component-docs.mjs`로 추출되어 `CLAUDE.md`가 된다 → 스토리 변경 후 `pnpm --filter @lawkit/ui docs` 재생성. `CLAUDE.md` 직접 수정 금지.

### 테스트

```tsx
import { renderWithUser, screen } from "../../test/utils";
const { user } = renderWithUser(<Name onChange={onChange} />);
await user.click(screen.getByText("..."));
```

- role/텍스트 기반 조회 우선. jsdom 한계 대응(fake timers, animationend 미발생, 드래그 스킵 등)은 HANDOFF.md 「테스트 기술 참고사항」 참조.

### 검증

```bash
npx tsc --noEmit -p packages/ui-v3/tsconfig.json
pnpm --filter @lawkit/ui test        # 또는 npx vitest run src/components/{Name}/{Name}.test.tsx
```
