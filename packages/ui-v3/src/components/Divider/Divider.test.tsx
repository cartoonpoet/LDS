import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Divider } from ".";

describe("Divider", () => {
  it("renders hr with separator role by default", () => {
    const { container } = render(<Divider />);
    expect(container.firstChild?.nodeName).toBe("HR");
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("vertical renders div with aria-orientation", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el.nodeName).toBe("DIV");
    expect(el).toHaveAttribute("role", "separator");
    expect(el).toHaveAttribute("aria-orientation", "vertical");
  });

  it("horizontal and vertical have different classNames", () => {
    const { container: h } = render(<Divider />);
    const { container: v } = render(<Divider orientation="vertical" />);
    expect((h.firstChild as HTMLElement).className).not.toBe(
      (v.firstChild as HTMLElement).className
    );
  });

  it("merges custom className", () => {
    const { container } = render(<Divider className="extra" />);
    expect((container.firstChild as HTMLElement).className).toContain("extra");
  });

  it("forwards data-testid", () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getByTestId("divider")).toBeInTheDocument();
  });
});
