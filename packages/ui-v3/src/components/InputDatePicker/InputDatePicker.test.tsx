import { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { renderWithUser, screen } from "../../test/utils";
import { InputDatePicker, formatYmd } from ".";

/* 제어 컴포넌트 — 선택 후 input 값 반영 검증용 */
const Controlled = ({
  initial = null,
  onChange,
}: {
  initial?: Date | null;
  onChange?: (d: Date) => void;
}) => {
  const [date, setDate] = useState<Date | null>(initial);
  return (
    <InputDatePicker
      value={date}
      onChange={(d) => {
        setDate(d);
        onChange?.(d);
      }}
    />
  );
};
describe("formatYmd", () => {
  it("formats a date as yyyy-MM-dd", () => {
    expect(formatYmd(new Date(2025, 5, 3))).toBe("2025-06-03");
  });

  it("returns empty string for null", () => {
    expect(formatYmd(null)).toBe("");
  });
});

describe("InputDatePicker", () => {
  it("renders an input without the calendar initially", () => {
    renderWithUser(<InputDatePicker value={new Date(2025, 2, 15)} />);
    expect(screen.getByDisplayValue("2025-03-15")).toBeInTheDocument();
    expect(screen.queryByText("2025년 3월")).not.toBeInTheDocument();
  });

  it("opens the calendar on focus", () => {
    renderWithUser(<InputDatePicker value={new Date(2025, 2, 15)} />);
    fireEvent.focus(screen.getByRole("textbox"));
    expect(screen.getByText("2025년 3월")).toBeInTheDocument();
  });

  it("opens the calendar on click", () => {
    renderWithUser(<InputDatePicker value={new Date(2025, 2, 15)} />);
    fireEvent.click(screen.getByRole("textbox"));
    expect(screen.getByText("2025년 3월")).toBeInTheDocument();
  });

  it("selects a date, fills the input as yyyy-MM-dd, and closes", () => {
    const onChange = vi.fn();
    renderWithUser(
      <Controlled initial={new Date(2025, 2, 15)} onChange={onChange} />,
    );
    fireEvent.focus(screen.getByRole("textbox"));
    fireEvent.click(screen.getByLabelText("2025년 3월 20일"));

    expect(onChange).toHaveBeenCalledTimes(1);
    const selected: Date = onChange.mock.calls[0][0];
    expect(formatYmd(selected)).toBe("2025-03-20");
    // 선택 후 닫힘
    expect(screen.queryByText("2025년 3월")).not.toBeInTheDocument();
    // input 값 반영
    expect(screen.getByDisplayValue("2025-03-20")).toBeInTheDocument();
  });

  it("closes on Escape", () => {
    renderWithUser(<InputDatePicker value={new Date(2025, 2, 15)} />);
    fireEvent.focus(screen.getByRole("textbox"));
    expect(screen.getByText("2025년 3월")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByText("2025년 3월")).not.toBeInTheDocument();
  });

  it("closes on outside click", () => {
    renderWithUser(
      <div>
        <InputDatePicker value={new Date(2025, 2, 15)} />
        <button>바깥</button>
      </div>,
    );
    fireEvent.focus(screen.getByRole("textbox"));
    expect(screen.getByText("2025년 3월")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByText("바깥"));
    expect(screen.queryByText("2025년 3월")).not.toBeInTheDocument();
  });

  it("does not open when disabled", () => {
    renderWithUser(<InputDatePicker value={new Date(2025, 2, 15)} disabled />);
    fireEvent.click(screen.getByRole("textbox"));
    expect(screen.queryByText("2025년 3월")).not.toBeInTheDocument();
  });
});
