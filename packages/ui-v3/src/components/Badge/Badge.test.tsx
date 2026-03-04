import { fireEvent, render, screen } from "@testing-library/react";
import { Badge } from ".";

describe("Badge", () => {
  it("renders content", () => {
    render(<Badge>Label</Badge>);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(
      <Badge dismissible onDismiss={onDismiss}>
        Label
      </Badge>
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove badge" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
