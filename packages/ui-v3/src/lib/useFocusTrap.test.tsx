import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";
import { renderWithUser, screen } from "../test/utils";
import { useFocusTrap } from "./useFocusTrap";

function TrapHarness({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, active);

  return (
    <div ref={ref} data-testid="trap">
      <button data-testid="first">First</button>
      <button data-testid="second">Second</button>
      <button data-testid="third">Third</button>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("focuses the first focusable element when activated", () => {
    renderWithUser(<TrapHarness active={true} />);
    expect(document.activeElement).toBe(screen.getByTestId("first"));
  });

  it("does not trap focus when inactive", () => {
    renderWithUser(<TrapHarness active={false} />);
    expect(document.activeElement).not.toBe(screen.getByTestId("first"));
  });

  it("wraps focus from last to first on Tab", async () => {
    const { user } = renderWithUser(<TrapHarness active={true} />);

    // Focus is on first, tab to second, then third
    await user.tab();
    expect(document.activeElement).toBe(screen.getByTestId("second"));
    await user.tab();
    expect(document.activeElement).toBe(screen.getByTestId("third"));

    // Tab from last should wrap to first
    await user.tab();
    expect(document.activeElement).toBe(screen.getByTestId("first"));
  });

  it("wraps focus from first to last on Shift+Tab", async () => {
    const { user } = renderWithUser(<TrapHarness active={true} />);

    // Focus starts on first, Shift+Tab should wrap to last
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(screen.getByTestId("third"));
  });
});
