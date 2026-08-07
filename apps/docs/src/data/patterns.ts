import { PATTERN_DIAGRAMS } from "./pattern-diagrams";

export type PatternEntry = {
  slug: string;
  name: string;
  desc: string;
  diagramHtml: string;
  /** 패턴을 구현한 컴포넌트 상세 페이지 slug (있을 때만 카드에 링크 표시) */
  componentSlug?: string;
};

/** apps/docs에 실재하는 패턴 문서 5종 */
export const PATTERNS: PatternEntry[] = [
  {
    slug: "gnb",
    name: "GNB",
    desc: "제품 전체를 가로지르는 글로벌 내비게이션이에요. 로고·주 메뉴·계정 영역의 자리가 항상 같아요."
  },
  {
    slug: "lnb",
    name: "LNB",
    desc: "섹션 안을 이동하는 로컬 내비게이션이에요. 현재 위치가 언제나 왼쪽 목록에 표시돼요."
  },
  {
    slug: "drawer",
    name: "Drawer",
    desc: "흐름을 떠나지 않고 오른쪽에서 열리는 작업 패널이에요. 상세 편집과 부가 작업을 담아요.",
    componentSlug: "drawer"
  },
  {
    slug: "comments",
    name: "Comments",
    desc: "문서 위에서 이어지는 댓글과 멘션 스레드예요. @멘션이 담당자를 바로 불러요."
  },
  {
    slug: "table-tree",
    name: "Table Tree",
    desc: "사건·조직처럼 계층이 있는 데이터를 표 안에서 접었다 펼치는 패턴이에요.",
    componentSlug: "tabletree"
  }
].map(entry => ({ ...entry, diagramHtml: PATTERN_DIAGRAMS[entry.slug] ?? "" }));
