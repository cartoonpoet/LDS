# Tokens Storybook 문서 (Colors / Typography) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Storybook 사이드바에 `Tokens/Colors`, `Tokens/Typography` 문서 페이지를 추가해 컬러 토큰(semantic + primitive + 브랜드 프리셋)과 타이포그래피 토큰(scale + 13개 semantic text style 카테고리)을 시각적으로 확인할 수 있게 한다.

**Architecture:** 순수 문서 전용 Storybook 스토리 2개(`Colors.stories.tsx`, `Typography.stories.tsx`)를 새 폴더 `packages/ui-v3/src/tokens/`에 추가한다. 데이터는 새로 만들지 않고 기존 `@lds/tokens` export(`semanticColorRoles`, `grayPalette` 등, `textStyles`)를 그대로 읽어 렌더링한다. 컬러 스와치/텍스트 스펙시먼을 그리는 프레젠테이셔널 컴포넌트는 `docHelpers.tsx`라는 별도의 (스토리가 아닌) 모듈로 뽑아서 유닛 테스트를 붙이고, 두 `.stories.tsx` 파일은 그 헬퍼에 데이터만 꽂아 넣는 얇은 조립 코드로 유지한다.

**Tech Stack:** React, TypeScript, Storybook 8 (`@storybook/react-vite`, `addon-docs`), Vitest + `@testing-library/react` (기존 컴포넌트 테스트와 동일 스택), `@lds/tokens` 패키지.

## Global Constraints

- 새 스토리 파일은 `packages/ui-v3/src/**/*.stories.@(ts|tsx)`에 위치해야 Storybook에 스캔된다 (`apps/storybook/.storybook/main.ts:10`).
- `docHelpers.tsx`는 파일명이 `*.stories.tsx` 패턴이 아니므로 Storybook에 스캔되지 않는다 (의도된 동작 — 사이드바에 노출되면 안 되는 순수 렌더링 헬퍼이기 때문).
- Semantic Colors 섹션은 `semanticColorRoles`의 `surface` / `text` / `border` / `action` / `status` 5개 그룹만 다룬다. `button` / `field` / `table` / `badge` / `chip` / `alert`와 `status.scourt`는 제외한다 (컴포넌트 전용 토큰이라 각 컴포넌트 스토리에서 확인 가능).
- Primitive Colors 섹션은 `grayPalette` / `bluePalette` / `greenPalette` / `redPalette` / `yellowPalette` / `cyanPalette` / `darkPalette` / `opacityPalette`만 다룬다. `scourtPalette` / `bootstrapPalette` / `socialPalette`는 제외한다.
- Typography 섹션은 `textStyles`의 13개 카테고리(`display`, `heading`, `appTitle`, `appLabel`, `appBody`, `bodyParagraph`, `input`, `placeholder`, `label`, `button`, `menu`, `table`, `viewer`, `mail`) 전부를 포함한다 — 생략 없음.
- 테스트 정책: `docHelpers.tsx`의 각 컴포넌트는 `docHelpers.test.tsx`에서 Vitest + `@testing-library/react`(`renderWithUser`/`screen`, `packages/ui-v3/src/test/utils.tsx`)로 테스트한다. `Colors.stories.tsx` / `Typography.stories.tsx`는 데이터를 헬퍼에 꽂아 넣기만 하는 조립 코드이므로 별도 테스트 파일을 만들지 않는다 (로직은 이미 `docHelpers.test.tsx`가 커버) — 기존 `Theming.stories.tsx`도 스토리 파일 자체에는 테스트가 없는 것과 동일한 관례. 이 두 스토리 파일의 검증은 타입 체크 + 마지막 태스크의 Storybook 육안 확인으로 한다.
- `docHelpers.tsx`의 컴포넌트 chrome(제목/캡션 텍스트 색상, 스와치 테두리 등)은 이 저장소의 "컴포넌트 개발 시 하드코딩 금지, `@lds/tokens` 토큰 사용" 관례를 따라 리터럴 hex 대신 `semanticColorRoles.text.heading` / `semanticColorRoles.text.tertiary` / `grayPalette[200]` / `grayPalette[800]`을 사용한다. 단, 스와치가 시각적으로 표시해야 하는 대상 색상 자체(`Swatch.color`, `PaletteStrip`의 `steps[].value`, `PresetRow`의 `preset`/`fallback` 값)는 문서화 대상 데이터이므로 이 규칙에서 제외된다.
- 새 컬러 스와치의 값 라벨(hex/rgba 텍스트)은 런타임에 DOM에서 계산하지 않고 하드코딩한다 — `semanticColorRoles`의 값은 CSS 커스텀 프로퍼티 참조라 화면엔 정확히 칠해지지만 텍스트로 뽑아낼 수 없기 때문에, 라이트 테마 기본값(`defaultColorTokens`)을 기준으로 사람이 미리 적어둔 값을 표시한다. Primitive Colors와 Foundation Scale은 소스 상수를 `Object.entries()`로 그대로 순회하므로 하드코딩이 필요 없다.
- **베이스라인 타입 에러 주의**: 이 작업을 시작하기 전에도 `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`을 돌리면 기존 코드에서 아래 에러 1개가 이미 발생한다 (이 플랜과 무관, 손대지 않음):
  ```
  packages/ui-v3/src/test/utils.tsx(5,17): error TS2742: The inferred type of 'renderWithUser' cannot be named without a reference to '.pnpm/pretty-format@27.5.1/node_modules/pretty-format'. This is likely not portable. A type annotation is necessary.
  ```
  각 태스크의 타입 체크 스텝에서 "에러 없이 종료"라 적었더라도, 실제로는 **이 에러 1개만 남고 새 에러가 추가되지 않았는지**를 기준으로 판단한다.
- **베이스라인 테스트 실행**: 새 테스트를 추가하기 전, `cd packages/ui-v3 && pnpm test`가 기존에 몇 개 테스트를 통과시키는지 한 번 확인해 기준선으로 삼는다 (새 테스트 실패와 기존 실패를 혼동하지 않기 위함).

