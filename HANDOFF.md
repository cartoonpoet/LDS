# LDS 디자인 시스템 — 작업 핸드오프

> 2026-03-30 작업 기준. 다른 컴퓨터에서 이어서 할 때 이 파일을 Claude에게 전달하세요.
> "HANDOFF.md 읽고 이어서 작업해줘" 하면 됩니다.

## 프로젝트 위치
- 레포: `github.com/cartoonpoet/LDS`
- 브랜치: `main` (기존 `yeoni/design-system-setup` 브랜치는 PR #7로 머지 완료)
- 패키지: `packages/ui-v3/src/`
- Zeplin 스타일가이드: `https://app.zeplin.io/styleguide/639bef141f03481409421455`

---

## 완료된 컴포넌트 (38개)

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
| 13 | Modal + ModalHeader/Body/Footer | 11) Modals (표준 4사이즈) | 1826e4c |
| 14 | SweetAlert | 11) Modals (Sweet Alert) | 1826e4c |
| 15 | Pagination + PaginationCount | 12) Paginations | 31f7537 |
| 16 | ProgressBar + StepBar | 14) Progress | 7440e6f |
| 17 | Tooltip | 15) Tooltips & Popovers | a01d2f1 |
| 18 | Popover | 15) Tooltips & Popovers | a01d2f1 |
| 19 | ChartTooltip | 15) Tooltips (Chart) | 718b530 (PR 머지) |
| 20 | InfoPopover | 15) Tooltips (Info Popovers) | 718b530 |
| 21 | CalendarPopover | 15) Tooltips (Calendar Popovers) | 718b530 |
| 22 | Toast + ToastContainer | 17) Bootstrap Toasts & Toastr | 718b530 |
| 23 | Input + InputGroup + MultiSelect | 18) Input & Inputgroups | 718b530 |
| 24 | TagSelect | 19) Selects | 718b530 |
| 25 | Switch | 20) Switches | 718b530 |
| 26 | Checkbox | 21) Checkboxes | 718b530 |
| 27 | Radio + RadioGroup | 22) Radios | 718b530 |
| 28 | DatePicker + DateRangePicker | 22) Date & Time Pickers | 718b530 |
| 29 | FileUploadArea + FileThumbnail + FileItem + FileAttachBadge | 23) File Uploads | 718b530 |
| 30 | NumberInput | 24) Number Inputs | 718b530 |
| 31 | Slider + RangeSlider | 25) Sliders | 718b530 |
| 32 | Avatar + AvatarGroup | 26) Avatars | 718b530 |
| 33 | Widget + StatCell + StatGrid + QuickMenuItem + ScheduleItem | 28) Widgets | 718b530 |
| 34 | DataTable | 30) DataTables (@tanstack/react-table) | 718b530 |
| 35 | TreeView | 38) Tree View (계층 구조 트리) | 718b530 |
| 36 | Mention | 인라인 멘션 태그 (@사용자) | 718b530 |
| 37 | **Spinner** | 15) Spinners | eac3798 |
| 38 | **Skeleton** (+ Skeleton.Content) | 자체 디자인 | 055872e |

### 함께 생성된 유틸리티
- `src/lib/Portal.tsx` — createPortal SSR-safe 래퍼
- `src/lib/useFocusTrap.ts` — 포커스 트랩 훅
- `src/lib/cx.ts` — className 합치기 (기존)

---

## 테스트 코드 (2026-03-23 완료)

**41개 테스트 파일, 272개 테스트** — 전체 통과 ✅

- 스택: Vitest 4.1.0 + @testing-library/react 16.3.2 + @testing-library/user-event + jsdom 28.1.0
- 공통 헬퍼: `src/test/utils.tsx` (`renderWithUser` — render + userEvent.setup())
- 커밋: `f4bae15`

| 배치 | 대상 | 테스트 수 |
|------|------|----------|
| 0 | cx, Portal, useFocusTrap | 12 |
| 1 | Button, Checkbox, Switch, Radio | 31 |
| 2 | Input, InputGroup, MultiSelect, NumberInput | 23 |
| 3 | Dropdown, Collapse/CollapseGroup | 21 |
| 4 | Modal, SweetAlert | 22 |
| 5 | Popover, Tooltip, Toast | 24 |
| 6 | Alert, Avatar, Skeleton, Spinner, Mention, Card | 33 |
| 7 | Tabs, ButtonTab, NavigationTab, Pagination, ButtonGroup, IconButtonGroup, ChipsNavigation | 27 |
| 8 | DatePicker/DateRangePicker, Slider/RangeSlider, TagSelect, FileUpload | 33 |
| 9 | Widget, TreeView, DataTable, CalendarPopover, InfoPopover, Progress, ListGroup, ChartTooltip | 46 |

### 테스트 기술 참고사항
- **Tooltip**: `fireEvent.mouseEnter/Leave` + `act(() => vi.advanceTimersByTime())` (fake timers + React state flush)
- **Toast**: jsdom에서 animationend 미발생 → exiting 상태 검증으로 대체
- **DatePicker**: `fireEvent.click()` 사용 (userEvent + fake timers 충돌 회피)
- **TagSelect**: `fireEvent.focus()` 사용 (onFocus + trigger onClick 동시 발생 시 toggle 문제 회피)
- **Slider/RangeSlider**: jsdom 한계로 드래그 시뮬레이션 스킵, 렌더링/disabled/값 표시만 검증

---

## CI / 배포

