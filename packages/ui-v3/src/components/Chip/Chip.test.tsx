import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Chip } from ".";

describe("Chip", () => {
  it("renders content", () => {
    render(<Chip>Option 1</Chip>);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const onDismiss = vi.fn();
    render(
      <Chip dismissible onDismiss={onDismiss}>
        Option 1
      </Chip>
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove chip" }));
    // 닫힘 애니메이션 후 onDismiss 호출
    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });
});
