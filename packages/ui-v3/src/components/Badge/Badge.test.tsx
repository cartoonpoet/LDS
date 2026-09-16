import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Badge } from ".";

describe("Badge", () => {
  it("renders content", () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const onDismiss = vi.fn();
    render(
      <Badge dismissible onDismiss={onDismiss}>
        Label
      </Badge>
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove badge" }));
    // 닫힘 애니메이션 후 onDismiss 호출
    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });
});
