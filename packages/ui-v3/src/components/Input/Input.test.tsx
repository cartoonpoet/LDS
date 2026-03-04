import { render, screen } from "@testing-library/react";
import { Input } from ".";

describe("Input", () => {
  it("renders a label when supplied", () => {
    render(<Input label="Subject" placeholder="Enter text" />);
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders helper text and adornments", () => {
    render(<Input helperText="Required" label="Amount" prefix="₩" suffix="원" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
    expect(screen.getByText("₩")).toBeInTheDocument();
    expect(screen.getByText("원")).toBeInTheDocument();
  });
});
