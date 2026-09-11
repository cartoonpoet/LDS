import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { ApprovalLine } from ".";

const items = [
  { id: "1", order: 1, name: "박기안", role: "대리", department: "영업팀", status: "approved" as const, date: "9. 8. 14:02" },
  { id: "2", order: 2, name: "이검토", role: "과장", department: "법무팀", status: "approved" as const },
  { id: "3", order: 3, name: "최법무", role: "팀장", status: "current" as const, comment: "검토 중" },
  { id: "4", order: 4, name: "정대표", status: "pending" as const },
];

describe("ApprovalLine", () => {
  it("renders an ordered list labeled 결재선 with one item per approver", () => {
    render(<ApprovalLine items={items} />);
    expect(screen.getByLabelText("결재선")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("renders name, role·department, order, date and comment", () => {
    render(<ApprovalLine items={items} />);
    expect(screen.getByText("박기안")).toBeInTheDocument();
    expect(screen.getByText("대리 · 영업팀")).toBeInTheDocument();
    expect(screen.getByLabelText("결재 순서 1")).toHaveTextContent("1");
    expect(screen.getByText("9. 8. 14:02")).toBeInTheDocument();
    expect(screen.getByText("검토 중")).toBeInTheDocument();
  });

  it("renders status badges (approved/current/pending/rejected labels)", () => {
    render(
      <ApprovalLine items={[...items, { id: "5", name: "김반려", status: "rejected" as const }]} />
    );
    expect(screen.getAllByText("승인")).toHaveLength(2);
    expect(screen.getByText("진행중")).toBeInTheDocument();
    expect(screen.getByText("대기")).toBeInTheDocument();
    expect(screen.getByText("반려")).toBeInTheDocument();
  });

  it("status defaults to pending", () => {
    render(<ApprovalLine items={[{ id: "1", name: "홍길동" }]} />);
    expect(screen.getByText("대기")).toBeInTheDocument();
  });

  it("renders connectors between items only (n-1), and none when showConnector=false", () => {
    const { container, rerender } = render(<ApprovalLine items={items} />);
    const count = () => container.querySelectorAll('li > span[aria-hidden="true"]').length;
    expect(count()).toBe(items.length - 1);
    rerender(<ApprovalLine items={items} showConnector={false} />);
    expect(count()).toBe(0);
  });

  it("direction variants produce different list classNames", () => {
    const { container: h } = render(<ApprovalLine items={items} />);
    const { container: v } = render(<ApprovalLine items={items} direction="vertical" />);
    expect((h.firstChild as HTMLElement).className).not.toBe(
      (v.firstChild as HTMLElement).className
    );
  });

  it("custom ariaLabel", () => {
    render(<ApprovalLine ariaLabel="계약 결재선" items={items} />);
    expect(screen.getByLabelText("계약 결재선")).toBeInTheDocument();
  });
});
