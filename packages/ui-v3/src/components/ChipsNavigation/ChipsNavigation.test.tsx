import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { ChipsNavigation } from ".";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

describe("ChipsNavigation", () => {
  it("renders all chips and 'All' button", () => {
    renderWithUser(<ChipsNavigation items={items} value="" onChange={() => {}} />);
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
  });

  it("calls onChange with key on chip click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <ChipsNavigation items={items} value="" onChange={onChange} />,
    );
    await user.click(screen.getByText("Vue"));
    expect(onChange).toHaveBeenCalledWith("vue");
  });

  it("clears selection on All click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <ChipsNavigation items={items} value="react" onChange={onChange} />,
    );
    await user.click(screen.getByText("All"));
    expect(onChange).toHaveBeenCalledWith("");
  });
});
