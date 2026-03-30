import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { NumberInput } from ".";

/**
 * **NumberInput** — 숫자 입력 스테퍼
 */
const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6" }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => {
    const [v, setV] = useState(50);
    return <NumberInput value={v} onChange={setV} />;
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { NumberInput } from "@lds/ui-v3";

const [count, setCount] = useState(50);

// 기본
<NumberInput value={count} onChange={setCount} />

// 사이즈
<NumberInput size="small" value={count} onChange={setCount} />
<NumberInput size="large" value={count} onChange={setCount} />

// Min / Max / Step
<NumberInput value={count} onChange={setCount} min={0} max={100} step={5} />

// 비활성화
<NumberInput value={50} disabled />
`,
      },
    },
  },
};

/** 기본 (Medium) */
export const Default: Story = {
  render: () => {
    const [v, setV] = useState(50);
    return <NumberInput value={v} onChange={setV} />;
  },
};

/** 사이즈 비교 */
export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState(50);
    const [b, setB] = useState(50);
    const [c, setC] = useState(50);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
        <NumberInput size="small" value={a} onChange={setA} />
        <NumberInput size="medium" value={b} onChange={setB} />
        <NumberInput size="large" value={c} onChange={setC} />
      </div>
    );
  },
};

/** Min / Max 제한 */
export const MinMax: Story = {
  name: "Min / Max",
  render: () => {
    const [v, setV] = useState(1);
    return (
      <div>
        <NumberInput value={v} onChange={setV} min={0} max={10} />
        <p style={{ marginTop: 12, fontSize: 13, color: "#626f86" }}>
          범위: 0 ~ 10
        </p>
      </div>
    );
  },
};

/** Step 단위 */
export const StepBy5: Story = {
  name: "Step = 5",
  render: () => {
    const [v, setV] = useState(50);
    return <NumberInput value={v} onChange={setV} step={5} min={0} max={100} />;
  },
};

/** 비활성화 */
export const Disabled: Story = {
  render: () => <NumberInput value={50} disabled />,
};
