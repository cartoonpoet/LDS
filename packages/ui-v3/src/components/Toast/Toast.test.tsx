import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen } from "../../test/utils";
import userEvent from "@testing-library/user-event";
import { Toast, ToastContainer } from ".";

vi.mock("react-toastify", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-toastify")>();
  const mockToastFn = vi.fn(() => "mock-toast-id" as import("react-toastify").Id);
  (mockToastFn as unknown as { dismiss: ReturnType<typeof vi.fn> }).dismiss = vi.fn();
  return {
    ...actual,
    toast: mockToastFn,
  };
});

import { toast } from "react-toastify";

beforeEach(() => {
  vi.mocked(toast).mockClear();
  (vi.mocked(toast) as unknown as { dismiss: ReturnType<typeof vi.fn> }).dismiss?.mockClear();
});

function getToastRenderFn() {
  return vi.mocked(toast).mock.calls[0][0] as (props: { closeToast: () => void }) => React.ReactElement;
}

describe("Toast", () => {
  it("마운트 시 toast()를 1회 호출한다", () => {
    render(
      <ToastContainer>
        <Toast title="알림" />
      </ToastContainer>,
    );
    expect(toast).toHaveBeenCalledTimes(1);
  });

  it("null을 반환하므로 직접 DOM에 alert가 없다", () => {
    const { container } = render(
      <ToastContainer>
        <Toast title="알림" />
      </ToastContainer>,
    );
    // Toast trigger renders null; no alert directly in the container from the trigger
    expect(container.querySelector('[role="alert"]')).toBeNull();
  });

  it("duration=0이면 autoClose: false로 호출된다", () => {
    render(
      <ToastContainer>
        <Toast title="알림" duration={0} />
      </ToastContainer>,
    );
    const options = vi.mocked(toast).mock.calls[0][1] as Record<string, unknown>;
    expect(options.autoClose).toBe(false);
  });

  it("duration=3000이면 autoClose: 3000으로 호출된다", () => {
    render(
      <ToastContainer>
        <Toast title="알림" duration={3000} />
      </ToastContainer>,
    );
    const options = vi.mocked(toast).mock.calls[0][1] as Record<string, unknown>;
    expect(options.autoClose).toBe(3000);
  });

  it("pauseOnHover=false가 toast() 옵션으로 전달된다", () => {
    render(
      <ToastContainer>
        <Toast title="알림" pauseOnHover={false} />
      </ToastContainer>,
    );
    const options = vi.mocked(toast).mock.calls[0][1] as Record<string, unknown>;
    expect(options.pauseOnHover).toBe(false);
  });

  it("onClose가 toast() 옵션으로 전달된다", () => {
    const onClose = vi.fn();
    render(
      <ToastContainer>
        <Toast title="알림" onClose={onClose} />
      </ToastContainer>,
    );
    const options = vi.mocked(toast).mock.calls[0][1] as Record<string, unknown>;
    expect(options.onClose).toBe(onClose);
  });

  it("언마운트 시 toast.dismiss()가 호출된다", () => {
    const dismissSpy = vi.fn();
    (vi.mocked(toast) as unknown as { dismiss: typeof dismissSpy }).dismiss = dismissSpy;

    const { unmount } = render(
      <ToastContainer>
        <Toast title="알림" />
      </ToastContainer>,
    );
    unmount();
    expect(dismissSpy).toHaveBeenCalledWith("mock-toast-id");
  });
});

