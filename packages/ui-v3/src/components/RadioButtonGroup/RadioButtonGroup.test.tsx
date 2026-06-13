import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { RadioButtonGroup } from ".";

const items = [
  { value: "a", label: "Left" },
  { value: "b", label: "Center" },
  { value: "c", label: "Right" },
];

describe("RadioButtonGroup", () => {
  it("renders all item labels", () => {
    renderWithUser(<RadioButtonGroup items={items} value="a" onChange={() => {}} />);
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Center")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("non-active items have aria-checked=false", () => {
    renderWithUser(<RadioButtonGroup items={items} value="a" onChange={() => {}} />);
    expect(screen.getByText("Center").closest("button")).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange with correct value on click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <RadioButtonGroup items={items} value="a" onChange={onChange} />,
    );
    await user.click(screen.getByText("Right"));
    expect(onChange).toHaveBeenCalledWith("c");
  });

  it("selected item has aria-checked=true", () => {
    renderWithUser(<RadioButtonGroup items={items} value="b" onChange={() => {}} />);
    expect(screen.getByText("Center").closest("button")).toHaveAttribute("aria-checked", "true");
  });

  it("has role=radiogroup on container", () => {
    renderWithUser(<RadioButtonGroup items={items} value="a" onChange={() => {}} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("items have role=radio", () => {
    renderWithUser(<RadioButtonGroup items={items} value="a" onChange={() => {}} />);
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
  });

  it("renders outline variant without error", () => {
    renderWithUser(
      <RadioButtonGroup items={items} value="b" variant="outline" onChange={() => {}} />,
    );
    expect(screen.getByText("Center").closest("button")).toHaveAttribute("aria-checked", "true");
  });

  it("renders subtle variant without error", () => {
    renderWithUser(
      <RadioButtonGroup items={items} value="b" variant="subtle" onChange={() => {}} />,
    );
    expect(screen.getByText("Center").closest("button")).toHaveAttribute("aria-checked", "true");
  });
});
