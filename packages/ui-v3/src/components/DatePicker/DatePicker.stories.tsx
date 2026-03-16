import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DateRangePicker, DateTimePicker, TimePicker } from '.';

const meta = { title: 'Components/DatePicker', component: DatePicker } satisfies Meta<typeof DatePicker>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = { args: { label: '기안일' } };
export const DateTime: Story = { render: args => <DateTimePicker {...args} label="예약 일시" /> };
export const Time: Story = { render: args => <TimePicker {...args} label="예약 시간" /> };
export const Range: Story = { render: args => <DateRangePicker {...args} label="조회 기간" /> };
