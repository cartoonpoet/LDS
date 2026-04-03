import { describe, it, expect } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { QuickMenuItem } from ".";

describe("QuickMenuItem", () => {
  it("renders icon and label", () => {
    renderWithUser(<QuickMenuItem icon={<span>IC</span>} label="계약" />);
    expect(screen.getByText("IC")).toBeInTheDocument();
    expect(screen.getByText("계약")).toBeInTheDocument();
  });

  it("applies active styles when active prop is true", () => {
    const { container } = renderWithUser(
      <QuickMenuItem icon={<span>IC</span>} label="계약" active />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("quickMenuItemActive");
  });

  it("does not apply active styles by default", () => {
    const { container } = renderWithUser(
      <QuickMenuItem icon={<span>IC</span>} label="계약" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).not.toContain("quickMenuItemActive");
  });
});
