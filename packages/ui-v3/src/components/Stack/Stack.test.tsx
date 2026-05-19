import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../test/utils";
import { themeVars } from "@lds/tokens";
import { HStack, VStack } from ".";

describe("HStack", () => {
  it("renders children", () => {
    render(<HStack><span>child</span></HStack>);
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <HStack>
        <span>first</span>
        <span>second</span>
        <span>third</span>
      </HStack>
    );
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("second")).toBeInTheDocument();
    expect(screen.getByText("third")).toBeInTheDocument();
  });

  it("renders as div by default", () => {
    const { container } = render(<HStack>x</HStack>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders without children", () => {
    const { container } = render(<HStack />);
    expect(container.firstChild).toBeInTheDocument();
  });

  // gap
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

  it.each([
    ["x1", themeVars.spacing.x1],
    ["x2", themeVars.spacing.x2],
    ["x3", themeVars.spacing.x3],
    ["x4", themeVars.spacing.x4],
    ["x5", themeVars.spacing.x5],
    ["x6", themeVars.spacing.x6],
  ] as const)("gap=%s applies correct token value", (token, expected) => {
    const { container } = render(<HStack gap={token}>x</HStack>);
    expect((container.firstChild as HTMLElement).style.gap).toBe(expected);
  });

  it("all gap token values are distinct", () => {
    const values = (["x1", "x2", "x3", "x4", "x5", "x6"] as const).map(
      (g) => themeVars.spacing[g]
    );
    expect(new Set(values).size).toBe(6);
  });

  // style 병합
  it("merges custom style with gap", () => {
    const { container } = render(
      <HStack gap="x2" style={{ padding: "8px" }}>x</HStack>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe(themeVars.spacing.x2);
    expect(el.style.padding).toBe("8px");
  });

  it("applies custom style when gap is omitted", () => {
    const { container } = render(
      <HStack style={{ padding: "12px" }}>x</HStack>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.padding).toBe("12px");
    expect(el.style.gap).toBe("");
  });

  // align
  it("applies different className for different align values", () => {
    const { rerender, container } = render(<HStack align="center">x</HStack>);
    const centerClass = (container.firstChild as HTMLElement).className;
    rerender(<HStack align="start">x</HStack>);
    const startClass = (container.firstChild as HTMLElement).className;
    expect(centerClass).not.toBe(startClass);
  });

  it("all align values produce unique classNames", () => {
    const aligns = ["start", "center", "end", "stretch"] as const;
    const { rerender, container } = render(<HStack align={aligns[0]}>x</HStack>);
    const classes = aligns.map((a) => {
      rerender(<HStack align={a}>x</HStack>);
      return (container.firstChild as HTMLElement).className;
    });
    expect(new Set(classes).size).toBe(aligns.length);
  });

  // justify
  it("applies different className for different justify values", () => {
    const { rerender, container } = render(<HStack justify="between">x</HStack>);
    const betweenClass = (container.firstChild as HTMLElement).className;
    rerender(<HStack justify="center">x</HStack>);
    const centerClass = (container.firstChild as HTMLElement).className;
    expect(betweenClass).not.toBe(centerClass);
  });

  it("all justify values produce unique classNames", () => {
    const justifies = ["start", "center", "end", "between"] as const;
    const { rerender, container } = render(<HStack justify={justifies[0]}>x</HStack>);
    const classes = justifies.map((j) => {
      rerender(<HStack justify={j}>x</HStack>);
      return (container.firstChild as HTMLElement).className;
    });
    expect(new Set(classes).size).toBe(justifies.length);
  });

  // className
  it("merges custom className", () => {
    const { container } = render(<HStack className="my-class">x</HStack>);
    expect((container.firstChild as HTMLElement).className).toContain("my-class");
  });

  it("preserves recipe className when custom className is added", () => {
    const { container: base } = render(<HStack>x</HStack>);
    const { container: withClass } = render(<HStack className="extra">x</HStack>);
    const baseClass = (base.firstChild as HTMLElement).className;
    const withClassStr = (withClass.firstChild as HTMLElement).className;
    expect(withClassStr).toContain(baseClass);
    expect(withClassStr).toContain("extra");
  });

  // native 어트리뷰트
  it("forwards data-testid", () => {
    render(<HStack data-testid="hstack">x</HStack>);
    expect(screen.getByTestId("hstack")).toBeInTheDocument();
  });

  it("forwards aria-label", () => {
    render(<HStack aria-label="레이아웃">x</HStack>);
    expect(screen.getByRole("generic", { name: "레이아웃" })).toBeInTheDocument();
  });

  it("forwards onClick", async () => {
    const onClick = vi.fn();
    render(<HStack data-testid="hstack" onClick={onClick}>x</HStack>);
    screen.getByTestId("hstack").click();
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("VStack", () => {
  it("renders children", () => {
    render(<VStack><span>child</span></VStack>);
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <VStack>
        <span>a</span>
        <span>b</span>
      </VStack>
    );
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
  });

  it("renders as div", () => {
    const { container } = render(<VStack>x</VStack>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders without children", () => {
    const { container } = render(<VStack />);
    expect(container.firstChild).toBeInTheDocument();
  });

  // gap
  it("applies gap via inline style", () => {
    const { container } = render(<VStack gap="x4">x</VStack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe(themeVars.spacing.x4);
  });

  it("does not set gap style when gap is omitted", () => {
    const { container } = render(<VStack>x</VStack>);
    expect((container.firstChild as HTMLElement).style.gap).toBe("");
  });

  it.each([
    ["x1", themeVars.spacing.x1],
    ["x2", themeVars.spacing.x2],
    ["x3", themeVars.spacing.x3],
    ["x4", themeVars.spacing.x4],
    ["x5", themeVars.spacing.x5],
    ["x6", themeVars.spacing.x6],
  ] as const)("gap=%s applies correct token value", (token, expected) => {
    const { container } = render(<VStack gap={token}>x</VStack>);
    expect((container.firstChild as HTMLElement).style.gap).toBe(expected);
  });

  // style 병합
  it("merges custom style with gap", () => {
    const { container } = render(
      <VStack gap="x3" style={{ padding: "16px" }}>x</VStack>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.gap).toBe(themeVars.spacing.x3);
    expect(el.style.padding).toBe("16px");
  });

  it("applies custom style when gap is omitted", () => {
    const { container } = render(
      <VStack style={{ width: "100%" }}>x</VStack>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("100%");
    expect(el.style.gap).toBe("");
  });

  // align
  it("applies different className for different align values", () => {
    const { rerender, container } = render(<VStack align="center">x</VStack>);
    const centerClass = (container.firstChild as HTMLElement).className;
    rerender(<VStack align="end">x</VStack>);
    const endClass = (container.firstChild as HTMLElement).className;
    expect(centerClass).not.toBe(endClass);
  });

  // justify
  it("applies different className for different justify values", () => {
    const { rerender, container } = render(<VStack justify="between">x</VStack>);
    const betweenClass = (container.firstChild as HTMLElement).className;
    rerender(<VStack justify="center">x</VStack>);
    const centerClass = (container.firstChild as HTMLElement).className;
    expect(betweenClass).not.toBe(centerClass);
  });

  // className
  it("merges custom className", () => {
    const { container } = render(<VStack className="v-class">x</VStack>);
    expect((container.firstChild as HTMLElement).className).toContain("v-class");
  });

  // native 어트리뷰트
  it("forwards data-testid", () => {
    render(<VStack data-testid="vstack">x</VStack>);
    expect(screen.getByTestId("vstack")).toBeInTheDocument();
  });

  it("forwards onClick", async () => {
    const onClick = vi.fn();
    render(<VStack data-testid="vstack" onClick={onClick}>x</VStack>);
    screen.getByTestId("vstack").click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  // HStack vs VStack
  it("has different className from HStack (direction differs)", () => {
    const { container: hc } = render(<HStack>x</HStack>);
    const { container: vc } = render(<VStack>x</VStack>);
    expect((hc.firstChild as HTMLElement).className).not.toBe(
      (vc.firstChild as HTMLElement).className
    );
  });
});
