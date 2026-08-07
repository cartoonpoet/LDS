import { describe, it, expect, vi } from "vitest";
import { renderWithUser, render, screen } from "../../test/utils";
import { Breadcrumb } from ".";

const items = [
  { label: "홈", href: "/" },
  { label: "계약", href: "/contracts" },
  { label: "계약 상세" },
];

describe("Breadcrumb", () => {
  it("renders nav with aria-label and list semantics", () => {
    render(<Breadcrumb items={items} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders intermediate items as links with href", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole("link", { name: "홈" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "계약" })).toHaveAttribute("href", "/contracts");
  });

  it("renders last item as current page, not a link", () => {
    render(<Breadcrumb items={items} />);
    const current = screen.getByText("계약 상세");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).not.toBe("A");
    expect(screen.queryByRole("link", { name: "계약 상세" })).not.toBeInTheDocument();
  });

  it("calls onClick when an item is clicked", async () => {
    const onClick = vi.fn((e) => e.preventDefault());
    const { user } = renderWithUser(
      <Breadcrumb
        items={[
          { label: "홈", href: "/", onClick },
          { label: "현재" },
        ]}
      />,
    );
    await user.click(screen.getByRole("link", { name: "홈" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders default separator between items", () => {
    render(<Breadcrumb items={items} />);
    // 3개 항목 → 구분자 2개
    expect(screen.getAllByText("/", { selector: "[aria-hidden]" })).toHaveLength(2);
  });

  it("renders custom separator", () => {
    render(<Breadcrumb items={items} separator=">" />);
    expect(screen.getAllByText(">", { selector: "[aria-hidden]" })).toHaveLength(2);
  });
});
