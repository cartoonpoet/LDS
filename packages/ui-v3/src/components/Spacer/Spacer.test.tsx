import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Spacer } from ".";

describe("Spacer", () => {
  it("renders an aria-hidden div", () => {
    const { container } = render(<Spacer />);
    const el = container.firstChild as HTMLElement;
    expect(el.nodeName).toBe("DIV");
    expect(el).toHaveAttribute("aria-hidden", "true");
  });

  it("has a stable vanilla-extract className", () => {
    const { container } = render(<Spacer />);
    expect((container.firstChild as HTMLElement).className).not.toBe("");
  });

  it("merges custom className", () => {
    const { container } = render(<Spacer className="extra" />);
    expect((container.firstChild as HTMLElement).className).toContain("extra");
  });

  it("forwards data-testid", () => {
    render(<Spacer data-testid="spacer" />);
    expect(screen.getByTestId("spacer")).toBeInTheDocument();
  });
});
