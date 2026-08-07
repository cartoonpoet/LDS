import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "../test/utils";
import { usePresence } from "./usePresence";

const EXIT_MS = 50;

function Harness({ open }: { open: boolean }) {
  const { mounted, exiting } = usePresence(open, EXIT_MS);
  if (!mounted) return null;
  return <div data-testid="panel" data-exiting={exiting} />;
}

describe("usePresence", () => {
  it("mounts immediately when open", () => {
    render(<Harness open={true} />);
    expect(screen.getByTestId("panel")).toBeInTheDocument();
    expect(screen.getByTestId("panel")).toHaveAttribute("data-exiting", "false");
  });

  it("is unmounted when initially closed", () => {
    render(<Harness open={false} />);
    expect(screen.queryByTestId("panel")).not.toBeInTheDocument();
  });

  it("keeps mounted with exiting=true during the exit transition, then unmounts", async () => {
    const { rerender } = render(<Harness open={true} />);

    rerender(<Harness open={false} />);
    // 트랜지션 동안 마운트 유지 + exiting 상태
    expect(screen.getByTestId("panel")).toHaveAttribute("data-exiting", "true");

    // exitDuration 경과 후 언마운트
    await waitFor(() => {
      expect(screen.queryByTestId("panel")).not.toBeInTheDocument();
    });
  });

  it("cancels the exit when reopened during the transition", async () => {
    const { rerender } = render(<Harness open={true} />);
    rerender(<Harness open={false} />);
    expect(screen.getByTestId("panel")).toHaveAttribute("data-exiting", "true");

    rerender(<Harness open={true} />);
    // 다시 열리면 타이머가 취소되어 계속 마운트 유지
    await new Promise((resolve) => setTimeout(resolve, EXIT_MS + 20));
    expect(screen.getByTestId("panel")).toBeInTheDocument();
  });
});
