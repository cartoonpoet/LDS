# HStack / VStack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `packages/ui-v3`에 `HStack` / `VStack` flex 레이아웃 컴포넌트를 추가하고 스토리북과 테스트를 함께 제공한다.

**Architecture:** vanilla-extract `recipe()`로 `direction` / `align` / `justify` variants를 빌드 타임 CSS로 생성하고, `gap`은 `themeVars.spacing` 토큰을 inline style로 주입한다. HStack / VStack은 동일한 recipe를 공유하며 direction만 다르다.

**Tech Stack:** React, TypeScript, vanilla-extract (`@vanilla-extract/css`, `@vanilla-extract/recipes`), `@lds/tokens`, Vitest, Testing Library, Storybook

---

## File Map

| 파일 | 작업 |
|---|---|
| `packages/ui-v3/src/components/Stack/Stack.css.ts` | 신규 생성 — recipe 정의 |
| `packages/ui-v3/src/components/Stack/index.tsx` | 신규 생성 — HStack, VStack, 타입 |
| `packages/ui-v3/src/components/Stack/Stack.test.tsx` | 신규 생성 — 테스트 |
| `packages/ui-v3/src/components/Stack/Stack.stories.tsx` | 신규 생성 — 스토리북 |
| `packages/ui-v3/src/index.ts` | 수정 — export 추가 |

---

## Task 1: Stack.css.ts — recipe 작성

**Files:**
- Create: `packages/ui-v3/src/components/Stack/Stack.css.ts`

- [ ] **Step 1: 파일 생성**

```ts
// packages/ui-v3/src/components/Stack/Stack.css.ts
import { recipe } from "@vanilla-extract/recipes";

export const stack = recipe({
  base: {
    display: "flex",
    boxSizing: "border-box",
  },
  variants: {
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
    },
  },
  defaultVariants: {
    align: "stretch",
    justify: "start",
  },
});
```

- [ ] **Step 2: 커밋**

```bash
git add packages/ui-v3/src/components/Stack/Stack.css.ts
git commit -m "feat(Stack): add vanilla-extract recipe"
```

---

## Task 2: HStack 테스트 작성 (실패 확인)

**Files:**
- Create: `packages/ui-v3/src/components/Stack/Stack.test.tsx`

- [ ] **Step 1: 테스트 파일 작성**

```tsx
// packages/ui-v3/src/components/Stack/Stack.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { themeVars } from "@lds/tokens";
import { HStack } from ".";

describe("HStack", () => {
  it("renders children", () => {
    render(<HStack><span>child</span></HStack>);
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("renders as div by default", () => {
    const { container } = render(<HStack>x</HStack>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies gap via inline style", () => {
    const { container } = render(<HStack gap="x2">x</HStack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe(themeVars.spacing.x2);
  });

  it("does not set gap style when gap is omitted", () => {
    const { container } = render(<HStack>x</HStack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe("");
  });

  it("applies different className for different align values", () => {
    const { rerender, container } = render(<HStack align="center">x</HStack>);
    const centerClass = (container.firstChild as HTMLElement).className;
    rerender(<HStack align="start">x</HStack>);
    const startClass = (container.firstChild as HTMLElement).className;
    expect(centerClass).not.toBe(startClass);
  });

  it("applies different className for different justify values", () => {
    const { rerender, container } = render(<HStack justify="between">x</HStack>);
    const betweenClass = (container.firstChild as HTMLElement).className;
    rerender(<HStack justify="center">x</HStack>);
    const centerClass = (container.firstChild as HTMLElement).className;
    expect(betweenClass).not.toBe(centerClass);
  });

  it("merges custom className", () => {
    const { container } = render(<HStack className="my-class">x</HStack>);
    expect((container.firstChild as HTMLElement).className).toContain("my-class");
  });

  it("merges custom style with gap", () => {
    const { container } = render(
      <HStack gap="x2" style={{ padding: "8px" }}>x</HStack>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe(themeVars.spacing.x2);
    expect(el.style.padding).toBe("8px");
  });

  it("forwards native HTML attributes", () => {
    render(<HStack data-testid="hstack">x</HStack>);
    expect(screen.getByTestId("hstack")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
cd packages/ui-v3 && pnpm test -- --run Stack.test
```

