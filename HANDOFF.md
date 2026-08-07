# LDS 디자인 시스템 — 작업 핸드오프

> 2026-08-07 갱신. 다른 컴퓨터에서 이어서 할 때 이 파일을 Claude에게 전달하세요.
> "HANDOFF.md 읽고 이어서 작업해줘" 하면 됩니다.
> 폴더별 코드 컨벤션은 **AGENTS.md**(루트 + packages/ui-v3, packages/tokens, apps/docs, apps/storybook)가 기준입니다.

## 프로젝트 위치

- 레포: `github.com/cartoonpoet/LDS` / 브랜치: `main`
- 패키지: `packages/ui-v3` (npm `@lawkit/ui`, v0.1.63+) + `packages/tokens` (`@lds/tokens`)
- Zeplin 스타일가이드: `https://app.zeplin.io/styleguide/639bef141f03481409421455`
- 배포: Storybook `lds-storybook.vercel.app` / 제품 문서 사이트 `lds-docs.vercel.app`

---

## 현재 상태 (2026-08-07)

| 항목 | 상태 |
|---|---|
| 컴포넌트 | **54개** — Zeplin 스타일가이드 기준 미구현 0 |
| 테스트 | **61파일 475개** 전체 통과 (컴포넌트 454 + lib 훅 21) |
| 배포 게이트 | Storybook Vercel 빌드가 테스트→빌드→npm publish→스토리북 순서로 실행 (테스트 실패 시 전부 중단) |
| 문서 사이트 | seed-design.io 스타일 제품 사이트 완성 (아래 참조) |

### 최근 추가된 컴포넌트 (2026-08-07)

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

## 다음 작업 후보

1. **컴포넌트 갭 선별 구현**: Divider, Callout, EmptyState, Timeline, ApprovalLine(히스토리 3b6ddf7 이전에 구현 존재 — 복원 후보), DdayBadge 등 법무 도메인 우선
2. **Chromatic 비주얼 회귀** — 계정 연결 필요
3. ~~구 MDX 정리~~ ✅ 완료 (2026-08-07) — 패턴 가이드는 `/patterns/[slug]` 5종으로 이관, MDX 시스템 제거
4. ~~타입체크 사각지대~~ ✅ 완료 — `tsconfig.check.json` 전수 체크, 숨은 오류 24건 수정
5. ~~다크모드 잔여 보정~~ ✅ 완료 — 칩 AA 대비, 그림자 데모 캔버스, 토글 플래시

> 이 파일은 작업 완료 후 삭제해도 됩니다.
