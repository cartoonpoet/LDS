import { describe, it, expect } from "vitest";
import { render, screen } from "../test/utils";
import { Portal } from "./Portal";

describe("Portal", () => {
  it("renders children into document.body", () => {
    render(
      <Portal>
        <div data-testid="portal-content">Hello</div>
      </Portal>,
    );
    expect(screen.getByTestId("portal-content")).toBeInTheDocument();
    expect(screen.getByTestId("portal-content").parentElement).toBe(document.body);
  });

  it("renders children into a custom container", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    render(
      <Portal container={container}>
        <span data-testid="custom">Custom</span>
      </Portal>,
    );

    expect(screen.getByTestId("custom").parentElement).toBe(container);
    document.body.removeChild(container);
  });

  it("does not render on server (first render returns null)", () => {
    const { container } = render(
      <Portal>
        <span>Content</span>
      </Portal>,
    );
    // After useEffect, content is portaled to body, not inside the render container
    expect(container.innerHTML).toBe("");
  });
});
