import { describe, it, expect } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Slider, RangeSlider } from ".";

describe("Slider", () => {
  it("renders slider", () => {
    const { container } = renderWithUser(<Slider value={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows value badge when showValue is true", () => {
    renderWithUser(<Slider value={30} showValue />);
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("renders ticks when showTicks is true", () => {
    const { container } = renderWithUser(<Slider value={50} showTicks />);
    const ticks = container.querySelectorAll("[class*='tick']");
    expect(ticks.length).toBeGreaterThan(0);
  });

  it("renders labels when showLabels is true", () => {
    renderWithUser(<Slider value={50} min={0} max={100} showLabels />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("applies disabled style", () => {
    const { container } = renderWithUser(<Slider value={50} disabled />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.opacity).toBe("0.5");
  });
});

describe("RangeSlider", () => {
  it("renders range slider with two thumbs", () => {
    const { container } = renderWithUser(<RangeSlider value={[20, 80]} />);
    const thumbs = container.querySelectorAll("[class*='thumb']");
    expect(thumbs.length).toBe(2);
  });

  it("shows both value badges when showValue is true", () => {
    renderWithUser(<RangeSlider value={[25, 75]} showValue />);
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("applies disabled style", () => {
    const { container } = renderWithUser(<RangeSlider value={[20, 80]} disabled />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.opacity).toBe("0.5");
  });
});
