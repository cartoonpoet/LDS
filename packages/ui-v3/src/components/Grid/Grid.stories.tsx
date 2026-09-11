import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Grid } from ".";

/**
 * ## Grid
 *
 * 동일 폭 컬럼 격자입니다. 카드 목록·통계 카드·폼 2단 배치처럼
 * "N개씩 줄바꿈"이 필요한 곳에 씁니다.
 *
 * ### Import
 * ```tsx
 * import { Grid } from "@lds/ui-v3";
 * ```
 *
 * ### Props
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `columns` | `number` | `1` | 컬럼 수 — repeat(N, minmax(0, 1fr)) |
 * | `gap` | `"x1" \| ... \| "x6"` | - | 행/열 공통 간격 토큰 |
 * | `rowGap` / `columnGap` | `"x1" \| ... \| "x6"` | - | 축별 간격 (gap보다 우선) |
 * | `...rest` | `HTMLAttributes<HTMLDivElement>` | - | 네이티브 div 속성 전달 |
 */
const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    columns: { control: { type: "number", min: 1, max: 6 } },
    gap: { control: "select", options: ["x1", "x2", "x3", "x4", "x5", "x6"] },
  },
};
export default meta;
type Story = StoryObj<typeof Grid>;

const Cell = ({ children }: { children?: ReactNode }) => (
  <div style={{ padding: "12px", background: "#e0e7ff", borderRadius: 4, textAlign: "center" }}>
    {children}
  </div>
);

export const TemplateCode: Story = {
  name: "Template Code",
  args: { columns: 3, gap: "x3" },
  parameters: {
    docs: {
      source: {
        code: `import { Grid } from "@lds/ui-v3";

// 통계 카드 3열
<Grid columns={3} gap="x3">
  <Card>진행 중 사건 24</Card>
  <Card>이번 주 기일 6</Card>
  <Card>답변 기한 임박 3</Card>
</Grid>

// 폼 2단 배치 (행/열 간격 다르게)
<Grid columns={2} rowGap="x4" columnGap="x6">
  <Input label="사건번호" />
  <Input label="사건명" />
  <Input label="재판부" />
  <Input label="담당 변호사" />
</Grid>`,
      },
    },
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => <Cell key={i}>{i + 1}</Cell>)}
    </Grid>
  ),
};

export const ColumnsShowcase: Story = {
  name: "컬럼 수 비교 (2/3/4)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {[2, 3, 4].map((n) => (
        <div key={n}>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>columns={n}</div>
          <Grid columns={n} gap="x2">
            {Array.from({ length: n * 2 }, (_, i) => <Cell key={i}>{i + 1}</Cell>)}
          </Grid>
        </div>
      ))}
    </div>
  ),
};
