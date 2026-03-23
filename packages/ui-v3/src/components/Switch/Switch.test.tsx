import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Switch } from ".";

describe("Switch", () => {
  it("renders an unchecked switch by default", () => {
    renderWithUser(<Switch />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders as checked when checked prop is true", () => {
    renderWithUser(<Switch checked onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("renders label text", () => {
    renderWithUser(<Switch label="알림 설정" />);
    expect(screen.getByText("알림 설정")).toBeInTheDocument();
  });

  it("fires onCheckedChange on click", async () => {
    const onCheckedChange = vi.fn();
    const { user } = renderWithUser(
      <Switch checked={false} onCheckedChange={onCheckedChange} label="Toggle" />,
    );
    await user.click(screen.getByText("Toggle"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("fires native onChange alongside onCheckedChange", async () => {
    const onChange = vi.fn();
    const onCheckedChange = vi.fn();
    const { user } = renderWithUser(
      <Switch checked={false} onChange={onChange} onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("is disabled and prevents interaction", async () => {
    const onCheckedChange = vi.fn();
    const { user } = renderWithUser(
      <Switch disabled onCheckedChange={onCheckedChange} />,
    );
    expect(screen.getByRole("checkbox")).toBeDisabled();
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
