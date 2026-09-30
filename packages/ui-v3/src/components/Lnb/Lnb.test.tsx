import { describe, it, expect, vi } from "vitest";
import { render, renderWithUser, screen } from "../../test/utils";
import { Lnb } from ".";
import type { LnbItem } from ".";

const items: LnbItem[] = [
  {
    value: "home",
    label: "홈",
    icon: <svg data-testid="home-icon" />,
    children: [
      { value: "my-status", label: "나의 현황" },
      { value: "search", label: "통합검색", href: "/search" },
    ],
  },
  { value: "contract", label: "계약", href: "/contracts" },
  { value: "litigation", label: "송무" },
  {
    value: "system",
    label: "시스템 관리",
    children: [{ value: "system-user", label: "사용자 관리" }],
  },
];

describe("Lnb", () => {
  it("renders a navigation landmark with default label", () => {
    render(<Lnb items={items} />);
    expect(screen.getByRole("navigation", { name: "메뉴" })).toBeInTheDocument();
  });

  it("renders leaf with href as link, otherwise button", () => {
    render(<Lnb items={items} />);
    expect(screen.getByRole("link", { name: "계약" })).toHaveAttribute("href", "/contracts");
    expect(screen.getByRole("button", { name: "송무" })).toBeInTheDocument();
  });

  it("marks current leaf with aria-current=page", () => {
    render(<Lnb items={items} value="litigation" />);
    expect(screen.getByRole("button", { name: "송무" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "계약" })).not.toHaveAttribute("aria-current");
  });

  it("opens the group containing the current value by default", () => {
    render(<Lnb items={items} value="my-status" />);
    expect(screen.getByRole("button", { name: "홈" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "나의 현황" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "통합검색" })).toHaveAttribute("href", "/search");
  });

  it("keeps groups closed when no current value is inside", () => {
    render(<Lnb items={items} value="contract" />);
    expect(screen.getByRole("button", { name: "홈" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("나의 현황")).not.toBeInTheDocument();
  });

  it("toggles group and keeps only one group open", async () => {
    const onOpenChange = vi.fn();
    const { user } = renderWithUser(<Lnb items={items} onOpenChange={onOpenChange} />);
    await user.click(screen.getByRole("button", { name: "홈" }));
    expect(screen.getByText("나의 현황")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "시스템 관리" }));
    expect(screen.queryByText("나의 현황")).not.toBeInTheDocument();
    expect(screen.getByText("사용자 관리")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "시스템 관리" }));
    expect(screen.queryByText("사용자 관리")).not.toBeInTheDocument();
    expect(onOpenChange.mock.calls).toEqual([["home"], ["system"], [null]]);
  });

  it("calls onSelect for leaf and sub items", async () => {
    const onSelect = vi.fn();
    const { user } = renderWithUser(<Lnb items={items} defaultOpenValue="home" onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "송무" }));
    await user.click(screen.getByRole("button", { name: "나의 현황" }));
    expect(onSelect.mock.calls).toEqual([["litigation"], ["my-status"]]);
  });

  it("does not call onSelect when toggling a group", async () => {
    const onSelect = vi.fn();
    const { user } = renderWithUser(<Lnb items={items} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "홈" }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("toggle button collapses and expands (uncontrolled)", async () => {
    const onCollapsedChange = vi.fn();
    const { user } = renderWithUser(<Lnb items={items} onCollapsedChange={onCollapsedChange} />);
    await user.click(screen.getByRole("button", { name: "메뉴 접기" }));
    expect(screen.getByRole("button", { name: "메뉴 펼치기" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("송무")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "송무" })).toHaveAttribute("title", "송무");
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });

  it("collapsed hides sub menu even if its group is open", () => {
    render(<Lnb items={items} value="my-status" collapsed />);
    expect(screen.queryByRole("button", { name: "나의 현황" })).not.toBeInTheDocument();
  });

  it("clicking a group while collapsed expands and opens it", async () => {
    const onCollapsedChange = vi.fn();
    const { user } = renderWithUser(
      <Lnb items={items} defaultCollapsed onCollapsedChange={onCollapsedChange} />
    );
    await user.click(screen.getByRole("button", { name: "시스템 관리" }));
    expect(onCollapsedChange).toHaveBeenCalledWith(false);
    expect(screen.getByText("사용자 관리")).toBeInTheDocument();
  });

  it("respects controlled collapsed", async () => {
    const onCollapsedChange = vi.fn();
    const { user } = renderWithUser(
      <Lnb items={items} collapsed={false} onCollapsedChange={onCollapsedChange} />
    );
    await user.click(screen.getByRole("button", { name: "메뉴 접기" }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button", { name: "메뉴 접기" })).toBeInTheDocument();
  });

  it("shows logo when expanded and collapsedLogo when collapsed", () => {
    const { rerender } = render(<Lnb items={items} logo="LOGO" collapsedLogo="SYM" />);
    expect(screen.getByText("LOGO")).toBeInTheDocument();
    rerender(<Lnb items={items} logo="LOGO" collapsedLogo="SYM" collapsed />);
    expect(screen.getByText("SYM")).toBeInTheDocument();
    expect(screen.queryByText("LOGO")).not.toBeInTheDocument();
  });

  it("renders item icons as decorative", () => {
    render(<Lnb items={items} />);
    expect(screen.getByTestId("home-icon").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards className and aria-label", () => {
    render(<Lnb items={items} className="custom" aria-label="업무 메뉴" />);
    expect(screen.getByRole("navigation", { name: "업무 메뉴" })).toHaveClass("custom");
  });
});
