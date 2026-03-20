import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";
import { lightThemeClass } from "@lds/tokens";

const PieChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.583 1.167v5.25h5.25A5.833 5.833 0 1 1 7.583 1.167Z" fill="currentColor" />
    <path d="M8.75.583v5.25H14A5.833 5.833 0 0 0 8.75.583Z" fill="currentColor" />
  </svg>
);

/**
 * ## Button
 *
 * 범용 버튼 컴포넌트. Solid / Outline 스타일, 8가지 색상, Rounded / Round 모양을 지원합니다.
 *
 * ### Import
 * ```tsx
 * import { Button } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `variant` | `"default" \| "outline"` | `"default"` | 버튼 스타일. default=Solid 채움, outline=테두리만 |
 * | `color` | `"primary" \| "secondary" \| "success" \| "danger" \| "warning" \| "info" \| "dark" \| "neutral"` | `"primary"` | 색상 테마 |
 * | `shape` | `"rounded" \| "round"` | `"rounded"` | 모양. rounded=5px, round=pill(9999px) |
 * | `size` | `"small" \| "medium" \| "large"` | `"medium"` | 크기 (30px / 38px / 46px) |
 * | `iconLeft` | `ReactNode` | - | 좌측 아이콘 |
 * | `iconRight` | `ReactNode` | - | 우측 아이콘 |
 * | `disabled` | `boolean` | `false` | 비활성화 |
 * | `children` | `ReactNode` | - | 버튼 텍스트 |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 * | `...rest` | `ButtonHTMLAttributes` | - | 네이티브 button 속성 전달 |
 *
 * ### Template Code
 * ```tsx
 * // 기본 버튼
 * <Button>확인</Button>
 *
 * // Outline 버튼
 * <Button variant="outline">취소</Button>
 *
 * // 색상 변경
 * <Button color="danger">삭제</Button>
 * <Button variant="outline" color="secondary">보류</Button>
 *
 * // 크기 변경
 * <Button size="small">작은 버튼</Button>
 * <Button size="large">큰 버튼</Button>
 *
 * // 아이콘 포함
 * <Button iconLeft={<MyIcon />}>아이콘 버튼</Button>
 * <Button iconRight={<ArrowIcon />}>다음</Button>
 *
 * // Pill 모양
 * <Button shape="round">라운드</Button>
 *
 * // 비활성화
 * <Button disabled>비활성화</Button>
 *
 * // 이벤트 핸들러
 * <Button onClick={handleSubmit}>제출</Button>
 * ```
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "버튼 스타일. default=Solid 채움, outline=테두리만",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "neutral"],
      description: "색상 테마. 8가지 시맨틱 컬러 지원",
    },
    shape: {
      control: "select",
      options: ["rounded", "round"],
      description: "모양. rounded=borderRadius 5px, round=pill 형태",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "크기. small=30px, medium=38px, large=46px",
    },
    disabled: { description: "비활성화 상태" },
    children: { description: "버튼 텍스트" },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "버튼" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "버튼" },
};

export const Rounded: Story = {
  args: { shape: "rounded", children: "버튼" },
};

export const Round: Story = {
  args: { shape: "round", children: "버튼" },
};

export const Small: Story = {
  args: { size: "small", children: "버튼" },
};

export const Large: Story = {
  args: { size: "large", children: "버튼" },
};

export const WithIconLeft: Story = {
  args: { iconLeft: <PieChartIcon />, children: "버튼" },
};

export const WithIconRight: Story = {
  args: { iconRight: <PieChartIcon />, children: "버튼" },
};

export const WithBothIcons: Story = {
  args: { iconLeft: <PieChartIcon />, iconRight: <PieChartIcon />, children: "버튼" },
};

export const DisabledDefault: Story = {
  args: { disabled: true, children: "버튼" },
};

export const DisabledOutline: Story = {
  args: { variant: "outline", disabled: true, children: "버튼" },
};

/** 모든 Solid 색상 */
export const AllSolidColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(["primary", "secondary", "success", "danger", "warning", "info", "dark", "neutral"] as const).map(
        (color) => <Button key={color} color={color}>{color}</Button>,
      )}
    </div>
  ),
};

/** 모든 Outline 색상 */
export const AllOutlineColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(["primary", "secondary", "success", "danger", "warning", "info", "dark", "neutral"] as const).map(
        (color) => <Button key={color} variant="outline" color={color}>{color}</Button>,
      )}
    </div>
  ),
};

export const OutlineRoundWithIcon: Story = {
  args: {
    variant: "outline",
    shape: "round",
    iconRight: <PieChartIcon />,
    children: "버튼",
  },
};
