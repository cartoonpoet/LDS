# Tokens Layout (Spacing / Radius / Shadow) Storybook Docs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Storybook 사이드바에 `Tokens/Layout` 문서 페이지를 추가해 spacing(`defaultSpacingTokens`), radius(`defaultRadiusTokens`), shadow(`defaultShadowTokens`) 토큰을 실제 모양(막대 길이 / 둥근 모서리 박스 / 그림자 박스)으로 시각 확인할 수 있게 한다.

**Architecture:** 기존 `packages/ui-v3/src/tokens/docHelpers.tsx`에 `SpacingBar`, `RadiusSwatch`, `ShadowSwatch` 3개 프레젠테이셔널 컴포넌트를 추가하고(단위 테스트 포함), 새 `Layout.stories.tsx`가 그 헬퍼에 `@lds/tokens`의 데이터를 꽂아 넣는다. `Colors.stories.tsx`/`Typography.stories.tsx`와 동일한 "헬퍼는 테스트, 스토리는 조립만" 패턴을 그대로 따른다.

**Tech Stack:** React, TypeScript, Storybook 8, Vitest + `@testing-library/react`, `@lds/tokens` 패키지.

## Global Constraints

- 새 스토리 파일은 `packages/ui-v3/src/**/*.stories.@(ts|tsx)`에 위치해야 Storybook에 스캔된다.
- **Spacing 스코프**: `defaultSpacingTokens`(x1~x6)만 다룬다. 원시 `spacingScale`(xs/s/m/l/xl/xxl)은 실제 컴포넌트 코드에서 직접 참조되지 않고 `defaultSpacingTokens`를 만드는 내부 소스일 뿐이므로 제외한다.
- **Radius 스코프**: `defaultRadiusTokens`(sm/md/lg) 전부.
- **Shadow 스코프**: `defaultShadowTokens`(focus/raised/modal) 전부.
- `docHelpers.tsx`의 컴포넌트 chrome(텍스트/캡션 색상, 스와치 색 등)은 `semanticColorRoles`/`grayPalette` 토큰을 사용하고 리터럴 hex를 하드코딩하지 않는다. 단, 스와치가 표시해야 하는 대상 값 자체(`SpacingBar`/`RadiusSwatch`/`ShadowSwatch`의 `value` prop으로 들어오는 실제 px/box-shadow 값)는 문서화 대상 데이터이므로 이 규칙에서 제외.
- `SpacingBar`의 막대 너비는 실제 px 값의 4배(`parseFloat(value) * 4`)로 렌더링한다 — 4~24px는 그대로 그리면 육안으로 비교하기 어렵기 때문. 라벨에는 항상 실제 값을 그대로 표기해 배율이 실제 크기가 아님을 명확히 한다.
- 테스트 정책: `docHelpers.tsx`의 새 컴포넌트 3개는 `docHelpers.test.tsx`에 Vitest + `@testing-library/react`(`renderWithUser`/`screen`)로 단위 테스트를 추가한다. `Layout.stories.tsx`는 데이터를 헬퍼에 꽂아 넣기만 하는 조립 코드이므로 별도 테스트 파일을 만들지 않는다 — 기존 `Colors.stories.tsx`/`Typography.stories.tsx`와 동일한 관례.
- **tsconfig 주의**: `packages/ui-v3/tsconfig.json`은 `src/**/*.stories.tsx`와 `src/**/*.test.tsx`를 타입 체크에서 제외한다. `.stories.tsx`를 새로 만들거나 수정하는 태스크는 `npx tsc --noEmit -p packages/ui-v3/tsconfig.json` 외에, `extends: "./tsconfig.json", exclude: []`인 임시 tsconfig(커밋 금지, 확인 후 즉시 삭제)로 실제 타입 체크도 함께 수행한다.
- **베이스라인 타입 에러**: 이 플랜 시작 시점에도 `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`을 돌리면 아래 에러 1개가 이미 발생한다 (이전 PR에서도 동일하게 확인된 것, 이 플랜과 무관, 손대지 않음):
  ```
  packages/ui-v3/src/test/utils.tsx(5,17): error TS2742: The inferred type of 'renderWithUser' cannot be named without a reference to '.pnpm/pretty-format@27.5.1/node_modules/pretty-format'. This is likely not portable. A type annotation is necessary.
  ```
  각 태스크의 타입 체크 스텝에서 "에러 없이 종료"라 적었더라도, 실제로는 **이 에러 1개만 남고 새 에러가 추가되지 않았는지**를 기준으로 판단한다.
- **베이스라인 테스트**: `pnpm test`는 48개 파일 / 390개 테스트가 통과한다 (직접 재확인함). 각 태스크에서 이 숫자보다 실패가 늘었는지로 판단한다.

