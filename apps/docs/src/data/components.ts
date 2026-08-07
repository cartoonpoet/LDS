import { COMPONENT_LIST } from "./component-list";
import { COMPONENT_PREVIEWS } from "./component-previews";
import { COMPONENT_USAGE } from "./component-usage";

export type PropRow = readonly [name: string, type: string, defaultValue: string, description: string];

export type ComponentEntry = {
  slug: string;
  name: string;
  desc: string;
  previewHtml: string;
  /** 실전 템플릿 코드 (raw TSX — 렌더 시 하이라이트) */
  usageCode: string;
  props: readonly PropRow[];
};

/** 공통 최소 표 — 컴포넌트별 실제 API는 Usage 템플릿 코드가 기준 */
const DEFAULT_PROPS: readonly PropRow[] = [["className", "string", "—", "추가 클래스"]] as const;

/** packages/ui-v3 실제 Props 인터페이스 기준 */
const RICH_PROPS: Record<string, readonly PropRow[]> = {
  button: [
    ["variant", '"default" | "outline"', '"default"', "버튼 스타일 변형"],
    ["color", '"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "neutral"', '"primary"', "색상 테마"],
    ["shape", '"rounded" | "round"', '"rounded"', "모양 (rounded: 5px / round: pill)"],
    ["size", '"small" | "medium" | "large"', '"medium"', "크기"],
    ["iconLeft", "ReactNode", "—", "좌측 아이콘"],
    ["iconRight", "ReactNode", "—", "우측 아이콘"],
    ["disabled", "boolean", "false", "비활성화 여부"]
  ],
  input: [
    ["inputSize", '"small" | "medium" | "large"', '"medium"', "사이즈 — 30 / 38 / 46px"],
    ["state", '"default" | "active" | "success" | "warning" | "disabled"', '"default"', "상태 (테두리 색 등)"],
    ["leftIcon", "ReactNode", "—", "왼쪽 아이콘"],
    ["rightIcon", "ReactNode", "—", "오른쪽 아이콘"],
    ["suffix", "ReactNode", "—", "오른쪽 접미사 (단위 텍스트, 드롭다운 등)"],
    ["placeholder", "string", "—", "입력 힌트 (네이티브)"]
  ],
  checkbox: [
    ["size", '"small" | "medium" | "large"', '"medium"', "사이즈 — 12 / 14 / 18px"],
    ["checked", "boolean", "false", "체크 상태"],
    ["label", "string", "—", "라벨 텍스트"],
    ["onCheckedChange", "(checked: boolean) => void", "—", "변경 핸들러"],
    ["disabled", "boolean", "false", "비활성화 여부 (네이티브)"]
  ],
  switch: [
    ["size", '"small" | "medium"', '"medium"', "사이즈 — 32×18 / 42×24"],
    ["checked", "boolean", "false", "체크 상태"],
    ["label", "string", "—", "왼쪽 라벨 텍스트"],
    ["onCheckedChange", "(checked: boolean) => void", "—", "변경 핸들러"],
    ["disabled", "boolean", "false", "비활성화 여부 (네이티브)"]
  ],
  tabs: [
    ["items", "TabItem[] — { value, label, badge? }", "—", "탭 목록"],
    ["value", "string", "—", "현재 활성화된 값"],
    ["onChange", "(value: string) => void", "—", "값 변경 핸들러"],
    ["size", '"large" | "medium"', '"large"', "크기"],
    ["action", "{ label, icon?, onClick? }", "—", "액션 버튼 (예: Add Tab)"]
  ],
  drawer: [
    ["open", "boolean", "—", "표시 여부"],
    ["onClose", "() => void", "—", "닫기 핸들러 (Escape, backdrop 클릭, close 버튼)"],
    ["side", '"right" | "left"', '"right"', "슬라이드 인 방향"],
    ["size", '"small" | "medium" | "large"', '"medium"', "너비 — 360 / 480 / 640px"],
    ["title", "ReactNode", "—", "헤더 타이틀 (간편 API)"],
    ["footer", "ReactNode", "—", "푸터 콘텐츠 (간편 API)"],
    ["backdrop", "boolean", "true", "dim 배경 + 클릭 닫기 + 스크롤락. false면 비차단"],
    ["closeOnEscape", "boolean", "true", "Escape 키 닫기"]
  ],
  tabletree: [
    ["columns", "TableTreeColumn[] — { key, header, width?, align? }", "—", "컬럼 정의"],
    ["rows", "TableTreeRow[] — { id, cells, children? }", "—", "계층 행 데이터"],
    ["defaultExpandedIds", "string[]", "[]", "초기 펼침 행 ID (uncontrolled)"],
    ["expandedIds", "string[]", "—", "펼침 행 ID (controlled)"],
    ["onExpandedChange", "(ids: string[]) => void", "—", "펼침 상태 변경 콜백"],
    ["onRowClick", "(row: TableTreeRow) => void", "—", "행 클릭 콜백"],
    ["selectedId", "string", "—", "선택된 행 ID"],
    ["bordered", "boolean", "false", "세로 구분선 표시"],
    ["indentSize", "number", "20", "깊이당 들여쓰기 px"],
    ["emptyText", "ReactNode", '"데이터가 없습니다."', "데이터 없을 때 표시 메시지"]
  ],
  datatable: [
    ["data", "T[]", "—", "테이블 데이터"],
    ["columns", "ColumnDef&lt;T&gt;[]", "—", "@tanstack/react-table 컬럼 정의"],
    ["selectable", "boolean", "false", "행 선택 체크박스 표시"],
    ["bordered", "boolean", "false", "세로 구분선 표시"],
    ["onRowClick", "(row: T) => void", "—", "행 클릭 콜백"],
    ["emptyText", "ReactNode", "—", "데이터 없을 때 표시 메시지"],
    ["getRowId", "(row: T) => string", "—", "행 고유 ID 반환 함수"]
  ]
};

const BUTTON_PREVIEW = `<div class="btn-rows"><div class="btn-row"><button class="lds-btn md solid">계약 생성</button><button class="lds-btn md outline">임시 저장</button><button class="lds-btn md ghost">취소</button><button class="lds-btn md danger">삭제</button></div><div class="btn-row"><button class="lds-btn sm solid">Small</button><button class="lds-btn md solid">Medium</button><button class="lds-btn lg solid">Large</button></div><div class="btn-row"><button class="lds-btn md solid is-disabled">비활성</button><button class="lds-btn md outline is-disabled">비활성</button></div></div>`;

const fallbackUsage = (name: string) => `import { ${name} } from "@lds/ui-v3";

<${name} />`;

export const COMPONENTS: ComponentEntry[] = COMPONENT_LIST.map(entry => ({
  slug: entry.slug,
  name: entry.name,
  desc: entry.desc,
  previewHtml:
    entry.slug === "button"
      ? BUTTON_PREVIEW
      : COMPONENT_PREVIEWS[entry.slug] ?? `<div class="p-generic">${entry.name}</div>`,
  usageCode: COMPONENT_USAGE[entry.slug] ?? fallbackUsage(entry.name),
  props: RICH_PROPS[entry.slug] ?? DEFAULT_PROPS
}));

export const findComponent = (slug: string) => COMPONENTS.find(entry => entry.slug === slug);
