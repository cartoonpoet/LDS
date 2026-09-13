# LDS 디자인 시스템 — 작업 핸드오프

> 2026-09-13 갱신. 다른 컴퓨터에서 이어서 할 때 이 파일을 Claude에게 전달하세요.
> "HANDOFF.md 읽고 이어서 작업해줘" 하면 됩니다.
> 폴더별 코드 컨벤션은 **AGENTS.md**(루트 + packages/ui-v3, packages/tokens, apps/docs, apps/storybook)가 기준입니다.

## 프로젝트 위치

- 레포: `github.com/cartoonpoet/LDS` / 브랜치: `main`
- 패키지: `packages/ui-v3` (npm `@lawkit/ui`, v0.1.63+) + `packages/tokens` (`@lds/tokens`)
- Zeplin 스타일가이드: `https://app.zeplin.io/styleguide/639bef141f03481409421455`
- 배포: Storybook `lds-storybook.vercel.app` / 제품 문서 사이트 `lds-docs.vercel.app`

---

## 현재 상태 (2026-09-13)

| 항목 | 상태 |
|---|---|
| 컴포넌트 | **65개** — Zeplin 스타일가이드 기준 미구현 0 + 레이아웃 프리미티브 + 법무 도메인 |
| 테스트 | **72파일 557개** 전체 통과 (컴포넌트 536 + lib 훅 21) |
| 배포 게이트 | Storybook Vercel 빌드가 테스트→빌드→npm publish→스토리북 순서로 실행 (테스트 실패 시 전부 중단) |
| npm publish | ✅ 정상화 (2026-09-12 토큰 재발급·Automation 타입). **v0.1.68~69는 토큰 만료로 npm 영구 결번**, v0.1.70이 레이아웃+법무+Callout 전부 포함해 배포됨. 토큰 만료 시 증상: publish 단계 E404(=인증 실패) 또는 EOTP(=Publish 타입 토큰) |
| 문서 사이트 | seed-design.io 스타일 제품 사이트 완성 (아래 참조) |

### 최근 추가된 컴포넌트 (2026-09-12 후반) — feat/legal-components 브랜치

- **법무 도메인 4종**: EmptyState(빈 화면 표준), DdayBadge(기일 임박도 자동 색), Timeline(사건 진행 이력, done/current/upcoming), ApprovalLine(결재선 — 666a55e에서 복원 후 현행 컨벤션 보정)
- Callout은 사용자 결정으로 이번 스코프 제외 (후보로 남음)
- 시안(승인됨): https://claude.ai/code/artifact/9f3059d6-a18b-4b69-be53-a2fadeae415e / 계획: docs/superpowers/plans/2026-09-12-legal-components.md

### 이전 추가된 컴포넌트 (2026-09-12) — feat/layout-primitives 브랜치 (머지됨, v0.1.68)

- **레이아웃 프리미티브 5종**: Box(패딩/배경/라운드/테두리 토큰 컨테이너), Grid(repeat 컬럼 격자), Divider(수평/수직 구분선), Container(최대 폭 768/1024/1280 + 중앙 정렬), Spacer(flex-grow 빈 요소)
- **PageLayout**: grid-template-areas 기반 페이지 셸 — Header(`<header>`)/Nav(`<nav>`, width·collapsed·collapsedWidth)/Content(`<main>`)/Panel(`<aside>`, width) 슬롯, 생략 시 트랙 0으로 접힘. GNB/LNB 내용물은 여전히 각 서비스 몫(패턴 가이드 영역)
- 시안(승인됨): https://claude.ai/code/artifact/91f18beb-2792-4bcb-b4e3-faaa439f35e0 / 계획: docs/superpowers/plans/2026-09-11-layout-primitives.md

### 이전 추가된 컴포넌트 (2026-08-07)

- **Badge, Chip** — git 히스토리(67a2e59)에서 복원 / **LinkBadge** — 신규 (링크형 뱃지, external 시 새 탭 + rel 가드)
- **Breadcrumb, Textarea, FloatingModal(비차단 우하단), FullScreenModal**
- **Drawer** (좌/우 슬라이드 패널, backdrop 유/무) / **TableTree** (계층형 테이블, controlled 지원)
- GNB/LNB·CommentThread는 **의도적으로 DS에 넣지 않음** — 각 서비스에서 프리미티브 조합 (패턴 문서가 조합 가이드)

