import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("Button", () => {
  it("renders the supplied label", () => {
    render(<Button>Approve</Button>);
    expect(screen.getByRole("button", { name: "Approve" })).toBeInTheDocument();
  });

  it("keeps disabled state", () => {
    render(<Button disabled>Approve</Button>);
    expect(screen.getByRole("button", { name: "Approve" })).toBeDisabled();
  });

  it("disables itself while loading", () => {
    render(<Button loading>Approve</Button>);
    expect(screen.getByRole("button", { name: "Approve" })).toBeDisabled();
  });

  it("renders leading and trailing icons", () => {
    render(
      <Button leadingIcon={<span data-testid="leading">*</span>} trailingIcon={<span data-testid="trailing">+</span>}>
        Approve
      </Button>
    );

    expect(screen.getByTestId("leading")).toBeInTheDocument();
    expect(screen.getByTestId("trailing")).toBeInTheDocument();
  });
});
