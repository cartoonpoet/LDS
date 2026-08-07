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
});
