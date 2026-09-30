import { describe, it, expect, vi } from "vitest";
import { render, renderWithUser, screen } from "../../test/utils";
import { Gnb } from ".";

describe("Gnb", () => {
  it("renders start and end slots", () => {
    render(<Gnb data-testid="gnb" start={<span>왼쪽</span>} end={<span>오른쪽</span>} />);
    const gnb = screen.getByTestId("gnb");
    expect(gnb.nodeName).toBe("DIV");
    expect(gnb).toHaveTextContent("왼쪽");
    expect(gnb).toHaveTextContent("오른쪽");
  });

  it("forwards className", () => {
    render(<Gnb data-testid="gnb" className="custom" />);
    expect(screen.getByTestId("gnb")).toHaveClass("custom");
  });
});

describe("Gnb.IconButton", () => {
  it("uses label as accessible name and title", () => {
    render(<Gnb.IconButton icon={<svg />} label="도움말" />);
    const button = screen.getByRole("button", { name: "도움말" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("title", "도움말");
  });

  it("allows overriding title", () => {
    render(<Gnb.IconButton icon={<svg />} label="알림" title="새 알림 3건" />);
    expect(screen.getByRole("button", { name: "알림" })).toHaveAttribute("title", "새 알림 3건");
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    const { user } = renderWithUser(<Gnb.IconButton icon={<svg />} label="설정" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "설정" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("Gnb.Divider", () => {
  it("is decorative", () => {
    render(<Gnb.Divider data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Gnb.Profile", () => {
  it("renders name, description and avatar", () => {
    render(<Gnb.Profile name="이법무 변호사님" description="휴맥스홀딩스" avatar={<span>AV</span>} />);
    expect(screen.getByText("이법무 변호사님")).toBeInTheDocument();
    expect(screen.getByText("휴맥스홀딩스")).toBeInTheDocument();
    expect(screen.getByText("AV")).toBeInTheDocument();
  });

  it("is not a button without onClick", () => {
    render(<Gnb.Profile name="이법무" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("becomes a button with onClick", async () => {
    const onClick = vi.fn();
    const { user } = renderWithUser(<Gnb.Profile name="이법무" description="법무팀" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: /이법무/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("compact hides description but keeps name for screen readers", () => {
    render(<Gnb.Profile compact name="이법무" description="법무팀" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "이법무" })).toBeInTheDocument();
    expect(screen.queryByText("법무팀")).not.toBeInTheDocument();
  });
});
