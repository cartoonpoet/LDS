import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import { renderWithUser, screen } from "../../test/utils";
import { DatePicker, DateRangePicker } from ".";

describe("DatePicker", () => {
  it("renders calendar grid with value month", () => {
    renderWithUser(<DatePicker value={new Date(2025, 2, 15)} />);
    expect(screen.getByText("2025년 3월")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("navigates to next month", () => {
    renderWithUser(<DatePicker value={new Date(2025, 2, 15)} />);
    fireEvent.click(screen.getByLabelText("다음 달"));
    expect(screen.getByText("2025년 4월")).toBeInTheDocument();
  });

  it("navigates to previous month", () => {
    renderWithUser(<DatePicker value={new Date(2025, 2, 15)} />);
    fireEvent.click(screen.getByLabelText("이전 달"));
    expect(screen.getByText("2025년 2월")).toBeInTheDocument();
  });

  it("calls onChange on date click", () => {
    const onChange = vi.fn();
    renderWithUser(<DatePicker value={new Date(2025, 2, 15)} onChange={onChange} />);
    fireEvent.click(screen.getByText("20"));
    expect(onChange).toHaveBeenCalledTimes(1);
    const selected: Date = onChange.mock.calls[0][0];
    expect(selected.getFullYear()).toBe(2025);
    expect(selected.getMonth()).toBe(2);
    expect(selected.getDate()).toBe(20);
  });

  it("renders date buttons with aria-label", () => {
    renderWithUser(<DatePicker value={new Date(2025, 2, 10)} />);
    expect(screen.getByLabelText("2025년 3월 10일")).toBeInTheDocument();
  });

  it("renders time picker when showTime is true", () => {
    renderWithUser(<DatePicker value={new Date(2025, 2, 15)} showTime />);
    expect(screen.getByLabelText("시")).toBeInTheDocument();
    expect(screen.getByLabelText("분")).toBeInTheDocument();
  });
});

describe("DateRangePicker", () => {
  it("renders two calendar panels", () => {
    renderWithUser(<DateRangePicker startDate={new Date(2025, 2, 10)} />);
    expect(screen.getByText("2025년 3월")).toBeInTheDocument();
    expect(screen.getByText("2025년 4월")).toBeInTheDocument();
  });

  it("calls onChange when selecting a date", () => {
    const onChange = vi.fn();
    renderWithUser(<DateRangePicker startDate={new Date(2025, 2, 10)} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText("2025년 3월 15일"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
