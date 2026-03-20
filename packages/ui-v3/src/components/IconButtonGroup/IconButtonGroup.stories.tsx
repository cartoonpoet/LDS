import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButtonGroup } from ".";
import { lightThemeClass } from "@lds/tokens";

const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="3" width="15" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1.5 7.5h15" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="1.5" y="10.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="10.5" y="10.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof IconButtonGroup> = {
  title: "Components/IconButtonGroup",
  component: IconButtonGroup,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["fill", "outline"] },
  },
};
export default meta;
type Story = StoryObj<typeof IconButtonGroup>;

const items = [
  { value: "card", icon: <CardIcon />, "aria-label": "카드 보기" as const },
  { value: "grid", icon: <GridIcon />, "aria-label": "그리드 보기" as const },
  { value: "menu", icon: <MenuIcon />, "aria-label": "리스트 보기" as const },
];

export const Fill: Story = {
  args: { items, value: "card", variant: "fill" },
};

export const Outline: Story = {
  args: { items, value: "menu", variant: "outline" },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("card");
    return (
      <div style={{ display: "flex", gap: 16 }}>
        <IconButtonGroup items={items} value={value} onChange={setValue} variant="fill" />
        <IconButtonGroup items={items} value={value} onChange={setValue} variant="outline" />
      </div>
    );
  },
};
