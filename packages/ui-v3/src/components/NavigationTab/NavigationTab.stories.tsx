import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavigationTab } from ".";
import { lightThemeClass } from "@lds/tokens";

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 0.333C3.32 0.333 0.333 3.32 0.333 7S3.32 13.667 7 13.667 13.667 10.68 13.667 7 10.68 0.333 7 0.333Zm0.667 10H6.333V6.333h1.334v4Zm0-5.333H6.333V3.667h1.334V5Z"
      fill="currentColor"
    />
  </svg>
);

const meta: Meta<typeof NavigationTab> = {
  title: "Components/NavigationTab",
  component: NavigationTab,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof NavigationTab>;

const items = [
  { value: "tab1", label: "Label", icon: <InfoIcon /> },
  { value: "tab2", label: "Label", icon: <InfoIcon /> },
  { value: "tab3", label: "Label", icon: <InfoIcon /> },
  { value: "tab4", label: "Label", icon: <InfoIcon /> },
];

export const Default: Story = {
  args: { items, value: "tab1" },
};

export const NoIcons: Story = {
  args: {
    items: [
      { value: "a", label: "Overview" },
      { value: "b", label: "Details" },
      { value: "c", label: "Settings" },
    ],
    value: "a",
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("tab1");
    return <NavigationTab items={items} value={value} onChange={setValue} />;
  },
};
