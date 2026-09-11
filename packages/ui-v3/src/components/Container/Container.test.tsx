import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Container } from ".";

describe("Container", () => {
  it("renders children in a div", () => {
    const { container } = render(<Container><span>child</span></Container>);
    expect(screen.getByText("child")).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("all sizes produce unique classNames", () => {
    const sizes = ["sm", "md", "lg", "full"] as const;
    const { rerender, container } = render(<Container size={sizes[0]}>x</Container>);
    const classes = sizes.map((size) => {
      rerender(<Container size={size}>x</Container>);
      return (container.firstChild as HTMLElement).className;
    });
    expect(new Set(classes).size).toBe(sizes.length);
  });

  it("defaults to lg size", () => {
    const { container: def } = render(<Container>x</Container>);
    const { container: lg } = render(<Container size="lg">x</Container>);
    expect((def.firstChild as HTMLElement).className).toBe(
      (lg.firstChild as HTMLElement).className
    );
  });

  it("merges custom className and style", () => {
    const { container } = render(
      <Container className="extra" style={{ background: "red" }}>x</Container>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("extra");
    expect(el.style.background).toBe("red");
  });

  it("forwards data-testid", () => {
    render(<Container data-testid="container">x</Container>);
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });
});
