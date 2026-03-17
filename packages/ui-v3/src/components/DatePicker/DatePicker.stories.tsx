import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { DatePicker, DateRangePicker, DateTimePicker, TimePicker } from ".";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className={lightThemeClass} style={{ width: 420, padding: 24, background: "#f4f6fb" }}>
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { label: "기안일", caption: "Caption Text", helperText: "YYYY-MM-DD 형식으로 입력됩니다." } };
export const DateTime: Story = { render: args => <DateTimePicker {...args} caption="Caption Text" label="예약 일시" helperText="일시를 함께 선택합니다." /> };
export const Time: Story = { render: args => <TimePicker {...args} caption="Caption Text" label="예약 시간" helperText="업무 시작 시각을 선택하세요." /> };
export const Range: Story = { render: args => <DateRangePicker {...args} caption="Caption Text" label="조회 기간" helperText="기간 범위를 함께 입력하세요." /> };
export const Invalid: Story = { args: { label: "기안일", caption: "Caption Text", invalid: true, helperText: "유효한 날짜를 입력해 주세요." } };
