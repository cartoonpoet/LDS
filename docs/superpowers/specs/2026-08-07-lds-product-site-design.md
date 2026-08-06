# LDS 제품 사이트 (seed-design.io 스타일) — 디자인 스펙

> 2026-08-07 확정. 승인된 시안: `.superpowers/brainstorm/8064-1786027429/content/lds-site-fullscreen-hero.html`
> (시안 HTML이 레이아웃/모션/콘텐츠의 단일 기준. 이 문서는 구조 요약과 구현 매핑을 정의한다.)

## 목표

당근 SEED 디자인 시스템 사이트(seed-design.io)의 레이아웃·모션 감성을 LDS(법무 제품 디자인 시스템) 브랜드로 치환한 제품 사이트를 `apps/docs`(Next.js)로 구현한다. 콘텐츠 인벤토리는 전부 레포 실측 기준.

## 브랜드 토큰

- 액센트: #2151EC / hover #1739A5 / 딥 #16336E / 라이트 #7EA0FF / 페일 #DFE8FF·#EEF3FF
- 다크: 배경 #0D0F14, 카드 #11152A, 보더 #232C48
- 라이트: 배경 #F2F4F6, 서피스 #FFF, 보더 #EEEFF2
- 텍스트: 헤딩 #11152A, 보조 #626F86, 다크 위 #CDD6EA/#9AA4B8
- 상태: #28C76F / #EA5455 / #F0AF23
- 폰트: Pretendard 폴백 스택. 라운드: 카드 12~16px(히어로 24px), 버튼 6~8px

## 페이지 구성 (라우트)

| 라우트 | 내용 |
|---|---|
| `/` | 홈: ① 100vh 풀스크린 브랜드 필름 히어로(스크롤 시 여백+라운드 카드로 수축, SCROLL 힌트, ⏸ 정지) ② 벤토 그리드(라이브 컴포넌트 데모 8종: DataTable 순차 하이라이트, 카운트업 위젯, 결재 StepBar, Switch/Toast/AvatarGroup/ProgressBar) ③ 다크 인트로("법무 제품의 디자인 시스템 LDS" + 노선도 라인 패턴) ④ 디자인 원칙 3장(sticky 헤딩 + Consistent & Dense / Accessible & Clear / Themeable & Alive) ⑤ "LDS의 기반" 마퀴 2줄 ⑥ "LDS가 자라나는 과정" 아티클 3장 ⑦ 블루 푸터 + 초대형 크롭 워드마크(44vw) |
| `/components` | 갤러리: 좌 사이드바(48개) + 3열 카드 그리드(각 카드 CSS 미니 프리뷰, hover 부상) |
| `/components/[slug]` | 컴포넌트 상세 48종: 라이브 프리뷰 + Usage/Props (Button 풀 문서, Input·Checkbox·Switch·Tabs·DataTable 전용 Props 표, 나머지는 공통 템플릿) |
| `/foundations` | 허브: 6개 카드 (Color, Typography, Spacing, Radius, Shadow, Theming) |
| `/foundations/[slug]` | 상세 6종: 브레드크럼 + 히어로 일러스트 + 본문 + 주제별 쇼케이스(팔레트 스와치/타입 스케일/간격/라운드/그림자/브랜드 프리셋 5종) + 우측 TOC |
| `/patterns` | GNB, LNB, Drawer, Comments, Table Tree 5종 미니 다이어그램 카드 |
| `/get-started` | 설치(`pnpm add @lds/ui-v3 @lds/tokens`), 테마 적용(lightThemeClass/createLdsThemeVars), 첫 컴포넌트, 다음 단계 카드 |
| `/develop` | React 시작 코드, 패키지 카드(@lds/tokens v0.1.0, @lds/ui-v3 v0.1.52), Storybook/GitHub 링크 |
| `/updates` | 체인지로그: v0.1.52, v0.1.51, v0.1.8, 품질 게이트(테스트 272개·Vercel 게이트·Template Code 38종) |

## 네비게이션

- 홈: 중앙 플로팅 pill 네비(블러 반투명), 다크 섹션 진입 시 다크 pill 전환. 필름 위 z-index 최상위
- 서브페이지: 일반 상단바(로고 좌측/메뉴 중앙/우측 검색) + 활성 메뉴 표시
- 푸터: "Rooted in Law." + Menu/More 링크 컬럼

## 히어로 브랜드 필름 (18s 루프, CSS keyframes)

1. **0–5.6s 키네틱 타이포**: "Design to Code" / "Code to Law." — 글자 단위 45ms 스태거 롤인(베이스라인 마스크 + 7° 틸트), 1.78배 초대형 시작 → 조립과 동시에 줌아웃·재정렬, 둘째 줄 진입 시 재구성 범프, 완성 후 브리딩 줌. "Law." 마침표는 블루 원으로 스프링 팝
2. **5.6–10s 닷→심볼**: 마침표가 중앙으로 이동·확장(블루→네이비 핸드오프)해 거대 원 → ✦ 심볼 모핑, 블루 3톤 라인 확산
3. **10–13s 밴드 스윕**: 알약형 5색 밴드(#11152A→#16336E→#2151EC→#7EA0FF→#DFE8FF) 수평 관통
4. **13–18s 락업**: #2151EC 풀스크린 → 네이비 ✦ 클로즈업 → "✦ LDS" 워드마크 → 루프
- ⏸ 버튼: 전 장면이 18s 주기 keyframes라 일괄 pause/resume

## 구현 방침 (apps/docs)

- Next.js App Router 정적 라우트로 전환. 기존 `app/[[...slug]]` 캐치올과 DocsLayout 계열은 제거(새 라우트와 충돌). `src/content/*.mdx`는 삭제하지 않고 보존(후속 마이그레이션 대상)
- 데이터 주도: `src/data/`에 components(48)·foundations(6)·patterns(5)·updates 인벤토리 배열 → generateStaticParams로 상세 페이지 생성
- 시안의 CSS는 `app/globals.css`(또는 분할)로 포팅, 클라이언트 컴포넌트는 필름 히어로/스크롤 수축/네비/카운트업 등 인터랙션 최소 단위로 한정
- 검증: `pnpm --filter @lds/docs build` + `tsc --noEmit` 통과
