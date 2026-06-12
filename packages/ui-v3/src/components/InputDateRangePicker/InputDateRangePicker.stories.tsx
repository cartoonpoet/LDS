import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { InputGroup } from "../Input";
import { InputDateRangePicker, InputDateRangePickerSplit } from ".";

const meta: Meta<typeof InputDateRangePicker> = {
  title: "Prototypes/InputDateRangePicker",
  component: InputDateRangePicker,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6", minHeight: 420 }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputDateRangePicker>;

export const Default: Story = {
  name: "One Input",
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    return (
      <InputDateRangePicker
        startDate={start}
        endDate={end}
        onChange={({ start, end }) => {
          setStart(start);
          setEnd(end);
        }}
      />
    );
  },
};

export const TwoInputs: Story = {
  name: "Two Inputs",
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    return (
      <InputDateRangePickerSplit
        startDate={start}
        endDate={end}
        onChange={({ start, end }) => {
          setStart(start);
          setEnd(end);
        }}
      />
    );
  },
};

export const WithInputGroup: Story = {
  name: "Form Field (InputGroup)",
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    return (
      <div style={{ width: 360 }}>
        <InputGroup
          label="계약 기간"
          required
          helperText="계약이 유효한 시작일과 종료일을 선택하세요."
        >
          <InputDateRangePicker
            startDate={start}
            endDate={end}
            onChange={({ start, end }) => {
              setStart(start);
              setEnd(end);
            }}
            placeholder="기간 선택"
          />
        </InputGroup>
      </div>
    );
  },
};
