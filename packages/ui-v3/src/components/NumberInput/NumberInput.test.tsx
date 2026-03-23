import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { NumberInput } from ".";

describe("NumberInput", () => {
  it("renders current value", () => {
    renderWithUser(<NumberInput value={5} />);
    expect(screen.getByLabelText("수량")).toHaveValue("5");
  });

  it("increments value on + button click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <NumberInput value={3} onChange={onChange} />,
    );
    await user.click(screen.getByLabelText("증가"));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("decrements value on - button click", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <NumberInput value={3} onChange={onChange} />,
    );
    await user.click(screen.getByLabelText("감소"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("respects step value", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <NumberInput value={10} onChange={onChange} step={5} />,
    );
    await user.click(screen.getByLabelText("증가"));
    expect(onChange).toHaveBeenCalledWith(15);
  });

  it("clamps to min value", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <NumberInput value={1} onChange={onChange} min={0} />,
    );
    await user.click(screen.getByLabelText("감소"));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("clamps to max value", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <NumberInput value={9} onChange={onChange} max={10} />,
    );
    await user.click(screen.getByLabelText("증가"));
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("disables - button at min", () => {
    renderWithUser(<NumberInput value={0} min={0} />);
    expect(screen.getByLabelText("감소")).toBeDisabled();
  });

  it("disables + button at max", () => {
    renderWithUser(<NumberInput value={100} max={100} />);
    expect(screen.getByLabelText("증가")).toBeDisabled();
  });

  it("disables all controls when disabled", () => {
    renderWithUser(<NumberInput value={5} disabled />);
    expect(screen.getByLabelText("감소")).toBeDisabled();
    expect(screen.getByLabelText("증가")).toBeDisabled();
    expect(screen.getByLabelText("수량")).toBeDisabled();
  });

  it("handles direct input change", async () => {
    const onChange = vi.fn();
    const { user } = renderWithUser(
      <NumberInput value={0} onChange={onChange} />,
    );
    const input = screen.getByLabelText("수량");
    await user.clear(input);
    await user.type(input, "7");
    expect(onChange).toHaveBeenCalledWith(7);
  });
});
