# LDS Docs UI 재구성 계획

## 목표

- **문서 내용물은 유지**하고, docs 앱의 **UI shell / 레이아웃 / 정보 제시 방식만 재구성**합니다.
- 기준 감성은 **Montage (Wanted Design System)** 이지만, 색상은 **LDS 시그니처 컬러와 토큰 체계**를 사용합니다.
- 즉, `Montage의 정돈된 문서 경험`을 참고하되 결과물은 **LDS다운 문서 사이트**가 되어야 합니다.
- 이번 단계에서는 구현보다 먼저 **gap analysis + 우선순위 + 수정 대상 파일 후보**를 명확히 정리합니다.

## 참고 기준 요약

Montage 홈/문서에서 확인되는 핵심 인상은 아래와 같습니다.

- 상단에서 **Getting Started / Foundations / Components / Utilities**처럼 큰 정보 구조가 명확합니다.
- 랜딩은 단순 링크 모음이 아니라 **브랜드 메시지 + 시작점 + 리소스 링크**를 한 화면 안에서 제공합니다.
- 전체적으로 여백이 크고, 타이포 위계가 분명하며, 카드/링크가 과하게 장식되지 않습니다.
- 문서 UX가 “컴포넌트 목록 나열”보다 **탐색 흐름 설계**에 가깝습니다.
- 따라서 LDS도 현재의 “3-컬럼 docs shell + 동일한 overview grid 반복”에서 벗어나, **랜딩/섹션/상세 페이지의 역할을 분리**해야 합니다.

---

## 1) Montage에서 참고할 레이아웃 요소

### A. Top-level IA(정보 구조) 노출 방식

참고 포인트:

- 전역에서 보이는 대분류가 매우 선명합니다.
- 사용자는 문서를 읽기 전에 먼저 “이 시스템이 무엇을 제공하는가”를 빠르게 파악합니다.

LDS 적용 방향:

- 좌측 단일 nav만으로 끝내지 말고,
- 상단 또는 랜딩 hero 주변에서
  - 개요
  - Foundations
  - Components
  - Resources / Storybook
  같은 진입점을 **명시적인 section entry**로 노출합니다.

### B. Hero + Getting Started 성격의 시작 화면

참고 포인트:

- 브랜드 한 줄 메시지
- 시스템 소개
- 바로 시작할 수 있는 링크
- 외부 리소스(Figma, Kit, Font 등) 접근

LDS 적용 방향:

- 소개 페이지를 단순 MDX 본문이 아니라 **실질적인 landing page**로 승격합니다.
- hero에는 아래 요소가 적합합니다.
  - LDS 한 줄 정의
  - 법무 도메인에 맞는 시스템 가치
  - 주요 진입 CTA: Foundations / Components / Storybook
  - 현재 v3 범위 요약

### C. Section card 기반 탐색

참고 포인트:

- Montage는 상위 카테고리를 이해 가능한 덩어리로 보여줍니다.
- 링크가 텍스트 나열보다 “이 섹션에서 무엇을 얻는가” 중심입니다.

LDS 적용 방향:

- 현재 `docs-overview-grid`는 모든 페이지에 반복되는데, 이것은 랜딩/섹션 페이지에는 유효하지만 **상세 페이지에서는 정보 잡음**이 됩니다.
- overview card는 유지하되:
  - 랜딩: 크게 사용
  - 섹션 페이지: 하위 문서 index 용도로 사용
  - 컴포넌트 상세: 제거 또는 축소
  하는 방식이 적합합니다.

### D. 읽기 중심 상세 페이지 템플릿

참고 포인트:

- 큰 타이틀, 분명한 summary, 안정적인 본문 폭, 단정한 목차 영역
- 크롬(shell)이 콘텐츠를 압도하지 않음

LDS 적용 방향:

- 상세 페이지에서는 hero를 짧게 만들고,
- 핵심 정보(요약, 상태, 링크, preview)를 상단에 구조화합니다.
- right rail TOC는 유지 가능하지만 시각 무게를 줄이고 sticky card보다는 **조용한 page outline** 쪽이 더 어울립니다.

### E. 리소스 링크의 제품화

참고 포인트:

- Montage는 문서 외부 리소스를 문서 경험 일부처럼 다룹니다.

LDS 적용 방향:

- Storybook 링크를 현재처럼 topbar의 외로운 1개 버튼으로 두지 말고,
- landing/section/header에서 아래처럼 재구성합니다.
  - Storybook
  - package source / examples
  - design reference(필요 시)

---

## 2) LDS에 그대로 유지할 것

이번 리디자인은 전면 교체가 아니라 **내용 보존 + 문서 경험 개선**이므로, 아래는 유지하는 편이 좋습니다.

### A. docs registry 기반 문서 라우팅 구조

유지 대상:

