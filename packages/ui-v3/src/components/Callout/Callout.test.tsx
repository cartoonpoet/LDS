import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Callout } from ".";

describe("Callout", () => {
  it("renders children in a note role", () => {
    render(<Callout>자동 갱신 조항이 포함되어 있어요.</Callout>);
    const note = screen.getByRole("note");
    expect(note).toHaveTextContent("자동 갱신 조항이 포함되어 있어요.");
  });

  it("renders title when provided", () => {
    render(<Callout title="계약 검토 안내">본문</Callout>);
    expect(screen.getByText("계약 검토 안내")).toBeInTheDocument();
    expect(screen.getByText("본문")).toBeInTheDocument();
  });

  it("intents produce distinct classNames", () => {
    const intents = ["info", "success", "warning", "danger"] as const;
    const { rerender, container } = render(<Callout intent={intents[0]}>x</Callout>);
    const classes = intents.map((intent) => {
      rerender(<Callout intent={intent}>x</Callout>);
      return (container.firstChild as HTMLElement).className;
    });
    expect(new Set(classes).size).toBe(intents.length);
  });

  it("defaults to info intent", () => {
    const { container: def } = render(<Callout>x</Callout>);
    const { container: info } = render(<Callout intent="info">x</Callout>);
    expect((def.firstChild as HTMLElement).className).toBe(
      (info.firstChild as HTMLElement).className
    );
  });

  it("renders default icon marker, hidden with hideIcon", () => {
    const { container, rerender } = render(<Callout>x</Callout>);
    expect(container.querySelector("[data-callout-icon]")).not.toBeNull();
    rerender(<Callout hideIcon>x</Callout>);
    expect(container.querySelector("[data-callout-icon]")).toBeNull();
  });

  it("renders custom icon instead of default", () => {
    render(<Callout icon={<svg data-testid="custom-icon" />}>x</Callout>);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("merges custom className and forwards attributes", () => {
    render(<Callout className="extra" data-testid="callout">x</Callout>);
    const el = screen.getByTestId("callout");
    expect(el.className).toContain("extra");
  });
});