### lib 공통 훅 (packages/ui-v3/src/lib/, 내부 전용 — 배럴 미export)

`useControllableState` / `useDismissibleLayer`(ESC+바깥클릭) / `useScrollLock` / `usePresence`(트랜지션 언마운트) + 기존 Portal, useFocusTrap.
오버레이 15개 컴포넌트가 공유 (Modal, Drawer, Popover 계열, Dropdown 등). **새 오버레이는 이 훅 조합으로 만들 것.**

---

## 제품 문서 사이트 (apps/docs → lds-docs.vercel.app)

seed-design.io 레이아웃을 LDS 브랜드로 재구성한 Next.js 16 사이트. 진실의 원천은 MDX가 아니라 **`src/data/`의 TS 데이터**.

- **홈**: 100vh 브랜드 필름 히어로(키네틱 타이포 18s 루프, 스크롤 시 카드로 수축) + 라이브 벤토 + 다크 인트로/원칙/기반 마퀴 + 블루 푸터
- **라우트**: `/components`(+54 상세), `/foundations`(+6 상세), `/patterns`(+5 가이드 상세), `/get-started`, `/develop`, `/updates`
- **⌘K 검색**: 한글 초성 매칭, 의존성 제로 (`src/lib/search.ts` + `src/data/search-index.ts`)
- **다크모드**: `html[data-theme]` + localStorage + OS 설정, FOUC 방지 인라인 스크립트. 홈 브랜드 필름/다크 존/블루 푸터는 양 테마 동일
- **`/llms.txt`**: ui-v3 CLAUDE.md를 빌드 시 읽어 AI용으로 서빙
- **Props 표 자동 생성**: `node scripts/generate-component-props.mjs` → `component-props.generated.ts` (수기 금지)
- 신규 컴포넌트 문서 추가 절차는 `apps/docs/AGENTS.md` 참조 (component-list/previews/usage + 카운트 문구 3곳)

### 자동 생성물 (직접 수정 금지)

| 파일 | 재생성 명령 | 원천 |
|---|---|---|
| `packages/ui-v3/CLAUDE.md` | `pnpm --filter @lawkit/ui docs` | 스토리 TemplateCode |
| `apps/docs/src/data/component-props.generated.ts` | `pnpm docs:props` | Props 인터페이스 |

---

## seed-design 벤치마크 결정사항 (2026-08-07)

daangn/seed-design 소스 비교분석 후 선별 도입:

- ✅ 도입: llms.txt, 오버레이 훅 추출, AGENTS.md 계층화, Props 자동 생성, ⌘K 검색, 다크모드
- ❌ 미도입 (조건부 재검토): **Fumadocs**(우리 진실의 원천이 TS 데이터라 부적합 — 장문 문서를 여럿이 쓰는 국면에 headless 재검토), **CLI**(외부 소비 레포 생기면), **docs-mcp**(문서가 llms.txt 한 파일에 안 담길 규모가 되면), **Figma MCP**(Zeplin MCP 사용 중), Bun/qvism/Lynx
- ⏸️ Chromatic 비주얼 회귀 — 유료 계정 연결 시 도입 가치 있음 (jsdom 한계 보완)

---

## 검증 명령

```bash
# ui-v3 테스트 / 전수 타입체크 (스토리·테스트 포함, 에러 0이 기준)
cd packages/ui-v3 && pnpm test
pnpm --filter @lawkit/ui check

# docs 타입체크 / 빌드
pnpm --filter @lds/docs check && pnpm --filter @lds/docs build

# 특정 컴포넌트만
npx vitest run src/components/Button/Button.test.tsx
```

주의: `next start`로 로컬 확인 후 재빌드하면 **서버를 반드시 재시작**할 것 (`pkill -f next-server`) — 옛 프로세스가 살아 있으면 청크 불일치로 클라이언트 JS가 통째로 죽는다 (실제 발생했던 사고).

## 커밋 컨벤션

```
feat(ui-v3)|feat(docs): {내용}
fix / refactor / docs / test / ci: {내용}
```

`@lawkit/ui` 버전업은 CI가 `chore: release vX.X.X [skip ci]`로 자동 수행 — 푸시 전 `git pull --rebase` 습관화.

---

## 주요 커밋 이력 (최근)

