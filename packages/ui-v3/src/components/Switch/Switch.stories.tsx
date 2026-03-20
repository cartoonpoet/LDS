import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Switch } from ".";

/**
 * **Switch** — 토글 스위치
 *
 * ### 사용법
 * ```tsx
 * import { Switch } from "@lds/ui-v3";
 *
 * <Switch label="Label" checked={on} onCheckedChange={setOn} />
 * <Switch size="small" checked={on} onCheckedChange={setOn} />
 * ```
 */
const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium"] },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

/** Medium — Off */
export const MediumOff: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Switch checked={on} onCheckedChange={setOn} />;
  },
};

/** Medium — On */
export const MediumOn: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    return <Switch checked={on} onCheckedChange={setOn} />;
  },
};

/** Small */
export const Small: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Switch size="small" checked={on} onCheckedChange={setOn} />;
  },
};

/** 라벨 포함 */
export const WithLabel: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Switch label="Label" checked={on} onCheckedChange={setOn} />;
  },
};

/** Disabled */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch label="Disabled Off" disabled />
      <Switch label="Disabled On" checked disabled />
    </div>
  ),
};

/** 모든 변형 */
export const AllVariants: Story = {
  render: () => {
    const [states, setStates] = useState({ a: false, b: true, c: false, d: true });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Switch size="medium" label="Medium Off" checked={states.a} onCheckedChange={(v) => setStates((s) => ({ ...s, a: v }))} />
        <Switch size="medium" label="Medium On" checked={states.b} onCheckedChange={(v) => setStates((s) => ({ ...s, b: v }))} />
        <Switch size="small" label="Small Off" checked={states.c} onCheckedChange={(v) => setStates((s) => ({ ...s, c: v }))} />
        <Switch size="small" label="Small On" checked={states.d} onCheckedChange={(v) => setStates((s) => ({ ...s, d: v }))} />
        <Switch size="medium" label="Disabled Off" disabled />
        <Switch size="medium" label="Disabled On" checked disabled />
        <Switch size="small" label="Disabled Off (S)" disabled />
        <Switch size="small" label="Disabled On (S)" checked disabled />
      </div>
    );
  },
};
