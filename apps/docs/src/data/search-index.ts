import { COMPONENT_LIST } from "./component-list";
import { GENERATED_PROPS } from "./component-props.generated";
import { FOUNDATIONS } from "./foundations";
import { PATTERNS } from "./patterns";
import { RELEASES } from "./updates";

/**
 * Cmd+K 검색 인덱스 — 기존 인벤토리(component-list / foundations / patterns / updates)를
 * import해서 조립하는 정적 배열. 빌드 스텝·외부 의존성 없이 60여 항목을 전부 담는다.
 */

export type SearchEntryType = "component" | "foundation" | "pattern" | "page";

export type SearchEntry = {
  type: SearchEntryType;
  title: string;
  desc: string;
  href: string;
  keywords: readonly string[];
};

/** 컴포넌트 한글 별칭 — 초성/한글 검색용 (예: "버튼" → Button, "ㅁㄷ" → 모달류) */
const COMPONENT_KO_ALIASES: Record<string, readonly string[]> = {
  alert: ["알림", "경고"],
  autocomplete: ["자동완성"],
  avatar: ["아바타", "프로필"],
  badge: ["뱃지", "배지"],
  breadcrumb: ["브레드크럼", "경로"],
  button: ["버튼"],
  buttongroup: ["버튼그룹", "버튼"],
  buttontab: ["버튼탭", "탭"],
  calendarpopover: ["캘린더팝오버", "달력"],
  card: ["카드"],
  charttooltip: ["차트툴팁", "차트"],
  checkbox: ["체크박스"],
  chip: ["칩"],
  chipsnavigation: ["칩내비게이션", "칩"],
  collapse: ["콜랩스", "아코디언", "접기"],
  datatable: ["데이터테이블", "테이블", "표"],
  datepicker: ["데이트피커", "달력", "날짜"],
  drawer: ["드로어", "패널"],
  dropdown: ["드롭다운", "셀렉트"],
  fileupload: ["파일업로드", "첨부"],
  floatingmodal: ["플로팅모달", "모달"],
  fullscreenmodal: ["전체화면모달", "모달"],
  icon: ["아이콘"],
  iconbuttongroup: ["아이콘버튼그룹", "아이콘"],
  infopopover: ["인포팝오버", "도움말"],
  input: ["인풋", "입력"],
  inputdatepicker: ["날짜입력", "달력"],
  inputdaterangepicker: ["기간입력", "날짜범위"],
  linkbadge: ["링크뱃지", "뱃지"],
  listgroup: ["리스트그룹", "목록"],
  mention: ["멘션"],
  modal: ["모달"],
  navigationtab: ["내비게이션탭", "탭"],
  numberinput: ["숫자입력"],
  pagination: ["페이지네이션"],
  popover: ["팝오버"],
  progress: ["프로그레스", "진행률"],
  quickmenu: ["퀵메뉴", "바로가기"],
  radio: ["라디오"],
  radiobuttongroup: ["라디오버튼그룹", "라디오"],
  skeleton: ["스켈레톤", "로딩"],
  slider: ["슬라이더"],
  spinner: ["스피너", "로딩"],
  stack: ["스택", "레이아웃"],
  sweetalert: ["스위트얼럿", "확인창"],
  switch: ["스위치", "토글"],
  tabletree: ["테이블트리", "트리", "테이블"],
  tabs: ["탭"],
  tagselect: ["태그셀렉트", "태그"],
  textarea: ["텍스트에어리어", "여러줄"],
  toast: ["토스트", "알림"],
  tooltip: ["툴팁", "말풍선"],
  treeview: ["트리뷰", "트리"],
  widget: ["위젯", "대시보드"]
};

/** Props 이름 상위 몇 개만 키워드로 얹는다 (인덱스 비대 방지) */
const PROP_KEYWORD_COUNT = 6;

