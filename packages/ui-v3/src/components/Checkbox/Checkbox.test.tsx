import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Checkbox } from ".";

describe("Checkbox", () => {
  it("renders an unchecked checkbox by default", () => {
    renderWithUser(<Checkbox />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders as checked when checked prop is true", () => {
    renderWithUser(<Checkbox checked onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("renders label text", () => {
    renderWithUser(<Checkbox label="동의합니다" />);
    expect(screen.getByText("동의합니다")).toBeInTheDocument();
  });

  it("toggles via label click and fires onCheckedChange", async () => {
    const onCheckedChange = vi.fn();
    const { user } = renderWithUser(
      <Checkbox checked={false} onCheckedChange={onCheckedChange} label="Agree" />,
    );
    await user.click(screen.getByText("Agree"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("fires native onChange alongside onCheckedChange", async () => {
    const onChange = vi.fn();
    const onCheckedChange = vi.fn();
    const { user } = renderWithUser(
      <Checkbox checked={false} onChange={onChange} onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is disabled and prevents interaction", async () => {
    const onCheckedChange = vi.fn();
    const { user } = renderWithUser(
      <Checkbox disabled onCheckedChange={onCheckedChange} label="Disabled" />,
    );
    expect(screen.getByRole("checkbox")).toBeDisabled();
    await user.click(screen.getByText("Disabled"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("merges custom className", () => {
    const { container } = renderWithUser(<Checkbox className="custom" />);
    expect(container.querySelector(".custom")).toBeInTheDocument();
  });
});
