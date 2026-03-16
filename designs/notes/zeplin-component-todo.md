# Zeplin Export 기준 미개발 컴포넌트 TODO

기준 비교:
- Zeplin reference: `designs/references/zeplin-export/*`
- 현재 구현 컴포넌트: `packages/ui-v3/src/components/*`
- 현재 docs 문서화: `apps/docs/src/content/components/*`

## 현재 구현된 컴포넌트

- Alert
- Badge
- Button
- Chip
- Input
- Select
- Tabs

## 현재 문서화된 컴포넌트

- Button
- Input
- Select

---

## A. 우선 개발 필요 (핵심 공통 컴포넌트)

### 1) Dropdowns
- Zeplin: `Dropdowns.png`
- 상태: **미개발**
- 메모:
  - 현재 `Select`는 있지만 조합형 dropdown 패턴은 별도 필요
  - searchable / single / multi / async 후보 검토
- 우선순위: 높음

### 2) Data Tables
- Zeplin: `Data Tables.png`
- 상태: **미개발**
- 메모:
  - 법무 시스템 핵심 화면 가능성 높음
  - row/cell alignment, header, sort, empty state, density 토큰 필요
- 우선순위: 매우 높음

### 3) Comparison Tables
- Zeplin: `Comparison Tables.png`
- 상태: **미개발**
- 메모:
  - Data Table 기반 확장으로 구현 가능성 높음
- 우선순위: 높음

### 4) Date & Time Pickers
- Zeplin: `Date & TIme Pickers.png`
- 상태: **미개발**
- 메모:
  - 입력 폼 확장에 필요
  - 법무 문서/기안/승인 흐름에서 빈도 높을 가능성 큼
- 우선순위: 높음

### 5) Drawer
- Zeplin: `Drawer.png`
- 상태: **미개발**
- 메모:
  - 상세 패널 / 보조 편집 UI에 필요
- 우선순위: 중상

### 6) Cards(View)
- Zeplin: `Cards(View).png`
- 상태: **미개발**
- 메모:
  - summary / dashboard / widget 기반 화면에 필요
- 우선순위: 중상

### 7) Button Groups / Paginations
- Zeplin: `Button Groups, Tabs, Paginations.png`
- 상태: **부분 개발**
- 현재: Tabs만 존재
- 남은 것:
  - ButtonGroup
  - Pagination
- 우선순위: 높음

### 8) Step Bars
- Zeplin: `Step Bars.png`
- 상태: **미개발**
- 메모:
  - 다단계 입력/승인 흐름에 적합
- 우선순위: 중상

---

## B. 법무 시스템 특화 패턴 (도메인 우선 검토)

### 9) Approval Lines
- Zeplin: `Approval Lines.png`
- 상태: **미개발**
- 메모:
  - 법무 시스템 특화 핵심 컴포넌트 후보
  - 단순 UI가 아니라 domain model 필요
- 우선순위: 매우 높음

### 10) E-Sign Forms
- Zeplin: `E-Sign Forms.png`
- 상태: **미개발**
- 메모:
  - 전자서식 / 서명 플로우용 조합형 패턴
- 우선순위: 매우 높음

### 11) Viewer
- Zeplin: `Viewer.png`
- 상태: **미개발**
- 메모:
  - 문서 보기 / 첨부파일 보기 / 판독 화면 가능성
- 우선순위: 매우 높음

### 12) Attache Files & File Uploads
- Zeplin: `Attache Files & File Uploads.png`
- 상태: **미개발**
- 메모:
  - Chip/File 패턴과 연동 가능
  - uploader / file list / progress / error state 필요
- 우선순위: 높음

### 13) Table Trees
- Zeplin: `Table Trees.png`
- 상태: **미개발**
- 메모:
  - tree + table 결합형
  - 법무 문서/조직/권한 구조와 잘 맞을 수 있음
- 우선순위: 높음

### 14) Tree Views
- Zeplin: `Tree Views.png`
- 상태: **미개발**
- 메모:
  - 조직도/문서 분류/폴더 구조용 가능성
- 우선순위: 중상

### 15) Comments (Timeline / Chat / Bottom Sheet)
- Zeplin:
  - `Comments(Timeline Type).png`
  - `Comments(Chat Type).png`
  - `Comments(Bottom Sheet).png`
- 상태: **미개발**
- 메모:
  - 주석/커뮤니케이션/협업 피드백 영역
- 우선순위: 중상

---

## C. 보조 UI / 레이아웃 계열

### 16) GNB
- Zeplin: `GNB.png`
- 상태: **미개발**
- 메모:
  - 앱 shell 레벨 컴포넌트
- 우선순위: 중간

### 17) LNB
- Zeplin: `LNB.png`
- 상태: **미개발**
- 메모:
  - 앱 shell/navigation 레벨 컴포넌트
- 우선순위: 중간

### 18) Widgets
- Zeplin: `Widgets.png`
- 상태: **미개발**
- 메모:
  - dashboard block 성격
  - Cards와 일부 중첩 가능
- 우선순위: 중간

### 19) Charts
- Zeplin: `Charts.png`
- 상태: **미개발**
- 메모:
  - 우선 토큰 먼저, 컴포넌트는 wrapper 패턴으로 갈지 검토
- 우선순위: 중간

### 20) AI
- Zeplin: `AI.png`
- 상태: **미개발**
- 메모:
  - AI assistant panel / response block / prompt UI 계열 가능성
- 우선순위: 중간

---

## D. 이미 대체로 대응된 항목

### 21) Alerts
- Zeplin: `Alerts.png`
- 상태: **개발 완료(1차~마감 보정)**

### 22) Badges & Chips
- Zeplin: `Badges & Chips.png`
- 상태: **개발 완료(1차~마감 보정)**

### 23) Form Elements
- Zeplin: `Form Elements.png`
- 상태: **부분 대응**
- 현재: Input / Select
- 남은 것:
  - checkbox / radio / switch / textarea / field grouping 가능성 확인 필요

### 24) Filled / Border / Gradient Buttons Colors & States
- Zeplin:
  - `Filled Buttons Colors & States.png`
  - `Border Buttons Colors & States.png`
  - `Gradient Buttons Colors & States.png`
  - `Gradient Buttons Colors & States (1).png`
- 상태: **대체로 대응 완료**
- 현재: Button tone/variant/state 1차 반영
- 남은 것:
  - 최종 픽셀 QA

### 25) Theme / Text / Color / Bootstrap / Opacity Colors
- Zeplin:
  - `Theme Colors.png`
  - `Text Style.png`
  - `Color States.png`
  - `Bootstrap Colors.png`
  - `Opacity Colors.png`
- 상태: **토큰 1차 정리 완료, 추가 정밀화 여지 있음**

---

## 추천 개발 순서

### Phase 2-A (가장 추천)
1. Data Tables
2. Dropdowns
3. Date & Time Pickers
4. Pagination / ButtonGroup

### Phase 2-B (법무 특화)
5. Approval Lines
6. Viewer
7. E-Sign Forms
8. File Uploads

### Phase 2-C (정보 구조 / 내비게이션)
9. Tree Views / Table Trees
10. Drawer
11. GNB / LNB
12. Comments 패턴

---

## 한 줄 요약

현재는 **기초 컴포넌트와 토큰 기반은 잡혔고**, 다음부터는 **테이블 / 드롭다운 / 날짜 선택 / 승인선 / 문서 뷰어** 같은 실전 패턴을 우선 개발하는 것이 가장 효율적이다.
