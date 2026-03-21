import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { DatePicker, DateRangePicker } from ".";

/**
 * **DatePicker** — 날짜 및 날짜 범위 선택 캘린더
 *
 * ### 사용법
 * ```tsx
 * import { DatePicker, DateRangePicker } from "@lds/ui-v3";
 *
 * // 단일 날짜 선택
 * <DatePicker value={date} onChange={setDate} />
 *
 * // 시간 포함
 * <DatePicker value={date} onChange={setDate} showTime />
 *
 * // 날짜 범위 선택
 * <DateRangePicker
 *   startDate={start}
 *   endDate={end}
 *   onChange={({ start, end }) => { setStart(start); setEnd(end); }}
 * />
 * ```
 */
const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  decorators: [
    (Story) => (
      <div
        className={lightThemeClass}
        style={{ padding: 24, backgroundColor: "#f2f4f6" }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/** 기본 날짜 선택 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div>
        <DatePicker value={date} onChange={setDate} />
        <p style={{ marginTop: 16, fontSize: 14 }}>
          선택: {date?.toLocaleDateString("ko-KR")}
        </p>
      </div>
    );
  },
};

/** 시간 포함 (DateTimePicker) */
export const WithTime: Story = {
  name: "Date Time Picker",
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div>
        <DatePicker value={date} onChange={setDate} showTime />
        <p style={{ marginTop: 16, fontSize: 14 }}>
          선택: {date?.toLocaleString("ko-KR")}
        </p>
      </div>
    );
  },
};

/** 날짜 범위 선택 */
export const Range: Story = {
  name: "Date Range Picker",
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    return (
      <div>
        <DateRangePicker
          startDate={start}
          endDate={end}
          onChange={({ start: s, end: e }) => {
            setStart(s);
            setEnd(e);
          }}
        />
        <p style={{ marginTop: 16, fontSize: 14 }}>
          시작: {start?.toLocaleDateString("ko-KR") ?? "—"} / 종료:{" "}
          {end?.toLocaleDateString("ko-KR") ?? "—"}
        </p>
      </div>
    );
  },
};

/** 선택 범위 제한 (min / max) */
export const MinMax: Story = {
  name: "Min / Max Date",
  render: () => {
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), 5);
    const max = new Date(today.getFullYear(), today.getMonth(), 25);
    const [date, setDate] = useState<Date | null>(today);
    return (
      <div>
        <DatePicker value={date} onChange={setDate} minDate={min} maxDate={max} />
        <p style={{ marginTop: 16, fontSize: 14, color: "#626f86" }}>
          {min.getDate()}일 ~ {max.getDate()}일만 선택 가능
        </p>
      </div>
    );
  },
};