- **Vercel 자동 배포**: `apps/storybook` → Vercel 연결
- **테스트 게이트**: `vercel.json`의 `buildCommand`에서 `pnpm --filter @lds/ui-v3 test`를 먼저 실행. 테스트 실패 시 배포 중단.
- 커밋: `d4d11aa`

---

## 스토리북 문서

- **테마 가이드**: `src/components/Theming.stories.tsx` — 브랜드 컬러 커스터마이징 방법 문서화
  - `createLdsThemeVars()`로 런타임 CSS 변수 오버라이드
  - 5개 프리셋 예시 (Law.ai, Green, Purple, Orange, Scourt Blue)
  - 커밋: `c20198d`

---

## 스토리북 Template Code 스토리 (2026-03-30 완료)

**38개 전체 컴포넌트**에 `TemplateCode` 스토리 추가 완료.

### 목적
- JSDoc 안에 묻혀있던 템플릿 코드를 전용 스토리로 분리
- Storybook 사이드바에서 "Template Code"로 바로 접근 가능
- `parameters.docs.source.code`로 복사 버튼 내장 (추가 애드온 불필요)
- AI와 개발자 모두 쉽게 복붙 가능

### 변경 내용 (파일당)
1. `export const TemplateCode: Story` 추가 — `type Story` 선언 바로 다음, 첫 번째 스토리 앞에 배치
2. JSDoc의 `### 사용법` / `### Template Code` 섹션 제거 (중복 제거)
3. JSDoc의 Import, Props, 설명은 유지

### 패턴 (3단계)
- **Tier 1** (args 기반): Alert, Avatar, Button, ButtonGroup, Card, ChartTooltip, ChipsNavigation, IconButtonGroup, ListGroup, Mention, Pagination, Popover, Progress, Skeleton, Spinner, Tooltip
- **Tier 2** (render + useState): ButtonTab, CalendarPopover, Checkbox, Collapse, DatePicker, Dropdown, FileUpload, InfoPopover, Input, Modal, NavigationTab, NumberInput, Radio, Slider, SweetAlert, Switch, Tabs, TagSelect, Toast
- **Tier 3** (복잡 데이터): DataTable, TreeView, Widget
- **스킵**: Theming.stories.tsx (가이드 문서)

### 기술 참고
- `preview.tsx`에 이미 `docs.codePanel: true` 설정됨 → 설정/빌드 변경 없음
- `name: "Template Code"` 설정으로 사이드바에 표시명 통일

---

## 남은 Zeplin 컴포넌트 (미구현)

없음 — 2026-08-07 기준 전부 구현 완료.
(마지막 배치: Breadcrumb, Textarea, FloatingModal, FullScreenModal + Badge/Chip 복원, LinkBadge 신규 — 총 52개 컴포넌트, 테스트 431개)

---

## 코드베이스 컨벤션 (새 컴포넌트 만들 때 따라야 할 패턴)

### 파일 구조
```
packages/ui-v3/src/components/{ComponentName}/
  {ComponentName}.css.ts    — vanilla-extract 스타일
  index.tsx                 — 컴포넌트 코드
  {ComponentName}.stories.tsx — Storybook 스토리
  {ComponentName}.test.tsx  — Vitest 단위 테스트
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

### 테스트 패턴
```tsx
import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { ComponentName } from ".";

describe("ComponentName", () => {
  it("renders correctly", () => {
    renderWithUser(<ComponentName />);
    expect(screen.getByRole("...")).toBeInTheDocument();
  });

  it("calls callback on interaction", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(<ComponentName onChange={onChange} />);
    await user.click(screen.getByText("..."));
    expect(onChange).toHaveBeenCalledWith("...");
  });
});
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
# 타입 체크
npx tsc --noEmit -p packages/ui-v3/tsconfig.json

# 테스트 실행
cd packages/ui-v3 && pnpm test

# 특정 컴포넌트만 테스트
npx vitest run src/components/Button/Button.test.tsx
```

### 커밋 컨벤션
```
feat: {컴포넌트명} 컴포넌트 개발
test: {대상} 테스트 추가
docs: {내용} 문서 추가
ci: {내용} CI 설정
```

---

## 최근 커밋 이력

```
c87f9c9 chore: release v0.1.8 [skip ci]
c7c490e docs(ui-v3): Icon 스토리북 추가 — 갤러리 및 사이즈 비교
06bbb3d chore: release v0.1.7 [skip ci]
eee8eee feat(ui-v3): StepBar 아이콘 레지스트리 연동 및 icon string name 지원
d4d11aa ci: Vercel 배포 전 테스트 통과 필수 설정
f4bae15 test: 전체 컴포넌트 단위 테스트 추가 (41파일, 272개 테스트)
```

---

## 이어서 작업하는 법

```bash
cd ~/Documents/GitHub/LDS   # 또는 해당 컴퓨터 경로
git pull
```

그 다음 Claude에게:
```
HANDOFF.md 읽고, 이어서 작업해줘
```

### 다음 작업 후보
1. **남은 컴포넌트 개발**: Breadcrumb, Textarea, FloatingModal, FullScreenModal
2. **Zeplin MCP 연결**: `claude mcp add zeplin --env ZEPLIN_ACCESS_TOKEN={토큰} -- npx -y @zeplin/mcp-server@latest`
3. **컴포넌트 라이브러리 빌드/배포**: npm publish 준비
4. **GitHub Actions CI**: PR 단위 테스트 자동화 (현재는 Vercel 빌드 시에만 실행)

---

> 이 파일은 작업 완료 후 삭제해도 됩니다.
