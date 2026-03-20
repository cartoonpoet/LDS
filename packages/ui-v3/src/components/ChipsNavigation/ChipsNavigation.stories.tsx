import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ChipsNavigation } from ".";
import { lightThemeClass } from "@lds/tokens";

const meta: Meta<typeof ChipsNavigation> = {
  title: "Components/ChipsNavigation",
  component: ChipsNavigation,
  decorators: [(Story) => <div className={lightThemeClass} style={{ width: "100%" }}><Story /></div>],
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ChipsNavigation>;

const items = Array.from({ length: 10 }, (_, i) => ({
  value: `opt${i + 1}`,
  label: `Option ${i + 1}`,
}));

/* ─── Single Select (Default) ─── */
export const Default: Story = {
  args: { items, value: "" },
};

/* ─── Single Select with selection ─── */
export const SingleSelected: Story = {
  args: { items, value: "opt3" },
};

/* ─── Multi Select ─── */
export const MultiChecked: Story = {
  args: {
    items,
    value: ["opt4", "opt6", "opt7", "opt8", "opt9"],
    multiple: true,
  },
};

/* ─── Interactive Single ─── */
export const InteractiveSingle: Story = {
  render: () => {
    const [value, setValue] = useState<string | string[]>("");
    return (
      <ChipsNavigation
        items={items}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/* ─── Interactive Multi ─── */
export const InteractiveMulti: Story = {
  render: () => {
    const [value, setValue] = useState<string | string[]>([]);
    return (
      <ChipsNavigation
        items={items}
        value={value}
        onChange={setValue}
        multiple
      />
    );
  },
};
