# LDS UI-v3 Component Development Checklist

기준일: 2026-03-09 (KST)

## 1. Baseline/Already Done
- [x] Turborepo + pnpm workspace 구조 정리
- [x] `apps/docs` (Next.js + MDX) 문서 사이트 구성
- [x] Storybook autodocs 설정 (`tags: ["autodocs"]`)
- [x] `vanilla-extract` + `recipe` + `sprinkles` 적용
- [x] `Button`, `Input`, `Select` 구조 리팩터링
- [x] `Badge`, `Alert`, `Tabs`, `Chip` 신규 컴포넌트 추가
- [x] `Input`, `Select` `forwardRef` 적용 및 RHF `register()` 직접 연동 가능 구조
- [x] `Tabs`에 `"use client"` 적용
- [x] `pnpm run check` 통과
- [x] `ui-v3` 테스트 최근 기준 통과

## 2. Remaining Component Work (Now)

### 2.1 Visual QA (Zeplin Sync)
- [ ] Storybook에서 `Badge` Zeplin 시안과 1:1 비교
- [ ] Storybook에서 `Alert` Zeplin 시안과 1:1 비교
- [ ] Storybook에서 `Tabs` (line/segment) Zeplin 시안과 1:1 비교
- [ ] Storybook에서 `Chip` (basic/check/file/link) Zeplin 시안과 1:1 비교
- [ ] 컴포넌트별 간격/높이/폰트/색상 픽셀 보정
- [ ] 모바일/데스크탑 반응형에서 깨짐 여부 확인

### 2.2 Stories/Docs Completion
- [ ] `Input` RHF 실사용 예제 스토리 추가 (`register + FormProvider`)
- [ ] `Select` RHF 실사용 예제 스토리 추가 (`register + FormProvider`)
- [ ] `Tabs` 접근성 사용 가이드(키보드/aria) Docs 보강
- [ ] `Chip` 유형별 사용 기준(언제 basic/check/file/link 사용) Docs 보강
- [ ] `Alert` 상태별 사용 가이드(success/info/warning/error) Docs 보강

### 2.3 Behavior/Accessibility Check
- [ ] `Tabs` 키보드 네비게이션(좌/우/Home/End) 동작 검증
- [ ] `Select` invalid 상태에서 시각/스크린리더 메시지 검증
- [ ] `Input` prefix/suffix 조합에서 포커스 링/높이 일관성 검증
- [ ] `Chip` close/remove 액션의 포커스 이동 및 aria-label 검증

### 2.4 Test Coverage
- [ ] `Alert` 렌더링/variant 테스트 보강
- [ ] `Badge` variant/size 테스트 보강
- [ ] `Tabs` 인터랙션 테스트 보강 (탭 전환, disabled)
- [ ] `Chip` 유형별 이벤트 테스트 보강
- [ ] RHF 연동 스토리와 연계되는 기본 폼 동작 테스트 추가

### 2.5 Release/Integration
- [ ] `git status` 확인 후 미커밋 변경 정리
- [ ] Storybook 빌드 검증
- [ ] Docs 빌드 검증
- [ ] 배포 전 체크리스트 최종 확인

## 3. Suggested Execution Order
- [ ] Step 1: `git status` 및 작업 트리 정리
- [ ] Step 2: Visual QA + 픽셀 보정
- [ ] Step 3: RHF 예제 스토리 추가
- [ ] Step 4: 접근성/행동 검증 + 테스트 보강
- [ ] Step 5: 빌드 검증 후 커밋
