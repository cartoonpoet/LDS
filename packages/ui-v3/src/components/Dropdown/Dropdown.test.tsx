import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Dropdown } from ".";

const options = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
  { value: "c", label: "Cherry", disabled: true },
];

describe("Dropdown", () => {
  it("renders trigger with placeholder", () => {
    renderWithUser(<Dropdown options={options} placeholder="과일 선택" />);
    expect(screen.getByText("과일 선택")).toBeInTheDocument();
  });

  it("opens panel on trigger click", async () => {
    const { user } = renderWithUser(<Dropdown options={options} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("closes panel on second trigger click", async () => {
    const { user } = renderWithUser(<Dropdown options={options} />);
    const trigger = screen.getByRole("button");
    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("selects an option and closes (single mode)", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <Dropdown options={options} onChange={onChange} />,
    );
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(onChange).toHaveBeenCalledWith("a");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows selected label in trigger", async () => {
    const { user } = renderWithUser(<Dropdown options={options} />);
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("option", { name: "Banana" }));
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("supports controlled value", () => {
    renderWithUser(
      <Dropdown options={options} value="b" onChange={() => {}} />,
    );
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("supports multiple selection", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <Dropdown options={options} multiple onChange={onChange} />,
    );
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("option", { name: "Apple" }));
    expect(onChange).toHaveBeenCalledWith(["a"]);

    // Panel stays open in multiple mode
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("renders panelHeader in multiple mode", async () => {
    const { user } = renderWithUser(
      <Dropdown options={options} multiple panelHeader="과일을 선택하세요" />,
    );
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("과일을 선택하세요")).toBeInTheDocument();
  });

  it("does not open when disabled", async () => {
    const { user } = renderWithUser(
      <Dropdown options={options} disabled />,
    );
    await user.click(screen.getByRole("button"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const { user } = renderWithUser(<Dropdown options={options} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("marks selected option with aria-selected", async () => {
    const { user } = renderWithUser(
      <Dropdown options={options} value="a" onChange={() => {}} />,
    );
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("option", { name: "Apple" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("option", { name: "Banana" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("has aria-haspopup='listbox' on trigger", () => {
    renderWithUser(<Dropdown options={options} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "listbox");
  });
});
