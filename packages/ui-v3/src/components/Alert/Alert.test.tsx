import { describe, it, expect, vi } from "vitest";
import { renderWithUser, screen } from "../../test/utils";
import { Alert } from ".";

describe("Alert", () => {
  it("renders children content", () => {
    renderWithUser(<Alert>알림 메시지</Alert>);
    expect(screen.getByText("알림 메시지")).toBeInTheDocument();
  });

  it("has role='alert'", () => {
    renderWithUser(<Alert>Message</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    renderWithUser(<Alert title="제목">Body</Alert>);
    expect(screen.getByText("제목")).toBeInTheDocument();
  });

  it("renders close button when closable", () => {
    renderWithUser(<Alert closable onClose={vi.fn()}>Message</Alert>);
    expect(screen.getByLabelText("닫기")).toBeInTheDocument();
  });

  it("does not render close button when not closable", () => {
    renderWithUser(<Alert>Message</Alert>);
    expect(screen.queryByLabelText("닫기")).not.toBeInTheDocument();
  });

  it("calls onClose when close button clicked", async () => {
    const onClose = vi.fn();
    const { user } = renderWithUser(<Alert closable onClose={onClose}>Message</Alert>);
    await user.click(screen.getByLabelText("닫기"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders text button when provided", () => {
    renderWithUser(
      <Alert textButton={{ label: "더보기", onClick: vi.fn() }}>Message</Alert>,
    );
    expect(screen.getByText("더보기")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    renderWithUser(
      <Alert actions={[
        { label: "확인", intent: "primary", onClick: vi.fn() },
        { label: "취소", intent: "secondary", onClick: vi.fn() },
      ]}>Message</Alert>,
    );
    expect(screen.getByText("확인")).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
  });
});