---

## 파일 구조

```
packages/tokens/src/index.ts                        ← Modify: letterSpacingScale export 추가
packages/ui-v3/src/components/Theming.stories.tsx   ← Modify: brands → export const brandPresets
packages/ui-v3/src/tokens/
  docHelpers.tsx                                     ← Create: SectionTitle, ColorSwatchRow, PaletteStrip, PresetRow, ScaleTable, TextSpecimenRow, TextStyleSection
  docHelpers.test.tsx                                ← Create
  Colors.stories.tsx                                 ← Create
  Typography.stories.tsx                             ← Create
```

---

### Task 1: `letterSpacingScale`를 `@lds/tokens`에서 export

**Files:**
- Modify: `packages/tokens/src/index.ts:5`

**Interfaces:**
- Produces: `letterSpacingScale` (타입 `typeof import("./foundation/typography-scale").letterSpacingScale`)를 `@lds/tokens`에서 import 가능하게 함. 이후 Task 7에서 사용.

- [ ] **Step 1: export 추가**

`packages/tokens/src/index.ts` 5번째 줄을 다음과 같이 수정한다.

```ts
export { fontFamilyTokens, fontSizeScale, lineHeightScale, fontWeightScale, letterSpacingScale } from "./foundation/typography-scale";
```

- [ ] **Step 2: 타입 체크로 검증**

Run: `cd /Users/junhoson/Documents/GitHub/LDS && npx tsc --noEmit -p packages/tokens/tsconfig.json`
Expected: 에러 없이 종료 (exit code 0) — 이 tsconfig(`packages/tokens`)에는 ui-v3의 베이스라인 에러가 해당하지 않는다

- [ ] **Step 3: Commit**

```bash
git add packages/tokens/src/index.ts
git commit -m "feat(tokens): letterSpacingScale export 추가"
```

---

### Task 2: `Theming.stories.tsx`의 브랜드 프리셋을 export

**Files:**
- Modify: `packages/ui-v3/src/components/Theming.stories.tsx:15`, `:230`

**Interfaces:**
- Produces: `export const brandPresets: { "Law.ai (기본)": {}; "Green Brand": {...}; "Purple Brand": {...}; "Orange Brand": {...}; "Scourt Blue": {...} }` — Task 6(`Colors.stories.tsx`의 Presets 스토리)에서 `import { brandPresets } from "../components/Theming.stories"`로 사용.

- [ ] **Step 1: `brands` const를 `export const brandPresets`로 이름 변경**

`packages/ui-v3/src/components/Theming.stories.tsx:15`:

```ts
export const brandPresets = {
  "Law.ai (기본)": {},
  "Green Brand": {
    color: {
      accentPrimary: "#16a34a",
      accentPrimaryHover: "#15803d",
      accentPrimaryActive: "#166534",
    },
  },
  "Purple Brand": {
    color: {
      accentPrimary: "#7c3aed",
      accentPrimaryHover: "#6d28d9",
      accentPrimaryActive: "#5b21b6",
    },
  },
  "Orange Brand": {
    color: {
      accentPrimary: "#ea580c",
      accentPrimaryHover: "#c2410c",
      accentPrimaryActive: "#9a3412",
    },
  },
  "Scourt Blue": {
    color: {
      accentPrimary: "#003399",
      accentPrimaryHover: "#002b80",
      accentPrimaryActive: "#001f5c",
    },
  },
} as const;
```

- [ ] **Step 2: 참조부 수정**

`packages/ui-v3/src/components/Theming.stories.tsx:230` (원래 `{Object.entries(brands).map(([name, themeInput]) => {`)를 수정:

```tsx
      {Object.entries(brandPresets).map(([name, themeInput]) => {
```

- [ ] **Step 3: 타입 체크로 검증**

Run: `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`
Expected: 위 Global Constraints에 적은 베이스라인 `TS2742` 에러 1개만 남고, 새로운 에러는 추가되지 않음

- [ ] **Step 4: Commit**

```bash
git add packages/ui-v3/src/components/Theming.stories.tsx
git commit -m "refactor(ui-v3): 브랜드 프리셋 데이터를 brandPresets로 export"
```

---

### Task 3: `docHelpers.tsx` 생성 — 토큰 문서용 렌더링 헬퍼 + 테스트

**Files:**
- Create: `packages/ui-v3/src/tokens/docHelpers.test.tsx`
- Create: `packages/ui-v3/src/tokens/docHelpers.tsx`

**Interfaces:**
- Consumes: `@lds/tokens`의 `semanticColorRoles`, `grayPalette` (컴포넌트 chrome 색상 전용 — 색상 하드코딩 금지 정책 때문. 스와치가 표시해야 하는 실제 색상 값 자체는 여전히 호출부에서 `Swatch`/`steps`/`preset` prop으로 전달받는다).
- Produces:
  - `type Swatch = { label: string; color: string; value: string }`
  - `type TextStyleValue = { fontFamily: string; fontSize: string; fontWeight: string; lineHeight: string; letterSpacing: string }`
  - `type BrandPresetInput = { color?: { accentPrimary?: string; accentPrimaryHover?: string; accentPrimaryActive?: string } }`
  - `SectionTitle({ children: string })`
  - `ColorSwatchRow({ name: string, swatches: Swatch[] })`
  - `PaletteStrip({ name: string, steps: { key: string; value: string }[] })`
  - `PresetRow({ name: string, preset: BrandPresetInput, fallback: { accentPrimary: string; accentPrimaryHover: string; accentPrimaryActive: string } })`
  - `ScaleTable({ title: string, rows: { key: string; value: string }[] })`
  - `TextSpecimenRow({ name: string, value: TextStyleValue })`
  - `TextStyleSection({ title: string, styles: Record<string, TextStyleValue> })`

  Task 4, 5, 6, 7, 8에서 `Colors.stories.tsx` / `Typography.stories.tsx`가 이 모든 export를 사용한다.

