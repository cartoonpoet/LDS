import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from ".";
import { lightThemeClass } from "@lds/tokens";

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1.5 6h13M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const sampleOptions = [
  { value: "option1", label: "지난 1년" },
  { value: "option2", label: "지난 3년" },
  { value: "option3", label: "지난 5년" },
  { value: "option4", label: "지난 7년" },
  { value: "option5", label: "지난 10년" },
  { value: "option6", label: "지난 15년" },
  { value: "option7", label: "직접 선택" },
];

const multiLevelOptions = [
  { value: "add", label: "결재자 추가", description: "문서에 결재자를 추가합니다." },
  { value: "approve", label: "결재하기", description: "선택한 문서를 결재합니다." },
  { value: "reject", label: "반려하기", description: "선택한 문서를 반려합니다." },
  { value: "delegate", label: "위임하기", description: "다른 결재자에게 위임합니다." },
];

const checkOptions = [
  { value: "sales", label: "영업팀" },
  { value: "marketing", label: "마케팅팀" },
  { value: "dev", label: "개발팀" },
  { value: "design", label: "디자인팀" },
  { value: "hr", label: "인사팀" },
  { value: "finance", label: "재무팀" },
];

/**
 * ## Dropdown
 *
 * 드롭다운 선택 컴포넌트. 클릭하면 옵션 패널이 열리고, 옵션을 선택할 수 있습니다.
 * 3가지 크기(small/medium/large), 단일 선택, 다중 선택(체크박스), Multi Level(설명 포함) 모드를 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { Dropdown } from "@lds/ui-v3";
 * import type { DropdownProps, DropdownOption, DropdownSize } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `size` | `"small" \| "medium" \| "large"` | `"medium"` | 트리거 버튼 크기 |
 * | `options` | `DropdownOption[]` | **필수** | 옵션 목록 `{ value, label, description?, disabled? }` |
 * | `value` | `string \| string[]` | - | 선택 값 (controlled) |
 * | `defaultValue` | `string \| string[]` | - | 초기 선택 값 (uncontrolled) |
 * | `onChange` | `(value: string \| string[]) => void` | - | 변경 핸들러 |
 * | `placeholder` | `string` | `"선택하세요"` | 미선택 시 표시 텍스트 |
 * | `icon` | `ReactNode` | - | 좌측 아이콘 |
 * | `multiple` | `boolean` | `false` | 다중 선택 (체크박스 모드) |
 * | `panelHeader` | `string` | - | 패널 헤더 텍스트 (Multi Check) |
 * | `disabled` | `boolean` | `false` | 비활성화 |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 *
 * ### DropdownOption
 * ```ts
 * interface DropdownOption {
 *   value: string;
 *   label: string;
 *   description?: string; // Multi Level 모드에서 설명 표시
 *   disabled?: boolean;
 * }
 * ```
 *
 * ### Template Code
 * ```tsx
 * // 기본 단일 선택
 * <Dropdown
 *   options={[
 *     { value: "1y", label: "지난 1년" },
 *     { value: "3y", label: "지난 3년" },
 *     { value: "5y", label: "지난 5년" },
 *   ]}
 *   placeholder="기간 선택"
 *   onChange={(val) => console.log(val)}
 * />
 *
 * // 크기 변형
 * <Dropdown size="small" options={options} placeholder="Small" />
 * <Dropdown size="medium" options={options} placeholder="Medium" />
 * <Dropdown size="large" options={options} placeholder="Large" />
 *
 * // 아이콘 포함
 * <Dropdown icon={<CalendarIcon />} options={options} placeholder="날짜 선택" />
 *
 * // Multi Level (설명 포함 옵션)
 * <Dropdown
 *   options={[
 *     { value: "add", label: "결재자 추가", description: "문서에 결재자를 추가합니다." },
 *     { value: "approve", label: "결재하기", description: "선택한 문서를 결재합니다." },
 *   ]}
 * />
 *
 * // Multi Check (다중 선택)
 * <Dropdown
 *   multiple
 *   panelHeader="부서 선택"
 *   options={[
 *     { value: "sales", label: "영업팀" },
 *     { value: "dev", label: "개발팀" },
 *   ]}
 *   onChange={(values) => console.log(values)}
 * />
 *
 * // Controlled
 * const [value, setValue] = useState("1y");
 * <Dropdown options={options} value={value} onChange={setValue} />
 *
 * // 비활성화
 * <Dropdown options={options} disabled />
 * ```
 */
const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6", minHeight: 350 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "트리거 버튼 크기",
    },
    multiple: { description: "다중 선택 (체크박스 모드)" },
    disabled: { description: "비활성화" },
    placeholder: { description: "미선택 시 표시 텍스트" },
    panelHeader: { description: "패널 헤더 텍스트 (Multi Check)" },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

/** 기본 — Medium 크기 */
export const Default: Story = {
  args: {
    size: "medium",
    options: sampleOptions,
    placeholder: "기간 선택",
  },
};

/** Small 크기 */
export const Small: Story = {
  args: {
    size: "small",
    options: sampleOptions,
    placeholder: "기간 선택",
  },
};

/** Large 크기 */
export const Large: Story = {
  args: {
    size: "large",
    options: sampleOptions,
    placeholder: "기간 선택",
  },
};

/** 좌측 아이콘 포함 */
export const WithIcon: Story = {
  args: {
    size: "medium",
    options: sampleOptions,
    placeholder: "날짜 선택",
    icon: <CalendarIcon />,
  },
};

/** 기본 선택 값 */
export const WithDefaultValue: Story = {
  args: {
    size: "medium",
    options: sampleOptions,
    defaultValue: "option2",
  },
};

/** 비활성화 */
export const Disabled: Story = {
  args: {
    size: "medium",
    options: sampleOptions,
    placeholder: "선택 불가",
    disabled: true,
  },
};

/** Multi Level — 설명 포함 옵션 */
export const MultiLevel: Story = {
  args: {
    size: "medium",
    options: multiLevelOptions,
    placeholder: "작업 선택",
  },
};

/** Multi Check — 다중 선택 (체크박스) */
export const MultiCheck: Story = {
  args: {
    multiple: true,
    panelHeader: "부서 선택",
    options: checkOptions,
    placeholder: "부서를 선택하세요",
  },
};

/** Multi Check — 기본 선택 값 */
export const MultiCheckWithDefault: Story = {
  args: {
    multiple: true,
    panelHeader: "부서 선택",
    options: checkOptions,
    defaultValue: ["sales", "dev"],
    placeholder: "부서를 선택하세요",
  },
};

/** Controlled 모드 (단일 선택) */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 256 }}>
        <Dropdown
          options={sampleOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
          placeholder="기간 선택"
        />
        <div style={{ fontSize: 13, color: "#626f86" }}>
          선택된 값: {value || "(없음)"}
        </div>
      </div>
    );
  },
};

/** Controlled 모드 (다중 선택) */
export const ControlledMultiple: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 256 }}>
        <Dropdown
          multiple
          panelHeader="부서 선택"
          options={checkOptions}
          value={values}
          onChange={(v) => setValues(v as string[])}
          placeholder="부서를 선택하세요"
        />
        <div style={{ fontSize: 13, color: "#626f86" }}>
          선택: {values.length > 0 ? values.join(", ") : "(없음)"}
        </div>
      </div>
    );
  },
};

/** 3가지 크기 비교 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 256 }}>
      <Dropdown size="small" options={sampleOptions} placeholder="Small" />
      <Dropdown size="medium" options={sampleOptions} placeholder="Medium" />
      <Dropdown size="large" options={sampleOptions} placeholder="Large" />
    </div>
  ),
};
