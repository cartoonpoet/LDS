import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { ButtonGroup } from ".";

const items = [
  { value: "a", label: "Left" },
  { value: "b", label: "Center" },
  { value: "c", label: "Right" },
];

describe("ButtonGroup", () => {
  it("renders all items", () => {
    renderWithUser(<ButtonGroup items={items} value="a" onChange={() => {}} />);
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("marks active item with aria-pressed", () => {
    renderWithUser(<ButtonGroup items={items} value="b" onChange={() => {}} />);
    expect(screen.getByText("Center").closest("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onChange on click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(<ButtonGroup items={items} value="a" onChange={onChange} />);
    await user.click(screen.getByText("Right"));
    expect(onChange).toHaveBeenCalledWith("c");
  });

  it("supports segmented variant", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <ButtonGroup items={items} value="b" onChange={onChange} variant="segmented" />,
    );

    expect(screen.getByText("Center").closest("button")).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByText("Right"));
    expect(onChange).toHaveBeenCalledWith("c");
  });
});