- [ ] **Step 1: 실패하는 테스트 작성**

`packages/ui-v3/src/tokens/docHelpers.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { renderWithUser, screen } from "../test/utils";
import {
  SectionTitle,
  ColorSwatchRow,
  PaletteStrip,
  PresetRow,
  ScaleTable,
  TextSpecimenRow,
  TextStyleSection,
} from "./docHelpers";

describe("SectionTitle", () => {
  it("renders the given text as a heading", () => {
    renderWithUser(<SectionTitle>Surface</SectionTitle>);
    expect(screen.getByRole("heading", { name: "Surface" })).toBeInTheDocument();
  });
});

describe("ColorSwatchRow", () => {
  it("renders the token name and every swatch's label and value", () => {
    renderWithUser(
      <ColorSwatchRow
        name="action.primary"
        swatches={[
          { label: "default", color: "#2151ec", value: "#2151ec" },
          { label: "hover", color: "#2151ec", value: "#2151ec" },
        ]}
      />
    );
    expect(screen.getByText("action.primary")).toBeInTheDocument();
    expect(screen.getByText("default")).toBeInTheDocument();
    expect(screen.getByText("hover")).toBeInTheDocument();
    expect(screen.getAllByText("#2151ec")).toHaveLength(2);
  });
});

describe("PaletteStrip", () => {
  it("renders one column per step with its key and value", () => {
    renderWithUser(
      <PaletteStrip
        name="grayPalette"
        steps={[
          { key: "0", value: "#ffffff" },
          { key: "50", value: "#f2f4f6" },
        ]}
      />
    );
    expect(screen.getByText("grayPalette")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("#ffffff")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("#f2f4f6")).toBeInTheDocument();
  });
});

describe("PresetRow", () => {
  const fallback = {
    accentPrimary: "#2151ec",
    accentPrimaryHover: "#2151ec",
    accentPrimaryActive: "#1739a5",
  };

  it("uses the preset's own colors when provided", () => {
    renderWithUser(
      <PresetRow
        name="Green Brand"
        preset={{ color: { accentPrimary: "#16a34a", accentPrimaryHover: "#15803d", accentPrimaryActive: "#166534" } }}
        fallback={fallback}
      />
    );
    expect(screen.getByText("Green Brand")).toBeInTheDocument();
    expect(screen.getByText("#16a34a")).toBeInTheDocument();
    expect(screen.getByText("#15803d")).toBeInTheDocument();
    expect(screen.getByText("#166534")).toBeInTheDocument();
  });

  it("falls back to the default colors when the preset has no override", () => {
    renderWithUser(<PresetRow name="Law.ai (기본)" preset={{}} fallback={fallback} />);
    expect(screen.getByText("Law.ai (기본)")).toBeInTheDocument();
    expect(screen.getAllByText("#2151ec")).toHaveLength(2);
    expect(screen.getByText("#1739a5")).toBeInTheDocument();
  });
});

describe("ScaleTable", () => {
  it("renders the title and every row's key/value", () => {
    renderWithUser(
      <ScaleTable
        title="fontSize"
        rows={[
          { key: "12", value: "12px" },
          { key: "14", value: "14px" },
        ]}
      />
    );
    expect(screen.getByText("fontSize")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("12px")).toBeInTheDocument();
  });
});

describe("TextSpecimenRow", () => {
  it("renders the style name, its meta info, and applies the style to the sample text", () => {
    renderWithUser(
      <TextSpecimenRow
        name="h1"
        value={{
          fontFamily: '"Pretendard", sans-serif',
          fontSize: "28px",
          fontWeight: "700",
          lineHeight: "1.21",
          letterSpacing: "normal",
        }}
      />
    );
    expect(screen.getByText("h1")).toBeInTheDocument();
    expect(screen.getByText("28px · 700 · lh 1.21 · ls normal")).toBeInTheDocument();
    const sample = screen.getByText("Law Design System 컴포넌트 라이브러리");
    expect(sample).toHaveStyle({ fontSize: "28px", fontWeight: "700" });
  });
});

describe("TextStyleSection", () => {
  it("renders one specimen row per style key", () => {
    renderWithUser(
      <TextStyleSection
        title="Heading"
        styles={{
          h1: { fontFamily: "Pretendard", fontSize: "28px", fontWeight: "700", lineHeight: "1.21", letterSpacing: "normal" },
          h2: { fontFamily: "Pretendard", fontSize: "24px", fontWeight: "700", lineHeight: "1.21", letterSpacing: "normal" },
        }}
      />
    );
    expect(screen.getByRole("heading", { name: "Heading" })).toBeInTheDocument();
    expect(screen.getByText("h1")).toBeInTheDocument();
    expect(screen.getByText("h2")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행 → 실패 확인**

Run: `cd packages/ui-v3 && npx vitest run src/tokens/docHelpers.test.tsx`
Expected: FAIL — `./docHelpers` 모듈을 찾을 수 없다는 에러 (파일이 아직 없음)

- [ ] **Step 3: `docHelpers.tsx` 구현**

`packages/ui-v3/src/tokens/docHelpers.tsx`:

```tsx
import { semanticColorRoles, grayPalette } from "@lds/tokens";

export type Swatch = { label: string; color: string; value: string };

export type TextStyleValue = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
};

export type BrandPresetInput = {
  color?: { accentPrimary?: string; accentPrimaryHover?: string; accentPrimaryActive?: string };
};

export function SectionTitle({ children }: { children: string }) {
  return (
    <h3 style={{ fontSize: 16, fontWeight: 700, color: semanticColorRoles.text.heading, margin: "32px 0 16px" }}>
      {children}
    </h3>
  );
}

