import { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import "../../test/setup";
import { renderWithUser, screen } from "../../test/utils";
import { InputDateRangePicker, InputDateRangePickerSplit } from ".";

const ControlledOneInput = ({
  initialStart = null,
  initialEnd = null,
  onChange,
}: {
  initialStart?: Date | null;
  initialEnd?: Date | null;
  onChange?: (range: { start: Date | null; end: Date | null }) => void;
}) => {
  const [start, setStart] = useState<Date | null>(initialStart);
  const [end, setEnd] = useState<Date | null>(initialEnd);
  return (
    <InputDateRangePicker
      startDate={start}
      endDate={end}
      onChange={(range) => {
        setStart(range.start);
        setEnd(range.end);
        onChange?.(range);
      }}
    />
  );
};

const ControlledTwoInputs = ({
  initialStart = null,
  initialEnd = null,
  onChange,
}: {
  initialStart?: Date | null;
  initialEnd?: Date | null;
  onChange?: (range: { start: Date | null; end: Date | null }) => void;
}) => {
  const [start, setStart] = useState<Date | null>(initialStart);
  const [end, setEnd] = useState<Date | null>(initialEnd);
  return (
    <InputDateRangePickerSplit
      startDate={start}
      endDate={end}
      onChange={(range) => {
        setStart(range.start);
        setEnd(range.end);
        onChange?.(range);
      }}
    />
  );
};
describe("InputDateRangePicker", () => {
  it("renders one input without the calendar initially", () => {
    renderWithUser(<InputDateRangePicker startDate={null} endDate={null} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
    expect(screen.queryByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeNull();
  });

  it("opens the calendar on focus", () => {
    renderWithUser(<InputDateRangePicker startDate={null} endDate={null} />);
    fireEvent.focus(screen.getByRole("textbox"));
    expect(screen.getByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeTruthy();
  });

  it("opens the calendar on click", () => {
    renderWithUser(<InputDateRangePicker startDate={null} endDate={null} />);
    fireEvent.click(screen.getByRole("textbox"));
    expect(screen.getByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeTruthy();
  });

  it("selects a full range, fills the input, and closes", () => {
    const onChange = vi.fn();
    const today = new Date();
    const initialStart = new Date(today.getFullYear(), today.getMonth(), 15);
    const endDate = new Date(today.getFullYear(), today.getMonth(), 20);
    renderWithUser(<ControlledOneInput initialStart={initialStart} onChange={onChange} />);

    fireEvent.focus(screen.getByRole("textbox"));
    fireEvent.click(
      screen.getByLabelText(
        `${endDate.getFullYear()}년 ${endDate.getMonth() + 1}월 ${endDate.getDate()}일`,
      ),
    );

    expect(onChange).toHaveBeenCalled();
    expect(
      screen.getByDisplayValue(
        `${initialStart.getFullYear()}-${String(initialStart.getMonth() + 1).padStart(2, "0")}-${String(initialStart.getDate()).padStart(2, "0")} ~ ${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`,
      ),
    ).toBeTruthy();
    expect(screen.queryByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeNull();
  });

  it("closes on Escape", () => {
    renderWithUser(<InputDateRangePicker startDate={null} endDate={null} />);
    fireEvent.focus(screen.getByRole("textbox"));
    expect(screen.getByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeNull();
  });
});

describe("InputDateRangePickerSplit", () => {
  it("renders two inputs without the calendar initially", () => {
    renderWithUser(<InputDateRangePickerSplit startDate={null} endDate={null} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.queryByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeNull();
  });

  it("opens the calendar on focus", () => {
    renderWithUser(<InputDateRangePickerSplit startDate={null} endDate={null} />);
    fireEvent.focus(screen.getAllByRole("textbox")[0]);
    expect(screen.getByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeTruthy();
  });

  it("opens the calendar on click", () => {
    renderWithUser(<InputDateRangePickerSplit startDate={null} endDate={null} />);
    fireEvent.click(screen.getAllByRole("textbox")[1]);
    expect(screen.getByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeTruthy();
  });

  it("selects a range and closes on end date", () => {
    const onChange = vi.fn();
    renderWithUser(
      <ControlledTwoInputs initialStart={new Date(2025, 2, 15)} onChange={onChange} />,
    );

    fireEvent.focus(screen.getAllByRole("textbox")[0]);
    fireEvent.click(screen.getByLabelText("2025년 3월 20일"));

    expect(onChange).toHaveBeenCalled();
    expect(screen.getByDisplayValue("2025-03-15")).toBeTruthy();
    expect(screen.getByDisplayValue("2025-03-20")).toBeTruthy();
    expect(screen.queryByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeNull();
  });

  it("closes on Escape", () => {
    renderWithUser(<InputDateRangePickerSplit startDate={null} endDate={null} />);
    fireEvent.focus(screen.getAllByRole("textbox")[0]);
    expect(screen.getByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "날짜 범위 선택 캘린더" })).toBeNull();
  });
});
