import { render, screen } from "@testing-library/react";
import { Badge } from ".";

describe("Badge", () => {
  it("renders content", () => {
    render(<Badge>Draft</Badge>);
    expect(screen.getByText("Draft")).toBeInTheDocument();
  });
});