export function ColorSwatchRow({ name, swatches }: { name: string; swatches: Swatch[] }) {
  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      <div style={{ width: 220, fontSize: 13, fontFamily: "monospace", color: semanticColorRoles.text.heading, paddingTop: 8 }}>
        {name}
      </div>
      <div style={{ display: "flex", flex: 1, gap: 1 }}>
        {swatches.map((s) => (
          <div key={s.label} style={{ flex: 1 }}>
            <div style={{ height: 48, backgroundColor: s.color, border: `1px solid ${grayPalette[200]}` }} />
            <div style={{ fontSize: 11, color: semanticColorRoles.text.tertiary, padding: "4px 0", textAlign: "center" }}>
              <div>{s.label}</div>
              <div style={{ fontFamily: "monospace" }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PaletteStrip({ name, steps }: { name: string; steps: { key: string; value: string }[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontFamily: "monospace", color: semanticColorRoles.text.heading, marginBottom: 4 }}>{name}</div>
      <div style={{ display: "flex", gap: 1 }}>
        {steps.map((s) => (
          <div key={s.key} style={{ flex: 1 }}>
            <div style={{ height: 40, backgroundColor: s.value, border: `1px solid ${grayPalette[200]}` }} />
            <div style={{ fontSize: 10, color: semanticColorRoles.text.tertiary, textAlign: "center", padding: "4px 0" }}>
              <div>{s.key}</div>
              <div style={{ fontFamily: "monospace" }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PresetRow({
  name,
  preset,
  fallback,
}: {
  name: string;
  preset: BrandPresetInput;
  fallback: { accentPrimary: string; accentPrimaryHover: string; accentPrimaryActive: string };
}) {
  const primary = preset.color?.accentPrimary ?? fallback.accentPrimary;
  const hover = preset.color?.accentPrimaryHover ?? fallback.accentPrimaryHover;
  const active = preset.color?.accentPrimaryActive ?? fallback.accentPrimaryActive;
  const states = [
    { label: "default", color: primary },
    { label: "hover", color: hover },
    { label: "active", color: active },
  ];
  return (
    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 16 }}>
      <div style={{ width: 160, fontSize: 14, color: semanticColorRoles.text.heading, paddingTop: 8 }}>{name}</div>
      <div style={{ display: "flex", gap: 1 }}>
        {states.map((s) => (
          <div key={s.label} style={{ width: 100 }}>
            <div style={{ height: 40, backgroundColor: s.color, border: `1px solid ${grayPalette[200]}` }} />
            <div style={{ fontSize: 11, color: semanticColorRoles.text.tertiary, textAlign: "center", padding: "4px 0" }}>
              <div>{s.label}</div>
              <div style={{ fontFamily: "monospace" }}>{s.color}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScaleTable({ title, rows }: { title: string; rows: { key: string; value: string }[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: semanticColorRoles.text.heading, margin: "0 0 8px" }}>{title}</h4>
      <table style={{ borderCollapse: "collapse", fontSize: 12, color: grayPalette[800] }}>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td style={{ padding: "2px 12px 2px 0", fontFamily: "monospace" }}>{r.key}</td>
              <td style={{ padding: "2px 0", fontFamily: "monospace" }}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TextSpecimenRow({ name, value }: { name: string; value: TextStyleValue }) {
  return (
    <div style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${grayPalette[200]}`, padding: "12px 0" }}>
      <div style={{ width: 220, flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontFamily: "monospace", color: semanticColorRoles.text.heading }}>{name}</div>
        <div style={{ fontSize: 11, color: semanticColorRoles.text.tertiary }}>
          {value.fontSize} · {value.fontWeight} · lh {value.lineHeight} · ls {value.letterSpacing}
        </div>
      </div>
      <div
        style={{
          fontFamily: value.fontFamily,
          fontSize: value.fontSize,
          fontWeight: value.fontWeight,
          lineHeight: value.lineHeight,
          letterSpacing: value.letterSpacing,
          color: semanticColorRoles.text.heading,
        }}
      >
        Law Design System 컴포넌트 라이브러리
      </div>
    </div>
  );
}

export function TextStyleSection({ title, styles }: { title: string; styles: Record<string, TextStyleValue> }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle>{title}</SectionTitle>
      {Object.entries(styles).map(([key, value]) => (
        <TextSpecimenRow key={key} name={key} value={value} />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: 테스트 실행 → 통과 확인**

Run: `npx vitest run src/tokens/docHelpers.test.tsx`
Expected: PASS — 8개 `it` 전부 통과 (SectionTitle 1, ColorSwatchRow 1, PaletteStrip 1, PresetRow 2, ScaleTable 1, TextSpecimenRow 1, TextStyleSection 1)

- [ ] **Step 5: 타입 체크로 검증**

Run: `cd /Users/junhoson/Documents/GitHub/LDS && npx tsc --noEmit -p packages/ui-v3/tsconfig.json`
Expected: 위 Global Constraints에 적은 베이스라인 `TS2742` 에러 1개만 남고, 새로운 에러는 추가되지 않음

- [ ] **Step 6: Commit**

```bash
git add packages/ui-v3/src/tokens/docHelpers.tsx packages/ui-v3/src/tokens/docHelpers.test.tsx
git commit -m "feat(ui-v3): 토큰 문서용 렌더링 헬퍼(docHelpers) 추가"
```

---

### Task 4: `Colors.stories.tsx` 생성 — Semantic Colors

**Files:**
- Create: `packages/ui-v3/src/tokens/Colors.stories.tsx`

**Interfaces:**
- Consumes: `@lds/tokens`의 `lightThemeClass`, `semanticColorRoles`. Task 3의 `ColorSwatchRow`, `SectionTitle`, `Swatch` (from `./docHelpers`).
- Produces: `Story` 타입 alias, `SemanticColors` 스토리 export. Task 5, 6에서 같은 파일에 스토리 추가.

- [ ] **Step 1: 파일 생성**

`packages/ui-v3/src/tokens/Colors.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass, semanticColorRoles } from "@lds/tokens";
import { SectionTitle, ColorSwatchRow, type Swatch } from "./docHelpers";

/* ─── Semantic Colors 데이터 ─── */
/* value 라벨은 라이트 테마 기본값(defaultColorTokens) 기준 하드코딩 */

const surfaceRows: { name: string; swatches: Swatch[] }[] = [
  { name: "surface.page", swatches: [{ label: "base", color: semanticColorRoles.surface.page, value: "#f2f4f6" }] },
  { name: "surface.canvas", swatches: [{ label: "base", color: semanticColorRoles.surface.canvas, value: "#ffffff" }] },
  { name: "surface.subtle", swatches: [{ label: "base", color: semanticColorRoles.surface.subtle, value: "#f1f4f9" }] },
  { name: "surface.raised", swatches: [{ label: "base", color: semanticColorRoles.surface.raised, value: "#eeeff2" }] },
  { name: "surface.disabled", swatches: [{ label: "base", color: semanticColorRoles.surface.disabled, value: "#eeeff2" }] },
  { name: "surface.tableHeader", swatches: [{ label: "gray.100", color: semanticColorRoles.surface.tableHeader, value: "#f1f4f9" }] },
  { name: "surface.backdrop", swatches: [{ label: "base", color: semanticColorRoles.surface.backdrop, value: "rgba(0, 0, 0, 0.2)" }] },
];

const textRows: { name: string; swatches: Swatch[] }[] = [
  { name: "text.primary", swatches: [{ label: "base", color: semanticColorRoles.text.primary, value: "#000000" }] },
  { name: "text.heading", swatches: [{ label: "base", color: semanticColorRoles.text.heading, value: "#11152a" }] },
  { name: "text.secondary", swatches: [{ label: "base", color: semanticColorRoles.text.secondary, value: "#000000" }] },
  { name: "text.tertiary", swatches: [{ label: "base", color: semanticColorRoles.text.tertiary, value: "#626f86" }] },
  { name: "text.disabled", swatches: [{ label: "base", color: semanticColorRoles.text.disabled, value: "#d1d1d1" }] },
  { name: "text.inverse", swatches: [{ label: "base", color: semanticColorRoles.text.inverse, value: "#ffffff" }] },
  { name: "text.placeholder", swatches: [{ label: "base", color: semanticColorRoles.text.placeholder, value: "#626f86" }] },
];

const borderRows: { name: string; swatches: Swatch[] }[] = [
  { name: "border.subtle", swatches: [{ label: "base", color: semanticColorRoles.border.subtle, value: "#cfd5e1" }] },
  { name: "border.default", swatches: [{ label: "base", color: semanticColorRoles.border.default, value: "#cfd5e1" }] },
  { name: "border.strong", swatches: [{ label: "base", color: semanticColorRoles.border.strong, value: "#9ea7b8" }] },
  { name: "border.focus", swatches: [{ label: "base", color: semanticColorRoles.border.focus, value: "#2151ec" }] },
  { name: "border.input", swatches: [{ label: "gray.500", color: semanticColorRoles.border.input, value: "#9ea7b8" }] },
  { name: "border.primary", swatches: [{ label: "base", color: semanticColorRoles.border.primary, value: "#2151ec" }] },
  { name: "border.secondary", swatches: [{ label: "base", color: semanticColorRoles.border.secondary, value: "#82868b" }] },
  { name: "border.success", swatches: [{ label: "base", color: semanticColorRoles.border.success, value: "#28c76f" }] },
  { name: "border.danger", swatches: [{ label: "base", color: semanticColorRoles.border.danger, value: "#ea5455" }] },
  { name: "border.warning", swatches: [{ label: "base", color: semanticColorRoles.border.warning, value: "#f0af23" }] },
  { name: "border.info", swatches: [{ label: "base", color: semanticColorRoles.border.info, value: "#00cfe8" }] },
  { name: "border.dark", swatches: [{ label: "base", color: semanticColorRoles.border.dark, value: "#4b4b4b" }] },
];

const actionRows: { name: string; swatches: Swatch[] }[] = [
  {
    name: "action.primary",
    swatches: [
      { label: "default", color: semanticColorRoles.action.primary.default, value: "#2151ec" },
      { label: "hover", color: semanticColorRoles.action.primary.hover, value: "#2151ec" },
      { label: "active", color: semanticColorRoles.action.primary.active, value: "#1739a5" },
      { label: "subtle", color: semanticColorRoles.action.primary.subtle, value: "rgba(33, 81, 236, 0.12)" },
      { label: "subtleActive", color: semanticColorRoles.action.primary.subtleActive, value: "rgba(23, 57, 165, 0.12)" },
    ],
  },
  {
    name: "action.secondary",
    swatches: [
      { label: "default", color: semanticColorRoles.action.secondary.default, value: "#82868b" },
      { label: "hover", color: semanticColorRoles.action.secondary.hover, value: "#82868b" },
      { label: "active", color: semanticColorRoles.action.secondary.active, value: "#75797e" },
      { label: "subtle", color: semanticColorRoles.action.secondary.subtle, value: "rgba(130, 134, 139, 0.12)" },
    ],
  },
];

const statusRows: { name: string; swatches: Swatch[] }[] = [
  {
    name: "status.success",
    swatches: [
      { label: "text", color: semanticColorRoles.status.success.text, value: "#006d38" },
      { label: "fill", color: semanticColorRoles.status.success.fill, value: "rgba(39, 194, 129, 0.12)" },
      { label: "border", color: semanticColorRoles.status.success.border, value: "#28c76f" },
    ],
  },
  {
    name: "status.danger",
    swatches: [
      { label: "text", color: semanticColorRoles.status.danger.text, value: "#b12a30" },
      { label: "fill", color: semanticColorRoles.status.danger.fill, value: "rgba(234, 59, 59, 0.12)" },
      { label: "border", color: semanticColorRoles.status.danger.border, value: "#ea5455" },
    ],
  },
  {
    name: "status.warning",
    swatches: [
      { label: "text", color: semanticColorRoles.status.warning.text, value: "#7d5800" },
      { label: "fill", color: semanticColorRoles.status.warning.fill, value: "rgba(240, 175, 35, 0.12)" },
      { label: "border", color: semanticColorRoles.status.warning.border, value: "#f0af23" },
    ],
  },
  {
    name: "status.info",
    swatches: [
      { label: "text", color: semanticColorRoles.status.info.text, value: "#006876" },
      { label: "fill", color: semanticColorRoles.status.info.fill, value: "rgba(0, 207, 232, 0.12)" },
      { label: "border", color: semanticColorRoles.status.info.border, value: "#00cfe8" },
    ],
  },
  {
    name: "status.dark",
    swatches: [
      { label: "text", color: semanticColorRoles.status.dark.text, value: "#343434" },
      { label: "fill", color: semanticColorRoles.status.dark.fill, value: "rgba(76, 84, 105, 0.12)" },
      { label: "border", color: semanticColorRoles.status.dark.border, value: "#4c5469" },
    ],
  },
];

/* ─── Meta ─── */

/**
 * ## Colors
 *
 * LDS 컬러 토큰 문서입니다. **Semantic Colors**는 컴포넌트가 공통으로 참조하는 의미 기반 역할(surface/text/border/action/status)이고,
 * **Primitive Colors**는 그 밑단의 원시 팔레트입니다.
 */
const meta: Meta = {
  title: "Tokens/Colors",
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

export const SemanticColors: Story = {
  render: () => (
    <div>
      <SectionTitle>Surface</SectionTitle>
      {surfaceRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
      <SectionTitle>Text</SectionTitle>
      {textRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
      <SectionTitle>Border</SectionTitle>
      {borderRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
      <SectionTitle>Action</SectionTitle>
      {actionRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
      <SectionTitle>Status</SectionTitle>
      {statusRows.map((r) => (
        <ColorSwatchRow key={r.name} name={r.name} swatches={r.swatches} />
      ))}
    </div>
  ),
};
```

- [ ] **Step 2: 타입 체크로 검증**

Run: `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`
Expected: 위 Global Constraints에 적은 베이스라인 `TS2742` 에러 1개만 남고, 새로운 에러는 추가되지 않음

- [ ] **Step 3: Commit**

```bash
git add packages/ui-v3/src/tokens/Colors.stories.tsx
git commit -m "docs(ui-v3): Tokens/Colors — Semantic Colors 스토리 추가"
```

---

### Task 5: `Colors.stories.tsx`에 Primitive Colors 스토리 추가

**Files:**
- Modify: `packages/ui-v3/src/tokens/Colors.stories.tsx`

**Interfaces:**
- Consumes: Task 3의 `PaletteStrip` (from `./docHelpers`). `@lds/tokens`의 `grayPalette`, `bluePalette`, `greenPalette`, `redPalette`, `yellowPalette`, `cyanPalette`, `darkPalette`, `opacityPalette`.
- Produces: `PrimitiveColors` 스토리.

- [ ] **Step 1: import 확장**

파일 상단 import를 다음으로 교체:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  lightThemeClass,
  semanticColorRoles,
  grayPalette,
  bluePalette,
  greenPalette,
  redPalette,
  yellowPalette,
  cyanPalette,
  darkPalette,
  opacityPalette,
} from "@lds/tokens";
import { SectionTitle, ColorSwatchRow, PaletteStrip, type Swatch } from "./docHelpers";
```

- [ ] **Step 2: 데이터 + 스토리 추가**

`statusRows` 정의 바로 아래(Meta 정의 위)에 추가:

```tsx
const grayPaletteSteps = Object.entries(grayPalette).map(([key, value]) => ({ key, value }));
const bluePaletteSteps = Object.entries(bluePalette).map(([key, value]) => ({ key, value }));
const greenPaletteSteps = Object.entries(greenPalette).map(([key, value]) => ({ key, value }));
const redPaletteSteps = Object.entries(redPalette).map(([key, value]) => ({ key, value }));
const yellowPaletteSteps = Object.entries(yellowPalette).map(([key, value]) => ({ key, value }));
const cyanPaletteSteps = Object.entries(cyanPalette).map(([key, value]) => ({ key, value }));
const darkPaletteSteps = Object.entries(darkPalette).map(([key, value]) => ({ key, value }));
const opacityPaletteSteps = Object.entries(opacityPalette).map(([key, value]) => ({ key, value }));
```

`export const SemanticColors: Story = { ... };` 바로 아래에 추가:

```tsx
export const PrimitiveColors: Story = {
  render: () => (
    <div>
      <PaletteStrip name="grayPalette" steps={grayPaletteSteps} />
      <PaletteStrip name="bluePalette" steps={bluePaletteSteps} />
      <PaletteStrip name="greenPalette" steps={greenPaletteSteps} />
      <PaletteStrip name="redPalette" steps={redPaletteSteps} />
      <PaletteStrip name="yellowPalette" steps={yellowPaletteSteps} />
      <PaletteStrip name="cyanPalette" steps={cyanPaletteSteps} />
      <PaletteStrip name="darkPalette" steps={darkPaletteSteps} />
      <PaletteStrip name="opacityPalette" steps={opacityPaletteSteps} />
    </div>
  ),
};
```

- [ ] **Step 3: 타입 체크로 검증**

Run: `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`
Expected: 위 Global Constraints에 적은 베이스라인 `TS2742` 에러 1개만 남고, 새로운 에러는 추가되지 않음

- [ ] **Step 4: Commit**

```bash
git add packages/ui-v3/src/tokens/Colors.stories.tsx
git commit -m "docs(ui-v3): Tokens/Colors — Primitive Colors 스토리 추가"
```

---

### Task 6: `Colors.stories.tsx`에 Presets 스토리 추가

**Files:**
- Modify: `packages/ui-v3/src/tokens/Colors.stories.tsx`

**Interfaces:**
- Consumes: Task 2의 `brandPresets` (from `../components/Theming.stories`). Task 3의 `PresetRow` (from `./docHelpers`). `@lds/tokens`의 `defaultColorTokens`.
- Produces: `Presets` 스토리.

- [ ] **Step 1: import 확장**

`@lds/tokens` import에 `defaultColorTokens` 추가하고, `brandPresets`·`PresetRow` import 라인 추가:

```tsx
import {
  lightThemeClass,
  semanticColorRoles,
  grayPalette,
  bluePalette,
  greenPalette,
  redPalette,
  yellowPalette,
  cyanPalette,
  darkPalette,
  opacityPalette,
  defaultColorTokens,
} from "@lds/tokens";
import { SectionTitle, ColorSwatchRow, PaletteStrip, PresetRow, type Swatch } from "./docHelpers";
import { brandPresets } from "../components/Theming.stories";
```

- [ ] **Step 2: `Presets` 스토리 추가**

`export const PrimitiveColors: Story = { ... };` 바로 아래에 추가:

```tsx
export const Presets: Story = {
  render: () => (
    <div>
      <p style={{ fontSize: 13, color: "#626f86", marginBottom: 16 }}>
        컴포넌트에 실제 적용된 예시는 <code>Guide/Theming → BrandComparison</code>에서 확인하세요.
      </p>
      {Object.entries(brandPresets).map(([name, preset]) => (
        <PresetRow key={name} name={name} preset={preset} fallback={defaultColorTokens} />
      ))}
    </div>
  ),
};
```

- [ ] **Step 3: 타입 체크로 검증**

Run: `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`
Expected: 위 Global Constraints에 적은 베이스라인 `TS2742` 에러 1개만 남고, 새로운 에러는 추가되지 않음

- [ ] **Step 4: Commit**

```bash
git add packages/ui-v3/src/tokens/Colors.stories.tsx
git commit -m "docs(ui-v3): Tokens/Colors — Presets 스토리 추가"
```

---

### Task 7: `Typography.stories.tsx` 생성 — Overview + Foundation Scale

**Files:**
- Create: `packages/ui-v3/src/tokens/Typography.stories.tsx`

**Interfaces:**
- Consumes: `@lds/tokens`의 `lightThemeClass`, `fontSizeScale`, `fontWeightScale`, `lineHeightScale`, `letterSpacingScale` (Task 1에서 export 추가됨), `textStyles`. Task 3의 `SectionTitle`, `ScaleTable` (from `./docHelpers`).
- Produces: `Story` 타입 alias, `Overview` 스토리 export. Task 8에서 같은 파일에 스토리 추가.

- [ ] **Step 1: 파일 생성**

`packages/ui-v3/src/tokens/Typography.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import {
  lightThemeClass,
  fontSizeScale,
  fontWeightScale,
  lineHeightScale,
  letterSpacingScale,
  textStyles,
} from "@lds/tokens";
import { SectionTitle, ScaleTable } from "./docHelpers";

/* ─── Foundation Scale 데이터 ─── */

const fontSizeRows = Object.entries(fontSizeScale).map(([key, value]) => ({ key, value }));
const fontWeightRows = Object.entries(fontWeightScale).map(([key, value]) => ({ key, value }));
const lineHeightRows = Object.entries(lineHeightScale).map(([key, value]) => ({ key, value }));
const letterSpacingRows = Object.entries(letterSpacingScale).map(([key, value]) => ({ key, value }));

/* ─── Meta ─── */

/**
 * ## Typography
 *
 * LDS는 기본 UI 폰트로 **Pretendard**를 사용하고, 문서 뷰어·메일 컨텍스트에서는 **Malgun Gothic**을 사용합니다.
 * `textStyles`에 정의된 13개 카테고리(display, heading, appTitle, appLabel, appBody, bodyParagraph, input,
 * placeholder, label, button, menu, table, viewer, mail)를 실제 스타일이 적용된 텍스트로 확인할 수 있습니다.
 */
const meta: Meta = {
  title: "Tokens/Typography",
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

export const Overview: Story = {
  render: () => (
    <div>
      <p style={{ fontSize: 13, color: "#626f86", marginBottom: 24 }}>
        기본 UI 폰트: <strong>Pretendard</strong> · 뷰어/메일 전용: <strong>Malgun Gothic</strong>
      </p>
      <SectionTitle>Foundation Scale</SectionTitle>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <ScaleTable title="fontSize" rows={fontSizeRows} />
        <ScaleTable title="fontWeight" rows={fontWeightRows} />
        <ScaleTable title="lineHeight" rows={lineHeightRows} />
        <ScaleTable title="letterSpacing" rows={letterSpacingRows} />
      </div>
    </div>
  ),
};
```

- [ ] **Step 2: 타입 체크로 검증**

Run: `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`
Expected: 위 Global Constraints에 적은 베이스라인 `TS2742` 에러 1개만 남고, 새로운 에러는 추가되지 않음

- [ ] **Step 3: Commit**

```bash
git add packages/ui-v3/src/tokens/Typography.stories.tsx
git commit -m "docs(ui-v3): Tokens/Typography — Overview + Foundation Scale 스토리 추가"
```

---

### Task 8: `Typography.stories.tsx`에 13개 Semantic Text Style 스토리 추가

**Files:**
- Modify: `packages/ui-v3/src/tokens/Typography.stories.tsx`

**Interfaces:**
- Consumes: Task 3의 `TextStyleSection` (from `./docHelpers`), `textStyles` (전체 13개 카테고리: `display`, `heading`, `appTitle`, `appLabel`, `appBody`, `bodyParagraph`, `input`, `placeholder`, `label`, `button`, `menu`, `table`, `viewer`, `mail` — 각각 `Record<string, TextStyleValue>` 형태).
- Produces: `Display`, `Heading`, `AppTitle`, `AppLabel`, `AppBody`, `BodyParagraph`, `Input`, `Placeholder`, `Label`, `Button`, `Menu`, `Table`, `Viewer`, `Mail` 스토리.

- [ ] **Step 1: import에 `TextStyleSection` 추가**

```tsx
import { SectionTitle, ScaleTable, TextStyleSection } from "./docHelpers";
```

- [ ] **Step 2: 13개 스토리 추가**

`export const Overview: Story = { ... };` 바로 아래에 추가:

```tsx
export const Display: Story = {
  render: () => <TextStyleSection title="Display" styles={textStyles.display} />,
};

export const Heading: Story = {
  render: () => <TextStyleSection title="Heading" styles={textStyles.heading} />,
};

export const AppTitle: Story = {
  render: () => <TextStyleSection title="App Title" styles={textStyles.appTitle} />,
};

export const AppLabel: Story = {
  render: () => <TextStyleSection title="App Label" styles={textStyles.appLabel} />,
};

export const AppBody: Story = {
  render: () => <TextStyleSection title="App Body" styles={textStyles.appBody} />,
};

export const BodyParagraph: Story = {
  render: () => <TextStyleSection title="Body Paragraph" styles={textStyles.bodyParagraph} />,
};

export const Input: Story = {
  render: () => <TextStyleSection title="Input" styles={textStyles.input} />,
};

export const Placeholder: Story = {
  render: () => <TextStyleSection title="Placeholder" styles={textStyles.placeholder} />,
};

export const Label: Story = {
  render: () => <TextStyleSection title="Label" styles={textStyles.label} />,
};

export const Button: Story = {
  render: () => <TextStyleSection title="Button" styles={textStyles.button} />,
};

export const Menu: Story = {
  render: () => <TextStyleSection title="Menu" styles={textStyles.menu} />,
};

export const Table: Story = {
  render: () => <TextStyleSection title="Table" styles={textStyles.table} />,
};

export const Viewer: Story = {
  render: () => <TextStyleSection title="Viewer" styles={textStyles.viewer} />,
};

export const Mail: Story = {
  render: () => <TextStyleSection title="Mail" styles={textStyles.mail} />,
};
```

- [ ] **Step 3: 타입 체크로 검증**

Run: `npx tsc --noEmit -p packages/ui-v3/tsconfig.json`
Expected: 위 Global Constraints에 적은 베이스라인 `TS2742` 에러 1개만 남고, 새로운 에러는 추가되지 않음

- [ ] **Step 4: Commit**

```bash
git add packages/ui-v3/src/tokens/Typography.stories.tsx
git commit -m "docs(ui-v3): Tokens/Typography — 13개 Semantic Text Style 스토리 추가"
```

---

### Task 9: 전체 테스트 실행 + Storybook 육안 검증 (최종)

**Files:** 없음 (검증 전용 태스크)

**Interfaces:** 없음

- [ ] **Step 1: 전체 테스트 스위트 실행**

Run: `cd packages/ui-v3 && pnpm test`
Expected: 기존 테스트 전부 + `docHelpers.test.tsx`의 8개 테스트까지 모두 통과 (실패 0)

- [ ] **Step 2: Storybook 실행**

Run: `cd apps/storybook && pnpm storybook`
Expected: 로컬 서버가 뜨고 (기본 `http://localhost:6006`) 브라우저가 자동으로 열리거나 URL이 출력됨

- [ ] **Step 3: 사이드바 확인**

브라우저에서 좌측 사이드바에 `Tokens` 그룹이 새로 생겼고, 그 안에 `Colors`, `Typography` 항목이 있는지 확인한다.

- [ ] **Step 4: Colors 페이지 확인**

`Tokens/Colors`를 열어 `SemanticColors`, `PrimitiveColors`, `Presets` 3개 스토리를 각각 클릭해 스와치가 올바른 색으로 렌더링되는지, 텍스트 라벨이 깨지지 않는지 확인한다.

- [ ] **Step 5: Typography 페이지 확인**

`Tokens/Typography`를 열어 `Overview`부터 `Mail`까지 14개 스토리를 각각 클릭해 텍스트 크기/굵기가 카테고리별로 달라지는지, 한글이 깨지지 않는지 확인한다.

- [ ] **Step 6: 서버 종료**

Storybook 개발 서버를 `Ctrl+C`로 종료한다.

---

## Self-Review 결과

- **Spec coverage**: 설계 문서의 3개 섹션(Semantic/Primitive/Presets — Colors, Overview/Foundation Scale/13개 카테고리 — Typography) 모두 Task 4~8에 매핑됨. `letterSpacingScale` export 누락 이슈(설계 검토 중 발견)는 Task 1로 별도 처리. 렌더링 헬퍼에 유닛 테스트를 요구하는 사용자 피드백을 반영해 Task 3(`docHelpers` + TDD)을 추가하고 Task 4~8은 그 헬퍼를 소비하도록 재구성.
- **Placeholder scan**: 모든 스텝에 완전한 코드 포함, "TODO"/"similar to" 없음.
- **Type consistency**: `Swatch`, `TextStyleValue`, `BrandPresetInput` 타입과 `ColorSwatchRow`/`PaletteStrip`/`PresetRow`/`ScaleTable`/`TextSpecimenRow`/`TextStyleSection` 함수 시그니처가 Task 3(정의)부터 Task 4~8(사용)까지 동일하게 유지됨. `brandPresets` 이름이 Task 2(정의)와 Task 6(사용) 간 일치. `PresetRow`가 `BrandPresetInput`(옵셔널 `color`)을 받도록 설계해, `brandPresets`의 5개 원소(하나는 `{}`, 나머지는 `{color:{...}}`)가 유니온 타입 프로퍼티 접근 에러 없이 그대로 전달 가능함을 확인.
