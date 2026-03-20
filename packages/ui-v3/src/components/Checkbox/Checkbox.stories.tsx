import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Checkbox } from ".";

/**
 * **Checkbox** — 체크박스 폼 컨트롤
 *
 * ### 사용법
 * ```tsx
 * import { Checkbox } from "@lds/ui-v3";
 *
 * <Checkbox label="동의합니다" checked={agreed} onCheckedChange={setAgreed} />
 * <Checkbox size="small" label="소형" />
 * <Checkbox size="large" label="대형" disabled />
 * ```
 */
const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
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
type Story = StoryObj<typeof Checkbox>;

/** 기본 (Medium) */
export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox label="Label" checked={checked} onCheckedChange={setChecked} />;
  },
};

/** 사이즈 비교 */
export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(true);
    const [c, setC] = useState(true);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Checkbox size="small" label="Small (12px)" checked={a} onCheckedChange={setA} />
        <Checkbox size="medium" label="Medium (14px)" checked={b} onCheckedChange={setB} />
        <Checkbox size="large" label="Large (18px)" checked={c} onCheckedChange={setC} />
      </div>
    );
  },
};

/** 상태 매트릭스 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "16px 32px", alignItems: "center" }}>
      <Checkbox size="small" label="Unchecked" />
      <Checkbox size="medium" label="Unchecked" />
      <Checkbox size="large" label="Unchecked" />
      <Checkbox size="small" label="Checked" checked />
      <Checkbox size="medium" label="Checked" checked />
      <Checkbox size="large" label="Checked" checked />
      <Checkbox size="small" label="Disabled" disabled />
      <Checkbox size="medium" label="Disabled" disabled />
      <Checkbox size="large" label="Disabled" disabled />
      <Checkbox size="small" label="Disabled Checked" checked disabled />
      <Checkbox size="medium" label="Disabled Checked" checked disabled />
      <Checkbox size="large" label="Disabled Checked" checked disabled />
    </div>
  ),
};

/** 라벨 없음 */
export const NoLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox checked={checked} onCheckedChange={setChecked} />;
  },
};
