import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { AutoComplete } from ".";

const options = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
  { value: "c", label: "Cherry" },
];

describe("AutoComplete", () => {
  it("renders input with placeholder", () => {
    renderWithUser(<AutoComplete options={options} placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("has combobox role", () => {
    renderWithUser(<AutoComplete options={options} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows filtered options when typing", async () => {
    const { user } = renderWithUser(<AutoComplete options={options} placeholder="Search" />);
    const input = screen.getByRole("combobox");
    await user.type(input, "app");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  });

  it("calls onChange when option clicked", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <AutoComplete options={options} onChange={onChange} placeholder="Search" />,
    );
    const input = screen.getByRole("combobox");
    await user.type(input, "Ban");
    await user.click(screen.getByText("Banana"));
    expect(onChange).toHaveBeenCalledWith("b", { value: "b", label: "Banana" });
  });

  it("closes panel after selection", async () => {
    const { user } = renderWithUser(<AutoComplete options={options} placeholder="Search" />);
    const input = screen.getByRole("combobox");
    await user.type(input, "Ch");
    await user.click(screen.getByText("Cherry"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows no result text when no match", async () => {
    const { user } = renderWithUser(
      <AutoComplete options={options} noResultText="No results" placeholder="Search" />,
    );
    await user.type(screen.getByRole("combobox"), "xyz");
    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("keyboard: ArrowDown/Up navigates, Enter selects", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <AutoComplete options={options} onChange={onChange} placeholder="Search" />,
    );
    const input = screen.getByRole("combobox");
    await user.type(input, "a");
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenCalledWith("b", { value: "b", label: "Banana" });
  });

  it("keyboard: Escape closes the panel", async () => {
    const { user } = renderWithUser(<AutoComplete options={options} placeholder="Search" />);
    const input = screen.getByRole("combobox");
    await user.type(input, "a");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows initial value label", () => {
    renderWithUser(<AutoComplete options={options} value="b" />);
    expect(screen.getByRole("combobox")).toHaveValue("Banana");
  });

  it("disabled state prevents interaction", () => {
    renderWithUser(<AutoComplete options={options} disabled placeholder="Search" />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("calls onInputChange when typing", async () => {
    const onInputChange = vi.fn();
    const { user } = renderWithUser(
      <AutoComplete options={options} onInputChange={onInputChange} placeholder="Search" />,
    );
    await user.type(screen.getByRole("combobox"), "test");
    expect(onInputChange).toHaveBeenCalledWith("t");
    expect(onInputChange).toHaveBeenCalledWith("te");
    expect(onInputChange).toHaveBeenCalledWith("tes");
    expect(onInputChange).toHaveBeenCalledWith("test");
  });

  /* ─── multiple mode ─── */

  it("multiple: shows badges for selected values", () => {
    renderWithUser(
      <AutoComplete options={options} multiple value={["a", "b"]} placeholder="Search" />,
    );
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("multiple: adds value on option click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <AutoComplete options={options} multiple value={["a"]} onChange={onChange} placeholder="Search" />,
    );
    const input = screen.getByRole("combobox");
    await user.type(input, "Ch");
    await user.click(screen.getByText("Cherry"));
    expect(onChange).toHaveBeenCalledWith(["a", "c"], { value: "c", label: "Cherry" });
  });

  it("multiple: removes badge on X click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <AutoComplete options={options} multiple value={["a", "b"]} onChange={onChange} placeholder="Search" />,
    );
    const removeBtn = screen.getByLabelText("Apple 제거");
    await user.click(removeBtn);
    expect(onChange).toHaveBeenCalledWith(["b"], { value: "a", label: "Apple" });
  });

  it("multiple: hides already selected options from dropdown", async () => {
    const { user } = renderWithUser(
      <AutoComplete options={options} multiple value={["a"]} placeholder="Search" />,
    );
    await user.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("option", { name: "Apple" })).not.toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });
});
