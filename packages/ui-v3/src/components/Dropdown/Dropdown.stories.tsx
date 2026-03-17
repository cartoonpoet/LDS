import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { Dropdown } from ".";

const groups = [
  { options: [{ value: "last-year", label: "지난 1년" }, { value: "last-3-years", label: "지난 3년" }, { value: "all", label: "전체 선택" }] },
  { label: "담당자", options: [{ value: "junho", label: "박준호" }, { value: "yeoni", label: "김연이", description: "디자인 시스템" }] }
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ width: 360, padding: 24, background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { label: "조회 기간", groups, placeholder: "항목 선택" } };
export const SearchableMulti: Story = { args: { label: "수신자", groups, searchable: true, multiple: true, defaultValue: ["junho"] } };
