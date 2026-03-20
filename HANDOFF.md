# LDS 디자인 시스템 — 작업 핸드오프

> 2026-03-20 작업 기준. 집에서 이어서 할 때 이 파일을 Claude에게 전달하세요.
> "HANDOFF.md 읽고 이어서 작업해줘" 하면 됩니다.

## 프로젝트 위치
- 레포: `github.com/cartoonpoet/LDS`
- 브랜치: `yeoni/design-system-setup`
- 패키지: `packages/ui-v3/src/`
- Zeplin 스타일가이드: `https://app.zeplin.io/styleguide/639bef141f03481409421455`

---

## 완료된 컴포넌트 (27개)

| # | 컴포넌트 | Zeplin | 커밋 |
|---|---------|--------|------|
| 1 | Alert | 기존 | 이전 |
| 2 | Button | 기존 | 이전 |
| 3 | ButtonGroup | 기존 | acc2e1c |
| 4 | ButtonTab | 기존 | acc2e1c |
| 5 | Tabs | 기존 | acc2e1c |
| 6 | NavigationTab | 기존 | acc2e1c |
| 7 | IconButtonGroup | 기존 | acc2e1c |
| 8 | ChipsNavigation | 기존 | acc2e1c |
| 9 | Card | 9) Cards | 9931a19 |
| 10 | Collapse | 8) Collapse | 453d984 |
| 11 | Dropdown | 19) Select | 5943dc1 |
| 12 | ListGroup | 10) List groups | 1826e4c |
| 13 | Modal + ModalHeader/Body/Footer | 11) Modals (표준 4사이즈) | 1826e4c (같이 포함됨) |
| 14 | SweetAlert | 11) Modals (Sweet Alert) | 1826e4c (같이 포함됨) |
| 15 | Pagination + PaginationCount | 12) Paginations | 31f7537 |
| 16 | ProgressBar + StepBar | 14) Progress | 7440e6f |
| 17 | Tooltip | 15) Tooltips & Popovers | a01d2f1 |
| 18 | Popover | 15) Tooltips & Popovers | a01d2f1 |
| 19 | ChartTooltip | 15) Tooltips (Chart) | (미커밋) |
| 20 | InfoPopover | 15) Tooltips (Info Popovers) | (미커밋) |
| 21 | CalendarPopover | 15) Tooltips (Calendar Popovers) | (미커밋) |
| 22 | Toast + ToastContainer | 17) Bootstrap Toasts & Toastr | (미커밋) |
| 23 | Input + InputGroup + MultiSelect | 18) Input & Inputgroups | (미커밋) |
| 24 | TagSelect | 19) Selects | (미커밋) |
| 25 | Switch | 20) Switches | (미커밋) |
| 26 | Checkbox | 21) Checkboxes | (미커밋) |
| 27 | Radio + RadioGroup | 22) Radios | (미커밋) |

### 함께 생성된 유틸리티
- `src/lib/Portal.tsx` — createPortal SSR-safe 래퍼
- `src/lib/useFocusTrap.ts` — 포커스 트랩 훅
- `src/lib/cx.ts` — className 합치기 (기존)

---

## 남은 Zeplin 컴포넌트 (미구현)

Zeplin 스타일가이드에서 아직 구현하지 않은 항목들:

| Zeplin 번호 | 이름 | 비고 |
|-------------|------|------|
| ~~13) Tooltips~~ | ~~Tooltip~~ | ✅ 완료 |
| 15) Spinners | Spinner/Loading | |
| 16) Breadcrumbs | Breadcrumb | |
| 17) Avatar | Avatar | |
| ~~18) Input & Inputgroups~~ | ~~Input, InputGroup~~ | ✅ 완료 (에디터 제외) |
| ~~19) Select~~ | ~~Select 추가 변형~~ | ✅ TagSelect로 완료 |
| 20) Textarea | Textarea | 폼 컴포넌트 |
| ~~21) Checkbox~~ | ~~Checkbox~~ | ✅ 완료 |
| ~~22) Radio~~ | ~~Radio~~ | ✅ 완료 |
| ~~23) Switch/Toggle~~ | ~~Switch~~ | ✅ 완료 |
| 24) DatePicker | DatePicker | 복잡도 높음 |
| 25) Table | Table | 복잡도 높음 |
| 11) Modals 후속 | ~~Popover~~, FloatingModal, FullScreenModal | Popover ✅ 완료, 나머지 후속 |