describe("Toast — hideProgressBar 옵션", () => {
  it("showProgress=false, duration=5000, onClose 있을 때 hideProgressBar=false", () => {
    render(
      <ToastContainer>
        <Toast title="알림" showProgress={false} duration={5000} onClose={vi.fn()} />
      </ToastContainer>,
    );
    const options = vi.mocked(toast).mock.calls[0][1] as Record<string, unknown>;
    expect(options.hideProgressBar).toBe(false);
  });

  it("showProgress=true이면 hideProgressBar=true", () => {
    render(
      <ToastContainer>
        <Toast title="알림" showProgress={true} duration={5000} onClose={vi.fn()} />
      </ToastContainer>,
    );
    const options = vi.mocked(toast).mock.calls[0][1] as Record<string, unknown>;
    expect(options.hideProgressBar).toBe(true);
  });

  it("duration=0이면 hideProgressBar=true", () => {
    render(
      <ToastContainer>
        <Toast title="알림" showProgress={false} duration={0} onClose={vi.fn()} />
      </ToastContainer>,
    );
    const options = vi.mocked(toast).mock.calls[0][1] as Record<string, unknown>;
    expect(options.hideProgressBar).toBe(true);
  });

  it("onClose 없으면 hideProgressBar=true", () => {
    render(
      <ToastContainer>
        <Toast title="알림" showProgress={false} duration={5000} />
      </ToastContainer>,
    );
    const options = vi.mocked(toast).mock.calls[0][1] as Record<string, unknown>;
    expect(options.hideProgressBar).toBe(true);
  });
});

describe("LDSToastContent", () => {
  function renderContent(props: Partial<Parameters<typeof Toast>[0]> & { title: string }) {
    render(
      <ToastContainer>
        <Toast {...props} />
      </ToastContainer>,
    );
    const renderFn = getToastRenderFn();
    const element = renderFn({ closeToast: vi.fn() });
    return render(element);
  }

  it("title이 렌더링된다", () => {
    renderContent({ title: "알림 제목" });
    expect(screen.getByText("알림 제목")).toBeInTheDocument();
  });

  it("description이 렌더링된다", () => {
    renderContent({ title: "알림", description: "작업이 완료되었습니다." });
    expect(screen.getByText("작업이 완료되었습니다.")).toBeInTheDocument();
  });

  it("time 텍스트가 렌더링된다", () => {
    renderContent({ title: "알림", time: "3분 전" });
    expect(screen.getByText("3분 전")).toBeInTheDocument();
  });

  it("role=alert이 있다", () => {
    renderContent({ title: "알림" });
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("onClose 있을 때 닫기 버튼이 렌더링된다", () => {
    renderContent({ title: "알림", onClose: vi.fn() });
    expect(screen.getByLabelText("닫기")).toBeInTheDocument();
  });

  it("onClose 없을 때 닫기 버튼이 없다", () => {
    renderContent({ title: "알림" });
    expect(screen.queryByLabelText("닫기")).not.toBeInTheDocument();
  });

  it("showProgress=true이면 width 스타일로 progress가 렌더링된다", () => {
    const { container } = renderContent({ title: "알림", showProgress: true, progress: 67 });
    expect(container.querySelector('[style*="width: 67%"]')).not.toBeNull();
  });

  it("닫기 버튼 클릭 시 closeToast가 호출된다", async () => {
    const mockCloseToast = vi.fn();
    render(
      <ToastContainer>
        <Toast title="알림" onClose={vi.fn()} />
      </ToastContainer>,
    );
    const renderFn = getToastRenderFn();
    const element = renderFn({ closeToast: mockCloseToast });
    render(element);
    await userEvent.setup().click(screen.getByLabelText("닫기"));
    expect(mockCloseToast).toHaveBeenCalledOnce();
  });

  it("커스텀 icon prop이 기본 아이콘 대신 렌더링된다", () => {
    const customIcon = <span data-testid="custom-icon">★</span>;
    render(
      <ToastContainer>
        <Toast title="알림" icon={customIcon} onClose={vi.fn()} />
      </ToastContainer>,
    );
    const renderFn = getToastRenderFn();
    const element = renderFn({ closeToast: vi.fn() });
    render(element);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});

describe("ToastContainer", () => {
  it("children을 렌더링한다", () => {
    render(
      <ToastContainer>
        <div data-testid="child-node">Child</div>
      </ToastContainer>,
    );
    expect(screen.getByTestId("child-node")).toBeInTheDocument();
  });
});
