import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";
import { renderWithUser, screen } from "../test/utils";
import { useDismissibleLayer } from "./useDismissibleLayer";

function Harness({
  enabled = true,
  onDismiss,
  onEscape,
  closeOnEscape,
  closeOnOutsideClick,
  stopEscapePropagation,
}: {
  enabled?: boolean;
  onDismiss: () => void;
  onEscape?: () => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  stopEscapePropagation?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDismissibleLayer({
    enabled,
    onDismiss,
    ref,
    closeOnEscape,
    closeOnOutsideClick,
    stopEscapePropagation,
    onEscape,
  });

  return (
    <div>
      <div ref={ref} data-testid="inside">
        <button data-testid="inner-button">inner</button>
      </div>
      <button data-testid="outside">outside</button>
    </div>
  );
}

describe("useDismissibleLayer", () => {
  it("calls onDismiss on outside mousedown", async () => {
    const onDismiss = vi.fn();
    const { user } = renderWithUser(<Harness onDismiss={onDismiss} />);

    await user.click(screen.getByTestId("outside"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("does not dismiss on inside click", async () => {
    const onDismiss = vi.fn();
    const { user } = renderWithUser(<Harness onDismiss={onDismiss} />);

    await user.click(screen.getByTestId("inner-button"));
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("calls onDismiss on Escape key", async () => {
    const onDismiss = vi.fn();
    const { user } = renderWithUser(<Harness onDismiss={onDismiss} />);

    await user.keyboard("{Escape}");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("does nothing when disabled", async () => {
    const onDismiss = vi.fn();
    const { user } = renderWithUser(<Harness enabled={false} onDismiss={onDismiss} />);

    await user.click(screen.getByTestId("outside"));
    await user.keyboard("{Escape}");
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("ignores Escape when closeOnEscape is false", async () => {
    const onDismiss = vi.fn();
    const { user } = renderWithUser(<Harness onDismiss={onDismiss} closeOnEscape={false} />);

    await user.keyboard("{Escape}");
    expect(onDismiss).not.toHaveBeenCalled();

    await user.click(screen.getByTestId("outside"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("ignores outside click when closeOnOutsideClick is false", async () => {
    const onDismiss = vi.fn();
    const { user } = renderWithUser(
      <Harness onDismiss={onDismiss} closeOnOutsideClick={false} />,
    );

    await user.click(screen.getByTestId("outside"));
    expect(onDismiss).not.toHaveBeenCalled();

    await user.keyboard("{Escape}");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("prefers onEscape over onDismiss for the Escape key", async () => {
    const onDismiss = vi.fn();
    const onEscape = vi.fn();
    const { user } = renderWithUser(<Harness onDismiss={onDismiss} onEscape={onEscape} />);

    await user.keyboard("{Escape}");
    expect(onEscape).toHaveBeenCalledTimes(1);
    expect(onDismiss).not.toHaveBeenCalled();

    await user.click(screen.getByTestId("outside"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("removes listeners after unmount", async () => {
    const onDismiss = vi.fn();
    const { user, unmount } = renderWithUser(<Harness onDismiss={onDismiss} />);

    unmount();
    await user.keyboard("{Escape}");
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
