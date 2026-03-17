# UI v3 재구축 계획 (A안)

## 목표

- `packages/tokens`, foundations 문서, docs 앱의 큰 골격은 유지합니다.
- `packages/ui-v3`의 기존 컴포넌트 구현은 재구축 대상으로 간주합니다.
- 기준 기술은 **React + vanilla-extract** 입니다.
- 구현 기준은 **찾기 쉬운 코드 / 읽기 쉬운 코드 / 단일 책임 / 커스텀 훅 분리 / Storybook & docs 병행** 입니다.

## 이번 런 체크리스트

- [x] A안 기준 재구축 체크리스트 문서 작성
- [x] 제거/대체 대상 컴포넌트 범위 정리
- [x] 코어 컴포넌트 재구축 순서 확정
- [x] 공통 foundation 후보 정의 (`field`, `cx`)
- [x] `Button` 재구축 시작
- [x] `Input` 재구축 시작
- [ ] `Select`를 공통 field foundation 위로 이전
- [ ] 나머지 컴포넌트에 공통 foundation 확산
- [ ] docs / storybook 문서 완결도 보강
- [ ] 회귀 테스트 확장

## 제거 / 대체 대상 범위

### 유지

- `packages/tokens`
- `apps/docs` 정보 구조
- `apps/storybook` 실행 구조
- `packages/ui-v3/src/index.ts`의 공개 진입점 개념

### 재구축 대상

`packages/ui-v3/src/components` 하위 구현 전반

우선 재구축 대상 그룹은 아래와 같습니다.

1. **Core primitives**
   - Button
   - Input
   - Select
   - Tabs
   - Badge
   - Alert

2. **Form / selection composites**
   - Dropdown
   - DatePicker
   - FileUpload
   - ButtonGroup
   - Chip

3. **Data / navigation composites**
   - DataTable
   - Pagination
   - TreeView
   - TableTree
   - Drawer
   - Gnb
   - Lnb

4. **Domain-heavy components**
   - ApprovalLine
   - Viewer
   - ESignForm
   - Comments

## 대체 원칙

- 컴포넌트마다 JSX, 스타일, 상태 계산, 문서 설명 책임을 분리합니다.
- 가능한 경우 **공통 foundation 계층**을 먼저 만들고 개별 컴포넌트가 이를 소비하게 합니다.
- 단순 class 조합은 유틸 함수로 빼고, 상태 파생은 커스텀 훅으로 분리합니다.
- native control을 유지할 수 있는 범위에서는 우선 유지하여 접근성과 폼 호환성을 확보합니다.

## 코어 컴포넌트 재구축 순서

1. **Button**
   - 액션 계열 시각 규칙의 기준점
   - tone / variant / size 조합의 스타일 시스템 정리
   - loading / icon / fullWidth 규칙 확정

2. **Input**
   - field 계열 foundation의 기준점
   - label / helper / status / adornment 구조 정리

3. **Select**
   - `Input`에서 만든 field foundation 재사용
   - caption / placeholder / grouped options / multiple 대응

4. **Tabs / Badge / Alert**
   - 공통 색/상태 규칙 확산

5. **Dropdown / DatePicker / FileUpload**
   - field foundation + 상호작용 훅 패턴 적용

6. **DataTable / Tree 계열 / Navigation 계열**
   - 복합 상태를 훅 단위로 쪼개고 view는 최대한 선언적으로 유지

## 현재 판단

- 지금 토큰 레이어는 충분히 재사용 가치가 있습니다.
- 문제는 `ui-v3` 내부가 컴포넌트별로 제각각 흩어져 있다는 점입니다.
- 따라서 **foundation → primitive → composite** 순서로 다시 쌓는 편이 안전합니다.

## 이번 런 산출물

- `Button` 재구축
- `Input` 재구축
- field foundation 초안 추가
- docs / stories 문구를 재구축 방향에 맞게 보강
