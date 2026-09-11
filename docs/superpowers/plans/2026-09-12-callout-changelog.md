# Callout + /updates 체인지로그 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 마지막 컴포넌트 갭인 Callout을 구현하고, v0.1.52에서 멈춘 docs `/updates` 체인지로그에 v0.1.68/69/70 릴리스를 반영한다.

**Architecture:** 기존 세션 패턴 그대로(4파일 + vanilla-extract + 토큰). Callout은 닫기 없는 정적 안내 블록 — Alert(닫기/액션 있는 인터랙티브 알림)와 역할 구분. intent 4종(info/success/warning/danger), 틴트 배경(*Palette[100]) + accent 테두리 + 기본 아이콘.

**Tech Stack:** 동일 (React, vanilla-extract, Vitest, Storybook, pnpm)

**Spec:** 승인된 시안 https://claude.ai/code/artifact/9f3059d6-a18b-4b69-be53-a2fadeae415e 의 Callout 카드. 체인지로그는 실제 릴리스 이력(v0.1.68 레이아웃 6종 / v0.1.69 법무 4종 / v0.1.70 Callout 예정) 기준.

## Global Constraints

2026-09-11 계획과 동일(pnpm, 토큰만, 4파일, TemplateCode, CLAUDE.md 재생성 명령, 커밋 컨벤션+어트리뷰션 2줄). 브랜치: `feat/callout` (main v0.1.69에서 분기).

---

### Task 1: Callout

**Files:** `packages/ui-v3/src/components/Callout/` 4파일 + `src/index.ts` 배럴

**Interfaces:**
```ts
export type CalloutIntent = "info" | "success" | "warning" | "danger";
export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  intent?: CalloutIntent;   // 기본 "info"
  title?: ReactNode;        // 굵은 제목 줄 (선택)
  icon?: ReactNode;         // 기본: intent별 글리프(i/✓/!/!), null 등 falsy 커스텀 가능 X — 숨기려면 hideIcon
  hideIcon?: boolean;
  children?: ReactNode;     // 본문
}
export function Callout(props: CalloutProps): JSX.Element; // <div role="note">
```

- [ ] **Step 1: 실패하는 테스트** — 본문/title 렌더, role="note", intent 4종 클래스 구분, 기본 intent=info, 커스텀 icon 렌더, hideIcon 시 기본 아이콘 미표시(aria-hidden 마커 부재), className 병합/속성 전달
- [ ] **Step 2: 실패 확인** → **Step 3: 구현**
  - css: recipe root — base(flex, gap x3, padding x3 x4, radius md, 본문 sizeSm~Md), intent variants: info(bluePalette[100]+accentPrimary), success(greenPalette[100]+accentSuccess), warning(yellowPalette[100]+accentWarning), danger(redPalette[100]+accentDanger). 아이콘 색은 accent*Active 계열, 제목 weightBold.
  - index.tsx: intent별 기본 아이콘(원형 stroke SVG 16px: i/체크/느낌표/느낌표), `role="note"`.
- [ ] **Step 4: 통과 확인** → **Step 5: 스토리** (TemplateCode: 시안 카피 "자동 갱신 조항"·"답변서 제출 기한", intent 쇼케이스) → **Step 6: 배럴**(ButtonTab 근처 알파벳 자리) → **Step 7: check+테스트** → **Step 8: 커밋** `feat(ui-v3): Callout 컴포넌트 추가`

### Task 2: docs 등록 + 체인지로그

- [ ] `pnpm --filter @lawkit/ui docs && pnpm docs:props`
- [ ] component-list(callout — "본문 흐름 속에 남는 정적 안내 블록이에요.", 64→65종) / previews(시안 축소판) / usage(CLAUDE.md 복붙 규칙) / 카운트 문구 5곳(65종, 테스트 실측)
- [ ] `apps/docs/src/data/updates.ts` RELEASES 맨 앞에 3개 엔트리 추가, 기존 v0.1.52의 `latest: true`/`tag: "Latest"` 제거:
  - v0.1.70 (2026. 09, Latest): "<b>Callout</b> 본문 속 정적 안내 블록을 추가했어요 — 컴포넌트 65종.", "<b>Docs</b> /updates 체인지로그를 최신 릴리스 기준으로 되살렸어요."
  - v0.1.69 (2026. 09): "<b>EmptyState · DdayBadge · Timeline</b> 법무 도메인 컴포넌트 3종을 추가했어요.", "<b>ApprovalLine</b> 결재선 컴포넌트를 히스토리에서 복원했어요."
  - v0.1.68 (2026. 09): "<b>Box · Grid · Divider · Container · Spacer</b> 레이아웃 프리미티브 5종을 추가했어요.", "<b>PageLayout</b> GNB·LNB·본문 골격 페이지 셸을 추가했어요."
- [ ] `pnpm --filter @lds/docs check && build` → 커밋 `docs: Callout 등록 + /updates 체인지로그 v0.1.68~70 반영`

### Task 3: 검증 + 마무리

- [ ] `pnpm --filter @lawkit/ui test` 전체 (예상 72파일 541+α) / check 에러 0
- [ ] HANDOFF 갱신(65종, 컴포넌트 갭 완료 처리) 커밋 → 통합 방식 사용자 확인 (v0.1.70 버전 표기는 머지 시 CI 릴리스 기준 — 어긋나면 후속 수정)

## Self-Review

시안 Callout 카드 반영(2 intent 데모 → 4 intent 일반화), Alert와의 역할 구분 명시, 체인지로그 실제 릴리스 이력 기준. hideIcon/icon 동시 정의는 icon 우선.
