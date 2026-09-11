# 레이아웃 프리미티브 + PageLayout 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `@lawkit/ui`(packages/ui-v3)에 레이아웃 프리미티브 5종(Box, Grid, Divider, Container, Spacer)과 페이지 셸 컴포넌트 PageLayout을 추가하고 docs 사이트에 등록한다.

**Architecture:** 기존 Stack(HStack/VStack)과 동일한 패턴 — 토큰 키만 받는 props, 정적 스타일은 vanilla-extract(`recipe`/`style`), 토큰 개수만큼 클래스가 늘어나는 값(padding·gap·radius)은 `themeVars` 인라인 스타일로 처리. PageLayout은 CSS Grid `grid-template-areas` 기반 컴파운드 컴포넌트(Header/Nav/Content/Panel 슬롯)로, 슬롯을 생략하면 해당 트랙이 0으로 접힌다.

**Tech Stack:** React 18 + TypeScript, vanilla-extract, Vitest + Testing Library(jsdom), Storybook, pnpm workspace.

**Spec:** 사용자 승인된 시안 아티팩트 https://claude.ai/code/artifact/91f18beb-2792-4bcb-b4e3-faaa439f35e0 (3개 아트보드: 프리미티브 개념 시트 / PageLayout 슬롯 해부도 / 조합 예시). API 명세는 본 문서의 각 Task Interfaces 블록이 기준.

## Global Constraints

- 패키지 매니저는 **pnpm만** 사용. 커밋 컨벤션 `feat(ui-v3): ...` / `docs: ...` (HANDOFF.md 기준).
- 모든 커밋 메시지 끝에 다음 두 줄 추가:
  ```
  Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01MJW8jTDcr3qUUXUWWtbTLZ
  ```
- **토큰 하드코딩 금지**: 색은 `semanticColorRoles.*`/`themeVars.color.*`, 간격 `themeVars.spacing.x1~x6`, 라운드 `themeVars.radius.sm/md/lg`. (스토리의 데모 박스 색상만 예외 — 기존 Stack 스토리 관례.)
- 컴포넌트는 **4파일 구조**: `{Name}.css.ts` / `index.tsx` / `{Name}.stories.tsx` / `{Name}.test.tsx`. 완성 후 `src/index.ts` 배럴에 컴포넌트+타입 export.
- 스토리 meta: `title: "Components/{Name}"`, `tags: ["autodocs"]`, `lightThemeClass` 데코레이터. **TemplateCode 스토리 필수** (`name: "Template Code"`, `parameters.docs.source.code` 백틱 리터럴, `type Story` 선언 직후 첫 스토리로 배치).
- `packages/ui-v3/CLAUDE.md`는 직접 수정 금지 — Task 7에서 `pnpm --filter @lawkit/ui docs`로 재생성.
- 검증 명령 (packages/ui-v3에서): `npx vitest run src/components/{Name}/{Name}.test.tsx`, 전수 타입체크는 `pnpm --filter @lawkit/ui check`.
- 테스트 유틸: `import { render, screen } from "../../test/utils"` (이벤트 필요 시 `renderWithUser`).
- 컴포넌트 코드는 기존 관례대로 `export function Name(...)` 선언식 + named export.

---

### Task 1: Box

**Files:**
- Create: `packages/ui-v3/src/components/Box/Box.css.ts`
- Create: `packages/ui-v3/src/components/Box/index.tsx`
- Create: `packages/ui-v3/src/components/Box/Box.stories.tsx`
- Create: `packages/ui-v3/src/components/Box/Box.test.tsx`
- Modify: `packages/ui-v3/src/index.ts` (Stack export 블록 근처에 추가)

**Interfaces:**
- Consumes: `themeVars`, `semanticColorRoles` (@lds/tokens), `cx` (../../lib/cx)
- Produces:
  ```ts
  export type BoxSpacing = keyof typeof themeVars.spacing; // "x1"~"x6"
  export type BoxBackground = "page" | "canvas" | "subtle" | "raised";
  export type BoxRadius = keyof typeof themeVars.radius; // "sm" | "md" | "lg"
  export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    p?: BoxSpacing; px?: BoxSpacing; py?: BoxSpacing;
    bg?: BoxBackground;
    radius?: BoxRadius;
    border?: boolean;
    children?: ReactNode;
  }
  export function Box(props: BoxProps): JSX.Element; // <div>
  ```

- [ ] **Step 1: 실패하는 테스트 작성**

`packages/ui-v3/src/components/Box/Box.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { themeVars } from "@lds/tokens";
import { Box } from ".";

describe("Box", () => {
  it("renders children in a div", () => {
    const { container } = render(<Box><span>child</span></Box>);
    expect(screen.getByText("child")).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies p as inline padding token", () => {
    const { container } = render(<Box p="x4">x</Box>);
    expect((container.firstChild as HTMLElement).style.padding).toBe(themeVars.spacing.x4);
  });

  it("px/py override p on their axis", () => {
    const { container } = render(<Box p="x2" px="x6" py="x1">x</Box>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.paddingLeft).toBe(themeVars.spacing.x6);
    expect(el.style.paddingRight).toBe(themeVars.spacing.x6);
    expect(el.style.paddingTop).toBe(themeVars.spacing.x1);
    expect(el.style.paddingBottom).toBe(themeVars.spacing.x1);
  });

  it("applies radius as inline borderRadius token", () => {
    const { container } = render(<Box radius="md">x</Box>);
    expect((container.firstChild as HTMLElement).style.borderRadius).toBe(themeVars.radius.md);
  });

  it("sets no padding/radius styles when props omitted", () => {
    const { container } = render(<Box>x</Box>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.padding).toBe("");
    expect(el.style.borderRadius).toBe("");
  });

  it("bg variants produce distinct classNames", () => {
    const bgs = ["page", "canvas", "subtle", "raised"] as const;
    const { rerender, container } = render(<Box bg={bgs[0]}>x</Box>);
    const classes = bgs.map((bg) => {
      rerender(<Box bg={bg}>x</Box>);
      return (container.firstChild as HTMLElement).className;
    });
    expect(new Set(classes).size).toBe(bgs.length);
  });

  it("border adds a different className", () => {
    const { container: a } = render(<Box>x</Box>);
    const { container: b } = render(<Box border>x</Box>);
    expect((a.firstChild as HTMLElement).className).not.toBe(
      (b.firstChild as HTMLElement).className
    );
  });

  it("merges custom className and style", () => {
    const { container } = render(
      <Box p="x2" className="extra" style={{ width: "100px" }}>x</Box>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("extra");
    expect(el.style.width).toBe("100px");
    expect(el.style.padding).toBe(themeVars.spacing.x2);
  });

  it("forwards native attributes", () => {
    render(<Box data-testid="box" aria-label="영역">x</Box>);
    expect(screen.getByTestId("box")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 실패 확인**

Run (packages/ui-v3에서): `npx vitest run src/components/Box/Box.test.tsx`
Expected: FAIL — `Cannot find module '.'` 또는 export 없음.

- [ ] **Step 3: 스타일 + 컴포넌트 구현**

`packages/ui-v3/src/components/Box/Box.css.ts`:

```ts
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles } from "@lds/tokens";

