import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from ".";
import { lightThemeClass } from "@lds/tokens";

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 0.333C3.32 0.333 0.333 3.32 0.333 7S3.32 13.667 7 13.667 13.667 10.68 13.667 7 10.68 0.333 7 0.333Zm0.667 10H6.333V6.333h1.334v4Zm0-5.333H6.333V3.667h1.334V5Z"
      fill="currentColor"
    />
  </svg>
);

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["fill", "outline"] },
    size: { control: "select", options: ["small", "medium"] },
  },
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

const defaultItems = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

/* ─── Fill (Solid) ─── */
export const Fill: Story = {
  args: {
    items: defaultItems,
    value: "left",
    variant: "fill",
  },
};

/* ─── Outline ─── */
export const Outline: Story = {
  args: {
    items: defaultItems,
    value: "left",
    variant: "outline",
  },
};

/* ─── Small ─── */
export const Small: Story = {
  args: {
    items: defaultItems,
    value: "left",
    size: "small",
  },
};

/* ─── Small Outline ─── */
export const SmallOutline: Story = {
  args: {
    items: defaultItems,
    value: "left",
    variant: "outline",
    size: "small",
  },
};

/* ─── With Icons ─── */
export const WithIcons: Story = {
  args: {
    items: [
      { value: "left", label: "Left", icon: <InfoIcon /> },
      { value: "center", label: "Center", icon: <InfoIcon /> },
      { value: "right", label: "Right", icon: <InfoIcon /> },
    ],
    value: "left",
    variant: "fill",
  },
};

/* ─── With Icons Outline ─── */
export const WithIconsOutline: Story = {
  args: {
    items: [
      { value: "left", label: "Left", icon: <InfoIcon /> },
      { value: "center", label: "Center", icon: <InfoIcon /> },
      { value: "right", label: "Right", icon: <InfoIcon /> },
    ],
    value: "left",
    variant: "outline",
  },
};

/* ─── Interactive ─── */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("left");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ButtonGroup
          items={defaultItems}
          value={value}
          onChange={setValue}
          variant="fill"
        />
        <ButtonGroup
          items={defaultItems}
          value={value}
          onChange={setValue}
          variant="outline"
        />
        <p style={{ margin: 0 }}>Selected: <strong>{value}</strong></p>
      </div>
    );
  },
};
