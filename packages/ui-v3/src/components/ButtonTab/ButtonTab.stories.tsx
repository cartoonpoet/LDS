import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ButtonTab } from ".";
import { lightThemeClass } from "@lds/tokens";

const meta: Meta<typeof ButtonTab> = {
  title: "Components/ButtonTab",
  component: ButtonTab,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ButtonTab>;

const items = Array.from({ length: 10 }, (_, i) => ({
  value: `tab${i + 1}`,
  label: `Tab ${i + 1}`,
}));

const itemsWithDisabled = [
  { value: "tab1", label: "Tab 1" },
  { value: "tab2", label: "Tab 2" },
  { value: "tab3", label: "Tab 3", disabled: true },
  { value: "tab4", label: "Tab 4" },
];

export const Default: Story = {
  args: { items, value: "tab2" },
};

export const WithDisabled: Story = {
  args: { items: itemsWithDisabled, value: "tab2" },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("tab1");
    return <ButtonTab items={items.slice(0, 5)} value={value} onChange={setValue} />;
  },
};
