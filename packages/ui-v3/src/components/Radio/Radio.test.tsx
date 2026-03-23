import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Radio, RadioGroup } from ".";

describe("Radio", () => {
  it("renders an unchecked radio by default", () => {
    renderWithUser(<Radio label="Option" />);
    expect(screen.getByRole("radio")).not.toBeChecked();
  });

  it("renders as checked when checked prop is true", () => {
    renderWithUser(<Radio checked label="Option" onChange={() => {}} />);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("renders label text", () => {
    renderWithUser(<Radio label="옵션 A" />);
    expect(screen.getByText("옵션 A")).toBeInTheDocument();
  });

  it("fires onCheckedChange on click", async () => {
    const onCheckedChange = vi.fn();
    const { user } = renderWithUser(
      <Radio checked={false} onCheckedChange={onCheckedChange} label="Click me" />,
    );
    await user.click(screen.getByText("Click me"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is disabled and prevents interaction", async () => {
    const onCheckedChange = vi.fn();
    const { user } = renderWithUser(
      <Radio disabled onCheckedChange={onCheckedChange} label="Disabled" />,
    );
    expect(screen.getByRole("radio")).toBeDisabled();
    await user.click(screen.getByText("Disabled"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});

describe("RadioGroup", () => {
  it("has role='radiogroup'", () => {
    renderWithUser(
      <RadioGroup value="a" onChange={() => {}}>
        <Radio value="a" label="A" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("selects the correct radio based on group value", () => {
    renderWithUser(
      <RadioGroup value="b" onChange={() => {}}>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>,
    );
    expect(screen.getByLabelText("A")).not.toBeChecked();
    expect(screen.getByLabelText("B")).toBeChecked();
  });

  it("calls onChange with the clicked radio value", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <RadioGroup value="a" onChange={onChange}>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>,
    );
    await user.click(screen.getByLabelText("B"));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("propagates disabled to all children", () => {
    renderWithUser(
      <RadioGroup value="a" onChange={() => {}} disabled>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
      </RadioGroup>,
    );
    expect(screen.getByLabelText("A")).toBeDisabled();
    expect(screen.getByLabelText("B")).toBeDisabled();
  });

  it("sets name attribute on all radios", () => {
    renderWithUser(
      <RadioGroup name="plan" value="free" onChange={() => {}}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    const radios = screen.getAllByRole("radio");
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute("name", "plan");
    });
  });
});
