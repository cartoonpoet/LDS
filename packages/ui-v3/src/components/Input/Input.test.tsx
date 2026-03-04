import { render, screen } from "@testing-library/react";
import { Input } from ".";

describe("Input", () => {
  it("renders a label when supplied", () => {
    render(<Input label="Subject" placeholder="Enter text" />);
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });
});
