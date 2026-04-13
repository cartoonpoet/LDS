import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AutoComplete } from ".";
import { lightThemeClass } from "@lds/tokens";

const meta: Meta<typeof AutoComplete> = {
  title: "Components/AutoComplete",
  component: AutoComplete,
  decorators: [
    (Story) => (
      <div className={lightThemeClass} style={{ padding: 24, maxWidth: 400, backgroundColor: "#f2f4f6" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof AutoComplete>;

const userOptions = [
  { value: "jhson1", label: "손준호 (jhson1)" },
  { value: "kim01", label: "김민수 (kim01)" },
  { value: "park22", label: "박서연 (park22)" },
  { value: "lee33", label: "이정우 (lee33)" },
  { value: "choi44", label: "최유진 (choi44)" },
  { value: "jung55", label: "정하나 (jung55)" },
  { value: "kang66", label: "강도현 (kang66)" },
  { value: "yoon77", label: "윤서현 (yoon77)" },
];

export const TemplateCode: Story = {
  name: "Template Code",
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState("");

const options = [
  { value: "jhson1", label: "손준호 (jhson1)" },
  { value: "kim01", label: "김민수 (kim01)" },
  { value: "park22", label: "박서연 (park22)" },
];

<AutoComplete
  options={options}
  value={value}
  onChange={(val) => setValue(val)}
  placeholder="이름 또는 ID로 검색"
/>`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState("");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="이름 또는 ID로 검색"
      />
    );
  },
};

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="이름 또는 ID로 검색"
      />
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState("jhson1");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="이름 또는 ID로 검색"
      />
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="검색..."
        inputSize="small"
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <AutoComplete
        options={userOptions}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="검색..."
        inputSize="large"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <AutoComplete
      options={userOptions}
      value="jhson1"
      placeholder="검색..."
      disabled
    />
  ),
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["jhson1"]);
    return (
      <AutoComplete
        options={userOptions}
        multiple
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="이름 또는 ID로 검색"
      />
    );
  },
};

export const MultipleEmpty: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <AutoComplete
        options={userOptions}
        multiple
        value={value}
        onChange={(val) => setValue(val as string[])}
        placeholder="참조수신자(비밀) 선택"
      />
    );
  },
};
