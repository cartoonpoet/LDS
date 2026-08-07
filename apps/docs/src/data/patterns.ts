import { PATTERN_DIAGRAMS } from "./pattern-diagrams";

export type PatternSection = {
  /** TOC/앵커용 id */
  id: string;
  title: string;
  paras?: string[];
  items?: string[];
};

export type PatternEntry = {
  slug: string;
  name: string;
  desc: string;
  diagramHtml: string;
  /** 패턴을 구현한 컴포넌트 상세 페이지 slug (있을 때만 카드에 링크 표시) */
  componentSlug?: string;
  /** /patterns/[slug] 상세 본문 (구 src/content MDX에서 이관, 실제 ui-v3 API 기준으로 교정) */
  sections: PatternSection[];
};

/** apps/docs에 실재하는 패턴 문서 5종 */
export const PATTERNS: PatternEntry[] = [
  {
    slug: "gnb",
    name: "GNB",
    desc: "제품 전체를 가로지르는 글로벌 내비게이션이에요. 로고·주 메뉴·계정 영역의 자리가 항상 같아요.",
    sections: [
      {
        id: "overview",
        title: "개요",
        paras: [
          "GNB는 서비스 최상단에서 주요 영역 전환을 담당하는 글로벌 내비게이션이에요. 로고·주 메뉴·계정 영역의 자리를 항상 같게 유지해서, 어떤 화면에 있어도 같은 방식으로 이동할 수 있어요.",
          "GNB는 디자인 시스템의 단일 컴포넌트가 아니라 각 서비스가 프리미티브를 조합해 만드는 패턴이에요. 이 문서는 그 조합 기준을 정리해요."
        ]
      },
      {
        id: "usage-guidelines",
        title: "사용 가이드",
        items: [
          "로고·주 메뉴·계정 영역의 순서와 자리는 제품이 달라져도 바꾸지 않아요.",
          "내비게이션 상태는 가볍게 유지하고, 실제 라우팅은 상위 애플리케이션에서 연결하는 구성을 권장해요."
        ]
      }
    ]
  },
  {
    slug: "lnb",
    name: "LNB",
    desc: "섹션 안을 이동하는 로컬 내비게이션이에요. 현재 위치가 언제나 왼쪽 목록에 표시돼요.",
    sections: [
      {
        id: "overview",
        title: "개요",
        paras: [
          "LNB는 업무 화면의 좌측 정보 구조를 단계적으로 펼쳐 보여주는 로컬 내비게이션이에요. 브랜드 영역, 활성 메뉴 강조, 접힘형(collapsed) 사이드바를 한 세트로 구성해요.",
          "GNB와 마찬가지로 디자인 시스템의 단일 컴포넌트가 아니라, 각 서비스에서 프리미티브를 조합해 만드는 패턴이에요."
        ]
      },
      {
        id: "usage-guidelines",
        title: "사용 가이드",
        items: [
          "그룹은 정보 분류, 하위 항목은 실제 이동 단위처럼 보이게 구성해요.",
          "활성 메뉴는 배경색만 바꾸기보다 상위 그룹과 하위 링크가 함께 읽히도록 강조하는 편이 좋아요.",
          "좁은 레이아웃에서는 collapsed 모드로 아이콘 중심 탐색을 제공해요.",
          "실제 라우팅은 서비스 레이어에서 href나 클릭 핸들러로 연결해요."
        ]
      }
    ]
  },
  {
    slug: "drawer",
    name: "Drawer",
    desc: "흐름을 떠나지 않고 오른쪽에서 열리는 작업 패널이에요. 상세 편집과 부가 작업을 담아요.",
    componentSlug: "drawer",
    sections: [
      {
        id: "overview",
        title: "개요",
        paras: [
          "Drawer는 메인 컨텍스트를 유지한 채 상세 정보나 보조 편집 화면을 열어야 할 때 쓰는 보조 레이어예요. 화면 가장자리에서 슬라이드 인 하는 패널로, 계약 상세·필터 패널 같은 부가 작업을 담아요."
        ]
      },
      {
        id: "supported-features",
        title: "현재 지원 범위",
        items: [
          "side — right(기본) / left 슬라이드 방향",
          "size — small 360px / medium 480px / large 640px 너비 프리셋",
          "title · footer 슬롯 — Modal과 같은 헤더(타이틀 + 닫기) / 스크롤 바디 / 푸터 구조",
          "backdrop — true(기본)면 dim + 클릭 닫기 + 스크롤락, false면 페이지 조작이 가능한 비차단 모드",
          "closeOnEscape — Escape 키 닫기 (기본 on)"
        ]
      },
      {
        id: "usage-guidelines",
        title: "사용 가이드",
        items: [
          "짧은 상세 보기, 보조 편집, 이력 패널에는 Drawer가 적합해요.",
          "주요 의사결정이나 강한 확인이 필요한 경우는 Modal 계열로 분리하는 편이 좋아요."
        ]
      }
    ]
  },
  {
    slug: "comments",
    name: "Comments",
    desc: "문서 위에서 이어지는 댓글과 멘션 스레드예요. @멘션이 담당자를 바로 불러요.",
    sections: [
      {
        id: "overview",
        title: "개요",
        paras: [
          "Comments는 문서 검토 이력, 협업 대화, 모바일 하단 시트 안의 피드백 흐름처럼 서로 비슷하지만 레이아웃이 다른 코멘트 UI를 하나의 기준으로 묶은 패턴이에요.",
          "코멘트 스레드는 디자인 시스템의 단일 컴포넌트가 아니라 각 서비스에서 프리미티브를 조합해 만들어요."
        ]
      },
      {
        id: "variants",
        title: "레이아웃 변형",
        items: [
          "timeline — 문서 검토 로그처럼 순서와 맥락이 중요할 때 사용해요.",
          "chat — 담당자 간 빠른 왕복 커뮤니케이션에 더 읽기 쉬워요.",
          "bottom-sheet — 모바일 상세 화면이나 하단 레이어 안의 의견 흐름에 적합해요."
        ]
      },
      {
        id: "usage-guidelines",
        title: "사용 가이드",
        items: [
          "작성자·시각·메타 정보·첨부는 항목 레이아웃을 공유하고, 내가 남긴 메시지는 정렬로 구분해요.",
          "제출 시 앞뒤 공백을 정리(trim)하고 composer를 초기화해요.",
          "코멘트 데이터 fetch, optimistic update, 권한 제어는 상위 컨테이너가 담당하고, 코멘트 UI는 목록 렌더링과 composer 인터랙션에 집중시키는 편이 유지보수에 유리해요."
        ]
      }
    ]
  },
  {
    slug: "table-tree",
    name: "Table Tree",
    desc: "사건·조직처럼 계층이 있는 데이터를 표 안에서 접었다 펼치는 패턴이에요.",
    componentSlug: "tabletree",
    sections: [
      {
        id: "overview",
        title: "개요",
        paras: [
          "Table Tree는 트리 구조와 표 구조가 같이 필요한 목록 화면용 패턴이에요. 첫 번째 컬럼에 계층을 표현하고, 나머지 컬럼에는 부서·건수·상태 같은 보조 정보를 배치해요."
        ]
      },
      {
        id: "supported-features",
        title: "현재 지원 범위",
        items: [
          "첫 컬럼 계층 indent와 펼침/접힘 토글",
          "columns 정의 기반 다중 컬럼 데이터 표현",
          "펼침 상태 제어 — defaultExpandedIds(uncontrolled) / expandedIds + onExpandedChange(controlled)"
        ]
      },
      {
        id: "usage-guidelines",
        title: "사용 가이드",
        items: [
          "조직, 문서 분류, 권한 매트릭스처럼 부모-자식 관계와 속성이 함께 필요한 화면에 적합해요.",
          "selection, bulk action, virtualization은 다음 단계 확장 후보예요."
        ]
      }
    ]
  }
].map(entry => ({ ...entry, diagramHtml: PATTERN_DIAGRAMS[entry.slug] ?? "" }));

export const findPattern = (slug: string) => PATTERNS.find(entry => entry.slug === slug);
