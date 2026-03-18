import { fireEvent, render, screen } from "@testing-library/react";
import { Alert } from ".";

describe("Alert", () => {
  it("renders the default target combination", () => {
    render(
      <Alert showCloseButton title="Notice">
        Saved
      </Alert>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Notice")).toBeInTheDocument();
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close alert" })).toBeInTheDocument();
  });

  it("calls onClose when dismiss button is clicked", () => {
    const onClose = vi.fn();
    render(
      <Alert showCloseButton onClose={onClose} title="Notice">
        Saved
      </Alert>
    );

    fireEvent.click(screen.getByRole("button", { name: "Close alert" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders svg icons for alert body and close action", () => {
    const { container } = render(
      <Alert showCloseButton title="Notice">
        Saved
      </Alert>
    );

    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });

  it("renders action buttons when the button axis is enabled", () => {
    render(
      <Alert
        action={{ label: "Approve" }}
        button
        secondaryAction={{ label: "Reject", tone: "warning" }}
        title="Notice"
      >
        Saved
      </Alert>
    );

    expect(screen.getByRole("button", { name: "Approve" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reject" })).toBeInTheDocument();
  });
});
