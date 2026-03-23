import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Skeleton } from ".";

describe("Skeleton", () => {
  it("renders rect variant by default", () => {
    const { container } = render(<Skeleton width={200} height={16} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders circle variant", () => {
    const { container } = render(<Skeleton variant="circle" width={40} height={40} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders text variant with multiple lines", () => {
    const { container } = render(<Skeleton variant="text" lines={4} />);
    const wrapper = container.firstChild as HTMLElement;
    // 4 lines rendered
    expect(wrapper.children.length).toBe(4);
  });

  it("applies width and height style", () => {
    const { container } = render(<Skeleton width={120} height={80} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("120px");
    expect(el.style.height).toBe("80px");
  });

  it("accepts string width", () => {
    const { container } = render(<Skeleton width="50%" height={16} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("50%");
  });
});

describe("Skeleton.Content", () => {
  it("shows fallback when loading", () => {
    render(
      <Skeleton.Content loading={true} fallback={<div data-testid="skeleton">Loading</div>}>
        <div data-testid="content">Content</div>
      </Skeleton.Content>,
    );
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("shows children when not loading", () => {
    render(
      <Skeleton.Content loading={false} fallback={<div data-testid="skeleton">Loading</div>}>
        <div data-testid="content">Content</div>
      </Skeleton.Content>,
    );
    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});
