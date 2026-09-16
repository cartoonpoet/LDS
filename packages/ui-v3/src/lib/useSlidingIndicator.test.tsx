import { useRef } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "../test/utils";
import { useSlidingIndicator } from "./useSlidingIndicator";

/* jsdom은 실제 레이아웃을 계산하지 않으므로 offsetLeft/offsetWidth를 직접 지정 */
function stubOffsets(el: HTMLElement, left: number, width: number) {
  Object.defineProperty(el, "offsetLeft", { configurable: true, value: left });
  Object.defineProperty(el, "offsetWidth", { configurable: true, value: width });
}

function Harness({ activeIndex, onStub }: { activeIndex: number; onStub?: (container: HTMLDivElement) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rect = useSlidingIndicator(containerRef, activeIndex);

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (el) onStub?.(el);
      }}
    >
      <button data-slide-item>A</button>
      <button data-slide-item>B</button>
      <button data-slide-item>C</button>
      <div data-testid="rect">{rect ? `${rect.left},${rect.width}` : "null"}</div>
    </div>
  );
}

describe("useSlidingIndicator", () => {
  it("returns null when there is no active index", () => {
    render(<Harness activeIndex={-1} />);
    expect(screen.getByTestId("rect")).toHaveTextContent("null");
  });

  it("measures the active item's offsetLeft/offsetWidth", () => {
    render(
      <Harness
        activeIndex={1}
        onStub={(container) => {
          const items = container.querySelectorAll<HTMLElement>("[data-slide-item]");
          stubOffsets(items[0], 0, 40);
          stubOffsets(items[1], 40, 50);
          stubOffsets(items[2], 90, 30);
        }}
      />,
    );
    expect(screen.getByTestId("rect")).toHaveTextContent("40,50");
  });

  it("returns null when the active index is out of range", () => {
    render(<Harness activeIndex={5} />);
    expect(screen.getByTestId("rect")).toHaveTextContent("null");
  });
});
