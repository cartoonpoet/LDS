import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { themeVars } from "@lds/tokens";
import { Box } from ".";

describe("Box", () => {
  it("renders children in a div", () => {
    const { container } = render(<Box><span>child</span></Box>);
    expect(screen.getByText("child")).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies p as inline padding token", () => {
    const { container } = render(<Box p="x4">x</Box>);
    expect((container.firstChild as HTMLElement).style.padding).toBe(themeVars.spacing.x4);
  });

  it("px/py override p on their axis", () => {
    const { container } = render(<Box p="x2" px="x6" py="x1">x</Box>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.paddingLeft).toBe(themeVars.spacing.x6);
    expect(el.style.paddingRight).toBe(themeVars.spacing.x6);
    expect(el.style.paddingTop).toBe(themeVars.spacing.x1);
    expect(el.style.paddingBottom).toBe(themeVars.spacing.x1);
  });

  it("applies radius as inline borderRadius token", () => {
    const { container } = render(<Box radius="md">x</Box>);
    expect((container.firstChild as HTMLElement).style.borderRadius).toBe(themeVars.radius.md);
  });

  it("sets no padding/radius styles when props omitted", () => {
    const { container } = render(<Box>x</Box>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.padding).toBe("");
    expect(el.style.borderRadius).toBe("");
  });

  it("bg variants produce distinct classNames", () => {
    const bgs = ["page", "canvas", "subtle", "raised"] as const;
    const { rerender, container } = render(<Box bg={bgs[0]}>x</Box>);
    const classes = bgs.map((bg) => {
      rerender(<Box bg={bg}>x</Box>);
      return (container.firstChild as HTMLElement).className;
    });
    expect(new Set(classes).size).toBe(bgs.length);
  });

  it("border adds a different className", () => {
    const { container: a } = render(<Box>x</Box>);
    const { container: b } = render(<Box border>x</Box>);
    expect((a.firstChild as HTMLElement).className).not.toBe(
      (b.firstChild as HTMLElement).className
    );
  });

  it("merges custom className and style", () => {
    const { container } = render(
      <Box p="x2" className="extra" style={{ width: "100px" }}>x</Box>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("extra");
    expect(el.style.width).toBe("100px");
    expect(el.style.padding).toBe(themeVars.spacing.x2);
  });

  it("forwards native attributes", () => {
    render(<Box data-testid="box" aria-label="영역">x</Box>);
    expect(screen.getByTestId("box")).toBeInTheDocument();
  });
});
