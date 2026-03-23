import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Modal, ModalHeader, ModalBody, ModalFooter } from ".";

describe("Modal", () => {
  it("renders nothing when open is false", () => {
    renderWithUser(<Modal open={false} onClose={vi.fn()}>Content</Modal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders dialog when open is true", () => {
    renderWithUser(<Modal open={true} onClose={vi.fn()}>Content</Modal>);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("renders children content", () => {
    renderWithUser(
      <Modal open={true} onClose={vi.fn()}>
        <p>Hello Modal</p>
      </Modal>,
    );
    expect(screen.getByText("Hello Modal")).toBeInTheDocument();
  });

  it("renders title and close button via simple API", () => {
    renderWithUser(
      <Modal open={true} onClose={vi.fn()} title="제목">
        Body
      </Modal>,
    );
    expect(screen.getByText("제목")).toBeInTheDocument();
    expect(screen.getByLabelText("닫기")).toBeInTheDocument();
  });

  it("renders footer via simple API", () => {
    renderWithUser(
      <Modal open={true} onClose={vi.fn()} title="T" footer={<button>Save</button>}>
        Body
      </Modal>,
    );
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("calls onClose on close button click", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Modal open={true} onClose={onClose} title="Title">
        Body
      </Modal>,
    );
    await user.click(screen.getByLabelText("닫기"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on Escape key", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Modal open={true} onClose={onClose}>Content</Modal>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose on Escape when disableEscapeClose", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Modal open={true} onClose={onClose} disableEscapeClose>
        Content
      </Modal>,
    );
    await user.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose on backdrop click", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Modal open={true} onClose={onClose}>Content</Modal>,
    );
    const overlay = screen.getByRole("dialog").parentElement!;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose on backdrop click when disableBackdropClose", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Modal open={true} onClose={onClose} disableBackdropClose>
        Content
      </Modal>,
    );
    const overlay = screen.getByRole("dialog").parentElement!;
    await user.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not close on dialog card click", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(
      <Modal open={true} onClose={onClose}>Content</Modal>,
    );
    await user.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks body scroll when open", () => {
    renderWithUser(<Modal open={true} onClose={vi.fn()}>Content</Modal>);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("supports compound pattern", () => {
    renderWithUser(
      <Modal open={true} onClose={vi.fn()}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </Modal>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