> Zeplin 스타일가이드 URL에서 component ID를 넣어 확인 가능:
> `https://app.zeplin.io/styleguide/639bef141f03481409421455/component/{COMPONENT_ID}`

---

## 코드베이스 컨벤션 (새 컴포넌트 만들 때 따라야 할 패턴)

### 파일 구조
```
packages/ui-v3/src/components/{ComponentName}/
  {ComponentName}.css.ts    — vanilla-extract 스타일
  index.tsx                 — 컴포넌트 코드
  {ComponentName}.stories.tsx — Storybook 스토리
```

### 스타일 패턴 (vanilla-extract)
```ts
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars, grayPalette, opacityPalette } from "@lds/tokens";

// recipe = variants 있을 때
export const root = recipe({
  base: { /* 공통 스타일 */ },
  variants: { size: { small: {}, medium: {} } },
  defaultVariants: { size: "medium" },
});

// style = 정적 스타일
export const body = style({ padding: themeVars.spacing.x4 });
```

### 컴포넌트 패턴
```tsx
import type { ReactNode, HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./{ComponentName}.css";

export interface {ComponentName}Props extends HTMLAttributes<HTMLDivElement> { ... }

export function {ComponentName}({ className, ...rest }: {ComponentName}Props) {
  return <div className={cx(s.root({ variant }), className)} {...rest} />;
}
```

### Storybook 패턴
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";

const meta: Meta<typeof Component> = {
  title: "Components/{ComponentName}",
  component: Component,
  decorators: [(Story) => (
    <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
      <Story />
    </div>
  )],
  tags: ["autodocs"],
};
// JSDoc으로 상세 문서 + Template Code 포함
```

### Compound 패턴 (Card, Modal처럼 서브컴포넌트가 있는 경우)
- 간편 API: props로 header/footer 전달
- Compound: `<ModalHeader>`, `<ModalBody>`, `<ModalFooter>` 직접 조합

### 토큰 참조
| 용도 | 토큰 |
|------|------|
| 배경 (흰색) | `semanticColorRoles.surface.canvas` |
| 텍스트 기본 | `semanticColorRoles.text.primary` |
| 텍스트 제목 | `semanticColorRoles.text.heading` |
| 텍스트 보조 | `grayPalette[800]`, `grayPalette[500]` |
| 테두리 | `semanticColorRoles.border.subtle` 또는 `grayPalette[200]` |
| 액센트 파란색 | `semanticColorRoles.action.primary.default` |
| 반투명 배경 | `opacityPalette.light` (회색), `opacityPalette.primary` (파란) |
| 간격 | `themeVars.spacing.x1~x6` (4~24px) |
| 라운드 | `themeVars.radius.sm/md/lg` (4/6/8px) |
| 그림자 | `themeVars.shadow.raised`, `themeVars.shadow.focus` |
| 폰트 | `themeVars.font.sizeSm/sizeMd/sizeLg` (12/14/16px) |

### 배럴 export
`packages/ui-v3/src/index.ts`에 컴포넌트 + 타입 export 추가.

### 검증
```bash
npx tsc --noEmit -p packages/ui-v3/tsconfig.json
```

### 커밋 컨벤션
```
feat: {컴포넌트명} 컴포넌트 개발
```

---

## 이어서 작업하는 법

```bash
cd ~/Documents/GitHub/LDS   # 또는 집 컴퓨터 경로
git pull
```

그 다음 Claude에게:
```
HANDOFF.md 읽고, Zeplin 스타일가이드에서 다음 컴포넌트 개발해줘
https://app.zeplin.io/styleguide/639bef141f03481409421455/component/{ID}
```

---

> 이 파일은 작업 완료 후 삭제해도 됩니다.
