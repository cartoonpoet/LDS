import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Radio, RadioGroup } from ".";

/**
 * **Radio** — 라디오 버튼 + RadioGroup
 */
const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
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
    variant: { control: "select", options: ["basic", "customized"] },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const TemplateCode: Story = {
  name: "Template Code",
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <RadioGroup value={value} onChange={setValue}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" />
      </RadioGroup>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import { useState } from "react";
import { Radio, RadioGroup } from "@lds/ui-v3";

const [selected, setSelected] = useState("a");

// Basic
<RadioGroup value={selected} onChange={setSelected}>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
  <Radio value="c" label="Option C" />
</RadioGroup>

// Customized 변형 (테두리 스타일)
<RadioGroup variant="customized" value={selected} onChange={setSelected}>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>

// 수직 정렬
<RadioGroup value={selected} onChange={setSelected} vertical>
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>

// 사이즈
<RadioGroup size="small" value={selected} onChange={setSelected}>
  <Radio value="a" label="Small A" />
  <Radio value="b" label="Small B" />
</RadioGroup>
`,
      },
    },
  },
};

/** RadioGroup — Basic */
export const BasicGroup: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <RadioGroup value={value} onChange={setValue}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" />
      </RadioGroup>
    );
  },
};

/** RadioGroup — Customized */
export const CustomizedGroup: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <RadioGroup variant="customized" value={value} onChange={setValue}>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" />
      </RadioGroup>
    );
  },
};

/** 수직 정렬 */
export const Vertical: Story = {
  render: () => {
    const [value, setValue] = useState("a");
    return (
      <RadioGroup value={value} onChange={setValue} vertical>
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
        <Radio value="c" label="Option C" />
      </RadioGroup>
    );
  },
};

/** 사이즈 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <RadioGroup size="small" value="a" onChange={() => {}}>
        <Radio value="a" label="Small Checked" />
        <Radio value="b" label="Small" />
      </RadioGroup>
      <RadioGroup size="medium" value="a" onChange={() => {}}>
        <Radio value="a" label="Medium Checked" />
        <Radio value="b" label="Medium" />
      </RadioGroup>
      <RadioGroup size="large" value="a" onChange={() => {}}>
        <Radio value="a" label="Large Checked" />
        <Radio value="b" label="Large" />
      </RadioGroup>
    </div>
  ),
};

/** 상태 매트릭스 — Basic */
export const AllStatesBasic: Story = {
  name: "All States (Basic)",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "16px 32px", alignItems: "center" }}>
      <Radio size="small" variant="basic" label="Unchecked" />
      <Radio size="medium" variant="basic" label="Unchecked" />
      <Radio size="large" variant="basic" label="Unchecked" />
      <Radio size="small" variant="basic" label="Checked" checked />
      <Radio size="medium" variant="basic" label="Checked" checked />
      <Radio size="large" variant="basic" label="Checked" checked />
      <Radio size="small" variant="basic" label="Disabled" disabled />
      <Radio size="medium" variant="basic" label="Disabled" disabled />
      <Radio size="large" variant="basic" label="Disabled" disabled />
      <Radio size="small" variant="basic" label="Disabled Checked" checked disabled />
      <Radio size="medium" variant="basic" label="Disabled Checked" checked disabled />
      <Radio size="large" variant="basic" label="Disabled Checked" checked disabled />
    </div>
  ),
};

/** 상태 매트릭스 — Customized */
export const AllStatesCustomized: Story = {
  name: "All States (Customized)",
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "16px 32px", alignItems: "center" }}>
      <Radio size="small" variant="customized" label="Unchecked" />
      <Radio size="medium" variant="customized" label="Unchecked" />
      <Radio size="large" variant="customized" label="Unchecked" />
      <Radio size="small" variant="customized" label="Checked" checked />
      <Radio size="medium" variant="customized" label="Checked" checked />
      <Radio size="large" variant="customized" label="Checked" checked />
      <Radio size="small" variant="customized" label="Disabled" disabled />
      <Radio size="medium" variant="customized" label="Disabled" disabled />
      <Radio size="large" variant="customized" label="Disabled" disabled />
      <Radio size="small" variant="customized" label="Disabled Checked" checked disabled />
      <Radio size="medium" variant="customized" label="Disabled Checked" checked disabled />
      <Radio size="large" variant="customized" label="Disabled Checked" checked disabled />
    </div>
  ),
};
