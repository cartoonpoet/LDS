import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { SweetAlert } from ".";

describe("SweetAlert", () => {
  it("renders nothing when open is false", () => {
    renderWithUser(
      <SweetAlert open={false} onClose={vi.fn()} title="Title" />,
    );
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("renders alertdialog when open is true", () => {
    renderWithUser(
      <SweetAlert open={true} onClose={vi.fn()} title="Title" />,
    );
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getByRole("alertdialog")).toHaveAttribute("aria-modal", "true");
  });

  it("renders title", () => {
    renderWithUser(
      <SweetAlert open={true} onClose={vi.fn()} title="삭제하시겠습니까?" />,
    );
    expect(screen.getByText("삭제하시겠습니까?")).toBeInTheDocument();
  });

  it("renders body content", () => {
    renderWithUser(
      <SweetAlert open={true} onClose={vi.fn()} title="Title">
        <p>설명 텍스트</p>
      </SweetAlert>,
    );
    expect(screen.getByText("설명 텍스트")).toBeInTheDocument();
  });

  it("renders confirm and cancel buttons", () => {
    renderWithUser(
      <SweetAlert
        open={true}
        onClose={vi.fn()}
        title="Title"
        confirmLabel="확인"
        cancelLabel="취소"
      />,
    );
    expect(screen.getByText("확인")).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
  });

  it("calls onConfirm on confirm button click", async () => {
    const onConfirm = vi.fn();
    const { user } = renderWithUser(
      <SweetAlert
        open={true}
        onClose={vi.fn()}
        title="Title"
        confirmLabel="확인"
        onConfirm={onConfirm}
      />,
    );
    await user.click(screen.getByText("확인"));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls onCancel on cancel button click", async () => {
    const onCancel = vi.fn();
    const { user } = renderWithUser(
      <SweetAlert
        open={true}
        onClose={vi.fn()}
        title="Title"
        cancelLabel="취소"
        onCancel={onCancel}
      />,
    );
    await user.click(screen.getByText("취소"));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("calls onClose when cancel button clicked without onCancel", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <SweetAlert open={true} onClose={onClose} title="Title" cancelLabel="취소" />,
    );
    await user.click(screen.getByText("취소"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on Escape key", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <SweetAlert open={true} onClose={onClose} title="Title" />,
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on backdrop click", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <SweetAlert open={true} onClose={onClose} title="Title" />,
    );
    const overlay = screen.getByRole("alertdialog").parentElement!;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
