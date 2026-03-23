import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Mention } from ".";

describe("Mention", () => {
  it("renders @name format", () => {
    render(<Mention name="홍길동" />);
    expect(screen.getByText("@홍길동")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    const { container } = render(<Mention name="user" className="custom" />);
    expect(container.querySelector(".custom")).toBeInTheDocument();
  });
});