Expected: `HStack` not found — `Cannot find module '.'` 또는 named export 에러

---

## Task 3: HStack 구현

**Files:**
- Create: `packages/ui-v3/src/components/Stack/index.tsx`

- [ ] **Step 1: index.tsx 작성 (HStack만)**

```tsx
// packages/ui-v3/src/components/Stack/index.tsx
import type { HTMLAttributes, ReactNode } from "react";
import { themeVars } from "@lds/tokens";
import { cx } from "../../lib/cx";
import * as s from "./Stack.css";

/* ─── Types ─── */
export type StackGap = keyof typeof themeVars.spacing;
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between";

export interface HStackProps extends HTMLAttributes<HTMLDivElement> {
  /** 자식 간격 (디자인 토큰 기반: x1=4px ~ x6=24px) */
  gap?: StackGap;
  /** 교차축 정렬 (alignItems) */
  align?: StackAlign;
  /** 주축 정렬 (justifyContent) */
  justify?: StackJustify;
  children?: ReactNode;
}

export type VStackProps = HStackProps;

/* ─── Components ─── */
export function HStack({
  gap,
  align,
  justify,
  className,
  style,
  children,
  ...rest
}: HStackProps) {
  return (
    <div
      className={cx(s.stack({ direction: "row", align, justify }), className)}
      style={gap ? { gap: themeVars.spacing[gap], ...style } : style}
      {...rest}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: HStack 테스트 실행 — 통과 확인**

```bash
cd packages/ui-v3 && pnpm test -- --run Stack.test
```

Expected: HStack describe 블록 9개 테스트 PASS

- [ ] **Step 3: 커밋**

```bash
git add packages/ui-v3/src/components/Stack/index.tsx \
        packages/ui-v3/src/components/Stack/Stack.test.tsx
