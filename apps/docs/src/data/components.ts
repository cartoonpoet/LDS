import { COMPONENT_LIST } from "./component-list";
import { COMPONENT_PREVIEWS } from "./component-previews";

export type PropRow = readonly [name: string, type: string, defaultValue: string, description: string];

export type ComponentEntry = {
  slug: string;
  name: string;
  desc: string;
  previewHtml: string;
  usageHtml: string;
  props: readonly PropRow[];
};

const DEFAULT_PROPS: readonly PropRow[] = [
  ["size", '"sm" | "md" | "lg"', '"md"', "컴포넌트 크기"],
  ["disabled", "boolean", "false", "비활성화 여부"],
  ["className", "string", "—", "추가 클래스"]
] as const;

const RICH_PROPS: Record<string, readonly PropRow[]> = {
  button: [
    ["variant", '"solid" | "outline" | "ghost"', '"solid"', "시각적 위계"],
    ["size", '"sm" | "md" | "lg"', '"md"', "버튼 크기"],
    ["color", '"accent" | "neutral" | "danger"', '"accent"', "의미 색상"],
    ["disabled", "boolean", "false", "비활성화 여부"],
    ["iconLeft", "ReactNode", "—", "텍스트 앞 아이콘"],
    ["iconRight", "ReactNode", "—", "텍스트 뒤 아이콘"]
  ],
  input: [
    ["label", "string", "—", "필드 라벨"],
    ["placeholder", "string", "—", "입력 힌트"],
    ["error", "string", "—", "오류 메시지 (있으면 오류 상태)"],
    ["size", '"sm" | "md" | "lg"', '"md"', "필드 크기"],
    ["disabled", "boolean", "false", "비활성화 여부"]
  ],
  checkbox: [
    ["checked", "boolean", "—", "제어 값"],
    ["defaultChecked", "boolean", "false", "비제어 초기 값"],
    ["indeterminate", "boolean", "false", "부분 선택 상태"],
    ["disabled", "boolean", "false", "비활성화 여부"],
    ["onChange", "(checked: boolean) => void", "—", "변경 핸들러"]
  ],
  switch: [
    ["checked", "boolean", "—", "제어 값"],
    ["size", '"sm" | "md"', '"md"', "스위치 크기"],
    ["disabled", "boolean", "false", "비활성화 여부"],
    ["onChange", "(checked: boolean) => void", "—", "변경 핸들러"]
  ],
  tabs: [
    ["items", "TabItem[]", "—", "탭 목록"],
    ["value", "string", "—", "선택된 탭 키"],
    ["variant", '"underline" | "pill"', '"underline"', "탭 모양"],
    ["onChange", "(value: string) => void", "—", "변경 핸들러"]
  ],
  datatable: [
    ["columns", "Column&lt;T&gt;[]", "—", "컬럼 정의"],
    ["data", "T[]", "—", "행 데이터"],
    ["selectable", "boolean", "false", "행 선택 체크박스"],
    ["pagination", "boolean", "true", "페이지네이션 표시"],
    ["onRowClick", "(row: T) => void", "—", "행 클릭 핸들러"]
  ]
};

const BUTTON_PREVIEW = `<div class="btn-rows"><div class="btn-row"><button class="lds-btn md solid">계약 생성</button><button class="lds-btn md outline">임시 저장</button><button class="lds-btn md ghost">취소</button><button class="lds-btn md danger">삭제</button></div><div class="btn-row"><button class="lds-btn sm solid">Small</button><button class="lds-btn md solid">Medium</button><button class="lds-btn lg solid">Large</button></div><div class="btn-row"><button class="lds-btn md solid is-disabled">비활성</button><button class="lds-btn md outline is-disabled">비활성</button></div></div>`;

const BUTTON_USAGE = `<span class="tk-kw">import</span> { <span class="tk-fn">Button</span> } <span class="tk-kw">from</span> <span class="tk-str">"@lds/ui-v3"</span>;

&lt;<span class="tk-tag">Button</span> <span class="tk-attr">variant</span>=<span class="tk-str">"solid"</span> <span class="tk-attr">size</span>=<span class="tk-str">"md"</span>&gt;계약 생성&lt;/<span class="tk-tag">Button</span>&gt;
&lt;<span class="tk-tag">Button</span> <span class="tk-attr">variant</span>=<span class="tk-str">"outline"</span>&gt;취소&lt;/<span class="tk-tag">Button</span>&gt;`;

const defaultUsage = (name: string) =>
  `<span class="tk-kw">import</span> { <span class="tk-fn">${name}</span> } <span class="tk-kw">from</span> <span class="tk-str">"@lds/ui-v3"</span>;

&lt;<span class="tk-tag">${name}</span> /&gt;`;

export const COMPONENTS: ComponentEntry[] = COMPONENT_LIST.map(entry => ({
  slug: entry.slug,
  name: entry.name,
  desc: entry.desc,
  previewHtml: entry.slug === "button" ? BUTTON_PREVIEW : COMPONENT_PREVIEWS[entry.slug] ?? `<div class="p-generic">${entry.name}</div>`,
  usageHtml: entry.slug === "button" ? BUTTON_USAGE : defaultUsage(entry.name),
  props: RICH_PROPS[entry.slug] ?? DEFAULT_PROPS
}));

export const findComponent = (slug: string) => COMPONENTS.find(entry => entry.slug === slug);
