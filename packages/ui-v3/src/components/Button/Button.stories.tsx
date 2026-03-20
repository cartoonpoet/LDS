import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";
import { lightThemeClass } from "@lds/tokens";

const PieChartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.583 1.167v5.25h5.25A5.833 5.833 0 1 1 7.583 1.167Z"
      fill="currentColor"
    />
    <path
      d="M8.75.583v5.25H14A5.833 5.833 0 0 0 8.75.583Z"
      fill="currentColor"
    />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  decorators: [(Story) => <div className={lightThemeClass}><Story /></div>],
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "neutral"],
    },
    shape: { control: "select", options: ["rounded", "round"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

/* ─── Default (Solid) ─── */
export const Default: Story = {
  args: { children: "버튼" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "버튼" },
};

/* ─── Shapes ─── */
export const Rounded: Story = {
  args: { shape: "rounded", children: "버튼" },
};

export const Round: Story = {
  args: { shape: "round", children: "버튼" },
};

/* ─── Sizes ─── */
export const Small: Story = {
  args: { size: "small", children: "버튼" },
};

export const Large: Story = {
  args: { size: "large", children: "버튼" },
};

/* ─── With Icon ─── */
export const WithIconLeft: Story = {
  args: {
    iconLeft: <PieChartIcon />,
    children: "버튼",
  },
};

export const WithIconRight: Story = {
  args: {
    iconRight: <PieChartIcon />,
    children: "버튼",
  },
};

export const WithBothIcons: Story = {
  args: {
    iconLeft: <PieChartIcon />,
    iconRight: <PieChartIcon />,
    children: "버튼",
  },
};

/* ─── Disabled ─── */
export const DisabledDefault: Story = {
  args: { disabled: true, children: "버튼" },
};

export const DisabledOutline: Story = {
  args: { variant: "outline", disabled: true, children: "버튼" },
};

/* ─── Color Variants (Solid) ─── */
export const AllSolidColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(["primary", "secondary", "success", "danger", "warning", "info", "dark", "neutral"] as const).map(
        (color) => (
          <Button key={color} color={color}>
            {color}
          </Button>
        ),
      )}
    </div>
  ),
};

/* ─── Color Variants (Outline) ─── */
export const AllOutlineColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {(["primary", "secondary", "success", "danger", "warning", "info", "dark", "neutral"] as const).map(
        (color) => (
          <Button key={color} variant="outline" color={color}>
            {color}
          </Button>
        ),
      )}
    </div>
  ),
};

/* ─── Icon Right + Outline + Round ─── */
export const OutlineRoundWithIcon: Story = {
  args: {
    variant: "outline",
    shape: "round",
    iconRight: <PieChartIcon />,
    children: "버튼",
  },
};
