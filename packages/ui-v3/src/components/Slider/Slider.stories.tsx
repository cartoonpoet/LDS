import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Slider, RangeSlider } from ".";

/**
 * **Slider** — 슬라이더 & 범위 슬라이더
 *
 * ### 사용법
 * ```tsx
 * import { Slider, RangeSlider } from "@lds/ui-v3";
 *
 * <Slider value={50} onChange={setValue} />
 * <RangeSlider value={[25, 75]} onChange={setRange} showTicks showLabels showValue />
 * ```
 */
const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 40, backgroundColor: "#f2f4f6", maxWidth: 560 }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Slider>;

/** 기본 슬라이더 */
export const Default: Story = {
  render: () => {
    const [v, setV] = useState(50);
    return (
      <div>
        <Slider value={v} onChange={setV} />
        <p style={{ marginTop: 12, fontSize: 13, color: "#626f86" }}>값: {v}</p>
      </div>
    );
  },
};

/** 값 배지 + 틱 + 라벨 */
export const ScaleAndPips: Story = {
  name: "Scale & Pips",
  render: () => {
    const [v, setV] = useState(50);
    return <Slider value={v} onChange={setV} showTicks showLabels showValue />;
  },
};

/** 듀얼 핸들 범위 슬라이더 */
export const Range: Story = {
  name: "Range Slider",
  render: () => {
    const [range, setRange] = useState<[number, number]>([25, 75]);
    return (
      <div>
        <RangeSlider value={range} onChange={setRange} showTicks />
        <p style={{ marginTop: 12, fontSize: 13, color: "#626f86" }}>
          범위: {range[0]} – {range[1]}
        </p>
      </div>
    );
  },
};

/** 범위 슬라이더 + 값 배지 + 라벨 */
export const RangeWithLabels: Story = {
  name: "Range with Labels & Value",
  render: () => {
    const [range, setRange] = useState<[number, number]>([25, 75]);
    return (
      <RangeSlider
        value={range}
        onChange={setRange}
        showTicks
        showLabels
        showValue
      />
    );
  },
};

/** Step 설정 */
export const StepBy10: Story = {
  name: "Step = 10",
  render: () => {
    const [v, setV] = useState(50);
    return (
      <Slider
        value={v}
        onChange={setV}
        step={10}
        showTicks
        showLabels
        showValue
      />
    );
  },
};

/** 비활성화 */
export const Disabled: Story = {
  render: () => <Slider value={50} disabled showTicks showLabels />,
};
