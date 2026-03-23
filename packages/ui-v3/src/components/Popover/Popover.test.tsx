import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Popover } from ".";

describe("Popover", () => {
  it("renders trigger element", () => {
    renderWithUser(
      <Popover content="Popover body">
        <button>Trigger</button>
      </Popover>,
    );
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("shows popover on trigger click", async () => {
    const { user } = renderWithUser(
      <Popover content="Popover body">
        <button>Trigger</button>
      </Popover>,
    );
    await user.click(screen.getByText("Trigger"));
    expect(screen.getByText("Popover body")).toBeInTheDocument();
  });

  it("hides popover on second trigger click", async () => {
    const { user } = renderWithUser(
      <Popover content="Popover body">
        <button>Trigger</button>
      </Popover>,
    );
    await user.click(screen.getByText("Trigger"));
    expect(screen.getByText("Popover body")).toBeInTheDocument();
    await user.click(screen.getByText("Trigger"));
    expect(screen.queryByText("Popover body")).not.toBeInTheDocument();
  });

  it("renders title when provided", async () => {
    const { user } = renderWithUser(
      <Popover title="제목" content="Body">
        <button>Trigger</button>
      </Popover>,
    );
    await user.click(screen.getByText("Trigger"));
    expect(screen.getByText("제목")).toBeInTheDocument();
  });

  it("renders confirm and cancel buttons", async () => {
    const { user } = renderWithUser(
      <Popover content="Body" confirmText="확인" cancelText="취소">
        <button>Trigger</button>
      </Popover>,
    );
    await user.click(screen.getByText("Trigger"));
    expect(screen.getByText("확인")).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
  });

  it("calls onConfirm and closes on confirm click", async () => {
    const onConfirm = vi.fn();
    const { user } = renderWithUser(
      <Popover content="Body" confirmText="확인" onConfirm={onConfirm}>
        <button>Trigger</button>
      </Popover>,
    );
    await user.click(screen.getByText("Trigger"));
    await user.click(screen.getByText("확인"));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });

  it("calls onCancel and closes on cancel click", async () => {
    const onCancel = vi.fn();
    const { user } = renderWithUser(
      <Popover content="Body" cancelText="취소" onCancel={onCancel}>
        <button>Trigger</button>
      </Popover>,
    );
    await user.click(screen.getByText("Trigger"));
    await user.click(screen.getByText("취소"));
    expect(onCancel).toHaveBeenCalledOnce();
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const { user } = renderWithUser(
      <Popover content="Body">
        <button>Trigger</button>
      </Popover>,
    );
    await user.click(screen.getByText("Trigger"));
    expect(screen.getByText("Body")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });

  it("supports controlled open state", () => {
    renderWithUser(
      <Popover content="Body" open={true} onOpenChange={() => {}}>
        <button>Trigger</button>
      </Popover>,
    );
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
});
