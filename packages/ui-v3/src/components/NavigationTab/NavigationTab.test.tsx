import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { NavigationTab } from ".";

const items = [
  { value: "home", label: "Home" },
  { value: "settings", label: "Settings" },
];

describe("NavigationTab", () => {
  it("renders all tabs", () => {
    renderWithUser(<NavigationTab items={items} value="home" onChange={() => {}} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
  });

  it("marks active tab", () => {
    renderWithUser(<NavigationTab items={items} value="settings" onChange={() => {}} />);
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveAttribute("aria-selected", "true");
  });

  it("calls onChange on click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(<NavigationTab items={items} value="home" onChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: "Settings" }));
    expect(onChange).toHaveBeenCalledWith("settings");
  });
});
