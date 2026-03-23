import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { IconButtonGroup } from ".";

const items = [
  { value: "list", icon: <span>L</span>, "aria-label": "리스트" },
  { value: "grid", icon: <span>G</span>, "aria-label": "그리드" },
];

describe("IconButtonGroup", () => {
  it("renders all icon buttons", () => {
    renderWithUser(<IconButtonGroup items={items} value="list" onChange={() => {}} />);
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByLabelText("리스트")).toBeInTheDocument();
    expect(screen.getByLabelText("그리드")).toBeInTheDocument();
  });

  it("marks active item with aria-pressed", () => {
    renderWithUser(<IconButtonGroup items={items} value="grid" onChange={() => {}} />);
    expect(screen.getByLabelText("그리드")).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onChange on click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <IconButtonGroup items={items} value="list" onChange={onChange} />,
    );
    await user.click(screen.getByLabelText("그리드"));
    expect(onChange).toHaveBeenCalledWith("grid");
  });
});
