import { describe, it, expect, afterEach } from "vitest";
import { render } from "../test/utils";
import { useScrollLock } from "./useScrollLock";

function Harness({ enabled }: { enabled: boolean }) {
  useScrollLock(enabled);
  return null;
}

describe("useScrollLock", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("locks body scroll when enabled", () => {
    render(<Harness enabled={true} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("does not lock when disabled", () => {
    render(<Harness enabled={false} />);
    expect(document.body.style.overflow).toBe("");
  });

  it("restores the previous overflow value on unmount", () => {
    document.body.style.overflow = "auto";
    const { unmount } = render(<Harness enabled={true} />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("restores when enabled toggles back to false", () => {
    const { rerender } = render(<Harness enabled={true} />);
    expect(document.body.style.overflow).toBe("hidden");

    rerender(<Harness enabled={false} />);
    expect(document.body.style.overflow).toBe("");
  });

  it("stays locked while a second overlay is still open, even if the first closes out of order", () => {
    // Modal(먼저 열림) 안에서 SweetAlert(나중에 열림)를 띄운 뒤,
    // Modal이 먼저 닫히는 non-LIFO 시나리오를 재현한다.
    const outer = render(<Harness enabled={true} />);
    const inner = render(<Harness enabled={true} />);
    expect(document.body.style.overflow).toBe("hidden");

    outer.unmount();
    expect(document.body.style.overflow).toBe("hidden");

    inner.unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("restores the pre-lock value only after every lock releases", () => {
    document.body.style.overflow = "scroll";
    const first = render(<Harness enabled={true} />);
    const second = render(<Harness enabled={true} />);

    first.unmount();
    expect(document.body.style.overflow).toBe("hidden");

    second.unmount();
    expect(document.body.style.overflow).toBe("scroll");
  });
});
