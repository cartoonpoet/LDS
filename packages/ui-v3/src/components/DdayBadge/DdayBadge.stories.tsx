import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { DdayBadge } from ".";

/**
 * ## DdayBadge
 *
 * 기일·기한까지 남은 날짜를 자동 계산해 임박할수록 강하게 표시하는 뱃지입니다.
 * 목표 날짜만 넘기면 색은 컴포넌트가 정합니다.
 *
 * - D-DAY: danger 채움 / D-1~3: danger 아웃라인 / D-4~7: warning / D-8+: neutral / 지남: `D+n 경과`(dark)
 *
 * ### Import
 * ```tsx
 * import { DdayBadge } from "@lawkit/ui";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `date` | `Date \| string` | (필수) | 목표 날짜 (달력일 기준) |
 * | `today` | `Date \| string` | 현재 | 기준일 고정 (테스트/스토리용) |
 * | `...rest` | `HTMLAttributes<HTMLSpanElement>` | - | 네이티브 span 속성 전달 |
 */
const meta: Meta<typeof DdayBadge> = {
  title: "Components/DdayBadge",
  component: DdayBadge,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DdayBadge>;

const TODAY = "2026-09-12";

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `import { DdayBadge } from "@lawkit/ui";

// 목표 날짜만 넘기면 임박도별 색 자동
<DdayBadge date="2026-09-15" />

// 기일 리스트에서
<HStack gap="x3" align="center">
  <span>1차 변론기일 · 9. 15.(화) 10:00</span>
  <Spacer />
  <DdayBadge date="2026-09-15" />
</HStack>`,
      },
    },
  },
  render: () => <DdayBadge date="2026-09-15" today={TODAY} />,
};

export const LevelShowcase: Story = {
  name: "임박도 비교 (D-DAY ~ 경과)",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <DdayBadge date="2026-09-12" today={TODAY} />
      <DdayBadge date="2026-09-15" today={TODAY} />
      <DdayBadge date="2026-09-19" today={TODAY} />
      <DdayBadge date="2026-10-12" today={TODAY} />
      <DdayBadge date="2026-09-10" today={TODAY} />
    </div>
  ),
};

export const InList: Story = {
  name: "기일 리스트 예시",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420 }}>
      {[
        { label: "1차 변론기일 · 9. 15.(화) 10:00", date: "2026-09-15" },
        { label: "답변서 제출 기한 · 9. 19.(토)", date: "2026-09-19" },
        { label: "항소 기한 · 10. 12.(월)", date: "2026-10-12" },
      ].map((row) => (
        <div
          key={row.date}
          style={{ display: "flex", alignItems: "center", border: "1px solid #cfd5e1", borderRadius: 6, padding: "10px 14px", fontSize: 13 }}
        >
          <span>{row.label}</span>
          <span style={{ marginLeft: "auto" }}><DdayBadge date={row.date} today={TODAY} /></span>
        </div>
      ))}
    </div>
  ),
};
