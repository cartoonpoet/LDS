import { describe, it, expect } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { ProgressBar, StepBar } from ".";

describe("ProgressBar", () => {
  it("renders with role progressbar", () => {
    renderWithUser(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-valuenow", () => {
    renderWithUser(<ProgressBar value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("shows value text when showValue is true", () => {
    renderWithUser(<ProgressBar value={42} showValue />);
    expect(screen.getByText("42%")).toBeInTheDocument();
  });

  it("renders segments for multi-bar", () => {
    const segments = [
      { value: 30, color: "primary" as const },
      { value: 20, color: "success" as const },
    ];
    renderWithUser(<ProgressBar segments={segments} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});

describe("StepBar", () => {
  const steps = [
    { label: "Start", status: "completed" as const },
    { label: "Review", status: "active" as const },
    { label: "Done", status: "scheduled" as const },
  ];

  it("renders all steps", () => {
    renderWithUser(<StepBar steps={steps} />);
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});
