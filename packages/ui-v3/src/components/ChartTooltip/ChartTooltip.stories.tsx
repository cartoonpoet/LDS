import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { ChartTooltip } from ".";

/**
 * **ChartTooltip** — 차트 데이터 표시용 툴팁
 *
 * ### 사용법
 * ```tsx
 * import { ChartTooltip } from "@lds/ui-v3";
 *
 * // Default (헤더 + 컬러 dot)
 * <ChartTooltip
 *   header="12/12"
 *   items={[{ label: "Label :", value: 90, color: "#2151EC" }]}
 * />
 *
 * // Pie (파란 배경)
 * <ChartTooltip
 *   variant="pie"
 *   items={[{ label: "Label :", value: 90 }]}
 * />
 * ```
 */
const meta: Meta<typeof ChartTooltip> = {
  title: "Components/ChartTooltip",
  component: ChartTooltip,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 40, backgroundColor: "#f2f4f6" }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChartTooltip>;

/** Default — 흰 배경, 헤더 + dot */
export const Default: Story = {
  args: {
    variant: "default",
    header: "12/12",
    items: [{ label: "Label :", value: 90, color: "#2151EC" }],
  },
};

/** Pie — 파란 배경 */
export const Pie: Story = {
  args: {
    variant: "pie",
    items: [{ label: "Label :", value: 90 }],
  },
};

/** 여러 시리즈 */
export const MultiSeries: Story = {
  args: {
    variant: "default",
    header: "2023-06-15",
    items: [
      { label: "계약건수 :", value: 120, color: "#2151EC" },
      { label: "소송건수 :", value: 45, color: "#F04438" },
      { label: "자문건수 :", value: 78, color: "#12B76A" },
    ],
  },
};
