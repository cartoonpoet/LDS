# 법무 도메인 컴포넌트 4종 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `@lawkit/ui`에 EmptyState, DdayBadge, Timeline을 신규 구현하고 ApprovalLine을 히스토리(666a55e)에서 복원해 docs 사이트까지 등록한다. (Callout은 이번 스코프 제외 — 사용자 선택)

**Architecture:** 2026-09-11 레이아웃 프리미티브와 동일 패턴 — 4파일 구조, vanilla-extract, 토큰만 참조. DdayBadge는 날짜 차이(달력일)를 계산해 임박도별 변형을 자동 선택(테스트를 위해 `today` 주입 가능). ApprovalLine은 `git show 666a55e:...`로 4파일을 복원한 뒤 현행 컨벤션(테스트 유틸, vitest 명시 import, TemplateCode 스토리)에 맞게 보정한다.

**Tech Stack:** React 18 + TypeScript, vanilla-extract, Vitest + Testing Library, Storybook, pnpm.

**Spec:** 승인된 시안 https://claude.ai/code/artifact/9f3059d6-a18b-4b69-be53-a2fadeae415e (Callout 제외 4종). API는 각 Task Interfaces 블록이 기준.

## Global Constraints

(2026-09-11 계획과 동일 — 요약)
- pnpm만 사용. 커밋 `feat(ui-v3):`/`docs:` + 어트리뷰션 2줄(Co-Authored-By: Claude Fable 5 / Claude-Session).
- 토큰 하드코딩 금지 (스토리 데모 색 예외). 4파일 구조 + 배럴 export. TemplateCode 스토리 필수(`type Story` 직후 배치).
- `packages/ui-v3/CLAUDE.md` 직접 수정 금지 — Task 5에서 재생성.
- 검증: `npx vitest run src/components/{Name}/{Name}.test.tsx` (packages/ui-v3에서), `pnpm --filter @lawkit/ui check`.
- 작업 브랜치: `feat/legal-components` (main 최신화 후 분기 — PR #17 머지 반영).

---

### Task 0: 브랜치 준비

- [ ] `git checkout main && git pull --rebase` (CI release 커밋 반영)
- [ ] `git checkout -b feat/legal-components`

### Task 1: EmptyState

**Files:**
- Create: `packages/ui-v3/src/components/EmptyState/EmptyState.css.ts` / `index.tsx` / `EmptyState.stories.tsx` / `EmptyState.test.tsx`
- Modify: `packages/ui-v3/src/index.ts`

**Interfaces:**
```ts
export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;        // 상단 아이콘 (44px 권장)
  title: ReactNode;        // 필수 제목
  description?: ReactNode; // 보조 설명
  action?: ReactNode;      // 하단 액션 (Button 등)
}
export function EmptyState(props: EmptyStateProps): JSX.Element; // 세로 중앙 정렬 div
```

- [ ] **Step 1: 실패하는 테스트** — `EmptyState.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { EmptyState } from ".";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="조회된 사건이 없어요" />);
    expect(screen.getByText("조회된 사건이 없어요")).toBeInTheDocument();
  });

  it("renders description and action when provided", () => {
    render(
      <EmptyState
        title="비어 있음"
        description="필터를 조정하세요."
        action={<button>사건 등록</button>}
      />
    );
    expect(screen.getByText("필터를 조정하세요.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "사건 등록" })).toBeInTheDocument();
  });

  it("renders icon slot", () => {
    render(<EmptyState title="t" icon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("omits optional slots when not provided", () => {
    const { container } = render(<EmptyState title="t" />);
    expect(container.querySelectorAll("div").length).toBeGreaterThan(0);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("merges custom className and forwards attributes", () => {
    render(<EmptyState title="t" className="extra" data-testid="empty" />);
    expect(screen.getByTestId("empty").className).toContain("extra");
  });
});
```

- [ ] **Step 2: 실패 확인** — Expected: FAIL(모듈 없음)
- [ ] **Step 3: 구현** — `EmptyState.css.ts`:

```ts
import { style } from "@vanilla-extract/css";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: themeVars.spacing.x2,
  padding: `${themeVars.spacing.x6} ${themeVars.spacing.x4}`,
  textAlign: "center",
});

export const icon = style({
  color: semanticColorRoles.border.strong,
  marginBottom: themeVars.spacing.x1,
});

export const title = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeMd,
  fontWeight: themeVars.font.weightBold,
  color: semanticColorRoles.text.heading,
});

export const description = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary,
});

export const action = style({
  marginTop: themeVars.spacing.x2,
});
```

`index.tsx`:

```tsx
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./EmptyState.css";

/* ─── Types ─── */
export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** 상단 아이콘 (44px 내외 권장) */
  icon?: ReactNode;
  /** 제목 */
  title: ReactNode;
  /** 보조 설명 */
  description?: ReactNode;
  /** 하단 액션 (Button 등) */
  action?: ReactNode;
}

/* ─── Component ─── */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div className={cx(s.root, className)} {...rest}>
      {icon ? <div aria-hidden="true" className={s.icon}>{icon}</div> : null}
      <div className={s.title}>{title}</div>
      {description ? <div className={s.description}>{description}</div> : null}
      {action ? <div className={s.action}>{action}</div> : null}
    </div>
  );
}
```

- [ ] **Step 4: 통과 확인** (5 tests)
- [ ] **Step 5: 스토리** — TemplateCode(기본/아이콘+액션 예시, 시안의 "조회된 사건이 없어요" 카피) + 변형 스토리 1개. 데모 아이콘은 인라인 SVG(폴더 모양) 사용.
- [ ] **Step 6: 배럴** — Dropdown export 근처(알파벳 무관, EmptyState는 Divider 아래):

```ts
export { EmptyState } from "./components/EmptyState";
export type { EmptyStateProps } from "./components/EmptyState";
```

- [ ] **Step 7: check + 테스트 재실행** → **Step 8: 커밋** `feat(ui-v3): EmptyState 컴포넌트 추가`

### Task 2: DdayBadge

**Files:** `packages/ui-v3/src/components/DdayBadge/` 4파일 + 배럴

**Interfaces:**
```ts
export type DdayLevel = "dday" | "danger" | "warning" | "neutral" | "overdue";
export interface DdayBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  date: Date | string;    // 목표 날짜 (달력일 기준)
  today?: Date | string;  // 기준일 주입 (기본: 현재) — 테스트/스토리용
}
export function DdayBadge(props: DdayBadgeProps): JSX.Element; // <span>
// 규칙: diff=0 → "D-DAY"(dday, danger 채움) / 1~3 → danger 아웃라인 /
//       4~7 → warning / 8+ → neutral(muted) / 음수 → "D+n 경과"(overdue, dark 채움)
```

- [ ] **Step 1: 실패하는 테스트** — `DdayBadge.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { DdayBadge } from ".";

const TODAY = "2026-09-12";

describe("DdayBadge", () => {
  it.each([
    ["2026-09-12", "D-DAY"],
    ["2026-09-15", "D-3"],
    ["2026-09-19", "D-7"],
    ["2026-10-12", "D-30"],
    ["2026-09-10", "D+2 경과"],
  ])("date=%s renders %s", (date, label) => {
    render(<DdayBadge date={date} today={TODAY} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("levels produce distinct classNames (dday/danger/warning/neutral/overdue)", () => {
    const dates = ["2026-09-12", "2026-09-14", "2026-09-18", "2026-10-12", "2026-09-01"];
    const classes = dates.map((date) => {
      const { container, unmount } = render(<DdayBadge date={date} today={TODAY} />);
      const cls = (container.firstChild as HTMLElement).className;
      unmount();
      return cls;
    });
    expect(new Set(classes).size).toBe(dates.length);
  });

  it("boundary: 3일은 danger, 4일은 warning, 7일은 warning, 8일은 neutral", () => {
    const cls = (date: string) => {
      const { container, unmount } = render(<DdayBadge date={date} today={TODAY} />);
      const c = (container.firstChild as HTMLElement).className;
      unmount();
      return c;
    };
    expect(cls("2026-09-15")).toBe(cls("2026-09-13"));  // 3 vs 1 → 같은 danger
    expect(cls("2026-09-15")).not.toBe(cls("2026-09-16")); // 3 vs 4 → danger vs warning
    expect(cls("2026-09-16")).toBe(cls("2026-09-19"));  // 4 vs 7 → 같은 warning
    expect(cls("2026-09-19")).not.toBe(cls("2026-09-20")); // 7 vs 8 → warning vs neutral
  });

  it("accepts Date objects and time-of-day is ignored (calendar-day diff)", () => {
    render(
      <DdayBadge date={new Date(2026, 8, 15, 23, 59)} today={new Date(2026, 8, 12, 0, 1)} />
    );
    expect(screen.getByText("D-3")).toBeInTheDocument();
  });

  it("renders as span, merges className, forwards attributes", () => {
    render(<DdayBadge date="2026-09-15" today={TODAY} className="extra" data-testid="dday" />);
    const el = screen.getByTestId("dday");
    expect(el.nodeName).toBe("SPAN");
    expect(el.className).toContain("extra");
  });
});
```

- [ ] **Step 2: 실패 확인**
- [ ] **Step 3: 구현** — `DdayBadge.css.ts` (팔레트 rgba 틴트는 `redPalette[100]`/`yellowPalette` 계열 토큰 확인 후 사용, 없으면 `opacityPalette`/accent 토큰 대조 — 하드코딩 금지):

```ts
import { recipe } from "@vanilla-extract/recipes";
import { redPalette, yellowPalette } from "@lds/tokens"; // 실제 export 확인 후 조정
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    boxSizing: "border-box",
    padding: `2px ${themeVars.spacing.x2}`,
    borderRadius: themeVars.radius.sm,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    fontWeight: themeVars.font.weightBold,
    lineHeight: 1.4,
    whiteSpace: "nowrap",
  },
  variants: {
    level: {
      dday: {
        background: themeVars.color.accentDanger,
        color: semanticColorRoles.text.inverse,
      },
      danger: {
        background: redPalette[100],
        border: `1px solid ${themeVars.color.accentDanger}`,
        color: themeVars.color.accentDangerActive,
      },
      warning: {
        background: yellowPalette[100],
        border: `1px solid ${themeVars.color.accentWarning}`,
        color: themeVars.color.accentWarningActive,
      },
      neutral: {
        background: semanticColorRoles.surface.raised,
        color: semanticColorRoles.text.secondary,
      },
      overdue: {
        background: themeVars.color.accentDark,
        color: semanticColorRoles.text.inverse,
      },
    },
  },
});
```

`index.tsx`:

```tsx
import type { HTMLAttributes } from "react";
import { cx } from "../../lib/cx";
import * as s from "./DdayBadge.css";

/* ─── Types ─── */
export type DdayLevel = "dday" | "danger" | "warning" | "neutral" | "overdue";

export interface DdayBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 목표 날짜 (달력일 기준으로 D-day 계산) */
  date: Date | string;
  /** 기준일 — 기본값은 현재. 테스트/스토리에서 고정할 때 사용 */
  today?: Date | string;
}

/* ─── Helpers ─── */
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfDay = (value: Date | string) => {
  const d = typeof value === "string" ? new Date(`${value}T00:00:00`) : value;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
};

const levelOf = (diff: number): DdayLevel => {
  if (diff < 0) return "overdue";
  if (diff === 0) return "dday";
  if (diff <= 3) return "danger";
  if (diff <= 7) return "warning";
  return "neutral";
};

const labelOf = (diff: number) => {
  if (diff < 0) return `D+${-diff} 경과`;
  if (diff === 0) return "D-DAY";
  return `D-${diff}`;
};

/* ─── Component ─── */
export function DdayBadge({ date, today, className, ...rest }: DdayBadgeProps) {
  const diff = Math.round((startOfDay(date) - startOfDay(today ?? new Date())) / MS_PER_DAY);
  return (
    <span className={cx(s.badge({ level: levelOf(diff) }), className)} {...rest}>
      {labelOf(diff)}
    </span>
  );
}
```

- [ ] **Step 4: 통과 확인** (9 tests)
- [ ] **Step 5: 스토리** — TemplateCode(기일 리스트 예시) + 임박도 쇼케이스(D-DAY/D-3/D-7/D-30/D+2, `today` 고정)
- [ ] **Step 6: 배럴** `export { DdayBadge } / type { DdayBadgeProps, DdayLevel }` (Divider 아래)
- [ ] **Step 7: check + 테스트** → **Step 8: 커밋** `feat(ui-v3): DdayBadge 컴포넌트 추가`

### Task 3: Timeline

**Files:** `packages/ui-v3/src/components/Timeline/` 4파일 + 배럴

**Interfaces:**
```ts
export type TimelineStatus = "done" | "current" | "upcoming";
export interface TimelineItem {
  id: string;
  title: ReactNode;
  date?: ReactNode;
  description?: ReactNode;
  status?: TimelineStatus; // 기본 "done"
}
export interface TimelineProps extends Omit<HTMLAttributes<HTMLOListElement>, "children"> {
  items: TimelineItem[];
}
export function Timeline(props: TimelineProps): JSX.Element; // <ol> — 세로 전용
```

- [ ] **Step 1: 실패하는 테스트** — `Timeline.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Timeline } from ".";

const items = [
  { id: "1", date: "2026. 6. 12.", title: "소장 접수", status: "done" as const },
  { id: "2", date: "2026. 7. 30.", title: "답변서 제출", description: "피고 대리인 김앤장", status: "done" as const },
  { id: "3", date: "2026. 9. 15.", title: "1차 변론기일", status: "current" as const },
  { id: "4", title: "2차 변론기일", status: "upcoming" as const },
];

describe("Timeline", () => {
  it("renders an ordered list with one listitem per item", () => {
    render(<Timeline items={items} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders title/date/description", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("소장 접수")).toBeInTheDocument();
    expect(screen.getByText("2026. 7. 30.")).toBeInTheDocument();
    expect(screen.getByText("피고 대리인 김앤장")).toBeInTheDocument();
  });

  it("statuses produce distinct dot classNames", () => {
    const { container } = render(<Timeline items={items} />);
    const dots = container.querySelectorAll("[data-timeline-dot]");
    expect(dots).toHaveLength(4);
    const classes = [dots[0].className, dots[2].className, dots[3].className];
    expect(new Set(classes).size).toBe(3); // done vs current vs upcoming
  });

  it("last item has no connector", () => {
    const { container } = render(<Timeline items={items} />);
    const connectors = container.querySelectorAll("[data-timeline-connector]");
    expect(connectors).toHaveLength(items.length - 1);
  });

  it("renders ReactNode title (custom content)", () => {
    render(<Timeline items={[{ id: "1", title: <strong>커스텀</strong> }]} />);
    expect(screen.getByText("커스텀")).toBeInTheDocument();
  });

  it("merges custom className, forwards attributes", () => {
    render(<Timeline items={items} className="extra" data-testid="timeline" />);
    expect(screen.getByTestId("timeline").className).toContain("extra");
  });
});
```

- [ ] **Step 2: 실패 확인**
- [ ] **Step 3: 구현** — `Timeline.css.ts`:

```ts
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { semanticColorRoles, themeVars } from "@lds/tokens";

export const root = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
});

export const item = style({
  display: "flex",
  gap: themeVars.spacing.x3,
});

export const markerColumn = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "12px",
  flexShrink: 0,
});

export const dot = recipe({
  base: {
    boxSizing: "border-box",
    borderRadius: "999px",
    marginTop: "4px",
    flexShrink: 0,
  },
  variants: {
    status: {
      done: {
        width: "10px",
        height: "10px",
        background: themeVars.color.accentPrimary,
      },
      current: {
        width: "12px",
        height: "12px",
        background: semanticColorRoles.surface.canvas,
        border: `3px solid ${themeVars.color.accentPrimary}`,
      },
      upcoming: {
        width: "10px",
        height: "10px",
        background: semanticColorRoles.surface.canvas,
        border: `2px solid ${semanticColorRoles.border.strong}`,
      },
    },
  },
  defaultVariants: { status: "done" },
});

export const connector = style({
  width: "2px",
  flexGrow: 1,
  background: semanticColorRoles.border.subtle,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  paddingBottom: themeVars.spacing.x4,
  minWidth: 0,
});

export const date = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeSm,
    color: semanticColorRoles.text.secondary,
  },
  variants: {
    status: {
      done: {},
      current: { color: themeVars.color.accentPrimaryActive, fontWeight: themeVars.font.weightBold },
      upcoming: { color: semanticColorRoles.text.tertiary },
    },
  },
  defaultVariants: { status: "done" },
});

export const title = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.sizeMd,
    fontWeight: themeVars.font.weightBold,
    color: semanticColorRoles.text.heading,
  },
  variants: {
    status: {
      done: {},
      current: {},
      upcoming: { color: semanticColorRoles.text.secondary, fontWeight: themeVars.font.weightRegular },
    },
  },
  defaultVariants: { status: "done" },
});

export const description = style({
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.sizeSm,
  color: semanticColorRoles.text.secondary,
});
```

(`weightRegular` 키는 typography-scale에서 확인 — 없으면 해당 라인 제거)

`index.tsx`:

```tsx
import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";
import * as s from "./Timeline.css";

/* ─── Types ─── */
export type TimelineStatus = "done" | "current" | "upcoming";

export interface TimelineItem {
  id: string;
  /** 이벤트 제목 */
  title: ReactNode;
  /** 날짜/시각 표기 */
  date?: ReactNode;
  /** 보조 설명 */
  description?: ReactNode;
  /** 진행 상태 (기본 done) */
  status?: TimelineStatus;
}

export interface TimelineProps extends Omit<HTMLAttributes<HTMLOListElement>, "children"> {
  items: TimelineItem[];
}

/* ─── Component ─── */
export function Timeline({ items, className, ...rest }: TimelineProps) {
  return (
    <ol className={cx(s.root, className)} {...rest}>
      {items.map((item, index) => {
        const status = item.status ?? "done";
        const isLast = index === items.length - 1;
        return (
          <li className={s.item} key={item.id}>
            <div aria-hidden="true" className={s.markerColumn}>
              <span className={s.dot({ status })} data-timeline-dot />
              {isLast ? null : <span className={s.connector} data-timeline-connector />}
            </div>
            <div className={s.content}>
              {item.date ? <span className={s.date({ status })}>{item.date}</span> : null}
              <span className={s.title({ status })}>{item.title}</span>
              {item.description ? <span className={s.description}>{item.description}</span> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
```

- [ ] **Step 4: 통과 확인** (6 tests)
- [ ] **Step 5: 스토리** — TemplateCode(시안의 소장 접수→답변서→변론기일 흐름, DdayBadge 조합 예 포함) + 상태 쇼케이스
- [ ] **Step 6: 배럴** `export { Timeline } / type { TimelineProps, TimelineItem, TimelineStatus }`
- [ ] **Step 7: check + 테스트** → **Step 8: 커밋** `feat(ui-v3): Timeline 컴포넌트 추가`

### Task 4: ApprovalLine 복원

**Files:** `packages/ui-v3/src/components/ApprovalLine/` 4파일(복원+보정) + 배럴

**Interfaces:** (복원 원본 그대로 — 666a55e)
```ts
export type ApprovalLineStatus = "pending" | "current" | "approved" | "rejected";
export type ApprovalLineItem = { id: string; order?: number; name: string; role?: string;
  department?: string; status?: ApprovalLineStatus; date?: string; comment?: ReactNode; metadata?: ReactNode };
export type ApprovalLineProps = { items: ApprovalLineItem[]; direction?: "horizontal" | "vertical";
  showConnector?: boolean; ariaLabel?: string };
export function ApprovalLine(props: ApprovalLineProps): JSX.Element; // <ol aria-label="결재선">
```

- [ ] **Step 1: 원본 복원**

```bash
cd packages/ui-v3
mkdir -p src/components/ApprovalLine
for f in index.tsx ApprovalLine.css.ts ApprovalLine.stories.tsx ApprovalLine.test.tsx; do
  git show 666a55e:packages/ui-v3/src/components/ApprovalLine/$f > src/components/ApprovalLine/$f
done
```

- [ ] **Step 2: 테스트 현행화 + 보강** — `ApprovalLine.test.tsx` 전체 교체:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { ApprovalLine } from ".";

const items = [
  { id: "1", order: 1, name: "박기안", role: "대리", department: "영업팀", status: "approved" as const, date: "9. 8. 14:02" },
  { id: "2", order: 2, name: "이검토", role: "과장", department: "법무팀", status: "approved" as const },
  { id: "3", order: 3, name: "최법무", role: "팀장", status: "current" as const, comment: "검토 중" },
  { id: "4", order: 4, name: "정대표", status: "pending" as const },
];

describe("ApprovalLine", () => {
  it("renders an ordered list labeled 결재선 with one item per approver", () => {
    render(<ApprovalLine items={items} />);
    expect(screen.getByLabelText("결재선")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders name, role·department, order, date and comment", () => {
    render(<ApprovalLine items={items} />);
    expect(screen.getByText("박기안")).toBeInTheDocument();
    expect(screen.getByText("대리 · 영업팀")).toBeInTheDocument();
    expect(screen.getByLabelText("결재 순서 1")).toHaveTextContent("1");
    expect(screen.getByText("9. 8. 14:02")).toBeInTheDocument();
    expect(screen.getByText("검토 중")).toBeInTheDocument();
  });

  it("renders status badges (approved/current/pending/rejected labels)", () => {
    render(<ApprovalLine items={[...items, { id: "5", name: "김반려", status: "rejected" as const }]} />);
    expect(screen.getAllByText("승인")).toHaveLength(2);
    expect(screen.getByText("진행중")).toBeInTheDocument();
    expect(screen.getByText("대기")).toBeInTheDocument();
    expect(screen.getByText("반려")).toBeInTheDocument();
  });

  it("status defaults to pending", () => {
    render(<ApprovalLine items={[{ id: "1", name: "홍길동" }]} />);
    expect(screen.getByText("대기")).toBeInTheDocument();
  });

  it("renders connectors between items only (n-1), and none when showConnector=false", () => {
    const { container, rerender } = render(<ApprovalLine items={items} />);
    const count = () =>
      container.querySelectorAll('li > span[aria-hidden="true"]').length;
    expect(count()).toBe(items.length - 1);
    rerender(<ApprovalLine items={items} showConnector={false} />);
    expect(count()).toBe(0);
  });

  it("direction variants produce different list classNames", () => {
    const { container: h } = render(<ApprovalLine items={items} />);
    const { container: v } = render(<ApprovalLine items={items} direction="vertical" />);
    expect((h.firstChild as HTMLElement).className).not.toBe(
      (v.firstChild as HTMLElement).className
    );
  });

  it("custom ariaLabel", () => {
    render(<ApprovalLine ariaLabel="계약 결재선" items={items} />);
    expect(screen.getByLabelText("계약 결재선")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: 테스트 실행** — 복원 코드가 현행 토큰/Badge와 호환되는지 확인. Expected: PASS. (실패 시 원인 수정 — 토큰 경로는 2026-09-12 기준 전부 유효 확인됨: `semanticColorRoles.status.*`, `button.solid.primary`, `themeVars.shadow.focus`, `font.sizeSm/Md/weightBold`)
- [ ] **Step 4: 스토리 현행화** — 복원된 stories를 현행 컨벤션으로 재작성: meta(title "Components/ApprovalLine", autodocs, lightThemeClass 데코레이터) + Props 표 주석 + TemplateCode(시안의 기안→검토→법무팀장→대표 4단 예시, horizontal/vertical 두 변형) + Vertical 스토리.
- [ ] **Step 5: 배럴** (Alert 아래 근처):

```ts
export { ApprovalLine } from "./components/ApprovalLine";
export type {
  ApprovalLineProps,
  ApprovalLineItem,
  ApprovalLineStatus,
} from "./components/ApprovalLine";
```

- [ ] **Step 6: check + 테스트** → **Step 7: 커밋** `feat(ui-v3): ApprovalLine 결재선 컴포넌트 복원`

### Task 5: CLAUDE.md 재생성 + docs 등록

(2026-09-11 Task 7과 동일 절차)

- [ ] `pnpm --filter @lawkit/ui docs && pnpm docs:props`
- [ ] `component-list.ts` 알파벳 자리에 4종 추가("~예요" 톤) + 상단 주석 60→64종:
  - approvalline: "결재 순서와 상태를 한 줄로 보여주는 결재선이에요."
  - ddaybadge: "기일까지 남은 날짜를 임박도 색으로 알려주는 뱃지예요."
  - emptystate: "데이터가 없을 때의 표준 빈 화면이에요."
  - timeline: "사건 진행 이력을 시간순으로 보여줘요."
- [ ] `component-previews.ts` 4종(인라인 스타일, 시안 축소판) / `component-usage.ts` 4종(재생성된 CLAUDE.md TemplateCode와 동일)
- [ ] 카운트 문구 갱신: `app/components/page.tsx`·`app/not-found.tsx`·`app/globals.css` 주석·`src/data/page-html.ts`·`src/data/home-html.ts` — 60→64종, 테스트 수는 Task 6 실측값으로
- [ ] `pnpm --filter @lds/docs check && pnpm --filter @lds/docs build`
- [ ] 커밋 `docs: 법무 도메인 컴포넌트 4종 문서 등록 — 컴포넌트 64종`

### Task 6: 전체 검증 + 마무리

- [ ] `pnpm --filter @lawkit/ui test` 전체 통과 (예상 71파일, 514+신규)
- [ ] `pnpm --filter @lawkit/ui check` + `pnpm --filter @lds/docs check` 에러 0
- [ ] 테스트 실측값으로 docs 카운트 문구/HANDOFF.md 갱신(컴포넌트 64개, 최근 추가 내역, 다음 작업 후보에서 완료 항목 반영) 후 커밋 `docs: HANDOFF 갱신 — 법무 컴포넌트 4종 완료`
- [ ] 통합 방식은 사용자에게 확인 (푸시+PR 등)

## Self-Review 결과

- **Spec coverage:** 시안 5종 중 사용자가 고른 4종 모두 Task 1~4 대응, Callout은 의도적 제외. docs/HANDOFF는 Task 5~6.
- **Placeholder scan:** 스토리 상세 코드는 Task별 Step 5에 요지만 있고 전문이 없음 — 단, TemplateCode 내용은 시안·기존 스토리 패턴(이 세션에서 6회 반복)으로 고정되어 있어 실행 시점 재량 범위가 좁음. usage 문자열은 CLAUDE.md 원본 복붙 규칙(드리프트 방지) 유지.
- **Type consistency:** DdayLevel/TimelineStatus/ApprovalLineStatus 명명 일관. Timeline `data-timeline-dot`/`data-timeline-connector` 훅이 테스트와 구현 양쪽에 동일하게 존재.
