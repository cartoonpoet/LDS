import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { DdayBadge } from "../DdayBadge";
import { Timeline } from ".";

/**
 * ## Timeline
 *
 * 사건 진행 이력을 시간순으로 보여주는 세로 타임라인입니다.
 * 완료(done)·현재(current)·예정(upcoming) 상태를 점 모양으로 구분합니다.
 *
 * ### Import
 * ```tsx
 * import { Timeline } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `items` | `TimelineItem[]` | (필수) | `{ id, title, date?, description?, status? }` |
 * | `items[].status` | `"done" \| "current" \| "upcoming"` | `"done"` | 점 모양/강조 결정 |
 * | `...rest` | `HTMLAttributes<HTMLOListElement>` | - | 네이티브 ol 속성 전달 |
 */
const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Timeline>;

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { Timeline } from "@lds/ui-v3";

<Timeline
  items={[
    { id: "1", date: "2026. 6. 12.", title: "소장 접수", status: "done" },
    { id: "2", date: "2026. 7. 30.", title: "답변서 제출", description: "피고 대리인 김앤장", status: "done" },
    { id: "3", date: "2026. 9. 15.", title: "1차 변론기일", status: "current" },
    { id: "4", title: "2차 변론기일", status: "upcoming" },
  ]}
/>

// 제목에 커스텀 노드 (DdayBadge 조합)
{ id: "3", date: "2026. 9. 15.", status: "current",
  title: <>1차 변론기일 <DdayBadge date="2026-09-15" /></> }`,
      },
    },
  },
  render: () => (
    <Timeline
      items={[
        { id: "1", date: "2026. 6. 12.", title: "소장 접수", status: "done" },
        { id: "2", date: "2026. 7. 30.", title: "답변서 제출", description: "피고 대리인 김앤장", status: "done" },
        {
          id: "3",
          date: "2026. 9. 15. · 진행 예정",
          title: (
            <>
              1차 변론기일 <DdayBadge date="2026-09-15" today="2026-09-12" />
            </>
          ),
          status: "current",
        },
        { id: "4", date: "미정", title: "2차 변론기일", status: "upcoming" },
      ]}
    />
  ),
};

export const StatusShowcase: Story = {
  name: "상태 비교 (done/current/upcoming)",
  render: () => (
    <Timeline
      items={[
        { id: "1", date: "완료", title: "done — 파란 점", status: "done" },
        { id: "2", date: "현재", title: "current — 링 점 + 날짜 강조", status: "current" },
        { id: "3", date: "예정", title: "upcoming — 회색 점 + 흐린 제목", status: "upcoming" },
      ]}
    />
  ),
};
