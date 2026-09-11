import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { EmptyState } from ".";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="조회된 사건이 없어요" />);
    expect(screen.getByText("조회된 사건이 없어요")).toBeInTheDocument();
  });

  it("renders description and action when provided", () => {
    render(
      <EmptyState
        title="비어 있음"
        description="필터를 조정하세요."
        action={<button>사건 등록</button>}
      />
    );
    expect(screen.getByText("필터를 조정하세요.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "사건 등록" })).toBeInTheDocument();
  });

  it("renders icon slot", () => {
    render(<EmptyState title="t" icon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("omits optional slots when not provided", () => {
    const { container } = render(<EmptyState title="t" />);
    expect(container.querySelectorAll("div").length).toBeGreaterThan(0);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("merges custom className and forwards attributes", () => {
    render(<EmptyState title="t" className="extra" data-testid="empty" />);
    expect(screen.getByTestId("empty").className).toContain("extra");
  });
});
