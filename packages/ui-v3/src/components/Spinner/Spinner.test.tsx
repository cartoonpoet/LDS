import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Spinner } from ".";

describe("Spinner", () => {
  it("renders with role='status'", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders label text when provided", () => {
    render(<Spinner label="로딩 중..." />);
    expect(screen.getByText("로딩 중...")).toBeInTheDocument();
  });

  it("does not render label when not provided", () => {
    const { container } = render(<Spinner />);
    const spans = container.querySelectorAll("span");
    // No label span (only track div, spinner div)
    expect(screen.queryByText("로딩 중...")).not.toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<Spinner className="custom" />);
    expect(screen.getByRole("status")).toHaveClass("custom");
  });
});