- `apps/docs/src/lib/docs.tsx`
- `docsRegistry`, `docsGroups`, `getDocNeighbors`, `findDocBySlug`

이유:

- 현재 구조는 정적 라우팅/문서 등록 관점에서 충분히 단순하고 읽기 쉽습니다.
- UI shell만 바꿔도 계속 활용 가능합니다.

### B. MDX 콘텐츠 자산

유지 대상:

- `apps/docs/src/content/**`
- introduction / foundations / components 문서 본문

이유:

- 이번 목표는 콘텐츠 재작성보다 **콘텐츠를 더 잘 보이게 하는 레이아웃 개선**입니다.
- 섹션별 문장, usage guideline, preview 예시는 그대로 활용 가치가 높습니다.

### C. DocPrimitives의 콘텐츠용 primitive 개념

유지 대상:

- `Callout`, `Preview`, `PreviewGrid`, `Stack`
- showcase component 패턴

이유:

- MDX에서 재사용 가능한 문서 primitive라는 방향 자체는 좋습니다.
- 다만 시각 스타일과 종류는 확장/정리할 필요가 있습니다.

### D. 좌/우 rail 개념 자체

유지 대상:

- 좌측 탐색
- 우측 page outline(TOC)

이유:

- 긴 문서에서 여전히 유효합니다.
- 단, 현재는 항상 같은 무게로 노출되어 랜딩/상세의 역할 차이가 없습니다.
- **없애기보다 역할별로 다르게 변주**하는 편이 적절합니다.

### E. LDS 도메인 메시지

유지 대상:

- 법무 시스템용 디자인 시스템이라는 포지셔닝
- 정보 밀도 / 검토 / 승인 / 입력 흐름 중심이라는 서술

이유:

- Montage 감성은 빌리되, 브랜드 언어는 LDS 것이어야 합니다.

---

## 3) 바꿔야 할 docs shell 요소

## 3-1. Landing

### 현재 상태

- 소개 페이지도 일반 상세 문서와 같은 레이아웃을 사용합니다.
- 상단에 breadcrumb, summary, overview grid, 본문이 동일하게 반복됩니다.
- 결과적으로 첫 화면이 “시작 페이지”가 아니라 “평범한 문서 1개”처럼 보입니다.

### 문제

- 첫 인상이 약함
- LDS가 어떤 시스템인지 한 번에 이해되지 않음
- Storybook/핵심 섹션으로 바로 점프하는 흐름이 약함

### 변경 방향

소개 페이지 전용 landing 템플릿 추가:

- 대형 hero
- LDS 소개 카피
- 주요 CTA 묶음
- 섹션 cards (Overview / Foundations / Components)
- 현재 v3 범위 또는 featured components
- Storybook / resources strip

### 체크리스트

- [ ] introduction 전용 landing variant 정의
- [ ] hero 카피/CTA 영역 설계
- [ ] section card를 landing 맞춤형으로 재배치
- [ ] Storybook/resource 링크를 landing 블록으로 승격

## 3-2. Navigation

### 현재 상태

- 좌측 nav는 그룹/링크 나열 중심
- active 표현이 약하고, 섹션 구조 이해보다 단순 목록 느낌이 강함
- 모바일에서 collapsed navigation 전략이 없음

### 문제

- 구조는 있으나 제품 수준 탐색 경험은 약함
- 문서가 늘어나면 확장성이 떨어짐

### 변경 방향

- 좌측 nav를 **section-first navigation**으로 정리
- 브랜드 영역과 nav 영역을 분리
- 현재 섹션 open/close 또는 강조 상태 제공
- 모바일에서는 top sheet / drawer 방식 고려

### 체크리스트

- [ ] 브랜드 블록과 문서 nav 분리
- [ ] 섹션 active state 강화
- [ ] 하위 항목 그룹화 규칙 정리
- [ ] 모바일 nav fallback 설계

## 3-3. Hero / Page Header

### 현재 상태

- 모든 페이지 헤더가 거의 동일합니다.
- kicker + title + summary는 좋지만, 문서 타입별 차별화가 없습니다.

### 문제

- introduction / foundation / component 상세가 같은 온도로 보임
- “이 페이지에서 뭘 얻는지”가 구조적으로 드러나지 않음

### 변경 방향

- 페이지 타입별 header variant 분리
  - landing hero
  - section hero
  - component doc header
  - foundation doc header
- component 상세에서는 summary 아래에 meta row 추가 가능
  - status
  - linked storybook
  - implementation scope

### 체크리스트

- [ ] page type 분류 기준 정의
- [ ] header variant 분리
- [ ] component page meta row 설계
- [ ] summary / kicker typography LDS 토큰 반영

## 3-4. Section Cards

### 현재 상태

