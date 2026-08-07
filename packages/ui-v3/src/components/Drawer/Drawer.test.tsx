import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen, waitFor } from "../../test/utils";
import { Drawer } from ".";

describe("Drawer", () => {
  it("renders nothing when open is false", () => {
    renderWithUser(
      <Drawer open={false} onClose={vi.fn()}>
        Content
      </Drawer>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog with aria-modal when open (backdrop default)", () => {
    renderWithUser(
      <Drawer open={true} onClose={vi.fn()}>
        Content
      </Drawer>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("connects title to dialog accessible name", () => {
    renderWithUser(
      <Drawer open={true} onClose={vi.fn()} title="계약 상세">
        Body
      </Drawer>,
    );
    expect(screen.getByRole("dialog", { name: "계약 상세" })).toBeInTheDocument();
  });

  it("calls onClose on close button click", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Drawer open={true} onClose={onClose} title="Title">
        Body
      </Drawer>,
    );
    await user.click(screen.getByLabelText("닫기"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on Escape key by default", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Drawer open={true} onClose={onClose}>
        Content
      </Drawer>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose on Escape when closeOnEscape is false", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Drawer open={true} onClose={onClose} closeOnEscape={false}>
        Content
      </Drawer>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose on backdrop click", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Drawer open={true} onClose={onClose}>
        Content
      </Drawer>,
    );
    const overlay = screen.getByRole("dialog").parentElement!;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not close on panel click", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Drawer open={true} onClose={onClose}>
        Content
      </Drawer>,
    );
    await user.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks body scroll when open with backdrop", () => {
    renderWithUser(
      <Drawer open={true} onClose={vi.fn()}>
        Content
      </Drawer>,
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("is non-blocking when backdrop is false", () => {
    renderWithUser(
      <Drawer open={true} onClose={vi.fn()} backdrop={false}>
        Content
      </Drawer>,
    );
    const dialog = screen.getByRole("dialog");
    // aria-modal 없음 + 오버레이 없이 body에 직접 렌더 + 스크롤락 없음
    expect(dialog).not.toHaveAttribute("aria-modal");
    expect(dialog.parentElement).toBe(document.body);
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("moves focus into the drawer when opened (focus trap)", async () => {
    renderWithUser(
      <Drawer open={true} onClose={vi.fn()} title="Title">
        <button>내부 버튼</button>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true);
    });
  });

  it("renders footer content", () => {
    renderWithUser(
      <Drawer open={true} onClose={vi.fn()} title="T" footer={<button>저장</button>}>
        Body
      </Drawer>,
    );
    expect(screen.getByText("저장")).toBeInTheDocument();
  });

  it("unmounts after slide-out transition when closed", async () => {
    const { rerender } = renderWithUser(
      <Drawer open={true} onClose={vi.fn()}>
        Content
      </Drawer>,
    );
    rerender(
      <Drawer open={false} onClose={vi.fn()}>
        Content
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
