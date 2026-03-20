import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from ".";
import { lightThemeClass } from "@lds/tokens";

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2.667v10.666M2.667 8h10.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  decorators: [(Story) => <div className={lightThemeClass} style={{ width: "100%" }}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["large", "medium"] },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const basicItems = [
  { value: "tab1", label: "Tab 1" },
  { value: "tab2", label: "Tab 2" },
  { value: "tab3", label: "Tab 3" },
  { value: "tab4", label: "Tab 4" },
];

const badgeItems = [
  { value: "tab1", label: "Tab 1", badge: 12 },
  { value: "tab2", label: "Tab 2", badge: 9 },
  { value: "tab3", label: "Tab 3", badge: 7 },
  { value: "tab4", label: "Tab 4", badge: 3 },
];

/* ─── Basic Large ─── */
export const BasicLarge: Story = {
  args: { items: basicItems, value: "tab1", size: "large" },
};

/* ─── Basic Medium ─── */
export const BasicMedium: Story = {
  args: { items: basicItems, value: "tab1", size: "medium" },
};

/* ─── With Badge Large ─── */
export const BadgeLarge: Story = {
  args: { items: badgeItems, value: "tab1", size: "large" },
};

/* ─── With Badge Medium ─── */
export const BadgeMedium: Story = {
  args: { items: badgeItems, value: "tab1", size: "medium" },
};

/* ─── With Action Button ─── */
export const WithAction: Story = {
  args: {
    items: basicItems,
    value: "tab1",
    size: "large",
    action: {
      label: "Add Tab",
      icon: <PlusIcon />,
      onClick: () => alert("Add Tab clicked"),
    },
  },
};

/* ─── With Action Medium ─── */
export const WithActionMedium: Story = {
  args: {
    items: basicItems,
    value: "tab1",
    size: "medium",
    action: {
      label: "Add Tab",
      icon: <PlusIcon />,
      onClick: () => alert("Add Tab clicked"),
    },
  },
};

/* ─── Interactive ─── */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("tab1");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Tabs items={basicItems} value={value} onChange={setValue} size="large" />
        <Tabs items={badgeItems} value={value} onChange={setValue} size="medium" />
      </div>
    );
  },
};
