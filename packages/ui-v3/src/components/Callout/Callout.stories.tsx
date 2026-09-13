import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Callout } from ".";

/**
 * ## Callout
 *
 * 본문 흐름 속에 상시 표시되는 정적 안내 블록입니다.
 * 닫기 버튼·액션이 있는 Alert와 달리 문서의 일부로 남습니다.
 *
 * ### Import
 * ```tsx
 * import { Callout } from "@lawkit/ui";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `intent` | `"info" \| "success" \| "warning" \| "danger"` | `"info"` | 의도 색 |
 * | `title` | `ReactNode` | - | 굵은 제목 줄 |
 * | `icon` | `ReactNode` | intent별 글리프 | 아이콘 교체 |
 * | `hideIcon` | `boolean` | `false` | 아이콘 숨김 |
 * | `children` | `ReactNode` | - | 본문 |
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 */
const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    intent: { control: "select", options: ["info", "success", "warning", "danger"] },
  },
};
export default meta;
type Story = StoryObj<typeof Callout>;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { Callout } from "@lawkit/ui";

// 기본 (info)
<Callout>
  이 계약에는 <b>자동 갱신 조항</b>이 포함되어 있어요. 해지 의사는 만료 30일 전까지 통지해야 해요.
</Callout>

// 제목 + 경고
<Callout intent="warning" title="기한 임박">
  답변서 제출 기한이 5일 남았어요.
</Callout>

// 아이콘 없이
<Callout hideIcon intent="danger">
  반려된 결재는 수정 후 재상신해야 해요.
</Callout>`,
      },
    },
  },
  render: () => (
    <Callout>
      이 계약에는 <b>자동 갱신 조항</b>이 포함되어 있어요. 해지 의사는 만료 30일 전까지 통지해야
      해요.
    </Callout>
  ),
};

export const IntentShowcase: Story = {
  name: "Intent 비교",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Callout intent="info">계약 검토가 진행 중이에요.</Callout>
      <Callout intent="success">전자서명이 완료됐어요.</Callout>
      <Callout intent="warning" title="기한 임박">답변서 제출 기한이 5일 남았어요.</Callout>
      <Callout intent="danger" title="반려됨">계약 기간 조항 수정 후 재상신해야 해요.</Callout>
    </div>
  ),
};