---

## 파일 구조

```
packages/tokens/src/index.ts                  ← Modify: defaultRadiusTokens, defaultShadowTokens export 추가
packages/ui-v3/src/tokens/
  docHelpers.tsx                               ← Modify: SpacingBar, RadiusSwatch, ShadowSwatch 추가
  docHelpers.test.tsx                          ← Modify: 위 3개 컴포넌트 테스트 추가
  Layout.stories.tsx                           ← Create
```

---

### Task 1: `defaultRadiusTokens`, `defaultShadowTokens`를 `@lds/tokens`에서 export

**Files:**
- Modify: `packages/tokens/src/index.ts`

**Interfaces:**
- Produces: `defaultRadiusTokens`(`{ sm: string; md: string; lg: string }`), `defaultShadowTokens`(`{ focus: string; raised: string; modal: string }`)를 `@lds/tokens`에서 import 가능하게 함. Task 4에서 사용.

- [ ] **Step 1: export 추가**

`packages/tokens/src/index.ts`에 다음 두 줄을 추가한다 (기존 `export { spacingScale, defaultSpacingTokens } from "./foundation/spacing-scale";` 바로 아래):

```ts
export { defaultRadiusTokens } from "./foundation/radius-scale";
export { defaultShadowTokens } from "./foundation/shadow-scale";
```

- [ ] **Step 2: 타입 체크로 검증**

Run (repo root): `npx tsc --noEmit -p packages/tokens/tsconfig.json`
Expected: 에러 없이 종료 (exit code 0)

- [ ] **Step 3: Commit**

```bash
git add packages/tokens/src/index.ts
git commit -m "feat(tokens): defaultRadiusTokens, defaultShadowTokens export 추가"
```

---

### Task 2: `docHelpers.tsx`에 `SpacingBar`/`RadiusSwatch`/`ShadowSwatch` 추가 + 테스트

**Files:**
- Modify: `packages/ui-v3/src/tokens/docHelpers.test.tsx`
- Modify: `packages/ui-v3/src/tokens/docHelpers.tsx`

**Interfaces:**
- Consumes: `docHelpers.tsx`에 이미 있는 `semanticColorRoles`, `grayPalette` import (변경 없음).
- Produces:
  - `SpacingBar({ name: string, value: string })` — `value`(예: `"4px"`)를 파싱해 4배 너비의 막대 렌더링. 막대 엘리먼트에 `data-testid="spacing-bar"`.
  - `RadiusSwatch({ name: string, value: string })` — 48×48 박스에 `borderRadius: value` 적용. 박스 엘리먼트에 `data-testid="radius-swatch"`.
  - `ShadowSwatch({ name: string, value: string })` — 64×64 박스에 `boxShadow: value` 적용. 박스 엘리먼트에 `data-testid="shadow-swatch"`.

  Task 3에서 `Layout.stories.tsx`가 이 3개를 `./docHelpers`에서 import해 사용한다.

- [ ] **Step 1: 실패하는 테스트 작성**

`packages/ui-v3/src/tokens/docHelpers.test.tsx`의 마지막(`describe("TextStyleSection", ...)` 블록 뒤)에 추가:

```tsx
describe("SpacingBar", () => {
  it("renders the name and value, and scales the bar width to 4x the px value", () => {
    renderWithUser(<SpacingBar name="x1" value="4px" />);
    expect(screen.getByText("x1")).toBeInTheDocument();
    expect(screen.getByText("4px")).toBeInTheDocument();
    expect(screen.getByTestId("spacing-bar")).toHaveStyle({ width: "16px" });
  });

  it("scales a larger value to a proportionally wider bar", () => {
    renderWithUser(<SpacingBar name="x6" value="24px" />);
    expect(screen.getByTestId("spacing-bar")).toHaveStyle({ width: "96px" });
  });
});

describe("RadiusSwatch", () => {
  it("renders the name, value, and applies the border-radius to the swatch", () => {
    renderWithUser(<RadiusSwatch name="sm" value="4px" />);
    expect(screen.getByText("sm")).toBeInTheDocument();
    expect(screen.getByText("4px")).toBeInTheDocument();
    expect(screen.getByTestId("radius-swatch")).toHaveStyle({ borderRadius: "4px" });
  });
});

describe("ShadowSwatch", () => {
  it("renders the name, value, and applies the box-shadow to the swatch", () => {
    renderWithUser(<ShadowSwatch name="raised" value="0 6px 16px rgba(17, 24, 39, 0.08)" />);
    expect(screen.getByText("raised")).toBeInTheDocument();
    expect(screen.getByText("0 6px 16px rgba(17, 24, 39, 0.08)")).toBeInTheDocument();
    expect(screen.getByTestId("shadow-swatch")).toHaveStyle({ boxShadow: "0 6px 16px rgba(17, 24, 39, 0.08)" });
  });
});
```

