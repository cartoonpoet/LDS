import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "../../test/utils";
import { fireEvent, act } from "@testing-library/react";
import { Tooltip } from ".";

describe("Tooltip", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it("renders trigger element", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip on mouse enter after delay", () => {
    render(
      <Tooltip content="Tooltip text" delay={200}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText("Hover me").closest("div")!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  it("hides tooltip on mouse leave", () => {
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText("Hover me").closest("div")!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(0); });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.mouseLeave(wrapper);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <Tooltip content="Body" title="제목" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText("Hover me").closest("div")!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(0); });
    expect(screen.getByText("제목")).toBeInTheDocument();
  });

  it("does not show tooltip when disabled", () => {
    render(
      <Tooltip content="Hidden" delay={0} disabled>
        <button>Hover me</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText("Hover me").closest("div")!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(0); });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("has role='tooltip'", () => {
    render(
      <Tooltip content="Text" delay={0}>
        <button>Hover</button>
      </Tooltip>,
    );
    const wrapper = screen.getByText("Hover").closest("div")!;
    fireEvent.mouseEnter(wrapper);
    act(() => { vi.advanceTimersByTime(0); });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });
});
