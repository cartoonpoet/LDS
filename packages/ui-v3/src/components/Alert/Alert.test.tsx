import { fireEvent, render, screen } from "@testing-library/react";
import { Alert } from ".";

describe("Alert", () => {
  it("renders alert content", () => {
    render(<Alert title="Notice">Saved</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Notice")).toBeInTheDocument();
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("calls onClose when dismiss button is clicked", () => {
    const onClose = vi.fn();
    render(
      <Alert dismissible onClose={onClose} title="Notice">
        Saved
      </Alert>
    );
    fireEvent.click(screen.getByRole("button", { name: "Close alert" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
