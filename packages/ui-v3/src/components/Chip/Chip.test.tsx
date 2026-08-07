import { fireEvent, render, screen } from "@testing-library/react";
import { Chip } from ".";

describe("Chip", () => {
  it("renders content", () => {
    render(<Chip>Option 1</Chip>);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", () => {
    const onDismiss = vi.fn();
    render(
      <Chip dismissible onDismiss={onDismiss}>
        Option 1
      </Chip>
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove chip" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