export const box = recipe({
  base: {
    boxSizing: "border-box",
  },
  variants: {
    bg: {
      page: { background: semanticColorRoles.surface.page },
      canvas: { background: semanticColorRoles.surface.canvas },
      subtle: { background: semanticColorRoles.surface.subtle },
      raised: { background: semanticColorRoles.surface.raised },
    },
    border: {
      true: { border: `1px solid ${semanticColorRoles.border.subtle}` },
    },
  },
});
```

`packages/ui-v3/src/components/Box/index.tsx`:

```tsx
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { themeVars } from "@lds/tokens";
import { cx } from "../../lib/cx";
import * as s from "./Box.css";

/* ─── Types ─── */
export type BoxSpacing = keyof typeof themeVars.spacing;
export type BoxBackground = "page" | "canvas" | "subtle" | "raised";
export type BoxRadius = keyof typeof themeVars.radius;

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  /** 사방 패딩 (디자인 토큰: x1=4px ~ x6=24px) */
  p?: BoxSpacing;
  /** 좌우 패딩 — p보다 우선 */
  px?: BoxSpacing;
  /** 상하 패딩 — p보다 우선 */
  py?: BoxSpacing;
  /** 배경 (surface 역할 토큰) */
  bg?: BoxBackground;
  /** 모서리 라운드 (radius 토큰: sm=4px, md=6px, lg=8px) */
  radius?: BoxRadius;
  /** 1px border.subtle 테두리 */
  border?: boolean;
  children?: ReactNode;
}

/* ─── Component ─── */
export function Box({
  p,
  px,
  py,
  bg,
  radius,
  border,
  className,
  style,
  children,
  ...rest
}: BoxProps) {
  const tokenStyle: CSSProperties = {};
  if (p) tokenStyle.padding = themeVars.spacing[p];
  if (px) {
    tokenStyle.paddingLeft = themeVars.spacing[px];
    tokenStyle.paddingRight = themeVars.spacing[px];
  }
  if (py) {
    tokenStyle.paddingTop = themeVars.spacing[py];
    tokenStyle.paddingBottom = themeVars.spacing[py];
  }
  if (radius) tokenStyle.borderRadius = themeVars.radius[radius];

  return (
    <div
      className={cx(s.box({ bg, border }), className)}
      style={{ ...tokenStyle, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: 통과 확인**

Run: `npx vitest run src/components/Box/Box.test.tsx`
Expected: PASS (9 tests)

- [ ] **Step 5: 스토리 작성**

`packages/ui-v3/src/components/Box/Box.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Box } from ".";

/**
 * ## Box
 *
 * 패딩·배경·테두리·라운드를 디자인 토큰 키로 받는 만능 레이아웃 컨테이너입니다.
 * div + 인라인 스타일을 대체해 간격·색이 시스템을 벗어나지 않게 합니다.
 *
 * ### Import
 * ```tsx
 * import { Box } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `p` | `"x1" \| ... \| "x6"` | - | 사방 패딩 토큰 |
 * | `px` / `py` | `"x1" \| ... \| "x6"` | - | 축별 패딩 (p보다 우선) |
 * | `bg` | `"page" \| "canvas" \| "subtle" \| "raised"` | - | surface 역할 배경 |
 * | `radius` | `"sm" \| "md" \| "lg"` | - | 라운드 토큰 (4/6/8px) |
 * | `border` | `boolean` | `false` | 1px border.subtle 테두리 |
 */
const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    p: { control: "select", options: ["x1", "x2", "x3", "x4", "x5", "x6"] },
    bg: { control: "select", options: ["page", "canvas", "subtle", "raised"] },
    radius: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Box>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: { p: "x4", bg: "canvas", radius: "md", border: true },
  parameters: {
    docs: {
      source: {
        code: `import { Box } from "@lds/ui-v3";

// 카드형 영역 — 패딩/배경/라운드/테두리를 토큰으로
<Box p="x4" bg="canvas" radius="md" border>
  콘텐츠
</Box>

// 축별 패딩
<Box px="x5" py="x3" bg="subtle" radius="lg">
  좌우 20px / 상하 12px
</Box>

// 페이지 배경 섹션
<Box p="x6" bg="page">
  섹션 콘텐츠
</Box>`,
      },
    },
  },
  render: (args) => <Box {...args}>토큰 기반 컨테이너</Box>,
};

export const Backgrounds: Story = {
  name: "배경 토큰 비교",
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {(["page", "canvas", "subtle", "raised"] as const).map((bg) => (
        <Box key={bg} p="x4" bg={bg} radius="md" border style={{ width: 120 }}>
          bg="{bg}"
        </Box>
      ))}
    </div>
  ),
};

export const PaddingShowcase: Story = {
  name: "패딩 토큰 비교 (x1~x6)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["x1", "x2", "x3", "x4", "x5", "x6"] as const).map((p) => (
        <Box key={p} p={p} bg="subtle" radius="sm" border style={{ alignSelf: "flex-start" }}>
          p="{p}"
        </Box>
      ))}
    </div>
  ),
};
```

- [ ] **Step 6: 배럴 export 추가**

`packages/ui-v3/src/index.ts`의 Stack export 블록(69행 부근) 위에 추가:

```ts
export { Box } from "./components/Box";
export type { BoxProps, BoxSpacing, BoxBackground, BoxRadius } from "./components/Box";
```

- [ ] **Step 7: 타입체크 + 테스트 재실행**

Run: `pnpm --filter @lawkit/ui check && npx vitest run src/components/Box/Box.test.tsx`
Expected: 에러 0, PASS

- [ ] **Step 8: 커밋**

```bash
git add packages/ui-v3/src/components/Box packages/ui-v3/src/index.ts
git commit -m "feat(ui-v3): Box 레이아웃 프리미티브 추가"
```

---

### Task 2: Divider

**Files:**
- Create: `packages/ui-v3/src/components/Divider/Divider.css.ts`
- Create: `packages/ui-v3/src/components/Divider/index.tsx`
- Create: `packages/ui-v3/src/components/Divider/Divider.stories.tsx`
- Create: `packages/ui-v3/src/components/Divider/Divider.test.tsx`
- Modify: `packages/ui-v3/src/index.ts`

**Interfaces:**
- Consumes: `semanticColorRoles`, `cx`
- Produces:
  ```ts
  export type DividerOrientation = "horizontal" | "vertical";
  export interface DividerProps extends HTMLAttributes<HTMLElement> {
    orientation?: DividerOrientation; // default "horizontal"
  }
  export function Divider(props: DividerProps): JSX.Element;
  // horizontal → <hr>, vertical → <div role="separator" aria-orientation="vertical">
  ```

- [ ] **Step 1: 실패하는 테스트 작성**

`packages/ui-v3/src/components/Divider/Divider.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Divider } from ".";