- `docs-overview-grid`가 모든 페이지 상단에 반복됩니다.
- 카드 설명은 괜찮지만, 페이지 맥락과 무관하게 항상 보입니다.

### 문제

- 상세 페이지에서 반복 피로감 발생
- 실제 탐색 보조보다 장식에 가까워짐

### 변경 방향

- overview card를 **항상 노출하는 공통 블록**에서 해제합니다.
- 랜딩과 섹션 index에서만 적극 사용합니다.
- 컴포넌트 상세에서는 “related docs / adjacent docs / resources” 등 더 문맥적인 카드로 대체합니다.

### 체크리스트

- [ ] overview grid를 상세 공통 레이아웃에서 제거
- [ ] 섹션 index 전용 card grid 설계
- [ ] 상세 페이지용 related resources 블록 정의

## 3-5. Component Page Template

### 현재 상태

- component page는 일반 MDX 문서와 동일하며, preview가 본문 중간에 섞여 있습니다.
- 컴포넌트의 상태/적용 범위/관련 링크가 구조화되어 있지 않습니다.

### 문제

- 사용자가 “이 컴포넌트를 당장 써도 되는가?”를 빠르게 판단하기 어렵습니다.
- preview, guideline, props, rebuild notes가 명확히 구획되지 않습니다.

### 변경 방향

component 상세 템플릿 제안:

1. Header
   - component name
   - summary
   - status/meta chips
2. Quick actions
   - Storybook
   - source
   - related foundation
3. Hero preview
   - 가장 대표 상태 1개 또는 1세트
4. Body sections
   - Overview
   - Variants / Props
   - Usage guidelines
   - Implementation notes
5. Bottom navigation
   - next/prev + related components

### 체크리스트

- [ ] component 상세 공통 shell 설계
- [ ] hero preview slot 도입 여부 결정
- [ ] related foundation / storybook quick actions 추가
- [ ] MDX authoring 규칙과 충돌 없는지 확인

## 3-6. Foundation Page Template

### 현재 상태

- component 상세와 큰 차이가 없습니다.

### 변경 방향

- foundation 문서는 읽기형 템플릿으로 유지하되,
- 상단에 “왜 중요한지 / 적용 범위 / 관련 컴포넌트”를 먼저 보여주는 편이 좋습니다.
- 색상/타이포 문서는 카드나 샘플 블록을 조금 더 전면에 배치할 수 있습니다.

## 3-7. TOC / Right Rail

### 현재 상태

- right rail은 모든 페이지에서 같은 카드 UI
- 제목이 `On this page`로 고정

### 문제

- 페이지 타입과 무관하게 동일함
- 국문 문서 톤과 다소 분리됨

### 변경 방향

- `On this page` → `이 페이지에서` 또는 `목차`로 로컬라이즈
- landing에서는 제거하거나 resource rail로 대체
- 상세 페이지에서만 표시
- active heading 강조 추가 가능

### 체크리스트

- [ ] right rail 표시 조건 분기
- [ ] TOC title 국문화
- [ ] active heading style 정의

## 3-8. Preview / Callout 스타일

### 현재 상태

- preview와 callout이 무난하지만 현재 docs shell과 동일 톤이라 위계 차이가 약합니다.

### 변경 방향

- LDS signature color를 활용한 subtle accent 도입
- callout 종류 확장 검토
  - info
  - caution
  - implementation note
- preview는 실제 컴포넌트 stage처럼 보여주되, 배경/보더/라운드 값을 더 체계화

### 체크리스트

- [ ] preview surface 스타일 재정의
- [ ] callout variant 확장 여부 결정
- [ ] component hero preview와 일반 inline preview의 차별화

---

## 4) Gap Analysis 요약

### 현재 LDS docs의 장점

- 구조가 단순해서 고치기 쉽습니다.
- registry 기반 정보 정의가 명확합니다.
- MDX + primitives 조합이 이미 있어 확장성이 있습니다.
- 토큰/컴포넌트 문서가 한 저장소 안에 있어 일관된 개선이 가능합니다.

### 현재 LDS docs의 핵심 gap

1. **모든 페이지가 거의 같은 형태**라 정보 구조의 레벨 차이가 보이지 않음
2. **landing page 부재**로 첫 인상이 약함
3. **section index와 detail page의 역할 분리 부족**
4. **component 문서의 quick decision UX 부족**
5. **overview grid 반복 노출**로 상세 페이지 집중도 저하
6. **Montage 수준의 브랜드/탐색/시작점 설계 부족**

### 한 줄 결론

현재 LDS docs는 “문서가 있는 상태”이고,
목표는 이를 “탐색 가능한 디자인 시스템 사이트”로 올리는 것입니다.

---

## 5) 구현 우선순위

### P0. 정보 구조와 템플릿 분리

가장 먼저 할 일:

- landing / section / detail 템플릿 분리
- overview grid의 공통 반복 제거
- DocsLayout이 모든 것을 담당하는 구조 완화

이유:

- 이것이 해결되어야 Montage 감성의 핵심인 “페이지 역할 분화”가 가능합니다.

### P1. Landing / Navigation 리디자인

- introduction을 landing 전용 화면으로 개편
- nav hierarchy와 brand block 개선
- Storybook/resources 진입점 재배치

이유:

- 첫인상과 탐색성이 가장 크게 좋아집니다.

### P2. Component page template 개선

- component header meta
- quick actions
- hero preview
- related docs/resources

이유:

- 실사용자 가치가 가장 큽니다.

### P3. Foundation page template 개선

- 읽기형 페이지 밀도 조정
- related components 연결
- 샘플 블록 개선

### P4. TOC / mobile nav / polish

- mobile navigation fallback
- TOC active state
- 미세한 spacing / hover / card polish

---

## 6) 실제 수정 대상 파일 후보

### 1차 핵심 파일

- `apps/docs/src/components/DocsLayout.tsx`
  - 현재 모든 shell 책임이 몰려 있는 핵심 파일
  - landing/section/detail 분리의 출발점

- `apps/docs/app/globals.css`
  - 현재 docs 전체 스타일이 여기에 집중됨
  - 리디자인의 대부분이 이 파일에서 시작되지만,
  - 가능하면 이후에는 layout/nav/content 단위로 분리하는 것이 좋음

- `apps/docs/src/lib/docs.tsx`
  - doc type / section metadata / quick links / featured 여부 같은 정보 확장 지점

- `apps/docs/src/content/overview/introduction.mdx`
  - landing 성격에 맞는 콘텐츠 블록 재배치 후보

- `apps/docs/src/components/DocPrimitives.tsx`
  - preview / callout / showcase 계열 확장 지점

### 2차 확장 파일

- `apps/docs/app/[[...slug]]/page.tsx`
  - layout 선택 로직이 필요해지면 수정 가능

- `apps/docs/app/layout.tsx`
  - 메타데이터 및 전역 wrapper 변경 시 수정

- `apps/docs/mdx-components.tsx`
  - 새 primitive를 MDX에 노출할 경우 수정

### 새로 생길 가능성이 높은 파일

- `apps/docs/src/components/docs/DocsLandingLayout.tsx`
- `apps/docs/src/components/docs/DocsSectionLayout.tsx`
- `apps/docs/src/components/docs/DocsDetailLayout.tsx`
- `apps/docs/src/components/docs/DocsSidebar.tsx`
- `apps/docs/src/components/docs/DocsPageHeader.tsx`
- `apps/docs/src/components/docs/DocsToc.tsx`
- `apps/docs/src/components/docs/DocsSectionCards.tsx`

권장 이유:

- 지금의 `DocsLayout.tsx`는 책임이 큽니다.
- 준호님이 선호하시는 **찾기 쉬운 코드 / 단일 책임** 기준에도, shell을 역할별 컴포넌트로 분리하는 편이 맞습니다.

---

## 추천 구현 방식

### 방향

- `DocsLayout.tsx`를 덩치 큰 단일 레이아웃으로 계속 키우기보다,
- **page type 기반 조합형 레이아웃**으로 전환합니다.

예시:

- `docs.tsx`에서 문서 메타에 `pageType: "landing" | "foundation" | "component"` 추가
- `page.tsx` 또는 상위 layout에서 pageType에 따라 다른 header/body block 조합
- 공통 shell은 sidebar / content frame / toc 정도만 남기기

### 디자인 원칙

- 컬러는 LDS 토큰으로 대체
- Montage는 **구조와 밀도, 위계감**만 참고
- 카드 수를 줄이고, 한 블록의 목적을 더 분명히 만들기
- 모든 페이지에 같은 블록을 반복하지 않기

---

## 이번 턴 체크리스트

- [x] 현재 docs 구조 확인 (`DocsLayout`, `DocPrimitives`, `docs registry`, `introduction`)
- [x] 현재 docs 스타일 위치 확인 (`app/globals.css`)
- [x] Montage 참고 포인트 정리
- [x] 유지할 요소 / 변경할 요소 구분
- [x] 구현 우선순위 정의
- [x] 수정 대상 파일 후보 정리
- [x] `designs/notes` 아래 계획 문서 작성

## 현재 단계

- **기획 단계 완료 / 구현 전 설계 정리 완료**

## 다음 액션 제안

1. `DocsLayout.tsx` 책임 분리 초안 작성
2. landing / detail wireframe 수준 JSX 구조 먼저 개편
3. 그 다음 `globals.css`를 shell 단위로 재조정
4. 마지막으로 introduction / component docs에 필요한 meta 확장