Also update the top import block in `docHelpers.test.tsx` to add the three new names:

```tsx
import {
  SectionTitle,
  ColorSwatchRow,
  PaletteStrip,
  PresetRow,
  ScaleTable,
  TextSpecimenRow,
  TextStyleSection,
  SpacingBar,
  RadiusSwatch,
  ShadowSwatch,
} from "./docHelpers";
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `cd packages/ui-v3 && npx vitest run src/tokens/docHelpers.test.tsx`
Expected: FAIL — `SpacingBar`/`RadiusSwatch`/`ShadowSwatch`가 `./docHelpers`에 없다는 에러 (아직 구현 전)

- [ ] **Step 3: `docHelpers.tsx`에 구현 추가**

`packages/ui-v3/src/tokens/docHelpers.tsx` 맨 끝(`TextStyleSection` 함수 뒤)에 추가:

```tsx

export function SpacingBar({ name, value }: { name: string; value: string }) {
  const px = parseFloat(value);
  const barWidth = px * 4;
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
      <div style={{ width: 60, fontSize: 13, fontFamily: "monospace", color: semanticColorRoles.text.heading }}>
        {name}
      </div>
      <div
        data-testid="spacing-bar"
        style={{ height: 16, width: barWidth, backgroundColor: semanticColorRoles.action.primary.default }}
      />
      <div style={{ marginLeft: 12, fontSize: 12, fontFamily: "monospace", color: semanticColorRoles.text.tertiary }}>
        {value}
      </div>
    </div>
  );
}

export function RadiusSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", marginRight: 24 }}>
      <div
        data-testid="radius-swatch"
        style={{ width: 48, height: 48, borderRadius: value, backgroundColor: semanticColorRoles.action.primary.default }}
      />
      <div style={{ fontSize: 12, color: semanticColorRoles.text.heading, marginTop: 8, fontFamily: "monospace" }}>
        {name}
      </div>
      <div style={{ fontSize: 11, color: semanticColorRoles.text.tertiary, fontFamily: "monospace" }}>{value}</div>
    </div>
  );
}

export function ShadowSwatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", marginRight: 32, padding: 16 }}>
      <div
        data-testid="shadow-swatch"
        style={{ width: 64, height: 64, backgroundColor: semanticColorRoles.surface.canvas, boxShadow: value }}
      />
      <div style={{ fontSize: 12, color: semanticColorRoles.text.heading, marginTop: 16, fontFamily: "monospace" }}>
        {name}
      </div>
      <div
        style={{
          fontSize: 10,
          color: semanticColorRoles.text.tertiary,
          fontFamily: "monospace",
          textAlign: "center",
          maxWidth: 160,
        }}
      >
        {value}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 테스트 실행 → 통과 확인**

Run: `npx vitest run src/tokens/docHelpers.test.tsx`
Expected: PASS — 기존 8개 + 새 4개 = 12개 `it` 전부 통과

- [ ] **Step 5: 타입 체크로 검증**

Run (repo root): `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`
Expected: 위 Global Constraints에 적은 베이스라인 `TS2742` 에러 1개만 남고, 새로운 에러는 추가되지 않음

- [ ] **Step 6: Commit**

```bash
git add packages/ui-v3/src/tokens/docHelpers.tsx packages/ui-v3/src/tokens/docHelpers.test.tsx
git commit -m "feat(ui-v3): docHelpers에 SpacingBar/RadiusSwatch/ShadowSwatch 추가"
```

---

### Task 3: `Layout.stories.tsx` 생성 — Spacing / Radius / Shadow 3개 스토리

**Files:**
- Create: `packages/ui-v3/src/tokens/Layout.stories.tsx`

**Interfaces:**
- Consumes: `@lds/tokens`의 `lightThemeClass`, `defaultSpacingTokens`, `defaultRadiusTokens`(Task 1), `defaultShadowTokens`(Task 1). Task 2의 `SectionTitle`, `SpacingBar`, `RadiusSwatch`, `ShadowSwatch`(from `./docHelpers`).
- Produces: `Spacing`, `Radius`, `Shadow` 스토리 export.

- [ ] **Step 1: 파일 생성**