describe("Divider", () => {
  it("renders hr with separator role by default", () => {
    const { container } = render(<Divider />);
    expect(container.firstChild?.nodeName).toBe("HR");
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("vertical renders div with aria-orientation", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el.nodeName).toBe("DIV");
    expect(el).toHaveAttribute("role", "separator");
    expect(el).toHaveAttribute("aria-orientation", "vertical");
  });

  it("horizontal and vertical have different classNames", () => {
    const { container: h } = render(<Divider />);
    const { container: v } = render(<Divider orientation="vertical" />);
    expect((h.firstChild as HTMLElement).className).not.toBe(
      (v.firstChild as HTMLElement).className
    );
  });

  it("merges custom className", () => {
    const { container } = render(<Divider className="extra" />);
    expect((container.firstChild as HTMLElement).className).toContain("extra");
  });

  it("forwards data-testid", () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getByTestId("divider")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run src/components/Divider/Divider.test.tsx`
Expected: FAIL — 모듈 없음.

- [ ] **Step 3: 구현**

`packages/ui-v3/src/components/Divider/Divider.css.ts`:

```ts
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles } from "@lds/tokens";

export const divider = recipe({
  base: {
    border: "none",
    margin: 0,
    flexShrink: 0,
    background: semanticColorRoles.border.subtle,
  },
  variants: {
    orientation: {
      horizontal: { width: "100%", height: "1px" },
      vertical: { width: "1px", alignSelf: "stretch" },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
```

`packages/ui-v3/src/components/Divider/index.tsx`:

```tsx
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Divider.css";

/* ─── Types ─── */
export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  /** 방향 — vertical은 flex 부모 안에서 stretch */
  orientation?: DividerOrientation;
}

/* ─── Component ─── */
export function Divider({ orientation = "horizontal", className, ...rest }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cx(s.divider({ orientation }), className)}
        {...rest}
      />
    );
  }
  return <hr className={cx(s.divider({ orientation }), className)} {...rest} />;
}
```

- [ ] **Step 4: 통과 확인**

Run: `npx vitest run src/components/Divider/Divider.test.tsx`
Expected: PASS (5 tests)

- [ ] **Step 5: 스토리 작성**

`packages/ui-v3/src/components/Divider/Divider.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Divider } from ".";

/**
 * ## Divider
 *
 * 색·두께가 항상 border 토큰으로 고정되는 구분선입니다. 수평·수직을 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { Divider } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | 방향 (vertical은 flex 부모에서 stretch) |
 */
const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { Divider } from "@lds/ui-v3";

// 섹션 구분
<section>위 콘텐츠</section>
<Divider />
<section>아래 콘텐츠</section>

// 수직 구분 (flex 부모 안)
<HStack gap="x3" align="center">
  <span>진행 중 24</span>
  <Divider orientation="vertical" />
  <span>종결 96</span>
</HStack>`,
      },
    },
  },
  render: () => (
    <div>
      <p style={{ margin: "0 0 12px" }}>위 콘텐츠</p>
      <Divider />
      <p style={{ margin: "12px 0 0" }}>아래 콘텐츠</p>
    </div>
  ),
};

export const Vertical: Story = {
  name: "수직 구분선",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 40 }}>
      <span>진행 중 24</span>
      <Divider orientation="vertical" />
      <span>종결 96</span>
    </div>
  ),
};
```

- [ ] **Step 6: 배럴 export 추가** (Box export 아래)

```ts
export { Divider } from "./components/Divider";
export type { DividerProps, DividerOrientation } from "./components/Divider";
```

- [ ] **Step 7: 타입체크 + 테스트**

Run: `pnpm --filter @lawkit/ui check && npx vitest run src/components/Divider/Divider.test.tsx`
Expected: 에러 0, PASS

- [ ] **Step 8: 커밋**

```bash
git add packages/ui-v3/src/components/Divider packages/ui-v3/src/index.ts
git commit -m "feat(ui-v3): Divider 레이아웃 프리미티브 추가"
```

---

### Task 3: Spacer

**Files:**
- Create: `packages/ui-v3/src/components/Spacer/Spacer.css.ts`
- Create: `packages/ui-v3/src/components/Spacer/index.tsx`
- Create: `packages/ui-v3/src/components/Spacer/Spacer.stories.tsx`
- Create: `packages/ui-v3/src/components/Spacer/Spacer.test.tsx`
- Modify: `packages/ui-v3/src/index.ts`

**Interfaces:**
- Consumes: `cx`
- Produces:
  ```ts
  export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {}
  export function Spacer(props: SpacerProps): JSX.Element;
  // <div aria-hidden="true"> — flex-grow: 1
  ```

- [ ] **Step 1: 실패하는 테스트 작성**

`packages/ui-v3/src/components/Spacer/Spacer.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Spacer } from ".";

describe("Spacer", () => {
  it("renders an aria-hidden div", () => {
    const { container } = render(<Spacer />);
    const el = container.firstChild as HTMLElement;
    expect(el.nodeName).toBe("DIV");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("has a stable vanilla-extract className", () => {
    const { container } = render(<Spacer />);
    expect((container.firstChild as HTMLElement).className).not.toBe("");
  });

  it("merges custom className", () => {
    const { container } = render(<Spacer className="extra" />);
    expect((container.firstChild as HTMLElement).className).toContain("extra");
  });

  it("forwards data-testid", () => {
    render(<Spacer data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run src/components/Spacer/Spacer.test.tsx`
Expected: FAIL — 모듈 없음.

- [ ] **Step 3: 구현**

`packages/ui-v3/src/components/Spacer/Spacer.css.ts`:

```ts
import { style } from "@vanilla-extract/css";

export const spacer = style({
  flexGrow: 1,
  alignSelf: "stretch",
  minWidth: 0,
  minHeight: 0,
});
```

`packages/ui-v3/src/components/Spacer/index.tsx`:

```tsx
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Spacer.css";

/* ─── Types ─── */
export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {}

/* ─── Component ─── */
export function Spacer({ className, ...rest }: SpacerProps) {
  return <div aria-hidden="true" className={cx(s.spacer, className)} {...rest} />;
}
```

- [ ] **Step 4: 통과 확인**

Run: `npx vitest run src/components/Spacer/Spacer.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: 스토리 작성**

`packages/ui-v3/src/components/Spacer/Spacer.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Spacer } from ".";

/**
 * ## Spacer
 *
 * flex 컨테이너(HStack/VStack) 안에서 남는 공간을 전부 차지하는 빈 요소입니다.
 * "왼쪽엔 제목, 오른쪽 끝엔 버튼" 배치가 한 줄로 끝납니다.
 *
 * ### Import
 * ```tsx
 * import { Spacer } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 */
