import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { FullScreenModal } from ".";

describe("FullScreenModal", () => {
  it("renders nothing when open is false", () => {
    renderWithUser(
      <FullScreenModal open={false} onClose={vi.fn()}>
        Content
      </FullScreenModal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog with aria-modal when open", () => {
    renderWithUser(
      <FullScreenModal open={true} onClose={vi.fn()}>
        Content
      </FullScreenModal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("renders title, children and footer", () => {
    renderWithUser(
      <FullScreenModal open={true} onClose={vi.fn()} title="문서 편집" footer={<button>저장</button>}>
        <p>본문</p>
      </FullScreenModal>,
    );
    expect(screen.getByText("문서 편집")).toBeInTheDocument();
    expect(screen.getByText("본문")).toBeInTheDocument();
    expect(screen.getByText("저장")).toBeInTheDocument();
  });

  it("calls onClose on close button click", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <FullScreenModal open={true} onClose={onClose} title="제목">
        Content
      </FullScreenModal>,
    );
    await user.click(screen.getByLabelText("닫기"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on Escape key", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <FullScreenModal open={true} onClose={onClose}>
        Content
      </FullScreenModal>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not close on Escape when disableEscapeClose", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <FullScreenModal open={true} onClose={onClose} disableEscapeClose>
        Content
      </FullScreenModal>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks body scroll when open", () => {
    renderWithUser(
      <FullScreenModal open={true} onClose={vi.fn()}>
        Content
      </FullScreenModal>,
    );
    expect(document.body.style.overflow).toBe("hidden");
  });
});
