import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButtonGroup } from ".";
import { lightThemeClass } from "@lds/tokens";

const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="3" width="15" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1.5 7.5h15" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="1.5" y="10.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10.5" y="10.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * ## IconButtonGroup
 *
 * 아이콘 전용 버튼 그룹. 뷰 모드 전환(카드/그리드/리스트) 등에 사용합니다.
 * 각 버튼은 38x38 정사각형이며 아이콘만 표시됩니다.
 *
 * ### Import
 * ```tsx
 * import { IconButtonGroup } from "@lds/ui-v3";
 * import type { IconButtonGroupItem } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `IconButtonGroupItem[]` | **필수** | 버튼 아이템 목록 `{ value, icon, "aria-label" }` |
 * | `value` | `string` | - | 현재 선택된 값 |
 * | `onChange` | `(value: string) => void` | - | 선택 변경 핸들러 |
 * | `variant` | `"fill" \| "outline"` | `"fill"` | 스타일. fill=Solid, outline=테두리 |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 *
 * ### IconButtonGroupItem
 * ```ts
 * interface IconButtonGroupItem {
 *   value: string;        // 고유 식별 값
 *   icon: ReactNode;      // 아이콘 (필수)
 *   "aria-label": string; // 접근성 라벨 (필수)
 * }
 * ```
 *
 * ### Template Code
 * ```tsx
 * const [view, setView] = useState("card");
 *
 * <IconButtonGroup
 *   items={[
 *     { value: "card", icon: <CardIcon />, "aria-label": "카드 보기" },
 *     { value: "grid", icon: <GridIcon />, "aria-label": "그리드 보기" },
 *     { value: "list", icon: <MenuIcon />, "aria-label": "리스트 보기" },
 *   ]}
 *   value={view}
 *   onChange={setView}
 *   variant="fill"
 * />
 * ```
 */
const meta: Meta<typeof IconButtonGroup> = {
  title: "Components/IconButtonGroup",
  component: IconButtonGroup,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["fill", "outline"],
      description: "스타일. fill=Solid 채움, outline=테두리",
    },
  },
};
export default meta;
type Story = StoryObj<typeof IconButtonGroup>;

const items = [
  { value: "card", icon: <CardIcon />, "aria-label": "카드 보기" as const },
  { value: "grid", icon: <GridIcon />, "aria-label": "그리드 보기" as const },
  { value: "menu", icon: <MenuIcon />, "aria-label": "리스트 보기" as const },
];

export const Fill: Story = {
  args: { items, value: "card", variant: "fill" },
};

export const Outline: Story = {
  args: { items, value: "menu", variant: "outline" },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("card");
    return (
      <div style={{ display: "flex", gap: 16 }}>
        <IconButtonGroup items={items} value={value} onChange={setValue} variant="fill" />
        <IconButtonGroup items={items} value={value} onChange={setValue} variant="outline" />
      </div>
    );
  },
};