const meta: Meta<typeof Spacer> = {
  title: "Components/Spacer",
  component: Spacer,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Spacer>;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { HStack, Spacer, Button } from "@lds/ui-v3";

// 제목 왼쪽, 버튼 오른쪽 끝
<HStack gap="x3" align="center">
  <h2>사건 목록</h2>
  <Spacer />
  <Button>+ 사건 등록</Button>
</HStack>`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px dashed #cbd5e1", borderRadius: 6, padding: "8px 12px" }}>
      <span style={{ fontWeight: 600 }}>사건 목록</span>
      <Spacer style={{ background: "repeating-linear-gradient(135deg, #e2e8f0 0 3px, transparent 3px 7px)", borderRadius: 4, height: 24 }} />
      <span style={{ padding: "4px 12px", background: "#6366f1", color: "#fff", borderRadius: 4, fontSize: 13 }}>+ 사건 등록</span>
    </div>
  ),
};
```

- [ ] **Step 6: 배럴 export 추가** (Divider export 아래에 배치하되 알파벳 무관, Stack 블록 근처 유지)

```ts
export { Spacer } from "./components/Spacer";
export type { SpacerProps } from "./components/Spacer";
```

- [ ] **Step 7: 타입체크 + 테스트**

Run: `pnpm --filter @lawkit/ui check && npx vitest run src/components/Spacer/Spacer.test.tsx`
Expected: 에러 0, PASS

- [ ] **Step 8: 커밋**

```bash
git add packages/ui-v3/src/components/Spacer packages/ui-v3/src/index.ts
git commit -m "feat(ui-v3): Spacer 레이아웃 프리미티브 추가"
```

---

### Task 4: Grid

**Files:**
- Create: `packages/ui-v3/src/components/Grid/Grid.css.ts`
- Create: `packages/ui-v3/src/components/Grid/index.tsx`
- Create: `packages/ui-v3/src/components/Grid/Grid.stories.tsx`
- Create: `packages/ui-v3/src/components/Grid/Grid.test.tsx`
- Modify: `packages/ui-v3/src/index.ts`

**Interfaces:**
- Consumes: `themeVars`, `cx`
- Produces:
  ```ts
  export type GridGap = keyof typeof themeVars.spacing;
  export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    columns?: number;      // default 1, repeat(N, minmax(0, 1fr))
    gap?: GridGap;         // 행/열 공통
    rowGap?: GridGap;      // gap보다 우선
    columnGap?: GridGap;   // gap보다 우선
    children?: ReactNode;
  }
  export function Grid(props: GridProps): JSX.Element; // <div>
  ```

- [ ] **Step 1: 실패하는 테스트 작성**

`packages/ui-v3/src/components/Grid/Grid.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { themeVars } from "@lds/tokens";
import { Grid } from ".";

describe("Grid", () => {
  it("renders children in a div", () => {
    const { container } = render(<Grid><span>a</span><span>b</span></Grid>);
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies columns as repeat template", () => {
    const { container } = render(<Grid columns={3}>x</Grid>);
    expect((container.firstChild as HTMLElement).style.gridTemplateColumns).toBe(
      "repeat(3, minmax(0, 1fr))"
    );
  });

  it("defaults to 1 column", () => {
    const { container } = render(<Grid>x</Grid>);
    expect((container.firstChild as HTMLElement).style.gridTemplateColumns).toBe(
      "repeat(1, minmax(0, 1fr))"
    );
  });

  it("applies gap token", () => {
    const { container } = render(<Grid gap="x3">x</Grid>);
    expect((container.firstChild as HTMLElement).style.gap).toBe(themeVars.spacing.x3);
  });

  it("rowGap/columnGap override gap", () => {
    const { container } = render(<Grid gap="x2" rowGap="x5" columnGap="x1">x</Grid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.rowGap).toBe(themeVars.spacing.x5);
    expect(el.style.columnGap).toBe(themeVars.spacing.x1);
  });

  it("merges custom className and style", () => {
    const { container } = render(
      <Grid columns={2} className="extra" style={{ width: "300px" }}>x</Grid>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("extra");
    expect(el.style.width).toBe("300px");
  });

  it("forwards data-testid", () => {
    render(<Grid data-testid="grid">x</Grid>);
    expect(screen.getByTestId("grid")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run src/components/Grid/Grid.test.tsx`
Expected: FAIL — 모듈 없음.

- [ ] **Step 3: 구현**

`packages/ui-v3/src/components/Grid/Grid.css.ts`:

```ts
import { style } from "@vanilla-extract/css";

export const grid = style({
  display: "grid",
  boxSizing: "border-box",
});
```

`packages/ui-v3/src/components/Grid/index.tsx`:

```tsx
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { themeVars } from "@lds/tokens";
import { cx } from "../../lib/cx";
import * as s from "./Grid.css";

/* ─── Types ─── */
export type GridGap = keyof typeof themeVars.spacing;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** 동일 폭 컬럼 수 — repeat(N, minmax(0, 1fr)) */
  columns?: number;
  /** 행/열 공통 간격 토큰 */
  gap?: GridGap;
  /** 행 간격 — gap보다 우선 */
  rowGap?: GridGap;
  /** 열 간격 — gap보다 우선 */
  columnGap?: GridGap;
  children?: ReactNode;
}

/* ─── Component ─── */
export function Grid({
  columns = 1,
  gap,
  rowGap,
  columnGap,
  className,
  style,
  children,
  ...rest
}: GridProps) {
  const tokenStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };
  if (gap) tokenStyle.gap = themeVars.spacing[gap];
  if (rowGap) tokenStyle.rowGap = themeVars.spacing[rowGap];
  if (columnGap) tokenStyle.columnGap = themeVars.spacing[columnGap];

  return (
    <div className={cx(s.grid, className)} style={{ ...tokenStyle, ...style }} {...rest}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: 통과 확인**

Run: `npx vitest run src/components/Grid/Grid.test.tsx`
Expected: PASS (7 tests)

- [ ] **Step 5: 스토리 작성**

`packages/ui-v3/src/components/Grid/Grid.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Grid } from ".";

/**
 * ## Grid
 *
 * 동일 폭 컬럼 격자입니다. 카드 목록·통계 카드·폼 2단 배치처럼
 * "N개씩 줄바꿈"이 필요한 곳에 씁니다.
 *
 * ### Import
 * ```tsx
 * import { Grid } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `columns` | `number` | `1` | 컬럼 수 — repeat(N, minmax(0, 1fr)) |
 * | `gap` | `"x1" \| ... \| "x6"` | - | 행/열 공통 간격 토큰 |
 * | `rowGap` / `columnGap` | `"x1" \| ... \| "x6"` | - | 축별 간격 (gap보다 우선) |
 */
const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    columns: { control: { type: "number", min: 1, max: 6 } },
    gap: { control: "select", options: ["x1", "x2", "x3", "x4", "x5", "x6"] },
  },
};
export default meta;
type Story = StoryObj<typeof Grid>;

const Cell = ({ children }: { children?: React.ReactNode }) => (
  <div style={{ padding: "12px", background: "#e0e7ff", borderRadius: 4, textAlign: "center" }}>
    {children}
  </div>
);

export const TemplateCode: Story = {
  name: "Template Code",
  args: { columns: 3, gap: "x3" },
  parameters: {
    docs: {
      source: {
        code: `import { Grid } from "@lds/ui-v3";

// 통계 카드 3열
<Grid columns={3} gap="x3">
  <Card>진행 중 사건 24</Card>
  <Card>이번 주 기일 6</Card>
  <Card>답변 기한 임박 3</Card>
</Grid>

// 폼 2단 배치 (행/열 간격 다르게)
<Grid columns={2} rowGap="x4" columnGap="x6">
  <Input label="사건번호" />
  <Input label="사건명" />
  <Input label="재판부" />
  <Input label="담당 변호사" />
</Grid>`,
      },
    },
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => <Cell key={i}>{i + 1}</Cell>)}
    </Grid>
  ),
};

