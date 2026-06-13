import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { lightThemeClass } from "@lds/tokens";
import { InputGroup } from "../Input";
import { InputDatePicker, formatYmd } from ".";

/**
 * **InputDatePicker** — Input 박스 포커스/아이콘 클릭 시 캘린더가 팝오버로 열리는 날짜 선택 컴포넌트.
 *
 * 기존 `DatePicker`(상시 노출 패널)와 달리, 평소에는 인풋만 보이고 상호작용 시에만 캘린더가 펼쳐집니다.
 *
 * - 포커스 / 클릭 → 캘린더 열림
 * - 날짜 선택 → 인풋에 `yyyy-MM-dd` 표시 후 닫힘
 * - ESC / 바깥 클릭 → 닫힘
 */
const meta: Meta<typeof InputDatePicker> = {
  title: "Components/InputDatePicker",
  component: InputDatePicker,
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
type Story = StoryObj<typeof InputDatePicker>;

/** 기본 단일 날짜 InputDatePicker */
export const Default: Story = {
  name: "Single Date",
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div>
        <InputDatePicker value={date} onChange={setDate} />
        <p style={{ marginTop: 16, fontSize: 14, color: "#626f86" }}>
          선택 값: {formatYmd(date) || "—"}
        </p>
      </div>
    );
  },
};

/** 폼 필드 형태 — InputGroup(라벨 + 도움말 + 필수)으로 감싼 variant */
export const WithInputGroup: Story = {
  name: "Form Field (InputGroup)",
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ width: 260 }}>
        <InputGroup
          label="계약 시작일"
          required
          helperText="계약 효력이 시작되는 날짜를 선택하세요."
          state="default"
        >
          <InputDatePicker
            value={date}
            onChange={setDate}
            placeholder="yyyy-MM-dd"
          />
        </InputGroup>
        <p style={{ marginTop: 16, fontSize: 14, color: "#626f86" }}>
          선택 값: {formatYmd(date) || "—"}
        </p>
      </div>
    );
  },
};

/** 초기값이 있는 상태 */
export const WithInitialValue: Story = {
  name: "With Initial Value",
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2025, 5, 13));
    return <InputDatePicker value={date} onChange={setDate} />;
  },
};

/** 선택 범위 제한 (min / max) */
export const MinMax: Story = {
  name: "Min / Max Date",
  render: () => {
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), 5);
    const max = new Date(today.getFullYear(), today.getMonth(), 25);
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div>
        <InputDatePicker
          value={date}
          onChange={setDate}
          minDate={min}
          maxDate={max}
        />
        <p style={{ marginTop: 16, fontSize: 14, color: "#626f86" }}>
          {min.getDate()}일 ~ {max.getDate()}일만 선택 가능
        </p>
      </div>
    );
  },
};

/** 비활성화 */
export const Disabled: Story = {
  render: () => (
    <InputDatePicker value={new Date(2025, 5, 13)} disabled onChange={() => {}} />
  ),
};
