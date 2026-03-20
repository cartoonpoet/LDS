import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Collapse, CollapseGroup } from ".";
import { lightThemeClass } from "@lds/tokens";

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 0 1 8 4.5 3.5 3.5 0 0 1 13.5 7C13.5 10.5 8 14 8 14Z"
      stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
    />
  </svg>
);

/**
 * ## Collapse
 *
 * 접기/펼치기 패널 컴포넌트. 헤더 클릭으로 콘텐츠를 토글합니다.
 * 4가지 스타일 변형과 Controlled/Uncontrolled 모드를 지원하며, CollapseGroup으로 아코디언 배치가 가능합니다.
 *
 * ### Import
 * ```tsx
 * import { Collapse, CollapseGroup } from "@lds/ui-v3";
 * ```
 *
 * ### Props (Collapse)
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `variant` | `"default" \| "shadow" \| "border" \| "margin"` | `"default"` | 스타일 변형 |
 * | `header` | `ReactNode` | **필수** | 헤더 텍스트 |
 * | `action` | `ReactNode` | - | 우측 액션 아이콘 |
 * | `expanded` | `boolean` | - | 펼침 상태 (controlled) |
 * | `defaultExpanded` | `boolean` | `false` | 초기 펼침 상태 (uncontrolled) |
 * | `onToggle` | `(expanded: boolean) => void` | - | 토글 핸들러 |
 * | `children` | `ReactNode` | - | 콘텐츠 |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 *
 * ### Props (CollapseGroup)
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `variant` | `CollapseVariant` | `"default"` | 스타일 변형 (margin 시 gap 적용) |
 * | `children` | `ReactNode` | - | Collapse 컴포넌트들 |
 * | `className` | `string` | - | 추가 CSS 클래스 |
 *
 * ### Variant 스타일 설명
 * | Variant | 설명 |
 * |---------|------|
 * | `default` | 헤더 하단 border만 표시 |
 * | `shadow` | 펼침 시 box-shadow + borderRadius 4px |
 * | `border` | 전체 1px border |
 * | `margin` | 분리형 shadow + borderRadius 4px, 그룹 시 간격 |
 *
 * ### Template Code
 * ```tsx
 * // 기본 (Uncontrolled)
 * <Collapse header="헤더">
 *   <p>접기/펼치기 콘텐츠</p>
 * </Collapse>
 *
 * // 초기 펼침
 * <Collapse header="헤더" defaultExpanded>
 *   <p>처음부터 펼쳐진 콘텐츠</p>
 * </Collapse>
 *
 * // Controlled
 * const [open, setOpen] = useState(false);
 * <Collapse header="헤더" expanded={open} onToggle={setOpen}>
 *   <p>콘텐츠</p>
 * </Collapse>
 *
 * // 스타일 변형
 * <Collapse variant="shadow" header="Shadow 스타일">콘텐츠</Collapse>
 * <Collapse variant="border" header="Border 스타일">콘텐츠</Collapse>
 * <Collapse variant="margin" header="Margin 스타일">콘텐츠</Collapse>
 *
 * // 우측 액션 아이콘
 * <Collapse header="헤더" action={<HeartIcon />}>
 *   콘텐츠
 * </Collapse>
 *
 * // 그룹 (아코디언 배치)
 * <CollapseGroup variant="margin">
 *   <Collapse variant="margin" header="패널 1">내용 1</Collapse>
 *   <Collapse variant="margin" header="패널 2">내용 2</Collapse>
 *   <Collapse variant="margin" header="패널 3">내용 3</Collapse>
 * </CollapseGroup>
 * ```
 */
const meta: Meta<typeof Collapse> = {
  title: "Components/Collapse",
  component: Collapse,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6", maxWidth: 610 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "shadow", "border", "margin"],
      description: "스타일 변형. default=하단 border, shadow=그림자, border=전체 border, margin=분리형 shadow",
    },
    expanded: { description: "펼침 상태 (controlled 모드)" },
    defaultExpanded: { description: "초기 펼침 상태 (uncontrolled 모드)" },
    header: { description: "헤더 텍스트 (필수)" },
    children: { description: "콘텐츠" },
  },
};
export default meta;
type Story = StoryObj<typeof Collapse>;

/** Default — 하단 border 스타일 */
export const Default: Story = {
  args: {
    variant: "default",
    header: "헤더",
    action: <HeartIcon />,
    children: "내용",
    defaultExpanded: true,
  },
};

/** Default — 접힌 상태 */
export const DefaultCollapsed: Story = {
  args: {
    variant: "default",
    header: "헤더",
    action: <HeartIcon />,
    children: "내용",
  },
};

/** Shadow — 펼침 시 box-shadow */
export const Shadow: Story = {
  args: {
    variant: "shadow",
    header: "헤더",
    action: <HeartIcon />,
    children: "내용",
    defaultExpanded: true,
  },
};

/** Border — 전체 1px border */
export const Border: Story = {
  args: {
    variant: "border",
    header: "헤더",
    action: <HeartIcon />,
    children: "내용",
    defaultExpanded: true,
  },
};

/** Margin — 분리형 shadow */
export const Margin: Story = {
  args: {
    variant: "margin",
    header: "헤더",
    action: <HeartIcon />,
    children: "내용",
    defaultExpanded: true,
  },
};

/** 아이콘 없이 */
export const WithoutActionIcon: Story = {
  args: {
    variant: "margin",
    header: "헤더",
    children: "내용",
    defaultExpanded: true,
  },
};

/** Controlled 모드 */
export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button onClick={() => setExpanded(!expanded)} style={{ alignSelf: "start" }}>
          {expanded ? "접기" : "펼치기"}
        </button>
        <Collapse variant="border" header="Controlled" expanded={expanded} onToggle={setExpanded}>
          외부 상태로 제어되는 콘텐츠입니다.
        </Collapse>
      </div>
    );
  },
};

/** Default 그룹 */
export const GroupDefault: Story = {
  render: () => (
    <CollapseGroup variant="default">
      <Collapse variant="default" header="패널 1" action={<HeartIcon />}>패널 1 내용입니다.</Collapse>
      <Collapse variant="default" header="패널 2" action={<HeartIcon />}>패널 2 내용입니다.</Collapse>
      <Collapse variant="default" header="패널 3" action={<HeartIcon />}>패널 3 내용입니다.</Collapse>
    </CollapseGroup>
  ),
};

/** Border 그룹 */
export const GroupBorder: Story = {
  render: () => (
    <CollapseGroup variant="border">
      <Collapse variant="border" header="패널 1" action={<HeartIcon />}>패널 1 내용입니다.</Collapse>
      <Collapse variant="border" header="패널 2" action={<HeartIcon />}>패널 2 내용입니다.</Collapse>
      <Collapse variant="border" header="패널 3" action={<HeartIcon />}>패널 3 내용입니다.</Collapse>
    </CollapseGroup>
  ),
};

/** Margin 그룹 (간격 포함) */
export const GroupMargin: Story = {
  render: () => (
    <CollapseGroup variant="margin">
      <Collapse variant="margin" header="패널 1" action={<HeartIcon />} defaultExpanded>패널 1 내용입니다.</Collapse>
      <Collapse variant="margin" header="패널 2" action={<HeartIcon />}>패널 2 내용입니다.</Collapse>
      <Collapse variant="margin" header="패널 3">패널 3 (아이콘 없음) 내용입니다.</Collapse>
    </CollapseGroup>
  ),
};
