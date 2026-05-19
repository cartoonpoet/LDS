# HStack / VStack 컴포넌트 설계

**날짜:** 2026-05-20
**패키지:** `packages/ui-v3`

## 배경

서비스 프로젝트에서 레이아웃 구성 시 `display: flex`를 직접 CSS로 작성하는 패턴이 반복된다. `HStack` / `VStack`을 디자인 시스템에 추가해 flex 레이아웃을 선언적으로 표현할 수 있게 한다.

---

## 파일 구조

```
packages/ui-v3/src/components/Stack/
  index.tsx         ← HStack, VStack 컴포넌트 + 타입 export
  Stack.css.ts      ← vanilla-extract recipe
  Stack.test.tsx    ← vitest + testing-library 테스트
```

`src/index.ts`에 HStack, VStack 및 관련 타입을 export 추가한다.

---

## Props

`HStackProps`와 `VStackProps`는 동일하다. 둘 다 `HTMLAttributes<HTMLDivElement>`를 extend한다.

| prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `gap` | `'x1' \| 'x2' \| 'x3' \| 'x4' \| 'x5' \| 'x6'` | — | 자식 간격. 디자인 토큰 기반 (4~24px) |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | 교차축 정렬 (alignItems) |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | 주축 정렬 (justifyContent) |
| `className` | `string` | — | 추가 클래스 |
| `style` | `CSSProperties` | — | 인라인 스타일 override |
| `children` | `ReactNode` | — | |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | — | onClick 등 네이티브 어트리뷰트 전달 |

---

## 구현 방식

### Stack.css.ts

`recipe()`로 `direction`, `align`, `justify` variants 정의. 빌드 타임에 CSS 클래스로 생성된다.

```ts
export const stack = recipe({
  base: {
    display: 'flex',
    boxSizing: 'border-box',
  },
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      column: { flexDirection: 'column' },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
    },
  },
  defaultVariants: {
    align: 'stretch',
    justify: 'start',
  },
})
```

### index.tsx

- `HStack`: `direction: 'row'`로 recipe 호출
- `VStack`: `direction: 'column'`으로 recipe 호출
- `gap`은 `inline style`로 주입 (`themeVars.spacing[gap]` → CSS 변수 `var(--spacing-x2)` 등)
- `style` prop이 함께 오면 gap 뒤에 spread하여 사용자 override 허용

```tsx
export function HStack({ gap, align, justify, className, style, children, ...rest }: HStackProps) {
  return (
    <div
      className={cx(s.stack({ direction: 'row', align, justify }), className)}
      style={gap ? { gap: themeVars.spacing[gap], ...style } : style}
      {...rest}
    >
      {children}
    </div>
  )
}
```

VStack은 `direction: 'column'`만 다르고 동일한 구조.

---

## 사용 예시

```tsx
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
</VStack>
```

---

## 테스트 계획

`Stack.test.tsx`에서 HStack / VStack 각각 검증:

1. children 렌더링
2. `gap` prop → `style.gap`에 CSS 변수값 적용
3. `align` / `justify` → 해당 클래스 적용 확인
4. `className` 머지
5. 네이티브 HTML 어트리뷰트 전달 (`data-testid` 등)

---

## 스토리북

`Stack.stories.tsx` 파일을 컴포넌트 폴더 안에 추가한다. 기존 Button.stories.tsx 패턴을 따른다.

### 포함할 Story

| Story | 설명 |
|---|---|
| `TemplateCode` | 복사용 코드 스니펫. `docs.source.code`에 주요 사용 패턴 명시 |
| `HStackDefault` | gap="x2" 기본 |
| `HStackJustifyBetween` | justify="between" align="center" (헤더 패턴) |
| `VStackDefault` | gap="x4" 기본 (폼 패턴) |
| `GapShowcase` | render()로 x1~x6 gap 모두 시각적으로 비교 |
| `AlignShowcase` | render()로 align 4종 비교 |

### argTypes

`gap`, `align`, `justify` 모두 `control: "select"`로 controls 패널에서 조작 가능하게.

---

## index.ts export 추가

```ts
export { HStack, VStack } from './components/Stack'
export type { HStackProps, VStackProps, StackGap, StackAlign, StackJustify } from './components/Stack'
```