git commit -m "feat(Stack): implement HStack with tests"
```

---

## Task 4: VStack 테스트 작성 (실패 확인) → 구현 → 통과

**Files:**
- Modify: `packages/ui-v3/src/components/Stack/Stack.test.tsx`
- Modify: `packages/ui-v3/src/components/Stack/index.tsx`

- [ ] **Step 1: VStack describe 블록 추가 (아직 VStack 없으므로 실패 예정)**

`Stack.test.tsx` 파일 맨 아래에 다음을 추가한다. (기존 HStack import 줄에 `VStack` 추가)

import 줄 변경:
```tsx
import { HStack, VStack } from ".";
```

파일 끝에 추가:
```tsx
describe("VStack", () => {
  it("renders children", () => {
    render(<VStack><span>child</span></VStack>);
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("renders as div", () => {
    const { container } = render(<VStack>x</VStack>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies gap via inline style", () => {
    const { container } = render(<VStack gap="x4">x</VStack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe(themeVars.spacing.x4);
  });

  it("applies different className for different align values", () => {
    const { rerender, container } = render(<VStack align="center">x</VStack>);
    const centerClass = (container.firstChild as HTMLElement).className;
    rerender(<VStack align="end">x</VStack>);
    const endClass = (container.firstChild as HTMLElement).className;
    expect(centerClass).not.toBe(endClass);
  });

  it("merges custom className", () => {
    const { container } = render(<VStack className="v-class">x</VStack>);
    expect((container.firstChild as HTMLElement).className).toContain("v-class");
  });

  it("forwards native HTML attributes", () => {
    render(<VStack data-testid="vstack">x</VStack>);
    expect(screen.getByTestId("vstack")).toBeInTheDocument();
  });

  it("has different className from HStack (direction differs)", () => {
    const { container: hc } = render(<HStack>x</HStack>);
    const { container: vc } = render(<VStack>x</VStack>);
    expect((hc.firstChild as HTMLElement).className).not.toBe(
      (vc.firstChild as HTMLElement).className
    );
  });
});
```

- [ ] **Step 2: 테스트 실행 — VStack 테스트 실패 확인**

```bash
cd packages/ui-v3 && pnpm test -- --run Stack.test
```

Expected: `VStack` is not exported from `'.'` 에러 (VStack 미구현)

- [ ] **Step 3: index.tsx에 VStack 추가**

`packages/ui-v3/src/components/Stack/index.tsx` 파일 끝에 추가:

```tsx
export function VStack({
  gap,
  align,
  justify,
  className,
  style,
  children,
  ...rest
}: VStackProps) {
  return (
    <div
      className={cx(s.stack({ direction: "column", align, justify }), className)}
      style={gap ? { gap: themeVars.spacing[gap], ...style } : style}
      {...rest}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: 전체 테스트 실행 — 통과 확인**

```bash
cd packages/ui-v3 && pnpm test -- --run Stack.test
```

Expected: HStack 9개 + VStack 7개 총 16개 PASS

- [ ] **Step 5: 커밋**

```bash
git add packages/ui-v3/src/components/Stack/Stack.test.tsx \
        packages/ui-v3/src/components/Stack/index.tsx
git commit -m "feat(Stack): implement VStack with tests"
```

---

## Task 5: Storybook stories 작성

**Files:**
- Create: `packages/ui-v3/src/components/Stack/Stack.stories.tsx`

- [ ] **Step 1: stories 파일 작성**

```tsx
// packages/ui-v3/src/components/Stack/Stack.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { HStack, VStack } from ".";

/**
 * ## HStack / VStack
 *
 * flex 레이아웃을 선언적으로 표현하는 레이아웃 컴포넌트입니다.
 * `HStack`은 가로 방향, `VStack`은 세로 방향으로 자식을 배치합니다.
 *
 * ### Import
 * ```tsx
 * import { HStack, VStack } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `gap` | `"x1" \| "x2" \| "x3" \| "x4" \| "x5" \| "x6"` | - | 자식 간격 (4~24px 토큰) |
 * | `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` | 교차축 정렬 (alignItems) |
 * | `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` | 주축 정렬 (justifyContent) |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 * | `style` | `CSSProperties` | - | 인라인 스타일 |
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 */
const meta: Meta<typeof HStack> = {
  title: "Components/Stack",
  component: HStack,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: "select",
      options: ["x1", "x2", "x3", "x4", "x5", "x6"],
      description: "자식 간격. x1=4px, x2=8px, x3=12px, x4=16px, x5=20px, x6=24px",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
      description: "교차축 정렬 (alignItems)",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
      description: "주축 정렬 (justifyContent)",
    },
  },
};
export default meta;
type Story = StoryObj<typeof HStack>;

export const TemplateCode: Story = {
  name: "Template Code",
  args: { gap: "x2" },
  parameters: {
    docs: {
      source: {
        code: `import { HStack, VStack } from "@lds/ui-v3";

// 기본 — gap만
<HStack gap="x2">
  <Button>취소</Button>
  <Button color="primary">확인</Button>
</HStack>

// 헤더 양끝 배치
<HStack gap="x3" justify="between" align="center">
  <h2>제목</h2>
  <Button>추가</Button>
</HStack>

// 폼 세로 쌓기
<VStack gap="x4">
  <Input label="이름" />
  <Input label="이메일" />
  <Button>제출</Button>
</VStack>`,
      },
    },
  },
  render: (args) => (
    <HStack {...args}>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 1</div>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 2</div>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 3</div>
    </HStack>
  ),
};

export const HStackDefault: Story = {
  name: "HStack — 기본",
  args: { gap: "x2" },
  render: (args) => (
    <HStack {...args}>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 1</div>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 2</div>
      <div style={{ padding: "8px 16px", background: "#e0e7ff", borderRadius: 4 }}>Item 3</div>
    </HStack>
  ),
};

export const HStackJustifyBetween: Story = {
  name: "HStack — 헤더 패턴 (justify=between)",
  render: () => (
    <HStack
      justify="between"
      align="center"
      style={{ padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: 8 }}
    >
      <span style={{ fontWeight: 600 }}>카드 제목</span>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ padding: "4px 12px", background: "#6366f1", color: "#fff", borderRadius: 4, fontSize: 13 }}>편집</div>
        <div style={{ padding: "4px 12px", background: "#f1f5f9", borderRadius: 4, fontSize: 13 }}>삭제</div>
      </div>
    </HStack>
  ),
};

export const VStackDefault: Story = {
  name: "VStack — 기본 (폼 패턴)",
  render: () => (
    <VStack gap="x3" style={{ width: 300 }}>
      <div style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 4, fontSize: 14 }}>이름 입력</div>
      <div style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 4, fontSize: 14 }}>이메일 입력</div>
      <div style={{ padding: "8px 16px", background: "#6366f1", color: "#fff", borderRadius: 4, fontSize: 14, textAlign: "center" }}>
        제출
      </div>
    </VStack>
  ),
};

