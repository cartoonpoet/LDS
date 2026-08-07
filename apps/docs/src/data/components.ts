import { COMPONENT_LIST } from "./component-list";
import { COMPONENT_PREVIEWS } from "./component-previews";
import { COMPONENT_USAGE } from "./component-usage";
import { GENERATED_PROPS, type GeneratedProp } from "./component-props.generated";

export type PropRow = GeneratedProp;

export type ComponentEntry = {
  slug: string;
  name: string;
  desc: string;
  previewHtml: string;
  /** 실전 템플릿 코드 (raw TSX — 렌더 시 하이라이트) */
  usageCode: string;
  props: readonly PropRow[];
};

/** 추출 실패(빈 배열) 컴포넌트용 최소 표 */
const DEFAULT_PROPS: readonly PropRow[] = [
  { name: "className", type: "string", required: false, description: "추가 클래스" }
] as const;

/**
 * 생성 데이터 보강분 — 소스의 Props 타입에 리터럴 선언되지 않아
 * generate-component-props.mjs가 (의도적으로) 제외하는 DOM 상속 prop 중
 * 문서에 남길 가치가 있는 것만 수동 유지. 생성 행과 이름이 겹치면 생성 행이 이긴다.
 */
const EXTRA_PROPS: Record<string, readonly PropRow[]> = {
  button: [{ name: "disabled", type: "boolean", required: false, default: "false", description: "비활성화 여부 (네이티브)" }],
  input: [{ name: "placeholder", type: "string", required: false, description: "입력 힌트 (네이티브)" }],
  checkbox: [{ name: "disabled", type: "boolean", required: false, default: "false", description: "비활성화 여부 (네이티브)" }],
  switch: [{ name: "disabled", type: "boolean", required: false, default: "false", description: "비활성화 여부 (네이티브)" }]
};

/** 생성 데이터(소스 기준) + 보강분 병합 */
const resolveProps = (slug: string): readonly PropRow[] => {
  const generated = GENERATED_PROPS[slug] ?? [];
  const extras = (EXTRA_PROPS[slug] ?? []).filter(
    extra => !generated.some(row => row.name === extra.name)
  );
  const merged = [...generated, ...extras];
  return merged.length > 0 ? merged : DEFAULT_PROPS;
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
  props: resolveProps(entry.slug)
}));

export const findComponent = (slug: string) => COMPONENTS.find(entry => entry.slug === slug);
