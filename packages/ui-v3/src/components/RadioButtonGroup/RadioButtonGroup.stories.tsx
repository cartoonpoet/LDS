import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioButtonGroup } from ".";
import { lightThemeClass } from "@lds/tokens";

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 0.333C3.32 0.333 0.333 3.32 0.333 7S3.32 13.667 7 13.667 13.667 10.68 13.667 7 10.68 0.333 7 0.333Zm0.667 10H6.333V6.333h1.334v4Zm0-5.333H6.333V3.667h1.334V5Z"
      fill="currentColor"
    />
  </svg>
);

const meta: Meta<typeof RadioButtonGroup> = {
  title: "Components/RadioButtonGroup",
  component: RadioButtonGroup,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "크기. small=31px, medium=38px",
    },
    fullWidth: {
      control: "boolean",
      description: "컨테이너 너비 100%, 아이템 flex:1",
    },
    gap: {
      control: "number",
      description: "아이템 간 간격 (px)",
    },
  },
};
export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

const defaultItems = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

export const Default: Story = {
  args: { items: defaultItems, value: "left" },
};

export const WithGap: Story = {
  args: { items: defaultItems, value: "left", gap: 8 },
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <RadioButtonGroup items={defaultItems} value="left" fullWidth gap={8} />
    </div>
  ),
};

export const Small: Story = {
  args: { items: defaultItems, value: "left", size: "small" },
};

export const WithIcons: Story = {
  args: {
    items: [
      { value: "left", label: "Left", icon: <InfoIcon /> },
      { value: "center", label: "Center", icon: <InfoIcon /> },
      { value: "right", label: "Right", icon: <InfoIcon /> },
    ],
    value: "left",
    gap: 8,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("left");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <RadioButtonGroup items={defaultItems} value={value} onChange={setValue} gap={8} />
        <p style={{ margin: 0 }}>Selected: <strong>{value}</strong></p>
      </div>
    );
  },
};
