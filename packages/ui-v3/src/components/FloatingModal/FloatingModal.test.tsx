import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { FloatingModal } from ".";

describe("FloatingModal", () => {
  it("renders nothing when open is false", () => {
    renderWithUser(
      <FloatingModal open={false} onClose={vi.fn()} title="제목">
        Content
      </FloatingModal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a non-blocking dialog when open", () => {
    renderWithUser(
      <FloatingModal open={true} onClose={vi.fn()} title="제목">
        Content
      </FloatingModal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).not.toHaveAttribute("aria-modal");
  });

  it("renders title, children and footer", () => {
    renderWithUser(
      <FloatingModal open={true} onClose={vi.fn()} title="첨부 업로드" footer={<button>완료</button>}>
        <p>본문</p>
      </FloatingModal>,
    );
    expect(screen.getByText("첨부 업로드")).toBeInTheDocument();
    expect(screen.getByText("본문")).toBeInTheDocument();
    expect(screen.getByText("완료")).toBeInTheDocument();
  });

  it("calls onClose on close button click", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <FloatingModal open={true} onClose={onClose} title="제목">
        Content
      </FloatingModal>,
    );
    await user.click(screen.getByLabelText("닫기"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not close on Escape by default (non-blocking)", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <FloatingModal open={true} onClose={onClose} title="제목">
        Content
      </FloatingModal>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on Escape when closeOnEscape", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <FloatingModal open={true} onClose={onClose} title="제목" closeOnEscape>
        Content
      </FloatingModal>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not lock body scroll", () => {
    renderWithUser(
      <FloatingModal open={true} onClose={vi.fn()} title="제목">
        Content
      </FloatingModal>,
    );
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("collapses and expands body when collapsible", async () => {
    const { user } = renderWithUser(
      <FloatingModal open={true} onClose={vi.fn()} title="제목" collapsible footer={<button>완료</button>}>
        <p>본문</p>
      </FloatingModal>,
    );
    await user.click(screen.getByLabelText("접기"));
    expect(screen.queryByText("본문")).not.toBeInTheDocument();
    expect(screen.queryByText("완료")).not.toBeInTheDocument();
    await user.click(screen.getByLabelText("펼치기"));
    expect(screen.getByText("본문")).toBeInTheDocument();
  });
});
