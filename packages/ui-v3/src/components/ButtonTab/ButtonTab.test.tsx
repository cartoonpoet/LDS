import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { ButtonTab } from ".";

const items = [
  { value: "a", label: "Tab A" },
  { value: "b", label: "Tab B" },
  { value: "c", label: "Tab C", disabled: true },
];

describe("ButtonTab", () => {
  it("renders all tabs", () => {
    renderWithUser(<ButtonTab items={items} value="a" onChange={() => {}} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("marks active tab", () => {
    renderWithUser(<ButtonTab items={items} value="a" onChange={() => {}} />);
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute("aria-selected", "true");
  });

  it("calls onChange on click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(<ButtonTab items={items} value="a" onChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("disables tab when item.disabled is true", () => {
    renderWithUser(<ButtonTab items={items} value="a" onChange={() => {}} />);
    expect(screen.getByRole("tab", { name: "Tab C" })).toBeDisabled();
  });
});
