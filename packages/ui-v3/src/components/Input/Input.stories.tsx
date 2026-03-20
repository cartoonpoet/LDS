import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Input, InputGroup, MultiSelect } from ".";
import type { MultiSelectItem } from ".";

/**
 * **Input** — 텍스트 입력 필드 + InputGroup + MultiSelect
 *
 * ### 사용법
 * ```tsx
 * import { Input, InputGroup, MultiSelect } from "@lds/ui-v3";
 *
 * // 기본
 * <Input placeholder="이메일 입력" />
 *
 * // InputGroup (라벨 + 도움말)
 * <InputGroup label="Email" required helperText="유효한 이메일을 입력하세요">
 *   <Input placeholder="email@example.com" />
 * </InputGroup>
 *
 * // MultiSelect
 * <MultiSelect
 *   value={[{ key: "1", label: "User1" }]}
 *   onRemove={(key) => {}}
 * />
 * ```
 */
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6", maxWidth: 400 }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    inputSize: { control: "select", options: ["small", "medium", "large"] },
    state: { control: "select", options: ["default", "active", "success", "warning", "disabled"] },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/* ─── Search Icon ─── */
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="m9.5 9.5 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/** 기본 (Medium) */
export const Default: Story = {
  args: {
    placeholder: "Placeholder",
    inputSize: "medium",
  },
};

/** 사이즈 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Input placeholder="Small" inputSize="small" />
      <Input placeholder="Medium" inputSize="medium" />
      <Input placeholder="Large" inputSize="large" />
    </div>
  ),
};

/** 왼쪽 아이콘 */
export const WithLeftIcon: Story = {
  args: {
    placeholder: "Placeholder",
    leftIcon: <SearchIcon />,
  },
};

/** 접미사 (단위) */
export const WithSuffix: Story = {
  args: {
    placeholder: "Placeholder",
    leftIcon: <SearchIcon />,
    suffix: <span>Option ▾</span>,
  },
};

/** 상태 변형 */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <InputGroup label="Label" required caption="Caption Text" helperText="Caption text, description, error notification" state="default">
        <Input placeholder="Placeholder" leftIcon={<SearchIcon />} />
      </InputGroup>
      <InputGroup label="Label" required caption="Caption Text" helperText="Caption text, description, error notification" state="active">
        <Input placeholder="Placeholder" state="active" defaultValue="Input" />
      </InputGroup>
      <InputGroup label="Label" required caption="Caption Text" helperText="Success !" state="success">
        <Input placeholder="Placeholder" state="success" defaultValue="lawai@example.co.kr" />
      </InputGroup>
      <InputGroup label="Label" required caption="Caption Text" helperText="Please provide a valid state" state="warning">
        <Input placeholder="Placeholder" state="warning" />
      </InputGroup>
      <InputGroup label="Label" required caption="Caption Text" state="disabled">
        <Input placeholder="Placeholder" disabled />
      </InputGroup>
    </div>
  ),
};

/** MultiSelect — 기본 */
export const MultiSelectDefault: Story = {
  render: () => {
    const [items, setItems] = useState<MultiSelectItem[]>([
      { key: "1", label: "User Name1" },
      { key: "2", label: "User Name2(Team/ User ID)" },
    ]);
    return (
      <MultiSelect
        value={items}
        onRemove={(key) => setItems((prev) => prev.filter((i) => i.key !== key))}
        placeholder="검색..."
      />
    );
  },
};

/** MultiSelect — 확장 (많은 뱃지) */
export const MultiSelectExpanded: Story = {
  render: () => {
    const [items, setItems] = useState<MultiSelectItem[]>([
      { key: "1", label: "User Name1" },
      { key: "2", label: "User Name2(Team/UserID)" },
      { key: "3", label: "User Name3(Team/ UserID)" },
      { key: "4", label: "User Name4(UserID)" },
    ]);
    return (
      <MultiSelect
        value={items}
        onRemove={(key) => setItems((prev) => prev.filter((i) => i.key !== key))}
        placeholder="검색..."
      />
    );
  },
};