export const GapShowcase: Story = {
  name: "Gap 토큰 비교 (x1~x6)",
  render: () => (
    <VStack gap="x4">
      {(["x1", "x2", "x3", "x4", "x5", "x6"] as const).map((g) => (
        <div key={g}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>gap="{g}"</div>
          <HStack gap={g}>
            <div style={{ padding: "6px 14px", background: "#e0e7ff", borderRadius: 4 }}>A</div>
            <div style={{ padding: "6px 14px", background: "#e0e7ff", borderRadius: 4 }}>B</div>
            <div style={{ padding: "6px 14px", background: "#e0e7ff", borderRadius: 4 }}>C</div>
          </HStack>
        </div>
      ))}
    </VStack>
  ),
};

export const AlignShowcase: Story = {
  name: "Align 비교 (start/center/end/stretch)",
  render: () => (
    <VStack gap="x4">
      {(["start", "center", "end", "stretch"] as const).map((a) => (
        <div key={a}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>align="{a}"</div>
          <HStack
            align={a}
            gap="x2"
            style={{ height: 60, border: "1px dashed #cbd5e1", borderRadius: 4, padding: "0 8px" }}
          >
            <div style={{ padding: "4px 12px", background: "#e0e7ff", borderRadius: 4 }}>짧음</div>
            <div style={{ padding: "12px", background: "#c7d2fe", borderRadius: 4 }}>길어요</div>
            <div style={{ padding: "4px 12px", background: "#e0e7ff", borderRadius: 4 }}>짧음</div>
          </HStack>
        </div>
      ))}
    </VStack>
  ),
};
```

- [ ] **Step 2: 커밋**

```bash
git add packages/ui-v3/src/components/Stack/Stack.stories.tsx
git commit -m "feat(Stack): add Storybook stories"
```

---

## Task 6: src/index.ts export 추가 + 전체 테스트

**Files:**
- Modify: `packages/ui-v3/src/index.ts`

- [ ] **Step 1: export 추가**

`packages/ui-v3/src/index.ts`에서 AutoComplete export 블록 바로 아래에 추가:

```ts
export { HStack, VStack } from "./components/Stack";
export type {
  HStackProps,
  VStackProps,
  StackGap,
  StackAlign,
  StackJustify,
} from "./components/Stack";
```

- [ ] **Step 2: 전체 테스트 실행**

```bash
cd packages/ui-v3 && pnpm test -- --run
```

Expected: 전체 테스트 PASS (Stack 포함 16개 신규 테스트)

- [ ] **Step 3: 커밋**

```bash
git add packages/ui-v3/src/index.ts
git commit -m "feat(Stack): export HStack, VStack from @lds/ui-v3"
```
