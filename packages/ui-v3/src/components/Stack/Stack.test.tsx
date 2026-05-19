import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { themeVars } from "@lds/tokens";
import { HStack } from ".";

describe("HStack", () => {
  it("renders children", () => {
    render(<HStack><span>child</span></HStack>);
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("renders as div by default", () => {
    const { container } = render(<HStack>x</HStack>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies gap via inline style", () => {
    const { container } = render(<HStack gap="x2">x</HStack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe(themeVars.spacing.x2);
  });

  it("does not set gap style when gap is omitted", () => {
    const { container } = render(<HStack>x</HStack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe("");
  });

  it("applies different className for different align values", () => {
    const { rerender, container } = render(<HStack align="center">x</HStack>);
    const centerClass = (container.firstChild as HTMLElement).className;
    rerender(<HStack align="start">x</HStack>);
    const startClass = (container.firstChild as HTMLElement).className;
    expect(centerClass).not.toBe(startClass);
  });

  it("applies different className for different justify values", () => {
    const { rerender, container } = render(<HStack justify="between">x</HStack>);
    const betweenClass = (container.firstChild as HTMLElement).className;
    rerender(<HStack justify="center">x</HStack>);
    const centerClass = (container.firstChild as HTMLElement).className;
    expect(betweenClass).not.toBe(centerClass);
  });

  it("merges custom className", () => {
    const { container } = render(<HStack className="my-class">x</HStack>);
    expect((container.firstChild as HTMLElement).className).toContain("my-class");
  });

  it("merges custom style with gap", () => {
    const { container } = render(
      <HStack gap="x2" style={{ padding: "8px" }}>x</HStack>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe(themeVars.spacing.x2);
    expect(el.style.padding).toBe("8px");
  });

  it("forwards native HTML attributes", () => {
    render(<HStack data-testid="hstack">x</HStack>);
    expect(screen.getByTestId("hstack")).toBeInTheDocument();
  });
});