export const ColumnsShowcase: Story = {
  name: "컬럼 수 비교 (2/3/4)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {[2, 3, 4].map((n) => (
        <div key={n}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>columns={n}</div>
          <Grid columns={n} gap="x2">
            {Array.from({ length: n * 2 }, (_, i) => <Cell key={i}>{i + 1}</Cell>)}
          </Grid>
        </div>
      ))}
    </div>
  ),
};
```

- [ ] **Step 6: 배럴 export 추가**

```ts
export { Grid } from "./components/Grid";
export type { GridProps, GridGap } from "./components/Grid";
```

- [ ] **Step 7: 타입체크 + 테스트**

Run: `pnpm --filter @lawkit/ui check && npx vitest run src/components/Grid/Grid.test.tsx`
Expected: 에러 0, PASS

- [ ] **Step 8: 커밋**

```bash
git add packages/ui-v3/src/components/Grid packages/ui-v3/src/index.ts
git commit -m "feat(ui-v3): Grid 레이아웃 프리미티브 추가"
```

---

### Task 5: Container

**Files:**
- Create: `packages/ui-v3/src/components/Container/Container.css.ts`
- Create: `packages/ui-v3/src/components/Container/index.tsx`
- Create: `packages/ui-v3/src/components/Container/Container.stories.tsx`
- Create: `packages/ui-v3/src/components/Container/Container.test.tsx`
- Modify: `packages/ui-v3/src/index.ts`

**Interfaces:**
- Consumes: `themeVars`, `cx`
- Produces:
  ```ts
  export type ContainerSize = "sm" | "md" | "lg" | "full";
  // max-width: sm=768px, md=1024px, lg=1280px, full=none
  export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    size?: ContainerSize; // default "lg"
    children?: ReactNode;
  }
  export function Container(props: ContainerProps): JSX.Element;
  // <div> — width 100%, margin-inline auto, padding-inline x5(20px)
  ```

- [ ] **Step 1: 실패하는 테스트 작성**

`packages/ui-v3/src/components/Container/Container.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Container } from ".";

describe("Container", () => {
  it("renders children in a div", () => {
    const { container } = render(<Container><span>child</span></Container>);
    expect(screen.getByText("child")).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("all sizes produce unique classNames", () => {
    const sizes = ["sm", "md", "lg", "full"] as const;
    const { rerender, container } = render(<Container size={sizes[0]}>x</Container>);
    const classes = sizes.map((size) => {
      rerender(<Container size={size}>x</Container>);
      return (container.firstChild as HTMLElement).className;
    });
    expect(new Set(classes).size).toBe(sizes.length);
  });

  it("defaults to lg size", () => {
    const { container: def } = render(<Container>x</Container>);
    const { container: lg } = render(<Container size="lg">x</Container>);
    expect((def.firstChild as HTMLElement).className).toBe(
      (lg.firstChild as HTMLElement).className
    );
  });

  it("merges custom className and style", () => {
    const { container } = render(
      <Container className="extra" style={{ background: "red" }}>x</Container>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("extra");
    expect(el.style.background).toBe("red");
  });

  it("forwards data-testid", () => {
    render(<Container data-testid="container">x</Container>);
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run src/components/Container/Container.test.tsx`
Expected: FAIL — 모듈 없음.

- [ ] **Step 3: 구현**

`packages/ui-v3/src/components/Container/Container.css.ts`:

```ts
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@lds/tokens";

export const container = recipe({
  base: {
    boxSizing: "border-box",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: themeVars.spacing.x5,
    paddingRight: themeVars.spacing.x5,
  },
  variants: {
    size: {
      sm: { maxWidth: "768px" },
      md: { maxWidth: "1024px" },
      lg: { maxWidth: "1280px" },
      full: { maxWidth: "none" },
    },
  },
  defaultVariants: {
    size: "lg",
  },
});
```

`packages/ui-v3/src/components/Container/index.tsx`:

```tsx
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Container.css";

/* ─── Types ─── */
export type ContainerSize = "sm" | "md" | "lg" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** 최대 폭 — sm=768px, md=1024px, lg=1280px, full=제한 없음 */
  size?: ContainerSize;
  children?: ReactNode;
}

/* ─── Component ─── */
export function Container({ size, className, children, ...rest }: ContainerProps) {
  return (
    <div className={cx(s.container({ size }), className)} {...rest}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: 통과 확인**

Run: `npx vitest run src/components/Container/Container.test.tsx`
Expected: PASS (5 tests)

- [ ] **Step 5: 스토리 작성**

`packages/ui-v3/src/components/Container/Container.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Container } from ".";

/**
 * ## Container
 *
 * 콘텐츠 최대 폭을 정하고 중앙 정렬 + 좌우 패딩(x5=20px)을 제공합니다.
 * 넓은 모니터에서 내용이 무한정 퍼지는 것을 막습니다.
 *
 * ### Import
 * ```tsx
 * import { Container } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `size` | `"sm" \| "md" \| "lg" \| "full"` | `"lg"` | 최대 폭 768/1024/1280px/무제한 |
 */
const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "full"] },
  },
};
export default meta;
type Story = StoryObj<typeof Container>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: { size: "lg" },
  parameters: {
    docs: {
      source: {
        code: `import { Container } from "@lds/ui-v3";

// 페이지 본문 폭 제한 (기본 lg=1280px)
<Container size="lg">
  <h1>사건 목록</h1>
  {/* 본문 */}
</Container>

// 읽기용 좁은 폭
<Container size="sm">
  <article>약관 본문</article>
</Container>`,
      },
    },
  },
  render: (args) => (
    <div style={{ background: "#f1f5f9", padding: "16px 0" }}>
      <Container {...args}>
        <div style={{ background: "#e0e7ff", borderRadius: 4, padding: 16, textAlign: "center" }}>
          size="{args.size}" 콘텐츠 영역
        </div>
      </Container>
    </div>
  ),
};

export const SizeShowcase: Story = {
  name: "사이즈 비교 (sm/md/lg)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, background: "#f1f5f9", padding: "16px 0" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Container key={size} size={size}>
          <div style={{ background: "#e0e7ff", borderRadius: 4, padding: 8, textAlign: "center", fontSize: 13 }}>
            {size}
          </div>
        </Container>
      ))}
    </div>
  ),
};
```

- [ ] **Step 6: 배럴 export 추가**

```ts
export { Container } from "./components/Container";
export type { ContainerProps, ContainerSize } from "./components/Container";
```

- [ ] **Step 7: 타입체크 + 테스트**

Run: `pnpm --filter @lawkit/ui check && npx vitest run src/components/Container/Container.test.tsx`
Expected: 에러 0, PASS

- [ ] **Step 8: 커밋**

```bash
git add packages/ui-v3/src/components/Container packages/ui-v3/src/index.ts
git commit -m "feat(ui-v3): Container 레이아웃 프리미티브 추가"
```

---

### Task 6: PageLayout

**Files:**
- Create: `packages/ui-v3/src/components/PageLayout/PageLayout.css.ts`
- Create: `packages/ui-v3/src/components/PageLayout/index.tsx`
- Create: `packages/ui-v3/src/components/PageLayout/PageLayout.stories.tsx`
- Create: `packages/ui-v3/src/components/PageLayout/PageLayout.test.tsx`
- Modify: `packages/ui-v3/src/index.ts`

**Interfaces:**
- Consumes: `semanticColorRoles`, `cx`
- Produces:
  ```ts
  export interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {}
  export interface PageLayoutSlotProps extends HTMLAttributes<HTMLElement> {}
  export interface PageLayoutNavProps extends HTMLAttributes<HTMLElement> {
    width?: number;          // default 240
    collapsed?: boolean;     // default false
    collapsedWidth?: number; // default 64
  }
  export interface PageLayoutPanelProps extends HTMLAttributes<HTMLElement> {
    width?: number; // default 320
  }
  // grid-template-areas 기반. 슬롯 생략 시 해당 트랙이 0으로 접힘.
  // PageLayout(root, div) / PageLayout.Header(<header>) / PageLayout.Nav(<nav>)
  // / PageLayout.Content(<main>) / PageLayout.Panel(<aside>)
  export function PageLayout(props: PageLayoutProps): JSX.Element;
  // + named export: PageLayoutHeader, PageLayoutNav, PageLayoutContent, PageLayoutPanel
  ```

- [ ] **Step 1: 실패하는 테스트 작성**

`packages/ui-v3/src/components/PageLayout/PageLayout.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { PageLayout } from ".";