const componentEntries: SearchEntry[] = COMPONENT_LIST.map(entry => ({
  type: "component",
  title: entry.name,
  desc: entry.desc,
  href: `/components/${entry.slug}`,
  keywords: [
    entry.slug,
    ...(COMPONENT_KO_ALIASES[entry.slug] ?? []),
    ...(GENERATED_PROPS[entry.slug] ?? []).slice(0, PROP_KEYWORD_COUNT).map(prop => prop.name)
  ]
}));

const FOUNDATION_KO_ALIASES: Record<string, readonly string[]> = {
  color: ["컬러", "색상", "팔레트"],
  typography: ["타이포그래피", "글꼴", "폰트"],
  spacing: ["스페이싱", "간격", "여백"],
  radius: ["라디우스", "라운드", "모서리"],
  shadow: ["섀도", "그림자"],
  theming: ["테마", "브랜드", "커스터마이징"]
};

const foundationEntries: SearchEntry[] = [
  {
    type: "foundation",
    title: "Color",
    desc: "LDS 색상 시스템 — 9개 팔레트와 시맨틱 컬러 역할",
    href: "/foundations/color",
    keywords: ["color", ...FOUNDATION_KO_ALIASES.color]
  },
  ...FOUNDATIONS.map(
    (entry): SearchEntry => ({
      type: "foundation",
      title: entry.name,
      desc: entry.desc,
      href: `/foundations/${entry.slug}`,
      keywords: [entry.slug, entry.token, ...(FOUNDATION_KO_ALIASES[entry.slug] ?? [])]
    })
  )
];

const PATTERN_KO_ALIASES: Record<string, readonly string[]> = {
  gnb: ["글로벌내비게이션", "내비게이션"],
  lnb: ["로컬내비게이션", "사이드바"],
  drawer: ["드로어", "패널"],
  comments: ["댓글", "멘션", "코멘트"],
  "table-tree": ["테이블트리", "트리", "계층"]
};

const patternEntries: SearchEntry[] = PATTERNS.map(entry => ({
  type: "pattern",
  title: entry.name,
  desc: entry.desc,
  href: `/patterns/${entry.slug}`,
  keywords: [entry.slug, ...(PATTERN_KO_ALIASES[entry.slug] ?? [])]
}));

const pageEntries: SearchEntry[] = [
  {
    type: "page",
    title: "Get Started",
    desc: "설치하고 감싸기만 하면 어느 화면이든 같은 언어로 이야기하기 시작해요.",
    href: "/get-started",
    keywords: ["시작하기", "설치", "install", "guide"]
  },
  {
    type: "page",
    title: "Foundations",
    desc: "색부터 그림자까지, 모든 화면이 딛고 서는 공통의 기반이에요.",
    href: "/foundations",
    keywords: ["파운데이션", "토큰", "token"]
  },
  {
    type: "page",
    title: "Components",
    desc: `LDS의 컴포넌트 ${COMPONENT_LIST.length}종을 둘러보세요.`,
    href: "/components",
    keywords: ["컴포넌트", "목록"]
  },
  {
    type: "page",
    title: "Patterns",
    desc: "법무 제품에서 반복되는 화면 구조를 패턴으로 정리했어요.",
    href: "/patterns",
    keywords: ["패턴", "화면 구조"]
  },
  {
    type: "page",
    title: "Develop",
    desc: "React 컴포넌트와 프레임워크 중립적인 토큰 패키지로 배포돼요.",
    href: "/develop",
    keywords: ["개발", "패키지", "npm", "llms"]
  },
  {
    type: "page",
    title: "Updates",
    desc: "LDS의 성장 기록이에요. 모든 릴리즈는 테스트와 접근성 게이트를 통과한 뒤에 나와요.",
    href: "/updates",
    keywords: ["업데이트", "릴리스", "체인지로그", "changelog", ...RELEASES.map(release => release.version)]
  }
];

export const SEARCH_INDEX: readonly SearchEntry[] = [
  ...componentEntries,
  ...foundationEntries,
  ...patternEntries,
  ...pageEntries
];