```
dda9f00 feat(docs): 다크모드 구현 — 토글 + 시스템 설정 + FOUC 방지
437220d fix(docs): 코드 하이라이터 마크업 깨짐 수정 + 홈 마퀴 카드 링크 연결
c73229e feat(docs): Cmd+K 문서 검색 추가 — 한글 초성 매칭, 의존성 제로
152aa36 feat(docs): Props 표를 소스 타입에서 자동 생성
7f20258 docs: AGENTS.md 계층화 — 루트 + 패키지/앱별 5종
557ce5e refactor(ui-v3): 오버레이 공통 로직을 lib 훅 4종으로 추출
45b0032 feat(docs): /llms.txt 라우트 추가
e9d6be5 feat(ui-v3): Drawer·TableTree 공통 프리미티브 추가
6f4111f feat(ui-v3): Breadcrumb·Textarea·FloatingModal·FullScreenModal
d03c9b6 feat(ui-v3): Badge·Chip 복원 및 LinkBadge 신규 추가
0b2e205 feat(docs): LDS 제품 사이트 전면 개편 — seed 스타일
```

---

## 품질 감사 (2026-09-13)

9개 전문 에이전트(응집도/결합도/예측가능성/가독성/API일관성/접근성/테스트품질/토큰아키텍처/문서·릴리스) 병렬 감사 완료. 상세는 메모리 `project_lds_design_system_audit_2026-09.md` 참조. **Tier 1(즉시 버그) 전부 수정 완료**:

- ✅ 존재하지 않는 패키지명 `@lds/ui-v3`(문서 60개 전부 + 설정 4곳)를 실제 `@lawkit/ui`로 수정, 존재하지 않는 `LdsProvider` 예제도 실제 `lightThemeClass` 패턴으로 교체
- ✅ `useScrollLock` 참조 카운트 방식으로 변경 — 중첩 오버레이(Modal 안에서 SweetAlert) non-LIFO 닫힘 시 스크롤 풀리던 버그
- ✅ `CalendarPopover` 바깥 클릭 시 `onClose` 미호출 버그 수정
- ✅ `Modal`/`FullScreenModal`에 `closeOnEscape` 추가해 `Drawer`/`FloatingModal`과 Escape 극성 통일(`disableEscapeClose`는 deprecated로 유지, 비파괴적)
- 조사 중 감사 결과 2건은 **오탐으로 확인되어 미수정**: Toast z-index(react-toastify 기본 CSS가 9999로 이미 Modal의 9000보다 높음), Slider 틱/라벨 개수(labels는 이미 실제 min/max로 스케일되고 ticks는 애초에 값과 무관한 장식용 눈금)

**Tier 2 이후 미착수**: 접근성 Critical(Tabs/TreeView/Slider 키보드 지원), 결합도(Drawer 등이 Modal 비공개 CSS 직접 참조), 토큰 아키텍처(다크테마 부재·가짜 팔레트·죽은 opacityPalette), API 일관성 다수, 테스트 공백(DataTable), 릴리스 프로세스(commit&tag가 publish보다 먼저 실행되는 순서 결함).

## 다음 작업 후보

1. ~~컴포넌트 갭 선별 구현~~ ✅ 전부 완료 (2026-09-12) — Divider·EmptyState·Timeline·ApprovalLine·DdayBadge·Callout. `/updates` 체인지로그도 v0.1.68~70 반영
2. ~~레이아웃 패턴 가이드~~ ✅ 완료 (PR #20, 2026-09-12) — PageLayout + Container/Grid/Stack 조합 가이드 `/patterns/layout`
3. **품질 감사 Tier 2 이후 픽스** — 위 「품질 감사」 섹션 참조. 우선순위: 접근성 Critical → 릴리스 워크플로 순서 재배치 → 토큰 아키텍처 재설계(다크테마 포함, 가장 큰 작업)
4. **Chromatic 비주얼 회귀** — 계정 연결 필요
5. ~~구 MDX 정리~~ ✅ 완료 (2026-08-07) — 패턴 가이드는 `/patterns/[slug]` 5종으로 이관, MDX 시스템 제거
6. ~~타입체크 사각지대~~ ✅ 완료 — `tsconfig.check.json` 전수 체크, 숨은 오류 24건 수정
7. ~~다크모드 잔여 보정~~ ✅ 완료 — 칩 AA 대비, 그림자 데모 캔버스, 토글 플래시

> 이 파일은 작업 완료 후 삭제해도 됩니다.
