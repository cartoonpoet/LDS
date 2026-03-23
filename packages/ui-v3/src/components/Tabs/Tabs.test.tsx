import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Tabs } from ".";

const items = [
  { value: "a", label: "Tab A" },
  { value: "b", label: "Tab B", badge: 5 },
  { value: "c", label: "Tab C" },
];

describe("Tabs", () => {
  it("renders all tab items", () => {
    renderWithUser(<Tabs items={items} value="a" onChange={() => {}} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("marks active tab with aria-selected", () => {
    renderWithUser(<Tabs items={items} value="b" onChange={() => {}} />);
    expect(screen.getByRole("tab", { name: /Tab B/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: /Tab A/ })).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange with value on tab click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(<Tabs items={items} value="a" onChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: /Tab C/ }));
    expect(onChange).toHaveBeenCalledWith("c");
  });

  it("renders badge when provided", () => {
    renderWithUser(<Tabs items={items} value="a" onChange={() => {}} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