const renderFull = () =>
  render(
    <PageLayout data-testid="root">
      <PageLayout.Header>헤더</PageLayout.Header>
      <PageLayout.Nav data-testid="nav">내비</PageLayout.Nav>
      <PageLayout.Content>본문</PageLayout.Content>
      <PageLayout.Panel data-testid="panel">패널</PageLayout.Panel>
    </PageLayout>
  );

describe("PageLayout", () => {
  it("renders all slots with semantic elements", () => {
    renderFull();
    expect(screen.getByRole("banner")).toHaveTextContent("헤더");        // <header>
    expect(screen.getByRole("navigation")).toHaveTextContent("내비");    // <nav>
    expect(screen.getByRole("main")).toHaveTextContent("본문");          // <main>
    expect(screen.getByRole("complementary")).toHaveTextContent("패널"); // <aside>
  });

  it("root is a div", () => {
    renderFull();
    expect(screen.getByTestId("root").nodeName).toBe("DIV");
  });

  it("works with slots omitted (Header + Content only)", () => {
    render(
      <PageLayout>
        <PageLayout.Header>헤더</PageLayout.Header>
        <PageLayout.Content>본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("Nav applies default width 240", () => {
    renderFull();
    expect(screen.getByTestId("nav").style.width).toBe("240px");
  });

  it("Nav collapsed switches to collapsedWidth", () => {
    render(
      <PageLayout>
        <PageLayout.Nav data-testid="nav" collapsed>내비</PageLayout.Nav>
        <PageLayout.Content>본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByTestId("nav").style.width).toBe("64px");
  });

  it("Nav custom width and collapsedWidth", () => {
    const { rerender } = render(
      <PageLayout>
        <PageLayout.Nav data-testid="nav" width={280}>내비</PageLayout.Nav>
        <PageLayout.Content>본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByTestId("nav").style.width).toBe("280px");
    rerender(
      <PageLayout>
        <PageLayout.Nav data-testid="nav" width={280} collapsed collapsedWidth={56}>내비</PageLayout.Nav>
        <PageLayout.Content>본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByTestId("nav").style.width).toBe("56px");
  });

  it("Panel applies default width 320 and custom width", () => {
    renderFull();
    expect(screen.getByTestId("panel").style.width).toBe("320px");
    render(
      <PageLayout>
        <PageLayout.Content>본문</PageLayout.Content>
        <PageLayout.Panel data-testid="panel2" width={400}>패널</PageLayout.Panel>
      </PageLayout>
    );
    expect(screen.getByTestId("panel2").style.width).toBe("400px");
  });

  it("named exports match dot properties", async () => {
    const mod = await import(".");
    expect(mod.PageLayoutHeader).toBe(PageLayout.Header);
    expect(mod.PageLayoutNav).toBe(PageLayout.Nav);
    expect(mod.PageLayoutContent).toBe(PageLayout.Content);
    expect(mod.PageLayoutPanel).toBe(PageLayout.Panel);
  });

  it("merges custom className on root and slots", () => {
    render(
      <PageLayout data-testid="root" className="root-extra">
        <PageLayout.Content className="content-extra">본문</PageLayout.Content>
      </PageLayout>
    );
    expect(screen.getByTestId("root").className).toContain("root-extra");
    expect(screen.getByRole("main").className).toContain("content-extra");
  });
});
```

- [ ] **Step 2: 실패 확인**

Run: `npx vitest run src/components/PageLayout/PageLayout.test.tsx`
Expected: FAIL — 모듈 없음.

- [ ] **Step 3: 구현**

`packages/ui-v3/src/components/PageLayout/PageLayout.css.ts`:

```ts
import { style } from "@vanilla-extract/css";
import { semanticColorRoles } from "@lds/tokens";

export const root = style({
  display: "grid",
  gridTemplateAreas: `"header header header" "nav content panel"`,
  gridTemplateRows: "auto minmax(0, 1fr)",
  gridTemplateColumns: "auto minmax(0, 1fr) auto",
  height: "100dvh",
  boxSizing: "border-box",
  background: semanticColorRoles.surface.page,
});

export const header = style({
  gridArea: "header",
  boxSizing: "border-box",
  background: semanticColorRoles.surface.canvas,
  borderBottom: `1px solid ${semanticColorRoles.border.subtle}`,
});

export const nav = style({
  gridArea: "nav",
  boxSizing: "border-box",
  overflowY: "auto",
  background: semanticColorRoles.surface.subtle,
  borderRight: `1px solid ${semanticColorRoles.border.subtle}`,
  transition: "width 0.2s ease",
});

export const content = style({
  gridArea: "content",
  boxSizing: "border-box",
  minWidth: 0,
  overflowY: "auto",
});

export const panel = style({
  gridArea: "panel",
  boxSizing: "border-box",
  overflowY: "auto",
  background: semanticColorRoles.surface.canvas,
  borderLeft: `1px solid ${semanticColorRoles.border.subtle}`,
});
```

`packages/ui-v3/src/components/PageLayout/index.tsx`:

```tsx
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./PageLayout.css";

/* ─── Types ─── */
export interface PageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface PageLayoutSlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface PageLayoutNavProps extends HTMLAttributes<HTMLElement> {
  /** LNB 폭 (px) */
  width?: number;
  /** 접힘 — collapsedWidth로 축소 */
  collapsed?: boolean;
  /** 접혔을 때 폭 (px) */
  collapsedWidth?: number;
  children?: ReactNode;
}

export interface PageLayoutPanelProps extends HTMLAttributes<HTMLElement> {
  /** 보조 패널 폭 (px) */
  width?: number;
  children?: ReactNode;
}

/* ─── Slots ─── */
export function PageLayoutHeader({ className, children, ...rest }: PageLayoutSlotProps) {
  return (
    <header className={cx(s.header, className)} {...rest}>
      {children}
    </header>
  );
}

export function PageLayoutNav({
  width = 240,
  collapsed = false,
  collapsedWidth = 64,
  className,
  style,
  children,
  ...rest
}: PageLayoutNavProps) {
  return (
    <nav
      className={cx(s.nav, className)}
      style={{ width: collapsed ? collapsedWidth : width, ...style }}
      {...rest}
    >
      {children}
    </nav>
  );
}

export function PageLayoutContent({ className, children, ...rest }: PageLayoutSlotProps) {
  return (
    <main className={cx(s.content, className)} {...rest}>
      {children}
    </main>
  );
}

export function PageLayoutPanel({
  width = 320,
  className,
  style,
  children,
  ...rest
}: PageLayoutPanelProps) {
  return (
    <aside className={cx(s.panel, className)} style={{ width, ...style }} {...rest}>
      {children}
    </aside>
  );
}

/* ─── Root ─── */
function PageLayoutRoot({ className, children, ...rest }: PageLayoutProps) {
  return (
    <div className={cx(s.root, className)} {...rest}>
      {children}
    </div>
  );
}

export const PageLayout = Object.assign(PageLayoutRoot, {
  Header: PageLayoutHeader,
  Nav: PageLayoutNav,
  Content: PageLayoutContent,
  Panel: PageLayoutPanel,
});
```

- [ ] **Step 4: 통과 확인**

Run: `npx vitest run src/components/PageLayout/PageLayout.test.tsx`
Expected: PASS (9 tests)

- [ ] **Step 5: 스토리 작성**

`packages/ui-v3/src/components/PageLayout/PageLayout.stories.tsx`:

```tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { PageLayout } from ".";

/**
 * ## PageLayout
 *
 * GNB + LNB + 콘텐츠 골격을 슬롯으로 제공하는 페이지 셸입니다.
 * grid-template-areas 기반이라 슬롯을 생략하면 해당 영역이 0으로 접힙니다.
 * GNB/LNB의 내용물은 각 서비스가 채웁니다(패턴 가이드 참조).
 *
 * ### Import
 * ```tsx
 * import { PageLayout } from "@lds/ui-v3";
 * ```
 *
 * ### Slots
 * | Slot | Element | Props | Description |
 * |------|---------|-------|-------------|
 * | `PageLayout.Header` | `<header>` | - | GNB 영역 (상단 전폭) |
 * | `PageLayout.Nav` | `<nav>` | `width=240`, `collapsed`, `collapsedWidth=64` | LNB 영역 |
 * | `PageLayout.Content` | `<main>` | - | 본문 (스크롤 영역) |
 * | `PageLayout.Panel` | `<aside>` | `width=320` | 보조 패널 (선택) |
 */
const meta: Meta<typeof PageLayout> = {
  title: "Components/PageLayout",
  component: PageLayout,
  decorators: [(Story) => <div className={lightThemeClass} style={{ height: 480 }}><Story /></div>],
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof PageLayout>;

const demoBox = { padding: 16, fontSize: 13, color: "#626f86" } as const;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { PageLayout } from "@lds/ui-v3";

// 기본 — Header + Nav + Content
<PageLayout>
  <PageLayout.Header>{/* GNB: 로고·전역 메뉴·프로필 */}</PageLayout.Header>
  <PageLayout.Nav>{/* LNB: 메뉴 트리 */}</PageLayout.Nav>
  <PageLayout.Content>
    <Container size="lg">{/* 페이지 본문 */}</Container>
  </PageLayout.Content>
</PageLayout>

// 보조 패널 + LNB 접힘 (상태는 앱이 관리)
const [collapsed, setCollapsed] = useState(false);

<PageLayout>
  <PageLayout.Header>{/* GNB */}</PageLayout.Header>
  <PageLayout.Nav collapsed={collapsed}>{/* LNB */}</PageLayout.Nav>
  <PageLayout.Content>{/* 본문 */}</PageLayout.Content>
  <PageLayout.Panel width={360}>{/* 사건 상세 미리보기 */}</PageLayout.Panel>
</PageLayout>`,
      },
    },
  },
  render: () => (
    <PageLayout style={{ height: "100%" }}>
      <PageLayout.Header><div style={demoBox}>GNB</div></PageLayout.Header>
      <PageLayout.Nav><div style={demoBox}>LNB</div></PageLayout.Nav>
      <PageLayout.Content><div style={demoBox}>Content</div></PageLayout.Content>
      <PageLayout.Panel><div style={demoBox}>Panel</div></PageLayout.Panel>
    </PageLayout>
  ),
};

export const HeaderNavContent: Story = {
  name: "기본 (Header + Nav + Content)",
  render: () => (
    <PageLayout style={{ height: "100%" }}>
      <PageLayout.Header><div style={demoBox}>GNB — 로고 · 전역 메뉴 · 프로필</div></PageLayout.Header>
      <PageLayout.Nav><div style={demoBox}>LNB 메뉴</div></PageLayout.Nav>
      <PageLayout.Content><div style={demoBox}>페이지 본문 — 내부는 Container·Grid·Stack으로 조립</div></PageLayout.Content>
    </PageLayout>
  ),
};

export const CollapsibleNav: Story = {
  name: "LNB 접기/펼치기",
  render: function CollapsibleNavStory() {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <PageLayout style={{ height: "100%" }}>
        <PageLayout.Header>
          <div style={{ ...demoBox, display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => setCollapsed((c) => !c)}>{collapsed ? "펼치기" : "접기"}</button>
            <span>GNB</span>
          </div>
        </PageLayout.Header>
        <PageLayout.Nav collapsed={collapsed}>
          <div style={demoBox}>{collapsed ? "☰" : "LNB 메뉴"}</div>
        </PageLayout.Nav>
        <PageLayout.Content><div style={demoBox}>본문</div></PageLayout.Content>
      </PageLayout>
    );
  },
};
```

- [ ] **Step 6: 배럴 export 추가**

```ts
export {
  PageLayout,
  PageLayoutHeader,
  PageLayoutNav,
  PageLayoutContent,
  PageLayoutPanel,
} from "./components/PageLayout";
export type {
  PageLayoutProps,
  PageLayoutSlotProps,
  PageLayoutNavProps,
  PageLayoutPanelProps,
} from "./components/PageLayout";
```

- [ ] **Step 7: 타입체크 + 테스트**

Run: `pnpm --filter @lawkit/ui check && npx vitest run src/components/PageLayout/PageLayout.test.tsx`
Expected: 에러 0, PASS

- [ ] **Step 8: 커밋**

```bash
git add packages/ui-v3/src/components/PageLayout packages/ui-v3/src/index.ts
git commit -m "feat(ui-v3): PageLayout 페이지 셸 컴포넌트 추가"
```

---

### Task 7: CLAUDE.md 재생성 + docs 사이트 등록

**Files:**
- Regenerate: `packages/ui-v3/CLAUDE.md` (명령으로만)
- Modify: `apps/docs/src/data/component-list.ts` (알파벳 순서 자리에 6종 추가 + 상단 주석 카운트)
- Modify: `apps/docs/src/data/component-previews.ts` (6종 프리뷰 추가)
- Modify: `apps/docs/src/data/component-usage.ts` (6종 사용 코드 추가)
- Regenerate: `apps/docs/src/data/component-props.generated.ts` (`pnpm docs:props`)
- Modify: `apps/docs/app/components/page.tsx` (description "54종" → "60종")
- Modify: `apps/docs/app/not-found.tsx` ("54개 컴포넌트" → "60개 컴포넌트")

**Interfaces:**
- Consumes: Task 1~6의 스토리 TemplateCode (CLAUDE.md 재생성 원천), 배럴 export (props 자동 생성 원천)
- Produces: docs 사이트 `/components/{box,grid,divider,container,spacer,pagelayout}` 상세 페이지

- [ ] **Step 1: CLAUDE.md + Props 표 재생성**

```bash
pnpm --filter @lawkit/ui docs
pnpm docs:props
```

Expected: `packages/ui-v3/CLAUDE.md`에 Box/Container/Divider/Grid/PageLayout/Spacer 섹션 생성, `component-props.generated.ts` 갱신. 직접 수정 금지.

- [ ] **Step 2: component-list.ts에 6종 추가**

`COMPONENT_LIST` 알파벳 순서 자리에 추가 (desc는 "~예요" 톤):

```ts
{ slug: "box", name: "Box", desc: "패딩·배경·테두리를 토큰으로 받는 만능 컨테이너예요." },
{ slug: "container", name: "Container", desc: "본문 최대 폭을 정하고 중앙에 정렬해요." },
{ slug: "divider", name: "Divider", desc: "항상 같은 색·두께로 콘텐츠를 구분하는 선이에요." },
{ slug: "grid", name: "Grid", desc: "동일 폭 컬럼으로 카드와 폼을 정렬하는 격자예요." },
{ slug: "pagelayout", name: "PageLayout", desc: "GNB·LNB·본문 골격을 슬롯으로 제공하는 페이지 셸이에요." },
{ slug: "spacer", name: "Spacer", desc: "남는 공간을 전부 차지해 양끝 배치를 만들어요." },
```

상단 주석 `// 실측 컴포넌트 54종` → `// 실측 컴포넌트 60종`.

- [ ] **Step 3: component-previews.ts에 6종 프리뷰 추가**

기존 인라인 스타일 프리뷰 관례(sweetalert 등)를 따라 추가:

```ts
box: `<div style="padding:14px;background:#fff;border:1px solid #cfd5e1;border-radius:6px"><div style="height:28px;background:rgba(33,81,236,.12);border:1px dashed #2151ec;border-radius:4px"></div></div>`,
container: `<div style="background:#eeeff2;border-radius:6px;padding:10px 0;display:flex;justify-content:center"><div style="width:60%;height:28px;background:#fff;border:1px dashed #2151ec;border-radius:4px"></div></div>`,
divider: `<div style="display:flex;flex-direction:column;gap:8px"><div style="height:10px;background:#eeeff2;border-radius:3px"></div><div style="height:1px;background:#cfd5e1"></div><div style="height:10px;background:#eeeff2;border-radius:3px"></div></div>`,
grid: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px"><i style="height:22px;background:rgba(33,81,236,.12);border-radius:4px"></i><i style="height:22px;background:rgba(33,81,236,.12);border-radius:4px"></i><i style="height:22px;background:rgba(33,81,236,.12);border-radius:4px"></i><i style="height:22px;background:rgba(33,81,236,.12);border-radius:4px"></i><i style="height:22px;background:rgba(33,81,236,.12);border-radius:4px"></i><i style="height:22px;background:rgba(33,81,236,.12);border-radius:4px"></i></div>`,
pagelayout: `<div style="border:1px solid #cfd5e1;border-radius:6px;overflow:hidden;height:64px;display:flex;flex-direction:column"><div style="height:14px;background:#4c5469"></div><div style="display:flex;flex:1"><div style="width:26%;background:#eeeff2;border-right:1px solid #cfd5e1"></div><div style="flex:1;background:#fff"></div></div></div>`,
spacer: `<div style="display:flex;align-items:center;gap:6px;border:1px solid #cfd5e1;border-radius:6px;padding:6px"><i style="width:30%;height:18px;background:rgba(33,81,236,.12);border-radius:4px"></i><i style="flex:1;height:18px;background:repeating-linear-gradient(135deg,#e2e8f0 0 3px,transparent 3px 7px);border-radius:4px"></i><i style="width:20%;height:18px;background:#2151ec;border-radius:4px"></i></div>`,
```

(프리뷰의 hex는 문서 사이트 데모 전용 — globals.css의 기존 `p-*` 클래스로 대체 가능한 경우 그것을 우선 사용.)

- [ ] **Step 4: component-usage.ts에 6종 추가**

각 slug의 값은 재생성된 `packages/ui-v3/CLAUDE.md` 해당 섹션의 TemplateCode 문자열과 동일하게 (import 경로 `@lds/ui-v3` 통일, `\n` 이스케이프 문자열).

- [ ] **Step 5: 카운트 문구 갱신**

- `apps/docs/app/components/page.tsx`의 description "54종" → "60종"
- `apps/docs/app/not-found.tsx`의 "54개 컴포넌트" → "60개 컴포넌트"

- [ ] **Step 6: docs 타입체크 + 빌드**

```bash
pnpm --filter @lds/docs check
pnpm --filter @lds/docs build
```

Expected: 에러 0.

- [ ] **Step 7: 커밋**

```bash
git add packages/ui-v3/CLAUDE.md apps/docs/src/data apps/docs/app/components/page.tsx apps/docs/app/not-found.tsx
git commit -m "docs: 레이아웃 프리미티브 6종 문서 등록 — 컴포넌트 60종"
```

---

### Task 8: 전체 검증

**Files:** 없음 (검증만)

**Interfaces:**
- Consumes: Task 1~7 전체
- Produces: 배포 게이트 통과 가능 상태 (테스트 전체 + 전수 타입체크 + docs 빌드)

- [ ] **Step 1: ui-v3 전체 테스트**

Run: `pnpm --filter @lawkit/ui test`
Expected: 기존 61파일 475개 + 신규 6파일 전부 PASS (0 fail).

- [ ] **Step 2: 전수 타입체크**

Run: `pnpm --filter @lawkit/ui check && pnpm --filter @lds/docs check`
Expected: 에러 0.

- [ ] **Step 3: HANDOFF.md 갱신**

HANDOFF.md의 현재 상태 표(컴포넌트 54개→60개, 테스트 카운트), 「다음 작업 후보」 1번에서 완료 항목 반영. 커밋:

```bash
git add HANDOFF.md
git commit -m "docs: HANDOFF 갱신 — 레이아웃 프리미티브 6종 완료"
```

- [ ] **Step 4: 푸시 여부는 사용자에게 확인** (CI가 npm publish까지 수행하므로 임의 푸시 금지)

---

## Self-Review 결과

- **Spec coverage:** 시안의 6개 컴포넌트(Box/Grid/Divider/Container/Spacer/PageLayout) 모두 Task 1~6에 대응. 시안의 "LNB 접힘 상태를 셸이 관리"는 v1에서 controlled prop(`collapsed`)으로 단순화 — 상태 소유는 앱, 셸은 폭 전환/트랜지션만 담당(스토리에 사용 예 포함). docs 등록·카운트 갱신은 Task 7, HANDOFF 갱신은 Task 8.
- **Placeholder scan:** 통과 — Task 4의 component-usage 문자열만 "재생성된 CLAUDE.md와 동일하게"로 위임하는데, 이는 원천이 자동 생성물이라 복붙이 오히려 드리프트를 만들기 때문 (규칙: CLAUDE.md TemplateCode가 원본).
- **Type consistency:** BoxSpacing/GridGap 모두 `keyof typeof themeVars.spacing`으로 동일 계열. PageLayout named export 4종과 dot 프로퍼티 일치 테스트 포함.