`packages/ui-v3/src/tokens/Layout.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass, defaultSpacingTokens, defaultRadiusTokens, defaultShadowTokens } from "@lds/tokens";
import { SectionTitle, SpacingBar, RadiusSwatch, ShadowSwatch } from "./docHelpers";

/**
 * ## Layout
 *
 * spacing(`defaultSpacingTokens`) / radius(`defaultRadiusTokens`) / shadow(`defaultShadowTokens`) 토큰을
 * 실제 모양(막대 길이 / 둥근 모서리 박스 / 그림자 박스)으로 확인할 수 있습니다.
 */
const meta: Meta = {
  title: "Tokens/Layout",
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#ffffff" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Spacing: Story = {
  render: () => (
    <div>
      <SectionTitle>Spacing</SectionTitle>
      {Object.entries(defaultSpacingTokens).map(([key, value]) => (
        <SpacingBar key={key} name={key} value={value} />
      ))}
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div>
      <SectionTitle>Radius</SectionTitle>
      <div style={{ display: "flex" }}>
        {Object.entries(defaultRadiusTokens).map(([key, value]) => (
          <RadiusSwatch key={key} name={key} value={value} />
        ))}
      </div>
    </div>
  ),
};

export const Shadow: Story = {
  render: () => (
    <div>
      <SectionTitle>Shadow</SectionTitle>
      <div style={{ display: "flex" }}>
        {Object.entries(defaultShadowTokens).map(([key, value]) => (
          <ShadowSwatch key={key} name={key} value={value} />
        ))}
      </div>
    </div>
  ),
};
```

- [ ] **Step 2: 실제 타입 체크(임시 tsconfig)로 검증**

```bash
cd packages/ui-v3
cat > tsconfig.storycheck.json <<'EOF'
{
  "extends": "./tsconfig.json",
  "exclude": []
}
EOF
npx tsc --noEmit -p tsconfig.storycheck.json
rm tsconfig.storycheck.json
```

Expected: `Layout.stories.tsx`, `docHelpers.tsx` 관련 에러 없음 (다른 무관한 pre-existing 파일에 에러가 있어도 무시 — 이 플랜과 무관).

- [ ] **Step 3: 기본 타입 체크로도 검증**

Run (repo root): `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`
Expected: 위 Global Constraints에 적은 베이스라인 `TS2742` 에러 1개만 남고, 새로운 에러는 추가되지 않음

- [ ] **Step 4: Commit**

```bash
git add packages/ui-v3/src/tokens/Layout.stories.tsx
git commit -m "docs(ui-v3): Tokens/Layout — Spacing/Radius/Shadow 스토리 추가"
```

---

### Task 4: Storybook 실행 후 육안 검증 + 전체 테스트 (최종)

**Files:** 없음 (검증 전용 태스크)

**Interfaces:** 없음

- [ ] **Step 1: 전체 테스트 스위트 실행**

Run: `cd packages/ui-v3 && pnpm test`
Expected: 기존 48개 파일/390개 테스트 + 이번에 추가한 4개 테스트 = 48개 파일(동일 파일 수, `docHelpers.test.tsx`에 추가된 것) / 394개 테스트 통과, 실패 0

- [ ] **Step 2: Storybook 실행**

Run: `cd apps/storybook && pnpm storybook`
Expected: `http://localhost:6006`에서 정상 구동

- [ ] **Step 3: 사이드바 확인**

좌측 사이드바 `Tokens` 그룹 안에 `Colors`, `Typography`와 나란히 `Layout` 항목이 있는지 확인한다.

- [ ] **Step 4: Layout 페이지 확인**

`Tokens/Layout`을 열어 `Spacing`, `Radius`, `Shadow` 3개 스토리를 각각 클릭해:
- Spacing: x1~x6 막대가 순서대로 길어지는지, 라벨의 px 값이 맞는지
- Radius: sm/md/lg 3개 박스의 모서리 둥글기가 다른지
- Shadow: focus/raised/modal 3개 박스의 그림자가 서로 다르게 보이는지(그림자가 잘리지 않는지)

- [ ] **Step 5: 서버 종료**

Storybook 개발 서버를 `Ctrl+C`로 종료한다.

---

## Self-Review 결과

- **Spec coverage**: 설계 문서의 export 보강, 3개 헬퍼 컴포넌트(+테스트), `Layout.stories.tsx`의 3개 스토리 모두 Task 1~3에 매핑됨.
- **Placeholder scan**: 모든 스텝에 완전한 코드 포함, "TODO"/"similar to" 없음.
- **Type consistency**: `SpacingBar`/`RadiusSwatch`/`ShadowSwatch`가 모두 `{ name: string, value: string }` prop 시그니처로 통일되어 있고, Task 2(정의)와 Task 3(사용) 간 이름이 일치함. `defaultSpacingTokens`/`defaultRadiusTokens`/`defaultShadowTokens`가 전부 `Record<string, string>` 형태(as const 객체, 값이 전부 string)라 `Object.entries().map(([key,value]) => ...)` 패턴이 세 스토리 모두에서 동일하게 성립함을 확인.
